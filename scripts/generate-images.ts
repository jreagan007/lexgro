/**
 * Generate OG Images and Section Graphics for LEXGRO
 *
 * Usage: npx tsx scripts/generate-images.ts
 */

import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config()

const API_KEY = process.env.GEMINI_API_KEY
const IMAGE_MODEL = 'gemini-2.0-flash-exp' // Use experimental model with image gen
const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:generateContent`

const OUTPUT_DIR = path.join(process.cwd(), 'src/assets/images/generated')

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

interface ImagePrompt {
  name: string
  filename: string
  prompt: string
}

// Image prompts for LEXGRO
const IMAGE_PROMPTS: ImagePrompt[] = [
  // FAQ Section Image
  {
    name: 'FAQ Section',
    filename: 'faq-section.png',
    prompt: `Professional law office consultation scene, warm natural lighting through windows, comfortable leather chairs around polished conference table, green plant accent in corner, open legal folder with documents, reading glasses resting on table, sophisticated business atmosphere, shot on 35mm film, Kodak Portra 400 warm tones, shallow depth of field, no people visible, no text, no logos, no computer screens, authentic supportive environment for questions and answers, editorial photography style`
  },

  // Blog Card 1: Fractional CMO Benefits
  {
    name: 'Blog: Fractional CMO Benefits',
    filename: 'blog-fractional-cmo.png',
    prompt: `Modern executive corner office at golden hour, warm sunlight casting long shadows through floor-to-ceiling windows, city skyline blurred in background, elegant desk with leather chair, small green plant accent, sophisticated C-suite leadership atmosphere, 35mm film aesthetic, Kodak Portra 160 warm professional tones, no people visible, no text, no computer screens, no logos, authentic fractional executive workspace, editorial interiors photography`
  },

  // Blog Card 2: Transform Client Growth
  {
    name: 'Blog: Transform Client Growth',
    filename: 'blog-transform-growth.png',
    prompt: `Thriving indoor plant reaching toward window light in modern office setting, morning golden hour, upward growth visible in leaves and stems, clean minimalist desk surface below, glass of water catching light, inspiring professional atmosphere, shot on medium format film, Fuji Pro 400H green tones, shallow depth of field on plant growth, no people visible, no text, no logos, authentic business growth metaphor, documentary lifestyle photography`
  },

  // Blog Card 3: Bankruptcy Lawyers Marketing
  {
    name: 'Blog: Bankruptcy Lawyers Marketing',
    filename: 'blog-bankruptcy-marketing.png',
    prompt: `Fresh start minimalist desk scene, single thriving succulent plant in modern pot, morning light through sheer curtains, clean organized surface with leather notebook, hopeful new beginning atmosphere, light airy professional space, Portra 160 soft muted colors, documentary style photography, no clutter, no paper mess, no people visible, no text, no logos, authentic financial recovery and fresh start aesthetic, editorial interiors`
  },

  // OG Image Base: Default/Homepage
  {
    name: 'OG: Homepage',
    filename: 'og-homepage.png',
    prompt: `Professional law firm lobby with comfortable seating area, warm afternoon light through large windows, green plant accents throughout, polished surfaces and clean lines, welcoming sophisticated atmosphere, dark green accent wall visible, editorial interiors photography, Kodak Portra 400 warm colors, wide angle composition, no people visible, no text, no logos, no reception desk, authentic upscale law firm growth environment`
  },

  // OG Image Base: Services
  {
    name: 'OG: Services',
    filename: 'og-services.png',
    prompt: `Strategy session setup in modern conference room, afternoon light through blinds creating patterns, whiteboard edge visible out of focus, leather portfolio and pen on polished table, professional consulting atmosphere, serious business mood, 35mm film grain, Kodak Ektar muted professional tones, no people visible, no text on whiteboard, no logos, authentic CMO consulting environment, editorial photography`
  },

  // OG Image Base: Blog
  {
    name: 'OG: Blog',
    filename: 'og-blog.png',
    prompt: `Coffee cup steaming on wooden desk beside open notebook, morning window light, green plant leaf in soft focus background, creative workspace atmosphere, journaling and content creation moment, documentary lifestyle photography, 35mm film aesthetic, Portra 400 warm inviting colors, shallow depth of field, no readable text, no people visible, no screens, no logos, authentic thought leadership content creation space`
  },

  // OG Image Base: Guide
  {
    name: 'OG: Guide',
    filename: 'og-guide.png',
    prompt: `Open book pages catching warm reading lamp light, cozy study corner atmosphere, leather armchair edge visible, evening golden hour, educational welcoming mood, classic knowledge-sharing aesthetic, editorial lifestyle photography, Kodak Portra 800 warm tones, soft bokeh background, no readable text on pages, no people visible, no faces, authentic learning resource aesthetic`
  }
]

async function generateImage(prompt: ImagePrompt): Promise<boolean> {
  const outputPath = path.join(OUTPUT_DIR, prompt.filename)

  // Skip if already exists
  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  Skipping ${prompt.name} (already exists)`)
    return true
  }

  console.log(`🎨 Generating: ${prompt.name}...`)

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY!
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt.prompt
          }]
        }],
        generationConfig: {
          responseModalities: ['TEXT', 'IMAGE']
        }
      })
    })

    const data = await response.json()

    if (data.error) {
      console.error(`❌ API Error for ${prompt.name}: ${data.error.message}`)
      return false
    }

    // Extract image from response
    const parts = data.candidates?.[0]?.content?.parts || []
    for (const part of parts) {
      if (part.inlineData?.data) {
        const buffer = Buffer.from(part.inlineData.data, 'base64')
        fs.writeFileSync(outputPath, buffer)
        console.log(`✅ Generated: ${prompt.filename}`)
        return true
      }
    }

    console.error(`❌ No image in response for ${prompt.name}`)
    return false

  } catch (error: any) {
    console.error(`❌ Error generating ${prompt.name}:`, error.message)
    return false
  }
}

async function main() {
  if (!API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in .env')
    process.exit(1)
  }

  console.log('\n🚀 LEXGRO Image Generation\n')
  console.log(`📁 Output: ${OUTPUT_DIR}\n`)

  let success = 0
  let failed = 0

  for (const prompt of IMAGE_PROMPTS) {
    const result = await generateImage(prompt)
    if (result) {
      success++
    } else {
      failed++
    }
    // Rate limit - 3 seconds between requests
    await new Promise(r => setTimeout(r, 3000))
  }

  console.log(`\n📊 Results: ${success} success, ${failed} failed\n`)
}

main().catch(console.error)
