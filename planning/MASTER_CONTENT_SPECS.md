# Lexgro Master Content Specifications

> All content specs with Perplexity prompts for content production

**Use With:** BRAND_VOICE_STYLE_GUIDE.md, SITEMAP_ARCHITECTURE.md

---

## Content Summary

| Type | Count | Priority | CMS Collection |
|------|-------|----------|----------------|
| **Main Pillars** | 2 | CORE | `guides` |
| **Sub-Pillars** | 5 | CORE | `guides` |
| **Answers** | 41 | CORE | `answers` |
| **Services** | 8 | CORE | `services` |
| **Blog** | 12 | OPTIONAL | `blog` (existing) |
| **CORE TOTAL** | **56** | | |

---

## Content Hierarchy & Relationships

```
lexgro.com
│
├── /guide/ (CMS: guides collection)
│   │
│   ├── MAIN PILLAR: fractional-cmo-law-firms/
│   │   ├── Intent: Informational + Commercial Investigation
│   │   ├── Focus: Define category, establish authority
│   │   └── Links TO: All fractional CMO answers, service page
│   │
│   └── MAIN PILLAR: law-firm-marketing/
│       ├── Intent: Informational + Commercial Investigation
│       ├── Focus: Comprehensive marketing overview
│       ├── Links TO: All sub-pillars, budget answers
│       │
│       └── SUB-PILLARS (5):
│           ├── law-firm-seo/
│           │   ├── Parent: law-firm-marketing
│           │   ├── Intent: Informational
│           │   └── Links TO: 5 SEO answers
│           │
│           ├── law-firm-ppc/
│           │   ├── Parent: law-firm-marketing
│           │   ├── Intent: Informational + Commercial
│           │   └── Links TO: 4 PPC answers
│           │
│           ├── law-firm-web-design/
│           │   ├── Parent: law-firm-marketing
│           │   ├── Intent: Informational + Commercial
│           │   └── Links TO: 3 web design answers
│           │
│           ├── law-firm-lead-generation/
│           │   ├── Parent: law-firm-marketing
│           │   ├── Intent: Informational + Commercial
│           │   └── Links TO: 4 intake answers
│           │
│           └── law-firm-marketing-budget/
│               ├── Parent: law-firm-marketing
│               ├── Intent: Informational
│               └── Links TO: 6 budget/ROI answers
│
├── /answers/ (CMS: answers collection)
│   │
│   ├── FRACTIONAL CMO CLUSTER (8 answers)
│   │   ├── Parent Pillar: fractional-cmo-law-firms
│   │   ├── Intent: Informational (top-funnel)
│   │   └── Pages:
│   │       ├── what-is-fractional-cmo (880/mo)
│   │       ├── fractional-cmo-cost (140/mo)
│   │       ├── fractional-cmo-vs-agency
│   │       ├── fractional-cmo-vs-full-time
│   │       ├── when-hire-fractional-cmo
│   │       ├── what-does-fractional-cmo-do
│   │       ├── fractional-cmo-hours
│   │       └── fractional-cmo-roi
│   │
│   ├── SEO CLUSTER (5 answers)
│   │   ├── Parent Pillar: law-firm-seo
│   │   ├── Intent: Informational + Commercial
│   │   └── Pages: seo-cost, is-seo-worth-it, how-long-results, local-seo, seo-vs-ppc
│   │
│   ├── PPC CLUSTER (4 answers)
│   │   ├── Parent Pillar: law-firm-ppc
│   │   ├── Intent: Commercial Investigation
│   │   └── Pages: ppc-cost, cpc-rates, lsa-vs-google-ads, google-ads-worth-it
│   │
│   ├── WEB DESIGN CLUSTER (3 answers)
│   │   ├── Parent Pillar: law-firm-web-design
│   │   ├── Intent: Commercial Investigation
│   │   └── Pages: website-cost, website-features, website-mistakes
│   │
│   ├── LEAD GEN/INTAKE CLUSTER (4 answers)
│   │   ├── Parent Pillar: law-firm-lead-generation
│   │   ├── Intent: Informational + Problem-Aware
│   │   └── Pages: intake-best-practices, why-losing-leads, response-time, conversion-rate
│   │
│   ├── BUDGET/ROI CLUSTER (6 answers)
│   │   ├── Parent Pillar: law-firm-marketing-budget
│   │   ├── Intent: Informational + Commercial
│   │   └── Pages: marketing-budget, marketing-roi, cost-per-case, advertising-spend, percentage-revenue, budget-by-practice
│   │
│   ├── AGENCY SELECTION CLUSTER (4 answers)
│   │   ├── Parent Pillar: law-firm-marketing
│   │   ├── Intent: Problem-Aware (frustrated with agencies)
│   │   └── Pages: how-choose-agency, agency-red-flags, signs-not-working, how-fire-agency
│   │
│   └── PRACTICE-SPECIFIC CLUSTER (7 answers)
│       ├── Parent Pillar: law-firm-marketing
│       ├── Intent: Commercial Investigation
│       └── Pages: PI, family-law, immigration, criminal-defense, estate-planning, bankruptcy, mass-tort
│
├── /services/ (CMS: services collection)
│   │
│   ├── MAIN SERVICE: fractional-cmo/
│   │   ├── Intent: Transactional (bottom-funnel)
│   │   ├── Focus: Convert, pricing, CTA
│   │   └── Links FROM: All pillars and answers
│   │
│   └── PRACTICE-SPECIFIC SERVICES (7)
│       ├── Parent: fractional-cmo
│       ├── Intent: Transactional
│       └── Pages: PI, family-law, immigration, criminal-defense, estate-planning, bankruptcy, mass-tort
│
└── /blog/ (existing CMS - OPTIONAL)
    ├── Intent: Thought leadership, pain point content
    ├── Focus: Drive awareness, build trust
    └── Links TO: Relevant pillars and service pages
```

---

## Search Intent by Page Type

| Page Type | Primary Intent | Funnel Stage | Goal |
|-----------|---------------|--------------|------|
| Main Pillars | Informational + Commercial | Awareness → Consideration | Educate, establish authority |
| Sub-Pillars | Informational | Awareness → Consideration | Deep-dive on channel |
| Answers | Informational | Awareness | Answer specific question |
| Agency Answers | Problem-Aware | Consideration | Address pain, offer solution |
| Practice Answers | Commercial Investigation | Consideration | Practice-specific needs |
| Services | Transactional | Decision | Convert to consultation |
| Blog | Informational/Emotional | Awareness | Build trust, share POV |

---

## Framer CMS Collections

### Collection 1: `guides` (Pillars + Sub-Pillars)

| Field Name | Field Type | Required | Notes |
|------------|------------|----------|-------|
| `title` | String | Yes | Page title (H1) |
| `slug` | Slug | Yes | URL path |
| `metaDescription` | String | Yes | 150-160 chars |
| `targetKeyword` | String | Yes | Primary keyword |
| `searchVolume` | Number | No | Monthly search volume |
| `content` | Formatted Text | Yes | Full HTML content |
| `wordCount` | Number | Yes | Target: 4,000-8,000 |
| `pageType` | Enum | Yes | `main-pillar` or `sub-pillar` |
| `parentPillar` | Collection Reference | No | For sub-pillars only |
| `searchIntent` | Enum | Yes | `informational`, `commercial`, `transactional` |
| `funnelStage` | Enum | Yes | `awareness`, `consideration`, `decision` |
| `relatedAnswers` | Multi Reference | No | Link to answer cluster |
| `ctaService` | Collection Reference | No | Link to service page |
| `faqSchema` | Formatted Text | No | FAQ JSON-LD |
| `published` | Boolean | Yes | Draft/Live |
| `publishedDate` | Date | Yes | Publish date |

