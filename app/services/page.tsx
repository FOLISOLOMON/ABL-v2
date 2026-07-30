import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/sections/page-hero';
import { Reveal, RevealText } from '@/components/animation/reveal';
import { ButtonLink } from '@/components/ui/button-link';
import { services } from '@/data/services';
import { Check, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services',
  description:
     'Explore ABL Fashion services: custom sewing, bridal wear, menswear, womenswear, childrenswear, fascinators, ready-to-wear, traditional wear, and custom-made outfits.',
  openGraph: {
    title: 'Services | ABL Fashion',
    description:
      'Explore ABL Fashion services: custom sewing, bridal wear, menswear, womenswear, and more.',
    images: ['/images/hero.jpg'],
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="What We Create"
        title="What We Create."
        description="From bridal couture to everyday elegance, every service at ABL Fashion is crafted with intention and precision."
        image="/images/hero.jpg"
      />

      {/* Sticky side nav + content */}
      <section className="py-16 md:py-24 bg-ivory">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Side nav */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28">
                <p className="text-xs uppercase tracking-editorial text-charcoal/40 mb-5">
                  Service Index
                </p>
                <nav className="flex flex-col gap-1">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`#${service.id}`}
                      className="group flex items-baseline gap-3 py-2 text-sm text-charcoal/60 hover:text-orange-600 transition-colors"
                    >
                      <span className="font-display text-xs text-orange-500/60 font-bold">
                        {service.number}
                      </span>
                      <span className="link-underline">{service.title}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Service sections */}
            <div className="lg:col-span-9">
              {services.map((service, i) => (
                <ServiceSection key={service.id} service={service} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-charcoal text-white">
        <div className="container-narrow text-center">
          <RevealText
            lines={['Your garment', 'is waiting.']}
            className="font-display text-5xl md:text-7xl font-medium leading-tight mb-6"
          />
          <Reveal delay={0.2}>
            <p className="text-white/70 text-lg mb-10 max-w-md mx-auto">
              Book a consultation and let&apos;s bring your vision to life.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <ButtonLink href="/book">Book a Consultation</ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ServiceSection({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const isImageLeft = index % 2 === 0;

  return (
    <div
      id={service.id}
      className={`scroll-mt-28 mb-20 md:mb-28 ${
        index !== services.length - 1 ? 'border-b border-charcoal/10 pb-20 md:pb-28' : ''
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Image */}
        <Reveal className={isImageLeft ? 'md:order-1' : 'md:order-2'}>
          <div className="group relative aspect-[3/4] overflow-hidden rounded-lg">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </Reveal>

        {/* Text */}
        <div className={isImageLeft ? 'md:order-2' : 'md:order-1'}>
          <Reveal>
            <span className="font-display text-orange-600/50 text-6xl md:text-7xl font-bold block mb-4">
              {service.number}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-charcoal mb-4">
              {service.title}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-charcoal/60 text-base md:text-lg leading-relaxed mb-6">
              {service.description}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="space-y-2 mb-8">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-sm text-charcoal/70">
                  <Check className="w-4 h-4 text-orange-500 shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.25}>
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-editorial font-semibold text-charcoal hover:text-orange-600 transition-colors"
            >
              Book or Enquire
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
