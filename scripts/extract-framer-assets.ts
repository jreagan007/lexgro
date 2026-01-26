/**
 * Extract assets from Framer site
 *
 * Usage: npx tsx scripts/extract-framer-assets.ts
 */

import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'

const SITE_URL = 'https://lexgro.com'
const OUTPUT_DIR = path.join(process.cwd(), 'extracted-assets')

// Ensure output directories exist
const dirs = ['images', 'svgs', 'css']
dirs.forEach(dir => {
  const fullPath = path.join(OUTPUT_DIR, dir)
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true })
  }
})

async function fetchPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve(data))
      res.on('error', reject)
    }).on('error', reject)
  })
}

async function downloadFile(url: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath)
    https.get(url, (response) => {
      response.pipe(file)
      file.on('finish', () => {
        file.close()
        resolve()
      })
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {}) // Delete partial file
      reject(err)
    })
  })
}

async function main() {
  console.log('\n🔍 Extracting assets from Framer site...\n')
  console.log(`📍 Source: ${SITE_URL}`)
  console.log(`📁 Output: ${OUTPUT_DIR}\n`)

  try {
    // Fetch the main page
    console.log('📄 Fetching page HTML...')
    const html = await fetchPage(SITE_URL)

    // Find all framerusercontent.com URLs
    const framerUrlRegex = /https:\/\/framerusercontent\.com\/[^"'\s)]+/g
    const matches = html.match(framerUrlRegex) || []

    // Also find any other image URLs
    const imgRegex = /https?:\/\/[^"'\s)]+\.(png|jpg|jpeg|webp|svg|gif)/gi
    const imgMatches = html.match(imgRegex) || []

    // Combine and dedupe
    const allUrls = [...new Set([...matches, ...imgMatches])]

    console.log(`\n🖼️  Found ${allUrls.length} asset URLs\n`)

    // Save URLs to file for reference
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'asset-urls.txt'),
      allUrls.join('\n')
    )
    console.log('📝 Saved URL list to asset-urls.txt\n')

    // Download each asset
    let downloaded = 0
    let failed = 0

    for (const url of allUrls) {
      try {
        // Extract filename from URL
        const urlObj = new URL(url)
        let filename = path.basename(urlObj.pathname)

        // Clean up filename
        filename = filename.replace(/[?#].*$/, '') // Remove query params
        if (!filename || filename === '/') {
          filename = `asset-${downloaded}.png`
        }

        // Determine subdirectory
        let subdir = 'images'
        if (filename.endsWith('.svg')) subdir = 'svgs'
        else if (filename.endsWith('.css')) subdir = 'css'

        const outputPath = path.join(OUTPUT_DIR, subdir, filename)

        // Skip if already exists
        if (fs.existsSync(outputPath)) {
          console.log(`⏭️  Skipping (exists): ${filename}`)
          continue
        }

        console.log(`⬇️  Downloading: ${filename}`)
        await downloadFile(url, outputPath)
        downloaded++

        // Rate limit
        await new Promise(r => setTimeout(r, 100))

      } catch (err: any) {
        console.log(`❌ Failed: ${url.slice(0, 60)}... - ${err.message}`)
        failed++
      }
    }

    console.log(`\n✅ Complete: ${downloaded} downloaded, ${failed} failed\n`)

    // Also save the raw HTML for reference
    fs.writeFileSync(path.join(OUTPUT_DIR, 'page.html'), html)
    console.log('📄 Saved raw HTML to page.html')

    // Extract inline styles
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi
    const styles: string[] = []
    let match
    while ((match = styleRegex.exec(html)) !== null) {
      styles.push(match[1])
    }

    if (styles.length > 0) {
      fs.writeFileSync(
        path.join(OUTPUT_DIR, 'css', 'extracted-styles.css'),
        styles.join('\n\n/* --- */\n\n')
      )
      console.log(`📝 Extracted ${styles.length} inline style blocks`)
    }

    console.log('\n🎉 Done! Check the extracted-assets folder.\n')

  } catch (err: any) {
    console.error('❌ Error:', err.message)
  }
}

main()