---

### Collection 2: `answers` (41 Answer Pages)

| Field Name | Field Type | Required | Notes |
|------------|------------|----------|-------|
| `title` | String | Yes | Page title (H1) |
| `slug` | Slug | Yes | URL path |
| `metaDescription` | String | Yes | 150-160 chars |
| `targetKeyword` | String | Yes | Primary keyword |
| `searchVolume` | Number | No | Monthly search volume |
| `quickAnswer` | String | Yes | Featured snippet (50-60 words) |
| `content` | Formatted Text | Yes | Full HTML content |
| `wordCount` | Number | Yes | Target: 1,200-2,500 |
| `cluster` | Enum | Yes | `fractional-cmo`, `seo`, `ppc`, `web-design`, `lead-gen`, `budget`, `agency`, `practice-specific` |
| `parentPillar` | Collection Reference | Yes | Link to parent guide |
| `searchIntent` | Enum | Yes | `informational`, `commercial`, `problem-aware` |
| `relatedAnswers` | Multi Reference | No | Related answer pages |
| `ctaService` | Collection Reference | No | Link to service page |
| `faqSchema` | Formatted Text | No | FAQ JSON-LD |
| `published` | Boolean | Yes | Draft/Live |
| `publishedDate` | Date | Yes | Publish date |

---

### Collection 3: `services` (8 Service Pages)

| Field Name | Field Type | Required | Notes |
|------------|------------|----------|-------|
| `title` | String | Yes | Page title (H1) |
| `slug` | Slug | Yes | URL path |
| `metaDescription` | String | Yes | 150-160 chars |
| `targetKeyword` | String | Yes | Primary keyword |
| `content` | Formatted Text | Yes | Full HTML content |
| `serviceType` | Enum | Yes | `main` or `practice-specific` |
| `practiceArea` | Enum | No | PI, family-law, immigration, etc. |
| `parentService` | Collection Reference | No | For practice-specific only |
| `pricing` | String | No | Pricing info/ranges |
| `features` | Formatted Text | No | What's included list |
| `ctaText` | String | Yes | CTA button text |
| `ctaUrl` | Link | Yes | Calendly or contact link |
| `relatedGuide` | Collection Reference | No | Link to pillar |
| `testimonials` | Formatted Text | No | Client quotes |
| `faqSchema` | Formatted Text | No | FAQ JSON-LD |
| `published` | Boolean | Yes | Draft/Live |
| `publishedDate` | Date | Yes | Publish date |

---

### Sample CMS Item Structures (JSON)

**Guide (Pillar) Example:**
```json
{
  "title": "Fractional CMO for Law Firms: What I Wish Every Attorney Knew",
  "slug": "fractional-cmo-law-firms",
  "metaDescription": "Learn what a fractional CMO does for law firms...",
  "targetKeyword": "fractional cmo for law firms",
  "searchVolume": 0,
  "pageType": "main-pillar",
  "parentPillar": null,
  "searchIntent": "commercial",
  "funnelStage": "consideration",
  "wordCount": 5500,
  "content": "<h2>...</h2>",
  "relatedAnswers": ["what-is-fractional-cmo", "fractional-cmo-cost", "..."],
  "ctaService": "fractional-cmo",
  "published": true,
  "publishedDate": "2026-01-20"
}
```

**Answer Example:**
```json
{
  "title": "What Is a Fractional CMO? (And Why Law Firms Are Hiring Them)",
  "slug": "what-is-fractional-cmo",
  "metaDescription": "A fractional CMO is a part-time marketing executive...",
  "targetKeyword": "what is a fractional cmo",
  "searchVolume": 880,
  "quickAnswer": "A fractional CMO is a part-time Chief Marketing Officer who provides strategic marketing leadership...",
  "cluster": "fractional-cmo",
  "parentPillar": "fractional-cmo-law-firms",
  "searchIntent": "informational",
  "wordCount": 1800,
  "content": "<h2>What 'Fractional' Actually Means</h2><p>...</p>",
  "relatedAnswers": ["fractional-cmo-cost", "when-hire-fractional-cmo"],
  "ctaService": "fractional-cmo",
  "published": true,
  "publishedDate": "2026-01-20"
}
```

**Service Example:**
```json
{
  "title": "Fractional CMO Services: Marketing Leadership for Law Firms",
  "slug": "fractional-cmo",
  "metaDescription": "Get strategic marketing leadership without a full-time hire. LEXGRO's fractional CMO services help law firms build predictable revenue.",
  "targetKeyword": "fractional cmo services",
  "serviceType": "main",
  "practiceArea": null,
  "parentService": null,
  "pricing": "$7,500-$15,000/month",
  "content": "<h2>Marketing Leadership for Law Firms</h2><p>...</p>",
  "ctaText": "Schedule a Strategy Call",
  "ctaUrl": "https://calendly.com/lexgro",
  "relatedGuide": "fractional-cmo-law-firms",
  "published": true,
  "publishedDate": "2026-01-20"
}
```

---

## Content Production Workflow

1. Copy Perplexity prompt for the content piece
2. Run in Perplexity, save cited sources
3. Draft content using specs + research + brand voice guide
4. Add internal links per sitemap architecture
5. Implement schema markup
6. **For Answers:** Export to CMS format / import to Framer

---

## PILLARS (7 Total)

### PILLAR-01: Fractional CMO for Law Firms
| Spec | Value |
|------|-------|
| URL | `/guide/fractional-cmo-law-firms/` |
| Title | Fractional CMO for Law Firms: What I Wish Every Attorney Knew |
| Keywords | fractional cmo for law firms (0), fractional cmo cost (140), what is a fractional cmo (880) |
| Word Count | 5,000-6,000 |
| Schema | Article, FAQPage, HowTo |
| **Page Type** | Main Pillar |
| **Parent** | None (top-level) |
| **Intent** | Informational + Commercial Investigation |
| **Funnel Stage** | Awareness → Consideration |
| **Focus** | Define "fractional CMO for law firms" category, establish Keith as authority |
| **Links TO** | 8 fractional CMO answers, main service page, practice-specific services |
| **CTA** | → /services/fractional-cmo/ |

**Perplexity Prompt:**
```
Research fractional CMO for law firms. Provide cited sources for:
1. Fractional CMO pricing ($5K-$15K/mo typical) and engagement models
2. Full-time CMO salary comparison ($200K-$350K)
3. Law firm marketing spend benchmarks (% of revenue)
4. When businesses hire fractional executives (revenue stages)
5. Marketing leadership impact on growth
Focus on 2024-2025 data from legal industry publications, business sources, compensation surveys.
```

---

### PILLAR-02: Law Firm Marketing
| Spec | Value |
|------|-------|
| URL | `/guide/law-firm-marketing/` |
| Title | Law Firm Marketing That Actually Works: A CMO's Perspective |
| Keywords | law firm marketing (3,600), legal marketing (1,900), attorney marketing (720) |
| Word Count | 6,000-8,000 |
| Schema | Article, FAQPage |
| **Page Type** | Main Pillar |
| **Parent** | None (top-level) |
| **Intent** | Informational + Commercial Investigation |
| **Funnel Stage** | Awareness → Consideration |
| **Focus** | Comprehensive marketing overview, links to all sub-pillars |
| **Links TO** | 5 sub-pillars (SEO, PPC, Web Design, Lead Gen, Budget), agency answers, practice-specific answers |
| **CTA** | → /services/fractional-cmo/ |

**Perplexity Prompt:**
```
Research law firm marketing comprehensively. Provide cited sources for:
1. Law firm marketing statistics (spend, channels, trends)
2. Most effective marketing channels for law firms
3. Marketing ROI benchmarks for legal industry
4. Digital marketing adoption rates in law firms
5. Common marketing mistakes law firms make
Focus on Clio Legal Trends Report, ABA data, legal marketing research 2024-2025.
```

