/**
 * Research Helper for Content Citations
 *
 * Scans content files for uncited statistics and generates
 * Perplexity queries to find sources for citations.
 *
 * Usage:
 *   npx tsx scripts/research-for-content.ts <file>           # Scan file for uncited stats
 *   npx tsx scripts/research-for-content.ts <file> --fetch   # Also fetch sources via Perplexity
 *   npx tsx scripts/research-for-content.ts --all            # Scan all content files
 *
 * Requires: PERPLEXITY_API_KEY in .env (for --fetch mode)
 */

import 'dotenv/config'
import * as fs from 'fs'
import * as path from 'path'
import { glob } from 'glob'
import matter from 'gray-matter'

const PROJECT_ROOT = process.cwd()
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY

// CLI args
const args = process.argv.slice(2)
const fetchSources = args.includes('--fetch')
const scanAll = args.includes('--all')
const targetFile = args.find(a => !a.startsWith('--'))

interface UncitedClaim {
  text: string
  lineNumber: number
  context: string
  type: 'money' | 'percentage' | 'statistic' | 'claim'
  suggestedQuery: string
}

interface FileAnalysis {
  filePath: string
  relativePath: string
  claims: UncitedClaim[]
  hasSources: boolean
}

interface SourceResult {
  claim: UncitedClaim
  sources: { title: string; url: string; snippet: string }[]
}

// Patterns for detecting statistics and claims
const STAT_PATTERNS = [
  // Money amounts
  {
    pattern: /\$[\d,]+(?:\s*(?:to|-)\s*\$[\d,]+)?(?:\s+(?:per|a)\s+(?:year|month|week|day|hour|case|lead|client))?/g,
    type: 'money' as const,
    queryTemplate: (match: string) => `${match} legal marketing statistics 2024 2025 2026`,
  },
  // Percentages (spelled out)
  {
    pattern: /\b(\d+(?:\.\d+)?)\s*percent\b/gi,
    type: 'percentage' as const,
    queryTemplate: (match: string) => `${match} law firm statistics research`,
  },
  // Large numbers
  {
    pattern: /\b(\d{1,3}(?:,\d{3})+)\s+(?:lawyers?|attorneys?|firms?|clients?|cases?|leads?)/gi,
    type: 'statistic' as const,
    queryTemplate: (match: string) => `${match} legal industry data`,
  },
  // Year-based stats
  {
    pattern: /\b(?:in|since|by)\s+20\d{2},?\s+[^.]+\d+/gi,
    type: 'statistic' as const,
    queryTemplate: (match: string) => `${match.replace(/,/g, '')} source`,
  },
  // Citation trigger phrases
  {
    pattern: /(?:according to|studies? show|research (?:shows?|indicates?)|data (?:shows?|suggests?)|survey (?:found|shows?|reveals?))[^.]+/gi,
    type: 'claim' as const,
    queryTemplate: (match: string) => `${match.slice(0, 100)} original source`,
  },
  // Comparative claims
  {
    pattern: /\b(\d+(?:\.\d+)?)\s*(?:times?|x)\s+(?:more|less|higher|lower|greater|better|worse)/gi,
    type: 'statistic' as const,
    queryTemplate: (match: string) => `${match} legal marketing research data`,
  },
  // Range statistics
  {
    pattern: /\b(?:between|from)\s+\d+(?:\.\d+)?\s*(?:to|and)\s*\d+(?:\.\d+)?\s*percent/gi,
    type: 'percentage' as const,
    queryTemplate: (match: string) => `${match} law firm statistics`,
  },
]

// Patterns that indicate a claim is cited
const CITATION_PATTERNS = [
  /\[\d+\]/g, // [1], [2], etc.
  /\([\w\s]+,?\s*\d{4}\)/g, // (Author, 2024)
  /\[Source:?\s*[^\]]+\]/gi, // [Source: ...]
  /according to [\w\s]+(?:'s)?\s+(?:\d{4}\s+)?(?:report|study|survey|research)/gi, // according to X's 2024 report
]

/**
 * Check if a line/context appears to be cited
 */
function isCited(context: string, fullContent: string): boolean {
  // Check if the line has inline citation markers
  for (const pattern of CITATION_PATTERNS) {
    if (pattern.test(context)) return true
  }

  // Check if there's a Sources section that might cover it
  const hasSourcesSection = /^##?\s*Sources?\s*$/im.test(fullContent)
  if (hasSourcesSection) {
    // If there's a Sources section, be more lenient
    // Only flag claims that are clearly uncited
    return context.includes('[') || context.toLowerCase().includes('according to')
  }

  return false
}

