'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { siteConfig } from '@/data/site';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Reveal, Stagger, StaggerItem, EnhancedParallaxLayer } from '@/components/animation/reveal';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  // Subtle background gradient shift
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.to(footer, {
        backgroundPosition: '50% 50%',
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-charcoal text-white animate-gradient-shift relative overflow-hidden">
      {/* Background layer (slowest) */}
      <EnhancedParallaxLayer speed={0.3} className="absolute inset-0" as="div">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/3 to-transparent" />
      </EnhancedParallaxLayer>

      {/* Foreground content (no parallax — prevents overlap with preceding sections) */}
      <div className="relative z-10">
        {/* Newsletter */}
        <div className="border-b border-white/10">
          <div className="container-wide py-16 md:py-20">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <Reveal>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl font-medium leading-tight">
                    Join the ABL circle.
                  </h3>
                  <p className="mt-3 text-white/60 text-sm max-w-md">
                    Be the first to see new collections, training intake dates, and exclusive offers.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 bg-white/5 border border-white/20 rounded-full px-6 py-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-full text-sm uppercase tracking-editorial font-semibold transition-colors"
                  >
                    {subscribed ? 'Subscribed' : 'Subscribe'}
                    {!subscribed && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              </Reveal>
            </div>
          </div>
        </div>

      {/* Main footer */}
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <Reveal className="md:col-span-4">
            <div>
              <Image
                src="/images/logo/logo abl main.png"
                alt="ABL Fashion"
                width={180}
                height={52}
                className="h-12 md:h-14 w-auto mb-2"
              />
              <p className="text-xs uppercase tracking-editorial text-orange-500 font-medium">
                / Training
              </p>
              <p className="mt-4 text-white/60 text-sm italic">
                &ldquo;{siteConfig.tagline}&rdquo;
              </p>
              <p className="mt-2 text-white/40 text-xs uppercase tracking-editorial">
                Est. {siteConfig.established} · {siteConfig.location.short}
              </p>
            </div>
          </Reveal>

          {/* Links */}
          <Reveal delay={0.1} className="md:col-span-3">
            <div>
              <p className="text-xs uppercase tracking-editorial text-white/40 mb-5">Explore</p>
              <ul className="space-y-3">
                {siteConfig.nav.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-orange-400 text-sm transition-colors link-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/book"
                    className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors"
                  >
                    Book Now
                  </Link>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Contact */}
          <Reveal delay={0.2} className="md:col-span-3">
            <div>
              <p className="text-xs uppercase tracking-editorial text-white/40 mb-5">Contact</p>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>{siteConfig.contact.phone1}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>{siteConfig.contact.phone2}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-orange-400 transition-colors break-all">
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span>{siteConfig.location.full}</span>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Social */}
          <Reveal delay={0.3} className="md:col-span-2">
            <div>
              <p className="text-xs uppercase tracking-editorial text-white/40 mb-5">Follow</p>
              <Stagger className="flex gap-3" stagger={0.15}>
                <StaggerItem>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </StaggerItem>
                <StaggerItem>
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </StaggerItem>
                <StaggerItem>
                  <a
                    href={siteConfig.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-all duration-300"
                    aria-label="TikTok"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.32v13.67a2.86 2.86 0 0 1-2.7 2.56 2.86 2.86 0 0 1-2.86-2.86 2.86 2.86 0 0 1 2.86-2.86c.3 0 .6.05.88.15v-3.4a6.27 6.27 0 0 0-.88-.06 6.17 6.17 0 0 0-6.17 6.17 6.17 6.17 0 0 0 6.17 6.17 6.17 6.17 0 0 0 6.17-6.17V8.69a8.18 8.18 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.12z" />
                    </svg>
                  </a>
                </StaggerItem>
              </Stagger>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/80 text-xs">
            © {new Date().getFullYear()} ABL Fashion / Training. All rights reserved.
          </p>
          <p className="text-white/80 text-xs uppercase tracking-editorial">
            {siteConfig.philosophy}
          </p>
        </div>
      </div>
    </div>
    </footer>
  );
}
