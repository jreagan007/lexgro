/**
 * Generate LEXGRO Editorial Images for Guide Content
 *
 * 35mm documentary film photography style
 * Kodak Portra 400, Kodak Gold 200, Fuji Pro 400H
 * No people, no faces, no readable text
 * Warm muted tones, imperfect authenticity
 *
 * Usage:
 *   npx tsx scripts/generate-editorial-images.ts
 *   npx tsx scripts/generate-editorial-images.ts --guide law-firm-marketing
 *   npx tsx scripts/generate-editorial-images.ts --force
 */

import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import sharp from 'sharp'

dotenv.config()

const API_KEY = process.env.GEMINI_API_KEY
const IMAGE_MODEL = 'gemini-2.0-flash-exp-image-generation'
const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:generateContent`

const OUTPUT_DIR = path.join(process.cwd(), 'public/images/editorial')

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

interface EditorialImage {
  guide: string
  section: string
  filename: string
  alt: string
  prompt: string
}

/**
 * Guide Editorial Images
 * Each guide gets 3-4 section-specific images
 * Style: 35mm documentary film, 1970s-1990s corporate/editorial era
 * Prompts follow OG image format from src/lib/og/prompts.ts
 */
const GUIDE_IMAGES: EditorialImage[] = [
  // === LAW FIRM MARKETING ===
  {
    guide: 'law-firm-marketing',
    section: 'hero',
    filename: 'law-firm-marketing-hero.jpg',
    alt: 'Morning light falls across a law firm conference table with scattered marketing reports and a half-finished coffee',
    prompt: `Law firm conference table at morning golden hour, marketing reports scattered across polished wood, ceramic coffee cup half full, chair pushed back, warm light through tall windows, 1990s corporate documentary style, Kodak Portra 400 warm muted tones, natural grain, no people, no text, no logos, authentic strategy session atmosphere`
  },
  {
    guide: 'law-firm-marketing',
    section: 'channels',
    filename: 'law-firm-marketing-channels.jpg',
    alt: 'A desk covered in channel performance printouts beneath a warm reading lamp in a law office',
    prompt: `Professional desk with performance reports arranged side by side, warm brass reading lamp casting directional light, pencil marks visible but not readable, late afternoon office light through blinds, 1990s editorial research aesthetic, Kodak Gold 200 warm amber tones, shallow depth of field, no people, no text, no logos`
  },
  {
    guide: 'law-firm-marketing',
    section: 'budget',
    filename: 'law-firm-marketing-budget.jpg',
    alt: 'A vintage calculator sits beside budget worksheets on an oak desk in warm afternoon light',
    prompt: `Vintage desktop calculator beside legal pad on oak desk, afternoon light through blinds casting striped shadows, fountain pen uncapped nearby, 1980s accounting office documentary style, Kodak Portra 160 muted warm tones, shallow focus on calculator keys, no readable numbers, no people, no logos`
  },
  {
    guide: 'law-firm-marketing',
    section: 'measurement',
    filename: 'law-firm-marketing-measurement.jpg',
    alt: 'Stacked manila folders with colored tabs beside a phone on a credenza in evening light',
    prompt: `Stacked manila folders with colored index tabs on credenza, desk phone nearby, evening golden hour through window, dust motes in light shaft, 1990s professional services documentary style, Fuji Pro 400H warm muted tones, no people, no text, no logos, authentic results-tracking atmosphere`
  },

  // === LAW FIRM SEO ===
  {
    guide: 'law-firm-seo',
    section: 'hero',
    filename: 'law-firm-seo-hero.jpg',
    alt: 'A research workspace with reference books and a notepad under warm lamp light',
    prompt: `Research workspace with stack of reference books, open notepad with pen, warm brass desk lamp, keyboard edge visible in background, late evening study session, 1990s information gathering aesthetic, Kodak Portra 400 warm amber tones, natural grain, no people, no text, no logos`
  },
  {
    guide: 'law-firm-seo',
    section: 'local',
    filename: 'law-firm-seo-local.jpg',
    alt: 'A framed city map hangs on a law office wall beside a potted fern in morning light',
    prompt: `Framed vintage city map on dark wood office wall, potted fern on shelf below, morning light illuminating map surface, established neighborhood law practice feel, 1980s editorial interiors style, Kodak Gold 200 warm earthy tones, shallow depth of field, no readable text, no people, no logos`
  },
  {
    guide: 'law-firm-seo',
    section: 'content',
    filename: 'law-firm-seo-content.jpg',
    alt: 'Open leather journal beside coffee on a wooden desk with warm morning light',
    prompt: `Open leather-bound journal beside ceramic coffee mug on worn wooden desk, morning window light, green plant leaf in soft focus background, pen resting on page, 1990s journaling documentary style, Fuji Pro 400H warm green undertones, natural grain, no readable text, no people, no logos`
  },

  // === LAW FIRM PPC ===
  {
    guide: 'law-firm-ppc',
    section: 'hero',
    filename: 'law-firm-ppc-hero.jpg',
    alt: 'An advertising office desk with campaign printouts and a desk lamp in late afternoon',
    prompt: `Campaign materials spread on professional desk, performance printouts face down with edges visible, desk lamp casting warm focused light, late afternoon through blinds, 1990s ad agency editorial style, Kodak Portra 400 warm amber tones, slight grain, no people, no text, no logos`
  },
  {
    guide: 'law-firm-ppc',
    section: 'landing-pages',
    filename: 'law-firm-ppc-landing.jpg',
    alt: 'Wireframe sketches on graph paper beside a ruler on a design desk',
    prompt: `Wireframe sketches on graph paper, metal ruler beside, pencil marks and erasure marks visible, warm desk lamp on drafting table, 1980s graphic design studio documentary style, Kodak Gold 200 warm creative tones, no readable text, no people, no logos`
  },
  {
    guide: 'law-firm-ppc',
    section: 'optimization',
    filename: 'law-firm-ppc-optimization.jpg',
    alt: 'A magnifying glass rests on campaign performance sheets in warm office light',
    prompt: `Magnifying glass resting on printed sheets, warm office afternoon light, detail-oriented analysis workspace, 1990s quality control documentary style, Fuji Pro 400H muted warm tones, shallow depth of field, no readable text, no people, no logos`
  },

  // === LAW FIRM WEB DESIGN ===
  {
    guide: 'law-firm-web-design',
    section: 'hero',
    filename: 'law-firm-web-design-hero.jpg',
    alt: 'A design workspace with color swatches and layout sketches in morning light',
    prompt: `Color swatches fanned out on desk, layout sketches on drafting paper, morning light through tall studio windows, architectural design planning feel, 1990s design studio documentary style, Kodak Portra 400 warm creative tones, natural grain, no people, no text, no logos`
  },
  {
    guide: 'law-firm-web-design',
    section: 'trust',
    filename: 'law-firm-web-design-trust.jpg',
    alt: 'Framed credentials and certificates arranged on a dark wood credenza',
    prompt: `Framed professional credentials on dark wood credenza, polished surface reflecting warm light, established law firm lobby feel, 1980s professional services aesthetic, Kodak Ektar rich warm tones, shallow depth of field on frames, no readable text, no faces, no logos`
  },
  {
    guide: 'law-firm-web-design',
    section: 'mobile',
    filename: 'law-firm-web-design-mobile.jpg',
    alt: 'A phone and tablet rest on a glass table in a modern law office waiting area',
    prompt: `Smartphone and tablet face down on glass side table in law office waiting area, natural afternoon light, comfortable seating in background, contemporary professional services space, Fuji Pro 400H warm modern tones, no people, no text, no logos, no screens glowing`
  },

  // === LAW FIRM LEAD GENERATION ===
  {
    guide: 'law-firm-lead-generation',
    section: 'hero',
    filename: 'law-firm-lead-generation-hero.jpg',
    alt: 'A desk phone beside a full inbox tray in warm afternoon light at a law firm',
    prompt: `Professional desk phone beside full inbox paper tray, warm afternoon light through office window, active client pipeline atmosphere, 1990s law firm intake office documentary style, Kodak Portra 400 warm business tones, natural grain, no people, no text, no logos`
  },
  {
    guide: 'law-firm-lead-generation',
    section: 'intake',
    filename: 'law-firm-lead-generation-intake.jpg',
    alt: 'A consultation notepad and pen sit ready beside a comfortable chair in a law office',
    prompt: `Fresh consultation notepad with quality pen on side table beside leather chair, inviting client meeting space, warm lamp light, 1980s client services documentary style, Kodak Gold 200 warm welcoming tones, no people, no text, no logos, authentic intake atmosphere`
  },
  {
    guide: 'law-firm-lead-generation',
    section: 'referrals',
    filename: 'law-firm-lead-generation-referrals.jpg',
    alt: 'A rolodex and business card holder on a professional desk in golden light',
    prompt: `Vintage rolodex beside business card holder on professional desk, golden hour light, relationship-building atmosphere, 1980s professional networking aesthetic, Fuji Pro 400H warm amber tones, shallow depth of field, no readable text, no people, no logos`
  },

  // === LAW FIRM MARKETING BUDGET ===
  {
    guide: 'law-firm-marketing-budget',
    section: 'hero',
    filename: 'law-firm-marketing-budget-hero.jpg',
    alt: 'A financial calculator beside ledger books and a coffee cup on a partner desk',
    prompt: `Financial calculator beside leather-bound ledger books, ceramic coffee cup, mahogany desk surface, morning light through blinds, 1980s executive financial planning style, Kodak Portra 160 muted warm professional tones, no readable numbers, no people, no logos`
  },
  {
    guide: 'law-firm-marketing-budget',
    section: 'allocation',
    filename: 'law-firm-marketing-budget-allocation.jpg',
    alt: 'Colored sticky notes arranged in columns on a conference table for budget planning',
    prompt: `Colored sticky notes in neat columns on polished conference table, afternoon light, organized strategic planning atmosphere, 1990s consulting firm documentary style, Fuji Pro 400H warm tones, no readable text, no people, no logos`
  },
  {
    guide: 'law-firm-marketing-budget',
    section: 'roi',
    filename: 'law-firm-marketing-budget-roi.jpg',
    alt: 'A green potted plant growing toward window light on a clean desk surface',
    prompt: `Healthy green plant reaching toward window light on clean desk surface, growth metaphor, natural upward trajectory, warm morning light, Kodak Portra 400 vivid greens against warm tones, shallow depth of field, no people, no text, no logos, authentic sustainable growth atmosphere`
  },

  // === FRACTIONAL CMO FOR LAW FIRMS ===
  {
    guide: 'fractional-cmo-law-firms',
    section: 'hero',
    filename: 'fractional-cmo-hero.jpg',
    alt: 'An executive corner office at dusk with city lights visible through the window',
    prompt: `Executive corner office at dusk, city lights beginning to glow through floor-to-ceiling windows, empty leather chair at mahogany desk, briefcase beside, 1990s corporate photography style, Kodak Portra 400 warm interior cool exterior contrast, no people, no text, no logos, authentic C-suite atmosphere`
  },
  {
    guide: 'fractional-cmo-law-firms',
    section: 'partnership',
    filename: 'fractional-cmo-partnership.jpg',
    alt: 'Two leather chairs facing each other across a coffee table in warm afternoon light',
    prompt: `Two leather chairs facing each other, warm afternoon light between them, coffee cups on side table, green plant in corner, 1990s consulting firm editorial style, Kodak Portra 400 warm professional tones, natural grain, no people, no text, no logos, authentic partnership atmosphere`
  },
  {
    guide: 'fractional-cmo-law-firms',
    section: 'strategy',
    filename: 'fractional-cmo-strategy.jpg',
    alt: 'A whiteboard with erased planning marks beside scattered dry erase markers',
    prompt: `Whiteboard with visible erased marks from recent planning session, dry erase markers on tray, empty conference chairs, morning light through frosted glass, 1990s consulting firm aesthetic, Fuji Pro 400H muted warm tones, documentary style, no readable text, no people, no logos`
  },
]

async function generateImage(item: EditorialImage, force: boolean): Promise<boolean> {
  const outputPath = path.join(OUTPUT_DIR, item.filename)

  // Skip if exists and not forcing
  if (!force && fs.existsSync(outputPath)) {
    console.log(`  ⏭️  Skipping (cached): ${item.filename}`)
    return true
  }

  console.log(`  📸 Generating: ${item.filename}`)

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY!
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: item.prompt }]
        }],
        generationConfig: {
          responseModalities: ['TEXT', 'IMAGE']
        }
      })
    })

    const data = await response.json()

    if (data.error) {
      console.error(`  ❌ API Error: ${data.error.message}`)
      return false
    }

    const parts = data.candidates?.[0]?.content?.parts || []
    for (const part of parts) {
      if (part.inlineData?.data) {
        const rawBuffer = Buffer.from(part.inlineData.data, 'base64')

        // Process: resize to editorial width, optimize as JPEG
        const processed = await sharp(rawBuffer)
          .resize(1200, 675, { fit: 'cover', position: 'center' })
          .jpeg({ quality: 82, progressive: true })
          .toBuffer()

        fs.writeFileSync(outputPath, processed)
        const sizeKB = Math.round(processed.length / 1024)
        console.log(`  ✅ Generated: ${item.filename} (${sizeKB}KB)`)
        return true
      }
    }

    console.error(`  ❌ No image in response for ${item.filename}`)
    return false

  } catch (error: any) {
    console.error(`  ❌ Error: ${error.message}`)
    return false
  }
}

async function main() {
  if (!API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in .env')
    process.exit(1)
  }

  const args = process.argv.slice(2)
  const force = args.includes('--force')
  const guideFilter = args.find(a => a.startsWith('--guide'))
    ? args[args.indexOf('--guide') + 1]
    : null

  let images = GUIDE_IMAGES
  if (guideFilter) {
    images = images.filter(img => img.guide === guideFilter)
    if (images.length === 0) {
      console.error(`❌ No images found for guide: ${guideFilter}`)
      console.log('Available guides:', [...new Set(GUIDE_IMAGES.map(i => i.guide))].join(', '))
      process.exit(1)
    }
  }

  const guides = [...new Set(images.map(i => i.guide))]

  console.log('\n📸 LEXGRO Editorial Image Generation')
  console.log('━'.repeat(45))
  console.log(`Style: 35mm documentary film, Portra/Gold/Pro 400H`)
  console.log(`Model: ${IMAGE_MODEL}`)
  console.log(`Output: ${OUTPUT_DIR}`)
  console.log(`Images: ${images.length} across ${guides.length} guide(s)`)
  if (force) console.log('Mode: Force regeneration')
  console.log('')

  let success = 0
  let failed = 0

  for (const guide of guides) {
    const guideImages = images.filter(i => i.guide === guide)
    console.log(`\n📖 ${guide} (${guideImages.length} images)`)

    for (const item of guideImages) {
      const result = await generateImage(item, force)
      result ? success++ : failed++
      // Rate limit: 3 seconds between API calls
      await new Promise(r => setTimeout(r, 3000))
    }
  }

  console.log(`\n━${'━'.repeat(44)}`)
  console.log(`📊 Results: ${success} success, ${failed} failed`)
  console.log(`📁 Images saved to: ${OUTPUT_DIR}\n`)

  // Print alt text reference for MDX usage
  if (success > 0) {
    console.log('📝 MDX Usage Reference:')
    console.log('━'.repeat(45))
    for (const img of images) {
      console.log(`\n<!-- ${img.guide} / ${img.section} -->`)
      console.log(`<figure>`)
      console.log(`  <img src="/images/editorial/${img.filename}" alt="${img.alt}" />`)
      console.log(`  <figcaption>Caption here</figcaption>`)
      console.log(`</figure>`)
    }
    console.log('')
  }
}

main().catch(console.error)
