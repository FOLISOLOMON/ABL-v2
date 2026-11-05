'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle, ArrowUpRight, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import { siteConfig } from '@/data/site';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [heroIntroReady, setHeroIntroReady] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      setHeroIntroReady(true);
      return;
    }

    const revealNavbar = () => setHeroIntroReady(true);
    window.addEventListener('hero-nav-reveal', revealNavbar);
    // Safety fallback so navbar never remains hidden
    const fallbackTimer = setTimeout(revealNavbar, 500);
    return () => {
      window.removeEventListener('hero-nav-reveal', revealNavbar);
      clearTimeout(fallbackTimer);
    };
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        return;
      }

      if (!menu) return;

      const focusable = menu.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const firstFocusable = menu?.querySelector<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const isTransparent = !scrolled;

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-navbar transition-all duration-500',
          scrolled ? 'px-3 sm:px-6 pt-3 md:pt-4' : 'py-5',
          isHome && !heroIntroReady && 'opacity-0 pointer-events-none'
        )}
      >
        <nav
          className={cn(
            'flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
            scrolled
              ? 'mx-auto max-w-[1340px] rounded-full bg-ivory/85 backdrop-blur-xl border border-charcoal/10 shadow-[0_12px_40px_-10px_rgba(26,26,26,0.12)] px-5 md:px-8 py-2.5'
              : 'container-wide py-1'
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'group flex items-center gap-2 transition-transform duration-300',
              scrolled ? 'scale-95' : 'scale-100'
            )}
          >
            <Image
              src="/images/logo/logo abl main.png"
              alt="ABL Fashion"
              width={180}
              height={52}
              priority
              className="h-9 md:h-11 w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {siteConfig.nav.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'group relative text-xs uppercase tracking-editorial font-body font-medium transition-colors duration-300 py-1.5',
                    isTransparent ? 'text-white/85 hover:text-white' : 'text-charcoal/75 hover:text-charcoal',
                    active && (isTransparent ? 'text-white font-semibold' : 'text-charcoal font-semibold')
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute left-0 -bottom-0.5 h-[1.5px] bg-orange-500 transition-all duration-500 ease-out',
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 md:gap-5">
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'hidden md:flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 hover:scale-105',
                isTransparent
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-charcoal/15 text-charcoal hover:border-orange-500 hover:text-orange-600'
              )}
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <div className="hidden md:flex items-center gap-5">
              <Link
                href="/training/apply"
                className={cn(
                  'group inline-flex items-center gap-2 text-[11px] uppercase tracking-editorial font-body font-semibold transition-colors duration-300',
                  isTransparent
                    ? 'text-white/90 hover:text-orange-400'
                    : 'text-charcoal/80 hover:text-orange-600'
                )}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 transition-transform duration-300 group-hover:scale-125" />
                <span className="link-underline">Academy</span>
              </Link>

              <Link
                href="/book"
                className={cn(
                  'group inline-flex items-center gap-1.5 px-5 py-2.5 text-[11px] uppercase tracking-editorial font-body font-semibold rounded-full transition-all duration-300 hover:scale-[1.03]',
                  isTransparent
                    ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20'
                    : 'bg-charcoal text-white hover:bg-orange-600'
                )}
              >
                Book Consultation
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className={cn(
                'lg:hidden flex items-center justify-center w-10 h-10 rounded-full border transition-colors',
                isTransparent
                  ? 'border-white/25 text-white hover:bg-white/10'
                  : 'border-charcoal/15 text-charcoal hover:bg-charcoal/5'
              )}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Editorial Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-mobileMenu bg-charcoal text-white lg:hidden flex flex-col justify-between overflow-y-auto"
            data-mobile-menu
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo/logo abl main.png"
                  alt="ABL Fashion"
                  width={180}
                  height={52}
                  className="h-9 w-auto"
                />
                <span className="text-[10px] uppercase tracking-editorial-wide text-orange-500 border-l border-white/15 pl-3">
                  Atelier Index
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Editorial Numbered Links */}
            <div className="flex flex-col px-6 py-8 my-auto">
              <p className="text-[10px] uppercase tracking-editorial-wide text-white/40 mb-4">
                Navigation Directory
              </p>
              <div className="divide-y divide-white/10 border-y border-white/10">
                {siteConfig.nav.map((link, i) => {
                  const active = pathname === link.href || pathname.startsWith(link.href + '/');
                  const indexStr = String(i + 1).padStart(2, '0');
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        className="group flex items-baseline justify-between py-4 transition-colors"
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="font-display italic text-orange-500 text-sm w-6">
                            {indexStr}
                          </span>
                          <span
                            className={cn(
                              'font-display text-3xl sm:text-4xl font-medium tracking-tight transition-colors duration-300',
                              active ? 'text-orange-500 italic' : 'text-white group-hover:text-orange-400'
                            )}
                          >
                            {link.label}
                          </span>
                        </div>
                        <ArrowUpRight
                          className={cn(
                            'w-5 h-5 transition-all duration-300',
                            active
                              ? 'text-orange-500 translate-x-0'
                              : 'text-white/30 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                          )}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + siteConfig.nav.length * 0.05, duration: 0.4 }}
                className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white text-xs uppercase tracking-editorial font-semibold rounded-none transition-colors duration-300"
                >
                  Book a Consultation
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/training/apply"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-white/25 text-white hover:bg-white/10 font-body font-semibold text-xs uppercase tracking-editorial rounded-none transition-colors duration-300"
                >
                  Apply for Training
                </Link>
              </motion.div>
            </div>

            {/* Bottom Atelier Dossier Footer */}
            <div className="px-6 py-5 border-t border-white/10 bg-black/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span>{siteConfig.location.full}</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={`tel:${siteConfig.contact.phone1}`}
                  className="inline-flex items-center gap-1.5 text-white/80 hover:text-orange-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-orange-500" />
                  {siteConfig.contact.phone1}
                </a>
                <a
                  href={siteConfig.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 uppercase tracking-editorial text-[10px] font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}