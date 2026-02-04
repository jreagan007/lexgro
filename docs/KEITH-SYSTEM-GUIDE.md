# LEXGRO System Guide for Keith

**For Sales Calls and Client Conversations**
**Last Updated:** February 3, 2026

---

## Executive Summary (Read This First)

**What We Sell:** Research-backed, editorially-audited content and full-funnel marketing for law firms.

**How We're Different:**
1. **Data, not guesswork.** Proprietary research systems, social sentiment analysis, SEO intelligence.
2. **Quality at scale.** Automated auditing catches AI tells, cliches, and errors.
3. **Enterprise visual brand.** 35mm documentary photography, not stock photos.
4. **Technical foundation.** Zero broken links, proper schema, programmatic SEO.
5. **Full funnel.** CTV to social to search to conversion, all aligned.

**What To Say:**
- "Research-backed editorial" (not AI-generated)
- "Data-driven strategy" (not guessing)
- "Enterprise-level visual brand" (not templates)
- "Full-funnel approach" (not just SEO)

**What NOT To Say:**
- Never mention AI, ChatGPT, or automation to clients
- Never guess pricing (refer to Taqtics)
- Never promise rankings or timelines

---

## Quick Reference: What We Actually Do

| What Clients Hear | What It Means |
|-------------------|---------------|
| "Data-backed content strategy" | Proprietary research system with citation tracking |
| "Competitive intelligence" | Parallel web intelligence platform |
| "Editorial quality at scale" | Automated quality auditing + style enforcement |
| "Visual content system" | Documentary-grade image generation |
| "Technical SEO suite" | Internal link validation, schema generation |
| "News monitoring" | Real-time news intelligence with scoring |
| "Social automation" | Multi-platform content distribution |

**Key Principle:** We never say "AI-generated content." We say "research-backed editorial" and "data-driven strategy." We never name vendor tools. We describe capabilities.

---

## Capability Deep Dives: Us vs Them

### 1. Content Research

| Feature | Typical Agency | LEXGRO/Taqtics |
|---------|---------------|----------------|
| Research method | Writer Googles for 20 min | Proprietary research system with citations |
| Fact verification | Trust the writer | Primary source validation |
| Current data | Knowledge cutoff issues | Real-time intelligence feeds |
| Citation format | "According to studies..." | Numbered references with URLs |

**Technical Details:**
- Every research query returns with source citations
- Stats verified against primary sources (CDC, NIH, court records)
- Research is documented and reproducible
- No hallucinated statistics. Everything traceable.

**Sales Point:** "Every stat in your content has a source. We don't make things up."

---

### 2. Content Auditing

| Feature | Typical Agency | LEXGRO/Taqtics |
|---------|---------------|----------------|
| Quality check | Editor reads it | Automated 15-point audit |
| AI detection | Hope nobody notices | Active phrase banning |
| Style consistency | Style guide (maybe) | Programmatic enforcement |
| Turnaround | Manual review queue | Instant automated feedback |

**Technical Details:**
- 60-character title limit (Google truncation)
- 160-character description limit (SERP display)
- Flesch score 50-60 (accessibility)
- Passive voice under 20 percent
- Banned phrase detection (50+ patterns)
- Auto-fix for common issues

**What Gets Auto-Fixed:**
- `%` → `percent` (or vice versa per project)
- Em-dashes → periods
- `utilize` → `use`
- `leverage your` → `use your`
- `in order to` → `to`
- Decade formatting (`1990's` → `1990s`)

**Sales Point:** "Our system catches the issues that make content sound generic or machine-made."

---

### 3. Internal Link Validation

| Feature | Typical Agency | LEXGRO/Taqtics |
|---------|---------------|----------------|
| Link checking | Manual spot checks | Pre-deploy full scan |
| Broken link detection | Find out from GSC | Caught before publish |
| Dynamic routes | Not supported | Full pattern matching |
| Coverage | Random sampling | Every link, every page |

**Technical Details:**
- Scans all MDX content and Astro pages
- Validates against static pages, article slugs, public files
- Supports dynamic route patterns (news dates, lawyer cities, etc.)
- Groups broken links by target for efficient fixing
- Runs automatically before every deploy

**What It Catches:**
- Links to deleted pages
- Typos in URLs (`/serivces/` instead of `/services/`)
- Links to unpublished drafts
- Missing trailing slashes
- Orphaned dynamic routes

**Sales Point:** "Zero broken links. We validate every internal link before anything goes live."

---

### 4. News Monitoring and Story Scoring

| Feature | Typical Agency | LEXGRO/Taqtics |
|---------|---------------|----------------|
| News source | Google Alerts | Proprietary news intelligence system |
| Story selection | Editor's gut feel | 0-100 algorithmic scoring |
| Coverage decision | Meeting discussion | Auto-publish at threshold |
| Duplicate detection | Hope we remember | Indexed coverage history |

**Technical Details:**
- News intelligence pulls from multiple sources daily
- Five scoring dimensions (25 points each):
  - News Value: Is this actually newsworthy?
  - Discover Potential: Will Google surface this?
  - Audience Relevance: Does our audience care?
  - Timeliness: How fresh is it?
  - Uniqueness: Are competitors already on it?
- Stories scoring 70 or higher auto-draft
- Covered stories indexed to prevent duplicates
- Source filtering (blocks law firms, competitors)

**Sales Point:** "We don't miss stories and we don't waste time on low-value coverage."

---

### 5. Image Generation

| Feature | Typical Agency | LEXGRO/Taqtics |
|---------|---------------|----------------|
| Card images | Stock photos | Proprietary generation, unique per article |
| OG images | Template with text | Documentary photography style |
| Consistency | Depends on designer | Programmatic style enforcement |
| Turnaround | Designer queue | Generated in content pipeline |

**Technical Details:**
- Proprietary visual generation system
- Card images: 800x450px for blog/social previews
- OG images: 1200x630px for link sharing
- Documentary photography aesthetic (35mm film grain, muted tones)
- No text, people, or faces in images
- Unique visual direction per article prevents duplicates

**Film Stock References:**
- Kodak Portra 400 warmth
- Kodak Gold 200 grain
- Fuji Pro 400H color palette
- 1970s-1990s documentary style

**Sales Point:** "Every article gets a unique, on-brand image. No stock photos, no template graphics."

---

### 6. Social Automation

| Feature | Typical Agency | LEXGRO/Taqtics |
|---------|---------------|----------------|
| Posting | Manual or Hootsuite | Automated queue system |
| Timing | Best guess | Data-optimized schedule |
| Content selection | Recent posts | Score-based prioritization |
| Cross-platform | Copy/paste | Extensible to any network |