---

### PILLAR-03: Law Firm SEO (Sub-Pillar)
| Spec | Value |
|------|-------|
| URL | `/guide/law-firm-seo/` |
| Title | Law Firm SEO: What's Working Now (And What's a Waste of Money) |
| Keywords | law firm seo (6,600), lawyer seo (8,100), attorney seo (2,900) |
| Word Count | 5,000-6,000 |
| Schema | Article, FAQPage, HowTo |
| **Page Type** | Sub-Pillar |
| **Parent** | /guide/law-firm-marketing/ |
| **Intent** | Informational |
| **Funnel Stage** | Awareness → Consideration |
| **Focus** | Deep-dive on SEO channel, honest assessment of when it works |
| **Links TO** | 5 SEO answers, parent pillar, sibling sub-pillars |
| **CTA** | → /services/fractional-cmo/ |

**Perplexity Prompt:**
```
Research law firm SEO. Provide cited sources for:
1. Law firm SEO costs ($1K-$10K/mo ranges)
2. SEO timeline expectations (6-12 months typical)
3. Local SEO vs organic SEO for lawyers
4. Google algorithm updates affecting local businesses
5. Law firm SEO success stories and case studies
Focus on SEO industry publications (Moz, Ahrefs), legal marketing data 2024-2025.
```

---

### PILLAR-04: Law Firm PPC (Sub-Pillar)
| Spec | Value |
|------|-------|
| URL | `/guide/law-firm-ppc/` |
| Title | Google Ads for Law Firms: An Honest Assessment |
| Keywords | law firm ppc (1,000), google ads for lawyers (720), lawyer ppc (480) |
| Word Count | 4,500-5,500 |
| Schema | Article, FAQPage |
| **Page Type** | Sub-Pillar |
| **Parent** | /guide/law-firm-marketing/ |
| **Intent** | Informational + Commercial Investigation |
| **Funnel Stage** | Awareness → Consideration |
| **Focus** | Honest assessment of PPC, when to use, budget expectations, agency oversight |
| **Links TO** | 4 PPC answers (cost, CPC rates, LSA vs Ads, worth it), parent pillar, sibling sub-pillars |
| **CTA** | → /services/fractional-cmo/ |

**Perplexity Prompt:**
```
Research law firm PPC/Google Ads. Provide cited sources for:
1. Average CPC by practice area (PI $50-150, family law $20-50, etc.)
2. LSA vs Google Ads comparison
3. PPC ROI for law firms
4. Google Ads benchmarks for legal industry
5. Quality Score factors for legal advertisers
Focus on Google data, legal PPC case studies, industry benchmarks 2024-2025.
```

---

### PILLAR-05: Law Firm Web Design (Sub-Pillar)
| Spec | Value |
|------|-------|
| URL | `/guide/law-firm-web-design/` |
| Title | Your Law Firm Website Isn't Converting. Here's Why. |
| Keywords | law firm web design (2,900), lawyer website design (3,600), attorney website design (3,600) |
| Word Count | 4,500-5,500 |
| Schema | Article, FAQPage |
| **Page Type** | Sub-Pillar |
| **Parent** | /guide/law-firm-marketing/ |
| **Intent** | Informational + Commercial Investigation |
| **Funnel Stage** | Awareness → Consideration |
| **Focus** | Conversion-focused web design, cost benchmarks, common mistakes, SEO connection |
| **Links TO** | 3 web design answers (cost, features, mistakes), SEO pillar, lead gen pillar, parent pillar |
| **CTA** | → /services/fractional-cmo/ |

**Perplexity Prompt:**
```
Research law firm web design. Provide cited sources for:
1. Law firm website costs ($3K-$50K ranges)
2. Website conversion rate benchmarks
3. Mobile optimization importance statistics
4. Core Web Vitals requirements
5. Law firm website best practices 2024-2025
Focus on web design industry data, conversion optimization research, Google documentation.
```

---

### PILLAR-06: Law Firm Lead Generation (Sub-Pillar)
| Spec | Value |
|------|-------|
| URL | `/guide/law-firm-lead-generation/` |
| Title | Building a Case Generation System That Runs Without You |
| Keywords | law firm lead generation (210), attorney lead generation (480), legal lead generation (320) |
| Word Count | 4,500-5,500 |
| Schema | Article, FAQPage, HowTo |
| **Page Type** | Sub-Pillar |
| **Parent** | /guide/law-firm-marketing/ |
| **Intent** | Informational + Commercial Investigation |
| **Funnel Stage** | Awareness → Consideration |
| **Focus** | System-building for consistent cases, intake optimization, conversion benchmarks |
| **Links TO** | 4 intake/lead answers, SEO pillar, PPC pillar, web design pillar, parent pillar |
| **CTA** | → /services/fractional-cmo/ |

**Perplexity Prompt:**
```
Research law firm lead/case generation. Provide cited sources for:
1. Speed to lead statistics (5-minute response impact)
2. Law firm conversion rate benchmarks (inquiry to consultation, consultation to retained)
3. Cost per lead by channel for lawyers
4. Intake optimization best practices
5. Lead source quality comparison
Focus on CRM studies, legal marketing research, conversion data 2024-2025.
```

---

### PILLAR-07: Law Firm Marketing Budget (Sub-Pillar)
| Spec | Value |
|------|-------|
| URL | `/guide/law-firm-marketing-budget/` |
| Title | How Much Should Your Law Firm Spend on Marketing? (Real Numbers) |
| Keywords | law firm marketing budget, legal marketing budget, attorney advertising budget |
| Word Count | 4,000-5,000 |
| Schema | Article, FAQPage |
| **Page Type** | Sub-Pillar |
| **Parent** | /guide/law-firm-marketing/ |
| **Intent** | Informational |
| **Funnel Stage** | Awareness → Consideration |
| **Focus** | Real budget numbers, ROI expectations, allocation guidance, leadership investment |
| **Links TO** | 6 budget/ROI answers, all sibling sub-pillars, parent pillar |
| **CTA** | → /services/fractional-cmo/ |

**Perplexity Prompt:**
```
Research law firm marketing budgets. Provide cited sources for:
1. Average law firm marketing spend by revenue size
2. Marketing budget as percentage of revenue (7-12% typical)
3. Budget allocation by channel
4. Marketing ROI expectations by practice area
5. Cost per case benchmarks by practice area
Focus on Clio Legal Trends, ABA surveys, legal marketing industry reports 2024-2025.
```

---

## ANSWERS - FRACTIONAL CMO (8 Total)

| Cluster Info | Value |
|--------------|-------|
| **Cluster** | `fractional-cmo` |
| **Parent Pillar** | /guide/fractional-cmo-law-firms/ |
| **Intent** | Informational |
| **Funnel Stage** | Awareness |
| **CTA** | → /services/fractional-cmo/ |

---

