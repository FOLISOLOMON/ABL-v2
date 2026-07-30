'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';
import { collections } from '@/data/collections';

const previewItems = collections.slice(0, 4);

export function FeaturedLookbook() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="py-32 md:py-44 bg-ivory overflow-hidden relative">
      {/* Background layer (slowest) */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/3 to-transparent" />
      </div>

      {/* Midground layer (medium) */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/3 right-10 w-48 h-48 bg-orange-500/5 rounded-full blur-2xl" />
      </div>

      {/* Foreground layer (normal speed) */}
      <div className="relative z-10">
        <div className="container-wide">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-12 md:mb-16">
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

          {/* Asymmetric grid */}
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Large portrait */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lookbook-item col-span-12 md:col-span-7 md:row-span-2 group relative aspect-[3/4] overflow-hidden rounded-lg"
            >
              <LookbookImage item={previewItems[0]} />
            </motion.div>

            {/* Small */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lookbook-item col-span-6 md:col-span-5 group relative aspect-square overflow-hidden rounded-lg"
            >
              <LookbookImage item={previewItems[1]} />
            </motion.div>

            {/* Medium */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lookbook-item col-span-6 md:col-span-5 group relative aspect-square overflow-hidden rounded-lg"
            >
              <LookbookImage item={previewItems[2]} />
            </motion.div>
          </div>

          {/* Wide image below */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lookbook-item mt-4 md:mt-6 group relative aspect-[16/7] overflow-hidden rounded-lg"
          >
            <LookbookImage item={previewItems[3]} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LookbookImage({ item }: { item: (typeof collections)[0] }) {
  return (
    <Link href="/lookbook" className="block w-full h-full">
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <p className="text-orange-400 text-[10px] uppercase tracking-editorial-wide mb-1">
          {item.category}
        </p>
        <p className="text-white font-display text-lg md:text-xl font-medium">{item.title}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-white/80 text-xs uppercase tracking-editorial">
          <Eye className="w-3.5 h-3.5" /> View
        </span>
      </div>
    </Link>
  );
}
