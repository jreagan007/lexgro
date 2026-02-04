/**
 * Content Priority Queue for LEXGRO
 *
 * Scores and prioritizes content files for improvement based on:
 * - Completeness (stub detection)
 * - Audit issue count
 * - SEO value (search volume)
 * - Content type (pillar > answer > blog)
 *
 * Usage:
 *   npx tsx scripts/prioritize-content.ts              # Show priority queue
 *   npx tsx scripts/prioritize-content.ts --verbose    # Show detailed scoring
 *   npx tsx scripts/prioritize-content.ts --top N      # Show top N files
 */

import * as fs from 'fs'
import * as path from 'path'
import { glob } from 'glob'
import matter from 'gray-matter'

const PROJECT_ROOT = process.cwd()

// CLI args
const args = process.argv.slice(2)
const verbose = args.includes('--verbose')
const topIndex = args.indexOf('--top')
const topN = topIndex !== -1 ? parseInt(args[topIndex + 1]) || 20 : 20

interface ContentFile {
  filePath: string
  relativePath: string
  slug: string
  title: string
  targetKeyword?: string
  searchVolume?: number
  contentType: 'guide' | 'blog' | 'answer' | 'service'
  pillarType?: 'main' | 'sub'
  content: string
  wordCount: number
}

interface ContentScore {
  file: ContentFile
  scores: {
    completeness: number
    auditIssues: number
    seoValue: number
    contentType: number
  }
  total: number
  issues: string[]
  actions: string[]
}

// Style guide rules for quick audit (simplified from audit-content.ts)
const AUDIT_PATTERNS = [
  { pattern: /—/g, name: 'em-dash' },
  { pattern: /(\d+)%/g, name: 'percent-symbol' },
  { pattern: /\*\*From Keith'?s Perspective:?\*\*/gi, name: 'llm-keith-perspective' },
  { pattern: /^##\s*Introduction:?\s*$/gm, name: 'llm-intro-header' },
  { pattern: /\bLet me explain\.?\s*/gi, name: 'llm-let-me-explain' },
  { pattern: /\bdelve(s|d)?\s*(into|deeper)?\b/gi, name: 'ai-delve' },
  { pattern: /\bleverage\b/gi, name: 'jargon-leverage' },
  { pattern: /\bsynerg(y|ize|ies)\b/gi, name: 'jargon-synergy' },
  { pattern: /\butilize[sd]?\b/gi, name: 'jargon-utilize' },
]

// Stub detection patterns
const STUB_PATTERNS = [
  /\*Content to be written\*/i,
  /\bTODO:/i,
  /\bPLACEHOLDER\b/i,
  /\[Insert .+\]/i,
  /\{TBD\}/i,
  /\bLorem ipsum\b/i,
  /Coming soon\.?$/i,
]

/**
 * Extract content type from file path
 */
function getContentType(filePath: string): ContentFile['contentType'] {
  if (filePath.includes('/guides/')) return 'guide'
  if (filePath.includes('/blog/')) return 'blog'
  if (filePath.includes('/answers/')) return 'answer'
  if (filePath.includes('/services/')) return 'service'
  return 'blog'
}

/**
 * Extract slug from file path
 */
function extractSlug(filePath: string): string {
  const match = filePath.match(/\/([^/]+)\.mdx?$/)
  return match ? match[1] : ''
}

/**
 * Load and parse all content files
 */
async function loadContentFiles(): Promise<ContentFile[]> {
  const patterns = ['src/content/**/*.{md,mdx}']
  const files: ContentFile[] = []

  for (const pattern of patterns) {
    const matches = await glob(pattern, { cwd: PROJECT_ROOT })

    for (const match of matches) {
      const filePath = path.join(PROJECT_ROOT, match)
      const content = fs.readFileSync(filePath, 'utf-8')

      try {
        const { data: frontmatter, content: bodyContent } = matter(content)

        // Count words in body
        const wordCount = bodyContent.split(/\s+/).filter(w => w.length > 0).length

        files.push({
          filePath,
          relativePath: match,
          slug: frontmatter.slug || extractSlug(filePath),
          title: frontmatter.title || '',
          targetKeyword: frontmatter.targetKeyword,
          searchVolume: frontmatter.searchVolume,
          contentType: getContentType(filePath),
          pillarType: frontmatter.pillarType,
          content,
          wordCount,
        })
      } catch (error) {
        console.error(`Error parsing ${match}: ${error}`)
      }
    }
  }

  return files
}

/**
 * Check if file is a stub
 */
function isStub(file: ContentFile): boolean {
  // Check for explicit stub patterns
  for (const pattern of STUB_PATTERNS) {
    if (pattern.test(file.content)) return true
  }

  // Check for very low word count
  if (file.wordCount < 200) return true

  return false
}

/**
 * Count audit issues in file
 */
function countAuditIssues(content: string): { count: number; types: string[] } {
  const types: string[] = []
  let count = 0

  for (const { pattern, name } of AUDIT_PATTERNS) {
    const matches = content.match(pattern)
    if (matches && matches.length > 0) {
      count += matches.length
      types.push(`${name}(${matches.length})`)
    }
  }

  // Check for missing Sources section
  const hasStats = /\$[\d,]+|\d+\s*percent|\d{1,3}(?:,\d{3})+/.test(content)
  const hasSources = /^##?\s*Sources?\s*$/im.test(content)
  if (hasStats && !hasSources) {
    count += 5 // Weight missing sources heavily
    types.push('missing-sources')
  }

  // Check for no internal links
  const bodyContent = content.replace(/^---[\s\S]*?---/, '')
  const internalLinks = bodyContent.match(/\]\(\/(?!contact)[^)]+\)/g) || []
  if (internalLinks.length === 0) {
    count += 3 // Weight missing links
    types.push('no-internal-links')
  }

  return { count, types }
}

