# LEXGRO Homepage Asset Extraction & Improvement Guide

**Date:** January 26, 2026
**Purpose:** Comprehensive guide for extracting missing assets from lexgro.com and implementing an improved homepage

---

## Executive Summary

The localhost development site has 69 existing assets but is missing several critical visual elements from the live lexgro.com site. This document catalogs what needs to be extracted, where to find it, and how to organize the improved homepage.

---

## SECTION 1: Assets to Extract from Live Site

### 1.1 Header/Navigation Assets

| Asset | Description | Source Location | Target Path |
|-------|-------------|-----------------|-------------|
| LEXGRO Icon Logo | Green circular icon with columns | Header navigation | `src/assets/images/logos/lexgro-icon.svg` |
| LEXGRO Wordmark | Text logo next to icon | Header navigation | `src/assets/images/logos/lexgro-wordmark.svg` |

**Extraction Method:** Right-click > Inspect > Copy SVG or download image

---

### 1.2 Hero Section Assets

| Asset | Description | Status | Notes |
|-------|-------------|--------|-------|
| Avatar Stack (5 users) | Overlapping circular profile photos | **MISSING** | Need 5 professional headshots |
| 5-Star Rating | Gold star icons | **MISSING** | Can use Lucide icons |
| "8k+ trusted" Badge | Trust indicator | **MISSING** | Text + styling |
| Service Checkmarks | Green checkmark icons | **MISSING** | Can use Lucide icons |

**Current localhost has:** `trust-avatars-1.png` through `trust-avatars-5.png` - verify these match live site

---

### 1.3 Video Section Assets

| Asset | Description | Status | Notes |
|-------|-------------|--------|-------|
| Video Thumbnail | LEXGRO logo with play button | **EXISTS** | `video-thumbnail.png` |
| Green Frame Border | Curved dark green container | **STYLING** | CSS implementation |

---

### 1.4 Awards Section Assets

| Asset | Description | Status | Notes |
|-------|-------------|--------|-------|
| Speaks Law Award Photo 1 | Two men with trophy | **EXISTS** | `speaks-award-photo-1.jpg` |
| Speaks Law Award Photo 2 | Man holding award | **EXISTS** | `speaks-award-photo-2.jpg` |
| Revenue Rockstar Trophy | Award statue closeup | **EXISTS** | `speaks-award-photo-3.jpg` |
| Albrecht Law Award | Stage presentation | **EXISTS** | `albrecht-law-award-2024.jpg` |

**Live site layout:** Single full-width dark card with 4 photos in horizontal row

---

### 1.5 Circle of Trust Section Assets

| Asset | Description | Status | Priority |
|-------|-------------|--------|----------|
| Pie Wheel Graphic | 4-segment circular diagram | **CRITICAL** | Must extract or recreate |
| Segment Icons (4) | Briefcase, Calendar, Chart, Monitor | **MISSING** | Green circular icons |
| Center Logo | LEXGRO columns icon | **EXISTS** | Reuse from header |

**Live Site Elements:**
- Top-left: "Hire Vendors & Trained Employees" + briefcase icon
- Top-right: "Evergreen Training for Marketing Personnel" + calendar icon
- Bottom-left: "Chief Marketing Officer - Agency Services" + chart icon
- Bottom-right: "Chief Marketing Officer Coaching & Consulting" + monitor icon

**Extraction Priority:** HIGH - This is a key differentiating visual

---

### 1.6 Solutions Section Assets

| Asset | Description | Status | Priority |
|-------|-------------|--------|----------|
| Benefits Wheel Graphic | 4-segment green wheel | **CRITICAL** | Must extract |
| Wheel Icons (4) | Target, Lightbulb, Briefcase, Chart | **MISSING** | On wheel perimeter |

**Live Site Labels:**
- "Consistent Case Generation" (top-left)
- "Lower Cost per Acquisition" (top-right)
- "Objective Evergreen Training" (bottom-left)
- "Generate Predictable Revenue" (bottom-right)

---

### 1.7 Feature Cards Section Assets (CRITICAL)

These are the most visually impactful missing assets:

#### Card 1: Tailored Growth Process
| Asset | Description | Status |
|-------|-------------|--------|
| 4-Stage Funnel Graphic | Horizontal progress flow | **CRITICAL - MISSING** |
| Stage Icons (4) | Consultation, Strategy, Train, Growth | **MISSING** |
| Progress Dots | Dotted line between stages | **MISSING** |
| Checkmark Badges | "Step-by-Step Growth Success", "Long-Term Growth Strategies" | **MISSING** |

#### Card 2: Practice Area Experts
| Asset | Description | Status |
|-------|-------------|--------|
| Community Network Diagram | Hexagonal arrangement | **CRITICAL - MISSING** |
| Center LEXGRO Icon | Green circle with columns | **EXISTS** |
| Surrounding Icons (5) | Various service icons | **MISSING** |
| Labels | "Networking", "Webinars", "Referral Programs", etc. | Text only |

#### Card 3: CMO Training & Consulting
| Asset | Description | Status |
|-------|-------------|--------|
| Dashboard UI Mockup | Member list interface | **CRITICAL - MISSING** |
| Avatar Photos | Elena Whitmore, Jordan Hale | **MISSING** |
| Feature Tags | "CMO Consulting", "Marketing Plan", "Training Modules", "Actionable Tools" | Text only |

#### Card 4: Vendor & Employee Management
| Asset | Description | Status |
|-------|-------------|--------|
| Vendor Platform UI | Tag cloud interface | **CRITICAL - MISSING** |
| +70% Stat Graphic | Green chart icon | **MISSING** |
| Service Tags | IT Services, Marketing Consultants, etc. | Text only |

