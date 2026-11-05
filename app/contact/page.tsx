'use client';

import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '@/components/sections/page-hero';
import { Reveal, RevealText } from '@/components/animation/reveal';
import { Button } from '@/components/ui/button-link';
import { siteConfig } from '@/data/site';
import { faqs } from '@/data/training';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ChevronDown,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const subjectId = useId();
  const messageId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to send your message. Please try again or reach us on WhatsApp.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        label="Contact Us"
        title="Let's create something beautiful."
        description="Have a question, want to book a consultation, or interested in our training academy? We would love to hear from you."
        image="/images/hero.jpg"
      />

      {/* Contact Info + Form */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Contact Details */}
            <div className="lg:col-span-5">
              <Reveal>
                <p className="text-orange-600 text-xs uppercase tracking-editorial-wide mb-4">
                  Get in Touch
                </p>
              </Reveal>
              <RevealText
                lines={['We are here', 'for you.']}
                className="font-display text-3xl md:text-4xl font-medium leading-tight mb-8"
              />
              <Reveal delay={0.2}>
                <p className="text-warm-gray text-base leading-relaxed mb-10">
                  Reach out by phone, WhatsApp, email, or visit our studio in Kasoa. We respond to all inquiries promptly.
                </p>
              </Reveal>

              <div className="space-y-4">
                <Reveal delay={0.25}>
                  <a
                    href={`tel:${siteConfig.contact.phone1}`}
                    className="flex items-start gap-4 p-5 bg-white border border-charcoal/15 hover:border-orange-500/40 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:bg-orange-500/20 transition-colors">
                      <Phone className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-editorial-wide text-warm-gray mb-1">
                        Phone
                      </p>
                      <p className="font-display text-lg font-medium text-charcoal">
                        {siteConfig.contact.phone1}
                      </p>
                      <p className="font-display text-lg font-medium text-charcoal">
                        {siteConfig.contact.phone2}
                      </p>
                    </div>
                  </a>
                </Reveal>

                <Reveal delay={0.3}>
                  <a
                    href={siteConfig.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-5 bg-white border border-charcoal/15 hover:border-orange-500/40 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:bg-orange-500/20 transition-colors">
                      <MessageCircle className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-editorial-wide text-warm-gray mb-1">
                        WhatsApp
                      </p>
                      <p className="font-display text-lg font-medium text-charcoal">
                        {siteConfig.contact.whatsapp}
                      </p>
                      <p className="text-xs text-orange-600 mt-1">
                        Tap to chat directly →
                      </p>
                    </div>
                  </a>
                </Reveal>

                <Reveal delay={0.35}>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-start gap-4 p-5 bg-white border border-charcoal/15 hover:border-orange-500/40 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:bg-orange-500/20 transition-colors">
                      <Mail className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-editorial-wide text-warm-gray mb-1">
                        Email
                      </p>
                      <p className="font-body text-sm font-medium text-charcoal break-all">
                        {siteConfig.contact.email}
                      </p>
                    </div>
                  </a>
                </Reveal>

                <Reveal delay={0.4}>
                  <div className="flex items-start gap-4 p-5 bg-white border border-charcoal/15">
                    <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-editorial-wide text-warm-gray mb-1">
                        Location
                      </p>
                      <p className="font-body text-sm font-medium text-charcoal">
                        {siteConfig.location.full}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Social */}
              <Reveal delay={0.45}>
                <div className="mt-10 pt-8 border-t border-charcoal/10">
                  <p className="text-[10px] uppercase tracking-editorial-wide text-warm-gray mb-4">
                    Follow Us
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-charcoal/15 bg-white text-xs uppercase tracking-editorial text-charcoal hover:border-orange-500 hover:text-orange-600 transition-colors"
                    >
                      Instagram
                    </a>
                    <a
                      href={siteConfig.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-charcoal/15 bg-white text-xs uppercase tracking-editorial text-charcoal hover:border-orange-500 hover:text-orange-600 transition-colors"
                    >
                      Facebook
                    </a>
                    <a
                      href={siteConfig.social.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-charcoal/15 bg-white text-xs uppercase tracking-editorial text-charcoal hover:border-orange-500 hover:text-orange-600 transition-colors"
                    >
                      TikTok
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Contact Form Dossier */}
            <div className="lg:col-span-7">
              <Reveal delay={0.15}>
                <div className="bg-white border border-charcoal/15 p-8 md:p-12 shadow-[0_24px_60px_-20px_rgba(26,26,26,0.06)]">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-5 mb-8 border-b border-charcoal/10">
                    <span className="text-[10px] uppercase tracking-editorial-wide text-orange-600 font-semibold">
                      Client Inquiry Dossier — Direct Correspondence
                    </span>
                    <span className="text-[10px] uppercase tracking-editorial text-charcoal/45">
                      Kasoa Atelier
                    </span>
                  </div>

                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/25 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8 text-orange-600" />
                      </div>
                      <h3 className="font-display text-2xl font-medium mb-3">
                        Message Sent
                      </h3>
                      <p className="text-warm-gray text-sm max-w-md mx-auto mb-8">
                        Thank you for reaching out to ABL Fashion. We have received your message and will get back to you shortly.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSubmitted(false);
                          setForm({ name: '', phone: '', email: '', subject: '', message: '' });
                        }}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-display text-2xl md:text-3xl font-medium mb-2">
                        Send us a message
                      </h2>
                      <p className="text-warm-gray text-sm mb-8">
                        Fill out the dossier below and we will get back to you as soon as possible.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <FormField
                            label="Full Name *"
                            value={form.name}
                            onChange={(v) => setForm({ ...form, name: v })}
                            placeholder="Your full name"
                            required
                          />
                          <FormField
                            label="Phone / WhatsApp *"
                            type="tel"
                            value={form.phone}
                            onChange={(v) => setForm({ ...form, phone: v })}
                            placeholder="Your phone number"
                            required
                          />
                        </div>
                        <FormField
                          label="Email"
                          type="email"
                          value={form.email}
                          onChange={(v) => setForm({ ...form, email: v })}
                          placeholder="your@email.com (optional)"
                        />
                        <div>
                          <label
                            htmlFor={subjectId}
                            className="block text-[11px] uppercase tracking-editorial-wide text-charcoal/65 font-semibold mb-1"
                          >
                            Subject
                          </label>
                          <select
                            id={subjectId}
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            className="w-full px-0 py-3 bg-transparent border-0 border-b border-charcoal/25 text-sm text-charcoal focus:outline-none focus:border-orange-500 transition-colors"
                          >
                            <option value="">Select a subject</option>
                            <option value="Custom Outfit Inquiry">Custom Outfit Inquiry</option>
                            <option value="Bridal Wear">Bridal Wear</option>
                            <option value="Fashion Training">Fashion Training</option>
                            <option value="Pricing & Turnaround">Pricing &amp; Turnaround</option>
                            <option value="General Inquiry">General Inquiry</option>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor={messageId}
                            className="block text-[11px] uppercase tracking-editorial-wide text-charcoal/65 font-semibold mb-1"
                          >
                            Message *
                          </label>
                          <textarea
                            id={messageId}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            rows={5}
                            required
                            placeholder="Tell us how we can help you..."
                            className="w-full px-0 py-3 bg-transparent border-0 border-b border-charcoal/25 text-sm text-charcoal placeholder:text-warm-gray/45 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                          />
                        </div>

                        {error && (
                          <div className="flex items-start gap-3 p-4 border border-red-200 bg-red-50 text-red-800 text-sm">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p>{error}</p>
                              <a
                                href={siteConfig.whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-2 text-xs uppercase tracking-editorial font-semibold text-orange-600 hover:underline"
                              >
                                Message us on WhatsApp instead →
                              </a>
                            </div>
                          </div>
                        )}

                        <div className="pt-2">
                          <Button type="submit" disabled={submitting} showArrow={!submitting}>
                            {submitting ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              'Send Message'
                            )}
                          </Button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Map / Location Section */}
      <section className="py-16 bg-cream">
        <div className="container-wide">
          <Reveal>
            <div className="bg-charcoal text-white p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-charcoal">
              <div>
                <p className="text-orange-400 text-xs uppercase tracking-editorial-wide mb-3">
                  Visit Our Studio
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-medium mb-2">
                  {siteConfig.location.full}
                </h3>
                <p className="text-white/60 text-sm">
                  Open Monday to Saturday. Walk-ins welcome, appointments preferred for bridal and custom consultations.
                </p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  siteConfig.location.full
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 text-white text-xs uppercase tracking-editorial font-semibold hover:bg-orange-600 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Open in Google Maps
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <Reveal>
              <p className="text-orange-600 text-xs uppercase tracking-editorial-wide mb-4">
                Frequently Asked Questions
              </p>
            </Reveal>
            <RevealText
              lines={['Questions & Answers']}
              className="font-display text-4xl md:text-5xl font-medium leading-tight"
            />
          </div>

          <div className="divide-y divide-charcoal/10 border-t border-b border-charcoal/10">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full py-6 flex items-center justify-between gap-4 text-left group"
                  >
                    <span className="font-display text-lg md:text-xl font-medium text-charcoal group-hover:text-orange-600 transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 text-warm-gray shrink-0 transition-transform duration-300',
                        isOpen && 'rotate-180 text-orange-600'
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-warm-gray text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] uppercase tracking-editorial-wide text-charcoal/65 font-semibold mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-0 py-3 bg-transparent border-0 border-b border-charcoal/25 text-sm text-charcoal placeholder:text-warm-gray/45 focus:outline-none focus:border-orange-500 transition-colors"
      />
    </div>
  );
}

