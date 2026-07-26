'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DecorativeLine } from '@/components/animation/reveal';
import { EnhancedParallaxLayer } from '@/components/animation/reveal';

gsap.registerPlugin(ScrollTrigger);

export function BrandStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const quoteMarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const body = bodyRef.current;
    const quoteMark = quoteMarkRef.current;

    if (!section || !heading || !subheading || !body) return;

    const ctx = gsap.context(() => {
      const lines = heading.querySelectorAll('span > span');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      tl.from(lines as any, { opacity: 0, y: '100%', duration: 1, stagger: 0.2, ease: [0.22, 1, 0.36, 1] } as any)
        .from(subheading.children as any, { opacity: 0, y: 30, duration: 0.8, stagger: 0.1, ease: 'power3.out' } as any, '-=0.4')
        .from(body, { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' } as any, '-=0.4');

      // Floating quote mark parallax
      if (quoteMark) {
        gsap.to(quoteMark, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-52 bg-ivory overflow-hidden">
      {/* Background layer (slowest - like a thick book at the bottom) */}
      <EnhancedParallaxLayer speed={0.3} className="absolute inset-0" as="div">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />
      </EnhancedParallaxLayer>

      {/* Midground layer (medium speed - like a medium book) */}
      <EnhancedParallaxLayer speed={0.5} className="absolute inset-0" as="div">
        <div
          ref={quoteMarkRef}
          className="absolute -top-10 right-10 md:right-20 text-[200px] md:text-[300px] font-display text-orange-500/5 leading-none pointer-events-none select-none"
          aria-hidden="true"
        >
          &ldquo;
        </div>
      </EnhancedParallaxLayer>

      {/* Foreground layer (normal speed - like the top book you can reach) */}
      <EnhancedParallaxLayer speed={1} className="relative z-10" as="div">
        <div className="container-wide">
          <div className="max-w-5xl">
            {/* Decorative line that draws itself */}
            <DecorativeLine className="w-24 mb-8" color="bg-orange-500" height={2} />

            <h2
              ref={headingRef}
              className="font-display text-charcoal font-medium leading-[1.1] text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-balance"
            >
              {['"Fashion is more', 'than what you wear."'].map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <span className="block">{line}</span>
                </span>
              ))}
            </h2>

            <div ref={subheadingRef}>
              <p className="font-display text-orange-600 text-3xl md:text-5xl font-medium italic mt-8">
                It is how you show up.
              </p>
            </div>
            <div ref={bodyRef}>
              <p className="mt-8 max-w-2xl text-charcoal/60 text-base md:text-lg font-body leading-relaxed">
                At ABL Fashion, we sew to match your occasion and touch lives through fashion. From our studio in Kasoa, Ghana, every garment is crafted to reflect your identity, your status, and your story — because your excellent satisfaction is our joy.
              </p>
            </div>
          </div>
        </div>
      </EnhancedParallaxLayer>
    </section>
  );
}
