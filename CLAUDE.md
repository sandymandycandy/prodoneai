# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**prodone.ai** — Corporate website and interactive AI consultancy platform built as a React SPA with Vite. Bilingual (EN/DE), animation-heavy, with no backend (EmailJS for forms).

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Production bundle → /dist
npm run preview   # Preview production build locally
npm run lint      # ESLint check (flat config v9)
```

No test framework is configured.

## Architecture

### Routing & App Shell (`src/App.jsx`)
- React Router v7 with two routes: `/` → `Home`, `/pilot` → `Pilot`
- Pages are lazy-loaded (`lazy()` + `<Suspense>`) for code splitting
- Global components mounted outside router: `Navbar`, `Footer`, `Chatbot`, `GlobalParticles`, `ScrollProgress`
- Animated loading screen on initial mount; Framer Motion `<AnimatePresence>` for page transitions

### Pages
- **Home (`src/pages/Home.jsx`):** Composes 10 section components in vertical order: Hero → TrustedBy → Outcomes → CaseStudies → GlobusSpotlight → HowItWorks → Integration → OfferBox → FAQ → ContactForm
- **Pilot (`src/pages/Pilot.jsx`):** ~58KB self-contained interactive case study (law firm chatbot scenario)

### i18n (`src/context/LanguageContext.jsx`)
- Single context provides all EN/DE translations via `useLanguage()` hook → `{ lang, setLang, t }`
- All user-facing copy must be added to both language entries in LanguageContext

### Styling
- **No Tailwind.** Pure CSS in `src/index.css` (981 lines) + inline Framer Motion styles
- Design tokens are CSS variables on `:root` (colors, spacing, radius, glassmorphism)
- **STYLEGUIDE.md is the source of truth** for all design decisions — update it when changing design tokens or component patterns
- "Liquid Glass Dark" aesthetic: deep black backgrounds, frosted glass cards, monochrome glows, Space Grotesk + Inter fonts

### Canvas/Animation Performance
Both `ParticleCanvas.jsx` and `GlobalParticles.jsx` use these optimizations — do not regress them:
- 30fps frame-rate cap (not 60fps)
- `IntersectionObserver` to pause off-screen
- Disabled entirely on mobile (≤768px)
- Squared distance calculations (avoids `sqrt`)

### Forms
ContactForm and OfferBox submit via **EmailJS** using `VITE_EMAILJS_*` env vars. No backend database.

## Key Constraints

- **Bilingual:** Every text change needs both EN and DE strings in `LanguageContext`
- **Chatbot (`src/components/Chatbot.jsx`, ~32KB):** Complex multi-flow conversational widget — read fully before modifying
- **Mobile:** Test responsive behavior; particles are disabled, buttons go full-width at ≤400px, nav collapses at ≤768px
- **GlobusSpotlight:** Uses Three.js / `@react-three/fiber` / `@react-three/drei` for 3D globe visualization
