/**
 * Topic Research & Content Outline Generator for LEXGRO
 *
 * Researches a legal marketing topic and generates a content outline
 * following LEXGRO style guidelines.
 *
 * Usage:
 *   npx tsx scripts/research-topic.ts "topic or question"
 *   npx tsx scripts/research-topic.ts --url "https://example.com/article"
 *
 * Requires: PERPLEXITY_API_KEY in .env
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const OUTPUT_DIR = path.join(process.cwd(), 'scripts/research/output');

interface ResearchResult {
  topic: string;
  summary: string;
  keyFacts: string[];
  sources: { title: string; url: string }[];
  suggestedAngle: string;
  outline: ArticleOutline;
  socialPosts: SocialPosts;
}

interface ArticleOutline {
  headline: string;
  subheadline: string;
  metaDescription: string;
  sections: {
    heading: string;
    points: string[];
  }[];
  suggestedCategory: string;
}

interface SocialPosts {
  linkedin: string;
  twitter: string;
}

/**
 * Research a topic using Perplexity
 */
async function researchTopic(topic: string): Promise<{ content: string; citations: string[] }> {
  if (!PERPLEXITY_API_KEY) {
    throw new Error('PERPLEXITY_API_KEY not set in .env');
  }

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'sonar-pro',
      messages: [
        {
          role: 'system',
          content: `You are a legal marketing research specialist. Provide comprehensive, factual information about law firm marketing, growth strategies, and legal industry trends.

Research requirements:
- Include specific statistics with years and sources
- Focus on actionable insights for law firm owners
- Distinguish between verified data and industry estimates
- Prioritize recent data (2023-2026)
- Include both challenges and solutions`,
        },
        {
          role: 'user',
          content: `Research this topic thoroughly for a law firm marketing article:

${topic}

Provide:
1. Executive summary (2-3 paragraphs)
2. Key statistics (bullet points with specific numbers, percentages, and years)
3. Industry trends related to this topic
4. Actionable takeaways for law firm managing partners
5. Common mistakes to avoid
6. List all sources you referenced`,
        },
      ],
      max_tokens: 2500,
      return_citations: true,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Perplexity API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return {
    content: data.choices[0].message.content,
    citations: data.citations || [],
  };
}

/**
 * Generate article outline following LEXGRO guidelines
 */
async function generateOutline(topic: string, research: string): Promise<ArticleOutline> {
  if (!PERPLEXITY_API_KEY) {
    throw new Error('PERPLEXITY_API_KEY not set');
  }

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'sonar-pro',
      messages: [
        {
          role: 'system',
          content: `You are writing for LEXGRO, a fractional CMO service for law firms.

VOICE: Like a trusted advisor at a top consultancy. Direct, expert, no fluff. Never condescending.

STYLE RULES:
- No em-dashes (use periods, commas, colons instead)
- No jargon like "synergy," "leverage," "holistic"
- Active voice only
- Specific over vague (real numbers, real examples)
- Headlines should be compelling AND honest

HEADLINE FORMATS:
- How to [Achieve X] Without [Common Pain Point]
- The [Number] [Things] Every Law Firm [Action]
- Why [Common Belief] Is Costing You [Loss]
- [Specific Number] Ways to [Improve X] in [Year]

CATEGORIES: Marketing Strategy, Lead Generation, Client Retention, Sales Training, Digital Marketing, Brand Building, Growth Systems`,
        },
        {
          role: 'user',
          content: `Based on this research, create an article outline:

TOPIC: ${topic}

RESEARCH:
${research}

Generate a JSON outline with:
{
  "headline": "Compelling, specific headline (50-60 chars)",
  "subheadline": "Supporting context that adds value (under 120 chars)",
  "metaDescription": "SEO description with CTA (150-160 chars)",
  "sections": [
    {
      "heading": "Section heading with keyword",
      "points": ["Key point 1", "Key point 2", "Key point 3"]
    }
  ],
  "suggestedCategory": "One of the CATEGORIES above"
}`,
        },
      ],
      max_tokens: 1500,
    }),
  });

  const data = await response.json();
  const content = data.choices[0].message.content;

  // Extract JSON from response
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error('Failed to parse outline JSON');
    }
  }

  // Fallback structure
  return {
    headline: topic,
    subheadline: '',
    metaDescription: '',
    sections: [],
    suggestedCategory: 'Marketing Strategy',
  };
}

/**
 * Generate social media posts
 */
async function generateSocialPosts(topic: string, research: string, headline: string): Promise<SocialPosts> {
  if (!PERPLEXITY_API_KEY) {
    throw new Error('PERPLEXITY_API_KEY not set');
  }

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'sonar-pro',
      messages: [
        {
          role: 'system',
          content: `Create social media posts for LEXGRO, a fractional CMO service for law firms.

LINKEDIN style (primary platform):
- Open with a hook or provocative statement
- 3-4 short paragraphs
- Include a key statistic or insight
- End with a question or CTA
- 3-5 relevant hashtags
- Professional but not stiff

TWITTER/X style:
- Under 280 chars
- Key insight + link indicator
- 2-3 hashtags max
- Punchy and direct

NO em-dashes. NO jargon. Sound like a trusted advisor, not a marketing agency.`,
        },
        {
          role: 'user',
          content: `Create social posts for this article:

HEADLINE: ${headline}
TOPIC: ${topic}

KEY RESEARCH:
${research.slice(0, 1500)}

Return JSON:
{
  "linkedin": "Full LinkedIn post text with hashtags",
  "twitter": "Twitter post under 280 chars"
}`,
        },
      ],
      max_tokens: 1000,
    }),
  });

  const data = await response.json();
  const content = data.choices[0].message.content;

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error('Failed to parse social posts JSON');
    }
  }

  return {
    linkedin: '',
    twitter: '',
  };
}

