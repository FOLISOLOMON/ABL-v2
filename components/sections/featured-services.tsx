'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { featuredServices } from '@/data/services';
import { Reveal } from '@/components/animation/reveal';

export function FeaturedServices() {
  return (
    <section
      className="py-32 md:py-44 bg-charcoal text-white overflow-hidden relative"
      style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 70%)' }}
    >
      <div className="relative z-10">
        <div className="container-wide">
          {/* Header */}
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
              <div>
                <p className="text-orange-500 text-xs uppercase tracking-editorial-wide mb-4">
                  What We Create
                </p>
                <h2 className="font-display text-4xl md:text-6xl font-medium leading-tight">
                  Crafted for every
                  <br />
                  moment that matters.
                </h2>
              </div>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-sm uppercase tracking-editorial font-semibold text-white/80 hover:text-orange-400 transition-colors"
              >
                View All Services
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          {/* Editorial Framed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/services#${service.id}`} className="service-card block group relative">
                  {/* Top Editorial Dossier Strip */}
                  <div className="flex items-baseline justify-between pb-3 mb-3 border-b border-white/15">
                    <span className="font-display italic text-orange-500 text-2xl md:text-3xl font-medium">
                      {service.number}
                    </span>
                    <span className="text-[10px] uppercase tracking-editorial-wide text-white/40 group-hover:text-orange-400 transition-colors">
                      Atelier Service
                    </span>
                  </div>

                  {/* Sharp Editorial Image Frame */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-none bg-white/5 ring-1 ring-inset ring-white/15">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Museum Caption Bar */}
                  <div className="pt-4 pb-3 border-b border-white/10">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="font-display text-xl md:text-2xl font-medium group-hover:text-orange-400 transition-colors">
                        {service.title}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 mt-1.5" />
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}