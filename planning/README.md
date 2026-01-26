# Lexgro Programmatic SEO Project

> Research-first content strategy for lexgro.com fractional CMO and legal marketing services.

**Project Started:** 2026-01-17
**Current Phase:** COMPLETE - Ready for Claude Project Transfer

---

## Project Journey

This project follows a data-driven approach: research first, then strategy. Below is the complete workflow we've followed.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         LEXGRO SEO PROJECT JOURNEY                          │
└─────────────────────────────────────────────────────────────────────────────┘

PHASE 1: SETUP & PLANNING ✅ COMPLETED
══════════════════════════════════════
├── Created project folder structure
├── Defined target keywords (85+ across 11 categories)
├── Identified data sources (DataForSEO, Reddit)
└── Built research scripts

         ↓

PHASE 2: REDDIT SENTIMENT ANALYSIS ✅ COMPLETED
═══════════════════════════════════════════════
├── Script: reddit-sentiment.js
├── Subreddits: lawyers, lawfirm, LawFirm, Lawyertalk, LawFirmMarketing, Legalmarketing
├── Posts Analyzed: 346
├── Pain Points Identified: 6 clusters
│   ├── Budget & ROI Concerns (97 mentions)
│   ├── DIY Marketing Struggles (97 mentions)
│   ├── Intake & Conversion Issues (88 mentions)
│   ├── Hiring & Staffing Challenges (80 mentions)
│   ├── Channel Selection Confusion (32 mentions)
│   └── Agency Frustrations (30 mentions)
└── Output: research/reddit-data.json, research/REDDIT_SENTIMENT_REPORT.md

         ↓

PHASE 3: KEYWORD RESEARCH ✅ COMPLETED
══════════════════════════════════════
├── Script: keyword-research.js
├── API: DataForSEO Google Ads Search Volume
├── Keywords Analyzed: 81
├── Key Findings:
│   ├── Top Volume: lawyer seo (8,100/mo), law firm seo (6,600/mo)
│   ├── "fractional cmo for law firms" = 0 volume (blue ocean opportunity)
│   ├── High-value traffic drivers identified
│   └── Practice-specific fractional CMO = all 0 volume (own category)
└── Output: research/keyword-data.json, research/KEYWORD_RESEARCH_REPORT.md

         ↓

PHASE 4: STRATEGY SYNTHESIS ✅ COMPLETED
════════════════════════════════════════
├── Integrated keyword data with Reddit pain points
├── Mapped content to search intent + pain points
├── Created content architecture (64+ pages planned)
├── Defined schema types for each content type
├── Prioritized by volume + strategic value
└── Output: CONTENT_STRATEGY_ENHANCED.md

         ↓

PHASE 5: SITEMAP & INTERNAL LINKING ✅ COMPLETED
════════════════════════════════════════════════
├── Created complete sitemap visualization
├── Mapped all content clusters
├── Defined internal linking for every page
├── Created anchor text strategy
└── Output: SITEMAP_ARCHITECTURE.md

         ↓

PHASE 6: BRAND VOICE & ALIGNMENT ✅ COMPLETED
═════════════════════════════════════════════
├── Scanned lexgro.com for voice, tone, style
├── Analyzed Keith Dyer's positioning as Fractional CMO
├── Created author schema for SEO
├── Revised all content titles to Keith's perspective
├── Documented writing style + content templates
└── Output: BRAND_VOICE_STYLE_GUIDE.md

         ↓

PHASE 7: CONTENT SPECS ✅ COMPLETE
═══════════════════════════════════
├── Master specs for all 68 pages created
├── Perplexity prompts for each content piece
├── URLs, titles, keywords, word counts defined
└── Output: MASTER_CONTENT_SPECS.md

         ↓

