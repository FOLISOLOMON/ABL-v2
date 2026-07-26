# Plan: Redesign & Animate ABL Fashion with hyperframes-animation

## Context
- **Stack**: Next.js 13.5, React 18, TypeScript, Tailwind, Framer Motion v12
- **Pages**: Home, About, Services, Lookbook, Training, Contact, Book
- **Current animation**: Framer Motion `whileInView` reveals, text line-by-line reveals, `AnimatePresence` modals/steps
- **Skill installed**: `hyperframes-animation` (37+ atomic rules, 15 scene blueprints, GSAP/Lottie/Three.js adapters)
- **Other skills**: `theme-factory` (10 color/font themes), `ui-ux-pro-max` (design intelligence database)

## Current State
- Homepage has 7 sections with Framer Motion scroll reveals
- All pages use `Reveal`/`RevealText`/`Stagger` helper components
- No GSAP, Lottie, or Three.js in the project currently
- Brand colors: orange (`#f97316`), charcoal, ivory, royal blue
- Typography: Playfair Display (display) + Inter (body)

## Goal
Redesign and animate the project using the `hyperframes-animation` skill.

---

## Key Questions to Resolve

### 1. Scope
- **Option A**: Full visual redesign + animation across all 7 pages
- **Option B**: Animation-first: keep existing visual design, add HyperFrames motion patterns
- **Option C**: Homepage + 2-3 key pages only (Home, Services, Lookbook)

**Recommendation**: **Option B** — keep the strong existing visual identity, add HyperFrames choreography. The brand already has good color/typography; the gap is motion sophistication (scene-level blueprints, text effects, scroll-linked choreography) rather than visual redesign.

### 2. Runtime Strategy
- **Option A**: Replace Framer Motion with GSAP (HyperFrames default)
- **Option B**: Hybrid — GSAP for complex scene blueprints, keep Framer Motion for simple reveals
- **Option C**: Keep Framer Motion, port HyperFrames blueprints/techniques into Framer Motion equivalents

**Recommendation**: **Option B** — introduce GSAP for Hero, Featured Lookbook, Final CTA, and Training Preview (scenes that match HyperFrames blueprints like `brand-reveal`, `device-surface-showcase`, `kinetic-type-beats`). Keep Framer Motion for simple `Reveal` helpers and form steps. This avoids a massive rewrite while adding the most dramatic motion improvements.

### 3. Pages to Prioritize
**Recommendation**: Homepage first (Hero, BrandStatement, FeaturedServices, FeaturedLookbook, FinalCTA), then Training and Lookbook pages.

### 4. Visual Redesign Depth
- **Option A**: No color/typography changes (animation-only)
- **Option B**: Apply one `theme-factory` theme as accent palette
- **Option C**: Full `ui-ux-pro-max` design-system pass

**Recommendation**: **Option A** — animation-only. The existing brand identity is strong. If the user wants visual polish later, it can be layered on top.

---

## Proposed Plan (Option B, Option B, Homepage-first, Option A)

### Phase 1: Foundation
1. Add GSAP + ScrollTrigger to `package.json` if not present
2. Create a `<MotionProvider>` / composition wrapper that manages a single paused GSAP timeline per scene, matching HyperFrames' "single paused timeline" constraint
3. Extract a `useHyperFramesComposition()` hook that mirrors `data-duration`-governed lifecycle

### Phase 2: Homepage Animation Overhaul
Apply 2-4 HyperFrames atomic rules per section:

| Section | Blueprint / Rules | Motion Idea |
|---------|------------------|-------------|
| Hero | `brand-reveal-assemble-zoom` blueprint | Zoom + parallax background, text decode/slide-in, staggered CTA reveal |
| BrandStatement | `kinetic-type-beats` | Text beat-slam on scroll, line-by-line with elastic ease |
| FeaturedServices | `grid-card-assemble` | Cards assemble from scattered positions with stagger |
| FeaturedLookbook | `device-surface-showcase` + `spatial-pan-stations` | Pan/zoom through lookbook grid on scroll |
| TrainingPreview | `constellation-hub` | Training cards orbit/expand from center |
| TestimonialPreview | Keep Framer Motion `AnimatePresence` | No change needed |
| FinalCTA | `titlecard-reveal` | Cinematic title reveal with background scale |

### Phase 3: Inner Pages
1. **About**: Timeline milestones use `depth-scatter-assemble` (dots and cards scatter-reassemble on scroll)
2. **Services**: Service sections use `comparison-split` for image/text alternation
3. **Lookbook**: Masonry grid uses `grid-card-assemble` + `cursor-ui-demo` hover effects
4. **Training**: Program cards use `constellation-hub` layout
5. **Book**: Step wizard transitions use `scale-swap-transition`

### Phase 4: Polish & Audit
1. Run `hyperframes-animation/scripts/animation-map.mjs` on each scene to audit choreography
2. Verify: no `Math.random`, no `Date.now`, no `repeat: -1`, no `display` tweens
3. Ensure all spatial motion uses GSAP transform aliases (`x`, `y`, `scale`, `rotation`)
4. Add `prefers-reduced-motion` media query fallback

---

## Risks
1. **GSAP + Framer Motion conflict**: Both animate transforms. Scope them to different elements/sections to avoid fighting.
2. **Bundle size**: GSAP + ScrollTrigger adds ~50KB gzipped. Acceptable for this brand site.
3. **Server Components**: `'use client'` already used everywhere animation is needed. No issue.

## Validation
- `npm run typecheck` passes
- `npm run lint` passes
- Manual QA: scroll through all pages, verify animations feel coordinated, check reduced-motion
