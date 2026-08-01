'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { EnhancedParallaxLayer } from '@/components/animation/reveal';
import { trainingPrograms } from '@/data/training';

gsap.registerPlugin(ScrollTrigger);

const previewPrograms = trainingPrograms.slice(0, 3);

export function TrainingPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const blurBlobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bgImage = bgImageRef.current;
    const blurBlob = blurBlobRef.current;

    if (!section || !bgImage || !blurBlob) return;

    const ctx = gsap.context(() => {
      // Background image parallax drift
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          gsap.to(bgImage, {
            y: self.progress * 100,
            overwrite: 'auto',
          });
        },
      });

      // Decorative blur blob slow shift
      if (blurBlob) {
        gsap.to(blurBlob, {
          x: 30,
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-44 bg-royal-700 text-white overflow-hidden relative"
    >
      {/* Background layer (slowest - thick book) */}
      <EnhancedParallaxLayer speed={0.3} className="absolute inset-0" as="div">
        <div
          ref={bgImageRef}
          className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 hidden lg:block"
        >
          <Image
            src="/images/image_8.jpeg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-royal-700 via-transparent to-royal-700" />
      </EnhancedParallaxLayer>

      {/* Midground layer (medium speed - medium book) */}
      <EnhancedParallaxLayer speed={0.5} className="absolute inset-0" as="div">
        <div
          ref={blurBlobRef}
          className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
      </EnhancedParallaxLayer>

      {/* Foreground layer (normal speed - top book) */}
      <EnhancedParallaxLayer speed={1} className="relative z-10" as="div">
        <div className="container-wide">
          <div className="max-w-3xl mb-12 md:mb-16">
            <p className="text-orange-400 text-xs uppercase tracking-editorial-wide mb-4">
              ABL Fashion Training Academy
            </p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.05] text-balance">
              <span className="block overflow-hidden">
                <span className="block">Learn the craft.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="block">Build your future.</span>
              </span>
            </h2>
            <p className="mt-6 text-white/70 text-base md:text-lg font-body leading-relaxed max-w-xl">
              Turn your passion for fashion into a practical skill and a creative career.
            </p>
          </div>

          {/* Program highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {previewPrograms.map((program, i) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  delay: i * 0.15,
                  type: 'spring',
                  stiffness: 120,
                  damping: 20,
                  mass: 0.8,
                }}
                className="group border border-white/15 rounded-lg p-6 md:p-8 hover:bg-white/5 transition-colors duration-300"
              >
                <p className="text-orange-400 text-xs uppercase tracking-editorial mb-3">
                  {program.level}
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-medium mb-2">
                  {program.duration}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{program.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/training"
              className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-xs uppercase tracking-editorial font-semibold rounded-full transition-all duration-300 hover:scale-[1.03]"
            >
              Explore Training
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/training/apply"
              className="group inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white px-8 py-4 text-xs uppercase tracking-editorial font-semibold rounded-full transition-all duration-300 hover:scale-[1.03]"
            >
              Apply for Training
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </EnhancedParallaxLayer>
    </section>
  );
}
