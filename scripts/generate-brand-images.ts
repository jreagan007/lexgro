/**
 * Generate LEXGRO Brand-Aligned Images
 *
 * Creates images that match the dark green/orange brand aesthetic
 * for blog cards and OG images
 */

import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config()

const API_KEY = process.env.GEMINI_API_KEY
const IMAGE_MODEL = 'gemini-2.0-flash-exp'
const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:generateContent`

const OUTPUT_DIR = path.join(process.cwd(), 'src/assets/images/brand-cards')

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

// LEXGRO brand-aligned prompts
const BRAND_IMAGES = [
  // Blog Card 1: Fractional CMO Benefits
  {
    name: 'Fractional CMO Benefits',
    filename: 'card-fractional-cmo.png',
    prompt: `Abstract business growth visualization, dark forest green background (#0a2815), glowing orange accent lines forming upward trending graph, geometric shapes suggesting organizational structure, modern minimalist corporate design, subtle grid pattern overlay, professional C-suite executive concept, no text, no people, no faces, clean vector-style aesthetic, digital art illustration style, premium business consulting visual`
  },

  // Blog Card 2: Transform Client Growth
  {
    name: 'Transform Client Growth',
    filename: 'card-client-growth.png',
    prompt: `Abstract law firm growth concept, dark emerald green gradient background, orange and mint green accent circles representing client network expansion, connected nodes forming constellation pattern, upward flowing energy lines, modern data visualization aesthetic, no text, no people, geometric abstract shapes, professional legal services marketing visual, clean minimal corporate illustration`
  },

  // Blog Card 3: Bankruptcy Marketing
  {
    name: 'Bankruptcy Marketing Strategies',
    filename: 'card-bankruptcy-marketing.png',
    prompt: `Abstract fresh start concept, dark green to teal gradient background, orange sunrise rays emerging from horizon line, geometric shapes forming path forward, ascending steps or platforms, hopeful professional aesthetic, modern minimalist illustration, no text, no people, clean corporate visual representing new beginnings and growth opportunity, legal marketing concept`
  },

  // FAQ Section Graphic
  {
    name: 'FAQ Section',
    filename: 'card-faq.png',
    prompt: `Abstract question and answer concept, dark forest green background, floating translucent speech bubbles with orange and mint green accents, geometric Q shapes, interconnected knowledge network visualization, modern minimal corporate illustration, no text, no people, professional support and guidance visual, clean vector aesthetic`
  },

  // OG Image: Homepage
  {
    name: 'OG Homepage',
    filename: 'og-homepage.png',
    prompt: `Abstract law firm growth visualization, wide landscape format, dark green gradient background (#011907 to #1a4d2e), prominent orange accent stripe diagonals in corner, geometric building/columns silhouette with upward growth arrows, professional CMO consulting aesthetic, modern corporate illustration, no text, no people, premium business visual, 1200x630 composition`
  },

  // OG Image: Services
  {
    name: 'OG Services',
    filename: 'og-services.png',
    prompt: `Abstract marketing services concept, wide landscape format, dark emerald green background, four interconnected circular nodes representing service pillars, orange connecting lines, mint green accent highlights, modern consulting diagram aesthetic, geometric abstract shapes, no text, no people, clean professional corporate visual, strategic planning concept`
  },

  // OG Image: Blog
  {
    name: 'OG Blog',
    filename: 'og-blog.png',
    prompt: `Abstract knowledge sharing concept, wide landscape format, dark green gradient background, floating document/article shapes with orange bookmark accents, layered paper effect with depth, modern content marketing aesthetic, geometric minimal illustration, no text, no people, professional thought leadership visual, industry insights concept`
  },

  // OG Image: About
  {
    name: 'OG About',
    filename: 'og-about.png',
    prompt: `Abstract team expertise concept, wide landscape format, dark forest green background, geometric human figure silhouettes in collaborative arrangement, orange and mint green accent elements, modern corporate culture illustration, professional leadership aesthetic, no faces, no text, clean minimal business visual, trusted advisory concept`
  },

  // Feature Card: CMO Training
  {
    name: 'CMO Training Card',
    filename: 'card-cmo-training.png',
    prompt: `Abstract training dashboard concept, light mint green background with subtle grid, floating UI card elements with progress indicators, checkmarks and module icons in dark green and orange, modern SaaS interface aesthetic, clean flat design illustration, educational platform visual, no text, no people, professional learning management concept`
  },

  // Feature Card: Vendor Platform
  {
    name: 'Vendor Platform Card',
    filename: 'card-vendor-platform.png',
    prompt: `Abstract vendor marketplace concept, light sage green background, floating category cards with rating stars, connected service provider network visualization, orange accent badges, modern platform UI aesthetic, clean flat design illustration, no text, no people, professional vendor management visual, marketplace concept`
  },

  // Feature Card: Practice Area Experts
  {
    name: 'Practice Area Experts',
    filename: 'card-practice-experts.png',
    prompt: `Abstract professional network concept, light green background with subtle pattern, central hub with radiating connection lines to outer nodes, collaboration and community visualization, orange and dark green accent elements, modern networking platform aesthetic, clean minimal illustration, no faces, no text, legal community concept`
  },

  // Feature Card: Growth Process
  {
    name: 'Growth Process Card',
    filename: 'card-growth-process.png',
    prompt: `Abstract four-stage process visualization, light mint background, horizontal timeline with four connected milestone markers, progress indicators in dark green with orange checkmarks, modern workflow diagram aesthetic, clean flat design illustration, step-by-step journey concept, no text, no people, professional consulting process visual`
  }
]

async function generateImage(item: typeof BRAND_IMAGES[0]): Promise<boolean> {
  const outputPath = path.join(OUTPUT_DIR, item.filename)

  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  Skipping ${item.name} (exists)`)
    return true
  }

  console.log(`🎨 Generating: ${item.name}...`)

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
      console.error(`❌ API Error: ${data.error.message}`)
      return false
    }

    const parts = data.candidates?.[0]?.content?.parts || []
    for (const part of parts) {
      if (part.inlineData?.data) {
        const buffer = Buffer.from(part.inlineData.data, 'base64')
        fs.writeFileSync(outputPath, buffer)
        console.log(`✅ Generated: ${item.filename}`)
        return true
      }
    }

    console.error(`❌ No image returned for ${item.name}`)
    return false

  } catch (error: any) {
    console.error(`❌ Error: ${error.message}`)
    return false
  }
}

async function main() {
  if (!API_KEY) {
    console.error('❌ GEMINI_API_KEY not found')
    process.exit(1)
  }

  console.log('\n🎨 LEXGRO Brand Image Generation\n')
  console.log(`📁 Output: ${OUTPUT_DIR}\n`)

  let success = 0
  let failed = 0

  for (const item of BRAND_IMAGES) {
    const result = await generateImage(item)
    result ? success++ : failed++
    // Rate limit
    await new Promise(r => setTimeout(r, 3000))
  }

  console.log(`\n📊 Results: ${success} success, ${failed} failed\n`)
}

main().catch(console.error)
