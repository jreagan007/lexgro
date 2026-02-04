/**
 * Internal Link Analysis Tool for LEXGRO
 *
 * Analyzes content files to identify internal linking opportunities.
 *
 * Usage:
 *   npx tsx scripts/analyze-internal-links.ts              # Analyze all content
 *   npx tsx scripts/analyze-internal-links.ts --verbose    # Show detailed suggestions
 *   npx tsx scripts/analyze-internal-links.ts --file path  # Analyze single file
 *
 * Features:
 *   - Builds keyword-to-slug mapping from frontmatter
 *   - Identifies unlinked mentions of related content
 *   - Checks if relatedGuides/relatedAnswers are linked in body
 *   - Generates link suggestions with context
 */

import * as fs from 'fs'
import * as path from 'path'
import { glob } from 'glob'
import matter from 'gray-matter'

const PROJECT_ROOT = process.cwd()

// CLI args
const args = process.argv.slice(2)
const verbose = args.includes('--verbose')
const fileIndex = args.indexOf('--file')
const singleFile = fileIndex !== -1 ? args[fileIndex + 1] : null

interface ContentFile {
  filePath: string
  relativePath: string
  slug: string
  title: string
  targetKeyword?: string
  relatedGuides?: string[]
  relatedAnswers?: string[]
  parentGuide?: string
  content: string
  bodyContent: string
  contentType: 'guide' | 'blog' | 'answer' | 'service'
}

interface LinkSuggestion {
  keyword: string
  targetSlug: string
  targetTitle: string
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  context: string
  lineNumber: number
}

interface FileAnalysis {
  file: ContentFile
  existingLinks: string[]
  missingRelatedLinks: string[]
  suggestions: LinkSuggestion[]
}

/**
 * Extract content type from file path
 */
function getContentType(filePath: string): ContentFile['contentType'] {
  if (filePath.includes('/guides/')) return 'guide'
  if (filePath.includes('/blog/')) return 'blog'
  if (filePath.includes('/answers/')) return 'answer'
  if (filePath.includes('/services/')) return 'service'
  return 'blog' // Default
}

/**
 * Extract slug from file path
 */
function extractSlug(filePath: string): string {
  const match = filePath.match(/\/([^/]+)\.mdx?$/)
  return match ? match[1] : ''
}

/**
 * Get URL path for a content file
 */
function getUrlPath(file: ContentFile): string {
  const type = file.contentType
  if (type === 'guide') return `/guide/${file.slug}/`
  if (type === 'answer') return `/answers/${file.slug}/`
  if (type === 'blog') return `/blog/${file.slug}/`
  if (type === 'service') return `/services/${file.slug}/`
  return `/${file.slug}/`
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

        files.push({
          filePath,
          relativePath: match,
          slug: frontmatter.slug || extractSlug(filePath),
          title: frontmatter.title || '',
          targetKeyword: frontmatter.targetKeyword,
          relatedGuides: frontmatter.relatedGuides,
          relatedAnswers: frontmatter.relatedAnswers,
          parentGuide: frontmatter.parentGuide,
          content,
          bodyContent,
          contentType: getContentType(filePath),
        })
      } catch (error) {
        console.error(`Error parsing ${match}: ${error}`)
      }
    }
  }

  return files
}

/**
 * Build keyword to slug mapping
 */
function buildKeywordMap(files: ContentFile[]): Map<string, ContentFile> {
  const map = new Map<string, ContentFile>()

  for (const file of files) {
    // Add target keyword
    if (file.targetKeyword) {
      map.set(file.targetKeyword.toLowerCase(), file)
    }

    // Add title as keyword (lowercase)
    if (file.title) {
      map.set(file.title.toLowerCase(), file)
    }

    // Add slug variations
    const slugWords = file.slug.replace(/-/g, ' ')
    map.set(slugWords, file)
  }

  return map
}

/**
 * Extract existing internal links from content
 */
