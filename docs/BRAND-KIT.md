# LEXGRO Brand Kit

**Last updated:** 2026-02-19
**Source of truth for:** Colors, typography, logo usage, component patterns, and visual identity.

---

## 1. Logo

### Files

| Variant | File | Dimensions | Use on |
|---------|------|------------|--------|
| Dark wordmark | `src/assets/images/logos/lexgro-wordmark.png` | 6072x1209 | Light backgrounds |
| White wordmark | `src/assets/images/logos/lexgro-wordmark-white.png` | 6072x1209 | Dark backgrounds, overlays |
| Icon (courthouse) | `src/assets/images/logos/lexgro-icon.png` | 208x192 | App icons, small spaces |

### Favicon (X-arrow mark)

Cropped from the X in the wordmark. The green arrow through the dark X is the favicon mark.

| File | Size | Use |
|------|------|-----|
| `public/favicon.ico` | 16x16 + 32x32 | Browser tab |
| `public/favicon-192.png` | 192x192 | Android, PWA |
| `public/favicon-512.png` | 512x512 | PWA manifest |
| `public/apple-touch-icon.png` | 180x180 | iOS home screen |

### Logo Colors

- **Dark wordmark text:** `#4A4A4A`
- **White wordmark text:** `#FFFFFF`
- **Arrow (both variants):** `#6B9B7A` (muted green)

### Rules

- LEXGRO is always written in all caps
- Minimum clear space around logo: equal to the height of the "L"
- Never stretch, rotate, recolor, or add effects to the logo
- Never place the dark logo on a dark background or the white logo on a light background

---

## 2. Color Palette

### Primary Colors (Green System)

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| **Primary Green** | `#298C42` | `--color-primary` | Buttons, links, accents, list markers |
| **Primary Dark** | `#1F8238` | `--color-primary-dark` | Hover and active states |
| **Primary Light** | `#3DA056` | `--color-primary-light` | Light variant |
| **Teal** | `#1AA774` | `--color-teal` | Secondary green, gradient endpoints |
| **Mint** | `#25B97B` | `--color-mint` | OG image accent lines, category labels |

### Accent Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| **Orange** | `#FF8158` | `--color-accent` | Highlights, warning blocks |
| **Orange Dark** | `#E56A42` | `--color-accent-dark` | Orange hover state |
| **Purple** | `#673AE4` | `--color-accent-purple` | Podcast, special accents |
| **Blue** | `#75ACFF` | `--color-accent-blue` | Info states |

### Neutral/Slate

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| **Slate** | `#64748b` | `--color-slate` | Section badges, neutral muted UI |
| **Slate Light** | `#94a3b8` | `--color-slate-light` | Light neutral |
| **Slate Dark** | `#475569` | `--color-slate-dark` | Dark neutral |

### Background Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| **Dark** | `#011907` | `--color-bg-dark` | Heroes, footer, dark sections |
| **Dark Alt** | `#233B29` | `--color-bg-dark-alt` | Alternative dark bg |
| **Light Section** | `#fafafa` | (use literal value) | Alternating light sections. **Never use `var(--color-bg-light)` for this.** |
| **Light Green** | `#C0E9CA` | `--color-bg-light` | Light green tint (sparingly) |
| **Lighter Green** | `#D6FFE0` | `--color-bg-lighter` | Very light green |

### Text Colors

| Name | Hex | CSS Variable | Context | WCAG |
|------|-----|-------------|---------|------|
| **Body Text** | `#212121` | `--color-text-dark` | On white/light backgrounds | AAA (16.1:1) |
| **Muted on Light** | `#4b5563` | `--color-text-muted` | On `#fafafa` or white | AAA (7.5:1) |
| **Muted on Dark** | `#b0b8b3` | (literal) | On `#011907` dark sections | AA (4.8:1) |
| **Muted on CTA** | `#b0b8b3` | (literal) | On CTA gradient bg | AA (4.7:1) |
| **White** | `#FFFFFF` | n/a | On dark backgrounds | AAA (17.8:1 on `#011907`) |
| **Sage** | `#779B80` | `--color-text-light` | Decorative only. **Fails WCAG for readable text.** |

