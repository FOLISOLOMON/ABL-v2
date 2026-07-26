'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '@/data/site';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [heroIntroReady, setHeroIntroReady] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

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

    setHeroIntroReady(false);
    const revealNavbar = () => setHeroIntroReady(true);
    window.addEventListener('hero-nav-reveal', revealNavbar);
    return () => window.removeEventListener('hero-nav-reveal', revealNavbar);
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

  // GSAP scroll-based logo parallax and CTA pulse
  useEffect(() => {
    const header = headerRef.current;
    const logo = logoRef.current;
    const cta = ctaRef.current;
    if (!header || !logo) return;

    const ctx = gsap.context(() => {
      // Logo parallax: subtle scale shift as user scrolls
      ScrollTrigger.create({
        trigger: header,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Logo scales down slightly as user scrolls
          gsap.to(logo, {
            scale: 1 - progress * 0.05,
            y: progress * -5,
            overwrite: 'auto',
            duration: 0.1,
          });
        },
      });

      // CTA button pulse effect on hero page (before scroll)
      if (cta && window.location.pathname === '/') {
        gsap.fromTo(
          cta,
          { boxShadow: '0 0 0 0 rgba(249, 115, 22, 0.4)' },
          {
            boxShadow: '0 0 20px 10px rgba(249, 115, 22, 0)',
            duration: 1.5,
            repeat: -1,
            ease: 'power2.inOut',
            paused: scrolled,
          }
        );
      }
    }, header);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrolled]);

  const isTransparent = !scrolled;

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-navbar transition-all duration-500',
          scrolled
            ? 'bg-ivory/90 backdrop-blur-md border-b border-charcoal/10 py-3'
            : 'bg-transparent py-5',
          isHome && !heroIntroReady && 'opacity-0 pointer-events-none'
        )}
      >
        <nav className="container-wide flex items-center justify-between">
          {/* Logo with parallax */}
          <Link
            ref={logoRef}
            href="/"
            className="group flex items-center gap-2 will-change-transform"
          >
            <Image
              src="/images/logo/logo abl main.png"
              alt="ABL Fashion"
              width={180}
              height={52}
              className="h-10 md:h-12 w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop Nav with enhanced hover underline */}
          <div className="hidden lg:flex items-center gap-8">
            {siteConfig.nav.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'group relative text-sm font-body font-medium tracking-wide transition-colors duration-300 py-1',
                    isTransparent ? 'text-white/90' : 'text-charcoal/80',
                    active && (isTransparent ? 'text-white' : 'text-charcoal')
                  )}
                >
                  {link.label}
                  {/* Animated underline */}
                  <span
                    className={cn(
                      'absolute left-0 -bottom-0.5 h-[1.5px] bg-current transition-all duration-500 ease-out',
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 md:gap-4">
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'hidden md:flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 hover:scale-105',
                isTransparent
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-charcoal/20 text-charcoal hover:bg-charcoal/5'
              )}
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/training/apply"
                className={cn(
                  'inline-flex items-center px-4 py-2.5 text-xs uppercase tracking-editorial font-body font-semibold rounded-full transition-all duration-300 hover:scale-105',
                  isTransparent
                    ? 'border border-white/30 text-white hover:bg-white/10'
                    : 'border border-charcoal/20 text-charcoal hover:bg-charcoal/5'
                )}
              >
                Apply for Training
              </Link>
              <Link
                ref={ctaRef}
                href="/book"
                className={cn(
                  'inline-flex items-center px-5 py-2.5 text-xs uppercase tracking-editorial font-body font-semibold rounded-full transition-all duration-300 hover:scale-105',
                  isTransparent
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-charcoal text-white hover:bg-charcoal/90'
                )}
              >
                Book a Consultation
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className={cn(
                'lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors',
                isTransparent ? 'text-white' : 'text-charcoal'
              )}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu with parallax backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-mobileMenu bg-charcoal lg:hidden"
            data-mobile-menu
          >
            {/* Decorative parallax backdrop */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-float" />
              <div className="absolute -bottom-1/4 -left-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between px-6 py-5">
                <Image
                  src="/images/logo/logo abl main.png"
                  alt="ABL Fashion"
                  width={180}
                  height={52}
                  className="h-10 w-auto"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-white p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col px-6 pt-12 gap-2">
                {siteConfig.nav.map((link, i) => {
                  const active = pathname === link.href || pathname.startsWith(link.href + '/');
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          'font-display text-4xl font-medium transition-colors duration-300',
                          active ? 'text-orange-500' : 'text-white hover:text-orange-400'
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + siteConfig.nav.length * 0.08, duration: 0.4 }}
                  className="mt-8 flex flex-col gap-4"
                >
                  <Link
                    href="/training/apply"
                    className={cn(
                      'inline-flex items-center justify-center px-6 py-4 border font-body font-semibold text-sm uppercase tracking-editorial rounded-full transition-all duration-300 hover:scale-105',
                      isTransparent
                        ? 'border-white/30 text-white hover:bg-white/10'
                        : 'border-charcoal/20 text-charcoal hover:bg-charcoal/5'
                    )}
                  >
                    Apply for Training
                  </Link>
                  <Link
                    href="/book"
                    className="inline-flex items-center justify-center px-6 py-4 bg-orange-500 text-white text-sm uppercase tracking-editorial font-semibold rounded-full"
                  >
                    Book a Consultation
                  </Link>
                  <a
                    href={siteConfig.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-white/30 text-white text-sm uppercase tracking-editorial font-semibold rounded-full"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                </motion.div>
              </div>


            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
