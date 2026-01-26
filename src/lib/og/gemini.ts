/**
 * Gemini Image Generation for OG Base Images
 * Uses gemini-3-pro-image-preview for highest quality
 *
 * Output: 16:9 landscape, cropped to 1200x630
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '../../..')
const CACHE_DIR = path.join(PROJECT_ROOT, '.cache/og-bases')

// API configuration
const GOOGLE_AI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY

// Model: Nano Banana Pro (highest quality, better text rendering, 1K-4K output)
const IMAGE_MODEL = 'gemini-3-pro-image-preview'
const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:generateContent`

export interface GenerateBaseOptions {
  /** The prompt for image generation */
  prompt: string
  /** Cache key for storing/retrieving the image */
  cacheKey: string
  /** Force regeneration even if cached */
  force?: boolean
}

/**
 * Generate a base image using Gemini
 * Results are cached to avoid regeneration
 */
export async function generateBase({ prompt, cacheKey, force = false }: GenerateBaseOptions): Promise<Buffer> {
  // Ensure cache directory exists
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true })
  }

  const cachePath = path.join(CACHE_DIR, `${cacheKey}.png`)

  // Check cache first (unless forcing regeneration)
  if (!force && fs.existsSync(cachePath)) {
    console.log(`[OG] Using cached base: ${cacheKey}`)
    return fs.readFileSync(cachePath)
  }

  // Check for API key
  if (!GOOGLE_AI_API_KEY) {
    console.warn('[OG] No GOOGLE_AI_API_KEY - using gradient fallback')
    return await generateFallbackImage(cacheKey)
  }

  console.log(`[OG] Generating base image: ${cacheKey}`)

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GOOGLE_AI_API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          responseModalities: ['IMAGE']
        }
      })
    })

    const data = await response.json()

    if (data.error) {
      console.error(`[OG] API Error: ${data.error.message}`)
      return await generateFallbackImage(cacheKey)
    }

    // Extract image from response
    const parts = data.candidates?.[0]?.content?.parts || []
    for (const part of parts) {
      if (part.inlineData?.data) {
        const rawBuffer = Buffer.from(part.inlineData.data, 'base64')

        // Get original dimensions
        const metadata = await sharp(rawBuffer).metadata()
        console.log(`[OG] Raw image: ${metadata.width}x${metadata.height}`)

        // Crop to exact OG dimensions (1200x630)
        const processed = await sharp(rawBuffer)
          .resize(1200, 630, { fit: 'cover', position: 'center' })
          .png({ quality: 90 })
          .toBuffer()

        // Cache the result
        fs.writeFileSync(cachePath, processed)
        console.log(`[OG] Generated and cached: ${cacheKey}`)

        return processed
      }
    }

    // No image in response
    console.warn(`[OG] No image in response for ${cacheKey}`)
    return await generateFallbackImage(cacheKey)

  } catch (error: any) {
    console.error(`[OG] Error generating image:`, error.message)
    return await generateFallbackImage(cacheKey)
  }
}

/**
 * Generate a gradient fallback image when API is unavailable
 */
async function generateFallbackImage(cacheKey: string): Promise<Buffer> {
  const cachePath = path.join(CACHE_DIR, `${cacheKey}.png`)

  // Create a dark green gradient as fallback (LEXGRO brand)
  const width = 1200
  const height = 630

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#011907;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#233B29;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#298C42;stop-opacity:0.4" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `

  const buffer = await sharp(Buffer.from(svg))
    .png()
    .toBuffer()

  fs.writeFileSync(cachePath, buffer)
  return buffer
}

/**
 * Clear the OG image cache
 */
export function clearCache(): void {
  if (fs.existsSync(CACHE_DIR)) {
    fs.rmSync(CACHE_DIR, { recursive: true })
    console.log('[OG] Cache cleared')
  }
}

/**
 * Get cache statistics
 */
export function getCacheStats(): { count: number; sizeKB: number } {
  if (!fs.existsSync(CACHE_DIR)) {
    return { count: 0, sizeKB: 0 }
  }

  const files = fs.readdirSync(CACHE_DIR)
  let totalSize = 0

  for (const file of files) {
    const stats = fs.statSync(path.join(CACHE_DIR, file))
    totalSize += stats.size
  }

  return {
    count: files.length,
    sizeKB: Math.round(totalSize / 1024)
  }
}

/**
 * Hash a string for cache key generation
 */
export function hashString(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}

/**
 * Generate all base images for the site
 * Call this once to populate the cache
 */
export async function generateAllBases(prompts: Record<string, string>): Promise<void> {
  const keys = Object.keys(prompts)
  console.log(`\n[OG] Generating ${keys.length} base images...\n`)

  let success = 0
  let failed = 0

  for (const key of keys) {
    try {
      await generateBase({ prompt: prompts[key], cacheKey: key })
      success++
    } catch (e) {
      failed++
    }
    // Rate limit - 2 seconds between requests
    await new Promise(r => setTimeout(r, 2000))
  }

  console.log(`\n[OG] Complete: ${success} success, ${failed} failed\n`)
}
