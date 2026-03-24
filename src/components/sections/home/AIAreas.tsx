"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aiAreas } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

const TITLE_WORDS = ["SU", "CHE", "AREE", "STIAMO", "INVESTENDO"];

export default function AIAreas() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word reveal on the title
      gsap.from(wordsRef.current.filter(Boolean), {
        y: 80,
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Card stagger
      gsap.from(cardsRef.current.filter(Boolean), {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 90%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-[var(--bg-secondary)] section-glow-top"
    >
      {/* Background aura */}
      <div
        className="aura-hot absolute w-[500px] h-[400px] right-0 top-1/3 opacity-20"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Eyebrow */}
        <span className="chip-glow">AI &amp; LLM</span>

        {/* Title with word-split animation */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl text-display uppercase tracking-tight mt-8 leading-[1.1]">
          {TITLE_WORDS.map((word, i) => (
            <span
              key={i}
              ref={(el) => {
                wordsRef.current[i] = el;
              }}
              className={`inline-block mr-[0.3em] ${
                word === "INVESTENDO" ? "gradient-text-hot" : ""
              }`}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {aiAreas.map((area, i) => (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
            >
              {/* Top border */}
              <div className="divider-glow h-px w-full" aria-hidden="true" />

              {/* Content */}
              <div className="pt-8">
                <h3 className="text-xl font-bold gradient-text-hot">
                  {area.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mt-4 leading-relaxed">
                  {area.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
