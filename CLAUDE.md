# Lexgro - Astro Site Project

## ⚠️ CRITICAL: Read Style Guide First

**Before writing or editing ANY content, you MUST read `docs/STYLE_GUIDE.md` first.**

This is non-negotiable. The style guide contains essential rules that must be followed for all copy, including:
- No em-dashes (use periods, commas, colons)
- Use % symbol: "25%" not "25 percent"
- Paragraphs under 5 lines
- Flesch score 50-60
- Sources section with numbered references
- Active voice (max 20 percent passive)
- No jargon (synergy, leverage, utilize, holistic)

**Read the full guide before proceeding with any content work.**

### Content Workflow

**Before writing or editing content:**
1. Read `docs/STYLE_GUIDE.md` for all rules
2. Run `npm run audit` to see current issues

**After writing or editing content:**
1. Run `npm run fix:style` to auto-fix common issues
2. Run `npm run audit` to check remaining issues
3. Fix any remaining issues manually
4. Verify `lastModified` is updated (auto-fix does this for MDX)

```bash
# Style Audit
npm run audit           # Quick summary of issues
npm run audit:verbose   # Detailed issues with context
npm run audit:fix       # Show suggested fixes
npm run audit:llm       # LLM-specific pattern checks only

# Auto-Fix
npm run fix:style       # Auto-fix: %, em-dashes, &, jargon, LLM patterns
npm run fix:style:dry   # Preview fixes without applying

# Internal Links
npm run links:analyze   # Find missing internal links
npm run links:verbose   # Detailed link suggestions with context

# Content Priority
npm run content:priority         # Show priority queue for content fixes
npm run content:priority:verbose # Detailed scoring breakdown

# Research/Citations
npm run research:citations <file>        # Find uncited statistics
npm run research:citations <file> --fetch # Also fetch sources via Perplexity
npm run research:citations --all         # Scan all content files
```

### Auto-Fixed Issues
The `fix:style` script automatically handles:
- `percent` → `%` (e.g., "25 percent" → "25%")
- Em-dashes (—) → periods
- Ampersands (&) → "and"
- `w/` → "with"
- `U.S.` → "US"
- `1990's` → "1990s"
- `.5` → `0.5`
- `in order to` → "to"
- `whether or not` → "whether"
- `utilize` → "use"
- `move the needle` → "produce results"
- `leverage your/the` → "use your/the"
- Various "very [word]" improvements
- **LLM Patterns:**
  - `## Introduction:` header → removed
  - `## Overview:` header → removed
  - `**From Keith's Perspective:**` → `**From my experience:**`
  - `**Real Results Example:**` → `**Case study:**`
  - `Let me explain.` → removed
  - `Let me walk you through.` → removed
  - `Here's what you need to know` → removed

### Manual Review Required
These issues need human judgment:
- Passive voice (rewrite to active)
- Titles over 60 characters (shorten)
- "really" and remaining "very" in context
- "leverage", "synergy", "holistic" in technical contexts
- Missing internal links (use `npm run links:analyze`)
- Missing Sources section (use `npm run research:citations`)
- Stub content (use `npm run content:priority` to identify)

### Last Modified
**CRITICAL:** When editing ANY content file, update `lastModified` in frontmatter:
```yaml
lastModified: '2026-01-29'  # Always use today's date YYYY-MM-DD
```
The `fix:style` script updates this automatically for MDX files.

### Content Improvement Workflow

**Step 1: Identify priority files**
```bash
npm run content:priority
```
This shows files ranked by urgency (stubs first, then high-traffic pages with issues).

**Step 2: Check specific file issues**
```bash
npm run audit:verbose | grep <filename>
npm run links:analyze --file <filename>
npm run research:citations <filename>
```

**Step 3: Fix issues**
1. Run `npm run fix:style` for auto-fixable issues
2. Manually add internal links (use suggestions from `links:analyze`)
3. Add Sources section with citations (use `research:citations --fetch`)
4. Rewrite LLM patterns to sound natural

**Step 4: Verify**
```bash
npm run audit:verbose | grep <filename>
```

### LLM Pattern Detection
The audit system detects AI-generated content patterns:
- **Headers:** `## Introduction:`, `## Overview:`, `## Background:`
- **Markers:** `**From Keith's Perspective:**`, `**Real Results Example:**`
- **Phrases:** "Let me explain", "Here's what you need to know", "Think of it as"
- **Transitions:** "Now let's", "Well, the...", "You might be wondering"

Run `npm run audit:llm` to check only for LLM patterns.

---