/**
 * Main research function
 */
async function researchLegalTopic(topic: string): Promise<ResearchResult> {
  console.log(`\n🔍 Researching: ${topic}\n`);

  // Step 1: Research
  console.log('📚 Gathering research from Perplexity...');
  const { content: research, citations } = await researchTopic(topic);

  // Step 2: Generate outline
  console.log('📝 Generating article outline...');
  const outline = await generateOutline(topic, research);

  // Step 3: Generate social posts
  console.log('📱 Creating social media posts...');
  const socialPosts = await generateSocialPosts(topic, research, outline.headline);

  // Parse key facts from research
  const keyFacts = research
    .split('\n')
    .filter((line) => line.trim().startsWith('-') || line.trim().startsWith('•') || /^\d+[\.\)]/.test(line.trim()))
    .map((line) => line.replace(/^[-•\d\.)\s]+/, '').trim())
    .filter((line) => line.length > 10)
    .slice(0, 10);

  // Parse sources
  const sources = citations.map((url: string, i: number) => ({
    title: `Source ${i + 1}`,
    url,
  }));

  return {
    topic,
    summary: research.split('\n\n')[0] || research.slice(0, 500),
    keyFacts,
    sources,
    suggestedAngle: '',
    outline,
    socialPosts,
  };
}

/**
 * Format output as markdown
 */
function formatMarkdown(result: ResearchResult): string {
  return `# Research: ${result.topic}

Generated: ${new Date().toLocaleString()}

---

## Executive Summary

${result.summary}

---

## Key Facts & Statistics

${result.keyFacts.map((f) => `- ${f}`).join('\n')}

---

## Sources

${result.sources.map((s, i) => `${i + 1}. [${s.title}](${s.url})`).join('\n')}

---

## Article Outline

### Headline
**${result.outline.headline}**

### Subheadline
${result.outline.subheadline}

### Meta Description
${result.outline.metaDescription}

### Category
${result.outline.suggestedCategory}

### Sections
${result.outline.sections
  .map(
    (s) => `
#### ${s.heading}
${s.points.map((p) => `- ${p}`).join('\n')}`
  )
  .join('\n')}

---

## Social Media Posts

### LinkedIn
\`\`\`
${result.socialPosts.linkedin}
\`\`\`

### Twitter/X
\`\`\`
${result.socialPosts.twitter}
\`\`\`

---

## Next Steps

1. [ ] Review and refine outline
2. [ ] Write full article in MDX
3. [ ] Add to \`src/content/blog/\`
4. [ ] Generate OG image: \`npx tsx scripts/generate-all-og.ts --content\`
5. [ ] Schedule social posts

---

*Generated by LEXGRO Research Tool*
`;
}

/**
 * CLI
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
LEXGRO Topic Research & Content Outline Generator

Usage:
  npx tsx scripts/research-topic.ts "topic or question"
  npx tsx scripts/research-topic.ts --url "https://article-url"

Examples:
  npx tsx scripts/research-topic.ts "cost per case benchmarks for personal injury"
  npx tsx scripts/research-topic.ts "fractional CMO vs full-time CMO for law firms"
  npx tsx scripts/research-topic.ts "law firm intake optimization best practices"
  npx tsx scripts/research-topic.ts --url "https://example.com/legal-marketing-article"

Requires: PERPLEXITY_API_KEY in .env
`);
    return;
  }

  let topic = args.join(' ');
  if (args[0] === '--url') {
    topic = `Research this article and extract key insights for law firm marketing: ${args.slice(1).join(' ')}`;
  }

  try {
    const result = await researchLegalTopic(topic);

    // Save to file
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    const timestamp = new Date().toISOString().split('T')[0];
    const slug = topic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .slice(0, 50);
    const outputFile = path.join(OUTPUT_DIR, `research-${timestamp}-${slug}.md`);

    fs.writeFileSync(outputFile, formatMarkdown(result));

    console.log(`\n✅ Research complete!`);
    console.log(`📄 Output: ${outputFile}`);

    // Print headline preview
    console.log(`\n📰 Suggested headline:`);
    console.log(`   ${result.outline.headline}`);

    console.log(`\n📊 Key stats found: ${result.keyFacts.length}`);
    console.log(`📚 Sources cited: ${result.sources.length}`);

    if (result.socialPosts.twitter) {
      console.log(`\n🐦 Twitter preview:`);
      console.log(`   ${result.socialPosts.twitter.slice(0, 100)}...`);
    }
  } catch (error: any) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();
