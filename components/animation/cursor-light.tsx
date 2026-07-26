'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';

interface CursorLightProps {
  children: React.ReactNode;
}

export function CursorLight({ children }: CursorLightProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const isMobileRef = useRef(false);

  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;
    if (!isMobileRef.current) {
      setIsVisible(true);
    }
  }, []);

  const updatePosition = useCallback(() => {
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.15;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.15;
    setPosition({
      x: currentRef.current.x,
      y: currentRef.current.y,
    });
    if (isVisible) {
      rafRef.current = requestAnimationFrame(updatePosition);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    rafRef.current = requestAnimationFrame(updatePosition);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible, updatePosition]);

  if (!isVisible) return <>{children}</>;

  return (
    <>
      {children}
      {/* Custom cursor with glow effect - dot in circle design */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: position.x - 40,
          y: position.y - 40,
        }}
        transition={{ type: 'tween', duration: 0.1 }}
      >
        {/* Outer glow circle */}
        <div
          className="absolute w-[80px] h-[80px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0.05) 40%, transparent 70%)',
            filter: 'blur(2px)',
          }}
        />
        {/* Main cursor dot */}
        <div
          className="absolute w-8 h-8 rounded-full border-2 border-orange-500/60 bg-orange-500/20"
          style={{
            transform: 'translate(-50%, -50%)',
            backdropFilter: 'blur(1px)',
          }}
        />
      </motion.div>
    </>
  );
}