## Writing Rules Summary

See `docs/STYLE_GUIDE.md` for comprehensive guidelines. Key rules:

### Absolute Rules
- **No em-dashes (—):** Use periods, commas, colons, or parentheses instead
- **No jargon:** Never use "utilize," "leverage" (as verb), "synergy," "holistic"
- **Active voice:** "We build growth systems" not "Growth systems are built"
- **Human tone:** Write like Keith talks: direct, no fluff, actionable

### Content Standards
- Paragraphs under 5 lines
- Cite sources for all statistics and claims
- Flesch reading score: 50-60
- Specificity over abstraction (real numbers, real examples)

### Research Protocol
When creating content that requires statistics or research:
1. Use Perplexity API for research (`PERPLEXITY_API_KEY` in .env)
2. Verify claims against primary sources
3. Always cite the original source
4. Include a "Sources" section with numbered references

---

## Tool Stack

**See `docs/TOOLS-WORKFLOW.md` for complete documentation.**

### Role Separation (Critical)
- **Claude** = Reasoning, writing, code, analysis
- **Perplexity** = Research with live web citations (DO NOT use Claude for current stats)
- **Firecrawl** = Web scraping, crawling, site analysis
- **Gemini** = Image generation
- **DataForSEO** = Keyword and SERP data

**Do not make the stack weak by doing 100 percent Claude.** Each tool has a specific strength.

| Tool | Purpose | When to Use |
|------|---------|-------------|
| **Claude** | Reasoning, writing, code | Strategy, content creation, analysis |
| **Perplexity** | Research with citations | Stats, facts, sourced data |
| **Firecrawl** | Web scraping | Competitor sites, directories |
| **Gemini** | Image generation | OG images, blog cards |
| **DataForSEO** | SEO data | Keywords, SERP analysis |

### API Keys (.env)
```
PERPLEXITY_API_KEY=pplx-xxx
FIRECRAWL_API_KEY=fc-xxx
GEMINI_API_KEY=AIzaSyxxx
DATAFORSEO_LOGIN=xxx
DATAFORSEO_PASSWORD=xxx
```

### Perplexity Models (Updated Feb 2026)
- `sonar-pro` - Advanced search with 2x more results (default)
- `sonar` - Lightweight grounded search
- `sonar-reasoning` - Real-time reasoning with search
- `sonar-deep-research` - Long-form source-dense reports

### Decision: Which Tool?
- **Writing content?** → Claude + Perplexity (research first)
- **Need current stats?** → Perplexity (NOT Claude)
- **Competitor analysis?** → Firecrawl → Claude
- **Keyword data?** → DataForSEO
- **Images?** → Gemini

## OG Image Style

See `docs/OG-IMAGE-STYLE-GUIDE.md` for comprehensive guidelines. Key points:

- **Documentary photography aesthetic:** 35mm film grain, muted tones
- **Film stocks:** Kodak Portra 400, Kodak Gold 200, Fuji Pro 400H
- **Era references:** 1970s-1990s documentary, journalistic style
- **Imperfect authenticity:** natural grain, warm muted tones
- **Never include:** people, faces, readable text, logos, perfect lighting
- **Both OG images (1200x630) and card images (800x450) use AI-generated backgrounds**

### Gemini API
- **Model:** `gemini-2.0-flash-exp-image-generation` - NEVER change this model
- If quota is exceeded, wait for reset. Do not switch models.

## Project Status
**Current Phase:** Site Migration from Framer to Astro
**Last Updated:** February 27, 2026 (Session 10)

### ✅ Session 10 - Insights Collection + Analytics + Card Image Guardrails
- **`/insights/` collection built:**
  - 3 data-driven research reports (PI CPL benchmarks, fractional CMO ROI, marketing spend 2026)
  - InsightLayout with reading progress bar, TOC sidebar, key findings callout, methodology section, JSON-LD
  - Index page with hero image, card images, featured insight, filter bar, type badges
  - OG images (1200x630) and card images (800x450) for all 3 insights
  - Content schema: keyFindings, dataDate, insightType, methodology, practiceArea
- **Fractional CMO content pages:**
  - `/fractional-cmo/` - Main fractional CMO page
  - `/personal-injury/` - PI-specific fractional CMO page
- **Card image text guardrails improved:**
  - Insights titles preserve data (numbers, $, %) instead of stripping them
  - Widened card text from 22 to 26 chars/line for better readability
  - Reduced card title font from 42px to 38px for safe zone compliance
  - Word-boundary truncation (no more mid-word cuts)
  - Content-type-aware headline extraction
