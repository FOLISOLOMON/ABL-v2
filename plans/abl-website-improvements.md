# ABL Fashion Website Improvement Plan

## Scope
Excludes shop/online store per client request. Focus on hero polish, brand alignment, and consistency fixes.

## Context
- Next.js 13.5 app with Tailwind, Framer Motion, Lucide icons
- Key files: `components/sections/hero-section.tsx`, `components/layout/navbar.tsx`, `app/training/page.tsx`, `app/services/page.tsx`, `app/contact/page.tsx`, `data/site.ts`
- Client brand voice: "YOUR EXCELLENT SATISFACTION IS OUR JOY", "START SOMETHING NOW BY CAPITALISING ON YOUR STRENGTH", "TO TOUCH LIVES THROUGH FASHION"

## Task List

### 1. Hero Section Refinement
- Reduce heading scale further: change `lg:text-[5rem]` to `lg:text-[4.5rem]` with `leading-[1.0]` and `max-w-3xl`
- Strengthen paragraph contrast: bump gradient to `from-black/60 via-black/45 to-black/70`, keep body text `text-white` and re-add `text-shadow-hero`

### 2. Icon Button Standardization
- Audit all icon-only buttons globally; enforce `rounded-xl` everywhere (footer, contact quick-actions, training skills, navbar WhatsApp, mobile close button)
- Pill CTAs remain `rounded-full`
- Mobile menu close button gets visible dark background + border for contrast on transparent nav

### 3. Social URLs
- Replace all `href="#"` in `data/site.ts` social block with real URLs: `https://www.instagram.com/ablfashion.training`, `https://www.facebook.com/ablfashion.training`, `https://www.tiktok.com/@ablfashion.training`

### 4. Brand Copy Alignment
- Rewrite homepage brand statement to use client's actual tagline and mission
- Update siteConfig tagline to client's primary tagline
- Update service, about, and training copy to reference Kasoa origin and training mission where natural

### 5. Training Enrollment & Price Cues
- Add enrollment process note on `/training` page ("Buy forms at Kasoa Adam Nana Bus Stop office")
- Add subtle pricing cue near CTAs: "Prices on request — chat with us on WhatsApp"

### 6. Service Image Crops
- Change `aspect-[4/5]` to `aspect-[3/4]` on `services/page.tsx` to reduce vertical cropping of garments

### 7. Google Maps Embed
- Fix embed URL to `https://maps.google.com/maps?q=...&t=&z=15&ie=UTF8&iwloc=&output=embed`
- Add `title`, `sandbox`, and `allow="geolocation"` attributes

### 8. Navbar Search Icon
- Add search icon to navbar (client request) positioned after WhatsApp button, with translucent background styling on transparent nav

### 9. Contact Form Accessibility
- Add visible `<label>` elements to all inputs on `/contact` page

## Validation
- Run development server; verify responsive breakpoints (mobile, tablet, desktop)
- Check WCAG contrast on hero body text after overlay change
- Test all social links open correctly
- Confirm training enrollment text renders on `/training`
- Verify map embed loads without console errors

## Out of Scope
- Online shop / cart / checkout
- New domain configuration (waiting on real domain)
