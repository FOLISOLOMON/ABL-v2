'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { collections, lookbookCategories } from '@/data/collections';
import { ButtonLink } from '@/components/ui/button-link';
import { Reveal, RevealText } from '@/components/animation/reveal';
import { PageHero } from '@/components/sections/page-hero';
import { cn } from '@/lib/utils';

export default function LookbookPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<(typeof collections)[0] | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return collections;
    return collections.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <PageHero
        label="The Lookbook"
        title="The work speaks."
        description="A curated selection of garments crafted by ABL Fashion. Every piece tells a story of craftsmanship, culture, and confidence."
        image="/images/lookbook-1.jpg"
      />

      <section className="py-16 md:py-24 bg-ivory">
        <div className="container-wide">
          {/* Editorial Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-12 md:mb-16 border-b border-charcoal/15">
            <div className="flex flex-wrap gap-2">
              {lookbookCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    'px-5 py-2.5 text-xs uppercase tracking-editorial font-body font-medium rounded-none border transition-all duration-300',
                    activeCategory === category
                      ? 'bg-charcoal text-white border-charcoal'
                      : 'bg-transparent text-charcoal/60 border-charcoal/15 hover:border-charcoal/40 hover:text-charcoal'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
            <p className="text-[11px] uppercase tracking-editorial-wide text-charcoal/45">
              Showing {String(filtered.length).padStart(2, '0')} Archive Pieces
            </p>
          </div>

          {/* Editorial Masonry Exhibition Grid */}
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8"
          >
            <AnimatePresence>
              {filtered.map((item, idx) => {
                const plateNumber = String(idx + 1).padStart(2, '0');
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-8 md:mb-10 break-inside-avoid group cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    {/* Sharp Editorial Image Frame */}
                    <div
                      className={cn(
                        'relative w-full overflow-hidden rounded-none bg-charcoal/5 ring-1 ring-inset ring-charcoal/15',
                        item.size === 'large' && 'aspect-[3/4]',
                        item.size === 'medium' && 'aspect-[4/5]',
                        item.size === 'small' && 'aspect-square',
                        item.size === 'wide' && 'aspect-[16/10]'
                      )}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Permanent Museum Caption Bar */}
                    <div className="pt-3.5 pb-3 border-b border-charcoal/15 flex items-baseline justify-between gap-3">
                      <div className="flex items-baseline gap-2.5 min-w-0">
                        <span className="font-display italic text-orange-600 text-xs shrink-0">
                          {plateNumber}
                        </span>
                        <span className="text-charcoal/20 text-xs shrink-0">/</span>
                        <div className="min-w-0">
                          <p className="font-display text-charcoal text-lg font-medium truncate group-hover:text-orange-600 transition-colors">
                            {item.title}
                          </p>
                          <p className="text-[10px] uppercase tracking-editorial-wide text-charcoal/45 mt-0.5">
                            {item.category}
                          </p>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-editorial font-semibold text-charcoal/70 group-hover:text-orange-600 transition-colors shrink-0">
                        Inspect
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-charcoal text-white">
        <div className="container-narrow text-center">
          <RevealText
            lines={['Inspired by', 'what you see?']}
            className="font-display text-5xl md:text-7xl font-medium leading-tight mb-6"
          />
          <Reveal delay={0.2}>
            <p className="text-white/70 text-lg mb-10 max-w-md mx-auto">
              Request a custom design and we&apos;ll create something uniquely yours.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <ButtonLink href="/book">Request a Custom Design</ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* Museum Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-modal bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-ivory rounded-none border border-charcoal/20 max-w-4xl w-full max-h-[90vh] overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-none bg-ivory/90 border border-charcoal/15 flex items-center justify-center hover:bg-charcoal hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-square md:aspect-auto md:h-full min-h-[320px] ring-1 ring-inset ring-charcoal/10">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="p-8 md:p-10 flex flex-col justify-between bg-ivory">
                <div className="pb-4 border-b border-charcoal/10 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-editorial-wide text-orange-600 font-semibold">
                    Atelier Archive Dossier
                  </span>
                  <span className="text-[10px] uppercase tracking-editorial text-charcoal/40">
                    Kasoa Studio
                  </span>
                </div>

                <div className="my-auto py-6">
                  <p className="text-orange-600 text-xs uppercase tracking-editorial-wide mb-2">
                    {selectedItem.category}
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl font-medium text-charcoal mb-4">
                    {selectedItem.title}
                  </h3>
                  <p className="text-charcoal/65 text-base leading-relaxed mb-8">
                    {selectedItem.description}
                  </p>

                  <div className="border-t border-charcoal/10 pt-4 mb-8 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="uppercase tracking-editorial text-charcoal/40">Tailoring</span>
                      <span className="text-charcoal font-medium">Bespoke Made-to-Measure</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="uppercase tracking-editorial text-charcoal/40">Origin</span>
                      <span className="text-charcoal font-medium">ABL Fashion House, Ghana</span>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/233548883475?text=Hello%20ABL%20Fashion%2C%20I%20would%20like%20to%20request%20something%20similar%20to%20a%20piece%20in%20your%20lookbook."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 text-xs uppercase tracking-editorial font-semibold rounded-none transition-all duration-300 self-start"
                  >
                    Commission Similar Piece
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}