function extractExistingLinks(content: string): string[] {
  const linkPattern = /\]\(\/([^)#]+)/g
  const links: string[] = []
  let match

  while ((match = linkPattern.exec(content)) !== null) {
    // Clean up the path
    const linkPath = match[1].replace(/\/$/, '')
    links.push(linkPath)
  }

  return links
}

/**
 * Find unlinked keyword mentions in content
 */
function findUnlinkedMentions(
  file: ContentFile,
  keywordMap: Map<string, ContentFile>,
  existingLinks: string[]
): LinkSuggestion[] {
  const suggestions: LinkSuggestion[] = []
  const lines = file.bodyContent.split('\n')

  // Skip frontmatter lines
  let inFrontmatter = false
  let bodyStartLine = 0
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      inFrontmatter = !inFrontmatter
      if (!inFrontmatter) {
        bodyStartLine = i + 1
        break
      }
    }
  }

  for (const [keyword, targetFile] of keywordMap) {
    // Skip self-references
    if (targetFile.slug === file.slug) continue

    // Skip if already linked
    const targetUrl = getUrlPath(targetFile).replace(/^\/|\/$/g, '')
    if (existingLinks.some(link => link.includes(targetFile.slug))) continue

    // Search for keyword in body content (case-insensitive)
    const keywordRegex = new RegExp(`\\b${escapeRegex(keyword)}\\b`, 'gi')

    for (let i = bodyStartLine; i < lines.length; i++) {
      const line = lines[i]

      // Skip code blocks, headers that already have the keyword, and existing links
      if (line.startsWith('```') || line.startsWith('#') || line.includes('](')) continue

      if (keywordRegex.test(line)) {
        // Determine priority based on relationship
        let priority: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW'

        // HIGH: Related content in frontmatter
        if (
          file.relatedGuides?.includes(targetFile.slug) ||
          file.relatedAnswers?.includes(targetFile.slug) ||
          file.parentGuide === targetFile.slug
        ) {
          priority = 'HIGH'
        }
        // MEDIUM: Same content cluster or related topic
        else if (targetFile.contentType === 'guide') {
          priority = 'MEDIUM'
        }

        suggestions.push({
          keyword,
          targetSlug: targetFile.slug,
          targetTitle: targetFile.title,
          priority,
          context: line.trim().slice(0, 100),
          lineNumber: i + 1,
        })

        // Only suggest once per keyword per file
        break
      }
    }
  }

  // Deduplicate by target slug, keeping highest priority
  const deduped = new Map<string, LinkSuggestion>()
  for (const suggestion of suggestions) {
    const existing = deduped.get(suggestion.targetSlug)
    if (!existing || priorityValue(suggestion.priority) > priorityValue(existing.priority)) {
      deduped.set(suggestion.targetSlug, suggestion)
    }
  }

  return Array.from(deduped.values())
}

