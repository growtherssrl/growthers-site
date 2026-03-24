'use client';

import { type RefObject, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealConfig {
  delay?: number;
  y?: number;
  duration?: number;
}

export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  config: ScrollRevealConfig = {},
) {
  const { delay = 0, y = 40, duration = 0.8 } = config;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.set(element, { opacity: 0, y });

    const tween = gsap.to(element, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [ref, delay, y, duration]);
}
