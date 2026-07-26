'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { EnhancedParallaxLayer } from '@/components/animation/reveal';
import { featuredServices } from '@/data/services';

gsap.registerPlugin(ScrollTrigger);

export function FeaturedServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll('.service-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      tl.from(header.children as any, { opacity: 0, y: 30, duration: 0.8, stagger: 0.1, ease: 'power3.out' } as any)
        .from(cards as any, { opacity: 0, scale: 0.9, y: 40, duration: 0.7, stagger: 0.1, ease: [0.22, 1, 0.36, 1] } as any, '-=0.4');

      // Per-card image parallax tilt on mouse move
      cards.forEach((card) => {
        const img = card.querySelector('img');
        if (!img) return;

        card.addEventListener('mousemove', (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const rect = card.getBoundingClientRect();
          const x = (mouseEvent.clientX - rect.left) / rect.width - 0.5;
          const y = (mouseEvent.clientY - rect.top) / rect.height - 0.5;
          gsap.to(img, {
            x: x * 10,
            y: y * 8,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(img, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-44 bg-charcoal text-white overflow-hidden relative"
      style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 70%)' }}
    >
      {/* Background layer (slowest - thick book at the bottom) */}
      <EnhancedParallaxLayer speed={0.3} className="absolute inset-0" as="div">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </EnhancedParallaxLayer>

      {/* Midground layer (medium speed - medium book) */}
      <EnhancedParallaxLayer speed={0.5} className="absolute inset-0" as="div">
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/3 rounded-full blur-2xl" />
      </EnhancedParallaxLayer>

      {/* Foreground layer (normal speed - top book you can reach) */}
      <EnhancedParallaxLayer speed={1} className="relative z-10" as="div">
        <div className="container-wide">
          {/* Header */}
          <div ref={headerRef}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <p className="text-orange-500 text-xs uppercase tracking-editorial-wide mb-4">
                  What We Create
                </p>
                <h2 className="font-display text-4xl md:text-6xl font-medium leading-tight">
                  Crafted for every
                  <br />
                  moment that matters.
                </h2>
              </div>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-sm uppercase tracking-editorial font-semibold text-white/80 hover:text-orange-400 transition-colors"
              >
                View All Services
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Featured grid */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredServices.map((service, i) => (
              <Link key={service.id} href={`/services#${service.id}`} className="service-card block group relative">
                {/* Number */}
                <span className="font-display text-orange-500/60 text-5xl md:text-6xl font-bold block mb-4">
                  {service.number}
                </span>

                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white/5 mb-5">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl md:text-2xl font-medium mb-2 group-hover:text-orange-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </EnhancedParallaxLayer>
    </section>
  );
}
