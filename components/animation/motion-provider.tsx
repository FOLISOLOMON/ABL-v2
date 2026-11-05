'use client';

import { CursorProvider } from './cursor-provider';

interface MotionProviderProps {
  children: React.ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  return <CursorProvider>{children}</CursorProvider>;
}