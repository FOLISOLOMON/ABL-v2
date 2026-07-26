'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode, useRef, useCallback, useEffect, ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  wordReveal,
  charReveal,
  lineDraw,
  parallaxSpeeds,
} from './motion-variants';

// ─── Reveal ──────────────────────────────────────────────────────────────────

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, y = 30, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── RevealText ──────────────────────────────────────────────────────────────

interface RevealTextProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}

export function RevealText({ lines, className, lineClassName, delay = 0 }: RevealTextProps) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            initial={{ y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: delay + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={`block ${lineClassName || ''}`}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

// ─── Stagger ─────────────────────────────────────────────────────────────────

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function Stagger({ children, className, delay = 0, stagger = 0.1 }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── RevealWords ─────────────────────────────────────────────────────────────
// Each word of the text animates in sequentially on scroll.

interface RevealWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: ElementType;
}

export function RevealWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  as: Tag = 'p',
}: RevealWordsProps) {
  const words = text.split(' ');

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            custom={i}
            variants={wordReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className={`inline-block ${wordClassName || ''}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// ─── RevealChars ─────────────────────────────────────────────────────────────
// Each character of the text animates in sequentially on scroll.

interface RevealCharsProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
}

export function RevealChars({
  text,
  className,
  charClassName,
  delay = 0,
}: RevealCharsProps) {
  const chars = text.split('');

  return (
    <div className={className}>
      {chars.map((char, i) => (
        <span key={`${char}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            custom={i}
            variants={charReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className={`inline-block ${char === ' ' ? 'w-[0.3em]' : ''} ${charClassName || ''}`}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

// ─── ParallaxBox ─────────────────────────────────────────────────────────────
// Wraps content in a parallax container with configurable speed.
// Uses `useTransform` + `useScroll` from Framer Motion for smooth scroll-driven motion.

interface ParallaxBoxProps {
  children: ReactNode;
  speed?: number; // 0.3 = slow, 0.5 = medium, 1 = normal
  className?: string;
  as?: 'div' | 'section' | 'span';
  direction?: 'vertical' | 'horizontal';
}

export function ParallaxBox({
  children,
  speed = parallaxSpeeds.background,
  className,
  as: Tag = 'div',
  direction = 'vertical',
}: ParallaxBoxProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // GSAP currently handles parallax via ScrollTrigger;
  // for Framer Motion, we provide the wrapper for future use
  return (
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}

// ─── ParallaxLayer ───────────────────────────────────────────────────────────
// A single parallax layer with specific speed, for use in multi-layer parallax sections.

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  direction?: 'vertical' | 'horizontal';
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  className,
  direction = 'vertical',
}: ParallaxLayerProps) {
  const y = useMotionValue(0);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const factor = speed * 0.1;
      y.set((e.clientX - window.innerWidth / 2) * factor * -1);
    },
    [speed, y]
  );

  const handleMouseLeave = useCallback(() => {
    y.set(0);
  }, [y]);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ y: direction === 'vertical' ? smoothY : 0, x: direction === 'horizontal' ? smoothY : 0 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Enhanced ParallaxLayer ──────────────────────────────────────
// Scroll-driven parallax layer using GSAP ScrollTrigger for book-stacking depth.

interface EnhancedParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  direction?: 'vertical' | 'horizontal';
  as?: 'div' | 'section' | 'span';
}

export function EnhancedParallaxLayer({
  children,
  speed = 0.5,
  className,
  direction = 'vertical',
  as: Tag = 'div',
}: EnhancedParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ctx = useRef<gsap.Context | null>(null);
  const originalTransform = useRef<string>('');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    originalTransform.current = element.style.transform || '';

    ctx.current = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const distance = speed * (direction === 'vertical' ? 100 : 200);
          const translate = (progress - 1) * distance;
          if (direction === 'vertical') {
            element.style.transform = `${originalTransform.current} translateY(${translate}px)`;
          } else {
            element.style.transform = `${originalTransform.current} translateX(${translate}px)`;
          }
        },
      });
    });

    return () => {
      if (ctx.current) { ctx.current.revert(); ctx.current = null; }
      element.style.transform = originalTransform.current;
    };
  }, [speed, direction]);

  return (
    <Tag
      ref={ref}
      className={`${className} parallax-layer-enhanced`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </Tag>
  );
}

// ─── DecorativeLine ──────────────────────────────────────────────────────────
// A thin line that draws itself horizontally across a section on scroll.

interface DecorativeLineProps {
  className?: string;
  color?: string;
  height?: number;
}

export function DecorativeLine({
  className,
  color = 'bg-orange-500',
  height = 1,
}: DecorativeLineProps) {
  return (
    <motion.div
      variants={lineDraw}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={`${color} ${className}`}
      style={{ height: `${height}px`, originX: 0 }}
    />
  );
}

// ─── TiltCard ────────────────────────────────────────────────────────────────
// A card that tilts based on mouse position (3D perspective effect).

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltFactor?: number;
}

export function TiltCard({ children, className, tiltFactor = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      ref.current.style.transform = `perspective(1000px) rotateY(${x * tiltFactor}deg) rotateX(${y * -tiltFactor}deg)`;
    },
    [tiltFactor]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out ${className || ''}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}
