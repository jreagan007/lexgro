/**
 * LEXGRO OG Image Generation System
 *
 * Exports all utilities for generating branded Open Graph images
 */

export { generateBase, clearCache, getCacheStats, hashString, generateAllBases } from './gemini'
export type { GenerateBaseOptions } from './gemini'

export { compositeOGImage, getOGImageUrl, batchGenerateOGImages } from './compositor'
export type { CompositeOptions } from './compositor'

export {
  PROMPTS,
  NEGATIVE_PROMPT,
  COLORS,
  HEX_COLORS,
  getPromptKeyFromSlug,
  getCategoryBreadcrumb
} from './prompts'
export type { PromptKey, PromptConfig, StyleMode } from './prompts'