### Borders

| Name | Value | CSS Variable |
|------|-------|-------------|
| **Default** | `rgba(41, 140, 66, 0.12)` | `--color-border` |
| **Strong** | `rgba(41, 140, 66, 0.25)` | `--color-border-dark` |

### Key Gradients

| Name | Value | Usage |
|------|-------|-------|
| **CTA** | `linear-gradient(135deg, #0d3d1a 0%, #1a5c2e 100%)` | Bottom-of-page CTA sections |
| **Card Top Border** | `linear-gradient(135deg, #298C42 0%, #1AA774 100%)` | 3px top border on cards |
| **Section Badge** | `linear-gradient(135deg, rgba(100,116,139,0.12) 0%, rgba(100,116,139,0.06) 100%)` | Slate pill badges |
| **Hero Dark** | `linear-gradient(135deg, #011907 0%, #233B29 100%)` | Hero section fallback bg |

### Semantic Colors

| State | Hex | Notes |
|-------|-----|-------|
| Success | `#298C42` | Same as primary green |
| Warning | `#FFBC00` | Yellow-orange |
| Error | `#FF8158` | Same as accent orange |
| Info | `#75ACFF` | Light blue |

---

## 3. Typography

### Font Stack

Loaded from Google Fonts: `Inter` weights 400, 500, 600, 700, 800.

| Role | CSS Variable | Value |
|------|-------------|-------|
| **Primary** | `--font-primary` | `'Inter', system-ui, -apple-system, sans-serif` |
| **Display** | `--font-display` | `'Inter', system-ui, sans-serif` |
| **OG Headings** | (image compositing) | `Be Vietnam Pro` |
| **OG Body** | (image compositing) | `DM Sans` |

### Type Scale

| Name | Size | Px | Usage |
|------|------|----|-------|
| xs | 0.75rem | 12 | Fine print, labels |
| sm | 0.875rem | 14 | Captions, small text, references |
| base | 1rem | 16 | Body text minimum |
| lg | 1.0625rem | 17 | Prose body (guides, blogs) |
| xl | 1.125rem | 18 | Lead text |
| 2xl | 1.375rem | 22 | Small headings |
| 3xl | 1.625rem | 26 | H2 in prose |
| 4xl | 2.25rem | 36 | Section headings |
| 5xl | 3rem | 48 | Page headings |
| 6xl | 3.75rem | 60 | Hero headings (desktop) |
| hero | `clamp(2rem, 5vw, 3.75rem)` | 32-60 | Responsive hero titles |

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text |
| Medium | 500 | Standard weight, nav links |
| Semibold | 600 | Emphasized text, subheads, links |
| Bold | 700 | Headings, strong text, section badges |
| Extrabold | 800 | Hero headings, display text |

### Line Heights

| Name | Value | Usage |
|------|-------|-------|
| tight | 1.15-1.2 | Hero headings, display |
| snug | 1.3 | Subheadings |
| normal | 1.45 | Body text |
| relaxed | 1.5-1.6 | Lead paragraphs, descriptions |
| prose | 1.7 | Guide/blog content |

### Letter Spacing

| Name | Value | Usage |
|------|-------|-------|
| display | -0.02em | Hero headings |
| heading | -0.01em | H2, H3 |
| normal | 0 | Body text |
| wide | 0.05em | Uppercase labels |
| badge | 0.08em | TOC title, card labels |
| section-badge | 0.2em | Section pill badges |

---

## 4. Component Patterns

### Dark Hero

Every page has a dark hero with optional background image.

```css
background: linear-gradient(135deg, #011907 0%, #233B29 100%);
/* or with background image: */
.hero-bg { position: absolute; inset: 0; object-fit: cover; z-index: 0; }
.hero-overlay { position: absolute; inset: 0; z-index: 1; /* gradient overlay */ }
.hero-content { position: relative; z-index: 2; }
```

Hero overlay opacity by page type:

