/**
 * Generate LEXGRO Editorial Images
 *
 * Documentary photography style matching content and brand
 * Film stock references for authentic, non-AI aesthetic
 */

import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config()

const API_KEY = process.env.GEMINI_API_KEY
const IMAGE_MODEL = 'gemini-2.0-flash-exp'
const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:generateContent`

const OUTPUT_DIR = path.join(process.cwd(), 'src/assets/images/editorial')

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

// Editorial prompts matching LEXGRO content and brand voice
const EDITORIAL_IMAGES = [
  // Blog: Fractional CMO Benefits
  {
    name: 'Blog - Fractional CMO',
    filename: 'blog-fractional-cmo.png',
    prompt: `Executive boardroom at golden hour, polished mahogany conference table, leather chairs, city skyline through floor-to-ceiling windows slightly overexposed, fresh coffee in ceramic cup, leather portfolio with gold pen, morning light casting long shadows, professional strategic leadership atmosphere, shot on Kodak Portra 400, warm amber tones, slight film grain, shallow depth of field on table surface, no people, no text, no computer screens, authentic C-suite executive aesthetic`
  },

  // Blog: Transform Client Growth
  {
    name: 'Blog - Client Growth',
    filename: 'blog-client-growth.png',
    prompt: `Modern law office reception at sunrise, tall indoor plants catching morning light, comfortable client seating area, fresh flowers on reception desk, warm welcoming professional atmosphere, natural light flooding through large windows, growth and prosperity feeling, shot on Fuji Pro 400H, warm green undertones, medium format film aesthetic, no people, no logos, no text visible, authentic successful law firm lobby`
  },

  // Blog: Bankruptcy Marketing - article about digital marketing for bankruptcy attorneys
  {
    name: 'Blog - Bankruptcy Marketing',
    filename: 'blog-bankruptcy-marketing.png',
    prompt: `Financial documents spread on attorney's desk, calculator beside organized paperwork, morning light through window casting hope, manila folder labeled with tab visible, professional legal office setting, path forward from debt concept, structured financial planning atmosphere, shot on Kodak Portra 160, warm reassuring tones, natural light, shallow depth of field on documents, no people, no readable text, no screens, authentic bankruptcy law practice aesthetic`
  },

  // FAQ Section - questions and answers, getting help and information
  {
    name: 'FAQ Section',
    filename: 'faq-section.png',
    prompt: `Open reference guide on polished desk, highlighted passages visible but not readable, sticky note tabs marking important sections, reading glasses resting nearby, warm desk lamp glow, knowledge and guidance atmosphere, finding answers concept, shot on Kodak Gold 200, warm scholarly tones, 35mm film aesthetic, shallow focus on page edge, no people, no screens, authentic research and support aesthetic`
  },

  // Services Page
  {
    name: 'Services',
    filename: 'services.png',
    prompt: `Strategic planning session aftermath, whiteboard edge visible out of focus, scattered sticky notes in green and orange on polished table, afternoon light through conference room windows, productive collaboration atmosphere, professional consulting energy, shot on Fuji Superia 400, warm natural colors, documentary style, no readable text, no people, authentic strategy session aesthetic`
  },

  // About Page
  {
    name: 'About',
    filename: 'about.png',
    prompt: `Corner of successful law firm lobby, award plaques on dark wood wall slightly out of focus, fresh orchid on reception counter, warm evening light, established trusted expertise atmosphere, professional achievement and legacy feeling, shot on Kodak Ektar, rich warm tones, medium format aesthetic, no people, no readable text on plaques, authentic accomplished firm aesthetic`
  },

  // Contact Page
  {
    name: 'Contact',
    filename: 'contact.png',
    prompt: `Inviting office doorway, warm light spilling into hallway, comfortable chair visible inside, welcoming open door atmosphere, professional accessibility feeling, ready to help energy, shot on Portra 800, warm amber undertones, 35mm grain, shallow depth of field, no people, no signage, authentic welcoming professional space`
  },

  // Guide/Resource Page
  {
    name: 'Guide',
    filename: 'guide.png',
    prompt: `Stack of professional marketing reports on wooden desk, reading glasses resting on top, warm desk lamp glow, evening study atmosphere, knowledge and expertise feeling, educational resource energy, shot on Kodak Gold 200, warm scholarly tones, slight dust visible in light, no readable text, no people, authentic research and learning aesthetic`
  }
]

async function generateImage(item: typeof EDITORIAL_IMAGES[0]): Promise<boolean> {
  const outputPath = path.join(OUTPUT_DIR, item.filename)

  // Delete existing to regenerate
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath)
  }

  console.log(`📸 Generating: ${item.name}...`)

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

  console.log('\n📸 LEXGRO Editorial Image Generation\n')
  console.log('Style: Documentary photography, film stock aesthetic')
  console.log(`📁 Output: ${OUTPUT_DIR}\n`)

  let success = 0
  let failed = 0

  for (const item of EDITORIAL_IMAGES) {
    const result = await generateImage(item)
    result ? success++ : failed++
    await new Promise(r => setTimeout(r, 3000))
  }

  console.log(`\n📊 Results: ${success} success, ${failed} failed\n`)
}

main().catch(console.error)
