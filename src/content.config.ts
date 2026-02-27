/**
 * LEXGRO Content Collections Configuration
 *
 * Defines the schema for all content types:
 * - Guides (Pillar pages): 5000-8000 words, high authority
 * - Answers: 1200-2500 words, featured snippet targets
 * - Services: 2000-2500 words, conversion focused
 * - Blog: 1500-2500 words, thought leadership
 * - Insights: Data-led research reports, optimized for Google Discover
 */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// =============================================================================
// BASE SCHEMA
// =============================================================================

const baseSchema = z.object({
  // Required fields
  title: z.string(),
  description: z.string().max(160), // Meta description length
  slug: z.string(),

  // Author (defaults to Keith Dyer)
  author: z.string().default('Keith Dyer'),

  // Dates
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),

  // Images
  image: z.string().optional(),
  imageAlt: z.string().optional(),

  // SEO
  targetKeyword: z.string().optional(),
  searchVolume: z.number().optional(),

  // Draft status
  draft: z.boolean().default(false),
});

// =============================================================================
// FAQ SCHEMA (reusable)
// =============================================================================

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

// =============================================================================
// GUIDES COLLECTION (Pillar Pages)
// =============================================================================

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: baseSchema.extend({
    // Word count target
    wordCount: z.number().min(5000).max(8000).optional(),

    // Content cluster
    cluster: z.enum([
      'fractional-cmo',
      'law-firm-marketing',
      'seo',
      'ppc',
      'web-design',
      'lead-gen',
      'budget',
    ]),

    // Pillar type
    pillarType: z.enum(['main', 'sub']).default('sub'),

    // Related content
    relatedGuides: z.array(z.string()).optional(),
    relatedAnswers: z.array(z.string()).optional(),

    // FAQs (3-5 for pillars)
    faqs: z.array(faqSchema).min(3).max(5).optional(),

    // Table of contents
    showToc: z.boolean().default(true),
  }),
});

// =============================================================================
// ANSWERS COLLECTION (Featured Snippet Targets)
// =============================================================================

const answers = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/answers' }),
  schema: baseSchema.extend({
    // Word count target
    wordCount: z.number().min(1200).max(2500).optional(),

    // Quick answer for featured snippet (50-60 words ideal)
    quickAnswer: z.string().max(400),

    // Parent guide this answer belongs to
    parentGuide: z.string(),

    // Content cluster
    cluster: z.string(),

    // Related answers in same cluster
    relatedAnswers: z.array(z.string()).optional(),

    // FAQs (2-3 for answers)
    faqs: z.array(faqSchema).min(2).max(3).optional(),
  }),
});

// =============================================================================
// SERVICES COLLECTION
// =============================================================================

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: baseSchema.extend({
    // Practice area (for practice-specific services)
    practiceArea: z.enum([
      'general',
      'personal-injury',
      'family-law',
      'immigration',
      'criminal-defense',
      'estate-planning',
      'bankruptcy',
      'mass-tort',
    ]).optional(),

    // Pricing information
    pricing: z.object({
      type: z.enum(['quote', 'fixed', 'monthly', 'one-time']),
      amount: z.number().optional(),
      label: z.string(),
      note: z.string().optional(),
    }),

    // Features list
    features: z.array(z.string()),

    // What's included
    includes: z.array(z.string()).optional(),

    // Call to action
    cta: z.object({
      text: z.string(),
      url: z.string(),
    }),

    // FAQs (4-5 for services)
    faqs: z.array(faqSchema).min(4).max(5).optional(),

    // Show pricing table
    showPricing: z.boolean().default(true),
  }),
});

// =============================================================================
// BLOG COLLECTION
// =============================================================================

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: baseSchema.extend({
    // Tags for categorization
    tags: z.array(z.string()),

    // Category (flexible to support all content types)
    category: z.string(),

    // Related guide (if applicable)
    relatedGuide: z.string().optional(),

    // Related answers
    relatedAnswers: z.array(z.string()).optional(),

    // Reading time (auto-calculated or manual)
    readingTime: z.string().optional(),

    // Featured post
    featured: z.boolean().default(false),
  }),
});

// =============================================================================
// INSIGHTS COLLECTION (Data-Led Research Reports)
// =============================================================================

const insights = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/insights' }),
  schema: baseSchema.extend({
    // Discover-friendly subhead (max 120 chars)
    subtitle: z.string().max(120).optional(),

    // When underlying data was collected
    dataDate: z.coerce.date(),

    // Research method disclosure
    methodology: z.string().optional(),

    // Hero callout data (2-5 stat cards)
    keyFindings: z.array(z.object({
      stat: z.string(),
      context: z.string(),
    })).min(2).max(5),

    // Type of insight
    insightType: z.enum([
      'benchmark-report',
      'market-analysis',
      'cost-study',
      'survey-results',
      'competitive-intel',
    ]),

    // Practice area for cross-linking
    practiceArea: z.enum([
      'general',
      'personal-injury',
      'family-law',
      'immigration',
      'criminal-defense',
      'estate-planning',
      'bankruptcy',
      'mass-tort',
    ]).optional(),

    // Tags for categorization
    tags: z.array(z.string()),

    // Reading time
    readingTime: z.string().optional(),

    // Featured insight
    featured: z.boolean().default(false),

    // Number of sources cited
    sourcesCount: z.number().optional(),

    // Related content
    relatedGuide: z.string().optional(),
    relatedBlog: z.array(z.string()).optional(),
    relatedInsights: z.array(z.string()).optional(),
  }),
});

// =============================================================================
// EXPORT COLLECTIONS
// =============================================================================

export const collections = {
  guides,
  answers,
  services,
  blog,
  insights,
};
