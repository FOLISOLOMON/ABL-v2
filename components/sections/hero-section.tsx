'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const heroParticles = [
  { top: '24%', left: '18%', opacity: 0.42 },
  { top: '34%', left: '72%', opacity: 0.56 },
  { top: '48%', left: '38%', opacity: 0.36 },
  { top: '61%', left: '83%', opacity: 0.48 },
  { top: '72%', left: '24%', opacity: 0.52 },
  { top: '80%', left: '61%', opacity: 0.4 },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footnoteRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    const lines = linesRef.current;
    const meta = metaRef.current;
    const copy = copyRef.current;
    const cta = ctaRef.current;
    const footnote = footnoteRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const particles = particlesRef.current;

    if (!section || !bg || !overlay || !content || !lines || !meta || !copy || !cta || !footnote || !scrollIndicator) return;

    const ctx = gsap.context(() => {
      const lineTargets = Array.from(lines.children).flatMap((line) =>
        Array.from(line.children)
      );
      const ctaTargets = Array.from(cta.children);

      // ─── Entrance Timeline ────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      gsap.set(meta, { opacity: 0, y: 20 });
      gsap.set(lineTargets, { opacity: 0, y: '100%' });
      gsap.set(copy, { opacity: 0, y: 20 });
      gsap.set(ctaTargets, { opacity: 0, y: 30 });
      gsap.set(footnote, { opacity: 0, y: 20 });
      gsap.set(scrollIndicator, { opacity: 0 });
      gsap.set(overlay, { opacity: 0 });

      tl.call(() => window.dispatchEvent(new Event('hero-nav-reveal')), [], 0.35)
        .to(overlay, { opacity: 1, duration: 1.6, ease: 'power1.inOut' }, '+=0.2')
        .to(meta, { opacity: 1, y: 0, duration: 0.8 }, '+=0.15')
        // @ts-ignore - GSAP overload resolution
        .to(lineTargets, { opacity: 1, y: '0%', duration: 1, stagger: 0.15, ease: [0.22, 1, 0.36, 1] }, '-=0.4')
        .to(copy, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        // @ts-ignore - GSAP overload resolution
        .to(ctaTargets, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: [0.22, 1, 0.36, 1] }, '-=0.4')
        .to(footnote, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to(scrollIndicator, { opacity: 1, duration: 0.8 }, '-=0.2');

      // ─── 3-Layer Parallax ────────────────────────────────────────────
      // Background layer (slowest)
      gsap.to(bg, {
        scale: 1.2,
        y: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Midground overlay layer (medium speed) — parallax only, opacity stays at 1
      gsap.to(overlay, {
        y: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Foreground content layer (normal speed - moves with scroll)
      gsap.to(content, {
        y: 10,
        opacity: 0.7,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // ─── Mouse-driven subtle tilt on background ──────────────────────
      const handleMouseMove = (e: MouseEvent) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
        gsap.to(bg, {
          x: xPos * 10,
          duration: 1.5,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(bg, {
          x: 0,
          duration: 1.5,
          ease: 'power2.out',
        });
      };

      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseleave', handleMouseLeave);

      // ─── Particles / floating dust (decorative) ──────────────────────
      if (particles) {
        const particleEls = Array.from(particles.children);
        particleEls.forEach((particle, index) => {
          gsap.to(particle, {
            x: index % 2 === 0 ? 24 : -24,
            y: index % 3 === 0 ? 18 : -18,
            duration: 4 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden"
    >
      {/* Background image layer (Layer 1 - slowest parallax) */}
      <div ref={bgRef} className="absolute inset-0 parallax-bg">
        {/* Mobile / tablet image */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/images/hero.jpg"
            alt="ABL Fashion custom outfit"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Desktop / large screen image */}
        <div className="absolute inset-0 hidden md:block">
          <Image
            src="/images/hero desktop 2.jpg"
            alt="ABL Fashion custom outfit"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Midground gradient overlay (Layer 2 - medium parallax) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 parallax-mid bg-gradient-to-b from-black/60 via-black/45 to-black/70"
        style={{ opacity: 0 }}
      />

      {/* Particles / decorative elements (Layer 2.5) */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none z-[2] overflow-hidden"
        aria-hidden="true"
      >
        {heroParticles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: particle.top,
              left: particle.left,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>

      {/* Foreground content (Layer 3 - normal speed) */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-32"
      >
        <div className="container-wide">
          {/* Metadata */}
          <p
            ref={metaRef}
            className="text-white/70 text-xs uppercase tracking-editorial-wide mb-6 md:mb-8"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            Est. 2016 — Kasoa, Ghana
          </p>

          {/* Main heading with word-by-word reveal */}
          <h1 className="font-display text-white font-bold leading-[1.0] text-4xl sm:text-6xl md:text-7xl lg:text-[4.5rem] max-w-3xl text-shadow-hero">
            <div ref={linesRef}>
              {['We Sew to Match', 'Your Status.'].map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <span className="block" style={{ opacity: 0, transform: 'translateY(100%)' }}>
                    {line}
                  </span>
                </span>
              ))}
            </div>
          </h1>

          {/* Supporting copy */}
          <p
            ref={copyRef}
            className="mt-8 max-w-2xl text-white text-base md:text-lg font-body leading-relaxed tracking-wide text-shadow-hero"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            Custom fashion, timeless craftsmanship, and training designed to help you express your identity through fashion.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-xs uppercase tracking-editorial font-semibold rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-orange-500/30"
              style={{ opacity: 0, transform: 'translateY(30px)' }}
            >
              Book Your Custom Outfit
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/lookbook"
              className="group inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white px-8 py-4 text-xs uppercase tracking-editorial font-semibold rounded-full transition-all duration-300 hover:scale-[1.03]"
              style={{ opacity: 0, transform: 'translateY(30px)' }}
            >
              Explore the Lookbook
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <p
            ref={footnoteRef}
            className="mt-6 text-white/50 text-xs tracking-wide"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            All designs quoted individually. Chat with us on WhatsApp for fast pricing.
          </p>
        </div>
      </div>

      {/* Scroll indicator with continuous bounce + opacity loop */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-6 md:left-10 z-[5] flex items-center gap-3"
        style={{ opacity: 0 }}
      >
        <div className="relative w-px h-12 bg-white/30 overflow-hidden">
          <div className="absolute inset-0 bg-white animate-[scrollLine_2s_ease-in-out_infinite]" />
        </div>
        <span className="text-white/50 text-[10px] uppercase tracking-editorial-wide">
          Scroll to Explore
        </span>
      </div>

      {/* Bottom right decorative */}
      <div className="absolute bottom-8 right-6 md:right-10 z-[5] hidden md:block">
        <ChevronDown className="w-5 h-5 text-white/40 animate-bounce" />
      </div>
    </section>
  );
}
