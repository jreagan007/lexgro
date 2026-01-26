/**
 * Extract specific sections - adjusted positions based on actual page
 */

import sharp from 'sharp'
import * as path from 'path'

const INPUT = path.join(process.cwd(), 'src/assets/images/captured-sections/full-page.png')
const OUTPUT_DIR = path.join(process.cwd(), 'src/assets/images/captured-sections')

// Adjusted Y positions based on 15381px page height
// Looking at the thumbnail, the dark sections appear around 55-65% down the page
const SECTIONS = [
  { name: 'v2-hero', y: 0, height: 800 },
  { name: 'v2-video-section', y: 800, height: 700 },
  { name: 'v2-awards-section', y: 1500, height: 500 },
  { name: 'v2-problems-dark', y: 7500, height: 1200 },
  { name: 'v2-acquire-knowledge', y: 4500, height: 800 },
  { name: 'v2-feature-cards', y: 5300, height: 1200 },
  { name: 'v2-testimonials', y: 10000, height: 1500 },
  { name: 'v2-pricing', y: 11500, height: 1000 },
  { name: 'v2-faq', y: 12500, height: 800 },
  { name: 'v2-final-cta', y: 14500, height: 800 },
]

async function main() {
  console.log('\n✂️  Extracting sections v2...\n')

  const image = sharp(INPUT)
  const metadata = await image.metadata()

  console.log(`📏 Full page: ${metadata.width}x${metadata.height}\n`)

  for (const section of SECTIONS) {
    const maxY = (metadata.height || 15381) - section.height
    const safeY = Math.min(section.y, maxY)
    const safeHeight = Math.min(section.height, (metadata.height || 15381) - safeY)

    if (safeY < 0 || safeHeight <= 0) {
      console.log(`⚠️  Skipping ${section.name}`)
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
        .toFile(path.join(OUTPUT_DIR, `${section.name}.png`))

      console.log(`✅ ${section.name} (y: ${safeY}, h: ${safeHeight})`)
    } catch (err: any) {
      console.log(`❌ ${section.name}: ${err.message}`)
    }
  }

  console.log('\n🎉 Done!\n')
}

main().catch(console.error)
