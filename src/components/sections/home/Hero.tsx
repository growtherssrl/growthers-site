"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import AnimatedGrid from "@/components/ui/AnimatedGrid";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chipRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out", delay: 0.5 }
      );
      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.8 }
      );
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 1.0 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Animated backgrounds ── */}

      {/* 1. Grid with flickering cells (WorkOS style) */}
      <AnimatedGrid
        gridSize={72}
        color="255, 92, 53"
        maxOpacity={0.08}
        flickerSpeed={0.012}
        className="z-0"
      />

      {/* 2. Aurora glow blobs (morphing, organic) */}

      {/* 3. Subtle noise texture */}
      <div className="bg-noise absolute inset-0 z-[2] pointer-events-none" />

      {/* Fade edges to black for depth */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 30%, #050505 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div ref={chipRef} className="opacity-0 mb-8">
          <span className="chip">Growth Agency</span>
        </div>

        <h1
          ref={headlineRef}
          className="opacity-0 font-bold leading-[1.0] tracking-[-0.045em]"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
        >
          Cresci più veloce.
          <br />
          Con un team che sa usare{" "}
          <span className="gradient-text-warm">l&apos;AI</span>.
        </h1>

        <p
          ref={subRef}
          className="opacity-0 text-lg text-[var(--text-dim)] mt-8 max-w-xl mx-auto"
        >
          Performance marketing, automazione e sistemi AI in produzione.
          <br className="hidden sm:block" />
          Non slide. Risultati.
        </p>

        <div ref={ctaRef} className="opacity-0 mt-10">
          <Link href="/servizi" className="btn-accent">
            Scopri cosa facciamo &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
