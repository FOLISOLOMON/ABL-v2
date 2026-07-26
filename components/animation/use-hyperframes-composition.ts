'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

export interface CompositionOptions {
  duration?: number;
  paused?: boolean;
  onComplete?: () => void;
}

export function useHyperFramesComposition(options: CompositionOptions = {}) {
  const { duration = 5, paused = true, onComplete } = options;
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const play = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.play();
    }
  }, []);

  const pause = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.pause();
    }
  }, []);

  const seek = useCallback((time: number) => {
    if (timelineRef.current) {
      timelineRef.current.seek(time);
    }
  }, []);

  const restart = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.restart();
    }
  }, []);

  const getTimeline = useCallback(() => {
    return timelineRef.current;
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused,
        onComplete,
      });
      timelineRef.current = tl;
    });

    return () => ctx.revert();
  }, [paused, onComplete]);

  return {
    timeline: timelineRef.current,
    play,
    pause,
    seek,
    restart,
    getTimeline,
  };
}
