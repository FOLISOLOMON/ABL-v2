'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { EnhancedParallaxLayer } from '@/components/animation/reveal';

gsap.registerPlugin(ScrollTrigger);

export function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const heading = headingRef.current;
    const copy = copyRef.current;
    const cta = ctaRef.current;
    const decor = decorRef.current;

    if (!section || !bg || !heading || !copy || !cta) return;

    const ctx = gsap.context(() => {
      // Strong parallax background (faster than foreground)
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(bg, {
            y: progress * 80,
            scale: 1.1 + progress * 0.1,
            overwrite: 'auto',
          });
        },
      });

      // Entrance timeline
      const ctaTargets = Array.from(cta.children);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      tl.from(heading, { opacity: 0, y: 30, duration: 1, ease: [0.22, 1, 0.36, 1] } as any)
        .from(copy, { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' } as any, '-=0.4')
        .from(ctaTargets, { y: 30, duration: 0.8, stagger: 0.1, ease: [0.22, 1, 0.36, 1] } as any, '-=0.4');

      // Decorative elements at varying speeds
      if (decor) {
        const shapes = Array.from(decor.children);
        shapes.forEach((shape, i) => {
          const speed = i % 2 === 0 ? 0.2 : 0.4;
          gsap.to(shape, {
            y: i % 2 === 0 ? 40 : -40,
            rotate: i % 2 === 0 ? 15 : -15,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          });
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[80svh] min-h-[500px] w-full overflow-hidden flex items-center py-16"
    >
      {/* Background layer (slowest - thick book at the bottom) */}
      <EnhancedParallaxLayer speed={0.3} className="absolute inset-0" as="div">
        <div ref={bgRef} className="absolute inset-0 parallax-bg">
          <Image
            src="/images/image_1.jpeg"
            alt="Custom fashion by ABL"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        </div>
      </EnhancedParallaxLayer>

      {/* Midground layer (medium speed - medium book) */}
      <EnhancedParallaxLayer speed={0.5} className="absolute inset-0" as="div">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </EnhancedParallaxLayer>

      {/* Foreground layer (normal speed - top book) */}
      <EnhancedParallaxLayer speed={1} className="relative z-10" as="div">
        {/* Decorative floating geometric shapes */}
        <div ref={decorRef} className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/6 w-16 h-16 border border-orange-500/20 rounded-full" />
          <div className="absolute top-1/3 right-1/6 w-12 h-12 border border-orange-500/15 rounded-full" />
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border border-orange-500/10 rounded-full" />
          <div className="absolute bottom-1/3 right-1/4 w-8 h-8 border border-orange-500/20 rounded-full" />
        </div>

        <div className="container-wide text-center">
          {/* Heading */}
          <h2
            ref={headingRef}
            className="font-display text-white font-medium leading-[1.1] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-balance"
          >
            <span className="block overflow-hidden">
              <span className="block">Ready to wear</span>
            </span>
            <span className="block overflow-hidden">
              <span className="block">your story?</span>
            </span>
          </h2>

          {/* Subheading */}
          <p
            ref={copyRef}
            className="mt-8 max-w-2xl text-white/70 text-base md:text-lg font-body leading-relaxed mx-auto"
          >
            Let us create something extraordinary for you. From custom designs to complete outfits, every piece is crafted with passion and precision.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-xs uppercase tracking-editorial font-semibold rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-orange-500/30"
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/lookbook"
              className="group inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white px-8 py-4 text-xs uppercase tracking-editorial font-semibold rounded-full transition-all duration-300 hover:scale-[1.03]"
            >
              Explore the Lookbook
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </EnhancedParallaxLayer>
    </section>
  );
}
