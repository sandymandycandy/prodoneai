# prodone.ai — Design & Code Styleguide

> **Stack:** React 19 · Vite · Framer Motion · GSAP · Three.js · Lenis smooth scroll · React Router v7

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Design Tokens](#2-design-tokens)
3. [Typography](#3-typography)
4. [Color & Glassmorphism](#4-color--glassmorphism)
5. [Spacing & Radius](#5-spacing--radius)
6. [Components](#6-components)
7. [Animation Conventions](#7-animation-conventions)
8. [Layout System](#8-layout-system)
9. [Responsive Breakpoints](#9-responsive-breakpoints)
10. [Code Conventions](#10-code-conventions)

---

## 1. Design Philosophy

The site uses a **"Liquid Glass Dark"** aesthetic — a premium, high-contrast dark theme built around:

- ⬛ **Deep black backgrounds** (`#000`, `#050508`) with a subtle violet-tinted radial glow at the top
- 🔲 **Frosted glass cards** using `backdrop-filter: blur()` with thin white borders
- ✨ **Monochrome + glow** color language — white typography, colored glow orbs (purple / blue / teal / pink)
- 🎞️ **Cinematic motion** — every element enters with a smooth Framer Motion fade + slide
- 📐 **Tight typographic grid** — `letter-spacing: -0.03em` on headings, ultra-high `font-weight: 800–900`

> ⚠️ **Rule:** Never use flat/solid backgrounds for cards — always use translucent glass layers. Never use saturated primary colors (red, blue, green) — use the glow palette instead.

---

## 2. Design Tokens

All tokens live in `src/index.css` inside `:root { }`. Reference them via `var(--token-name)`.

### 2.1 Backgrounds

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#000` | Page body |
| `--bg-deep` | `#050508` | Loader, deep overlays |
| `--bg-card` | `rgba(255,255,255,0.04)` | Default card surface |

### 2.2 Glass Layers

| Token | Value | Usage |
|---|---|---|
| `--glass-1` | `rgba(255,255,255,0.04)` | Default card bg |
| `--glass-2` | `rgba(255,255,255,0.07)` | Hover state card bg |
| `--glass-3` | `rgba(255,255,255,0.11)` | Active / pressed state |
| `--glass-border` | `rgba(255,255,255,0.10)` | Default card border |
| `--glass-border-bright` | `rgba(255,255,255,0.22)` | Hover state border |
| `--glass-shine` | `rgba(255,255,255,0.18)` | `inset 0 1px 0` top sheen |

### 2.3 Glow Palette

| Token | Value | Best used for |
|---|---|---|
| `--glow-purple` | `rgba(110,60,240,0.55)` | Hero / primary feature orbs |
| `--glow-blue` | `rgba(40,120,255,0.45)` | Data / stats orbs |
| `--glow-teal` | `rgba(0,200,180,0.35)` | Success / positive metrics |
| `--glow-pink` | `rgba(220,60,160,0.35)` | Accent / creative elements |

### 2.4 Text

| Token | Value | Usage |
|---|---|---|
| `--text-bright` | `#ffffff` | Headings, key numbers |
| `--text-mid` | `rgba(255,255,255,0.55)` | Body copy, sub-labels |
| `--text-dim` | `rgba(255,255,255,0.28)` | Captions, metadata |

---

## 3. Typography

### 3.1 Font Families

```css
--font:      'Space Grotesk', sans-serif;  /* Headings, UI labels, buttons */
--font-body: 'Inter', sans-serif;          /* Body paragraphs only */
```

Both are loaded from Google Fonts at the top of `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
```

### 3.2 Type Scale

| Element | Font-size | Weight | Letter-spacing | Family |
|---|---|---|---|---|
| `h1` — Hero | `clamp(38px, 4.8vw, 72px)` | 800–900 | `-0.03em` | Space Grotesk |
| `h2` — Section | `clamp(36px, 5vw, 64px)` | 800 | `-0.03em` | Space Grotesk |
| `h3` — Card title | `20px` | 700 | `-0.02em` | Space Grotesk |
| `p` — Body | `15–17px` | 400 | normal | Inter |
| `.section-label` | `10px` | 700 | `0.14em` | Space Grotesk |
| Captions / meta | `9–11px` | 600 | `0.06–0.12em` | Space Grotesk |
| Stat number (large) | `clamp(60px, 8vw, 96px)` | 900 | `-0.04em` | Space Grotesk |

### 3.3 Gradient Text

Use the `.gradient-text` utility class, or this inline JSX pattern:

```jsx
<span style={{
  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.45) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}}>
  Highlighted Word
</span>
```

---

## 4. Color & Glassmorphism

### 4.1 The Liquid Glass Formula

Every card / panel follows this exact recipe:

```css
background:       rgba(255,255,255,0.04);        /* --glass-1 */
border:           1px solid rgba(255,255,255,0.10); /* --glass-border */
border-radius:    22px–28px;
backdrop-filter:  blur(12px–22px);
-webkit-backdrop-filter: blur(12px–22px);
box-shadow:
  0 8px 40px rgba(0,0,0,0.4),
  inset 0 1px 0 rgba(255,255,255,0.10);          /* top sheen */
```

Always add the 1px top-shine pseudo-element on prominent cards:

```css
.my-card::before {
  content: '';
  position: absolute;
  top: 0; left: 20%; right: 20%; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
}
```

### 4.2 Glow Orbs

Place 1–2 blurred radial-gradient divs behind every major section or card:

```jsx
<div style={{
  position: 'absolute',
  width: '50%', height: '50%',
  background: 'rgba(110,60,240,0.35)',   /* pick from glow palette */
  borderRadius: '50%',
  filter: 'blur(60px)',
  opacity: 0.55,
  pointerEvents: 'none',
  zIndex: 0,
  animation: 'orbPulse 6s ease-in-out infinite',
}} />
```

### 4.3 Body Background Texture

The global `body` combines:

1. A top-center violet radial gradient (ambient page glow)  
2. A subtle `80×80px` grid of 1px lines at `opacity: 0.022`  
3. A fixed SVG fractal-noise grain overlay at `opacity: 0.018`

Do not override or remove these on new pages.

---

## 5. Spacing & Radius

### 5.1 Border Radius Tokens

| Token | Value | Used on |
|---|---|---|
| `--r-sm` | `14px` | Chips, tags, small badges |
| `--r-md` | `22px` | Standard glass cards |
| `--r-lg` | `32px` | Large panels |
| `--r-xl` | `48px` | Hero-scale feature cards |
| `50px` (hardcoded) | — | All pill buttons |

> Video card uses `28px`; CTA blocks use `24px`— these are per-component decisions.

### 5.2 Section & Container

```css
.section    { padding: 80px 0; }   /* ≤768px → 72px · ≤480px → 56px */
.container  {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 64px;                 /* ≤1200px → 40px · ≤768px → 20px · ≤480px → 16px */
}
```

### 5.3 Common Component Padding

| Component | Padding |
|---|---|
| Glass card (default) | `40px 36px` |
| `.btn-primary` | `14px 30px` (hero CTA: `16px 34px`) |
| `.btn-ghost` | `13px 26px` |
| `.btn-outline` | `13px 28px` |
| `.section-label` | `7px 18px` |
| `.tool-chip` | `12px 20px` |
| Hero stat chip | `16px 22px` |

---

## 6. Components

### 6.1 Buttons

#### `.btn-primary` — Primary CTA
Solid white pill, black text.

```html
<button class="btn-primary">Get Started</button>
```

- Background: `#fff` · Color: `#000` · Border-radius: `50px`
- Hover: `translateY(-3px) scale(1.04)` + white glow shadow
- Has a shimmer `::after` overlay that fades in on hover

---

#### `.btn-ghost` — Secondary Action
Frosted glass pill.

```html
<button class="btn-ghost">See Examples</button>
```

- Background: `--glass-1` · Border: `1px solid --glass-border`
- `backdrop-filter: blur(12px)`
- Hover: bg → `--glass-2`, border → bright, `translateY(-2px)`

---

#### `.btn-outline` — Tertiary Action
Transparent with a white border.

```html
<button class="btn-outline">Learn More →</button>
```

- Border-radius: `50px`
- Hover: slight white tint fill + brighter border + subtle glow

> On screens `≤ 400px` all three button variants go full-width automatically.

---

### 6.2 `.glass-card` — Card Container

```html
<div class="glass-card">...</div>
```

- Hover: `translateY(-6px)` lift + brighter border + deeper shadow
- The `::before` top-shine is already included globally
- Add `.glass-card-gpu` when the card contains heavy backdrop-filter content

---

### 6.3 `.section-label` — Badge Above Headings

```jsx
<div className="section-label">CASE STUDIES</div>
```

- Animated pulsing dot via `::before` + `@keyframes pulse-dot`
- Font: 10px, weight 700, `letter-spacing: 0.14em`, `uppercase`
- Always placed directly above the section `h2`, with `margin-bottom: 24px–32px`

---

### 6.4 `.tool-chip` — Integration Logo Chip

```html
<div class="tool-chip">
  <img src="tool-logo.svg" alt="Tool Name" />
  <span>Notion</span>
</div>
```

- Min-width: `150px` (mobile: `120px`)
- Hover: `translateY(-3px) scale(1.02)` + brighter border

---

### 6.5 `.stat-number` — Metric Highlight

```html
<span class="stat-number">98%</span>
```

- `font-size: 3rem`, `font-weight: 900`
- White gradient fill via `--grad-white`

---

### 6.6 `.section-divider` — Horizontal Rule

```html
<div class="section-divider"></div>
```

- `height: 1px`
- Fades in and out at the edges: `linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)`

---

### 6.7 `.grid-overlay` — Subtle Grid

```html
<div class="grid-overlay"></div>
```

- Absolute-positioned inside a `position: relative` section
- `80×80px` grid lines at `rgba(255,255,255,0.025)`
- `pointer-events: none; z-index: 0`

---

### 6.8 Loader (`App.jsx`)

- Full-screen fixed overlay: `background: #050508`
- Central glass panel: logo + brand name + 2px progress bar
- Exit: Framer Motion `AnimatePresence` with `exit={{ opacity:0, scale:1.05 }}`
- Progress bar glow: `boxShadow: '0 0 10px rgba(255,255,255,0.8)'`

---

### 6.9 Marquee (Integration section)

```html
<div class="marquee-track">
  <div class="marquee-content marquee-forward">...</div>
</div>
<div class="marquee-track">
  <div class="marquee-content marquee-reverse">...</div>
</div>
```

- Pauses on hover via `animation-play-state: paused`
- Forward row: 32s duration · Reverse row: 26s duration

---

## 7. Animation Conventions

### 7.1 Standard Entry Pattern (Framer Motion)

```jsx
const ref = useRef(null)
const inView = useInView(ref, { once: true, margin: '-80px' })

// Label badge
<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 16 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.7 }}
  className="section-label"
/>

// Section heading
<motion.h2
  initial={{ opacity: 0, y: 32 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ delay: 0.1, duration: 0.8 }}
/>

// Body copy
<motion.p
  initial={{ opacity: 0, y: 18 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ delay: 0.2 }}
/>
```

Always use `once: true` — never re-trigger enter animations on scroll-back.

### 7.2 Hero / Mount Animations

For above-the-fold elements that animate immediately (no scroll trigger):

```jsx
<motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
/>
```

### 7.3 Project-wide Easing

```js
ease: [0.23, 1, 0.32, 1]   // custom cubic-bezier — fast start, silky landing
```

Transition durations: `0.7s – 1.1s` for major elements, `0.3–0.5s` for hover states.

### 7.4 CSS Keyframes (for decorative loops)

Defined globally in `src/index.css` — use CSS, not Framer Motion, for looping ambient elements:

```css
/* Glow orb pulse */
@keyframes orbPulse {
  0%, 100% { transform: scale(1);    opacity: 0.5;  }
  50%       { transform: scale(1.14); opacity: 0.75; }
}

/* Hero video card orbs */
@keyframes heroGlowFloat {
  0%, 100% { transform: translateY(0) scale(1);    opacity: 0.55; }
  50%       { transform: translateY(-18px) scale(1.12); opacity: 0.8; }
}

/* Section label dot */
@keyframes pulse-dot {
  0%, 100% { opacity: 1;   transform: scale(1);   }
  50%       { opacity: 0.3; transform: scale(0.6); }
}
```

### 7.5 Hover Transforms — Standard Values

| Component | Transform on hover |
|---|---|
| Large card (CaseCard) | `translateY(-8px) scale(1.02)` |
| Standard glass card | `translateY(-6px)` |
| `.btn-primary` | `translateY(-3px) scale(1.04)` |
| `.btn-ghost` / `.btn-outline` | `translateY(-2px)` |
| `.tool-chip` | `translateY(-3px) scale(1.02)` |

### 7.6 Delay Stagger Pattern

For sequential sibling elements, stagger `delay` by index:

```jsx
// Section header sequence
// label:  delay 0
// h2:     delay 0.1
// p:      delay 0.2
// CTA:    delay 0.3–0.4

// Array of cards / items
transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
```

### 7.7 Spring Animations (Floating Badges)

```jsx
<motion.div
  initial={{ opacity: 0, scale: 0.6 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, delay: 1.3, type: 'spring', bounce: 0.45 }}
/>
```

### 7.8 Scroll Indicator

```jsx
<motion.div
  animate={{ y: [0, 8, 0] }}
  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
>
  {/* mouse / chevron icon */}
</motion.div>
```

---

## 8. Layout System

### 8.1 Page Shell (`App.jsx`)

```
Router
 └─ AnimatePresence
     └─ Loader (until mounted, then fades out)
 └─ motion.div (page fade in)
     ├─ GlobalParticles   ← full-screen canvas, behind everything
     ├─ Navbar            ← fixed top
     ├─ Suspense fallback=<PageSkeleton>
     │   └─ Routes: Home | Pilot
     ├─ Footer
     └─ Chatbot           ← fixed bottom-right
```

### 8.2 Section Template

```jsx
<section id="section-id" style={{ position: 'relative', padding: '72px 0', overflow: 'hidden' }}>

  {/* 1. Ambient glow (absolute, behind content) */}
  <div style={{ position: 'absolute', ... }} />

  {/* 2. Content wrapper */}
  <div className="container" style={{ position: 'relative', zIndex: 1 }}>

    {/* 3. Section header: label → h2 → p (centered, maxWidth: 700) */}
    <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 72px' }}>
      <div className="section-label">LABEL</div>
      <h2>Title <span style={{ ...gradientText }}>Accent</span></h2>
      <p>Supporting description.</p>
    </div>

    {/* 4. Content grid */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
      {items.map(...)}
    </div>

  </div>
</section>
```

### 8.3 Common Grid Templates

| Section | Grid | Gap |
|---|---|---|
| Hero | `1fr 1fr` (copy + visual) | `80px` |
| CaseStudies | `repeat(2, 1fr)` | `28px` |
| Pilot — Results | `repeat(4, 1fr)` | (auto) |
| Pilot — Deliverables | `repeat(3, 1fr)` | (auto) |
| HowItWorks | `repeat(3, 1fr)` | (auto) |

### 8.4 Z-index Layers

| z-index | What lives here |
|---|---|
| `0` | Background glow orbs, grid overlay |
| `1–2` | Section content |
| `3–4` | In-card overlays (top bar, badges inside a card) |
| `10` | Hero content (above all backgrounds) |
| `9999` | Noise grain (fixed, always on top of content) |
| `99999` | Loader (topmost) |

---

## 9. Responsive Breakpoints

| Breakpoint | Target | Key layout changes |
|---|---|---|
| `≤ 1200px` | Large laptop | Container padding → `40px` |
| `≤ 900px` | Tablet landscape | Hero / Pilot grids → 1 col; Compare → 1 col; Results → 2 col |
| `≤ 768px` | Tablet portrait | Container → `20px`; `h1`/`h2` clamp smaller; footer stacks; cases → 1 col |
| `≤ 600px` | Large phone | Container → `16px`; Hero padding-top → `100px`; video card → `360px` |
| `≤ 480px` | Phone | Sections → `56px` vertical; Pilot results → 1 col; buttons stack |
| `≤ 400px` | Small phone | Results → 1 col; all buttons → `width: 100%` |

> Typography uses `clamp()` throughout, so font sizes scale fluidly — media query overrides are only needed for layout structure.

---

## 10. Code Conventions

### 10.1 Component File Structure

```jsx
// ── 1. Imports (React hooks → Framer Motion → local) ──────────────────
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

// ── 2. Sub-components (before main export) ────────────────────────────
function SubCard({ prop }) {
  // ...
}

// ── 3. Main default export ────────────────────────────────────────────
export default function SectionName() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const data = [ /* static data arrays defined inside component */ ]

  return ( /* JSX */ )
}
```

### 10.2 Global CSS Class vs Inline Style

| Use `.class` (global CSS) for | Use `style={{}}` (inline) for |
|---|---|
| Reusable primitives: `.btn-primary`, `.glass-card`, `.section-label`, `.tool-chip` | One-off per-component layout: grid columns, specific padding values |
| Responsive overrides | Framer Motion animated values |
| Scrollbar, selection, body background | Dynamic values derived from state or props |
| `@keyframes` animations on decorative elements | Component-specific hover (via Framer Motion `whileHover`) |

### 10.3 i18n — Language Context

All user-visible strings go through the `useLanguage()` context hook:

```jsx
const { t, lang, translations } = useLanguage()

// Single translated string
t('hero.badge')
t('hero.cta')

// Full array from the translation object
const cases = translations[lang].caseStudies.cases
```

**Never hardcode English strings directly in JSX.** Every text node must use `t()`.

### 10.4 Performance Rules

| Rule | How |
|---|---|
| GPU-promote animated elements | `willChange: 'transform, opacity'` on hero cards and orbs |
| Off-screen sections | `content-visibility: auto` (already set globally via `section + section`) |
| Disable heavy blur on low-end / mobile | Global CSS handles `@media (prefers-reduced-motion), (max-width: 480px)` |
| Prefer CSS for decorative loops | Use `@keyframes orbPulse` instead of Framer Motion repeating animations |
| Code-split pages | Use `lazy()` + `Suspense` for all page components |
| Particle canvas | `ParticleCanvas` is disabled automatically on mobile viewports |

### 10.5 Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Component files | PascalCase | `CaseStudies.jsx`, `HowItWorks.jsx` |
| CSS classes | kebab-case | `.glass-card`, `.section-label`, `.hero-stat-chips` |
| Section IDs | kebab-case | `id="cases"`, `id="offer"`, `id="integration"` |
| Translation keys | dot-notation camelCase | `hero.videoCard.title`, `caseStudies.label` |
| Animation keyframe names | camelCase | `orbPulse`, `heroGlowFloat`, `pulseDot` |

---

## Quick Reference

```
─── Backgrounds ───────────────────────────────────────────────────────────
  Page body:    #000
  Deep surface: #050508
  Card surface: rgba(255,255,255,0.04)

─── Glass Card Recipe ─────────────────────────────────────────────────────
  Default:  bg 0.04 · border 0.10 · blur(12px) · shadow 0 8px 40px rgba(0,0,0,0.4)
  Hover:    bg 0.07 · border 0.22 · translateY(-6px)

─── Glow Orbs ─────────────────────────────────────────────────────────────
  Purple:  rgba(110,60,240,0.35)   Blue:  rgba(30,100,255,0.28)
  Teal:    rgba(0,200,180,0.35)    Pink:  rgba(220,60,160,0.35)

─── Text ───────────────────────────────────────────────────────────────────
  Bright:  #fff    Mid: rgba(255,255,255,0.55)    Dim: rgba(255,255,255,0.28)

─── Fonts ──────────────────────────────────────────────────────────────────
  Headings / UI: Space Grotesk (wt 300–800)
  Body copy:     Inter (wt 300–700)

─── Motion ─────────────────────────────────────────────────────────────────
  Easing:   cubic-bezier(0.23, 1, 0.32, 1)
  Duration: 0.7s – 1.1s (entries),  0.3s – 0.5s (hovers)

─── Layout ─────────────────────────────────────────────────────────────────
  Container: max-width 1440px · 64px side padding
  Section:   80px vertical padding

─── Radius ─────────────────────────────────────────────────────────────────
  sm 14px · md 22px · lg 32px · xl 48px · pill 50px
```

---

*Last updated: February 2026 — prodone.ai (Fast Forward Artificial Intelligence)*
