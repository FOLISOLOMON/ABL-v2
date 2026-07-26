h# ABL Fashion — Full Motion & Parallax Website Plan

## Objective
Transform every element on the ABL website (text, images, icons, backgrounds, UI components) into motion-driven, scroll-responsive experiences with a parallax UI layer. The site should feel cinematic, immersive, and fashion-forward.

## Tech Stack (already installed)
- **GSAP + ScrollTrigger** — primary scroll-driven animation engine
- **Framer Motion** — React-level animations, page transitions, micro-interactions
- **Tailwind CSS** — utility-first styling
- **Next.js 13.5** — App Router
- **Lucide React** — icon library

## Design Principles
1. **Every element moves** — no static content on screen without intent-driven animation
2. **Parallax depth** — at least 3 layers per section (background, midground, foreground)
3. **Scroll is the engine** — scroll position drives all major animations
4. **Motion choreography** — animations follow a clear rhythm (stagger, cascade, sync)
5. **Performance-first** — use `will-change`, `transform` only, avoid layout thrashing
6. **Mobile-aware** — reduce motion intensity on mobile; use `prefers-reduced-motion`

---

## Task Breakdown

### 1. Cinematic Page Loader
**File**: `app/loading.tsx` (enhance) / `components/animation/page-loader.tsx` (new)
- Full-screen splash with ABL logo
- Logo scales up + fades in (500ms)
- Tagline text reveals word-by-word via GSAP
- Progress bar or animated line under logo
- Auto-dismiss after content renders, or click to skip
- Exit animation: logo scales down, page reveals with a stagger

### 2. Cursor-Tracking Light Effect
**File**: `components/animation/cursor-light.tsx` (new)
- Custom cursor dot that follows mouse with lerp easing
- A radial gradient light that tracks the cursor position
- Intensity varies by proximity to text/image elements
- Disabled on mobile/touch devices
- Integrated via `MotionProvider` or a context provider

### 3. Navbar Motion System
**File**: `components/layout/navbar.tsx` (enhance)
- **Scroll-based background**: Navbar transitions from transparent → ivory with backdrop-blur as user scrolls past hero
- **Logo parallax**: Logo subtly scales down and shifts slightly as user scrolls
- **Nav link underline animation**: Links expand underline on hover with staggered timing
- **Mobile menu**: Full-screen overlay with staggered text entrance (already partially done, enhance with parallax backdrop)
- **CTA button**: Pulse animation on hero page, settles to static on scroll

### 4. Hero Section — Full Parallax Overhaul
**File**: `components/sections/hero-section.tsx` (enhance)
- **3-layer parallax**: Background image (slow move), midground gradient overlay (medium), foreground content (normal/sync)
- **Background image**: Mouse-driven subtle tilt/shift (GSAP + ScrollTrigger)
- **Text lines**: Each line of heading animates in sequentially with `stagger` on load AND on scroll-reveal
- **Meta text** (Est. 2016): Slides in from bottom with slight delay
- **CTA buttons**: Stagger in after text, with hover tilt (3D perspective via Framer Motion)
- **Scroll indicator**: Continuous bounce animation + opacity loop
- **Particles/decor**: Optional — subtle floating dust particles or line animations in background

### 5. Section Parallax System
**File**: `components/animation/parallax-provider.tsx` (new)
- Create a reusable `ParallaxSection` component that:
  - Tracks scroll position via `ScrollTrigger`
  - Moves background at 0.3x scroll speed
  - Moves midground at 0.5x scroll speed
  - Holds foreground at 1x scroll speed
- Apply to: Brand Statement, Featured Services, Lookbook, Training Preview, Final CTA

### 6. Brand Statement — Word-by-Word Reveal
**File**: `components/sections/brand-statement.tsx` (enhance)
- **Heading**: Each word of "Fashion is more than what you wear." animates in sequentially as the user scrolls into view
- **Subheading** ("It is how you show up."): Fades up with a slight blur-to-sharp transition
- **Body text**: Slides up from below with opacity + translateY
- **Decorative element**: A thin orange line draws itself horizontally across the section on scroll
- **Parallax**: Background ivory shifts slightly; quote marks float at different speed

### 7. Featured Services — Staggered Card Cascade
**File**: `components/sections/featured-services.tsx` (enhance)
- **Section header**: Each word of heading reveals on scroll (RevealText already present, enhance with per-word stagger)
- **Card grid**: Cards enter in a cascade pattern (left to right, top to bottom) as user scrolls
- **Card images**: Slight zoom-in on scroll-trigger reveal + subtle parallax tilt on mouse move
- **Card number**: Large number fades in before card content
- **Hover**: Scale + shadow lift with smooth transition
- **Background**: Deep charcoal with subtle grain texture or noise gradient
- **"View All Services" link**: Underline draws on hover with delay

