'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useCallback } from 'react';
import { EnhancedParallaxLayer } from '@/components/animation/reveal';

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

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!bgRef.current) return;
    const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
    const yPos = (e.clientY / window.innerHeight - 0.5) * 2;
    bgRef.current.style.transform = `translate3d(${xPos * 8}px, ${yPos * 6}px, 0)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!bgRef.current) return;
    bgRef.current.style.transform = 'translate3d(0px, 0px, 0)';
  }, []);

  return (
    <section
      className="relative h-[70svh] min-h-[450px] w-full overflow-hidden flex items-end"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <EnhancedParallaxLayer speed={0.3} className="absolute inset-0" as="div">
        <div
          ref={bgRef}
          className="absolute inset-0 parallax-bg transition-transform duration-700 ease-out"
        >
          <Image
            src={image}
            alt={title || lines.join(' ')}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        </div>
      </EnhancedParallaxLayer>

      <div className="relative z-10 w-full">
        <div
          className={`container-wide pb-16 md:pb-24 ${align === 'center' ? 'text-center mx-auto' : ''
            }`}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
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
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-6 max-w-2xl text-white text-base md:text-lg font-body leading-relaxed tracking-wide text-shadow-hero"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}