| Page Type | Left (0%) | Center (40%) | Right (100%) |
|-----------|-----------|-------------|-------------|
| Homepage | `rgba(1,25,7, 0.65)` | `rgba(1,25,7, 0.6)` | `rgba(1,25,7, 0.5)` |
| Guides | `rgba(1,25,7, 0.92)` | `rgba(1,25,7, 0.88)` | `rgba(1,25,7, 0.82)` |
| Blog posts | `rgba(1,25,7, 0.82)` | `rgba(1,25,7, 0.75)` | `rgba(1,25,7, 0.65)` |
| Static pages | `rgba(1,25,7, 0.85)` | `rgba(1,25,7, 0.78)` | `rgba(1,25,7, 0.68)` |

### Section Badge (Pill)

```css
display: inline-block;
font-size: 0.6875rem;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.2em;
color: #64748b;
background: linear-gradient(135deg, rgba(100,116,139,0.12) 0%, rgba(100,116,139,0.06) 100%);
padding: 0.5rem 1rem;
border-radius: 100px;
border: 1px solid rgba(100,116,139,0.15);
```

### Cards

```css
background: white;
border-radius: 16px;              /* never approximate */
box-shadow: 0 4px 24px rgba(0,0,0,0.04);  /* never approximate */
/* Green gradient top border: */
border-top: 3px solid;
border-image: linear-gradient(135deg, #298C42 0%, #1AA774 100%) 1;
```

### CTA Section

```css
background: linear-gradient(135deg, #0d3d1a 0%, #1a5c2e 100%);
/* Muted text: #b0b8b3 */
/* Buttons: white bg, green text */
```

### Buttons

```css
/* Primary */
background: #298C42;
color: white;
padding: 0.75rem 1.5rem;
border-radius: 10px;
font-weight: 600;
/* Hover: #1F8238, translateY(-1px) */

/* Secondary (outline) */
color: #298C42;
border: 2px solid #298C42;
background: transparent;
/* Hover: filled green bg, white text */

/* White (on dark bg) */
background: white;
color: #298C42;
box-shadow: 0 4px 16px rgba(0,0,0,0.1);
```

### Light Sections

```css
background: #fafafa;  /* ALWAYS use literal value, never var(--color-bg-light) */
```

---

## 5. Layout

### Containers

| Name | Width | Usage |
|------|-------|-------|
| Max | 1440px | Outer boundary |
| Content | 1200px | Standard content |
| Narrow | 800px | Prose, blog, guides |
| Container padding | `0 1.5rem` | Horizontal gutter |

### Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| Mobile | 810px | Mobile-first breakpoint |
| Tablet | 1024px | Sidebar layout switch (guides) |
| Desktop | 1200px | Full grid layouts |
| Max | 1440px | Max container width |

### Spacing Scale

| Token | rem | px |
|-------|-----|----|
| 1 | 0.25 | 4 |
| 2 | 0.5 | 8 |
| 3 | 0.75 | 12 |
| 4 | 1 | 16 |
| 6 | 1.5 | 24 |
| 8 | 2 | 32 |
| 12 | 3 | 48 |
| 16 | 4 | 64 |
| 20 | 5 | 80 |

### Border Radii

| Name | Value | Usage |
|------|-------|-------|
| stat-item | 8px | Hero stat items |
| button | 10px | Buttons |
| card | **16px** | All cards (critical, never approximate) |
| pill | 100px | Section badges |
| full | 9999px | Circles, avatars |

### Shadows

| Name | Value | Usage |
|------|-------|-------|
| card | `0 4px 24px rgba(0,0,0,0.04)` | All cards (critical) |
| soft | `rgba(13,18,14,0.05) 0px 4px 6px -1.8px, rgba(13,18,14,0.06) 0px 9px 14px -2.7px` | General elevation |
| button | `inset 0px 1px 0px 0px rgba(255,255,255,0.25), 0px 4px 11px -5px rgba(26,61,35,0.1)` | Button elevation |

### Transitions

| Name | Duration | Usage |
|------|----------|-------|
| fast | 150ms ease | Hover states |
| normal | 250ms ease | Standard transitions |
| slow | 350ms ease | Layout shifts |

