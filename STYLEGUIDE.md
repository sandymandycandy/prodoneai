# prodone.ai — Design & Code Styleguide

> **Stack:** React 19 · Vite · Framer Motion · AOS (Animate On Scroll) · Three.js · React Router v7
> **Last updated:** March 2026

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Glassmorphism & Surfaces](#4-glassmorphism--surfaces)
5. [Spacing & Radius](#5-spacing--radius)
6. [Components](#6-components)
7. [Animation System](#7-animation-system)
8. [Layout System](#8-layout-system)
9. [Responsive Breakpoints](#9-responsive-breakpoints)
10. [Performance Rules](#10-performance-rules)
11. [Code Conventions](#11-code-conventions)
12. [Changelog — What Was Changed](#12-changelog--what-was-changed)

---

## 1. Design Philosophy

**"Liquid Glass Dark"** — a premium consultancy aesthetic built on 5 principles:

| Principle | Implementation |
|---|---|
| Deep black base | `#000` body, `#050508` overlays |
| Blue-only accent | Single accent: `#0173D3` / `#60a5fa` — no purple, no multicolor |
| Frosted glass surfaces | `backdrop-filter: blur(20px)` on desktop; solid fallback on mobile |
| Monochrome typography | White headings, `rgba(255,255,255,0.45)` body, `rgba(255,255,255,0.28)` captions |
| Scroll-triggered reveals | AOS on Pilot page; Framer Motion `useInView` on Home sections |

> **Hard rules:**
> - NEVER use purple, pink, teal, or green as interface accent colors. Blue only (`#0173D3` / `#60a5fa`).
> - NEVER use `repeat: Infinity` in Framer Motion for decorative loops — use CSS `@keyframes` instead.
> - NEVER add `backdrop-filter` without testing on mobile — it is globally disabled at ≤768px.
> - ALWAYS add both EN and DE strings to `LanguageContext` for any user-visible text.

---

## 2. Color System

### 2.1 Accent — Blue Only

All interface accent is a single blue family. No other hues.

| Role | Value | Use |
|---|---|---|
| Primary accent | `#0173D3` | Borders, highlights, CTA glows, `<span>` in headings |
| Light accent | `#60a5fa` | Stat numbers, icon colors, star ratings |
| Glow (bg orbs) | `rgba(1,115,211,0.06–0.14)` | Section background radial gradients |
| Border glow | `rgba(1,115,211,0.22–0.45)` | Hover borders, focus rings |
| Surface tint | `rgba(1,115,211,0.07–0.12)` | Card background on hover / active |

### 2.2 Backgrounds

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#000` | Page body (desktop) |
| `--bg-deep` | `#050508` | Loader, deep overlays, chatbot panel |
| `--bg-card` | `rgba(255,255,255,0.04)` | Glass card default surface |

Body has 3 subtle radial gradients on desktop (disabled on mobile):
```css
background-image:
  radial-gradient(ellipse 80% 60% at 20% 0%,  rgba(1,115,211,0.14) 0%, transparent 55%),
  radial-gradient(ellipse 60% 50% at 80% 100%, rgba(80,40,200,0.08) 0%, transparent 55%),
  radial-gradient(ellipse 40% 35% at 55% 50%,  rgba(0,180,255,0.05) 0%, transparent 60%);
```
Mobile body: `background: #000` (solid — body gradients are disabled for performance).

### 2.3 Glass Layers

| Token | Value | Usage |
|---|---|---|
| `--glass-1` | `rgba(255,255,255,0.04)` | Default card bg |
| `--glass-2` | `rgba(255,255,255,0.07)` | Hover state bg |
| `--glass-3` | `rgba(255,255,255,0.11)` | Active/pressed state |
| `--glass-border` | `rgba(255,255,255,0.10)` | Default border |
| `--glass-border-bright` | `rgba(255,255,255,0.22)` | Hover border |
| `--glass-shine` | `rgba(255,255,255,0.18)` | `inset 0 1px 0` top sheen |

### 2.4 Text Colors

| Token | Value | Usage |
|---|---|---|
| `--text-bright` | `#ffffff` | Headings, key numbers |
| `--text-mid` | `rgba(255,255,255,0.55)` | Body copy, descriptions |
| `--text-dim` | `rgba(255,255,255,0.28)` | Captions, metadata, timestamps |

### 2.5 Section Background Orbs

Every major section uses 1–2 blurred radial gradients as ambient glow. Always blue:

```jsx
// Standard section orb
<div style={{
  position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
  width: 800, height: 400,
  background: 'radial-gradient(ellipse, rgba(1,115,211,0.08) 0%, transparent 65%)',
  pointerEvents: 'none'
}} />
```

---

## 3. Typography

### 3.1 Font Stack

```css
--font:      'Segoe UI', system-ui, -apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-body: 'Segoe UI', system-ui, -apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif;
```

**Both heading and body use the same Segoe UI system stack.** No Google Fonts import — zero network cost, instant load.

> Previously the guide listed Space Grotesk + Inter. Those were removed and replaced with the system font stack for performance. Do not re-add Google Fonts imports.

### 3.2 Type Scale

| Element | Font-size | Weight | Letter-spacing |
|---|---|---|---|
| `h1` — Hero | `clamp(38px, 4.8vw, 72px)` | 900 | `-0.045em` |
| `h1` — Pilot Hero | `clamp(44px, 5.5vw, 82px)` | 900 | `-0.045em` |
| `h2` — Section | `clamp(26px, 3.5vw, 46–52px)` | 800 | `-0.03em` |
| `h3` — Card title | `16–20px` | 700 | `-0.02em` |
| `p` — Body | `14–17px` | 400 | normal |
| `.section-label` | `10px` | 700 | `0.14em` uppercase |
| Captions / meta | `9–11px` | 600 | `0.06–0.12em` uppercase |
| Stat number (hero) | `clamp(15px, 1.4vw, 20px)` | 900 | `-0.02em` |
| Stat number (results) | `34–44px` | 900 | `-0.03em` |

All headings use `line-height: 1.0–1.1`.

### 3.3 Accent Word in Headings

Use `#0173D3` for the accent word inside a heading:

```jsx
<h2>
  Proven AI <span style={{ color: '#0173D3' }}>Results</span>
</h2>
```

### 3.4 Shimmer Text (Hero only)

Used on the Hero `h1` accent word only:

```css
.shimmer-text {
  background: linear-gradient(90deg,
    rgba(255,255,255,0.90) 0%, #0173D3 30%,
    rgba(0,200,255,1) 55%, #0173D3 75%,
    rgba(255,255,255,0.90) 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmerGradient 6s linear infinite;
}
```

On mobile (`≤768px`) shimmer animation is disabled — text renders as static `rgba(255,255,255,0.9)`.

---

## 4. Glassmorphism & Surfaces

### 4.1 The Glass Card Formula (Desktop)

```css
background:      rgba(255,255,255,0.04);
border:          1px solid rgba(255,255,255,0.10);
border-radius:   22px–28px;
backdrop-filter: blur(20px) saturate(1.5);
-webkit-backdrop-filter: blur(20px) saturate(1.5);
box-shadow:
  0 8px 32px rgba(0,0,0,0.45),
  inset 0 1px 0 rgba(255,255,255,0.09);
```

### 4.2 Mobile Surface Fallback

On `≤768px`, **all `backdrop-filter` is removed globally** via:

```css
@media (max-width: 768px) {
  * { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
  .glass-card { background: rgba(10,10,20,0.95) !important; }
  .btn-ghost  { background: rgba(10,10,22,0.95) !important; }
}
```

This is the single biggest mobile performance improvement. Never remove it.

### 4.3 Top Shine Line

Every prominent card gets a 1px gradient line at the very top:

```jsx
<div style={{
  position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
  background: 'linear-gradient(90deg, transparent, rgba(1,115,211,0.5), transparent)'
}} />
```

### 4.4 Blue Card Variant (Pilot page)

For tinted stat/metric cards:

```jsx
{
  background: 'rgba(1,115,211,0.10)',
  border:     '1px solid rgba(1,115,211,0.22)',
  color:      '#60a5fa'
}
```

---

## 5. Spacing & Radius

### 5.1 Border Radius Tokens

| Token | Value | Used on |
|---|---|---|
| `--r-sm` | `14px` | Chips, tags, small badges |
| `--r-md` | `22px` | Standard glass cards |
| `--r-lg` | `32px` | Large panels, testimonial blocks |
| `--r-xl` | `48px` | Hero-scale feature cards |
| `50px` | — | All pill buttons |

Per-component: Video card `28px` · CTA blocks `24px` · Comparison table `24px`

### 5.2 Section & Container

```css
.section    { padding: 80px 0; }
/* ≤768px → 72px · ≤480px → 56px */

.container  {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 64px;
}
/* ≤1200px → 40px · ≤768px → 20px · ≤600px → 16px */
```

### 5.3 Component Padding Reference

| Component | Padding |
|---|---|
| Glass card (default) | `40px 36px` |
| `.btn-primary` | `14px 30px` (hero: `16px 34px`) |
| `.btn-ghost` | `13px 26px` |
| `.section-label` | `7px 18px` |
| `.tool-chip` | `12px 20px` |
| Hero stat chip | `16px 22px` |
| Chatbot panel | `12px 20px` header, `16px 20px` messages |
| Comparison table row | `16px 24px` |
| Testimonial block | `44px 48px` (mobile: `28px 20px`) |

---

## 6. Components

### 6.1 `.btn-primary` — Primary CTA

Solid white pill, black text, shine sweep on hover.

```html
<button class="btn-primary">Get Started</button>
```

- Background: `#fff` · Color: `#000` · Border-radius: `50px`
- Hover: `translateY(-3px) scale(1.04)` + white glow
- On `≤400px`: full-width automatically

---

### 6.2 `.btn-ghost` — Secondary Action

Frosted glass pill. `backdrop-filter: blur(16px)` on desktop, solid on mobile.

```html
<button class="btn-ghost">See Examples</button>
```

- Hover: bg → `--glass-2`, border-color → blue tint, `translateY(-2px)`

---

### 6.3 `.btn-outline` — Tertiary Action

Transparent, white border, pill radius.

```html
<button class="btn-outline">Learn More →</button>
```

---

### 6.4 `.glass-card` — Standard Card Container

```html
<div class="glass-card">...</div>
```

- Hover: `translateY(-6px)` lift + blue border glow
- `::before` top shine is auto-included

---

### 6.5 `.section-label` — Badge Above Headings

```jsx
<div className="section-label">CASE STUDIES</div>
```

- Animated pulsing dot (`::before` + `@keyframes pulse-dot`) — disabled on mobile
- Always placed directly above `h2`, with `marginBottom: 24–32px`
- When centered: wrap in a `div` with `textAlign: center` and use `margin: '0 auto 18px'`

---

### 6.6 `.tool-chip` — Integration Logo Chip

```html
<div class="tool-chip">
  <img src="tool-logo.svg" alt="Tool" />
  <span>Notion</span>
</div>
```

- Hover: `translateY(-3px) scale(1.02)` + blue border glow

---

### 6.7 `.section-divider`

```html
<div class="section-divider"></div>
```

- 1px, fades out at edges

---

### 6.8 Loader (`App.jsx`)

- Fixed overlay `#050508`
- Central glass card: logo + brand name + 2px white progress bar
- Ambient glow: static `rgba(1,115,211,0.12)` radial div (no infinite animation)
- Exit: Framer Motion `AnimatePresence` with `exit={{ opacity:0, scale:1.05 }}`

---

### 6.9 Chatbot (`src/components/Chatbot.jsx`)

Full-featured conversational widget. Colors are **blue-only**:

- Floating button: `rgba(1,115,211,0.95)` gradient, `💬` emoji icon
- Bot avatar: blue `rgba(1,115,211,...)` background, `🤖` emoji
- User message bubble: `rgba(1,115,211,0.95)` background
- Send button: blue gradient
- Panel footer: `🔒 Encrypted · Powered by prodone.ai`

> Chatbot is ~32KB. Read it fully before modifying.

---

### 6.10 DemoChatbot (`src/pages/Pilot.jsx`)

Embedded interactive demo inside the Pilot page. Uses the same blue design language. NOT the same as the global Chatbot widget.

---

### 6.11 Marquee (Integration section)

```html
<div class="marquee-track">
  <div class="marquee-content marquee-forward">...</div>
</div>
```

- Forward: `32s` · Reverse: `26s`
- Pauses on hover

---

## 7. Animation System

### 7.1 Two Animation Strategies

| Page/Section | Strategy | Library |
|---|---|---|
| Hero section | Mount animations | Framer Motion `initial/animate` |
| Home sections | Scroll-triggered | Framer Motion `useInView` |
| Pilot page | Scroll-triggered | **AOS (Animate On Scroll)** |
| Decorative loops | CSS only | `@keyframes` in `index.css` |
| Hover effects | Inline | Framer Motion `whileHover` / `whileTap` |

> **Rule:** Never use `transition={{ repeat: Infinity }}` in Framer Motion. Use CSS `@keyframes` for all looping ambient animations.

---

### 7.2 AOS — Pilot Page Setup

AOS is initialized once in `Pilot.jsx`:

```jsx
import AOS from 'aos'
import 'aos/dist/aos.css'

useEffect(() => {
  window.scrollTo(0, 0)
  AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 80 })
}, [])
```

Usage pattern:

```jsx
// Section header
<div data-aos="fade-up" className="section-label">LABEL</div>
<h2 data-aos="fade-up" data-aos-delay="100">Heading</h2>
<p  data-aos="fade-up" data-aos-delay="160">Body copy</p>

// Cards in a grid (stagger by index)
<div data-aos="fade-up" data-aos-delay={i * 100}>...</div>

// Left/right split panels
<div data-aos="fade-right">Left panel</div>
<div data-aos="fade-left">Right panel</div>

// Badge pop-in
<div data-aos="zoom-in" data-aos-delay="200">...</div>
```

Keep `whileHover` / `whileTap` on `motion.div` for hover interactions — AOS only handles scroll entry.

---

### 7.3 Framer Motion — Home Page Pattern

```jsx
const ref = useRef(null)
const inView = useInView(ref, { once: true, margin: '-80px' })

<div ref={ref}>
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.7 }}
    className="section-label"
  />
  <motion.h2
    initial={{ opacity: 0, y: 32 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: 0.1, duration: 0.8 }}
  />
</div>
```

---

### 7.4 Hero Mount Animations (no scroll trigger)

```jsx
<motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
/>
```

Standard entry delays for hero elements:

| Element | Delay |
|---|---|
| Badge | `0.15s` |
| `h1` | `0.30s` |
| `p` body | `0.50s` |
| CTA buttons | `0.68s` |
| Stat chips | `0.85s` |
| Right visual panel | `0.50s` |

---

### 7.5 Project Easing

```js
ease: [0.23, 1, 0.32, 1]   // fast start, silky landing (used for entries)
ease: 'easeInOut'           // symmetric — used for scroll indicator and simple fades
```

Entry durations: `0.7s – 1.1s`. Hover transitions: `0.25s – 0.4s`.

---

### 7.6 CSS Keyframes (all in `index.css`)

```css
/* Live indicator dot — replaces Framer Motion infinite */
@keyframes liveBlink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.15; }
}
.live-dot { animation: liveBlink 1.4s ease-in-out infinite; }

/* Scroll mouse bounce — replaces Framer Motion infinite */
@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(8px); }
}
.scroll-mouse { animation: scrollBounce 1.6s ease-in-out infinite; }

/* Hero glow orbs */
@keyframes heroGlowFloat {
  0%, 100% { transform: translateY(0) scale(1);     opacity: 0.45; }
  50%       { transform: translateY(-12px) scale(1.08); opacity: 0.65; }
}

/* Section label dot */
@keyframes pulse-dot {
  0%, 100% { opacity: 1;   transform: scale(1);   }
  50%       { opacity: 0.3; transform: scale(0.6); }
}

/* Shimmer gradient text */
@keyframes shimmerGradient {
  0%   { background-position: -200% 50%; }
  100% { background-position:  200% 50%; }
}
```

All looping CSS animations are **automatically disabled on mobile (`≤768px`)**.

---

### 7.7 Hover Standard Values

| Component | Framer Motion `whileHover` |
|---|---|
| Metric / stat card | `{ y: -8, scale: 1.03 }` |
| Deliverable row | `{ x: 6 }` |
| Standard glass card | `translateY(-6px)` via CSS |
| `.btn-primary` | CSS `translateY(-3px) scale(1.04)` |
| `.btn-ghost` | CSS `translateY(-2px)` |

---

### 7.8 Stagger Delay Pattern

```jsx
// Section header sequence
// label:  delay 0
// h2:     delay 100ms
// p:      delay 160ms
// CTA:    delay 250ms+

// Grids / lists (stagger by index × step)
data-aos-delay={i * 100}           // cards — 100ms step
data-aos-delay={i * 80}            // deliverables — 80ms step
data-aos-delay={i * 60}            // table rows — 60ms step
```

---

## 8. Layout System

### 8.1 Page Shell (`App.jsx`)

```
Router
 └─ AnimatePresence
     └─ Loader (progress bar 0→100%, then fades out)
 └─ motion.div (page fade in, duration 0.8s)
     ├─ ScrollProgress   ← thin blue bar at top + back-to-top button
     ├─ Navbar           ← fixed top
     ├─ Suspense fallback=<PageSkeleton>
     │   └─ Routes: / | /pilot | /services | /results | /company | /faq | /contact
     ├─ Footer
     └─ Chatbot          ← fixed bottom-right floating widget
```

GlobalParticles and ParticleCanvas exist as components but are **not imported** anywhere — they are unused.

---

### 8.2 Home Page Sections (in order)

```
Hero → TrustedBy → Outcomes → GlobusSpotlight → OfferBox
```

FAQ and ContactForm were **removed** from the Home page. They are standalone pages (`/faq`, `/contact`).

---

### 8.3 Section Template

```jsx
<section style={{ padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
  {/* 1. Ambient background orb (absolute, behind content) */}
  <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
    width: 800, height: 400,
    background: 'radial-gradient(ellipse, rgba(1,115,211,0.08) 0%, transparent 65%)',
    pointerEvents: 'none' }} />

  {/* 2. Content wrapper */}
  <div className="container" style={{ position: 'relative', zIndex: 1 }}>

    {/* 3. Section header */}
    <div style={{ textAlign: 'center', marginBottom: 52 }}>
      <div className="section-label" style={{ margin: '0 auto 18px' }}>LABEL</div>
      <h2>Title <span style={{ color: '#0173D3' }}>Accent</span></h2>
      <p style={{ maxWidth: 480, margin: '0 auto', color: 'rgba(255,255,255,0.45)' }}>
        Supporting description.
      </p>
    </div>

    {/* 4. Content grid */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
      {items.map((item, i) => (
        <div key={i} data-aos="fade-up" data-aos-delay={i * 100}>
          {/* card content */}
        </div>
      ))}
    </div>
  </div>
</section>
```

---

### 8.4 Common Grid Templates

| Section | Columns | Gap |
|---|---|---|
| Hero | `1fr 1fr` | `80px` |
| Pilot hero | `1fr 1fr` | `80px` |
| Pilot process steps | `repeat(2,1fr)` | `20px` |
| Pilot deliverables | `repeat(3,1fr)` | `12px` |
| Pilot comparison | `1fr 1fr 1fr` | — |
| Pilot results metrics | `repeat(4,1fr)` | `16px` |
| Pilot chatbot section | `1fr 1fr` | `72px` |
| HowItWorks | `repeat(3,1fr)` | — |

---

### 8.5 Z-index Layers

| z-index | Layer |
|---|---|
| `0` | Background glow orbs |
| `1–2` | Section content |
| `3–4` | In-card overlays (top bars, badges inside cards) |
| `10` | Hero content |
| `99999` | Loader overlay |

---

## 9. Responsive Breakpoints

| Breakpoint | Target | Key changes |
|---|---|---|
| `≤ 1200px` | Large laptop | Container padding → `40px` |
| `≤ 900px` | Tablet landscape | Hero/Pilot grids → 1 col; results → 2 col; chat grid → 1 col |
| `≤ 768px` | Tablet portrait | All `backdrop-filter` OFF; all infinite animations OFF; container `20px`; body bg → `#000` |
| `≤ 600px` | Large phone | Container → `16px`; hero padding-top `100px`; video card `360px` |
| `≤ 480px` | Phone | Section padding `56px`; pilot results → 1 col; buttons stack |
| `≤ 400px` | Small phone | All buttons full-width |

> Typography uses `clamp()` throughout — it scales fluidly without breakpoints. Breakpoints are for layout structure only.

---

## 10. Performance Rules

### 10.1 Mobile Performance (Critical)

| Rule | Implementation |
|---|---|
| No `backdrop-filter` on mobile | Global CSS: `@media (≤768px) { * { backdrop-filter: none !important } }` |
| No infinite CSS animations on mobile | All looping keyframes disabled via `@media (≤768px)` |
| No body background gradients on mobile | `body { background-image: none !important }` at `≤768px` |
| No blur filters on decorative orbs on mobile | `[style*="filter:blur"] { filter: none !important }` at `≤768px` |
| No `backdrop-filter` on `.btn-ghost` | Solid dark bg applied as fallback |

### 10.2 JavaScript Animation Rules

| Rule | Implementation |
|---|---|
| No `repeat: Infinity` in Framer Motion | Use CSS `@keyframes` for loops (`liveBlink`, `scrollBounce`, `orbPulse`, etc.) |
| Scroll reveals: `once: true` always | Never re-trigger entry animations on scroll-back |
| AOS on Pilot, useInView on Home | Don't mix strategies within the same page |
| `willChange: 'transform'` sparingly | Only on elements actively animating (metric cards, hero panel) |

### 10.3 General

| Rule | Implementation |
|---|---|
| Code-split all pages | `lazy()` + `Suspense` in `App.jsx` |
| Off-screen sections skip layout | `content-visibility: auto` via `section + section` CSS |
| No Google Fonts | System font stack — zero network cost |
| Touch interactions | `touch-action: manipulation` + `-webkit-tap-highlight-color: transparent` on all buttons/links |
| iOS scroll | `overscroll-behavior-y: none` on `html` |
| Video preload | `preload="metadata"` not `auto` |
| Canvas animations (unused) | `GlobalParticles` and `ParticleCanvas` exist but are not mounted — ignore them |

### 10.4 Loader

The loader uses a static ambient glow (no animation). Do not add infinite animations to the loader — it runs on every page load.

```jsx
// Correct — static glow
<div style={{ background: 'radial-gradient(circle, rgba(1,115,211,0.12) 0%, transparent 70%)', filter: 'blur(30px)' }} />

// Wrong — do not do this
<motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} />
```

---

## 11. Code Conventions

### 11.1 Component File Structure

```jsx
// 1. React hooks
import { useEffect, useState, useRef } from 'react'

// 2. Animation libs — import only what is used
import { motion } from 'framer-motion'      // keep for whileHover/mount anims
import AOS from 'aos'                        // Pilot page only
import 'aos/dist/aos.css'                   // Pilot page only

// 3. Local imports
import { useLanguage } from '../context/LanguageContext'

// 4. Sub-components (before default export)
function SubCard({ prop }) { ... }

// 5. Static data / constants (before or after sub-components)
const STEP_COLORS = [ ... ]

// 6. Main default export
export default function SectionName() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const { lang, translations } = useLanguage()
  const p = translations[lang].pilot
  return ( ... )
}
```

### 11.2 Class vs Inline Style

| Use CSS class for | Use `style={{}}` for |
|---|---|
| Reusable: `.btn-primary`, `.glass-card`, `.section-label` | One-off layout: grid columns, padding |
| Responsive overrides | Dynamic values from state/props |
| `@keyframes` decorative loops | Framer Motion `whileHover` |
| Mobile/reduced-motion overrides | Section-specific color tints |

### 11.3 i18n — Language Context

```jsx
const { t, lang, translations } = useLanguage()

t('hero.badge')                           // single string
translations[lang].pilot.processTitle     // object/array access
```

Every user-visible string needs both `en` and `de` entries in `LanguageContext.jsx`.

### 11.4 Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Component files | PascalCase | `CaseStudies.jsx`, `HowItWorks.jsx` |
| CSS classes | kebab-case | `.glass-card`, `.section-label`, `.hero-stat-chips` |
| Section IDs | kebab-case | `id="cases"`, `id="offer"` |
| Translation keys | dot-notation camelCase | `hero.videoCard.title` |
| Keyframe names | camelCase | `liveBlink`, `scrollBounce`, `orbPulse` |
| CSS grid class suffixes | descriptive | `.pilot-hero-grid`, `.pilot-chat-grid` |

---

## 12. Changelog — What Was Changed

### Colors — Purple → Blue

All purple/violet interface colors were replaced with blue throughout the entire codebase:

| Was | Now |
|---|---|
| `rgba(139,92,246,...)` (purple) | `rgba(1,115,211,...)` (blue) |
| `#8b5cf6` / `#a06cff` | `#0173D3` / `#60a5fa` |
| `rgba(160,120,255,...)` (glow lines) | `rgba(1,115,211,...)` |
| Chatbot floating button: purple gradient | Blue `rgba(1,115,211,0.95)` |
| Chatbot user bubble: purple | Blue `rgba(1,115,211,0.95)` |
| Comparison table `neoColor` fields | All set to `#60a5fa` or `#34d399` (only success green kept) |

### Typography — Google Fonts → System Font

Space Grotesk and Inter were removed. The entire site uses:
```
'Segoe UI', system-ui, -apple-system, Roboto, 'Helvetica Neue', Arial, sans-serif
```
No `@import` from Google Fonts anywhere.

### Home Page — Sections Removed

`FAQ` and `ContactForm` were removed from `Home.jsx`. They are now accessible as separate pages at `/faq` and `/contact`.

### Pilot Page — Full Rewrite

- Animation system: `useInView` (Framer Motion) → **AOS** (Animate On Scroll)
- All `ref={...Ref}` scroll refs and `*InView` variables removed
- All section scroll animations converted to `data-aos="fade-up"` attributes
- `whileHover` / `whileTap` interactions kept on `motion.div` elements
- All colors changed to blue-only (`#0173D3` / `#60a5fa`)
- `STEP_COLORS` and `HERO_METRICS` arrays updated to all-blue
- Added Before vs After comparison table (3-column grid)
- AOS initialized in `useEffect` with `{ duration: 800, easing: 'ease-out-cubic', once: true, offset: 80 }`
- AOS package installed: `npm install aos`

### Chatbot — Style Reverted + Blue

The Chatbot was reverted to its original emoji style (`💬`, `🤖`, `🔒`) with colors changed from purple to blue. No structural logic changes.

### Loader — Infinite Animation Removed

The ambient glow in `App.jsx` Loader had `animate={{ scale: [1,1.2,1] }} transition={{ repeat: Infinity }}`. This was replaced with a static `<div>` to eliminate a RAF loop on every page load.

### Hero — Infinite Framer Motion → CSS

Two `repeat: Infinity` Framer Motion animations were converted to CSS classes:

| Was | Now |
|---|---|
| `motion.div animate={{ opacity: [1, 0.1, 1] }} repeat: Infinity` | `<div className="live-dot">` + CSS `@keyframes liveBlink` |
| `motion.div animate={{ y: [0, 8, 0] }} repeat: Infinity` | `<div className="scroll-mouse">` + CSS `@keyframes scrollBounce` |

Scroll indicator is hidden on mobile (`display: none`).

### Mobile Performance Pass

Added to `index.css`:
- `touch-action: manipulation` — removes 300ms tap delay
- `-webkit-tap-highlight-color: transparent` — no flash on tap
- `overscroll-behavior-y: none` — prevents iOS scroll bounce chaining
- `-webkit-overflow-scrolling: touch` — iOS momentum scrolling
- `@media (≤768px)` block disabling all `backdrop-filter`, all infinite CSS animations, body background gradients, and filter blurs on decorative elements
- `@media (769px–1024px)` block reducing blur from 20px to 10px on `.glass-card`

---

## Quick Reference

```
COLORS ────────────────────────────────────────────────────────────────────
  Accent primary:  #0173D3
  Accent light:    #60a5fa
  Accent glow:     rgba(1,115,211,0.08–0.14)   (bg orbs)
  Accent border:   rgba(1,115,211,0.22–0.45)   (hover borders)

  Background:      #000  (desktop with 3 radial gradients)
                   #000  (mobile — solid only)
  Deep surface:    #050508
  Card surface:    rgba(255,255,255,0.04)

  Text bright:     #ffffff
  Text mid:        rgba(255,255,255,0.55)
  Text dim:        rgba(255,255,255,0.28)

TYPOGRAPHY ────────────────────────────────────────────────────────────────
  Font:            'Segoe UI', system-ui (single stack, heading + body)
  h1:              clamp(38px, 4.8vw, 72px) · weight 900 · tracking -0.03em
  h2:              clamp(26px, 3.5vw, 52px) · weight 800 · tracking -0.03em
  Body:            14–17px · weight 400 · line-height 1.75–1.85
  Section label:   10px · weight 700 · tracking 0.14em · uppercase

GLASS CARD (desktop) ──────────────────────────────────────────────────────
  bg:              rgba(255,255,255,0.04)
  border:          1px solid rgba(255,255,255,0.10)
  blur:            backdrop-filter: blur(20px) saturate(1.5)
  shadow:          0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.09)
  hover:           translateY(-6px) · border-color rgba(1,115,211,0.45)
  mobile:          backdrop-filter: none · bg rgba(10,10,20,0.95)

RADIUS ────────────────────────────────────────────────────────────────────
  sm 14px · md 22px · lg 32px · xl 48px · pill 50px

ANIMATION ─────────────────────────────────────────────────────────────────
  Easing:          cubic-bezier(0.23, 1, 0.32, 1)
  Entry duration:  0.7s – 1.1s
  Hover duration:  0.25s – 0.4s
  Loops:           CSS @keyframes only (never Framer Motion repeat: Infinity)
  Pilot page:      AOS data-aos="fade-up" / fade-left / fade-right / zoom-in
  Home sections:   Framer Motion useInView + once:true

LAYOUT ────────────────────────────────────────────────────────────────────
  Container:       max-width 1440px · 64px side padding
  Section:         80px vertical padding
```

---

*prodone.ai — Fast Forward Artificial Intelligence*
*Styleguide version 2.0 — March 2026*