function priorityValue(p: 'HIGH' | 'MEDIUM' | 'LOW'): number {
  return p === 'HIGH' ? 3 : p === 'MEDIUM' ? 2 : 1
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Check if related content from frontmatter is linked in body
 */
function checkRelatedLinks(file: ContentFile, existingLinks: string[]): string[] {
  const missing: string[] = []

  // Check relatedGuides
  if (file.relatedGuides) {
    for (const slug of file.relatedGuides) {
      if (!existingLinks.some(link => link.includes(slug))) {
        missing.push(`guide/${slug}`)
      }
    }
  }

  // Check relatedAnswers
  if (file.relatedAnswers) {
    for (const slug of file.relatedAnswers) {
      if (!existingLinks.some(link => link.includes(slug))) {
        missing.push(`answers/${slug}`)
      }
    }
  }

  // Check parentGuide
  if (file.parentGuide) {
    if (!existingLinks.some(link => link.includes(file.parentGuide!))) {
      missing.push(`guide/${file.parentGuide}`)
    }
  }

  return missing
}

/**
 * Analyze a single file
 */
function analyzeFile(file: ContentFile, keywordMap: Map<string, ContentFile>): FileAnalysis {
  const existingLinks = extractExistingLinks(file.bodyContent)
  const missingRelatedLinks = checkRelatedLinks(file, existingLinks)
  const suggestions = findUnlinkedMentions(file, keywordMap, existingLinks)

  return {
    file,
    existingLinks,
    missingRelatedLinks,
    suggestions,
  }
}

/**
 * Format analysis output
 */
function formatAnalysis(analysis: FileAnalysis): string {
  const { file, existingLinks, missingRelatedLinks, suggestions } = analysis
  let output = ''

  const hasIssues = existingLinks.length === 0 || missingRelatedLinks.length > 0 || suggestions.length > 0

  if (!hasIssues && !verbose) return ''

  output += `\n📄 ${file.relativePath}\n`
  output += `   Type: ${file.contentType} | Slug: ${file.slug}\n`

  if (existingLinks.length === 0) {
    output += `   ⚠️  CRITICAL: No internal links in body content\n`
  } else {
    output += `   ✓ ${existingLinks.length} existing internal links\n`
  }

  if (missingRelatedLinks.length > 0) {
    output += `   ⚠️  Related content not linked in body:\n`
    for (const link of missingRelatedLinks) {
      output += `      - ${link}\n`
    }
  }

  if (suggestions.length > 0) {
    output += `   💡 Link suggestions:\n`
    const sorted = suggestions.sort((a, b) => priorityValue(b.priority) - priorityValue(a.priority))

    for (const s of sorted.slice(0, verbose ? 10 : 5)) {
      output += `      [${s.priority}] Link "${s.keyword}" → /${s.targetSlug}/\n`
      if (verbose) {
        output += `           Line ${s.lineNumber}: "${s.context}..."\n`
      }
    }

    if (sorted.length > (verbose ? 10 : 5)) {
      output += `      ... and ${sorted.length - (verbose ? 10 : 5)} more suggestions\n`
    }
  }

  return output
}

/**
 * Main function
 */
async function main() {
  console.log('\n🔗 LEXGRO Internal Link Analysis\n')

  // Load all content files
  console.log('Loading content files...')
  const allFiles = await loadContentFiles()
  console.log(`Found ${allFiles.length} content files.\n`)

  // Build keyword map
  const keywordMap = buildKeywordMap(allFiles)
  console.log(`Built keyword map with ${keywordMap.size} entries.\n`)

  // Filter to single file if specified
  const filesToAnalyze = singleFile
    ? allFiles.filter(f => f.relativePath.includes(singleFile) || f.slug === singleFile)
    : allFiles

  if (singleFile && filesToAnalyze.length === 0) {
    console.error(`No files found matching: ${singleFile}`)
    process.exit(1)
  }

  // Analyze files
  const analyses: FileAnalysis[] = []
  for (const file of filesToAnalyze) {
    analyses.push(analyzeFile(file, keywordMap))
  }

  // Summary stats
  const noLinks = analyses.filter(a => a.existingLinks.length === 0)
  const missingRelated = analyses.filter(a => a.missingRelatedLinks.length > 0)
  const withSuggestions = analyses.filter(a => a.suggestions.length > 0)

  console.log('📊 Summary:\n')
  console.log(`   Files with 0 internal links: ${noLinks.length} (CRITICAL)`)
  console.log(`   Files with unlinked related content: ${missingRelated.length}`)
  console.log(`   Files with link suggestions: ${withSuggestions.length}`)

  // Output critical files (no internal links)
  if (noLinks.length > 0) {
    console.log('\n⚠️  CRITICAL: Files with zero internal links:\n')
    for (const a of noLinks) {
      console.log(`   - ${a.file.relativePath}`)
    }
  }

  // Output detailed analysis
  if (verbose || singleFile) {
    console.log('\n📝 Detailed Analysis:')
    for (const analysis of analyses) {
      const output = formatAnalysis(analysis)
      if (output) console.log(output)
    }
  } else {
    console.log('\nRun with --verbose to see detailed suggestions.')
  }

  // Output by content type
  const byType = new Map<string, number>()
  for (const a of noLinks) {
    const type = a.file.contentType
    byType.set(type, (byType.get(type) || 0) + 1)
  }

  if (byType.size > 0) {
    console.log('\n📁 Zero-link files by type:')
    for (const [type, count] of byType) {
      console.log(`   ${type}: ${count}`)
    }
  }

  // Top priority files to fix
  const priorityFiles = analyses
    .map(a => ({
      file: a.file,
      score:
        (a.existingLinks.length === 0 ? 10 : 0) +
        a.missingRelatedLinks.length * 3 +
        a.suggestions.filter(s => s.priority === 'HIGH').length * 2 +
        a.suggestions.filter(s => s.priority === 'MEDIUM').length,
    }))
    .filter(f => f.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)

  if (priorityFiles.length > 0) {
    console.log('\n🎯 Top files to add links (by priority score):')
    for (const { file, score } of priorityFiles) {
      console.log(`   ${score.toString().padStart(3)} pts: ${file.relativePath}`)
    }
  }

  console.log('\n')
}

main().catch(console.error)
