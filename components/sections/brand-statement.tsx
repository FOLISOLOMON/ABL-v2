'use client';

import { DecorativeLine, Reveal, RevealText } from '@/components/animation/reveal';

export function BrandStatement() {
  return (
    <section className="relative py-32 md:py-52 bg-ivory overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />
        <div className="absolute -top-10 right-10 md:right-20 text-[200px] md:text-[300px] font-display text-orange-500/5 leading-none select-none">
          &ldquo;
        </div>
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <div className="container-wide">
          <div className="max-w-5xl">
            <DecorativeLine className="w-24 mb-8" color="bg-orange-500" height={2} />

            <RevealText
              lines={['"Fashion is more', 'than what you wear."']}
              className="font-display text-charcoal font-medium leading-[1.1] text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-balance"
            />

            <Reveal delay={0.2}>
              <p className="font-display text-orange-600 text-3xl md:text-5xl font-medium italic mt-8">
                It is how you show up.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-8 max-w-2xl text-charcoal/60 text-base md:text-lg font-body leading-relaxed">
                At ABL Fashion, we sew to match your occasion and touch lives through fashion. From our studio in Kasoa, Ghana, every garment is crafted to reflect your identity, your status, and your story — because your excellent satisfaction is our joy.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}