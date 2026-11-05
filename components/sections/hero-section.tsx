'use client';

import Link from 'next/link';
import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const heroParticles = [
  { top: '24%', left: '18%', opacity: 0.42 },
  { top: '34%', left: '72%', opacity: 0.56 },
  { top: '48%', left: '38%', opacity: 0.36 },
  { top: '61%', left: '83%', opacity: 0.48 },
  { top: '72%', left: '24%', opacity: 0.52 },
  { top: '80%', left: '61%', opacity: 0.4 },
];

export function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('hero-nav-reveal'));
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!bgRef.current) return;
    const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
    bgRef.current.style.transform = `translate3d(${xPos * 10}px, 0, 0)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!bgRef.current) return;
    bgRef.current.style.transform = 'translate3d(0px, 0, 0)';
  }, []);

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden"
    >
      {/* Background image layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 transition-transform duration-700 ease-out"
      >
        {/* Mobile / tablet image */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/images/hero.jpg"
            alt="ABL Fashion custom outfit"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 1px"
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
            sizes="(min-width: 768px) 100vw, 1px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Midground gradient overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70"
      />

      {/* Decorative particles */}
      <div
        className="absolute inset-0 pointer-events-none z-[2] overflow-hidden"
        aria-hidden="true"
      >
        {heroParticles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              top: particle.top,
              left: particle.left,
              opacity: particle.opacity,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </div>

      {/* Foreground content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-32">
        <div className="container-wide">
          {/* Metadata */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-white/70 text-xs uppercase tracking-editorial-wide mb-6 md:mb-8"
          >
            Est. 2016 — Kasoa, Ghana
          </motion.p>

          {/* Main heading */}
          <h1 className="font-display text-white font-bold leading-[1.0] text-4xl sm:text-6xl md:text-7xl lg:text-[4.5rem] max-w-3xl text-shadow-hero">
            {['We Sew to Match', 'Your Status.'].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: '0%' }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Supporting copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-8 max-w-2xl text-white text-base md:text-lg font-body leading-relaxed tracking-wide text-shadow-hero"
          >
            Custom fashion, timeless craftsmanship, and training designed to help you express your identity through fashion.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-xs uppercase tracking-editorial font-semibold rounded-full transition-colors duration-300 hover:shadow-lg hover:shadow-orange-500/30"
            >
              Book Your Custom Outfit
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/lookbook"
              className="group inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white px-8 py-4 text-xs uppercase tracking-editorial font-semibold rounded-full transition-colors duration-300"
            >
              Explore the Lookbook
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="mt-6 text-white/50 text-xs tracking-wide"
          >
            All designs quoted individually. Chat with us on WhatsApp for fast pricing.
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.6 }}
        className="absolute bottom-8 left-6 md:left-10 z-[5] flex items-center gap-3"
      >
        <div className="relative w-px h-12 bg-white/30 overflow-hidden">
          <div className="absolute inset-0 bg-white animate-[scrollLine_2s_ease-in-out_infinite]" />
        </div>
        <span className="text-white/50 text-[10px] uppercase tracking-editorial-wide">
          Scroll to Explore
        </span>
      </motion.div>

      {/* Bottom right decorative */}
      <div className="absolute bottom-8 right-6 md:right-10 z-[5] hidden md:block">
        <ChevronDown className="w-5 h-5 text-white/40 animate-bounce" />
      </div>
    </section>
  );
}