**Technical Details:**
- Facebook Graph API integration
- Queue system with priority scoring
- Scheduled posts: 9am, 1pm, 7pm EST
- Auto-posts from high-scoring new content
- Library queue for evergreen content
- Token refresh handling (60-day tokens)

**Extensibility:**
- Same architecture works for LinkedIn, Twitter/X
- Queue system is platform-agnostic
- Can add new networks without rebuilding

**Sales Point:** "Content publishes and promotes itself. No manual posting required."

---

### 7. Social Sentiment Analysis

| Feature | Typical Agency | LEXGRO/Taqtics |
|---------|---------------|----------------|
| FAQ source | Guess what clients ask | Mined from actual discussions |
| Pain points | Assumptions | Quantified clusters with counts |
| Language | Legal jargon | Real words real people use |
| Updates | Static once written | Refreshable from live data |

**Technical Details:**
- Proprietary social listening system
- Targeted forums and communities (legal advice, local markets, industry-specific)
- Pain point clustering by category
- Sentiment analysis (positive/negative/neutral)
- Quote extraction for content inspiration
- Hundreds of posts analyzed per client vertical

**Pain Point Categories:**
- Medical and Injury Concerns (203 mentions)
- Legal Process Questions (128 mentions)
- Financial Stress (85 mentions)
- Insurance Issues (70 mentions)
- NYC-Specific Issues (65 mentions)
- Workplace Injury Issues (62 mentions)
- Finding/Working with Lawyer (56 mentions)
- Accident Shock and Confusion (48 mentions)

**Sales Point:** "Our FAQs answer questions people actually ask, not questions we think they ask."

---

### 8. Schema Generation

| Feature | Typical Agency | LEXGRO/Taqtics |
|---------|---------------|----------------|
| FAQ schema | Maybe, if remembered | Auto-generated from content |
| Article schema | Basic or missing | Full structured data |
| LocalBusiness | Often wrong | Validated against NAP |
| Testing | Manual Rich Results | Build-time validation |

**Technical Details:**
- FAQPage schema from FAQ sections
- Article schema with author, dates, images
- LocalBusiness with proper geo coordinates
- LegalService for practice areas
- AggregateRating for reviews
- BreadcrumbList for navigation
- Attorney schema for team pages

**Sales Point:** "Every page has proper schema. Rich results without manual work."

---

### 9. Programmatic SEO

| Feature | Typical Agency | LEXGRO/Taqtics |
|---------|---------------|----------------|
| Scale | Manual page creation | Generate 2,400 plus pages from data |
| Consistency | Template drift | Single source of truth |
| Updates | Edit each page | Update data file, rebuild all |
| Coverage | Whatever we have time for | Complete topic coverage |

**Technical Details:**
- JSON data files define entities (diseases, treatments, locations, companies)
- Astro dynamic routes generate pages
- Single template, consistent structure
- Internal linking auto-generated
- Easy to add new entities

**Example Scale (MesoWatch):**
- 29 symptom pages
- 4 cell type pages
- 5 diagnosis method pages
- 13 treatment procedure pages
- 50 state lawyer pages
- 100 plus city pages
- Company pages from manufacturers.json

**Sales Point:** "We can build hundreds of optimized pages that would take months manually."

---

### 10. Google Discover Optimization

| Feature | Typical Agency | LEXGRO/Taqtics |
|---------|---------------|----------------|
| Discover strategy | Hope for the best | Content type targeting |
| Headlines | SEO keyword stuffing | Curiosity-driven, no clickbait |
| Images | Whatever's available | High-quality card images required |
| Mobile | Responsive template | Paragraph length optimization |

**Technical Details:**
- Content types that perform:
  - Celebrity/Notable (public figures)
  - Human Interest (survivor stories)
  - Breaking Verdict (legal outcomes)
  - Treatment Hope (new therapies)
  - Data/Statistics (research findings)
- Paragraphs under 5 lines for mobile
- Card images 800x450 for Discover display
- E-E-A-T signals (author bios, medical review, sources)
- Timeliness signals in metadata

**Sales Point:** "We optimize for Google Discover, not just traditional search."

---

### 11. Editorial-Level Visual Branding

| Feature | Typical Agency | LEXGRO/Taqtics |
|---------|---------------|----------------|
| Image style | Stock photos, templates | 35mm documentary photography |
| Brand consistency | Logo slapped on stock | Cohesive visual language |
| Production value | DIY Canva | Enterprise editorial quality |
| Uniqueness | Same photos as competitors | Every image generated unique |

**Technical Details:**
- Documentary photography aesthetic throughout
- 35mm film grain texture (authentic, not filter)
- Muted, warm color palettes
- Film stock references:
  - Kodak Portra 400 (skin tones, warmth)
  - Kodak Gold 200 (natural grain)
  - Fuji Pro 400H (soft greens, pastels)
- Era reference: 1970s-1990s documentary/journalistic
- Imperfect authenticity (natural light, real grain)

**What We Never Include:**
- People or faces (legal/rights issues)
- Readable text or logos
- Perfect studio lighting
- Obvious AI artifacts
- Generic stock photo compositions

**Image Types:**
- Card images (800x450) for blog previews, social feeds
- OG images (1200x630) for link sharing
- Hero images for landing pages
- Section backgrounds

**Sales Point:** "Your visual brand looks like editorial content, not marketing collateral. Same quality as STAT News or The Atlantic."

---

### 12. CRO Optimization and Funnel Alignment

| Feature | Typical Agency | LEXGRO/Taqtics |
|---------|---------------|----------------|
| CTA placement | Bottom of page | Data-driven positioning |
| Form optimization | Standard contact form | Conversion-tested layouts |
| Trust signals | Testimonials section | Strategic placement throughout |
| Mobile CRO | Desktop-first design | Mobile-first conversion paths |

**Technical Details:**
- CTA positioning based on scroll depth data
- Sidebar CTAs for content pages (high intent)
- Inline CTAs at natural break points
- Trust signals near conversion points:
  - Case results with specific numbers
  - Review aggregation with schema
  - Attorney credentials and experience
  - Awards and recognition badges
- Form field optimization (minimal friction)
- Mobile-specific CTA sizing and placement

**Conversion Elements:**
- Floating CTAs that don't obstruct
- Exit intent triggers (optional)
- Phone number click-to-call
- Chat integration points
- FAQ schema for featured snippets

**Sales Point:** "Every page is built to convert, not just inform. CTAs where they work, trust signals where they matter."

---

### 13. CTV Advertising and Behavioral Targeting (Taqtics)

| Feature | Typical Agency | Taqtics |
|---------|---------------|---------|
| Audience data | Basic demo/geo targeting | Behavioral audiences competitors can't access |
| Injury prospecting | Wait for them to search | Reach households with qualifying injury events |
| Market timing | Reactive (after intent) | 90 percent blue ocean, before they search |
| Exclusivity | Compete with other firms | One firm per market |
| Attribution | Impressions/reach | Commercial to signed case tracking |

