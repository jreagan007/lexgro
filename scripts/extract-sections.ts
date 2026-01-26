/**
 * Extract specific sections from the full page capture
 */

import sharp from 'sharp'
import * as path from 'path'

const INPUT = path.join(process.cwd(), 'src/assets/images/captured-sections/full-page.png')
const OUTPUT_DIR = path.join(process.cwd(), 'src/assets/images/captured-sections')

// Sections with approximate Y positions on the 15381px page
// Based on visual inspection of the full page capture
const SECTIONS = [
  { name: 'hero-banner', y: 0, height: 600 },
  { name: 'trust-logos', y: 550, height: 100 },
  { name: 'video-cta', y: 650, height: 500 },
  { name: 'circle-trust', y: 1150, height: 600 },
  { name: 'problems-solutions', y: 1750, height: 900 },
  { name: 'acquire-knowledge-header', y: 2650, height: 400 },
  { name: 'feature-cards-top', y: 3050, height: 700 },
  { name: 'feature-cards-bottom', y: 3750, height: 700 },
  { name: 'testimonials-grid', y: 4450, height: 800 },
  { name: 'pricing-section', y: 5250, height: 700 },
  { name: 'faq-section', y: 5950, height: 600 },
  { name: 'blog-preview', y: 6550, height: 500 },
  { name: 'final-cta', y: 7050, height: 400 },
]

async function main() {
  console.log('\n✂️  Extracting sections from full page...\n')

  const image = sharp(INPUT)
  const metadata = await image.metadata()

  console.log(`📏 Full page: ${metadata.width}x${metadata.height}\n`)

  for (const section of SECTIONS) {
    // Make sure we don't exceed image bounds
    const safeY = Math.min(section.y, (metadata.height || 15381) - section.height)
    const safeHeight = Math.min(section.height, (metadata.height || 15381) - safeY)

    if (safeY < 0 || safeHeight <= 0) {
      console.log(`⚠️  Skipping ${section.name} (out of bounds)`)
      continue
    }

    try {
      await sharp(INPUT)
        .extract({
          left: 0,
          top: safeY,
          width: metadata.width || 1440,
          height: safeHeight
        })
        .toFile(path.join(OUTPUT_DIR, `extracted-${section.name}.png`))

      console.log(`✅ ${section.name} (y: ${safeY}, h: ${safeHeight})`)
    } catch (err: any) {
      console.log(`❌ ${section.name}: ${err.message}`)
    }
  }

  console.log('\n🎉 Done!\n')
}

main().catch(console.error)
