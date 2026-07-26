import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { Reveal, RevealText } from '@/components/animation/reveal';
import { ButtonLink } from '@/components/ui/button-link';
import { milestones, valueProps } from '@/data/training';
import { siteConfig } from '@/data/site';
import Image from 'next/image';
import { Ruler, Heart, Sparkles, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Discover the story of ABL Fashion, a Ghanaian fashion house established in 2016 in Kasoa, Ghana. We sew to match your occasion and touch lives through fashion.',
  openGraph: {
    title: 'About | ABL Fashion',
    description:
      'Discover the story of ABL Fashion, a Ghanaian fashion house established in 2016 in Kasoa, Ghana.',
    images: ['/images/about-1.jpg'],
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Ruler,
  Heart,
  Sparkles,
  GraduationCap,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About ABL Fashion"
        title="Crafted with purpose."
        description="ABL Fashion creates garments that reflect identity, confidence, and occasion."
        image="/images/about-1.jpg"
      />

      {/* Our Story */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                   <Image
                     src="/images/about-2.jpg"
                     alt="ABL Fashion craftsmanship"
                     fill
                     className="object-cover"
                   />
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-orange-600 text-xs uppercase tracking-editorial-wide mb-5">
                  Our Story
                </p>
              </Reveal>
              <RevealText
                lines={['From a single', 'machine to a', 'fashion house.']}
                className="font-display text-charcoal text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] mb-8"
              />
              <Reveal delay={0.3}>
                <div className="space-y-5 text-charcoal/70 text-base md:text-lg leading-relaxed font-body max-w-xl">
                  <p>
                    ABL Fashion was founded in 2016 in Kasoa, Ghana, with a simple belief: that
                    what you wear should reflect who you are. What began as a passion for sewing
                    has grown into a fashion house trusted by clients across Ghana and beyond.
                  </p>
                  <p>
                    Every garment we create is a conversation between tradition and modernity,
                    between the client&apos;s vision and the tailor&apos;s craft. We do not just
                    sew clothes, we create pieces that carry meaning.
                  </p>
                  <p>
                    Over the years, we expanded from custom sewing into fashion training, sharing
                    our craft with the next generation of designers through the ABL Fashion Training
                    Academy.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-32 bg-charcoal text-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <Reveal>
                <p className="text-orange-500 text-xs uppercase tracking-editorial-wide mb-5">
                  The ABL Philosophy
                </p>
              </Reveal>
              <RevealText
                lines={['We sew to', 'match your', 'occasion.']}
                className="font-display text-5xl md:text-7xl font-medium leading-[1.05] mb-8"
              />
              <Reveal delay={0.3}>
                <p className="text-white/70 text-lg leading-relaxed font-body max-w-lg">
                  From the first idea to the final stitch, ABL Fashion creates garments with
                  intention, precision, and personality. Every fabric is chosen with care, every
                  cut is measured with purpose, and every finish is held to a standard we are proud
                  to put our name on.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="mt-8 flex flex-col gap-3 text-white/60 text-sm font-body">
                  <p>
                    <span className="text-orange-500 font-semibold">Our Mission: </span>
                    {siteConfig.mission}.
                  </p>
                  <p>
                    <span className="text-orange-500 font-semibold">Our Tagline: </span>
                    {siteConfig.tagline}.
                  </p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                 <Image
                   src="/images/about-3.jpg"
                   alt="ABL Fashion philosophy"
                   fill
                   className="object-cover"
                 />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container-wide">
          <Reveal>
            <p className="text-orange-600 text-xs uppercase tracking-editorial-wide mb-5 text-center">
              Milestones
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-charcoal text-4xl md:text-5xl font-medium text-center mb-16">
              A journey of stitches and stories.
            </h2>
          </Reveal>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-charcoal/10 md:-translate-x-1/2" />

            {milestones.map((milestone, i) => (
              <Reveal key={milestone.year} delay={i * 0.1}>
                <div
                  className={`relative flex flex-col md:flex-row gap-6 mb-12 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="md:w-1/2 md:px-8 pl-12 md:pl-0">
                    <div className="bg-white border border-charcoal/10 rounded-lg p-6 md:p-8 shadow-sm">
                      <span className="font-display text-orange-600 text-3xl md:text-4xl font-bold block mb-2">
                        {milestone.year}
                      </span>
                      <h3 className="font-display text-xl font-medium text-charcoal mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-charcoal/60 text-sm leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 top-6 w-3 h-3 rounded-full bg-orange-500 md:-translate-x-1/2 ring-4 ring-ivory" />
                  <div className="md:w-1/2" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-24 md:py-32 bg-ivory border-t border-charcoal/10">
        <div className="container-wide">
          <Reveal>
            <p className="text-orange-600 text-xs uppercase tracking-editorial-wide mb-5 text-center">
              Why Choose ABL Fashion
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-charcoal text-4xl md:text-5xl font-medium text-center mb-16">
              The difference is in the details.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {valueProps.map((value, i) => {
              const Icon = iconMap[value.icon] || Sparkles;
              return (
                <Reveal key={value.title} delay={i * 0.1}>
                  <div className="group bg-white border border-charcoal/10 rounded-lg p-8 h-full hover:border-orange-500/30 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-5 group-hover:bg-orange-500 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="font-display text-xl font-medium text-charcoal mb-3">
                      {value.title}
                    </h3>
                    <p className="text-charcoal/60 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-16 text-center">
              <ButtonLink href="/book">Book a Consultation</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
