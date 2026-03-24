"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudiesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const featured = caseStudies.filter((cs) => cs.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.15,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-primary)]">
          CASE STUDY
        </p>

        {/* Title */}
        <h2 className="text-4xl md:text-6xl text-display mt-4">
          Storie di successo misurabili
        </h2>

        {/* Cards */}
        <div className="mt-16 space-y-6">
          {/* First card — full width (col-span-2) */}
          {featured.length > 0 && (
            <div
              ref={(el) => {
                cardsRef.current[0] = el;
              }}
              className="opacity-0"
            >
              <CaseCard study={featured[0]} />
            </div>
          )}

          {/* Remaining cards — 2-col grid */}
          {featured.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.slice(1).map((cs, i) => (
                <div
                  key={cs.id}
                  ref={(el) => {
                    cardsRef.current[i + 1] = el;
                  }}
                  className="opacity-0"
                >
                  <CaseCard study={cs} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA link */}
        <div className="mt-12">
          <Link href="/case-studies" className="link-hover text-sm">
            Tutti i case study &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

function CaseCard({ study }: { study: (typeof caseStudies)[number] }) {
  return (
    <div className="glass-card-glow card-shine rounded-2xl overflow-hidden">
      {/* Gradient top bar */}
      <div className="h-1 gradient-brand" />

      <div className="p-8">
        {/* Client name + AI badge */}
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="text-2xl font-bold text-[var(--text-primary)]">
            {study.client}
          </h3>
          {study.aiProject && (
            <span className="chip flex items-center gap-1.5 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-lime)]" />
              AI Project
            </span>
          )}
        </div>

        {/* Sector */}
        <p className="text-sm text-[var(--text-muted)] mt-1">{study.sector}</p>

        {/* Hero metric — first result */}
        {study.results.length > 0 && (
          <p className="text-3xl md:text-4xl font-bold gradient-text mt-6">
            {study.results[0]}
          </p>
        )}

        {/* Services */}
        <div className="flex flex-wrap gap-2 mt-6">
          {study.services.map((service) => (
            <span key={service} className="chip text-xs">
              {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