/**
 * Extract uncited claims from content
 */
function extractUncitedClaims(content: string, lines: string[]): UncitedClaim[] {
  const claims: UncitedClaim[] = []
  const seenClaims = new Set<string>()

  // Remove frontmatter
  const frontmatterEnd = content.indexOf('---', 3)
  const bodyStart = frontmatterEnd > 0 ? frontmatterEnd + 3 : 0
  const bodyContent = content.slice(bodyStart)
  const bodyLines = bodyContent.split('\n')

  // Calculate line offset
  const lineOffset = content.slice(0, bodyStart).split('\n').length - 1

  for (const { pattern, type, queryTemplate } of STAT_PATTERNS) {
    // Reset pattern
    const regex = new RegExp(pattern.source, pattern.flags)
    let match

    while ((match = regex.exec(bodyContent)) !== null) {
      const matchText = match[0].trim()

      // Skip if we've already seen this claim
      if (seenClaims.has(matchText)) continue
      seenClaims.add(matchText)

      // Find line number
      const beforeMatch = bodyContent.slice(0, match.index)
      const lineNum = beforeMatch.split('\n').length + lineOffset

      // Get context (full line)
      const contextLine = bodyLines[beforeMatch.split('\n').length - 1] || ''

      // Skip if in code block
      if (contextLine.trim().startsWith('```') || contextLine.trim().startsWith('`')) continue

      // Skip if this appears to be cited
      if (isCited(contextLine, content)) continue

      // Skip if it's in a heading or list item that's clearly metadata
      if (contextLine.trim().startsWith('#') && !contextLine.includes(':')) continue

      claims.push({
        text: matchText,
        lineNumber: lineNum,
        context: contextLine.trim().slice(0, 150),
        type,
        suggestedQuery: queryTemplate(matchText),
      })
    }
  }

  // Sort by line number
  claims.sort((a, b) => a.lineNumber - b.lineNumber)

  return claims
}

/**
 * Analyze a single file
 */
function analyzeFile(filePath: string): FileAnalysis {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const relativePath = path.relative(PROJECT_ROOT, filePath)

  const hasSources =
    /^##?\s*Sources?\s*$/im.test(content) ||
    /^##?\s*References?\s*$/im.test(content) ||
    /^\[\d+\]:/m.test(content)

  const claims = extractUncitedClaims(content, lines)

  return {
    filePath,
    relativePath,
    claims,
    hasSources,
  }
}

/**
 * Fetch sources for a claim using Perplexity
 */