**Behavioral Audience Targeting:**

We access behavioral and life-event data that competitors cannot obtain:

- **Qualifying Injury Events:** Household-level signals indicating potential PI cases
- **Life Event Triggers:** Accidents, medical events, workplace incidents
- **Intent Data:** Behavioral patterns indicating need for legal services
- **Real-World Behavior:** 95 percent household matching rate

**Why This Is Different:**

Traditional PI advertising waits for someone to search "car accident lawyer." By then, they're comparing 10 firms.

We reach households with qualifying injury events BEFORE they search. This is 90 percent blue ocean. First to establish trust, first call when they're ready.

**Platform Coverage:**
- 150+ premium streaming networks
- HBO Max, Hulu, Peacock, Paramount+, YouTube TV, Tubi, Discovery
- Non-skippable, 100 percent completion ads
- Where 48 percent of viewers now watch (versus 52 percent of ad dollars still on broadcast)

**Market Exclusivity:**

One firm per market. Period.

Your competitors cannot access the same behavioral audiences in your geography. This is not a preference setting. It is structural exclusivity.

**Market Analytics:**
- Full competitor advertising analysis
- Market share of voice tracking
- Strategies to capture underserved segments
- Dayparting optimization by market behavior

**Attribution Stack:**
- CallRail integration (call tracking)
- GA4 integration (web behavior)
- Dial800 integration (phone attribution)
- Commercial → website → call → signed case tracking

**Multi-Channel Retargeting:**

CTV builds awareness. Then:
- Meta retargeting (20 to 40 percent higher conversion)
- YouTube retargeting
- Display network follow-up
- Search capture coordination

**Creative Production:**
- Full-service 30-second spot production
- Scripts tailored to local market demographics
- Voiceover talent matching regional expectations
- Documentary brand aesthetic consistency

**Sales Point:** "We reach households with qualifying injury events before they ever search. Your competitors are fighting over the 10 percent who Google 'car accident lawyer.' We're talking to the 90 percent who haven't searched yet."

---

### 14. Full-Funnel Media Strategy

| Stage | Channel | Content Type | Measurement |
|-------|---------|--------------|-------------|
| **Awareness** | CTV, Display | Brand spots, documentary style | Reach, frequency |
| **Interest** | Social (FB, IG, LI) | Card content, video clips | Engagement, follows |
| **Consideration** | Search (paid + organic) | Practice area pages, guides | Rankings, CTR |
| **Intent** | Retargeting, Email | Case results, testimonials | Return visits |
| **Conversion** | Site | Optimized landing pages | Leads, calls |

**CTV (Connected TV)**
- 30-second spots in documentary brand style
- Same visual language as digital content
- Targeted by geography and demographics
- Frequency capping to avoid fatigue

**Localized Creative:**
- Scripts tailored to local market demographics
- Voiceover talent matching regional expectations
- Population insights inform messaging angles
- Local references and cultural relevance
- Market-specific pain points addressed

**Social Layer**
- Organic: Card images from content pipeline
- Paid: Boosted high-performers
- Video: Clips from longer content
- Platform-native formats (Reels, Stories)

**Search Layer**
- Organic: Programmatic SEO, news content, guides
- Paid: Practice area targeting, competitor conquesting
- Local: GMB optimization, local landing pages

**Retargeting**
- Site visitors who didn't convert
- Video viewers (CTV, social)
- Email list (newsletter, lead nurture)

**Attribution:**
- Multi-touch attribution modeling
- First-touch for awareness channels
- Last-touch for conversion channels
- View-through for CTV impact

**Sales Point:** "We don't just do SEO or just do paid. We build the full funnel from TV to conversion, all with consistent brand and messaging."

---

### 14. Brand Alignment Across Channels

| Channel | Brand Element | Implementation |
|---------|---------------|----------------|
| CTV | Visual style | 35mm documentary aesthetic |
| Social | Imagery | Card images from same system |
| Search | Voice | Audited content, consistent tone |
| Site | Experience | Same design system throughout |
| Email | Templates | Matching visual language |

**Why This Matters:**
- Prospect sees CTV spot with documentary aesthetic
- Clicks social ad with matching visual style
- Lands on site with same brand feel
- Reads content in consistent voice
- Every touchpoint reinforces trust

**Technical Implementation:**
- Single design token system across all properties
- Image generation uses same prompts/style
- Content audit enforces voice consistency
- Email templates from same component library
- Video follows same visual guidelines

**Sales Point:** "Your brand looks the same whether someone sees you on TV, Instagram, or Google. That consistency builds trust."

---

### 15. Localized Creative Production

| Feature | Typical Agency | LEXGRO/Taqtics |
|---------|---------------|----------------|
| Scripts | Generic templates | Market-specific messaging |
| Voiceover | One size fits all | Regional talent matching |
| Messaging | Broad appeals | Population-informed angles |
| References | Generic city shots | Local landmarks, culture |

**Market Research Integration:**
- Census data for demographic composition
- Local economic indicators
- Regional legal landscape (courts, laws)
- Competitor presence analysis
- Cultural considerations

**Script Development:**
- Pain points specific to local population
- Industry mix (construction heavy? manufacturing? white collar?)
- Language considerations for diverse markets
- Local case references where available
- Regional voiceover talent selection

**Examples:**

*NYC Market (AEE Law):*
- Construction accident focus (major industry)
- Subway, MTA references
- Borough-specific content (Brooklyn vs Manhattan)
- Diverse population messaging
- NYC court system familiarity

*Rural Pennsylvania Market:*
- Occupational disease focus (mining, manufacturing history)
- Working-class messaging
- Community-oriented tone
- Local employer references
- Regional accent considerations

*South Florida Market:*
- Retiree population consideration
- Spanish-language options
- Cruise/tourism industry accidents
- Hurricane/weather event references
- Snowbird seasonal patterns

**Production Workflow:**
1. Market analysis (demographics, industries, competitors)
2. Messaging angle development
3. Script drafts with local specificity
4. Voiceover talent selection (regional match)
5. Visual treatment (local B-roll, documentary style)
6. Multi-variant testing where budget allows

**Sales Point:** "Your TV spots speak directly to your local market. We research who lives there, what industries dominate, what keeps them up at night. The creative reflects that, not generic 'injured? call us' messaging."

---

### 16. Backlink Intelligence and Prospecting

| Feature | Typical Agency | LEXGRO/Taqtics |
|---------|---------------|----------------|
| Prospecting | Buy a list, spray and pray | Intelligence-driven with quality scoring |
| Analysis | Basic DA check | Full backlink profile + competitor gaps |
| Targeting | Whoever responds | Prioritized by authority, relevance, traffic |
| Outreach | Generic templates | Site-specific pitches with insertion points |