### ANSWER: What Is a Fractional CMO
| Spec | Value |
|------|-------|
| URL | `/answers/what-is-fractional-cmo/` |
| Title | What Is a Fractional CMO? (And Why Law Firms Are Hiring Them) |
| Keywords | what is a fractional cmo (880), fractional cmo meaning, part time cmo (390) |
| Word Count | 1,500-2,000 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research fractional CMO definition and model. Provide cited sources for:
1. Definition of fractional CMO from business literature
2. Fractional executive market growth statistics
3. CMO vs marketing director vs marketing manager comparison (salaries, responsibilities)
4. Typical fractional CMO hours (10-20/month)
5. When the fractional model emerged and why
Focus on business publications, HR research, fractional executive platforms 2024-2025.
```

---

### ANSWER: Fractional CMO Cost
| Spec | Value |
|------|-------|
| URL | `/answers/fractional-cmo-cost/` |
| Title | Fractional CMO Pricing: What to Expect (No Games) |
| Keywords | fractional cmo cost (140), fractional cmo pricing, how much does a fractional cmo cost |
| Word Count | 1,800-2,200 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research fractional CMO costs and pricing. Provide cited sources for:
1. Average fractional CMO monthly retainer ($5K-$15K)
2. Hourly rates for fractional CMOs ($200-$500/hr)
3. Full-time CMO total compensation comparison ($250K-$400K with benefits)
4. Marketing agency retainer comparison
5. ROI studies on fractional executive investment
Focus on compensation surveys, business publications, agency pricing data 2024-2025.
```

---

### ANSWER: Fractional CMO vs Agency
| Spec | Value |
|------|-------|
| URL | `/answers/fractional-cmo-vs-agency/` |
| Title | Fractional CMO vs. Marketing Agency: Which One Actually Delivers? |
| Keywords | fractional cmo vs agency, fractional cmo vs marketing agency, cmo vs agency |
| Word Count | 2,000-2,500 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research fractional CMO vs marketing agency comparison. Provide cited sources for:
1. Marketing agency client churn/turnover rates
2. Why businesses fire marketing agencies (common reasons)
3. Benefits of marketing leadership over vendor management
4. Agency pricing models vs fractional models
5. Strategy vs execution differences
Focus on marketing industry research, agency studies, CMO research 2024-2025.
```

---

### ANSWER: When to Hire Fractional CMO
| Spec | Value |
|------|-------|
| URL | `/answers/when-hire-fractional-cmo/` |
| Title | Signs Your Law Firm Needs Marketing Leadership |
| Keywords | when to hire a fractional cmo (20), do I need a fractional cmo, signs you need a cmo |
| Word Count | 1,800-2,200 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research when to hire a fractional CMO. Provide cited sources for:
1. Revenue stages when companies hire marketing leadership
2. Signs businesses need marketing leadership
3. Cost of poor marketing (waste statistics)
4. Small business marketing leadership benchmarks
5. Fractional executive timing research
Focus on business growth research, marketing leadership studies 2024-2025.
```

---

### ANSWER: Fractional CMO vs Full Time
| Spec | Value |
|------|-------|
| URL | `/answers/fractional-cmo-vs-full-time/` |
| Title | Fractional CMO vs. Full-Time CMO: Which Is Right for Your Firm? |
| Keywords | fractional cmo vs full time, fractional vs full time cmo, part time vs full time cmo |
| Word Count | 1,500-2,000 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research fractional vs full-time CMO comparison. Provide cited sources for:
1. Full-time CMO salary and total compensation
2. CMO recruiting costs and timeline
3. When to hire full-time vs fractional
4. Company size thresholds for full-time CMO
5. Fractional-to-full-time transition examples
Focus on compensation data, hiring research, executive placement data 2024-2025.
```

---

### ANSWER: What Does Fractional CMO Do
| Spec | Value |
|------|-------|
| URL | `/answers/what-does-fractional-cmo-do/` |
| Title | A Day in the Life of a Law Firm's Fractional CMO |
| Keywords | what does a fractional cmo do, fractional cmo responsibilities, fractional cmo duties |
| Word Count | 1,500-2,000 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research fractional CMO responsibilities and activities. Provide cited sources for:
1. CMO job responsibilities and duties
2. Strategic vs tactical marketing leadership
3. Vendor/agency management best practices
4. Marketing team leadership activities
5. CMO reporting and KPI management
Focus on CMO role research, marketing leadership studies 2024-2025.
```

---

### ANSWER: Fractional CMO Hours
| Spec | Value |
|------|-------|
| URL | `/answers/fractional-cmo-hours/` |
| Title | How Fractional CMO Engagements Actually Work |
| Keywords | fractional cmo hours, how many hours fractional cmo, fractional cmo time commitment |
| Word Count | 1,200-1,500 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research fractional CMO time commitments. Provide cited sources for:
1. Typical fractional CMO hours (10-20/month)
2. Engagement models (retainer vs hourly vs project)
3. How fractional executives structure time
4. Minimum engagement recommendations
5. Scaling hours based on needs
Focus on fractional executive platforms, engagement model research 2024-2025.
```

---

### ANSWER: Fractional CMO ROI
| Spec | Value |
|------|-------|
| URL | `/answers/fractional-cmo-roi/` |
| Title | Can You Actually Measure ROI from a Fractional CMO? |
| Keywords | fractional cmo roi, fractional cmo results, fractional cmo value |
| Word Count | 1,500-1,800 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research fractional CMO ROI and results. Provide cited sources for:
1. Marketing leadership impact on business growth
2. ROI metrics for marketing executives
3. Cost savings from fractional vs full-time
4. Marketing efficiency improvements with leadership
5. Case studies of fractional executive ROI
Focus on business performance research, marketing ROI studies 2024-2025.
```

---

## ANSWERS - BUDGET & ROI (6 Total)

| Cluster Info | Value |
|--------------|-------|
| **Cluster** | `budget` |
| **Parent Pillar** | /guide/law-firm-marketing-budget/ |
| **Intent** | Informational + Commercial |
| **Funnel Stage** | Awareness → Consideration |
| **CTA** | → /services/fractional-cmo/ |

---

### ANSWER: Law Firm Marketing Budget
| Spec | Value |
|------|-------|
| URL | `/answers/law-firm-marketing-budget/` |
| Title | Marketing Budget Reality Check: What Law Firms Actually Spend |
| Keywords | law firm marketing budget, how much should law firm spend marketing, legal marketing spend |
| Word Count | 1,500-1,800 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research law firm marketing budgets. Provide cited sources for:
1. Law firm marketing spend by revenue size
2. Industry benchmarks (7-12% of revenue)
3. Budget allocation recommendations
4. Solo vs small firm vs midsize firm budgets
5. Marketing spend trends in legal industry
Focus on Clio Legal Trends, ABA data, legal marketing surveys 2024-2025.
```

---

### ANSWER: Legal Marketing ROI
| Spec | Value |
|------|-------|
| URL | `/answers/legal-marketing-roi/` |
| Title | What's a Realistic Marketing ROI for Law Firms? |
| Keywords | legal marketing roi, law firm marketing roi, attorney marketing return |
| Word Count | 1,500-1,800 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research law firm marketing ROI. Provide cited sources for:
1. Marketing ROI benchmarks for professional services
2. ROI by channel (SEO, PPC, referrals)
3. ROI calculation methods for law firms
4. Case value impact on ROI
5. Timeline for marketing ROI
Focus on legal marketing research, professional services ROI data 2024-2025.
```

---

### ANSWER: Cost Per Case
| Spec | Value |
|------|-------|
| URL | `/answers/cost-per-case/` |
| Title | Cost Per Case: Real Benchmarks by Practice Area |
| Keywords | cost per case law firm, cost per client acquisition lawyer, cpa legal |
| Word Count | 1,500-1,800 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research law firm cost per case/acquisition. Provide cited sources for:
1. Cost per case by practice area (PI, family, immigration, etc.)
2. Cost per lead vs cost per case difference
3. Conversion rates affecting cost per case
4. Benchmarks for good vs bad cost per case
5. How to calculate and track cost per case
Focus on legal marketing data, CRM studies, practice management research 2024-2025.
```

---

### ANSWER: Lawyer Advertising Spend
| Spec | Value |
|------|-------|
| URL | `/answers/lawyer-advertising-spend/` |
| Title | Lawyer Advertising Spend: How You Compare |
| Keywords | lawyer advertising spend, attorney advertising budget, how much lawyers spend advertising |
| Word Count | 1,200-1,500 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research lawyer advertising spending. Provide cited sources for:
1. Average lawyer/law firm advertising spend
2. Legal industry total advertising spend
3. Comparison to other professional services
4. Advertising spend by practice area
5. Advertising trends in legal industry
Focus on advertising industry data, legal marketing reports 2024-2025.
```

