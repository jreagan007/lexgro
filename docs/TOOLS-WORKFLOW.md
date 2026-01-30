# LEXGRO Tools Workflow

**Last Updated:** January 29, 2026

This document defines when and how to use each tool in our stack. Reference this before starting any task.

---

## Tool Stack Overview

| Tool | Purpose | Best For | NOT For |
|------|---------|----------|---------|
| **Claude** | Reasoning, writing, code | Strategy, content creation, analysis, coding | Live data, current facts |
| **Perplexity** | Research with citations | Stats, facts, sourced research, industry data | Long-form writing |
| **Firecrawl** | Web scraping | Competitor sites, directories, live web data | Analysis, writing |
| **Gemini** | Image generation | OG images, blog cards, visual content | Text content |
| **DataForSEO** | SEO data | Keyword research, SERP analysis, rankings | Content creation |

---

## Decision Tree: Which Tool to Use

```
START: What do you need?
│
├─► WRITE content (blog, guide, page)
│   └─► Claude + Perplexity (research first, then write)
│
├─► RESEARCH a topic
│   ├─► Need cited sources/stats? → Perplexity
│   ├─► Need competitor website data? → Firecrawl → Claude (analyze)
│   └─► Need SEO/keyword data? → DataForSEO
│
├─► ANALYZE something
│   ├─► Competitor positioning? → Firecrawl (scrape) → Claude (analyze)
│   ├─► Content performance? → DataForSEO → Claude (interpret)
│   └─► Strategy/planning? → Claude
│
├─► CREATE images
│   └─► Gemini (OG images, cards)
│
└─► BUILD/CODE something
    └─► Claude
```

---

## Tool-Specific Workflows

### 1. Perplexity - Research

**When to Use:**
- Writing data-driven content
- Fact-checking claims
- Finding industry statistics
- Researching trends with sources

**Workflow:**
```
1. Define research question
2. Query Perplexity API
3. Extract key facts + source URLs
4. Pass to Claude for content creation
5. Include sources in final content
```

**API Usage:**
```typescript
// scripts/research-topic.ts
const response = await fetch('https://api.perplexity.ai/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'llama-3.1-sonar-large-128k-online',
    messages: [{ role: 'user', content: query }]
  })
});
```

**Example Prompts:**
- "What percentage of people use Google to find lawyers? Include recent statistics with sources."
- "What is the average cost per click for personal injury lawyer keywords in 2025-2026?"
- "What are the most effective marketing channels for law firms according to recent studies?"

---

### 2. Firecrawl - Web Scraping

**When to Use:**
- Scraping competitor websites
- Extracting data from legal directories
- Monitoring industry news sites
- Building datasets from web pages

**Workflow:**
```
1. Identify target URLs
2. Scrape with Firecrawl (returns clean markdown)
3. Pass to Claude for analysis/extraction
4. Store or use structured data
```

**API Usage:**
```typescript
// Scrape a single page
const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.FIRECRAWL_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://competitor-lawfirm.com',
    formats: ['markdown']
  })
});

// Crawl entire site
const crawlResponse = await fetch('https://api.firecrawl.dev/v1/crawl', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.FIRECRAWL_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://competitor-lawfirm.com',
    limit: 50,
    formats: ['markdown']
  })
});
```

**Use Cases:**
- Scrape competitor service pages for positioning analysis
- Extract attorney bios from legal directories
- Monitor law firm blogs for content ideas
- Build practice area comparison datasets

---

### 3. Gemini - Image Generation

**When to Use:**
- OG images (1200x630)
- Blog card images (800x450)
- Visual content for pages

**Workflow:**
```
1. Determine image type (OG or card)
2. Get prompt from src/lib/og/prompts.ts
3. Generate with Gemini API
4. Composite with Sharp (add logo, gradient)
5. Save to public/og/ or public/cards/
```

**API Usage:**
```typescript
// Model: gemini-2.0-flash-exp-image-generation (NEVER CHANGE)
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash-exp-image-generation',
  contents: prompt,
  config: {
    responseModalities: ['image', 'text'],
    imageSafety: 'block_low_and_above'
  }
});
```

**Image Styles:**
- **OG Images:** Documentary photography, 35mm film aesthetic
- **Card Images:** Abstract geometric patterns, growth-themed

---

### 4. DataForSEO - SEO Intelligence

**When to Use:**
- Keyword research for content planning
- SERP analysis for competition
- Ranking tracking
- Backlink analysis

**Workflow:**
```
1. Define SEO question
2. Query appropriate DataForSEO endpoint
3. Parse response data
4. Pass to Claude for interpretation/strategy
```

**Common Endpoints:**
- `/keywords_data/google/search_volume/live` - Search volume
- `/serp/google/organic/live/advanced` - SERP results
- `/backlinks/summary/live` - Backlink data

---

## Content Creation Workflow

### Blog Post (Data-Driven)

```
Step 1: Research (Perplexity)
├── Query: "[topic] statistics 2025 2026"
├── Query: "[topic] best practices law firms"
└── Collect 5-10 cited facts

Step 2: Competitor Analysis (Firecrawl + Claude)
├── Scrape top 3 ranking articles
├── Analyze gaps and angles
└── Identify unique positioning

Step 3: SEO Data (DataForSEO)
├── Get keyword search volumes
├── Identify related keywords
└── Check SERP competition

Step 4: Write (Claude)
├── Use research + SEO data
├── Follow style guide (docs/STYLE_GUIDE.md)
├── Include sources section
└── Run audit (npm run audit)

Step 5: Images (Gemini)
├── Generate OG image
├── Generate card image
└── Run: npx tsx scripts/generate-all-og.ts
```

### Competitor Analysis

```
Step 1: Identify Competitors
├── Manual list OR
└── DataForSEO SERP analysis

Step 2: Scrape (Firecrawl)
├── Homepage
├── Service pages
├── About page
└── Key blog posts

Step 3: Analyze (Claude)
├── Positioning/messaging
├── Service offerings
├── Pricing (if available)
├── Content strategy
└── Unique selling points

Step 4: Report (Claude)
└── Generate competitive analysis report
```

---

## API Keys Location

All keys stored in `.env` (gitignored):

```
FIRECRAWL_API_KEY=fc-xxxx
PERPLEXITY_API_KEY=pplx-xxxx
GEMINI_API_KEY=AIzaSyxxxx
DATAFORSEO_LOGIN=xxxx
DATAFORSEO_PASSWORD=xxxx
```

---

## Quick Reference Commands

```bash
# Content audit
npm run audit
npm run audit:verbose

# Auto-fix style issues
npm run fix:style

# Generate OG images
npx tsx scripts/generate-all-og.ts

# Research a topic (when script is built)
npx tsx scripts/research-topic.ts "topic here"

# Scrape competitor (when script is built)
npx tsx scripts/scrape-competitor.ts "https://url.com"
```

---

## Rules

1. **Always research before writing** - Use Perplexity for facts, not assumptions
2. **Cite sources** - Data-driven content needs source links
3. **Never hardcode API keys** - Always use environment variables
4. **Check style guide** - Run audit before committing content
5. **Use right tool for job** - Don't ask Claude for current stats, don't ask Perplexity to write

---

## Future Integrations

- [ ] Build `scripts/research-topic.ts` - Perplexity research script
- [ ] Build `scripts/scrape-competitor.ts` - Firecrawl competitor analysis
- [ ] Build `scripts/keyword-research.ts` - DataForSEO keyword tool
- [ ] Integrate tools into content creation pipeline