**Our Process:**

1. **Domain Analysis**
   - Full backlink profile audit of client site
   - Competitor backlink analysis (who links to them?)
   - Gap identification: links they have that you don't
   - Toxic link identification for disavow

2. **Prospect Scoring**
   - Domain authority / traffic metrics
   - Relevance to practice area
   - Link placement quality (editorial vs footer)
   - Existing content that fits natural insertion
   - Contact accessibility

3. **Opportunity Classification**
   - Link insertions: add to existing relevant content
   - Guest posts: bylined content on authority sites
   - Resource page links: legal directories, guides
   - HARO/journalist requests: expert commentary
   - Broken link replacements: fix their dead links with your content

4. **Intelligence Output**
   - Prioritized prospect list with scores
   - Contact information where available
   - Specific pages for insertion opportunities
   - Outreach templates customized to site

**What We Analyze Per Prospect:**

| Metric | Why It Matters |
|--------|----------------|
| Domain Rating | Overall site authority |
| Organic Traffic | Real visitors, not inflated metrics |
| Referring Domains | Links pointing to that specific page |
| Content Relevance | Topical match to practice areas |
| Link Velocity | How often they add/remove links |
| Contact Quality | Editor vs generic contact form |

**Sales Point:** "Finding quality backlink opportunities is an art. We use intelligence data to identify the sites worth pursuing, not just whoever responds to mass outreach."

---

### 17. Link Acquisition Campaigns

| Feature | Typical Agency | LEXGRO/Taqtics |
|---------|---------------|----------------|
| Link insertions | Generic paragraph requests | Exact FIND/REPLACE with enriched content |
| Guest posts | Spun content | Original content serving their audience |
| Tracking | Spreadsheet maybe | Live verification + impact correlation |
| Quality control | Hope it sticks | Ongoing link monitoring |

**Link Insertion Process:**

1. Identify pages with existing authority (backlinks pointing to them)
2. Scrape actual page content (parallel processing for scale)
3. Find insertable text (sentences about relevant topics)
4. Create enriched version with natural link placement
5. Exact FIND/REPLACE instructions for outreach

**Example Insertion:**

```
FIND:
"Workers injured on the job may be entitled to compensation."

REPLACE:
"Workers injured on the job may be entitled to compensation.
For occupational diseases with long latency periods, affected
workers may also qualify for asbestos trust fund claims
holding over $30 billion in reserves."

Link: "asbestos trust fund claims" → client URL
```

**Guest Post Process:**

1. Identify sites accepting contributor content
2. Analyze their existing content gaps
3. Pitch topics that serve their audience AND link naturally
4. Quality content that earns the placement (same editorial standards)
5. Author bio with contextual link

**Campaign Tracking:**

| Metric | What We Track |
|--------|---------------|
| Links Acquired | Count with live URL verification |
| Domain Authority | Average DA of linking sites |
| Referral Traffic | Actual visits from links |
| Ranking Correlation | Position changes after link acquisition |
| Link Retention | Monthly checks for removed links |

**Link Types by Value:**

| Type | Value | Effort |
|------|-------|--------|
| Editorial mention | Highest | High |
| Guest post in-content | High | Medium |
| Resource page | Medium | Low |
| Directory listing | Low | Low |
| Footer/sidebar | Minimal | Avoid |

**Sales Point:** "We don't just get links. We get the RIGHT links, from relevant, authoritative sites with actual traffic. Every link has intelligence data behind it."

---

### 18. Content Gap Analysis

| Feature | Typical Agency | LEXGRO/Taqtics |
|---------|---------------|----------------|
| Competitor research | Manual SERP review | Parallel intelligence scraping |
| Keyword gaps | SEMrush export, no action | Proprietary analysis + prioritized roadmap |
| Content inventory | Spreadsheet guessing | Automated site mapping |
| Opportunity scoring | Gut feel | Traffic potential + difficulty matrix |

**How It Works:**

1. **Competitor Mapping**
   - Parallel scraping maps entire competitor sites (500+ URLs simultaneously)
   - Extract page titles, meta descriptions, headings
   - Identify content themes and structure
   - Catalog their topic coverage
   - Intelligent failure handling with automatic retries

2. **Keyword Gap Analysis**
   - Pull competitor ranking keywords from SEO intelligence layer
   - Compare against client's current rankings
   - Identify keywords competitors rank for that client doesn't
   - Filter by volume, difficulty, intent

3. **Opportunity Scoring**
   - Traffic potential (volume × expected CTR)
   - Ranking difficulty (current competition)
   - Business value (practice area alignment)
   - Content effort (new page vs. optimization)

4. **Prioritized Roadmap**
   - Quick wins (low difficulty, high value)
   - Strategic builds (high difficulty, high value)
   - Fill gaps (missing coverage)
   - Defend positions (competitors gaining)

**Output Deliverables:**

| Deliverable | Contents |
|-------------|----------|
| Gap Report | Keywords you're missing |
| Competitor Matrix | Who ranks for what |
| Opportunity List | Prioritized by potential |
| Content Roadmap | What to create, in what order |

**Example Analysis:**

*Client: NYC PI Firm*
*Competitors: 5 top-ranking local firms*

| Gap Identified | Volume | Difficulty | Action |
|----------------|--------|------------|--------|
| "scaffold accident lawyer nyc" | 320/mo | Medium | New page |
| "uber accident lawyer brooklyn" | 210/mo | Low | Quick win |
| "construction accident settlement amounts" | 480/mo | High | Guide |
| "can i sue my employer for injury" | 1,200/mo | Medium | FAQ expansion |

**Ongoing Monitoring:**
- Monthly gap refresh
- New competitor content alerts
- Ranking movement tracking
- Content decay identification

**Sales Point:** "We don't guess what content to create. We analyze exactly what your competitors rank for that you don't, score the opportunities, and build a roadmap. Every piece of content has a strategic reason."

---

### 19. Visual Identity System

| Feature | Typical Agency | LEXGRO/Taqtics |
|---------|---------------|----------------|
| Color palette | Pick from templates | Strategic color psychology |
| Typography | Whatever looks nice | Readability + brand personality |
| Photography | Stock photos | Custom 35mm documentary style |
| Design system | Ad hoc decisions | Documented token system |

**What We Develop:**

**Color System**
- Primary palette (brand colors)
- Secondary palette (accents, CTAs)
- Semantic colors (success, error, warning)
- Dark/light mode considerations
- Accessibility compliance (WCAG AA minimum)

**Typography System**
- Heading hierarchy (H1-H6)
- Body text specifications
- Font pairings (display + readable)
- Size scale (mobile + desktop)
- Line height and spacing

