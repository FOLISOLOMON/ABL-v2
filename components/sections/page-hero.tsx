'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EnhancedParallaxLayer } from '@/components/animation/reveal';

gsap.registerPlugin(ScrollTrigger);

interface PageHeroProps {
  label: string;
  title?: string;
  titleLines?: string[];
  description?: string;
  image: string;
  align?: 'left' | 'center';
}

export function PageHero({
  label,
  title,
  titleLines,
  description,
  image,
  align = 'left',
}: PageHeroProps) {
  const lines = titleLines || (title ? [title] : []);
  const bgRef = useRef<HTMLDivElement>(null);

  // Mouse-driven parallax tilt on background
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!bgRef.current) return;
    const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
    const yPos = (e.clientY / window.innerHeight - 0.5) * 2;
    gsap.to(bgRef.current, {
      x: xPos * 8,
      y: yPos * 6,
      duration: 1.2,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!bgRef.current) return;
    gsap.to(bgRef.current, {
      x: 0,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section
      className="relative h-[70svh] min-h-[450px] w-full overflow-hidden flex items-end"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background layer (slowest - thick book) */}
      <EnhancedParallaxLayer speed={0.3} className="absolute inset-0" as="div">
        <div ref={bgRef} className="absolute inset-0 parallax-bg">
          <Image
            src={image}
            alt={title || lines.join(' ')}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        </div>
      </EnhancedParallaxLayer>

      {/* Foreground layer (normal speed - top book) */}
      <EnhancedParallaxLayer speed={1} className="relative z-10" as="div">
        <div
          className={`container-wide pb-16 md:pb-24 ${
            align === 'center' ? 'text-center mx-auto' : ''
          }`}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-orange-400 text-xs uppercase tracking-editorial-wide mb-5"
          >
            {label}
          </motion.p>

          <h1 className="font-display text-white font-bold leading-[1.05] text-4xl sm:text-6xl md:text-7xl text-shadow-hero">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mt-6 max-w-2xl text-white text-base md:text-lg font-body leading-relaxed tracking-wide text-shadow-hero"
            >
              {description}
            </motion.p>
          )}
        </div>
      </EnhancedParallaxLayer>
    </section>
  );
}
