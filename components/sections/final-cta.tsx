'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Reveal, RevealText } from '@/components/animation/reveal';

export function FinalCTA() {
  return (
    <section className="relative h-[80svh] min-h-[500px] w-full overflow-hidden flex items-center py-16">
      {/* Background layer */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <Image
            src="/images/image_1.jpeg"
            alt="Custom fashion by ABL"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 w-full">
        <div className="container-wide text-center">
          <RevealText
            lines={['Ready to wear', 'your story?']}
            className="font-display text-white font-medium leading-[1.1] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-balance"
          />

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-2xl text-white/70 text-base md:text-lg font-body leading-relaxed mx-auto">
              Let us create something extraordinary for you. From custom designs to complete outfits, every piece is crafted with passion and precision.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-xs uppercase tracking-editorial font-semibold rounded-full transition-colors duration-300 hover:shadow-lg hover:shadow-orange-500/30 justify-center"
              >
                Book a Consultation
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/lookbook"
                className="group inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white px-8 py-4 text-xs uppercase tracking-editorial font-semibold rounded-full transition-colors duration-300 justify-center"
              >
                Explore the Lookbook
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}