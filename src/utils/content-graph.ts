/**
 * Content Graph Utilities
 * Handles internal linking, related content, and content relationships
 */

import type { CollectionEntry } from 'astro:content';
import internalLinks from '../data/internal-links.json';

type BlogPost = CollectionEntry<'blog'>;
type Guide = CollectionEntry<'guides'>;

/**
 * Get the canonical URL for a term (case-insensitive)
 */
export function getTermUrl(term: string): string | null {
  const normalized = term.toLowerCase().trim();
  const terms = internalLinks.terms as Record<string, string>;

  // Direct match
  if (terms[normalized]) {
    return terms[normalized];
  }

  // Try with common variations
  const variations = [
    normalized,
    normalized.replace(/-/g, ' '),
    normalized.replace(/ /g, '-'),
  ];

  for (const variant of variations) {
    if (terms[variant]) {
      return terms[variant];
    }
  }

  return null;
}

/**
 * Get all linkable terms sorted by length (longest first for proper matching)
 */
export function getLinkableTerms(): Array<{ term: string; url: string }> {
  const terms = internalLinks.terms as Record<string, string>;

  return Object.entries(terms)
    .map(([term, url]) => ({ term, url }))
    .sort((a, b) => b.term.length - a.term.length);
}

/**
 * Get pillar information for a URL
 */
export function getPillarForUrl(url: string): string | null {
  const pillars = internalLinks.pillars as Record<string, { url: string; children: string[] }>;

  for (const [pillarName, pillar] of Object.entries(pillars)) {
    if (url.startsWith(pillar.url)) {
      return pillarName;
    }
  }

  return null;
}

/**
 * Get sibling pages (same parent)
 */
export function getSiblingPages(url: string): string[] {
  const pillars = internalLinks.pillars as Record<string, { url: string; children: string[] }>;

  for (const pillar of Object.values(pillars)) {
    if (pillar.children.includes(url)) {
      return pillar.children.filter(child => child !== url);
    }
  }

  return [];
}

/**
 * Calculate tag similarity score between two articles
 */
function getTagSimilarity(tags1: string[], tags2: string[]): number {
  if (!tags1?.length || !tags2?.length) return 0;

  const set1 = new Set(tags1.map(t => t.toLowerCase()));
  const set2 = new Set(tags2.map(t => t.toLowerCase()));

  let overlap = 0;
  for (const tag of set1) {
    if (set2.has(tag)) overlap++;
  }

  // Jaccard similarity
  const union = new Set([...set1, ...set2]).size;
  return overlap / union;
}

/**
 * Get related content for a blog post
 */
export function getRelatedContent(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  options: {
    limit?: number;
    excludeSlugs?: string[];
  } = {}
): BlogPost[] {
  const { limit = 5, excludeSlugs = [] } = options;

  // Filter out current post and excluded slugs
  const candidates = allPosts.filter(post => {
    if (post.id === currentPost.id) return false;
    if (excludeSlugs.includes(post.id)) return false;
    return true;
  });

  // Score each candidate
  const scored = candidates.map(post => {
    const tagScore = getTagSimilarity(
      currentPost.data.tags || [],
      post.data.tags || []
    );

    // Category match
    const categoryScore = currentPost.data.category === post.data.category ? 0.3 : 0;

    // Recency score
    const recencyScore = getRecencyScore(post);

    // Weight: tags 50%, category 30%, recency 20%
    const totalScore = (tagScore * 0.5) + (categoryScore * 0.3) + (recencyScore * 0.2);

    return { post, score: totalScore };
  });

  // Sort by score and return top N
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.post);
}

/**
 * Get recency score (0-1, higher = more recent)
 */
function getRecencyScore(post: BlogPost): number {
  const date = new Date(post.data.lastModified || post.data.pubDate);
  const now = new Date();
  const daysSince = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

  // Decay over 365 days
  return Math.max(0, 1 - (daysSince / 365));
}

/**
 * Get contextual sidebar content based on page type
 */
export function getContextualSidebar(
  currentPath: string
): {
  parentPage?: { title: string; url: string };
  siblingPages: Array<{ title: string; url: string }>;
  childPages: Array<{ title: string; url: string }>;
} {
  const pillars = internalLinks.pillars as Record<string, { url: string; children: string[] }>;
  const result = {
    siblingPages: [] as Array<{ title: string; url: string }>,
    childPages: [] as Array<{ title: string; url: string }>,
  };

  // Normalize path
  const normalizedPath = currentPath.replace(/^\/|\/$/g, '');

  // Find parent pillar
  for (const [pillarName, pillar] of Object.entries(pillars)) {
    if (normalizedPath.startsWith(pillarName) || pillar.url.includes(normalizedPath)) {
      // Check if current path is the pillar itself
      if (pillar.url === `/${normalizedPath}/`) {
        // Show children
        result.childPages = pillar.children.map(child => ({
          title: formatPathAsTitle(child),
          url: child
        }));
      } else {
        // Show parent and siblings
        (result as any).parentPage = {
          title: formatPathAsTitle(pillar.url),
          url: pillar.url
        };

        result.siblingPages = pillar.children
          .filter(child => child !== `/${normalizedPath}/`)
          .map(child => ({
            title: formatPathAsTitle(child),
            url: child
          }));
      }
      break;
    }
  }

  return result;
}

/**
 * Format a URL path as a readable title
 */
function formatPathAsTitle(path: string): string {
  const lastPart = path.replace(/^\/|\/$/g, '').split('/').pop() || '';
  return lastPart
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Build breadcrumb trail for a path
 */
export function getBreadcrumbs(path: string): Array<{ label: string; url: string }> {
  const parts = path.replace(/^\/|\/$/g, '').split('/').filter(Boolean);
  const breadcrumbs: Array<{ label: string; url: string }> = [
    { label: 'Home', url: '/' }
  ];

  let currentPath = '';
  for (const part of parts) {
    currentPath += `/${part}`;
    breadcrumbs.push({
      label: formatPathAsTitle(part),
      url: `${currentPath}/`
    });
  }

  return breadcrumbs;
}