- **Analytics:** Clicky analytics (ID: 101502024) added to BaseLayout
- **Footer:** Insights link added to Resources column
- **Hero images:** Generated insights-index-hero.jpg via Gemini

### ✅ Session 9 - Homepage Visual Redesign + CTA Consolidation
- **Homepage sections redesigned:**
  - Problem section: neutral slate colors, numbered cards, larger icons
  - System section: visual flow diagram (Intelligence → Editorial → Distribution → Learn)
  - Pillars section: icons, featured card styling, two-line list items
  - Compare section: side-by-side cards with glow effect on LEXGRO, muted agency card
  - CTV section: 90/10 funnel visual, feature cards with icons
- **Color system expanded:**
  - Added slate palette: `--color-slate`, `--color-slate-light`, `--color-slate-dark`
  - Removed off-brand orange from problem section
  - Removed red from comparison section
- **CTA consolidation:**
  - All 30+ Calendly links replaced with `/contact/`
  - Primary conversion now routes to contact form
- **Style guide alignment:**
  - Fixed % vs "percent" rule (use % symbol)
  - All content now passes audit

### ✅ Session 8 - Content Style Audit + Tools Setup
- **Content audit completed:** 106 issues reduced to 39 (63% reduction)
- **Style guide created:** `docs/STYLE_GUIDE.md`
- **Audit tools built:** `npm run audit`, `npm run fix:style`
- **Tools workflow documented:** `docs/TOOLS-WORKFLOW.md`
- **Full tool stack configured:**
  - Perplexity API (research with citations)
  - Firecrawl API (web scraping)
  - Gemini API (image generation)
  - DataForSEO (SEO intelligence)
- **Audit report:** `docs/CONTENT-AUDIT-REPORT.md`

### ✅ Session 7 - Keith's Manifesto Implementation
- **Homepage hero** updated: "Stop Guessing. Start Leading." + new value props
- **About page** completely refreshed:
  - New mission: "Build Predictable, Durable Growth"
  - New vision section added
  - 9 core values (expanded from 4): Aligned Interests, Objectivity Over Ego, Execution Is the Strategy, Accountability Through Data, Ethical Conduct, Respect for People, Trusted Partners Only, Professional Communication, Intentional Growth
  - 3x3 values grid layout
- **"Who We Help" section** added to homepage:
  - "LEXGRO Is NOT For" column (5 items)
  - "LEXGRO IS For" column (5 items)
  - Positioned before FAQ section
- **Blog fixes**: All 27 posts now display, category filter working, using editorial photos instead of branded cards

### ✅ Session 6 - OG Image Pipeline Complete
- **43 OG images** generated (1200x630px) for all pages
- **30 card images** generated (800x450px) for blog/content previews
- Batch generation script: `scripts/generate-all-og.ts`
- Updated prompts.ts with 30+ page-type categories
- All static pages now have OG image props in BaseLayout
- Blog index updated to use content collection + card images
- Fixed all `/og/og-*.png` paths to `/og/*.png`

### ✅ Session 5 Additions (50 pages total)
- `/podcast/` - Podcast index with 26 episodes
- `/podcast/[slug].astro` - Dynamic episode pages
- `/cmo-podcast/` - CMO Podcast with 3 episodes
- `/cmo-podcast/[slug].astro` - CMO episode pages
- `/tips-from-keith/` - Video tips page with 12 tips
- `/services/vendor.astro` - Vendor platform service
- `/services/evergreen-marketing.astro` - Training service
- `/services/evergreen-consulting.astro` - Consulting service
- `/privacy.astro` - Privacy policy
- `/terms.astro` - Terms of service
- `/faq.astro` - Comprehensive FAQ page
- `/results.astro` - Case studies and results
- `/calculator.astro` - Marketing ROI calculator
- `/careers.astro` - Careers page

## OG Image Pipeline

### Generated Images
```
public/og/                    # OG images (1200x630)
├── homepage.png              # Homepage
├── about.png                 # About page
├── contact.png               # Contact page
├── faq.png                   # FAQ
├── results.png               # Results/Case Studies
├── careers.png               # Careers
├── calculator.png            # ROI Calculator
├── podcast.png               # Podcast pages
├── tips-from-keith.png       # Tips from Keith
├── services.png              # Services index + subpages
├── guide.png                 # Guides index
├── blog.png                  # Blog index
├── answers.png               # Answers index
├── insights.png              # Insights index
├── blog/                     # Blog post OG images
│   └── *.png                 # 27 blog posts
├── guide/                    # Guide OG images
│   └── *.png
├── answers/                  # Answer OG images
│   └── *.png
├── insights/                 # Insight OG images
│   └── *.png                 # 3 research reports
└── services/                 # Service OG images
    └── *.png

public/cards/                 # Card images (800x450) for previews
├── blog/
│   └── *.png                 # 27 blog cards
├── guide/
│   └── *.png
├── answers/
│   └── *.png
├── insights/
│   └── *.png                 # 3 insight cards
└── services/
    └── *.png
```

