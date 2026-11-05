'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode, useRef, useCallback, ElementType } from 'react';
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
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
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
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: delay + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
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

export function Stagger({ children, className, delay = 0, stagger = 0.08 }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
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
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── RevealWords ─────────────────────────────────────────────────────────────

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
            viewport={{ once: true, margin: '-60px' }}
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
            viewport={{ once: true, margin: '-60px' }}
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

interface ParallaxBoxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  as?: 'div' | 'section' | 'span';
  direction?: 'vertical' | 'horizontal';
}

export function ParallaxBox({
  children,
  speed = parallaxSpeeds.background,
  className,
  as: Tag = 'div',
}: ParallaxBoxProps) {
  const ref = useRef<HTMLDivElement>(null);
  void speed;
  return (
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}

// ─── ParallaxLayer ───────────────────────────────────────────────────────────

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

// ─── Enhanced ParallaxLayer ──────────────────────────────────────────────────
// Lightweight scroll-driven parallax layer; skips work when speed === 1 or on touch/reduced-motion devices.

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
  void speed;
  void direction;
  return <Tag className={className}>{children}</Tag>;
}

// ─── DecorativeLine ──────────────────────────────────────────────────────────

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
      viewport={{ once: true, margin: '-80px' }}
      className={`${color} ${className}`}
      style={{ height: `${height}px`, originX: 0 }}
    />
  );
}

// ─── TiltCard ────────────────────────────────────────────────────────────────

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