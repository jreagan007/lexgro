# LEXGRO Editorial Image Prompts for Gemini

## Brand Visual Identity Guidelines
- **Style**: Clean, modern, enterprise editorial photography
- **Color Palette**: Deep forest green (#298C42), white, soft mint accents
- **Mood**: Professional, trustworthy, growth-oriented, partnership-focused
- **Subjects**: Law firm environments, professional settings, collaborative meetings
- **Avoid**: Stock photo clichés, cheesy handshakes, obvious poses

---

## 1. Video Section Background
**Current Issue**: Plain logo thumbnail, lacks visual interest

**Prompt for Gemini**:
```
Editorial photograph of a modern law firm conference room with floor-to-ceiling windows, natural light streaming in, soft morning light, a polished wooden table with legal documents and a laptop showing growth charts, blurred city skyline in background, muted green color grading, cinematic 16:9 aspect ratio, shallow depth of field, professional corporate photography style
```

---

## 2. Circle of Trust Section
**Current Issue**: Awkward circular graphic with orbiting icons

**Prompt for Gemini - Main Visual**:
```
Aerial view editorial photograph of diverse professionals seated around a circular conference table, collaborative meeting atmosphere, warm natural lighting from above, documents and tablets on table, hands gesturing in discussion, shot from directly above creating a circular composition, soft shadows, muted forest green and cream color palette, professional corporate photography
```

**Alternative - Partnership Handshake**:
```
Close-up editorial photograph of two professionals' hands shaking over legal documents on a mahogany desk, soft bokeh background of a law office with bookshelves, warm side lighting, shallow depth of field, focus on the handshake, green plant slightly visible in background, muted professional color grading
```

---

## 3. Problems Section Background
**Current Issue**: Dark green background feels flat, needs visual depth

**Prompt for Gemini**:
```
Abstract editorial photograph of a lawyer looking pensively out a rain-streaked window, moody blue-grey lighting, reflection visible in glass, blurred city lights in background, contemplative atmosphere suggesting challenges, cinematic color grading with cool tones, professional portrait photography style, slight vignette
```

---

## 4. Solutions Section Visual
**Current Issue**: Benefits wheel graphic looks dated and generic

**Prompt for Gemini - Growth Visual**:
```
Editorial photograph of a thriving indoor plant growing from a stack of legal books on a polished desk, morning sunlight creating dramatic shadows, symbolizing growth and knowledge, shallow depth of field, soft green and cream color palette, clean minimalist composition, professional product photography style
```

**Alternative - Success Dashboard**:
```
Over-the-shoulder editorial photograph of a law firm partner viewing analytics dashboard on large monitor, graphs showing upward trends, modern office environment, soft backlighting from window, blurred background with law books, professional and successful atmosphere, cinematic color grading
```

---

## 5. Practice Area Experts Section
**Current Issue**: Generic colored circles for community avatars

**Prompt for Gemini - Community Visual**:
```
Editorial photograph of a professional networking event for lawyers, small group engaged in animated discussion, name badges visible, modern conference venue with ambient lighting, candid moment of knowledge sharing, warm professional atmosphere, shallow depth of field focusing on the main group, event photography style
```

**Alternative - Expert Panel**:
```
Editorial photograph of a panel discussion at a legal conference, three professionals seated at a modern table with microphones, engaged audience partially visible in foreground blur, professional stage lighting, confident experts sharing knowledge, corporate event photography style, wide angle composition
```

---

## 6. Training Section Visual
**Current Issue**: Module list card could use supporting imagery

**Prompt for Gemini**:
```
Editorial photograph of a professional taking notes during an online training session, laptop screen showing presentation slides, notebook and pen on desk, home office or modern workspace setting, natural side lighting, focused learning atmosphere, shallow depth of field, warm professional color grading
```

---

## 7. Vendor Hub Section Visual
**Current Issue**: List card could use supporting imagery

**Prompt for Gemini**:
```
Editorial photograph of professionals reviewing vendor proposals at a conference table, documents spread out with highlight marks, collaborative decision-making atmosphere, modern meeting room, soft overhead lighting, tablets and coffee cups visible, candid business meeting photography style
```

---

## Card Overlay Treatments

### Style 1: Gradient Overlay
- Apply 60% opacity gradient from bottom (dark green #1a3d2e) to transparent
- White text with subtle drop shadow for readability
- Use for testimonial cards, blog cards

### Style 2: Frosted Glass
- CSS backdrop-filter: blur(12px) with rgba(255,255,255,0.85) background
- Subtle border with rgba(255,255,255,0.2)
- Use for feature cards, stat cards

### Style 3: Accent Border
- Thin left border (4px) in primary green
- Clean white card with subtle shadow
- Use for checklist items, FAQ items

---

## Color Usage Guidelines

### Primary Actions
- Background: #298C42 (Forest Green)
- Hover: #1e6b32 (Darker Green)
- Text: White

### Secondary Actions
- Background: Transparent
- Border: #298C42
- Text: #298C42
- Hover: Fill with #f0f9f4 (Light Mint)

### Section Backgrounds
- Light sections: #f8faf9 (Off-white with green tint)
- Dark sections: #1a3d2e (Deep Forest)
- Accent sections: Linear gradient from #f0f9f4 to white

### Contrast Principles
- Dark backgrounds: White or #c0e9ca (Light Mint) text
- Light backgrounds: #1a1a1a (Near Black) or #298C42 text
- Never use pure black (#000) - always soften

---

## Implementation Priority

1. **Circle of Trust** - Replace awkward graphic with editorial photo + cleaner layout
2. **Problems/Solutions** - Add editorial imagery, improve visual hierarchy
3. **Practice Area Experts** - Replace colored circles with professional community visual
4. **Video Section** - Better thumbnail treatment
5. **Training/Vendor Sections** - Supporting editorial imagery
