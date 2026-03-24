"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current.filter(Boolean), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Aura background */}
      <div
        className="aura-purple absolute w-[600px] h-[400px] left-1/4 top-1/2 -translate-y-1/2 opacity-20"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--brand-primary)] font-semibold">
            SERVIZI
          </span>
          <h2 className="text-4xl md:text-6xl text-display mt-4">
            Quello che facciamo, lo facciamo bene
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mt-6 max-w-2xl">
            Growth marketing, tecnologia e AI. Un team che diventa il tuo team.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {services.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="glass-card-glow card-shine rounded-2xl p-8 group"
            >
              {/* Icon */}
              <span className="text-3xl mb-6 block">{service.icon}</span>

              {/* Headline */}
              <p className="text-lg font-bold gradient-text-hot">
                {service.headline}
              </p>

              {/* Title */}
              <h3 className="text-xl font-semibold mt-2">{service.title}</h3>

              {/* Description */}
              <p className="text-sm text-[var(--text-secondary)] mt-4 leading-relaxed">
                {service.description}
              </p>

              {/* Outcomes */}
              <div className="mt-6 flex flex-col gap-2">
                {service.outcomes.map((outcome, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[var(--brand-lime)] shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-[var(--text-secondary)]">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14">
          <Link href="/servizi" className="link-hover">
            Scopri tutti i servizi &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