### 8. Lookbook — Masonry Scroll-Tilt
**File**: `components/sections/featured-lookbook.tsx` (enhance)
- **Heading**: "The work speaks." reveals word-by-word on scroll
- **Grid items**: Each card enters with staggered opacity + scale + y offset
- **Image parallax-tilt**: Each image tilts subtly in the opposite direction of mouse position
- **Overlay on hover**: Gradient overlay fades in smoothly
- **Caption**: Slides up from bottom on hover with opacity transition
- **Wide/bottom image**: Parallax drift as user scrolls past it
- **Asymmetric layout**: Large portrait + 2 small squares + wide bottom image — animate each entrance with different timing

### 9. Training Preview — Split Text + Image Parallax
**File**: `components/sections/training-preview.tsx` (enhance)
- **Heading**: "Learn the craft. / Build your future." — each line animates in separately
- **Body text**: Slides in with slight blur removal
- **Program cards**: 3 cards stagger in on scroll with spring easing
  - Each card has a subtle border glow animation on hover
  - Icon elements scale up + rotate slightly on hover
- **Background image** (right side): Parallax drift at 0.3x speed
- **Decorative blur**: Large soft orange blur blob that slowly shifts position on scroll

### 10. Testimonial — Auto-Rotating Quote with Motion
**File**: `components/sections/testimonial-preview.tsx` (enhance)
- **Quote marks**: Large decorative quote mark fades in + scales up on scroll
- **Quote text**: Word-by-word reveal on change (stagger each word)
- **Author**: Fades in after quote text settles
- **Navigation dots**: Scale + color transition on active state
- **Arrow buttons**: Subtle position shift on hover
- **Auto-advance**: Smooth crossfade transition between testimonials (already exists)
- **Background**: Subtle parallax gradient shift

### 11. Final CTA — Full-Width Parallax Canvas
**File**: `components/sections/final-cta.tsx` (enhance)
- **Background image**: Strong parallax effect (moves faster than foreground) + dark overlay gradient
- **Heading**: "Ready to wear your story?" — word-by-word reveal on scroll
- **Subheading**: Fades up after heading settles
- **CTA buttons**: Stagger in with scale + hover 3D tilt
- **Decorative elements**: Subtle floating geometric shapes at varying parallax speeds

### 12. Footer — Animated Social & Subscribe
**File**: `components/layout/footer.tsx` (enhance)
- **Newsletter section**: Heading and form slide in from opposite sides on scroll
- **Social icons**: Stagger in one by one on scroll (already have hover, add scroll-reveal)
- **Footer background**: Very subtle gradient shift over time (GSAP loop)
- **Bottom bar**: "©" year and philosophy text fade in at bottom of viewport

### 13. Inner Pages — Consistent Motion System

#### About Page (`app/about/page.tsx`)
- **Page Hero**: Text lines reveal sequentially on load
- **Our Story**: Image slides in from right, text paragraphs stagger in from below
- **Philosophy section**: Split layout — text enters left, image enters right with parallax
- **Timeline**: Milestones animate in sequentially as user scrolls; connecting line draws itself
- **Value props**: Cards flip or scale in with stagger on scroll

#### Services Page (`app/services/page.tsx`)
- **Page Hero**: Full-parallax background, heading reveal
- **Sticky side nav**: Highlights update with scroll position; active item has a sliding indicator
- **Service sections**: Each service block animates in on scroll (image + text stagger)
- **Image zoom**: Subtle scale on scroll-reveal
- **CTA section**: Words reveal one at a time

#### Contact Page (`app/contact/page.tsx`)
- **Page Hero**: Parallax tilt background
- **Contact details**: Each row slides in with staggered delay
- **Quick action cards**: 2x2 grid stagger in on scroll with scale
- **Contact form**: Fades in with a slight upward slide
- **FAQ**: Each question-answer pair expands with a smooth height animation on click
- **Map**: Subtle fade-in on scroll, slight parallax drift

#### Lookbook Page (`app/lookbook/page.tsx`)
- **Page Hero**: Parallax background
- **Filter pills**: Slide in horizontally on scroll
- **Masonry grid**: Items stagger in with staggered scale + opacity (already has Framer Motion layout)
- **Category image**: Parallax tilt on mouse move
- **Modal**: Smooth scale + backdrop blur transition

#### Book Page (`app/book/page.tsx`)
- **Page Hero**: Parallax background
- **Step indicator**: Active step lights up with a sliding indicator
- **Form steps**: Crossfade transitions between steps with staggered field entrance
- **Confirmation screen**: Checkmark draws itself (SVG path animation), text reveals word-by-word
- **Background**: Subtle parallax gradient shift

#### Training Page (`app/training/page.tsx`)
- Similar enhancements as above — all sections scroll-reveal with stagger, parallax backgrounds, word-by-word text reveals

### 14. Page Transition System
**File**: `components/animation/page-transitions.tsx` (new)
- Framer Motion `AnimatePresence` for route changes
- **Enter**: Content fades in + slides up from 20px
- **Exit**: Content fades out + slides down to 20px
- **Overlay**: Optional — a thin orange line sweeps across the screen during transition
- **Smooth**: `duration: 0.4`, `ease: [0.22, 1, 0.36, 1]`