/**
 * Score a content file
 */
function scoreFile(file: ContentFile): ContentScore {
  const issues: string[] = []
  const actions: string[] = []

  // 1. Completeness score (0-30)
  let completenessScore = 30
  if (isStub(file)) {
    completenessScore = 0
    issues.push('STUB: File has placeholder content')
    actions.push('Complete rewrite required')
  } else if (file.wordCount < 500) {
    completenessScore = 10
    issues.push(`LOW CONTENT: Only ${file.wordCount} words`)
    actions.push('Expand content significantly')
  } else if (file.wordCount < 1000) {
    completenessScore = 20
    issues.push(`THIN CONTENT: ${file.wordCount} words`)
    actions.push('Add more depth and detail')
  }

  // 2. Audit issues score (0-30, inverted - fewer is better)
  const { count: auditCount, types: auditTypes } = countAuditIssues(file.content)
  let auditScore = Math.max(0, 30 - auditCount * 2) // -2 points per issue, min 0

  if (auditCount > 0) {
    issues.push(`${auditCount} audit issues: ${auditTypes.slice(0, 3).join(', ')}${auditTypes.length > 3 ? '...' : ''}`)
    if (auditTypes.includes('missing-sources')) {
      actions.push('Add Sources section with citations')
    }
    if (auditTypes.includes('no-internal-links')) {
      actions.push('Add internal links to related content')
    }
    if (auditTypes.some(t => t.startsWith('llm-'))) {
      actions.push('Fix LLM giveaway patterns')
    }
    if (auditTypes.some(t => t.startsWith('jargon-'))) {
      actions.push('Replace jargon words')
    }
  }

  // 3. SEO value score (0-25)
  let seoScore = 0
  if (file.searchVolume) {
    if (file.searchVolume >= 10000) seoScore = 25
    else if (file.searchVolume >= 5000) seoScore = 20
    else if (file.searchVolume >= 1000) seoScore = 15
    else if (file.searchVolume >= 500) seoScore = 10
    else seoScore = 5
  } else {
    // Default scores by content type if no search volume
    if (file.contentType === 'guide') seoScore = 15
    else if (file.contentType === 'answer') seoScore = 10
    else seoScore = 5
  }

  // 4. Content type score (0-15)
  let typeScore = 5
  if (file.contentType === 'guide') {
    typeScore = file.pillarType === 'main' ? 15 : 12
  } else if (file.contentType === 'answer') {
    typeScore = 10
  } else if (file.contentType === 'service') {
    typeScore = 8
  }

  // Calculate priority (higher = more urgent to fix)
  // Invert completeness and audit scores since low values indicate problems
  const problemScore = (30 - completenessScore) + (30 - auditScore)
  const importanceScore = seoScore + typeScore

  // Priority formula: problems * importance modifier
  // Files with both problems AND high importance get highest priority
  const total = problemScore * (1 + importanceScore / 40)

  return {
    file,
    scores: {
      completeness: completenessScore,
      auditIssues: auditScore,
      seoValue: seoScore,
      contentType: typeScore,
    },
    total: Math.round(total),
    issues,
    actions,
  }
}