**Photography Direction**
- Style guide (35mm documentary aesthetic)
- Color treatment (muted, warm, film grain)
- Subject matter guidelines
- What to avoid (stock photo tells)
- AI generation prompts

**Component Library**
- Buttons and CTAs
- Cards and containers
- Forms and inputs
- Navigation patterns
- Trust signal treatments

**Example: AEE Law Visual Identity**

| Element | Specification |
|---------|---------------|
| Primary BG | Rich Black #0A0A0A |
| Secondary BG | Warm Charcoal #1C1C1E |
| Accent | Burnt Copper #B87333 |
| Primary Text | Ivory #FFFEF5 |
| Headlines | Playfair Display 600, 700 |
| Body | DM Sans 400, 500, 700 |
| Photography | Documentary, no faces, warm muted |

**Deliverables:**
- Design token file (CSS/JSON)
- Brand style guide PDF
- Photography direction doc
- Component specifications
- Figma/design file handoff

**Sales Point:** "We don't just pick colors. We build a complete visual system: colors, typography, photography, components. All documented so everything stays consistent as you scale."

---

### 20. CRO Analysis and Optimization

| Feature | Typical Agency | LEXGRO/Taqtics |
|---------|---------------|----------------|
| Analysis method | "Best practices" | Data-driven audit |
| Heatmaps | Maybe Hotjar | Scroll depth, click mapping |
| Form analysis | Field count guess | Completion funnel data |
| Mobile CRO | Responsive = done | Mobile-specific optimization |

**CRO Audit Process:**

1. **Baseline Metrics**
   - Current conversion rate by page
   - Form completion rates
   - Bounce rates by traffic source
   - Mobile vs desktop performance

2. **User Behavior Analysis**
   - Scroll depth (where do users stop?)
   - Click patterns (what gets attention?)
   - Form abandonment (which fields?)
   - Exit pages (where do they leave?)

3. **Friction Identification**
   - Too many form fields
   - CTA below fold
   - Trust signals missing at decision point
   - Mobile usability issues
   - Page speed problems

4. **Opportunity Scoring**
   - Traffic volume × conversion gap = opportunity size
   - Prioritize high-traffic, low-converting pages
   - Quick wins vs structural changes

**Optimization Areas:**

| Area | What We Analyze | Common Fixes |
|------|-----------------|--------------|
| Hero Section | First impression, CTA visibility | Value prop clarity, CTA prominence |
| Trust Signals | Placement relative to conversion | Move closer to forms/CTAs |
| Forms | Field count, labels, errors | Reduce fields, improve UX |
| Mobile | Thumb zones, tap targets | Resize CTAs, simplify nav |
| Page Speed | Load time impact on bounce | Image optimization, code cleanup |
| Social Proof | Review visibility, case results | Strategic placement |

**Testing Framework:**
- A/B test hypotheses based on data
- Statistical significance requirements
- Test one variable at a time
- Document learnings

**Example Findings:**

*AEE Law CRO Audit:*

| Issue Found | Data | Fix Applied |
|-------------|------|-------------|
| CTA below fold on mobile | 68 percent never see it | Sticky mobile CTA |
| Form has 8 fields | 34 percent abandonment | Reduced to 4 fields |
| No trust signals near form | Low completion | Added case result above form |
| Phone number not clickable | Mobile friction | Click-to-call implemented |

**Ongoing Optimization:**
- Monthly conversion reporting
- Quarterly CRO audit refresh
- Continuous A/B testing calendar
- Seasonal adjustment tracking

**Sales Point:** "We don't guess what converts. We analyze where users drop off, what gets clicked, where they stop scrolling. Then we fix the friction points with data, not opinions."

---

### 21. Brand Voice and Editorial Standards

| Feature | Typical Agency | LEXGRO/Taqtics |
|---------|---------------|----------------|
| Voice definition | "Be professional" | Documented voice guide with examples |
| Style rules | Maybe a one-pager | Comprehensive writing rules + banned phrases |
| Editorial process | Hope the writer gets it | Structured guidelines + automated auditing |
| Consistency | Varies by writer | Systematic enforcement |

**What We Build:**