### 15. Global Motion Enhancements
**File**: `components/animation/motion-variants.ts` (enhance)
Add new variants:
- `wordReveal`: Each word animates in with stagger
- `charReveal`: Each character animates (for large display text)
- `parallaxScroll`: Returns a ScrollTrigger config for parallax layers
- `tiltHover`: Returns a hover config for 3D tilt effect on cards/images
- `cursorGlow`: For cursor-tracking light effect

**File**: `components/animation/reveal.tsx` (enhance)
- Add `RevealWords` component — each word of text animates in on scroll
- Add `RevealChars` component — each character animates in on scroll
- Add `ParallaxBox` component — wraps content in a parallax container with configurable speed

### 16. Accessibility & Reduced Motion
**File**: `app/globals.css` (enhance) + each component
- Add `@media (prefers-reduced-motion: reduce)` rules that disable all animations
- All scroll-triggered animations should use `ScrollTrigger.batch()` for performance
- Focus-visible states maintained for keyboard navigation
- `aria-hidden` on decorative animated elements
- Animation durations should not exceed 1.5s for entrance animations

### 17. Performance Optimization
- Use `will-change: transform` on animated elements sparingly
- Images use `priority` only for above-fold content
- GSAP contexts properly cleaned up on unmount
- ScrollTrigger instances batched and scoped per section
- No continuous JavaScript animations on low-end devices (detect via `navigator.hardwareConcurrency`)

### 18. Image/Asset Requirements
- Add 3-5 decorative images for hero backgrounds (parallax layers)
- Add subtle geometric/line SVG assets for decorative motion elements
- All hero images should have high-resolution WebP variants
- Add `placeholder="blur"` to all Next.js Image components

---

## File Change Summary

### New Files
| File | Purpose |
|------|---------|
| `components/animation/page-loader.tsx` | Cinematic loading screen |
| `components/animation/cursor-light.tsx` | Mouse-tracking cursor light |
| `components/animation/parallax-provider.tsx` | Reusable parallax section wrapper |
| `components/animation/page-transitions.tsx` | Route transition orchestrator |
| `components/animation/cursor-provider.tsx` | Cursor context/provider for light tracking |

### Modified Files
| File | Changes |
|------|---------|
| `components/animation/motion-variants.ts` | Add wordReveal, charReveal, tiltHover, parallaxScroll variants |
| `components/animation/reveal.tsx` | Add RevealWords, RevealChars, ParallaxBox components |
| `components/layout/navbar.tsx` | Scroll-based bg, logo parallax, enhanced link animations |
| `components/layout/footer.tsx` | Stagger animations on scroll, subtle background animation |
| `components/sections/hero-section.tsx` | 3-layer parallax, mouse-tilt bg, full entrance choreography |
| `components/sections/brand-statement.tsx` | Word-by-word text reveal, decorative line draw, parallax layers |
| `components/sections/featured-services.tsx` | Cascade card entrance, image parallax tilt, parallax bg |
| `components/sections/featured-lookbook.tsx` | Scroll-tilt images, asymmetric animation, parallax layers |
| `components/sections/training-preview.tsx` | Split text reveal, parallax background, card stagger |
| `components/sections/testimonial-preview.tsx` | Word-by-word quote reveal, nav parallax, crossfade |
| `components/sections/final-cta.tsx` | Strong parallax background, word reveal, decorative shapes |
| `components/sections/page-hero.tsx` | Parallax tilt background, staggered text reveal |
| `app/about/page.tsx` | Scroll-reveal on all sections, timeline animation |
| `app/services/page.tsx` | Sticky nav scroll sync, parallax service blocks |
| `app/contact/page.tsx` | Form reveal, FAQ expand animation, map parallax |
| `app/lookbook/page.tsx` | Masonry stagger, filter slide-in, modal transition |
| `app/book/page.tsx` | Step transitions, confirmation SVG draw animation |
| `app/training/page.tsx` | Scroll-reveal with stagger, parallax backgrounds |
| `app/loading.tsx` | Cinematic loader (enhance existing) |
| `app/globals.css` | Reduced motion queries, animation utilities |
| `app/layout.tsx` | Integrate page transition provider |
| `components/animation/motion-provider.tsx` | Add cursor provider integration |

---

## Implementation Order
1. Core animation infrastructure (motion-variants, reveal, parallax-provider)
2. Page loader + global utilities
3. Cursor light system
4. Navbar enhancements
5. Hero section overhaul
6. Homepage sections (brand, services, lookbook, training, testimonial, cta)
7. Footer enhancements
8. Inner pages (about → services → contact → lookbook → book → training)
9. Page transition system
10. Accessibility, reduced motion, performance pass
11. Testing & polish

---

## Validation Criteria
- All animations trigger correctly on scroll (not just on load)
- Parallax depth is visible (3+ layers per section)
- `prefers-reduced-motion` disables all animations gracefully
- No console errors from GSAP/ScrollTrigger
- No memory leaks (GSAP contexts reverted on unmount)
- Performance: 60fps on mid-range desktop, 30fps+ on mobile
- All interactive elements (buttons, links, form fields) have hover/active motion feedback
- Mobile menu animation remains smooth
- No layout shift caused by animation initialization
- SEO: No `display:none` on animated content that shouldn't be indexed