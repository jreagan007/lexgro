/**
 * Lexgro Reddit Sentiment Analysis Script
 * Mines r/lawyers, r/lawfirm, etc. for marketing pain points
 *
 * Uses Reddit public JSON API (no auth required)
 *
 * Usage:
 *   node scripts/lexgro-programmatic-seo/reddit-sentiment.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target subreddits (legal marketing focused)
const SUBREDDITS = [
  'lawyers',
  'lawfirm',
  'LawFirm',
  'Lawyertalk',
  'LawFirmMarketing',
  'Legalmarketing',
];

// Search terms for relevant posts
const SEARCH_TERMS = [
  'marketing',
  'advertising',
  'seo',
  'google ads',
  'ppc',
  'leads',
  'intake',
  'website',
  'social media',
  'tv ads',
  'agency',
  'cmo',
  'budget',
  'roi',
  'clients',
  'fractional',
];

// Pain point categories for clustering
const PAIN_POINT_CATEGORIES = {
  agencyFrustration: {
    label: 'Agency Frustrations',
    keywords: ['agency', 'scam', 'ripped off', 'waste of money', 'no results',
      'fired', 'dropped', 'terrible', 'awful', 'never again', 'overpromise'],
  },
  budgetConcerns: {
    label: 'Budget & ROI Concerns',
    keywords: ['expensive', 'cost', 'budget', 'afford', 'roi', 'return',
      'waste', 'spending', 'price', 'worth it', 'too much'],
  },
  diyStruggles: {
    label: 'DIY Marketing Struggles',
    keywords: ['myself', 'own marketing', 'learning', 'overwhelmed',
      'dont know', 'confused', 'where to start', 'help', 'time consuming'],
  },
  channelConfusion: {
    label: 'Channel Selection Confusion',
    keywords: ['seo vs', 'ppc vs', 'which is better', 'should i',
      'tv or digital', 'best channel', 'what works', 'effective'],
  },
  intakeIssues: {
    label: 'Intake & Conversion Issues',
    keywords: ['intake', 'calls', 'convert', 'leads but', 'phone',
      'follow up', 'responding', 'lost leads', 'not signing'],
  },
  hiringChallenges: {
    label: 'Hiring & Staffing Challenges',
    keywords: ['hire', 'find', 'marketing person', 'in-house',
      'fractional', 'consultant', 'who to trust', 'marketing director'],
  },
};

const USER_AGENT = 'LexgroResearch/1.0 (Content Strategy Research)';

async function fetchSubreddit(subreddit, sort = 'hot', limit = 100) {
  const url = `https://www.reddit.com/r/${subreddit}/${sort}.json?limit=${limit}`;

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
    });

    if (!response.ok) {
      console.warn(`  r/${subreddit}: HTTP ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.data?.children || [];
  } catch (error) {
    console.warn(`  r/${subreddit}: ${error.message}`);
    return [];
  }
}

async function searchSubreddit(subreddit, query, limit = 25) {
  const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&restrict_sr=1&sort=relevance&t=year&limit=${limit}`;

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.data?.children || [];
  } catch (error) {
    return [];
  }
}

function categorizePainPoints(text) {
  const textLower = text.toLowerCase();
  const matches = [];

  Object.entries(PAIN_POINT_CATEGORIES).forEach(([category, config]) => {
    const categoryMatches = config.keywords.filter(kw => textLower.includes(kw));
    if (categoryMatches.length > 0) {
      matches.push({
        category,
        label: config.label,
        matchedKeywords: categoryMatches,
        strength: categoryMatches.length,
      });
    }
  });

  return matches;
}

function extractQuotes(text, maxLength = 250) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 30);
  return sentences.slice(0, 2).map(s => s.trim().substring(0, maxLength));
}

function isRelevant(text) {
  const textLower = text.toLowerCase();
  const legalTerms = ['lawyer', 'attorney', 'law firm', 'legal', 'pi ', 'personal injury'];
  const marketingTerms = ['marketing', 'advertising', 'ads', 'ppc', 'seo', 'lead', 'client', 'cmo'];

  const hasLegal = legalTerms.some(term => textLower.includes(term));
  const hasMarketing = marketingTerms.some(term => textLower.includes(term));

  return hasLegal || hasMarketing;
}

async function main() {
  console.log('='.repeat(60));
  console.log('Lexgro Reddit Sentiment Analysis');
  console.log('='.repeat(60));
  console.log('');

  const allPosts = new Map();
  const painPointClusters = {};

  Object.keys(PAIN_POINT_CATEGORIES).forEach(cat => {
    painPointClusters[cat] = [];
  });

  for (const subreddit of SUBREDDITS) {
    console.log(`Searching r/${subreddit}...`);

    const hotPosts = await fetchSubreddit(subreddit, 'hot', 50);

    for (const post of hotPosts) {
      const data = post.data;
      if (allPosts.has(data.id)) continue;

      const fullText = `${data.title} ${data.selftext || ''}`;
      if (!isRelevant(fullText)) continue;

      const painPoints = categorizePainPoints(fullText);

      const processedPost = {
        id: data.id,
        subreddit: data.subreddit,
        title: data.title,
        text: data.selftext?.substring(0, 500) || '',
        score: data.score,
        numComments: data.num_comments,
        created: new Date(data.created_utc * 1000).toISOString(),
        url: `https://reddit.com${data.permalink}`,
        painPoints,
        quotes: extractQuotes(fullText),
      };

      allPosts.set(data.id, processedPost);

      painPoints.forEach(pp => {
        if (painPointClusters[pp.category]) {
          painPointClusters[pp.category].push({
            title: data.title,
            url: processedPost.url,
            score: data.score,
            subreddit: data.subreddit,
            quotes: processedPost.quotes,
            strength: pp.strength,
          });
        }
      });
    }

    await new Promise(r => setTimeout(r, 1000));

    for (const term of SEARCH_TERMS.slice(0, 8)) {
      const searchResults = await searchSubreddit(subreddit, term, 15);

      for (const post of searchResults) {
        const data = post.data;
        if (allPosts.has(data.id)) continue;

        const fullText = `${data.title} ${data.selftext || ''}`;
        const painPoints = categorizePainPoints(fullText);

        const processedPost = {
          id: data.id,
          subreddit: data.subreddit,
          title: data.title,
          text: data.selftext?.substring(0, 500) || '',
          score: data.score,
          numComments: data.num_comments,
          created: new Date(data.created_utc * 1000).toISOString(),
          url: `https://reddit.com${data.permalink}`,
          searchTerm: term,
          painPoints,
          quotes: extractQuotes(fullText),
        };

        allPosts.set(data.id, processedPost);

        painPoints.forEach(pp => {
          if (painPointClusters[pp.category]) {
            painPointClusters[pp.category].push({
              title: data.title,
              url: processedPost.url,
              score: data.score,
              subreddit: data.subreddit,
              quotes: processedPost.quotes,
              strength: pp.strength,
            });
          }
        });
      }

      await new Promise(r => setTimeout(r, 500));
    }
  }

  const posts = Array.from(allPosts.values());
  console.log(`\nFound ${posts.length} relevant posts.\n`);

  posts.sort((a, b) => b.score - a.score);

  const report = generateReport(posts, painPointClusters);

  const jsonPath = path.join(__dirname, 'reddit-data.json');
  fs.writeFileSync(jsonPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    totalPosts: posts.length,
    posts: posts.slice(0, 100),
    painPointClusters,
  }, null, 2));
  console.log(`Raw data saved to: ${jsonPath}`);

  const reportPath = path.join(__dirname, 'REDDIT_SENTIMENT_REPORT.md');
  fs.writeFileSync(reportPath, report);
  console.log(`Report saved to: ${reportPath}`);

  console.log('\n' + '='.repeat(60));
  console.log('PAIN POINT SUMMARY');
  console.log('='.repeat(60));

  Object.entries(painPointClusters).forEach(([category, items]) => {
    const label = PAIN_POINT_CATEGORIES[category]?.label || category;
    console.log(`\n${label}: ${items.length} mentions`);
    if (items.length > 0) {
      const top = items.sort((a, b) => b.score - a.score)[0];
      console.log(`  Top: "${top.title.substring(0, 50)}..." (${top.score} pts)`);
    }
  });
}

function generateReport(posts, clusters) {
  let report = `# Lexgro Reddit Sentiment Analysis Report

Generated: ${new Date().toISOString()}

## Overview

- **Total Posts Analyzed:** ${posts.length}
- **Subreddits:** ${SUBREDDITS.join(', ')}
- **Time Period:** Recent posts and last 12 months search

---

## Pain Point Clusters

`;

  Object.entries(clusters).forEach(([category, items]) => {
    const config = PAIN_POINT_CATEGORIES[category];
    const label = config?.label || category;
    const sortedItems = items.sort((a, b) => b.score - a.score).slice(0, 10);

    report += `### ${label} (${items.length} mentions)

`;

    if (sortedItems.length === 0) {
      report += `*No significant mentions found.*\n\n`;
      return;
    }

    sortedItems.forEach(item => {
      report += `**[${item.title.substring(0, 80)}${item.title.length > 80 ? '...' : ''}](${item.url})** (r/${item.subreddit}, ${item.score} pts)\n`;
      if (item.quotes && item.quotes.length > 0 && item.quotes[0].length > 30) {
        report += `> "${item.quotes[0].substring(0, 150)}..."\n`;
      }
      report += '\n';
    });

    report += '---\n\n';
  });

  report += `## Top Discussed Posts (by score)

| Title | Subreddit | Score | Comments |
|-------|-----------|-------|----------|
`;

  posts.slice(0, 30).forEach(post => {
    const shortTitle = post.title.length > 50 ? post.title.substring(0, 47) + '...' : post.title;
    report += `| [${shortTitle}](${post.url}) | r/${post.subreddit} | ${post.score} | ${post.numComments} |\n`;
  });

  report += `

---

## Raw Quotes for Content Inspiration

`;

  const quotesWithContext = posts
    .filter(p => p.text && p.text.length > 100)
    .slice(0, 20);

  quotesWithContext.forEach(post => {
    report += `### "${post.title}"\n`;
    report += `*r/${post.subreddit} - ${post.score} pts*\n\n`;
    report += `> ${post.text.substring(0, 300)}...\n\n`;
  });

  report += `
---

*Data source: Reddit Public API*
*Run: node scripts/lexgro-programmatic-seo/reddit-sentiment.js*
`;

  return report;
}

main().catch(console.error);
