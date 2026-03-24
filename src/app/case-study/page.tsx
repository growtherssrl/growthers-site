"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { caseStudies, featuredStats } from "@/data/case-studies";
import ContactCTA from "@/components/sections/home/ContactCTA";
import BorderGlow from "@/components/ui/BorderGlow";

gsap.registerPlugin(ScrollTrigger);

const filters = ["Tutti", "AI Projects", "B2B", "B2C", "Internazionale"];

export default function CaseStudyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("Tutti");

  const filteredStudies = caseStudies.filter((cs) => {
    if (activeFilter === "Tutti") return true;
    if (activeFilter === "AI Projects") return cs.aiProject;
    if (activeFilter === "B2B") return cs.target.includes("B2B");
    if (activeFilter === "B2C") return cs.target.includes("B2C");
    if (activeFilter === "Internazionale") return cs.scope === "Internazionale";
    return true;
  });

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".cs-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: containerRef, dependencies: [activeFilter] }
  );

  return (
    <div ref={containerRef}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <span className="chip text-xs font-semibold tracking-widest uppercase">
            CASE STUDY
          </span>
          <h1 className="text-4xl md:text-6xl text-display mt-6 text-[var(--text)]">
            Un approccio da startup per ambiziose storie di successo
          </h1>

          {/* Featured Stats */}
          <div className="flex flex-wrap gap-8 mt-12">
            {featuredStats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="glass-chip px-4 py-2 text-3xl md:text-4xl font-bold gradient-text-warm">
                  {stat.value}
                </span>
                <span className="text-sm text-[var(--text-dim)] mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-3 mt-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all backdrop-blur-sm bg-white/[0.04] ${
                  activeFilter === filter
                    ? "bg-[var(--accent)] text-white"
                    : "chip hover:border-[var(--accent)]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Grid */}
      <section className="relative px-6 pb-20 overflow-hidden">
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {filteredStudies.map((study) => (
              <BorderGlow key={study.id} className="cs-card">
                {/* Gradient bar */}
                <div className="h-1 gradient-warm" />

                <div className="p-8 backdrop-blur-xl">
                  {/* Client */}
                  <h3 className="text-2xl font-bold text-[var(--text)]">{study.client}</h3>
                  <p className="text-sm text-[var(--text-dim)] mt-1">
                    {study.sector}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="chip text-xs">{study.target}</span>
                    <span className="chip text-xs">{study.scope}</span>
                    {study.aiProject && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-[var(--accent3)] text-[var(--bg)]">
                        AI Project
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[var(--text-dim)] mt-4">
                    {study.description}
                  </p>

                  {/* Results */}
                  {study.results.length > 0 && (
                    <ul className="mt-4 space-y-1.5">
                      {study.results.map((result, i) => (
                        <li
                          key={i}
                          className="text-sm text-[var(--text-dim)] flex items-start gap-2"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Services */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {study.services.map((service) => (
                      <span
                        key={service}
                        className="chip text-xs text-[var(--text-faint)]"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <ContactCTA />
    </div>
  );
}