### Generation Commands
```bash
# Generate all missing images
npx tsx scripts/generate-all-og.ts

# Force regenerate all images
npx tsx scripts/generate-all-og.ts --force

# Generate only static pages
npx tsx scripts/generate-all-og.ts --pages

# Generate only content collection items
npx tsx scripts/generate-all-og.ts --content

# Generate only card images
npx tsx scripts/generate-all-og.ts --cards
```

### OG Image System Files
```
src/lib/og/
├── compositor.ts        # Sharp-based image compositing
└── prompts.ts           # 30+ page categories with gradients

scripts/
├── generate-all-og.ts   # Batch OG + card generation (content-type-aware)
├── generate-hero-images.ts  # Hero backgrounds via Gemini (1920x1080)
└── generate-homepage-og.ts  # Homepage-specific with Gemini
```

### Card Image Guardrails
- **OG images:** 1200x630, 80px safe padding, 28 chars/line, 56px title font
- **Card images:** 800x450, 48px safe padding, 26 chars/line, 38px title font
- **Max 2 lines** for titles on both formats
- **Insights content** preserves full titles (data/numbers are the hook)
- **Blog/guide content** uses punchy headline extraction (strips filler prefixes)
- **Truncation** always at word boundaries (no mid-word cuts)

## Migration Progress

### ✅ Foundation Complete
- [x] `astro.config.mjs` - React, MDX, sitemap integrations
- [x] Design tokens (`src/lib/theme/tokens.ts`)
- [x] `BaseLayout.astro` with Header, Footer, global styles
- [x] `Header.astro` - Astro-native nav with mobile menu
- [x] `Footer.astro` - Astro-native footer
- [x] Content collections config (`src/content.config.ts`)
- [x] 5 page layouts: GuideLayout, AnswerLayout, ServiceLayout, BlogLayout, InsightLayout
- [x] Dynamic routing for all content types

### 📄 Pages Built (92 Total)

**Core Pages:**
- `/` - Homepage (COMPLETE - all 17 sections)
- `/about/` - About page with Keith bio, stats, values
- `/contact/` - Contact form, methods, FAQs
- `/privacy/` - Privacy policy
- `/terms/` - Terms of service
- `/faq/` - Comprehensive FAQ
- `/results/` - Case studies and success stories
- `/calculator/` - Marketing ROI calculator
- `/careers/` - Careers page
- `/how-we-work/` - System overview
- `/lexxly/` - Intelligence platform

**Services:**
- `/services/` - Services index with cards and process
- `/services/fractional-cmo/` - Fractional CMO service
- `/services/vendor/` - Vendor platform service
- `/services/evergreen-marketing/` - Training service
- `/services/evergreen-consulting/` - Consulting service
- `/fractional-cmo/` - Fractional CMO landing page
- `/personal-injury/` - PI-specific fractional CMO page

**Content Hubs:**
- `/blog/` - Blog index with featured posts (uses card images)
- `/blog/[slug]/` - 27 blog posts
- `/guide/` - Guides index with topic navigation
- `/guide/[slug]/` - Guide pages
- `/answers/` - Answers index with search
- `/answers/[slug]/` - Answer pages
- `/insights/` - Research index with hero, card images, filter bar
- `/insights/[slug]/` - 3 insight reports (benchmarks, market analysis, surveys)

**Podcast (29 pages):**
- `/podcast/` - Law Firm Growth Podcast index
- `/podcast/[slug]/` - 26 episode pages
- `/cmo-podcast/` - CMO Podcast index
- `/cmo-podcast/[slug]/` - 3 CMO episode pages

**Video Content:**
- `/tips-from-keith/` - Video tips library (12 tips)

### 📋 Brand Messaging (Keith's Manifesto 2026)

**Mission:**
> LEXGRO helps law firms build predictable, durable growth by aligning strategy, execution, and accountability under one system.

**Vision:**
> To become the most trusted growth partner in legal marketing—known for honest advice, deep expertise, and measurable results.

**Hero Tagline:** "Stop Guessing. Start Leading."

