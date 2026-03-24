"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aiStats } from "@/data/ai-frameworks";

gsap.registerPlugin(ScrollTrigger);

export default function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = statsRef.current.filter(Boolean);

      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.8, y: 24 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-[var(--bg-secondary)] section-glow-top"
    >
      {/* Top divider glow */}
      <div className="divider-glow absolute top-0 left-0 right-0" />

      {/* Bottom divider glow */}
      <div className="divider-glow absolute bottom-0 left-0 right-0" />

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {aiStats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => {
                statsRef.current[i] = el;
              }}
              className="relative flex flex-col items-center text-center opacity-0"
            >
              {/* Vertical divider between stats on desktop */}
              {i < aiStats.length - 1 && (
                <span
                  className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-[var(--border-default)]"
                  aria-hidden="true"
                />
              )}

              <span className="text-5xl md:text-6xl font-bold gradient-text">
                {stat.value}
              </span>
              <span className="text-sm text-[var(--text-muted)] mt-3 uppercase tracking-[0.15em]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
