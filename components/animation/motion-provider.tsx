'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CursorProvider } from './cursor-provider';
import { TransitionOverlay } from './page-transitions';

gsap.registerPlugin(ScrollTrigger);

interface MotionProviderProps {
  children: React.ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const refreshScrollTriggers = useCallback(() => {
    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    refreshScrollTriggers();
    window.addEventListener('resize', refreshScrollTriggers);
    return () => window.removeEventListener('resize', refreshScrollTriggers);
  }, [refreshScrollTriggers]);

  return (
    <CursorProvider>
      <div ref={containerRef}>
        {children}
      </div>
      <TransitionOverlay />
    </CursorProvider>
  );
}
