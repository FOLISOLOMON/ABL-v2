'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye } from 'lucide-react';
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
          {/* Filters */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-12 md:mb-16">
            {lookbookCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'px-5 py-2.5 text-xs uppercase tracking-editorial font-body font-medium rounded-full border transition-all duration-300',
                  activeCategory === category
                    ? 'bg-charcoal text-white border-charcoal'
                    : 'bg-transparent text-charcoal/60 border-charcoal/15 hover:border-charcoal/30 hover:text-charcoal'
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6"
          >
            <AnimatePresence>
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    'mb-4 md:mb-6 break-inside-avoid group relative overflow-hidden rounded-lg cursor-pointer',
                    item.size === 'large' && 'aspect-[3/4]',
                    item.size === 'medium' && 'aspect-[4/5]',
                    item.size === 'small' && 'aspect-square',
                    item.size === 'wide' && 'aspect-[16/10]'
                  )}
                  onClick={() => setSelectedItem(item)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-orange-400 text-[10px] uppercase tracking-editorial-wide mb-1">
                      {item.category}
                    </p>
                    <p className="text-white font-display text-lg font-medium">{item.title}</p>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-white/80 text-xs uppercase tracking-editorial">
                      <Eye className="w-3.5 h-3.5" /> View
                    </span>
                  </div>
                </motion.div>
              ))}
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

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
             className="fixed inset-0 z-modal bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-ivory rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden grid grid-cols-1 md:grid-cols-2"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-charcoal" />
              </button>

              <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px]">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="p-8 md:p-10 flex flex-col justify-center">
                <p className="text-orange-600 text-xs uppercase tracking-editorial-wide mb-3">
                  {selectedItem.category}
                </p>
                <h3 className="font-display text-3xl md:text-4xl font-medium text-charcoal mb-4">
                  {selectedItem.title}
                </h3>
                <p className="text-charcoal/60 text-base leading-relaxed mb-8">
                  {selectedItem.description}
                </p>
                <a
                  href="https://wa.me/233548883475?text=Hello%20ABL%20Fashion%2C%20I%20would%20like%20to%20request%20something%20similar%20to%20a%20piece%20in%20your%20lookbook."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 text-xs uppercase tracking-editorial font-semibold rounded-full transition-all duration-300 hover:scale-[1.03] self-start"
                >
                  Request Something Similar
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
