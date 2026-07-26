'use client';

import { CursorLight } from '@/components/animation/cursor-light';

interface CursorProviderProps {
  children: React.ReactNode;
}

export function CursorProvider({ children }: CursorProviderProps) {
  return <CursorLight>{children}</CursorLight>;
}
