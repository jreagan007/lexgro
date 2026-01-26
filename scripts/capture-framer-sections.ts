/**
 * Capture specific sections from Framer site using Puppeteer
 *
 * Usage: npx tsx scripts/capture-framer-sections.ts
 *
 * Requires: npm install puppeteer
 */

import puppeteer from 'puppeteer'
import * as fs from 'fs'
import * as path from 'path'

const SITE_URL = 'https://lexgro.com'
const OUTPUT_DIR = path.join(process.cwd(), 'src/assets/images/captured-sections')

// Sections to capture with their approximate scroll positions
const SECTIONS_TO_CAPTURE = [
  { name: 'hero', scrollY: 0, height: 900 },
  { name: 'trust-badges', scrollY: 800, height: 200 },
  { name: 'video-section', scrollY: 1000, height: 600 },
  { name: 'awards-section', scrollY: 1600, height: 500 },
  { name: 'circle-of-trust', scrollY: 2100, height: 700 },
  { name: 'problems-section', scrollY: 2800, height: 600 },
  { name: 'solutions-wheel', scrollY: 3400, height: 700 },
  { name: 'acquire-knowledge', scrollY: 4100, height: 800 },
  { name: 'feature-cards-1', scrollY: 4900, height: 600 },
  { name: 'feature-cards-2', scrollY: 5500, height: 600 },
  { name: 'testimonials', scrollY: 6100, height: 600 },
  { name: 'pricing', scrollY: 6700, height: 700 },
  { name: 'faq', scrollY: 7400, height: 600 },
  { name: 'blog-preview', scrollY: 8000, height: 500 },
  { name: 'final-cta', scrollY: 8500, height: 500 },
]

async function main() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  console.log('\n📸 Capturing Framer sections...\n')
  console.log(`📍 Source: ${SITE_URL}`)
  console.log(`📁 Output: ${OUTPUT_DIR}\n`)

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage()

  // Set viewport to desktop size
  await page.setViewport({ width: 1440, height: 900 })

  console.log('🌐 Loading page...')
  await page.goto(SITE_URL, { waitUntil: 'networkidle2', timeout: 60000 })

  // Wait for animations to settle
  await new Promise(r => setTimeout(r, 3000))

  // Get full page height
  const pageHeight = await page.evaluate(() => document.body.scrollHeight)
  console.log(`📏 Page height: ${pageHeight}px\n`)

  // Capture full page first
  console.log('📸 Capturing full page...')
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'full-page.png'),
    fullPage: true
  })
  console.log('✅ Full page saved\n')

  // Capture each section
  for (const section of SECTIONS_TO_CAPTURE) {
    console.log(`📸 Capturing: ${section.name}...`)

    // Scroll to section
    await page.evaluate((y) => window.scrollTo(0, y), section.scrollY)
    await new Promise(r => setTimeout(r, 500)) // Let animations trigger

    // Take screenshot of viewport
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${section.name}.png`),
      clip: {
        x: 0,
        y: 0,
        width: 1440,
        height: section.height
      }
    })

    console.log(`✅ ${section.name}.png`)
  }

  await browser.close()

  console.log('\n🎉 Done! Check the captured-sections folder.\n')
}

main().catch(console.error)