---

### ANSWER: Marketing Percentage Revenue
| Spec | Value |
|------|-------|
| URL | `/answers/marketing-percentage-revenue/` |
| Title | What Percentage of Revenue Should Law Firms Spend on Marketing? |
| Keywords | marketing percentage revenue law firm, law firm marketing spend percentage |
| Word Count | 1,200-1,500 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research marketing spend as percentage of revenue. Provide cited sources for:
1. Industry benchmarks (7-12% for professional services)
2. Growth mode vs maintenance mode differences
3. How firm size affects percentage
4. Comparison across industries
5. Optimal percentage by growth goals
Focus on marketing spend research, industry benchmarks 2024-2025.
```

---

### ANSWER: Marketing Budget by Practice
| Spec | Value |
|------|-------|
| URL | `/answers/marketing-budget-by-practice/` |
| Title | Marketing Budget Benchmarks by Practice Area |
| Keywords | marketing budget by practice area, PI marketing budget, family law marketing budget |
| Word Count | 1,500-1,800 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research marketing budgets by legal practice area. Provide cited sources for:
1. Personal injury marketing budgets and costs
2. Family law marketing budgets
3. Immigration law marketing costs
4. Criminal defense marketing spend
5. Competition levels by practice area
Focus on legal marketing data by practice area 2024-2025.
```

---

## ANSWERS - SEO (5 Total)

| Cluster Info | Value |
|--------------|-------|
| **Cluster** | `seo` |
| **Parent Pillar** | /guide/law-firm-seo/ |
| **Intent** | Informational + Commercial |
| **Funnel Stage** | Awareness → Consideration |
| **CTA** | → /services/fractional-cmo/ |

---

### ANSWER: Law Firm SEO Cost
| Spec | Value |
|------|-------|
| URL | `/answers/law-firm-seo-cost/` |
| Title | Law Firm SEO Pricing: What You're Really Paying For |
| Keywords | law firm seo cost, how much does seo cost lawyers, attorney seo pricing |
| Word Count | 1,500-1,800 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research law firm SEO costs. Provide cited sources for:
1. SEO pricing tiers ($1K-$10K+ ranges)
2. What's included at each price point
3. Factors affecting SEO pricing
4. Agency vs freelancer pricing
5. Red flags in SEO pricing
Focus on SEO industry pricing data, legal marketing costs 2024-2025.
```

---

### ANSWER: Is SEO Worth It Lawyers
| Spec | Value |
|------|-------|
| URL | `/answers/is-seo-worth-it-lawyers/` |
| Title | Is SEO Worth It? An Honest Answer for Law Firms |
| Keywords | is seo worth it lawyers, should law firms do seo, law firm seo value |
| Word Count | 1,800-2,200 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research whether SEO is worth it for law firms. Provide cited sources for:
1. SEO ROI for professional services
2. When SEO works well (market conditions)
3. When SEO is a poor investment
4. SEO vs PPC ROI comparison
5. Case studies of law firm SEO success/failure
Focus on SEO ROI research, legal marketing case studies 2024-2025.
```

---

### ANSWER: How Long SEO Results
| Spec | Value |
|------|-------|
| URL | `/answers/how-long-seo-results/` |
| Title | SEO Timeline for Law Firms: What's Realistic |
| Keywords | how long does seo take lawyers, law firm seo timeline, when see seo results |
| Word Count | 1,200-1,500 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research SEO timeline for results. Provide cited sources for:
1. Average time to rank for competitive terms
2. Local SEO timeline vs organic
3. Factors affecting SEO speed
4. Month-by-month expectations
5. Case studies showing timelines
Focus on SEO industry data, ranking studies 2024-2025.
```

---

### ANSWER: Local SEO Lawyers
| Spec | Value |
|------|-------|
| URL | `/answers/local-seo-lawyers/` |
| Title | Local SEO for Lawyers: The Only Things That Matter |
| Keywords | local seo lawyers, attorney local seo, google business profile lawyers |
| Word Count | 1,500-1,800 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research local SEO for lawyers. Provide cited sources for:
1. Google Business Profile ranking factors
2. Local pack ranking factors
3. Review impact on local rankings
4. Citation importance and sources
5. Local SEO best practices 2024-2025
Focus on local SEO research, Google documentation, legal local SEO data.
```

---

### ANSWER: SEO vs PPC Lawyers
| Spec | Value |
|------|-------|
| URL | `/answers/seo-vs-ppc-lawyers/` |
| Title | SEO vs. PPC: Where Should Your Law Firm Invest? |
| Keywords | seo vs ppc lawyers, should lawyers do seo or ppc, attorney seo vs google ads |
| Word Count | 1,800-2,200 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research SEO vs PPC for law firms. Provide cited sources for:
1. SEO vs PPC cost comparison for legal
2. Click-through rates organic vs paid
3. Long-term value comparison
4. When to choose each channel
5. How SEO and PPC work together
Focus on search marketing research, legal marketing data 2024-2025.
```

---

## ANSWERS - PPC (4 Total)

| Cluster Info | Value |
|--------------|-------|
| **Cluster** | `ppc` |
| **Parent Pillar** | /guide/law-firm-ppc/ |
| **Intent** | Commercial Investigation |
| **Funnel Stage** | Consideration |
| **CTA** | → /services/fractional-cmo/ |

---

### ANSWER: Law Firm PPC Cost
| Spec | Value |
|------|-------|
| URL | `/answers/law-firm-ppc-cost/` |
| Title | Law Firm PPC Costs: What to Actually Budget |
| Keywords | law firm ppc cost, google ads cost lawyers, attorney ppc budget |
| Word Count | 1,500-1,800 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research law firm PPC costs. Provide cited sources for:
1. Average CPC by practice area
2. Monthly budget minimums by market
3. Management fees (agency percentages)
4. LSA costs vs traditional PPC
5. Hidden costs in PPC
Focus on Google Ads data, legal PPC benchmarks 2024-2025.
```

---

### ANSWER: Lawyer CPC Rates
| Spec | Value |
|------|-------|
| URL | `/answers/lawyer-cpc-rates/` |
| Title | Lawyer CPC Rates: What You'll Pay Per Click |
| Keywords | lawyer cpc rates, attorney cost per click, legal keyword cpc |
| Word Count | 1,200-1,500 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research lawyer CPC rates. Provide cited sources for:
1. Average CPC by practice area (detailed breakdown)
2. Most expensive legal keywords
3. Geographic variations in CPC
4. CPC trends over time
5. Factors affecting your CPC
Focus on Google Ads keyword data, PPC industry reports 2024-2025.
```

---

### ANSWER: LSA vs Google Ads
| Spec | Value |
|------|-------|
| URL | `/answers/lsa-vs-google-ads/` |
| Title | Local Service Ads vs. Google Ads: Which Is Better for Lawyers? |
| Keywords | lsa vs google ads lawyers, local service ads attorneys, google screened lawyers |
| Word Count | 1,500-1,800 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research LSAs vs Google Ads for lawyers. Provide cited sources for:
1. LSA pricing model (per lead)
2. Google Screened requirements
3. LSA vs search ads performance
4. When to use each (or both)
5. LSA eligibility and setup
Focus on Google LSA documentation, legal marketing LSA data 2024-2025.
```

---

