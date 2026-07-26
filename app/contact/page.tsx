'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '@/components/sections/page-hero';
import { Reveal } from '@/components/animation/reveal';
import { siteConfig } from '@/data/site';
import { faqs } from '@/data/training';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Calendar,
  GraduationCap,
  ChevronDown,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Instagram,
  Facebook,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit');
      }

      setStatus('success');
      setForm({ name: '', phone: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error('Contact error:', err);
      setStatus('error');
    }
  };

  const quickActions = [
    {
      label: 'Call Now',
      href: `tel:${siteConfig.contact.phone1}`,
      icon: Phone,
      description: `0548883475`,
    },
    {
      label: 'Chat on WhatsApp',
      href: siteConfig.whatsappLink,
      icon: MessageCircle,
      description: '0548883475',
      external: true,
    },
    {
      label: 'Book a Consultation',
      href: '/book',
      icon: Calendar,
      description: 'Custom outfit enquiry',
    },
    {
      label: 'Enquire About Training',
      href: '/training',
      icon: GraduationCap,
      description: 'Fashion academy',
    },
  ];

  return (
    <>
      <PageHero
        label="Contact"
        titleLines={["Let's create", 'something beautiful.']}
        description="Reach out and let's start a conversation about your next outfit, your training journey, or anything else."
        image="/images/hero-desktop-3.jpg"
      />

      {/* Contact Details + Quick Actions */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact details */}
            <div>
              <Reveal>
                <p className="text-orange-600 text-xs uppercase tracking-editorial-wide mb-5">
                  Contact Details
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-charcoal text-3xl md:text-4xl font-medium mb-10">
                  We are here to help.
                </h2>
              </Reveal>

              <div className="space-y-6">
                <ContactRow
                  icon={Phone}
                  label="Phone"
                  value={`${siteConfig.contact.phone1} / ${siteConfig.contact.phone2}`}
                  href={`tel:${siteConfig.contact.phone1}`}
                />
                <ContactRow
                  icon={MessageCircle}
                  label="WhatsApp"
                  value={siteConfig.contact.whatsapp}
                  href={siteConfig.whatsappLink}
                  external
                />
                <ContactRow
                  icon={Mail}
                  label="Email"
                  value={siteConfig.contact.email}
                  href={`mailto:${siteConfig.contact.email}`}
                />
                <ContactRow
                  icon={MapPin}
                  label="Location"
                  value={siteConfig.location.full}
                />
              </div>

              {/* Social */}
              <div className="mt-10 pt-8 border-t border-charcoal/10">
                <p className="text-xs uppercase tracking-editorial text-charcoal/40 mb-4">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl border border-charcoal/15 flex items-center justify-center hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl border border-charcoal/15 flex items-center justify-center hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={siteConfig.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl border border-charcoal/15 flex items-center justify-center hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-300"
                    aria-label="TikTok"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.32v13.67a2.86 2.86 0 0 1-2.7 2.56 2.86 2.86 0 0 1-2.86-2.86 2.86 2.86 0 0 1 2.86-2.86c.3 0 .6.05.88.15v-3.4a6.27 6.27 0 0 0-.88-.06 6.17 6.17 0 0 0-6.17 6.17 6.17 6.17 0 0 0 6.17 6.17 6.17 6.17 0 0 0 6.17-6.17V8.69a8.18 8.18 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div>
              <Reveal>
                <p className="text-orange-600 text-xs uppercase tracking-editorial-wide mb-5">
                  Quick Actions
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-charcoal text-3xl md:text-4xl font-medium mb-10">
                  Get in touch fast.
                </h2>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, i) => (
                  <Reveal key={action.label} delay={i * 0.1}>
                    <a
                      href={action.href}
                      target={action.external ? '_blank' : undefined}
                      rel={action.external ? 'noopener noreferrer' : undefined}
                      className="group flex flex-col items-start p-6 bg-white border border-charcoal/10 rounded-xl hover:border-orange-500/30 hover:shadow-lg transition-all duration-300 h-full"
                    >
                      <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors duration-300">
                        <action.icon className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="font-display text-lg font-medium text-charcoal mb-1">
                        {action.label}
                      </h3>
                      <p className="text-charcoal/50 text-sm">{action.description}</p>
                    </a>
                  </Reveal>
                ))}
              </div>

              {/* Contact form */}
              <Reveal delay={0.3}>
                <form
                  onSubmit={handleSubmit}
                  className="mt-8 bg-white border border-charcoal/10 rounded-xl p-6 md:p-8"
                >
                  <h3 className="font-display text-xl font-medium text-charcoal mb-5">
                    Send a Message
                  </h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs uppercase tracking-editorial font-body font-medium text-charcoal/70 mb-2">Name <span className="text-orange-500">*</span></label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-ivory/50 border border-charcoal/15 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="block text-xs uppercase tracking-editorial font-body font-medium text-charcoal/70 mb-2">Phone <span className="text-orange-500">*</span></label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full bg-ivory/50 border border-charcoal/15 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs uppercase tracking-editorial font-body font-medium text-charcoal/70 mb-2">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-ivory/50 border border-charcoal/15 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-xs uppercase tracking-editorial font-body font-medium text-charcoal/70 mb-2">Subject</label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full bg-ivory/50 border border-charcoal/15 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-xs uppercase tracking-editorial font-body font-medium text-charcoal/70 mb-2">Message <span className="text-orange-500">*</span></label>
                      <textarea
                        id="contact-message"
                        required
                        placeholder="Your message"
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-ivory/50 border border-charcoal/15 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group mt-5 w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 text-xs uppercase tracking-editorial font-semibold rounded-full transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : status === 'success' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Message Sent
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>

                  {status === 'error' && (
                    <p className="mt-3 text-sm text-red-500 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-charcoal text-white">
        <div className="container-narrow">
          <Reveal>
            <p className="text-orange-500 text-xs uppercase tracking-editorial-wide mb-5 text-center">
              FAQ
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-center mb-16">
              Questions, answered.
            </h2>
          </Reveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-lg overflow-hidden bg-white/5"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-body text-sm md:text-base font-medium pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-orange-500 shrink-0 transition-transform duration-300',
                      openFaq === i && 'rotate-180'
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 md:px-6 pb-5 md:pb-6 text-white/60 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map / Location */}
      <section className="pt-24 pb-32 md:pt-32 md:pb-40 bg-ivory border-b border-charcoal/10">
        <div className="container-wide">
          <Reveal>
            <p className="text-orange-600 text-xs uppercase tracking-editorial-wide mb-5 text-center">
              Find Us
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-charcoal text-4xl md:text-5xl font-medium text-center mb-4">
              Visit the studio.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-charcoal/60 text-center mb-12 max-w-lg mx-auto">
              {siteConfig.location.full}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-2xl overflow-hidden border border-charcoal/10 shadow-lg">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.location.full)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ABL Fashion Location"
                sandbox="allow-scripts allow-same-origin allow-popups"
                allow="geolocation"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="group flex items-start gap-4">
      <div className="w-11 h-11 rounded-full bg-orange-50 flex items-center justify-center shrink-0 group-hover:bg-orange-500 transition-colors duration-300">
        <Icon className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors duration-300" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-editorial text-charcoal/40 mb-1">{label}</p>
        <p className="text-charcoal/80 text-sm md:text-base">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }
  return content;
}
