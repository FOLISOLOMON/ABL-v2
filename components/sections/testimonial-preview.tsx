'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { EnhancedParallaxLayer } from '@/components/animation/reveal';
import { testimonials } from '@/data/testimonials';

gsap.registerPlugin(ScrollTrigger);

const AUTO_PLAY_INTERVAL = 6000;

export function TestimonialPreview() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteMarkRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  // Parallax gradient shift on background
  useEffect(() => {
    const section = sectionRef.current;
    const quoteMark = quoteMarkRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (quoteMark) {
        gsap.to(quoteMark, {
          scale: 1.1,
          opacity: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const current = testimonials[index];

  return (
    <section ref={sectionRef} className="py-32 md:py-48 bg-ivory overflow-hidden relative">
      {/* Background layer (slowest) */}
      <EnhancedParallaxLayer speed={0.3} className="absolute inset-0" as="div">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/3 to-transparent" />
      </EnhancedParallaxLayer>

      {/* Midground layer (medium) */}
      <EnhancedParallaxLayer speed={0.5} className="absolute inset-0" as="div">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-orange-500/5 rounded-full blur-2xl" />
      </EnhancedParallaxLayer>

      {/* Foreground layer (normal speed) */}
      <EnhancedParallaxLayer speed={1} className="relative z-10" as="div">
        {/* Decorative large quote mark */}
        <div
          ref={quoteMarkRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[250px] md:text-[400px] font-display text-orange-500/5 leading-none pointer-events-none select-none"
          aria-hidden="true"
        >
          &ldquo;
        </div>

        <div
          className="container-narrow text-center relative z-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <Quote className="w-12 h-12 text-orange-500/40" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs uppercase tracking-editorial-wide text-charcoal/40 mb-8"
          >
            Client Experience
          </motion.p>

          <div className="relative min-h-[200px] md:min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-charcoal text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.3] text-balance"
              >
                &ldquo;{current.quote}&rdquo;
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <AnimatePresence>
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10"
            >
              <p className="font-body text-sm font-semibold text-charcoal">{current.author}</p>
              <p className="text-charcoal/50 text-xs uppercase tracking-editorial mt-1">
                {current.location}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl border border-charcoal/15 flex items-center justify-center text-charcoal/60 hover:text-orange-600 hover:border-orange-500/40 transition-colors hover:translate-x-[-2px]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'bg-orange-500 w-6 scale-110' : 'bg-charcoal/15 w-1.5 hover:bg-charcoal/30 hover:scale-125'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-xl border border-charcoal/15 flex items-center justify-center text-charcoal/60 hover:text-orange-600 hover:border-orange-500/40 transition-colors hover:translate-x-[2px]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </EnhancedParallaxLayer>
    </section>
  );
}
