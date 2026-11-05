import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/sections/page-hero';
import { Reveal, RevealText, Stagger, StaggerItem } from '@/components/animation/reveal';
import { ButtonLink } from '@/components/ui/button-link';
import { trainingPrograms, trainingSkills } from '@/data/training';
import { Ruler, Scissors, Sparkles, Shirt, Briefcase, Check, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Training',
  description:
    'Learn fashion design and sewing at ABL Fashion Training Academy in Kasoa, Ghana. Programs from 6 months to 3 years covering pattern drafting, garment construction, and fashion business.',
  openGraph: {
    title: 'Training | ABL Fashion',
    description:
      'Learn fashion design and sewing at ABL Fashion Training Academy in Kasoa, Ghana.',
    images: ['/images/about-2.jpg'],
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Ruler,
  Scissors,
  Sparkles,
  Shirt,
  Briefcase,
};

export default function TrainingPage() {
  return (
    <>
      <PageHero
        label="ABL Fashion Training Academy"
        titleLines={['Learn the craft.', 'Build your future.']}
        description="Turn your passion for fashion into a practical skill and a creative career."
        image="/images/about-2.jpg"
      />

      {/* Program Overview */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container-wide">
          <Reveal>
            <p className="text-orange-600 text-xs uppercase tracking-editorial-wide mb-5 text-center">
              Program Overview
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-charcoal text-4xl md:text-5xl font-medium text-center mb-6 max-w-2xl mx-auto">
              Choose the path that fits your ambition.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-charcoal/60 text-center text-base md:text-lg max-w-xl mx-auto mb-16">
              Five structured programs, each building on the last, from beginner foundations to
              master-level fashion design.
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingPrograms.map((program, idx) => (
              <StaggerItem key={program.id}>
                <div className="group h-full bg-white border border-charcoal/15 rounded-none p-8 hover:border-orange-500/40 hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-charcoal/10">
                    <span className="font-display italic text-orange-600 text-sm">
                      Tier 0{idx + 1}
                    </span>
                    <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-editorial font-semibold bg-orange-50 text-orange-600 border border-orange-500/20">
                      {program.level}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-medium text-charcoal mb-1">
                    {program.duration}
                  </h3>
                  <p className="text-charcoal/50 text-sm font-body mb-4">{program.title}</p>
                  <p className="text-charcoal/60 text-sm leading-relaxed mb-6">
                    {program.description}
                  </p>

                  <div className="mt-auto">
                    <p className="text-[10px] uppercase tracking-editorial-wide text-charcoal/40 mb-3">
                      Skills Covered
                    </p>
                    <ul className="space-y-1.5 mb-5">
                      {program.skills.map((skill) => (
                        <li key={skill} className="flex items-start gap-2 text-sm text-charcoal/70">
                          <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-1" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-5 border-t border-charcoal/10">
                      <p className="text-xs text-charcoal/50">
                        <span className="font-semibold text-charcoal">Certificate: </span>
                        {program.certificate}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}

            {/* CTA card */}
            <StaggerItem>
              <div className="h-full bg-royal-700 text-white rounded-none border border-royal-800 p-8 flex flex-col justify-center items-center text-center">
                <p className="text-[10px] uppercase tracking-editorial-wide text-orange-400 mb-3">
                  Academic Guidance
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-medium mb-4">
                  Not sure which
                  <br />
                  program is right?
                </h3>
                <p className="text-white/70 text-sm mb-6">
                  Talk to us and we&apos;ll help you find your path.
                </p>
                <ButtonLink href="/training/apply" variant="primary">
                  Apply for Training
                </ButtonLink>
              </div>
            </StaggerItem>
          </Stagger>

          {/* Enrollment info */}
          <Reveal delay={0.3}>
            <div className="mt-12 p-6 md:p-8 bg-white border border-charcoal/15 rounded-none">
              <h3 className="font-display text-xl font-medium text-charcoal mb-2">How to Enroll</h3>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                Purchase your enrollment form at our office: <strong className="text-charcoal">Kasoa, Adam Nana Bus Stop, off Obom Road</strong>. Fees vary by program duration — contact management for current pricing.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What Students Learn */}
      <section className="py-24 md:py-32 bg-charcoal text-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="text-orange-500 text-xs uppercase tracking-editorial-wide mb-5">
                  What Students Learn
                </p>
              </Reveal>
              <RevealText
                lines={['Skills that', 'last a', 'lifetime.']}
                className="font-display text-5xl md:text-6xl font-medium leading-tight mb-6"
              />
              <Reveal delay={0.2}>
                <p className="text-white/70 text-lg leading-relaxed max-w-md">
                  Our curriculum is built on years of practical experience. You learn by doing,
                  from the first cut to the final finish.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trainingSkills.map((skill) => {
                  const Icon = iconMap[skill.icon] || Sparkles;
                  return (
                    <StaggerItem key={skill.title}>
                      <div className="group border border-white/15 rounded-none p-6 hover:bg-white/5 transition-colors duration-300">
                        <div className="w-10 h-10 rounded-none bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors duration-300">
                          <Icon className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="font-display text-lg font-medium mb-2">{skill.title}</h3>
                        <p className="text-white/50 text-sm leading-relaxed">{skill.description}</p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate & Career Value */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <div className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-none bg-charcoal/5 ring-1 ring-inset ring-charcoal/15">
                  <Image
                    src="/images/image_1.jpeg"
                    alt="Fashion training at ABL"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="pt-3 pb-2.5 border-b border-charcoal/15 flex items-center justify-between text-[10px] uppercase tracking-editorial-wide text-charcoal/50">
                  <span>Academy Archive — Practical Studio</span>
                  <span className="text-orange-600 font-semibold">Certified Training</span>
                </div>
              </div>
            </Reveal>
            <div>
              <Reveal>
                <p className="text-orange-600 text-xs uppercase tracking-editorial-wide mb-5">
                  Certificate & Career Value
                </p>
              </Reveal>
              <RevealText
                lines={['A credential', 'that opens', 'doors.']}
                className="font-display text-4xl md:text-5xl font-medium leading-tight mb-6 text-charcoal"
              />
              <Reveal delay={0.2}>
                <p className="text-charcoal/60 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                  Graduates of ABL Fashion Training Academy leave with more than a certificate.
                  They leave with the skills, confidence, and portfolio to start their own fashion
                  business or join established fashion houses.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <ul className="space-y-3 border-t border-charcoal/10 pt-6">
                  {[
                    'Recognized certificate upon completion',
                    'Portfolio of real garments you created',
                    'Fashion business and pricing fundamentals',
                    'Pathway to starting your own sewing business',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-charcoal/70">
                      <span className="w-6 h-6 rounded-none bg-orange-50 border border-orange-500/20 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-orange-600" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment CTA */}
      <section className="relative py-24 md:py-32 bg-royal-700 text-white overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 hidden lg:block">
          <Image
            src="/images/image_2.jpeg"
            alt=""
            fill
            sizes="33vw"
            className="object-cover"
          />
        </div>
        <div className="container-narrow text-center relative z-10">
          <RevealText
            lines={['Your future', 'in fashion', 'starts here.']}
            className="font-display text-5xl md:text-7xl font-medium leading-tight mb-6"
          />
          <Reveal delay={0.2}>
            <p className="text-white/70 text-lg mb-10 max-w-md mx-auto">
              Enroll today and take the first step toward a creative career.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/training/apply">Apply for Training</ButtonLink>
              <a
                href="https://wa.me/233548883475?text=Hello%20ABL%20Fashion%2C%20I%20would%20like%20to%20enquire%20about%20your%20training%20programs."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white px-8 py-4 text-xs uppercase tracking-editorial font-semibold rounded-full transition-all duration-300 hover:scale-[1.03] justify-center"
              >
                Chat on WhatsApp
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}