### ANSWER: Google Ads Worth It
| Spec | Value |
|------|-------|
| URL | `/answers/google-ads-worth-it/` |
| Title | Are Google Ads Worth It for Law Firms? |
| Keywords | google ads worth it lawyers, should attorneys use google ads, law firm google ads roi |
| Word Count | 1,500-1,800 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research whether Google Ads is worth it for law firms. Provide cited sources for:
1. Google Ads ROI for legal industry
2. Cost per case from PPC by practice area
3. When PPC makes sense vs doesn't
4. Success factors for legal PPC
5. Case studies of law firm PPC
Focus on legal PPC ROI data, case studies 2024-2025.
```

---

## ANSWERS - LEAD GEN & INTAKE (4 Total)

| Cluster Info | Value |
|--------------|-------|
| **Cluster** | `lead-gen` |
| **Parent Pillar** | /guide/law-firm-lead-generation/ |
| **Intent** | Informational + Problem-Aware |
| **Funnel Stage** | Awareness |
| **CTA** | → /services/fractional-cmo/ |

---

### ANSWER: Law Firm Intake Best Practices
| Spec | Value |
|------|-------|
| URL | `/answers/law-firm-intake-best-practices/` |
| Title | Intake Best Practices: Stop Losing Cases at the Front Door |
| Keywords | law firm intake best practices, legal intake process, attorney intake optimization |
| Word Count | 1,800-2,200 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research law firm intake best practices. Provide cited sources for:
1. Speed to lead impact on conversion
2. Phone vs form vs chat preferences
3. Intake script best practices
4. After-hours intake handling
5. CRM and intake software options
Focus on legal intake research, CRM studies, conversion data 2024-2025.
```

---