/**
 * Format score output
 */
function formatScore(score: ContentScore, rank: number): string {
  const { file, scores, total, issues, actions } = score
  let output = ''

  output += `\n${rank}. ${file.relativePath}`
  output += `\n   Priority Score: ${total} | Type: ${file.contentType}`

  if (file.searchVolume) {
    output += ` | Search Vol: ${file.searchVolume.toLocaleString()}`
  }

  if (verbose) {
    output += `\n   Scores: completeness=${scores.completeness}, audit=${scores.auditIssues}, seo=${scores.seoValue}, type=${scores.contentType}`
  }

  if (issues.length > 0) {
    output += '\n   Issues:'
    for (const issue of issues) {
      output += `\n      - ${issue}`
    }
  }

  if (actions.length > 0) {
    output += '\n   Actions needed:'
    for (const action of actions) {
      output += `\n      → ${action}`
    }
  }

  return output
}

/**
 * Main function
 */
async function main() {
  console.log('\n🎯 LEXGRO Content Priority Queue\n')

  // Load all content files
  console.log('Loading content files...')
  const files = await loadContentFiles()
  console.log(`Found ${files.length} content files.\n`)

  // Score all files
  const scores = files.map(f => scoreFile(f))

  // Sort by priority (highest first)
  scores.sort((a, b) => b.total - a.total)

  // Summary stats
  const stubs = scores.filter(s => s.scores.completeness === 0)
  const criticalIssues = scores.filter(s => s.total > 40)
  const needsWork = scores.filter(s => s.total > 20)

  console.log('📊 Summary:\n')
  console.log(`   Stub files (need complete rewrite): ${stubs.length}`)
  console.log(`   Critical priority (score > 40): ${criticalIssues.length}`)
  console.log(`   Needs work (score > 20): ${needsWork.length}`)
  console.log(`   Good condition (score <= 20): ${scores.length - needsWork.length}`)

  // Output stub files first (highest priority)
  if (stubs.length > 0) {
    console.log('\n🚨 STUB FILES (Must complete immediately):')
    for (const stub of stubs) {
      console.log(`   - ${stub.file.relativePath}`)
      if (stub.file.searchVolume) {
        console.log(`     Search volume: ${stub.file.searchVolume.toLocaleString()}`)
      }
    }
  }

  // Output priority queue
  console.log(`\n📋 Priority Queue (top ${topN}):`)

  const topFiles = scores.slice(0, topN)
  let rank = 1
  for (const score of topFiles) {
    console.log(formatScore(score, rank++))
  }

  // Output by content type
  console.log('\n📁 Priority by Content Type:')

  const byType = new Map<string, ContentScore[]>()
  for (const score of scores.filter(s => s.total > 10)) {
    const type = score.file.contentType
    if (!byType.has(type)) byType.set(type, [])
    byType.get(type)!.push(score)
  }

  for (const [type, typeScores] of byType) {
    console.log(`\n   ${type.toUpperCase()} (${typeScores.length} files need work):`)
    for (const score of typeScores.slice(0, 5)) {
      console.log(`      - ${score.file.slug} (score: ${score.total})`)
    }
    if (typeScores.length > 5) {
      console.log(`      ... and ${typeScores.length - 5} more`)
    }
  }

  // Action summary
  const actionCounts = new Map<string, number>()
  for (const score of scores) {
    for (const action of score.actions) {
      actionCounts.set(action, (actionCounts.get(action) || 0) + 1)
    }
  }

  if (actionCounts.size > 0) {
    console.log('\n✅ Most Common Actions Needed:')
    const sortedActions = [...actionCounts.entries()].sort((a, b) => b[1] - a[1])
    for (const [action, count] of sortedActions) {
      console.log(`   ${count.toString().padStart(3)} files: ${action}`)
    }
  }

  console.log('\n')
}

main().catch(console.error)