PHASE 8: TRANSFER TO CLAUDE PROJECT ✅ READY
═════════════════════════════════════════════
├── Use Perplexity prompts for research
├── Draft content following briefs
├── Review against style guide
└── Publish with schema markup
```

---

## Folder Structure

```
lexgro-keyword-research/
│
├── README.md                          # This file - project overview
│
├── STRATEGY DOCUMENTS
│   ├── CONTENT_STRATEGY.md            # Original strategy (reference)
│   ├── CONTENT_STRATEGY_ENHANCED.md   # Final integrated strategy
│   ├── SITEMAP_ARCHITECTURE.md        # Internal linking map
│   ├── BRAND_VOICE_STYLE_GUIDE.md     # Keith Dyer voice + revised titles
│   └── MASTER_CONTENT_SPECS.md        # All 68 pages with Perplexity prompts
│
├── research/                          # Research data & reports
│   ├── KEYWORD_RESEARCH_REPORT.md     # DataForSEO keyword analysis
│   ├── REDDIT_SENTIMENT_REPORT.md     # Reddit pain point clusters
│   ├── keyword-data.json              # Raw keyword data (168KB)
│   └── reddit-data.json               # Raw Reddit data (368KB)
│
├── briefs/                            # Content briefs for production
│   ├── README.md                      # Brief index & workflow
│   └── phase-1/                       # Phase 1 content briefs (7 total)
│       ├── PILLAR-01-fractional-cmo-law-firms.md
│       ├── PILLAR-02-law-firm-marketing.md
│       ├── ANSWER-01-what-is-fractional-cmo.md
│       ├── ANSWER-02-fractional-cmo-cost.md
│       ├── ANSWER-03-fractional-cmo-vs-agency.md
│       ├── ANSWER-04-when-hire-fractional-cmo.md
│       └── SERVICE-01-fractional-cmo.md
│
├── keyword-research.js                # DataForSEO API script
├── reddit-sentiment.js                # Reddit public API script
└── .env                               # API credentials
```

---

## Quick Links

| Document | Description |
|----------|-------------|
| [**Master Content Specs**](MASTER_CONTENT_SPECS.md) | **All 68 pages with Perplexity prompts** |
| [Content Strategy](CONTENT_STRATEGY_ENHANCED.md) | Full 68 page content plan |
| [Sitemap & Linking](SITEMAP_ARCHITECTURE.md) | Internal linking architecture |
| [Brand Voice Guide](BRAND_VOICE_STYLE_GUIDE.md) | Keith Dyer voice + titles |
| [Keyword Report](research/KEYWORD_RESEARCH_REPORT.md) | 81 keywords analyzed |
| [Reddit Report](research/REDDIT_SENTIMENT_REPORT.md) | 346 posts, 6 pain clusters |

---

## Research Findings Summary

### Keyword Research Highlights

**Traffic Drivers (High Volume):**
| Keyword | Monthly Volume | Competition |
|---------|----------------|-------------|
| lawyer seo | 8,100 | LOW |
| law firm seo | 6,600 | LOW |
| law firm marketing | 3,600 | MEDIUM |
| lawyer website design | 3,600 | LOW |
| attorney website design | 3,600 | LOW |
| law firm web design | 2,900 | LOW |

**Blue Ocean Keywords (Own the Category):**
| Keyword | Monthly Volume | Strategy |
|---------|----------------|----------|
| fractional cmo for law firms | 0 | Category ownership |
| fractional cmo for personal injury law firms | 0 | Practice-specific |
| fractional cmo for immigration law firms | 0 | Practice-specific |
| fractional cmo vs marketing agency | 0 | Comparison capture |

### Reddit Pain Points (Content Angles)

| Pain Point | Mentions | Content Opportunity |
|------------|----------|---------------------|
| Budget & ROI Concerns | 97 | Budget guides, ROI calculators |
| DIY Marketing Struggles | 97 | DIY vs outsourcing content |
| Intake & Conversion Issues | 88 | Intake best practices |
| Hiring & Staffing Challenges | 80 | Fractional CMO positioning |
| Channel Selection Confusion | 32 | SEO vs PPC comparisons |
| Agency Frustrations | 30 | Red flags, firing agency guides |

---

## Content Production Workflow

### For Each Piece of Content:

```
1. READ THE BRIEF
   └── briefs/phase-X/[BRIEF].md

2. RESEARCH WITH PERPLEXITY
   └── Copy prompt from brief → Run in Perplexity → Save sources

3. DRAFT CONTENT
   └── Follow outline in brief
   └── Include all required elements
   └── Match Keith's voice (see BRAND_VOICE_STYLE_GUIDE.md)

4. ADD INTERNAL LINKS
   └── Per SITEMAP_ARCHITECTURE.md

5. IMPLEMENT SCHEMA
   └── Per brief specifications

6. REVIEW CHECKLIST
   └── Use checklist at end of brief
```

---

## Content Production Status

### All Content Specs Complete

| Content Type | Count | Specs | Perplexity Prompts |
|--------------|-------|-------|-------------------|
| Pillars | 7 | ✅ | ✅ |
| Answers | 41 | ✅ | ✅ |
| Services | 8 | ✅ | ✅ |
| Blog Posts | 12 | ✅ | ✅ |
| **TOTAL** | **68** | **✅** | **✅** |

**All specs in:** MASTER_CONTENT_SPECS.md

---

## How to Run Research Scripts

### Reddit Sentiment Analysis

```bash
cd /Users/jaredreagan/Projects/lexgro-keyword-research
node reddit-sentiment.js
```

No credentials required (uses public Reddit JSON API).

### Keyword Research

```bash
cd /Users/jaredreagan/Projects/lexgro-keyword-research

# Credentials in .env file
node keyword-research.js
```

---

## Strategic Rationale

### Why "Fractional CMO for Law Firms" with 0 Search Volume?

1. **Blue Ocean Strategy:** No competition for the exact term
2. **Category Ownership:** First to define and dominate the category
3. **Rising Trend:** "fractional cmo" general term has 880/mo and growing
4. **Pain Point Alignment:** Directly solves agency frustration + hiring challenges
5. **High-Value Traffic:** Use SEO (8,100/mo) and marketing (3,600/mo) keywords to drive traffic, convert to fractional CMO service

### Content Flywheel

```
High-Volume Keywords (SEO, Marketing)
              ↓
        Guide Content
              ↓
      Answer Questions
              ↓
    Address Pain Points
              ↓
   Position Fractional CMO
              ↓
        Conversion
```

---

*Project: Lexgro Programmatic SEO*
*Version: 3.0*
*Last Updated: 2026-01-17*