### ANSWER: Why Losing Leads
| Spec | Value |
|------|-------|
| URL | `/answers/why-losing-leads/` |
| Title | Why Your Law Firm Is Losing Cases (It's Probably Intake) |
| Keywords | why law firm losing leads, attorney lead loss, law firm intake problems |
| Word Count | 1,500-1,800 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research why law firms lose leads. Provide cited sources for:
1. Common lead loss reasons
2. Response time impact statistics
3. Intake failure rates
4. Website conversion barriers
5. Follow-up failure data
Focus on lead management research, legal intake studies 2024-2025.
```

---

### ANSWER: Lead Response Time
| Spec | Value |
|------|-------|
| URL | `/answers/lead-response-time/` |
| Title | Lead Response Time: The Number That's Costing You Cases |
| Keywords | law firm lead response time, attorney speed to lead, how fast respond leads |
| Word Count | 1,200-1,500 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research lead response time importance. Provide cited sources for:
1. Speed to lead statistics (5-minute rule)
2. Response time impact on conversion rates
3. Optimal response time by channel
4. After-hours response strategies
5. Automation options for faster response
Focus on lead response research, conversion studies 2024-2025.
```

---

### ANSWER: Intake Conversion Rate
| Spec | Value |
|------|-------|
| URL | `/answers/intake-conversion-rate/` |
| Title | Intake Conversion Benchmarks: How Does Your Firm Compare? |
| Keywords | law firm intake conversion rate, attorney consultation conversion, legal intake benchmarks |
| Word Count | 1,200-1,500 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research law firm intake conversion rates. Provide cited sources for:
1. Inquiry to consultation benchmarks
2. Consultation to retained benchmarks
3. Conversion rates by practice area
4. Factors affecting conversion
5. How to improve conversion rates
Focus on legal industry conversion data, intake research 2024-2025.
```

---

## ANSWERS - AGENCY SELECTION (4 Total)

| Cluster Info | Value |
|--------------|-------|
| **Cluster** | `agency` |
| **Parent Pillar** | /guide/law-firm-marketing/ |
| **Intent** | Problem-Aware |
| **Funnel Stage** | Consideration |
| **CTA** | → /services/fractional-cmo/ |

---

### ANSWER: How Choose Marketing Agency
| Spec | Value |
|------|-------|
| URL | `/answers/how-choose-marketing-agency/` |
| Title | How to Choose a Marketing Agency (Without Getting Burned) |
| Keywords | how choose law firm marketing agency, select legal marketing agency, hire attorney marketing |
| Word Count | 1,800-2,200 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research how to choose a marketing agency for law firms. Provide cited sources for:
1. Questions to ask marketing agencies
2. Red flags when hiring agencies
3. Legal industry experience importance
4. Contract terms to negotiate
5. How to evaluate agency performance
Focus on agency selection research, legal marketing industry data 2024-2025.
```

---

### ANSWER: Marketing Agency Red Flags
| Spec | Value |
|------|-------|
| URL | `/answers/marketing-agency-red-flags/` |
| Title | Marketing Agency Red Flags I've Seen Too Many Times |
| Keywords | marketing agency red flags, bad marketing agency signs, legal marketing agency problems |
| Word Count | 1,500-1,800 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research marketing agency red flags. Provide cited sources for:
1. Common agency warning signs
2. Contract red flags
3. Reporting/transparency issues
4. Unrealistic promises
5. Agency churn statistics
Focus on agency industry research, client satisfaction data 2024-2025.
```

---

### ANSWER: Signs Agency Not Working
| Spec | Value |
|------|-------|
| URL | `/answers/signs-agency-not-working/` |
| Title | Is Your Marketing Agency Actually Working? Here's How to Tell |
| Keywords | signs marketing agency not working, is my agency working, evaluate marketing agency |
| Word Count | 1,500-1,800 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research signs a marketing agency isn't working. Provide cited sources for:
1. Performance indicators to track
2. Reasonable expectations by channel
3. Communication/reporting standards
4. When to give more time vs fire
5. How to have the conversation
Focus on agency performance research, marketing metrics 2024-2025.
```

---

### ANSWER: How Fire Marketing Agency
| Spec | Value |
|------|-------|
| URL | `/answers/how-fire-marketing-agency/` |
| Title | How to Fire Your Marketing Agency Without Blowing Up Your Marketing |
| Keywords | how fire marketing agency, leave marketing agency, transition marketing agency |
| Word Count | 1,500-1,800 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research how to fire a marketing agency properly. Provide cited sources for:
1. Transition best practices
2. Data/asset ownership issues
3. Contract termination considerations
4. Timeline for transitions
5. Maintaining marketing during transition
Focus on agency transition research, contract best practices 2024-2025.
```

---

## ANSWERS - WEB DESIGN (3 Total)

| Cluster Info | Value |
|--------------|-------|
| **Cluster** | `web-design` |
| **Parent Pillar** | /guide/law-firm-web-design/ |
| **Intent** | Commercial Investigation |
| **Funnel Stage** | Consideration |
| **CTA** | → /services/fractional-cmo/ |

---

### ANSWER: Law Firm Website Cost
| Spec | Value |
|------|-------|
| URL | `/answers/law-firm-website-cost/` |
| Title | Law Firm Website Cost: What You Should Actually Pay |
| Keywords | law firm website cost, how much attorney website, lawyer website price |
| Word Count | 1,500-1,800 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research law firm website costs. Provide cited sources for:
1. Website pricing tiers (DIY to custom)
2. What's included at each price point
3. Ongoing maintenance costs
4. Hidden costs to watch for
5. When to invest more vs less
Focus on web design pricing data, legal website research 2024-2025.
```

---

### ANSWER: Law Firm Website Features
| Spec | Value |
|------|-------|
| URL | `/answers/law-firm-website-features/` |
| Title | Law Firm Website Features: What You Actually Need |
| Keywords | law firm website features, attorney website must haves, lawyer website essentials |
| Word Count | 1,500-1,800 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research essential law firm website features. Provide cited sources for:
1. Must-have features for conversions
2. Mobile optimization requirements
3. Contact options (phone, form, chat)
4. Trust signals that matter
5. Features that don't matter
Focus on website conversion research, legal website best practices 2024-2025.
```

---

### ANSWER: Law Firm Website Mistakes
| Spec | Value |
|------|-------|
| URL | `/answers/law-firm-website-mistakes/` |
| Title | Law Firm Website Mistakes That Kill Conversions |
| Keywords | law firm website mistakes, attorney website problems, lawyer website errors |
| Word Count | 1,500-1,800 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research common law firm website mistakes. Provide cited sources for:
1. Conversion-killing mistakes
2. UX/design problems
3. Technical issues (speed, mobile)
4. Content mistakes
5. How to identify and fix issues
Focus on website UX research, conversion optimization data 2024-2025.
```

---

## ANSWERS - PRACTICE-SPECIFIC (7 Total)

| Cluster Info | Value |
|--------------|-------|
| **Cluster** | `practice-specific` |
| **Parent Pillar** | /guide/law-firm-marketing/ |
| **Intent** | Commercial Investigation |
| **Funnel Stage** | Consideration |
| **CTA** | → /services/fractional-cmo-[practice]/ |

---

### ANSWER: Personal Injury Marketing
| Spec | Value |
|------|-------|
| URL | `/answers/personal-injury-marketing/` |
| Title | Personal Injury Marketing: What's Working in 2026 |
| Keywords | personal injury marketing, pi lawyer marketing, personal injury attorney advertising |
| Word Count | 2,000-2,500 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research personal injury lawyer marketing. Provide cited sources for:
1. Most effective PI marketing channels
2. PI keyword costs and competition
3. Mass tort marketing integration
4. LSA performance for PI
5. PI marketing budget benchmarks
Focus on personal injury marketing data, legal advertising research 2024-2025.
```

---

### ANSWER: Family Law Marketing
| Spec | Value |
|------|-------|
| URL | `/answers/family-law-marketing/` |
| Title | Family Law Marketing: Building Trust in a Sensitive Practice |
| Keywords | family law marketing, divorce lawyer marketing, family attorney advertising |
| Word Count | 1,800-2,200 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research family law marketing. Provide cited sources for:
1. Family law marketing channels
2. Sensitive messaging approaches
3. Local SEO importance for family law
4. Reputation management
5. Family law marketing budgets
Focus on family law marketing research 2024-2025.
```

---

### ANSWER: Immigration Marketing
| Spec | Value |
|------|-------|
| URL | `/answers/immigration-marketing/` |
| Title | Immigration Lawyer Marketing: Reaching Families Who Need Help |
| Keywords | immigration lawyer marketing, immigration attorney advertising, inmigration abogado marketing |
| Word Count | 1,800-2,200 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research immigration lawyer marketing. Provide cited sources for:
1. Multi-language marketing strategies
2. Community marketing approaches
3. Immigration keyword data
4. Trust-building for immigration
5. Immigration marketing budgets
Focus on immigration law marketing research 2024-2025.
```

---

### ANSWER: Criminal Defense Marketing
| Spec | Value |
|------|-------|
| URL | `/answers/criminal-defense-marketing/` |
| Title | Criminal Defense Marketing: Reaching Clients in Crisis |
| Keywords | criminal defense marketing, criminal lawyer advertising, defense attorney marketing |
| Word Count | 1,800-2,200 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research criminal defense marketing. Provide cited sources for:
1. Urgent search behavior patterns
2. Criminal defense PPC strategies
3. After-hours marketing importance
4. Reputation considerations
5. Criminal defense marketing budgets
Focus on criminal defense marketing research 2024-2025.
```

---

### ANSWER: Estate Planning Marketing
| Spec | Value |
|------|-------|
| URL | `/answers/estate-planning-marketing/` |
| Title | Estate Planning Marketing: Educate First, Convert Later |
| Keywords | estate planning marketing, estate attorney advertising, wills trusts lawyer marketing |
| Word Count | 1,800-2,200 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research estate planning marketing. Provide cited sources for:
1. Educational content strategies
2. Estate planning client demographics
3. Seminar/workshop marketing
4. Referral relationship building
5. Estate planning marketing budgets
Focus on estate planning marketing research 2024-2025.
```

---

### ANSWER: Bankruptcy Marketing
| Spec | Value |
|------|-------|
| URL | `/answers/bankruptcy-marketing/` |
| Title | Bankruptcy Lawyer Marketing: Helping Clients Find Relief |
| Keywords | bankruptcy lawyer marketing, bankruptcy attorney advertising, debt lawyer marketing |
| Word Count | 1,500-1,800 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research bankruptcy lawyer marketing. Provide cited sources for:
1. Bankruptcy marketing channels
2. Economic cycle impacts
3. PPC for bankruptcy lawyers
4. Empathetic messaging approaches
5. Bankruptcy marketing budgets
Focus on bankruptcy marketing research 2024-2025.
```

---

### ANSWER: Mass Tort Marketing
| Spec | Value |
|------|-------|
| URL | `/answers/mass-tort-marketing/` |
| Title | Mass Tort Marketing: Building Case Inventory at Scale |
| Keywords | mass tort marketing, mass tort advertising, mass tort lead generation |
| Word Count | 1,800-2,200 |
| Schema | Article, FAQPage |

**Perplexity Prompt:**
```
Research mass tort marketing. Provide cited sources for:
1. Mass tort marketing channels
2. Lead generation at scale
3. Cost per signed case mass tort
4. TV vs digital mass tort
5. Mass tort marketing budgets
Focus on mass tort marketing research 2024-2025.
```

---

## SERVICES (8 Total)

| Collection Info | Value |
|-----------------|-------|
| **CMS Collection** | `services` |
| **Intent** | Transactional |
| **Funnel Stage** | Decision |
| **Links FROM** | All pillars and answers |

---

### SERVICE: Fractional CMO (Main)
| Spec | Value |
|------|-------|
| URL | `/services/fractional-cmo/` |
| Title | Fractional CMO Services: Marketing Leadership for Law Firms |
| Keywords | fractional cmo services, hire fractional cmo, law firm fractional cmo |
| Word Count | 2,500-3,000 |
| Schema | Service, FAQPage |

**Content Focus:** Service page with pricing, what's included, process, results, CTA

---

### SERVICE: Fractional CMO Personal Injury
| Spec | Value |
|------|-------|
| URL | `/services/fractional-cmo-personal-injury/` |
| Title | Fractional CMO for PI Firms: Dominate Your Market |
| Keywords | fractional cmo personal injury, pi firm marketing leadership |
| Word Count | 1,500-2,000 |
| Schema | Service |

**Content Focus:** PI-specific marketing challenges, approach, results

---

### SERVICE: Fractional CMO Family Law
| Spec | Value |
|------|-------|
| URL | `/services/fractional-cmo-family-law/` |
| Title | Fractional CMO for Family Law: Grow with Integrity |
| Keywords | fractional cmo family law, family law marketing leadership |
| Word Count | 1,500-2,000 |
| Schema | Service |

**Content Focus:** Family law marketing approach, sensitivity, local focus

---

### SERVICE: Fractional CMO Immigration
| Spec | Value |
|------|-------|
| URL | `/services/fractional-cmo-immigration/` |
| Title | Fractional CMO for Immigration: Reach More Families |
| Keywords | fractional cmo immigration, immigration lawyer marketing leadership |
| Word Count | 1,500-2,000 |
| Schema | Service |

**Content Focus:** Immigration marketing approach, multi-language, community

---

### SERVICE: Fractional CMO Criminal Defense
| Spec | Value |
|------|-------|
| URL | `/services/fractional-cmo-criminal-defense/` |
| Title | Fractional CMO for Criminal Defense: Build Your Reputation |
| Keywords | fractional cmo criminal defense, criminal defense marketing leadership |
| Word Count | 1,500-2,000 |
| Schema | Service |

**Content Focus:** Criminal defense marketing approach, urgency, reputation

---

### SERVICE: Fractional CMO Estate Planning
| Spec | Value |
|------|-------|
| URL | `/services/fractional-cmo-estate-planning/` |
| Title | Fractional CMO for Estate Planning: Educate and Convert |
| Keywords | fractional cmo estate planning, estate planning marketing leadership |
| Word Count | 1,500-2,000 |
| Schema | Service |

**Content Focus:** Estate planning marketing approach, education, referrals

---

### SERVICE: Fractional CMO Bankruptcy
| Spec | Value |
|------|-------|
| URL | `/services/fractional-cmo-bankruptcy/` |
| Title | Fractional CMO for Bankruptcy: Reach Clients in Crisis |
| Keywords | fractional cmo bankruptcy, bankruptcy lawyer marketing leadership |
| Word Count | 1,500-2,000 |
| Schema | Service |

**Content Focus:** Bankruptcy marketing approach, empathy, cycles

---

### SERVICE: Fractional CMO Mass Tort
| Spec | Value |
|------|-------|
| URL | `/services/fractional-cmo-mass-tort/` |
| Title | Fractional CMO for Mass Tort: Scale Your Inventory |
| Keywords | fractional cmo mass tort, mass tort marketing leadership |
| Word Count | 1,500-2,000 |
| Schema | Service |

**Content Focus:** Mass tort marketing approach, scale, integration

---

## BLOG POSTS (12 Total) - OPTIONAL

| Collection Info | Value |
|-----------------|-------|
| **CMS Collection** | `blog` (existing) |
| **Intent** | Informational / Thought Leadership |
| **Funnel Stage** | Awareness |
| **Priority** | OPTIONAL - create as capacity allows |
| **Links TO** | Relevant pillars and service pages |

> These are suggested thought leadership posts. Create as needed for content marketing.
> Not required for core SEO strategy. Add to existing blog CMS when ready.

---

### BLOG: Why Marketing Agencies Fail Law Firms
| Spec | Value |
|------|-------|
| URL | `/blog/why-marketing-agencies-fail-law-firms/` |
| Title | Why Most Marketing Agencies Fail Law Firms (I've Seen It Hundreds of Times) |
| Keywords | why marketing agencies fail law firms, legal marketing agency problems |
| Word Count | 1,500-2,000 |
| Schema | Article |

**Perplexity Prompt:**
```
Research why marketing agencies fail law firm clients. Provide sources on agency-client relationship problems, misaligned incentives, legal industry complexity, common agency failures 2024-2025.
```

---

### BLOG: I Fired My Marketing Agency
| Spec | Value |
|------|-------|
| URL | `/blog/i-fired-my-marketing-agency/` |
| Title | What Happens When You Fire Your Marketing Agency |
| Keywords | fired marketing agency, left marketing agency, changing marketing agency |
| Word Count | 1,500-2,000 |
| Schema | Article |

---

### BLOG: Real Cost No Marketing Leadership
| Spec | Value |
|------|-------|
| URL | `/blog/real-cost-no-marketing-leadership/` |
| Title | The Hidden Cost of Running Marketing Without a CMO |
| Keywords | cost no marketing leadership, marketing without cmo |
| Word Count | 1,500-2,000 |
| Schema | Article |

---

### BLOG: DIY Marketing vs Outsourcing
| Spec | Value |
|------|-------|
| URL | `/blog/diy-marketing-vs-outsourcing/` |
| Title | DIY vs. Outsourced Marketing: An Honest Comparison |
| Keywords | diy marketing vs outsourcing, in house vs agency marketing |
| Word Count | 1,500-2,000 |
| Schema | Article |

---

### BLOG: What to Do Marketing Not Working
| Spec | Value |
|------|-------|
| URL | `/blog/what-to-do-marketing-not-working/` |
| Title | Your Marketing Isn't Working. Now What? |
| Keywords | marketing not working, fix marketing problems |
| Word Count | 1,500-2,000 |
| Schema | Article |

---

### BLOG: How I Wasted 50K Bad Marketing
| Spec | Value |
|------|-------|
| URL | `/blog/how-i-wasted-50k-bad-marketing/` |
| Title | How Law Firms Waste $50K+ on Marketing (And How to Stop) |
| Keywords | wasted marketing budget, marketing money wasted |
| Word Count | 1,500-2,000 |
| Schema | Article |

---

### BLOG: SEO Terrible Idea Small Firm Big City
| Spec | Value |
|------|-------|
| URL | `/blog/seo-terrible-idea-small-firm-big-city/` |
| Title | SEO in Competitive Markets: Is It Worth It for Small Firms? |
| Keywords | seo small firm big city, seo competitive market |
| Word Count | 1,500-2,000 |
| Schema | Article |

---

### BLOG: PPC for Lawyers Honest Review
| Spec | Value |
|------|-------|
| URL | `/blog/ppc-for-lawyers-honest-review/` |
| Title | Google Ads for Lawyers: An Honest Review |
| Keywords | ppc lawyers review, google ads lawyers honest |
| Word Count | 1,500-2,000 |
| Schema | Article |

---

### BLOG: Why Law Firm Website Not Converting
| Spec | Value |
|------|-------|
| URL | `/blog/why-your-law-firm-website-not-converting/` |
| Title | Why Your Law Firm Website Isn't Converting (And How to Fix It) |
| Keywords | law firm website not converting, attorney website no leads |
| Word Count | 1,500-2,000 |
| Schema | Article |

---

### BLOG: Intake Killing Marketing ROI
| Spec | Value |
|------|-------|
| URL | `/blog/intake-killing-your-marketing-roi/` |
| Title | The Intake Problem No One Talks About |
| Keywords | intake killing roi, law firm intake problems |
| Word Count | 1,500-2,000 |
| Schema | Article |

---

### BLOG: Lead Follow Up System Law Firms
| Spec | Value |
|------|-------|
| URL | `/blog/lead-follow-up-system-law-firms/` |
| Title | The Lead Follow-Up System Every Law Firm Needs |
| Keywords | law firm lead follow up, attorney lead system |
| Word Count | 1,500-2,000 |
| Schema | Article |

---

### BLOG: Solo Lawyer Marketing Reality Check
| Spec | Value |
|------|-------|
| URL | `/blog/solo-lawyer-marketing-reality-check/` |
| Title | The Solo Lawyer's Marketing Reality Check |
| Keywords | solo lawyer marketing, solo attorney marketing |
| Word Count | 1,500-2,000 |
| Schema | Article |

---

## SUMMARY

### Core Content (Priority)
| Content Type | Count | Location | CMS |
|--------------|-------|----------|-----|
| Pillars | 7 | `/guide/` | Static pages |
| Answers | 41 | `/answers/` | Framer CMS |
| Services | 8 | `/services/` | Static pages |
| **CORE TOTAL** | **56** | | |

### Optional Content (When Ready)
| Content Type | Count | Location | CMS |
|--------------|-------|----------|-----|
| Blog Posts | 12 | `/blog/` | Existing blog |

---

## Production Order Recommendation

1. **Phase 1:** Pillar pages (7) - Foundation content
2. **Phase 2:** Core Answers (41) - CMS bulk production
3. **Phase 3:** Service pages (8) - Conversion pages
4. **Phase 4:** Blog posts (12) - Optional thought leadership

---

*Master Specs Version: 1.1*
*Updated: 2026-01-17*
*Use with: BRAND_VOICE_STYLE_GUIDE.md, SITEMAP_ARCHITECTURE.md*
