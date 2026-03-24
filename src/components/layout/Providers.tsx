'use client';

import { type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '@/hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  useLenis();

  return <>{children}</>;
}
