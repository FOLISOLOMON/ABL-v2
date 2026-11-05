'use client';

import { useEffect, useRef, useState } from 'react';

interface CursorLightProps {
  children?: React.ReactNode;
}

export function CursorLight({ children }: CursorLightProps) {
  const [enabled, setEnabled] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isRunningRef = useRef(false);
  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isFinePointer && !prefersReducedMotion && window.innerWidth >= 768) {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;

      currentRef.current.x += dx * 0.18;
      currentRef.current.y += dy * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentRef.current.x - 40}px, ${currentRef.current.y - 40}px, 0)`;
      }

      if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        isRunningRef.current = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      isRunningRef.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled]);

  return (
    <>
      {children}
      {enabled && (
        <div
          ref={cursorRef}
          className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
          style={{ transform: 'translate3d(-200px, -200px, 0)' }}
          aria-hidden="true"
        >
          <div
            className="absolute w-[80px] h-[80px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(249,115,22,0.14) 0%, rgba(249,115,22,0.04) 40%, transparent 70%)',
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/50 bg-orange-500/15"
          />
        </div>
      )}
    </>
  );
}