---

## 6. Photography

### Style

- **Aesthetic:** 35mm documentary film photography
- **Era:** 1970s to 1990s corporate/editorial
- **Film stocks:** Kodak Portra 400, Kodak Gold 200, Kodak Ektar, Fuji Pro 400H
- **Characteristics:** Natural grain, warm muted tones, imperfect authenticity

### Subject Matter

- Executive boardrooms, corner offices, professional workspaces
- Natural light through windows (golden hour preferred)
- Empty spaces suggesting recent activity (coffee cup, chair pushed back)
- Architectural elements (glass, wood, plants)
- No people, no faces, no readable text, no logos

### Prompt Template

```
[Subject/setting], [lighting conditions], [atmospheric details],
[era reference] documentary style, [film stock],
[grain/color characteristics], no people, no text, no logos,
[mood/atmosphere description]
```

### Generation

- **Model:** `gemini-2.0-flash-exp-image-generation` (never change)
- **OG images:** 1200x630 with dark overlay, text, logo composite
- **Card images:** 800x450 with same composite
- **Editorial images:** 1200x675 JPEG, no composite overlay
- **Response modalities:** `['TEXT', 'IMAGE']`

---

## 7. OG Image Composite

### Layer Stack

1. AI-generated film photography background
2. Dark diagonal overlay (90% bottom-left to 30% top-right)
3. 6px green accent bar on left edge (`#298C42`)
4. Text: category label, title, CTA button
5. White LEXGRO wordmark (bottom-right)
6. "lexgro.com" branding (bottom-left, 50% opacity)

### OG Typography

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Accent line | 50px wide, 4px tall | n/a | `#25B97B` mint |
| Category | 13px | 700, uppercase, 0.3em spacing | `#25B97B` mint |
| Title | 56px (OG) / 42px (card) | 800, -0.02em | white |
| CTA button | 16px | 600 | white on `#298C42` |
| Branding | 14px | 600, 0.12em, uppercase | white at 50% |

---

## 8. Accessibility

### WCAG 2.1 AA Minimum

| Combination | Ratio | Grade |
|-------------|-------|-------|
| `#212121` on `#ffffff` | 16.1:1 | AAA |
| `#212121` on `#fafafa` | 15.7:1 | AAA |
| `#4b5563` on `#ffffff` | 7.5:1 | AAA |
| `#4b5563` on `#fafafa` | 7.4:1 | AAA |
| `#b0b8b3` on `#011907` | 4.8:1 | AA |
| `#b0b8b3` on `#0d3d1a` | 4.7:1 | AA |
| `#ffffff` on `#011907` | 17.8:1 | AAA |
| `#ffffff` on `#0d3d1a` | 14.6:1 | AAA |

### Rules

- Minimum body font: 16px
- Minimum touch target: 44x44px
- All images need alt text (decorative: `alt=""`)
- Respect `prefers-reduced-motion`
- Visible focus indicators on all interactive elements
- Never use `#779B80` sage for readable text (fails WCAG)

---

## 9. File Reference

### Design Tokens (Code)

```
src/lib/theme/tokens.ts          # All design tokens as TypeScript constants
src/layouts/BaseLayout.astro     # CSS custom properties (lines 160-200)
```

### Logo Assets

```
src/assets/images/logos/
├── lexgro-wordmark.png           # Dark wordmark (6072x1209)
├── lexgro-wordmark-white.png     # White wordmark (6072x1209)
└── lexgro-icon.png               # Courthouse icon (208x192)
```

### Favicon Assets

```
public/
├── favicon.ico                   # 16+32px ICO
├── favicon-192.png               # 192px PNG
├── favicon-512.png               # 512px PNG
└── apple-touch-icon.png          # 180px PNG
```

### Image Generation

```
src/lib/og/prompts.ts             # All OG and card image prompts
scripts/generate-all-og.ts        # OG + card batch generation
scripts/generate-editorial-images.ts  # Editorial in-content images
docs/OG-IMAGE-STYLE-GUIDE.md     # Detailed OG image reference
```
