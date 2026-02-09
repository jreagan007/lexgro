/**
 * Generate editorial image for 90-Day Growth Roadmap card
 *
 * Conversion optimization emotion: clarity emerging from chaos,
 * a clear path forward, momentum building.
 *
 * Usage: npx tsx scripts/generate-roadmap-image.ts
 */

import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '..')
const OUTPUT_PATH = path.join(PROJECT_ROOT, 'src/assets/images/sections/roadmap-bg.png')

const API_KEY = process.env.GEMINI_API_KEY
const IMAGE_MODEL = 'gemini-2.0-flash-exp-image-generation'
const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:generateContent`

const PROMPT = `35mm documentary film photograph, Kodak Portra 400 film stock.

A single road or pathway cutting through early morning fog, shot from a low angle looking forward. The path is clear and defined while the surrounding landscape fades into soft mist. Warm golden light breaks through from the horizon ahead, creating a natural leading line toward clarity and momentum.

Think: the feeling of having a clear plan when everything else is uncertain. The relief of knowing exactly where to go next.

Style: 1980s editorial photography. Natural grain, warm muted earth tones, slightly desaturated greens and golds. No people, no text, no logos. Imperfect and authentic. Horizontal composition 16:9 ratio.`

async function main() {
  if (!API_KEY) {
    console.error('❌ No GEMINI_API_KEY in .env')
    process.exit(1)
  }

  console.log('🎨 Generating roadmap editorial image via Gemini...')

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: PROMPT }]
        }],
        generationConfig: {
          responseModalities: ['TEXT', 'IMAGE']
        }
      })
    })

    const data = await response.json()

    if (data.error) {
      console.error(`❌ API Error: ${data.error.message}`)
      process.exit(1)
    }

    const parts = data.candidates?.[0]?.content?.parts || []
    for (const part of parts) {
      if (part.inlineData?.data) {
        const buffer = Buffer.from(part.inlineData.data, 'base64')

        // Ensure directory exists
        fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
        fs.writeFileSync(OUTPUT_PATH, buffer)

        console.log(`✅ Image saved to ${OUTPUT_PATH}`)
        console.log(`   Size: ${(buffer.length / 1024).toFixed(0)}KB`)
        return
      }
    }

    console.error('❌ No image in API response')
    process.exit(1)

  } catch (error: any) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

main()
