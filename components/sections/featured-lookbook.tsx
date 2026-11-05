'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { collections } from '@/data/collections';

const previewItems = collections.slice(0, 4);

export function FeaturedLookbook() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="py-32 md:py-44 bg-ivory overflow-hidden relative">
      {/* Background layer */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/3 to-transparent" />
      </div>

      {/* Midground layer */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/3 right-10 w-48 h-48 bg-orange-500/5 rounded-full blur-2xl" />
      </div>

      {/* Foreground layer */}
      <div className="relative z-10">
        <div className="container-wide">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-12 md:mb-16 pb-8 border-b border-charcoal/10">
              <p className="text-orange-600 text-xs uppercase tracking-editorial-wide mb-4">
                The Work Speaks
              </p>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <h2 className="font-display text-charcoal text-4xl md:text-6xl lg:text-7xl font-medium leading-tight">
                  The work speaks.
                </h2>
                <Link
                  href="/lookbook"
                  className="group inline-flex items-center gap-2 text-sm uppercase tracking-editorial font-semibold text-charcoal hover:text-orange-600 transition-colors"
                >
                  Explore the Full Lookbook
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Asymmetric Editorial Exhibition Grid */}
          <div className="grid grid-cols-12 gap-6 md:gap-8">
            {/* Large portrait */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lookbook-item col-span-12 md:col-span-7 md:row-span-2 group flex flex-col"
            >
              <LookbookPiece item={previewItems[0]} index={0} aspectClass="aspect-[3/4]" />
            </motion.div>

            {/* Small */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="lookbook-item col-span-12 sm:col-span-6 md:col-span-5 group flex flex-col"
            >
              <LookbookPiece item={previewItems[1]} index={1} aspectClass="aspect-square" />
            </motion.div>

            {/* Medium */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="lookbook-item col-span-12 sm:col-span-6 md:col-span-5 group flex flex-col"
            >
              <LookbookPiece item={previewItems[2]} index={2} aspectClass="aspect-square" />
            </motion.div>
          </div>

          {/* Wide image below */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="lookbook-item mt-8 md:mt-10 group"
          >
            <LookbookPiece item={previewItems[3]} index={3} aspectClass="aspect-[16/8] md:aspect-[16/7]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LookbookPiece({
  item,
  index,
  aspectClass,
}: {
  item: (typeof collections)[0];
  index: number;
  aspectClass: string;
}) {
  const plateNumber = String(index + 1).padStart(2, '0');

  return (
    <Link href="/lookbook" className="block w-full">
      {/* Sharp Editorial Image Frame */}
      <div
        className={`relative w-full ${aspectClass} overflow-hidden rounded-none bg-charcoal/5 ring-1 ring-inset ring-charcoal/15`}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Permanent Museum Caption Bar */}
      <div className="pt-3.5 pb-3 border-b border-charcoal/15 flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3 min-w-0">
          <span className="font-display italic text-orange-600 text-xs shrink-0">
            Plate {plateNumber}
          </span>
          <span className="text-charcoal/20 text-xs shrink-0">/</span>
          <p className="font-display text-charcoal text-lg md:text-xl font-medium truncate group-hover:text-orange-600 transition-colors">
            {item.title}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline-block text-[10px] uppercase tracking-editorial-wide text-charcoal/50">
            {item.category}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-editorial font-semibold text-charcoal group-hover:text-orange-600 transition-colors">
            Inspect
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}