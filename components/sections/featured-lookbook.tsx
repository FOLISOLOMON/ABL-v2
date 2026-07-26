'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Eye } from 'lucide-react';
import { EnhancedParallaxLayer } from '@/components/animation/reveal';
import { collections } from '@/data/collections';

gsap.registerPlugin(ScrollTrigger);

const previewItems = collections.slice(0, 4);

export function FeaturedLookbook() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    const ctx = gsap.context(() => {
      const items = grid.querySelectorAll('.lookbook-item');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      tl.from(header.children as any, { opacity: 0, y: 30, duration: 0.8, stagger: 0.15, ease: 'power3.out' } as any)
        .from(items as any, {
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 0.9,
          stagger: 0.2,
          ease: [0.22, 1, 0.36, 1],
        } as any, '-=0.4');

      // Parallax drift for each item at different speeds based on position
      items.forEach((item, i) => {
        const img = item.querySelector('img');
        if (!img) return;

        const speed = i % 2 === 0 ? 0.3 : 0.5;
        gsap.to(img, {
          y: speed * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });

      // Heading parallax drift
      const heading = header.querySelector('h2');
      if (heading) {
        gsap.to(heading, {
          x: 20,
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
    <section ref={sectionRef} className="py-32 md:py-44 bg-ivory overflow-hidden relative">
      {/* Background layer (slowest) */}
      <EnhancedParallaxLayer speed={0.3} className="absolute inset-0" as="div">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/3 to-transparent" />
      </EnhancedParallaxLayer>

      {/* Midground layer (medium) */}
      <EnhancedParallaxLayer speed={0.5} className="absolute inset-0" as="div">
        <div className="absolute top-1/3 right-10 w-48 h-48 bg-orange-500/5 rounded-full blur-2xl" />
      </EnhancedParallaxLayer>

      {/* Foreground layer (normal speed) */}
      <EnhancedParallaxLayer speed={1} className="relative z-10" as="div">
        <div className="container-wide">
          {/* Header */}
          <div ref={headerRef}>
            <div className="mb-12 md:mb-16">
              <p className="text-orange-600 text-xs uppercase tracking-editorial-wide mb-4">
                The Work Speaks
              </p>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <h2 className="font-display text-charcoal text-4xl md:text-6xl lg:text-7xl font-medium leading-tight">
                  The work speaks.
                </h2>
                <Link
                  href="/lookbook"
                  className="group inline-flex items-center gap-2 text-sm uppercase tracking-editorial font-semibold text-charcoal hover:text-orange-600 transition-colors"
                >
                  Explore the Full Lookbook
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Asymmetric grid */}
          <div ref={gridRef} className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Large portrait */}
            <div className="lookbook-item col-span-12 md:col-span-7 md:row-span-2 group relative aspect-[3/4] md:aspect-auto overflow-hidden rounded-lg">
              <LookbookImage item={previewItems[0]} />
            </div>

            {/* Small */}
            <div className="lookbook-item col-span-6 md:col-span-5 group relative aspect-square overflow-hidden rounded-lg">
              <LookbookImage item={previewItems[1]} />
            </div>

            {/* Medium */}
            <div className="lookbook-item col-span-6 md:col-span-5 group relative aspect-square overflow-hidden rounded-lg">
              <LookbookImage item={previewItems[2]} />
            </div>
          </div>

          {/* Wide image below */}
          <div className="lookbook-item mt-4 md:mt-6 group relative aspect-[16/7] overflow-hidden rounded-lg">
            <LookbookImage item={previewItems[3]} />
          </div>
        </div>
      </EnhancedParallaxLayer>
    </section>
  );
}

function LookbookImage({ item }: { item: (typeof collections)[0] }) {
  return (
    <Link href="/lookbook" className="block w-full h-full">
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <p className="text-orange-400 text-[10px] uppercase tracking-editorial-wide mb-1">
          {item.category}
        </p>
        <p className="text-white font-display text-lg md:text-xl font-medium">{item.title}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-white/80 text-xs uppercase tracking-editorial">
          <Eye className="w-3.5 h-3.5" /> View
        </span>
      </div>
    </Link>
  );
}