async function fetchSourcesForClaim(claim: UncitedClaim): Promise<SourceResult> {
  if (!PERPLEXITY_API_KEY) {
    throw new Error('PERPLEXITY_API_KEY not set in .env')
  }

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'sonar-pro',
      messages: [
        {
          role: 'system',
          content: `You are a research assistant finding sources for legal marketing statistics.
Return only verified, recent sources (2022-2026 preferred).
For each source, provide:
1. Title or description
2. URL (if available)
3. Brief relevant quote or data point

Be precise. If you cannot find a reliable source, say so.`,
        },
        {
          role: 'user',
          content: `Find a credible source for this claim from legal marketing content:

"${claim.context}"

Specifically looking for: ${claim.text}

Search query: ${claim.suggestedQuery}

Provide 1-3 sources that verify this claim, or note if the claim cannot be verified.`,
        },
      ],
      max_tokens: 1000,
      return_citations: true,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Perplexity API error: ${response.status} - ${error}`)
  }

  const data = await response.json()
  const content = data.choices[0].message.content
  const citations = data.citations || []

  // Parse sources from response
  const sources = citations.map((url: string, i: number) => ({
    title: `Source ${i + 1}`,
    url,
    snippet: content.slice(0, 200),
  }))

  return {
    claim,
    sources,
  }
}

/**
 * Format output for a file analysis
 */
function formatAnalysis(analysis: FileAnalysis): string {
  let output = ''

  output += `\n📄 ${analysis.relativePath}\n`
  output += `   Sources section: ${analysis.hasSources ? '✓ Present' : '✗ Missing'}\n`
  output += `   Uncited claims found: ${analysis.claims.length}\n`

  if (analysis.claims.length === 0) {
    output += '   ✓ No uncited statistics detected\n'
    return output
  }

  output += '\n   Uncited Claims:\n'

  for (let i = 0; i < analysis.claims.length; i++) {
    const claim = analysis.claims[i]
    output += `\n   ${i + 1}. Line ${claim.lineNumber}: "${claim.text}"\n`
    output += `      Type: ${claim.type}\n`
    output += `      Context: "${claim.context}..."\n`
    output += `      Query: ${claim.suggestedQuery}\n`
  }

  return output
}

/**
 * Get all content files
 */
async function getContentFiles(): Promise<string[]> {
  const patterns = ['src/content/**/*.{md,mdx}']
  const files: string[] = []

  for (const pattern of patterns) {
    const matches = await glob(pattern, { cwd: PROJECT_ROOT })
    files.push(...matches.map(f => path.join(PROJECT_ROOT, f)))
  }

  return files
}

/**
 * Main function
 */
async function main() {
  console.log('\n🔍 LEXGRO Content Research Helper\n')

  let filesToAnalyze: string[] = []

  if (scanAll) {
    console.log('Scanning all content files...\n')
    filesToAnalyze = await getContentFiles()
  } else if (targetFile) {
    // Find matching file
    const allFiles = await getContentFiles()
    filesToAnalyze = allFiles.filter(f => f.includes(targetFile) || path.basename(f).includes(targetFile))

    if (filesToAnalyze.length === 0) {
      console.error(`No files found matching: ${targetFile}`)
      console.log('\nUsage:')
      console.log('  npx tsx scripts/research-for-content.ts <filename>')
      console.log('  npx tsx scripts/research-for-content.ts --all')
      process.exit(1)
    }
  } else {
    console.log('Usage:')
    console.log('  npx tsx scripts/research-for-content.ts <filename>           # Scan specific file')
    console.log('  npx tsx scripts/research-for-content.ts <filename> --fetch   # Fetch sources via Perplexity')
    console.log('  npx tsx scripts/research-for-content.ts --all                # Scan all content files')
    console.log('')
    console.log('Examples:')
    console.log('  npx tsx scripts/research-for-content.ts top-fractional-cmo-benefits')
    console.log('  npx tsx scripts/research-for-content.ts law-firm-seo.mdx --fetch')
    process.exit(0)
  }

  console.log(`Analyzing ${filesToAnalyze.length} file(s)...\n`)

  // Analyze files
  const analyses: FileAnalysis[] = []
  for (const file of filesToAnalyze) {
    analyses.push(analyzeFile(file))
  }

  // Summary
  const withClaims = analyses.filter(a => a.claims.length > 0)
  const totalClaims = analyses.reduce((sum, a) => sum + a.claims.length, 0)
  const withoutSources = analyses.filter(a => !a.hasSources && a.claims.length > 0)

  console.log('📊 Summary:\n')
  console.log(`   Files analyzed: ${analyses.length}`)
  console.log(`   Files with uncited claims: ${withClaims.length}`)
  console.log(`   Total uncited claims: ${totalClaims}`)
  console.log(`   Files missing Sources section: ${withoutSources.length}`)

  // Output analyses
  for (const analysis of analyses) {
    if (analysis.claims.length > 0 || !scanAll) {
      console.log(formatAnalysis(analysis))
    }
  }

  // Fetch sources if requested
  if (fetchSources && totalClaims > 0) {
    if (!PERPLEXITY_API_KEY) {
      console.log('\n⚠️  Cannot fetch sources: PERPLEXITY_API_KEY not set in .env')
    } else {
      console.log('\n🌐 Fetching sources from Perplexity...\n')

      // Only fetch for first 5 claims to avoid rate limits
      const claimsToFetch = withClaims
        .flatMap(a => a.claims)
        .slice(0, 5)

      for (const claim of claimsToFetch) {
        try {
          console.log(`   Searching for: "${claim.text.slice(0, 50)}..."`)
          const result = await fetchSourcesForClaim(claim)

          if (result.sources.length > 0) {
            console.log(`   ✓ Found ${result.sources.length} source(s):`)
            for (const source of result.sources) {
              console.log(`      - ${source.url}`)
            }
          } else {
            console.log('   ✗ No sources found')
          }
          console.log('')

          // Rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000))
        } catch (error: any) {
          console.log(`   ✗ Error: ${error.message}`)
        }
      }
    }
  }

  // Suggestions
  if (totalClaims > 0) {
    console.log('\n💡 Next Steps:\n')
    console.log('   1. Review each claim and determine if citation is needed')
    console.log('   2. Use the suggested queries to find sources')
    console.log('   3. Add a Sources section at the end of the article')
    console.log('   4. Use numbered references: [1], [2], etc.')
    console.log('')
    console.log('   Format for Sources section:')
    console.log('   ## Sources')
    console.log('   1. [Title](URL) - Brief description')
    console.log('   2. [Title](URL) - Brief description')
  }

  console.log('\n')
}

main().catch(console.error)
