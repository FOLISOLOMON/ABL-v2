'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { trainingPrograms } from '@/data/training';
import { Reveal, RevealText } from '@/components/animation/reveal';

const previewPrograms = trainingPrograms.slice(0, 3);

export function TrainingPreview() {
  return (
    <section
      className="py-32 md:py-44 bg-royal-700 text-white overflow-hidden relative"
    >
      {/* Background layer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 hidden lg:block"
        >
          <Image
            src="/images/image_8.jpeg"
            alt=""
            fill
            sizes="33vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-royal-700 via-transparent to-royal-700" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <div className="container-wide">
          <div className="max-w-3xl mb-12 md:mb-16">
            <Reveal>
              <p className="text-orange-400 text-xs uppercase tracking-editorial-wide mb-4">
                ABL Fashion Training Academy
              </p>
            </Reveal>
            <RevealText
              lines={['Learn the craft.', 'Build your future.']}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.05] text-balance"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 text-white/70 text-base md:text-lg font-body leading-relaxed max-w-xl">
                Turn your passion for fashion into a practical skill and a creative career.
              </p>
            </Reveal>
          </div>

          {/* Program highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {previewPrograms.map((program, i) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
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
      </div>
    </section>
  );
}