**Core Values (9):**
1. Aligned Interests Above All
2. Objectivity Over Ego
3. Execution Is the Strategy
4. Accountability Through Data
5. Ethical Conduct, Always
6. Respect for People and Perspectives
7. Trusted Partners Only
8. Professional Communication Is Non-Negotiable
9. Intentional Growth

**Differentiator:** "Execution Is the Strategy" - Plans without implementation are worthless.

### 🎨 Design System Colors
```css
--color-primary: #298C42       /* Main green */
--color-primary-dark: #1F8238  /* Hover green */
--color-primary-light: #3DA056 /* Light green */
--color-teal: #1AA774          /* Secondary green */
--color-mint: #25B97B          /* Mint accent */
--color-accent: #FF8158        /* Orange accent */
--color-accent-purple: #673AE4 /* Purple accent */
--color-bg-dark: #011907       /* Dark sections */
--color-bg-dark-alt: #233B29   /* Alt dark bg */
--color-bg-light: #C0E9CA      /* Light green bg */
--color-bg-lighter: #D6FFE0    /* Very light green */
--color-text-dark: #212121     /* Body text */
--color-text-muted: #4B6359    /* Accessible muted (WCAG AA) */
--color-slate: #64748b         /* Neutral slate - muted elements */
--color-slate-light: #94a3b8   /* Light slate */
--color-slate-dark: #475569    /* Dark slate */
```

### 🔜 TODO - Next Priority
1. [ ] Add YouTube video ID to homepage video modal
2. [ ] Create vendor subpages (7 pages)
3. [ ] Build /sops-tools members area
4. [ ] Add SEO schemas (JSON-LD)
5. [ ] Full accessibility audit
6. [ ] Performance optimization

### ⚠️ Needs Configuration
- Video modal: Replace `YOUR_VIDEO_ID` in index.astro script with actual YouTube video ID

## Dev Commands
```bash
npm run dev -- --port 4322   # Dev server
npm run build                 # Build (92 pages)
npx tsx scripts/generate-all-og.ts  # Generate OG images
```

## Key Files
```
src/
├── components/
│   ├── Header.astro
│   └── Footer.astro
├── layouts/
│   ├── BaseLayout.astro
│   ├── GuideLayout.astro
│   ├── AnswerLayout.astro
│   ├── ServiceLayout.astro
│   ├── BlogLayout.astro
│   └── InsightLayout.astro
├── pages/
│   ├── index.astro          # Homepage
│   ├── about.astro
│   ├── contact.astro
│   ├── faq.astro
│   ├── results.astro
│   ├── calculator.astro
│   ├── careers.astro
│   ├── privacy.astro
│   ├── terms.astro
│   ├── guide/
│   ├── answers/
│   ├── services/
│   ├── blog/
│   ├── insights/
│   ├── podcast/
│   ├── cmo-podcast/
│   └── tips-from-keith/
├── lib/og/
│   ├── compositor.ts
│   └── prompts.ts
├── data/
│   ├── podcast-episodes.ts
│   └── cmo-podcast-episodes.ts
└── content/
    ├── blog/
    ├── guides/
    ├── answers/
    ├── insights/
    └── services/

public/
├── og/                      # 46+ OG images
├── cards/                   # 33+ card images
└── og-image.png             # Default OG fallback

scripts/
├── generate-all-og.ts       # Batch OG generation
├── generate-hero-images.ts  # Hero backgrounds via Gemini
├── generate-homepage-og.ts  # Homepage OG with Gemini
├── audit-content.ts         # Style guide audit (npm run audit)
├── fix-content-style.ts     # Auto-fix style issues (npm run fix:style)
├── analyze-internal-links.ts # Link analysis (npm run links:analyze)
├── prioritize-content.ts    # Priority queue (npm run content:priority)
├── research-for-content.ts  # Citation helper (npm run research:citations)
└── research-topic.ts        # Topic research with Perplexity
```

## Reference Data
- Scraped Framer homepage: `scripts/research/output/lexgro-page-home.md`
- Framer HTML: `scripts/research/output/lexgro-page-home.html`
- Planning docs: `planning/`
- Content briefs: `planning/briefs/phase-1/`

## Current Site
- URL: https://lexgro.com
- Analytics: GA (G-2Z5L72S3NL), GTM (GTM-WK56H7KT), Clicky (101502024), Facebook Pixel, Hyros

## Astro 5 Notes
- Use `render()` from `astro:content` instead of `entry.render()`
- Content collections use glob loader pattern
- Dynamic routes use `getStaticPaths()` with params/props
