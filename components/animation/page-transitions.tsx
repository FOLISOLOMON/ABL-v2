'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { crossfade } from './motion-variants';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Page transition wrapper that provides smooth enter/exit animations
 * during route changes using Framer Motion's AnimatePresence.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={crossfade}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * A thin overlay line that sweeps across the screen during page transitions.
 * Provides a subtle visual cue during route changes.
 */
export function TransitionOverlay() {
  return (
    <AnimatePresence>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[999] flex items-center justify-center"
        initial={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="h-[2px] bg-orange-500 w-full"
          initial={{ scaleX: 0, originX: 0 }}
          exit={{ scaleX: 1, originX: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