**Brand Voice Guide**
- Tone and personality definition
- What your firm sounds like (and doesn't sound like)
- Messaging hierarchy (primary, secondary, supporting)
- Competitor voice differentiation
- Do's and don'ts with examples

**Style Guide**
- Writing rules specific to your firm
- Banned phrases (law firm cliches, AI tells, competitor language)
- Grammar and formatting standards
- Vocabulary preferences
- Number formatting, capitalization, punctuation

**Editorial Guidelines**
- Content structure templates by type
- SEO requirements baked into process
- Source citation standards
- Fact-checking protocols
- Review and approval workflow

**Content Strategy**
- Topic clusters and pillar page architecture
- Content calendar framework
- Keyword-to-content mapping
- Funnel stage alignment
- Competitive gap coverage

**Copywriting Elements**
- Headlines and subhead patterns
- CTA language library
- Email subject line frameworks
- Ad copy templates
- Social post formats

**Why This Matters:**

Amateurs write content and hope it sounds right. Professionals document everything so every piece, whether written by us, your team, or future vendors, sounds like your firm, not like ChatGPT or every other PI lawyer.

**Deliverables:**
- Brand Voice Guide (PDF)
- Style Guide with writing rules
- Editorial Guidelines document
- Content Strategy framework
- Copywriting element library

**Sales Point:** "We build the system that makes your content consistent. Voice guide, style rules, editorial standards. This is what amateurs don't have."

---

### 22. Brand Creative Development

| Feature | Typical Agency | LEXGRO/Taqtics |
|---------|---------------|----------------|
| Taglines | Generic PI slogans | Firm-specific positioning |
| Messaging | "We fight for you" | Differentiating statements |
| Voice | Ambulance chaser tone | Premium editorial authority |
| Positioning | Like everyone else | Specific to firm strengths |

**What We Develop:**

**Primary Taglines:** The anchor of all messaging.
**Supporting Lines:** Variations for different contexts.
**Positioning Statements:** What makes this firm different.
**Voice Guidelines:** How the firm speaks.

**Example: AEE Law Creative Development**

*Primary Tagline:*
> "35 Years. One Fight. Yours."

*Supporting Lines:*
> "For injured New Yorkers who can't afford a second mistake."
> "The firm you hear from, not just hear about."

*Positioning:*
> Trial-ready lawyers who prepare every case for court. Direct attorney access, not call centers. NYC-specific expertise in construction, car accidents, and medical malpractice.

*Voice:*
> Confident without being aggressive. "Determined" not "aggressive." "Injured person" not "victim." NYC street-smart, courtroom-proven.

**Development Process:**

1. **Discovery**
   - Firm history and founding story
   - Key case results and victories
   - Partner personalities and strengths
   - Competitive landscape
   - Target client profile

2. **Differentiation Analysis**
   - What does this firm do that others don't?
   - What can they claim credibly?
   - What resonates with target clients?
   - What cuts through PI noise?

3. **Creative Exploration**
   - Multiple tagline directions
   - Supporting message variants
   - Voice and tone testing
   - Competitor comparison

4. **Refinement**
   - Feedback integration
   - Legal review (claims we can make)
   - Final positioning package

**Positioning Angles That Work:**

| Angle | Example | Why It Works |
|-------|---------|--------------|
| Experience/Track Record | "35 Years. One Fight." | Credibility, stability |
| Direct Access | "Hear from, not hear about" | Differentiates from call centers |
| Local Expertise | "For injured New Yorkers" | Geographic relevance |
| Stakes/Consequences | "Can't afford a second mistake" | Emotional truth |
| Trial Readiness | "We Don't Settle. We Fight." | Insurance company negotiating power |
| Specialization | "NYC Construction Accidents" | Authority in niche |

**What We Avoid:**

- Generic PI cliches ("Fighting for you")
- Aggressive/ambulance-chaser tone
- Claims that can't be backed up
- Messaging identical to competitors
- Overpromising results

**Sales Point:** "We don't just write content. We build your brand voice and positioning from scratch. Taglines, slogans, messaging that actually differentiates you from the 500 other PI firms in your market."

---

## The Content Development Framework

### How Content Actually Gets Made

```
Research Layer (invisible to client)
├── News Intelligence → Monitoring, keyword data, SERP analysis
├── Research Engine → Fact-finding with citations, current stats
└── Web Intelligence → Competitor scraping, structured data extraction

Writing Layer (what clients see)
├── Style-audited content (no AI tells)
├── Expert voice matching (per-project rules)
└── SEO-optimized structure

Quality Layer (our differentiator)
├── Automated style auditing
├── Internal link validation
├── Schema generation
└── Google Discover optimization
```

### The Intelligence Layer Architecture

> "Gather → Research → Synthesize → Create"

Our proprietary stack separates concerns:
- **Web Intelligence Engine**: Parallel scraping, structured extraction, competitor mapping
- **Research System**: Citation-backed fact-finding, real-time data
- **News Intelligence**: Monitoring, scoring, trend detection
- **Content Engine**: Writing, voice matching, style enforcement
- **Visual System**: Documentary-grade image generation

Each layer is purpose-built. No single system tries to do everything.

**Parallel Processing at Scale:**
- Execute thousands of web intelligence queries simultaneously
- Automatic failure handling with intelligent retry
- Tiered processing: fast retrieval for simple queries, deep analysis for complex research
- What used to take hours now takes minutes

---

## Content Auditing System

### What Gets Checked Automatically

Every piece of content runs through validation:

| Check | Limit | Why It Matters |
|-------|-------|----------------|
| Meta title | 60 characters | Google truncates longer |
| Description | 160 characters | SERP display limit |
| Paragraphs | Under 5 lines | Mobile readability |
| Reading level | Flesch 50-60 | Accessibility |
| Passive voice | Max 20 percent | Engagement |

### Banned Phrases (Auto-Flagged)

**Law Firm Language** (sounds like every other firm):
- "entitled to compensation"
- "call now for a free consultation"
- "don't wait another day"
- "time is running out"
- "you deserve justice"

**AI Tells** (sounds machine-generated):
- "It's important to note"
- "In today's world"
- "When it comes to"
- "At the end of the day"
- "We need to understand"

**Fluff Words**:
- very, really, extremely
- utilize (use "use")
- leverage (as verb)
- synergy, holistic

**Auto-fix capabilities:** Percentages, em-dashes, ampersands, jargon, decade formatting. All caught before publish.

---

## Internal Linking System

### What It Does

Before any deploy, the system scans ALL content for internal links and verifies every link resolves to a real page.

**Catches:**
- Links to deleted pages
- Typos in URLs
- Links to draft content
- Missing trailing slashes

**Supports Dynamic Routes:**
- News articles: `/news/2026/02/slug/`
- Lawyer pages: `/lawyers/state/city/`
- Company pages: `/companies/slug/`
- Programmatic pages from data files

### Why This Matters for Sales

"Our system validates every internal link before publish. No broken links, ever. This protects your site authority and user experience."

---

## Google Discover Optimization

### Content Types That Perform

Based on our data, these content categories get Discover traffic:

| Type | Description | Example |
|------|-------------|---------|
| **Celebrity/Notable** | Public figures with condition | "Actor diagnosed with mesothelioma" |
| **Human Interest** | Personal stories, survivors | "Vietnam vet's 30-year fight" |
| **Breaking Verdict** | Legal outcomes, settlements | "$50M verdict against manufacturer" |
| **Treatment Hope** | New therapies, trials | "FDA approves new combination therapy" |
| **Data/Statistics** | New research findings | "Study: Rates rising in younger workers" |

### What Makes Content Discover-Ready

1. **Compelling headlines** (not clickbait, but curiosity-driven)
2. **High-quality card images** (800x450, documentary style)
3. **Fresh content** (timeliness signals)
4. **E-E-A-T signals** (author bios, medical review, sources)
5. **Mobile-optimized** (paragraphs under 5 lines)

### Story Scoring System

Every potential story gets scored 0-100:

| Dimension | Weight | What It Measures |
|-----------|--------|------------------|
| News Value | 25 percent | Is this actually news? |
| Discover Potential | 25 percent | Will Google surface this? |
| Audience Relevance | 20 percent | Does our audience care? |
| Timeliness | 15 percent | How fresh? |
| Uniqueness | 15 percent | Are competitors covering? |

**Auto-publish threshold:** Score 70 or higher

---

## News Pipeline (Automated)

### Daily Flow

```
6:00 AM  News intelligence pulls latest stories
         ↓
         Stories scored (0-100)
         ↓
         High scorers researched (proprietary system)
         ↓
         Article drafted (content engine)
         ↓
         Card image generated (visual system)
         ↓
         Auto-deploy to site
         ↓
9:00 AM  Social post from queue
1:00 PM  Social post from queue
7:00 PM  Social post from queue
```

### What Gets Filtered Out

- Law firm press releases (conflict)
- Competitor content
- Previously covered stories (duplicate detection)
- Low-quality sources
- Stories under score threshold

---

## The LEXXLY Suite Products

### Tier 1: Content Engine

| Component | What It Does | Deliverable |
|-----------|-------------|-------------|
| Research Layer | Cited fact-finding system | Verified statistics |
| Writing Layer | Content engine with style rules | On-brand articles |
| Audit Layer | 15-point automated check | Quality-assured content |
| Visual Layer | Documentary-grade imagery | Unique card/OG images |

**Monthly Output Examples:**
- 8-12 news articles (auto-scored, researched)
- 4 evergreen guides
- All supporting images
- FAQ updates from social sentiment data

---

### Tier 2: Technical SEO Suite

| Component | What It Does | Business Impact |
|-----------|-------------|-----------------|
| Internal Linking | Pre-deploy validation | Zero broken links |
| Schema Generation | FAQ, Article, LocalBusiness | Rich results |
| Sitemap Management | Auto-updated, news sitemap | Faster indexing |
| Meta Optimization | Title/description enforcement | Better CTR |

**Includes:**
- Google News sitemap (2-day freshness)
- Programmatic page generation
- Redirect management
- Canonical handling

---

### Tier 3: Monitoring and Intelligence

| Component | What It Does | Frequency |
|-----------|-------------|-----------|
| News Monitoring | Proprietary news intelligence | Daily |
| Competitor Tracking | Content gap analysis | Weekly |
| Ranking Reports | Position tracking | Weekly |
| Backlink Alerts | New link acquisition | Daily |

**Slack Integration:**
- High-score story alerts
- Ranking changes
- New backlink notifications
- Build status

---

### Tier 4: Social Automation

| Component | What It Does | Platforms |
|-----------|-------------|-----------|
| Queue Management | Priority-based scheduling | Facebook (extensible) |
| Auto-Posting | New content to social | 3x daily |
| Library Queue | Evergreen rotation | Configurable |
| Cross-Platform | Same system, any network | LinkedIn, X, etc. |

**Schedule:**
- 9:00 AM EST
- 1:00 PM EST
- 7:00 PM EST

---

### Tier 5: Full-Funnel Media

| Channel | Service | Integration |
|---------|---------|-------------|
| CTV | 30s spots, documentary style | Same brand system |
| Social Paid | Boosted content, targeting | From content pipeline |
| Search Paid | Practice area, competitor | Landing page optimization |
| Retargeting | Multi-touch sequences | Site visitor data |

**Attribution:**
- Multi-touch modeling
- CTV view-through tracking
- Cross-channel reporting

---

### Tier 6: CRO and Conversion

| Element | Optimization | Measurement |
|---------|-------------|-------------|
| CTA Placement | Data-driven positioning | Scroll depth, clicks |
| Form Design | Minimal friction | Completion rate |
| Trust Signals | Strategic placement | Time on page |
| Mobile UX | Thumb-zone CTAs | Mobile conversion rate |

---

### Package Options (Refer to Taqtics for Pricing)

**Starter:** Content Engine + Technical SEO
- Best for: Firms starting content marketing
- Focus: Foundation building

**Growth:** Starter + Monitoring + Social
- Best for: Firms ready to scale
- Focus: Consistent output and visibility

**Enterprise:** Full Suite + Media
- Best for: Firms competing at market level
- Focus: Full-funnel domination

---

## Sales Talking Points

### When They Ask "How Is Your Content Different?"

"We don't write from templates or guesswork. Every piece starts with current research from authoritative sources. Then it goes through automated quality checks that catch AI-sounding language, law firm cliches, and SEO issues before it ever publishes. The result is content that sounds human because it's built on real research, not generated from patterns."

### When They Ask About AI

"We use research tools and automation to make our process more efficient, but the editorial standards are human. Our system actually flags and removes the phrases that make content sound machine-generated. We audit for things like passive voice, fluff words, and cliches that hurt engagement."

### When They Ask About Scale

"Our content system can produce consistent, quality content at volume because we've built the quality checks into the process. Internal links get validated automatically. Style issues get flagged before publish. Images get generated to match your brand. This means we can scale without sacrificing quality."

### When They Ask About Technical SEO

"We handle the technical foundation that makes content perform. Internal linking, schema markup, meta optimization, sitemap management. Our tools validate everything before deploy. No broken links, no missing schemas, no technical issues holding back your rankings."

### When They Ask About Visual Brand

"Your content will look like editorial journalism, not marketing. We use a documentary photography style inspired by publications like STAT News and The Atlantic. Every image is unique to your content, with a cohesive visual language across all touchpoints. No stock photos, no Canva templates."

### When They Ask About Full Funnel

"We don't just do SEO or just do paid. We build the complete journey from awareness through conversion. CTV spots that look like documentary content. Social that matches your brand. Search that captures intent. Retargeting that brings them back. And landing pages that convert. Same visual language, same voice, every touchpoint."

### When They Ask About FAQs

"Most firms write FAQs based on what they think clients ask. We analyze hundreds of real discussions on legal forums and social platforms to find what people actually ask when they're in crisis. Then we write FAQs that address those exact questions. That's why our FAQ pages rank, they match how real people search."

### When They Ask About Competitors

"Most agencies write content and hope it works. We validate every internal link before publish. We audit every piece for voice and SEO. We generate unique images instead of using stock. We monitor news daily and score stories before covering them. The difference is the infrastructure, not just the output."

### When They Ask About Link Building

"We don't buy lists and spray emails. We analyze your competitors' backlink profiles to find who's linking to them. We score every prospect by domain authority, traffic, relevance to your practice areas. Then we identify specific pages where a link insertion makes sense. We even scrape the content to provide exact placement instructions. Every link we pursue has intelligence data behind it."

### When They Ask About Google Discover

"Most agencies optimize for traditional search only. We also optimize for Google Discover. That's the feed on mobile Chrome and the Google app. Different content types trigger Discover: human interest stories, notable figures, breaking verdicts, new treatment breakthroughs. We score every piece of content for Discover potential and format it to perform in that channel."

### When They Ask About Results

**Focus on capabilities, not promises:**
- "We've built systems that eliminate the quality variance you get with manual processes"
- "Our technical foundation means you're never held back by broken links or missing schema"
- "The full-funnel approach means every channel reinforces the others"

**Do not promise:**
- Specific rankings
- Traffic numbers
- Lead counts
- Timelines

### When They Ask About Pricing

**Do not guess pricing.** Refer to Taqtics for custom quotes based on:
- Content volume (articles per month)
- Technical scope (site size, page count)
- Monitoring requirements (news, competitors, rankings)
- Social channels (which platforms, posting frequency)
- Media buy (CTV, paid social, paid search)
- Existing site health (cleanup needed?)

**Package Framing:**
- Starter: Content + Technical foundation
- Growth: Add monitoring + social automation
- Enterprise: Full funnel including media

---

## Project-Specific Voice Rules

### LEXGRO (B2B, Law Firm Marketing)
- Spell out "percent" (not %)
- No em-dashes
- Direct, no-fluff tone
- Keith's voice: "Stop Guessing. Start Leading."

### MesoWatch (Consumer Health News)
- Use % symbol
- Person-first language ("people with mesothelioma" not "mesothelioma patients")
- NO law firm language
- Voice: "STAT News meets Mayo Clinic"

### AEE Law (PI Firm, NYC)
- Trial-ready differentiator
- NYC-specific references (streets, courts, boroughs)
- "Injured person" not "victim"
- "Determined" not "aggressive"
- Voice: "We Don't Settle. We Fight."

---

## Social Sentiment for FAQ Optimization

### The Problem with Traditional FAQs

Most law firms write FAQs based on what they THINK clients want to know. They guess. The result is generic content that doesn't match actual search behavior.

### Our Approach: Data-Backed FAQs

We mine social platforms and forums to find what people ACTUALLY ask when they're in crisis mode.

**How It Works:**

1. **Social listening** scans targeted forums and communities (legal advice, local markets, industry-specific)
2. **Pain point clustering** groups posts by category:
   - Medical and Injury Concerns (203 mentions)
   - Legal Process Questions (128 mentions)
   - Financial Stress (85 mentions)
   - Insurance Issues (70 mentions)
   - NYC-Specific Issues (65 mentions)
   - Workplace Injury Issues (62 mentions)
   - Finding/Working with Lawyer (56 mentions)
   - Accident Shock and Confusion (48 mentions)

3. **Sentiment analysis** identifies emotional state (fear, frustration, confusion)
4. **Quote extraction** pulls actual language people use
5. **FAQ generation** addresses real questions in real language

### Example: AEE Law Social Sentiment Data

From 396 posts analyzed, we identified actual pain points:

| Category | Real Question Found | Our FAQ Response |
|----------|---------------------|------------------|
| Insurance | "Insurance says I'm at fault when I wasn't" | Addresses disputing fault with evidence |
| Lawyer Cost | "How much does a PI lawyer cost?" | Explains contingency fees, no upfront cost |
| NYC-Specific | "Who's liable for pothole damage?" | City claims process, Notice of Claim |
| Workplace | "Will I get fired if I file workers comp?" | Retaliation protection, third-party claims |

### Why This Matters for SEO

**Google loves FAQ schema** when the questions match real search queries.

Traditional approach:
- "What should I do after a car accident?" (generic)

Our approach:
- "The insurance company says I'm at fault, but I wasn't. What can I do?" (actual question found)
- "The other driver's lawyer is contacting me. Should I talk to them?" (actual question found)
- "I'm undocumented. Can I still file a construction accident claim?" (actual question found)

These match long-tail search queries exactly because they're sourced from real people asking real questions.

### The Data Output

Social sentiment research produces:
- Structured FAQ data by practice area
- Pain point clusters with mention counts
- Sentiment breakdown (positive/negative/neutral)
- Actual quotes for content inspiration

### Sales Talking Point

"Our FAQ content isn't guessed. We analyze hundreds of real discussions to find what people actually ask when they're in crisis. Then we write FAQs that address those exact questions. This is why our FAQ pages rank, they match real search behavior."

---

## Niche Edit / Link Building Workflow

### What We Do

Find pages on external domains that already have backlinks, then request link insertion pointing to client money pages.

### The Process

1. **Web intelligence** maps target domain (500+ URLs in parallel)
2. **Backlink analysis** identifies pages with existing authority
3. **Content extraction** scrapes specific page content
4. Find insertable text (existing sentences about relevant topic)
5. Create enriched version with our link and supporting data
6. Provide exact FIND/REPLACE instructions to vendor

### Output Format

```markdown
**URL:** https://domain.com/workplace-injury-guide/

**FIND:**
> Workers injured on the job may be entitled to compensation.

**REPLACE WITH:**
> Workers injured on the job may be entitled to compensation.
> For occupational diseases with long latency periods, workers
> may also have claims against [asbestos trust funds] holding
> over $30 billion in reserves.

**Link:** "asbestos trust funds" → https://client-site.com/trust-funds/
```

---

## For This Week's Calls

1. **Lead with outcomes, not process.** Clients care about rankings and leads, not our tool stack.

2. **Position the system as quality control.** "We've built the checks into the process so quality doesn't depend on individual writers having a good day."

3. **Differentiate on technical foundation.** Most agencies write content and hope. We validate links, generate schemas, audit style, and monitor performance.

4. **Don't oversell AI.** Say "research-backed" and "data-driven." Never "AI-generated."

5. **Refer pricing to Taqtics.** Custom quotes based on scope.

---

## Reference Site: aeelaw.com

**Use this as a live example in sales calls.**

### What To Show

**Homepage** (aeelaw.com)
- Dark authority design system
- "We Don't Settle. We Fight." positioning
- Case results with specific numbers
- Borough-specific navigation
- Trust signals above fold

**Practice Area Pages** (aeelaw.com/car-accidents/)
- FAQ schema with real-world sourced questions
- Specific NYC references (streets, courts)
- E-E-A-T signals (attorney bios, experience)
- Internal linking to related pages
- Mobile-optimized paragraph lengths

**Team Pages** (aeelaw.com/about/)
- Attorney schema markup
- Individual credentials
- Direct access messaging
- Professional photography

**Reviews Page** (aeelaw.com/reviews/)
- AggregateRating schema (5.0, 97 reviews)
- Individual review markup
- Trust signal placement

### Talking Points for Demo

**"Look at the FAQ section"**
"These aren't generic questions. 'The insurance company says I'm at fault, but I wasn't' is a real question from actual discussions. We analyzed hundreds of posts to find what people actually ask."

**"Notice the voice"**
"No 'entitled to compensation' or 'call now.' The language is confident but not aggressive. 'Injured person' not 'victim.' This is audited to remove law firm cliches."

**"See the visual consistency"**
"Dark authority design throughout. Every page looks premium. The photography style is consistent. This isn't a template, it's a custom visual system."

**"Check the schema"** (show rich results in Google)
"FAQ rich results. Attorney knowledge panel data. LocalBusiness markup. This technical foundation is why the site performs."

**"Look at the borough pages"**
"Brooklyn page references Brooklyn streets and courts. Queens page references Queens. This isn't find-and-replace, it's actual local expertise built into the content."

### What AEE Law Demonstrates

| Capability | How It Shows |
|------------|--------------|
| Brand Creative | "35 Years. One Fight. Yours." |
| Voice Development | Trial-ready, NYC-specific tone |
| Social Sentiment FAQ Research | Real questions from real discussions |
| Content Auditing | No AI tells, no PI cliches |
| Schema Implementation | Rich results, proper markup |
| Visual System | Dark authority, consistent throughout |
| Local Expertise | Borough-specific content |
| CRO Elements | Strategic CTA placement |

### How To Position

"This is a NYC personal injury firm we built from strategy through execution. Same approach we'd take with you: brand positioning, voice development, content system, technical foundation, all working together."

---

*LEXGRO System Guide v1.0*
*Taqtics White Label*
*February 2026*
