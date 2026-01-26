# Lexgro - Astro Site Project

## Project Status
**Current Phase:** Site Migration from Framer to Astro
**Last Updated:** January 25, 2026 (Session 2)

## Migration Progress

### ✅ Foundation Complete
- [x] `astro.config.mjs` - React, MDX, sitemap integrations
- [x] Design tokens (`src/lib/theme/tokens.ts`)
- [x] Chakra UI v3 theme (available but not used - using Astro components)
- [x] `BaseLayout.astro` with Header, Footer, global styles
- [x] `Header.astro` - Astro-native nav with mobile menu
- [x] `Footer.astro` - Astro-native footer
- [x] Content collections config (`src/content.config.ts`)
- [x] 4 page layouts: GuideLayout, AnswerLayout, ServiceLayout, BlogLayout
- [x] Dynamic routing for all content types

### 📦 Assets Downloaded
Located in `src/assets/images/`:

**Logos:**
- `logos/lexgro-icon.png`
- `logos/lexgro-wordmark.png`

**Heroes:**
- `heroes/hero-main.png` - Main hero background
- `heroes/services-graphic.png` - Services illustration
- `heroes/video-thumbnail.png` - Video section thumbnail
- `heroes/trust-avatars-1.png` through `trust-avatars-5.png` - Trust badge rows with avatars
- `heroes/cta-graphic.png` - CTA button graphic

**Decorations (NEW):**
- `decorations/leaf-icon-left.png` - Section header leaf icon
- `decorations/leaf-icon-right.png` - Section header leaf icon
- `decorations/swoosh-line.png` - Decorative swoosh line
- `decorations/checkmark-graphic.png` - Checkmark decoration
- `decorations/problems-header.png` - Problems section header
- `decorations/solutions-header.png` - Solutions section header

**Brand Graphics (NEW):**
- `brand/services-graphic.png` - Services section graphic
- `brand/benefits-graphic.png` - Benefits section graphic
- `brand/services-cta-graphic.png` - Services CTA graphic

**Testimonials (11 total):**
- `testimonials/clarke-speaks.png`
- `testimonials/peter-davis.png`
- `testimonials/eric-richardson.png`
- `testimonials/drew-brown.png`
- `testimonials/barry-siegel.jpg`
- `testimonials/blake-swan.png`
- `testimonials/riah-greathouse.webp` (NEW)
- `testimonials/matthew-albrecht.webp` (NEW)
- `testimonials/yunuen-alvarado.webp` (NEW)
- `testimonials/james-amaro.webp` (NEW)
- `testimonials/beth-tibbott.png` (NEW)

**Awards:**
- `awards/speaks-law-award-2023.jpg`
- `awards/albrecht-law-award-2024.jpg`

### 📄 Pages Building
- `/` - Homepage (IN PROGRESS - rebuilding section by section)
- `/guide/fractional-cmo-law-firms/`
- `/answers/what-is-fractional-cmo/`
- `/services/fractional-cmo/`
- `/blog/why-marketing-agencies-fail-law-firms/`

### 🔧 Homepage Sections Status (Framer Match)

| Section | Status | Notes |
|---------|--------|-------|
| Hero | ✅ Updated | Full-width bg, gradient text, trust avatar rows |
| Trust Badges | ✅ Done | SVG icons in circles, 4 badges |
| Video Section | ✅ Done | Thumbnail + play button |
| Awards | ✅ Done | 2 award cards |
| Problems | ✅ Done | 3 problem cards with numbers |
| Solutions | ✅ Done | 3 solution cards, benefits row |
| Services | ✅ Done | 4 service cards with arrows |
| Testimonials | ✅ Done | 11 client testimonials |
| Pricing | ✅ Added | 4 tiers ($97, $6,999, $4,999, Get Quote) |
| FAQ | ✅ Added | 5 accordion questions |
| Final CTA | ✅ Done | Green bg, white button |

**Still Missing:**
- "Let's Grow with LEXGRO" decorative sections with leaf icons
- Circle of Trust section
- 4-stage process (Consultation, Strategy, Train, Growth)
- Blog preview section with latest posts

### 🎨 Design System Colors (from Framer)
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
```

### 🔜 TODO - Current Session
1. [DONE] Rebuild hero section to match Framer - added trust avatar rows
2. [DONE] Add pricing section (4 tiers)
3. [DONE] Add FAQ section
4. [DONE] Update testimonials to 11 people
5. [DONE] Video modal overlay for YouTube playback
6. [DONE] Trust badges horizontal layout fix
7. Add decorative "Let's Grow with LEXGRO" sections
8. Add 4-stage services process
9. Add blog preview section
10. Match all typography/spacing to Framer

### ⚠️ Needs Configuration
- Video modal: Replace `YOUR_VIDEO_ID` in index.astro script with actual YouTube video ID

### 📋 Future Tasks
- Create index pages (/guide/, /services/, /blog/, /about/, /contact/)
- Add SEO schemas (JSON-LD)
- Add Trustpilot widget
- Full accessibility audit
- Performance optimization

## Dev Commands
```bash
npm run dev -- --port 4322   # Dev server
npm run build                 # Build
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
│   └── BlogLayout.astro
├── pages/
│   ├── index.astro          # HOMEPAGE - rebuilding
│   ├── guide/[slug].astro
│   ├── answers/[slug].astro
│   ├── services/[slug].astro
│   └── blog/[slug].astro
├── assets/images/
│   ├── logos/
│   ├── heroes/
│   ├── decorations/         # NEW - section decorations
│   ├── brand/               # NEW - brand graphics
│   ├── testimonials/        # Updated - 11 photos
│   ├── awards/
│   └── icons/
└── content.config.ts
```

## Reference Data
- Scraped Framer homepage: `scripts/research/output/lexgro-page-home.md`
- Framer HTML: `scripts/research/output/lexgro-page-home.html`
- Planning docs: `planning/`
- Content briefs: `planning/briefs/phase-1/`

## Current Framer Site
- URL: https://lexgro.com
- Analytics: GA (G-2Z5L72S3NL), Facebook Pixel, Hyros

## Astro 5 Notes
- Use `render()` from `astro:content` instead of `entry.render()`
- Content collections use glob loader pattern
- Dynamic routes use `getStaticPaths()` with params/props