---

### 1.8 Testimonials Section Assets

| Asset | Person | Type | Status |
|-------|--------|------|--------|
| Video Thumbnail | Clarke Speaks | Video screenshot | **NEEDS UPDATE** |
| Video Thumbnail | Peter Davis | Video screenshot | **NEEDS UPDATE** |
| Video Thumbnail | Eric Richardson | Video screenshot | **NEEDS UPDATE** |
| Video Thumbnail | Riah Greathouse | Video screenshot | **NEEDS UPDATE** |
| Video Thumbnail | Drew Brown | Video screenshot | **NEEDS UPDATE** |
| Video Thumbnail | Barry Siegel | Video screenshot | **NEEDS UPDATE** |
| Headshot | Clarke Speaks | Circular photo | **EXISTS** |
| Headshot | Peter Davis | Circular photo | **EXISTS** |
| Headshot | Eric Richardson | Circular photo | **EXISTS** |
| Headshot | Riah Greathouse | Circular photo | **EXISTS** |
| Headshot | Drew Brown | Circular photo | **EXISTS** |
| Headshot | Barry Siegel | Circular photo | **EXISTS** |

**Live Site:** Uses actual video frame thumbnails, not just headshots
**Current localhost:** Uses circular headshots with play badges

---

## SECTION 2: Recommended Homepage Section Order

Based on the live lexgro.com structure:

1. **Header/Navigation** - Logo + dropdown menus + "Join the LEXGRO Platform" CTA
2. **Hero Section** - Headline + subtext + dual CTAs + social proof bar
3. **Video Section** - LEXGRO intro video with green frame
4. **Awards Section** - Full-width dark card with 4 award photos
5. **Circle of Trust** - Pie wheel diagram with 4 service quadrants
6. **Problems Section** - Dark background with checkmark list
7. **Solutions Section** - Two-column with benefits wheel graphic
8. **Feature Cards** - 2x2 grid of illustrated feature cards
9. **Testimonials** - 3-column video thumbnail grid
10. **Pricing** - 4-tier pricing cards
11. **FAQ** - Expandable accordion
12. **Blog/Insights** - 3 article cards
13. **Final CTA** - Full-width with Keith's photo
14. **Footer** - Links + contact + social

---

## SECTION 3: Asset Creation Priorities

### Priority 1 - CRITICAL (Block launch)
1. Circle of Trust pie wheel graphic
2. Solutions benefits wheel graphic
3. 4-Stage growth funnel illustration
4. Practice Area Experts network diagram
5. CMO Training dashboard mockup
6. Vendor Management UI mockup

### Priority 2 - HIGH (Major visual impact)
1. Avatar stack component (5 overlapping photos)
2. Video testimonial thumbnails (6 screenshots)
3. Header logo with icon + wordmark

### Priority 3 - MEDIUM (Polish)
1. Service checkmark icons
2. Star rating component
3. Trust badges refinement

---

## SECTION 4: Component Implementation Notes

### Social Proof Bar Component
```
Layout: Horizontal flex container
Elements:
- Avatar stack (5 photos, -8px overlap)
- 5 gold stars + "250+ reviews" text
- "Award winning agency trusted by 8k+" badge
- 4 green checkmarks with service labels
```

### Circle of Trust Component
```
Layout: Centered pie wheel with labels
Wheel: 4 equal segments in light green shades
Icons: 4 green circular icons at segment intersections
Center: LEXGRO logo
Labels: Positioned outside wheel at each quadrant
```

### Feature Cards Grid
```
Layout: 2x2 responsive grid
Card structure:
- Light green/cream background
- Illustration area (60% height)
- Title + description (40% height)
- Subtle shadow and rounded corners
```

---

## SECTION 5: File Organization

```
src/assets/images/
├── logos/
│   ├── lexgro-icon.svg (UPDATE)
│   └── lexgro-wordmark.svg (UPDATE)
├── heroes/
│   ├── trust-avatars-stack.png (NEW)
│   └── video-thumbnail.png (EXISTS)
├── sections/
│   ├── circle-of-trust-wheel.png (NEW)
│   ├── solutions-benefits-wheel.png (NEW)
│   ├── growth-funnel-stages.png (NEW)
│   ├── practice-area-network.png (NEW)
│   ├── cmo-dashboard-mockup.png (NEW)
│   └── vendor-platform-mockup.png (NEW)
├── testimonials/
│   ├── clarke-speaks-video.jpg (NEW)
│   ├── peter-davis-video.jpg (NEW)
│   ├── eric-richardson-video.jpg (NEW)
│   ├── riah-greathouse-video.jpg (NEW)
│   ├── drew-brown-video.jpg (NEW)
│   └── barry-siegel-video.jpg (NEW)
└── awards/
    └── (existing files are good)
```

---

## SECTION 6: Quick Wins (Can implement immediately)

1. **Update header CTA** - Change "Free Audit" to "Join the LEXGRO Platform"
2. **Add dropdown menus** - Services, Resources sections
3. **Consolidate awards layout** - Single card with 4 photos
4. **Update testimonials grid** - Change from 5-column to 3-column
5. **Add social proof bar** - Avatar stack + stars + checkmarks

---

## Next Steps

1. Design team to create/extract the 6 critical illustrations
2. Capture video thumbnails from YouTube testimonials
3. Implement social proof bar component
4. Restructure awards section layout
5. Build feature cards with placeholder graphics
6. Replace placeholders with final illustrations

---

*Document generated from visual comparison of localhost:4322 vs lexgro.com*
