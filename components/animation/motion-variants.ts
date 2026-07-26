import type { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeUpStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0 },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const textReveal: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: '0%', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export const cardHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.03, y: -4, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export const parallaxLayer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// ─── New Motion Variants ──────────────────────────────────────────────────────

/**
 * Word-by-word reveal for headings.
 * Wrap each word in a span and use this on a parent container.
 */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: '0%',
    transition: {
      delay: i * 0.06,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/**
 * Character-by-character reveal for large display text.
 */
export const charReveal: Variants = {
  hidden: { opacity: 0, y: '120%', rotateX: -90 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: '0%',
    rotateX: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/**
 * 3D tilt hover effect for cards and images.
 * Use with Framer Motion's `whileHover`.
 */
export const tiltHover: Variants = {
  rest: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  hover: {
    scale: 1.03,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Parallax scroll config — returns a ScrollTrigger-driven config.
 * For use with GSAP, not Framer Motion.
 * Provides speed multipliers for background (0.3), midground (0.5), foreground (1).
 */
export const parallaxSpeeds = {
  background: 0.3,
  midground: 0.5,
  foreground: 1,
} as const;

/**
 * Cursor glow tracking variant for the cursor light effect.
 * Handles the smooth lerp transition on the glow element.
 */
export const cursorGlow: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  hidden: { opacity: 0, scale: 0.8, transition: { duration: 0.3, ease: 'easeIn' } },
};

/**
 * Staggered entrance for grid items (cascade pattern).
 * Children enter left-to-right, top-to-bottom.
 */
export const cascadeContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

export const cascadeItem: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Line draw animation — for decorative lines that draw themselves horizontally.
 */
export const lineDraw: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Spring-based entrance for cards with a subtle bounce.
 */
export const springCard: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20,
      mass: 0.8,
    },
  },
};

/**
 * Crossfade transition for page or component changes.
 */
export const crossfade: Variants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};
