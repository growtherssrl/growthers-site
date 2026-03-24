"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { services } from "@/data/services";
import ContactCTA from "@/components/sections/home/ContactCTA";
import BorderGlow from "@/components/ui/BorderGlow";

gsap.registerPlugin(ScrollTrigger);


export default function ServiziPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const blocks = gsap.utils.toArray<HTMLElement>(".service-block");
      blocks.forEach((block) => {
        gsap.from(block, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 px-6">
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <span className="chip text-xs font-semibold tracking-widest uppercase">
            SERVIZI
          </span>
          <h1 className="text-4xl md:text-6xl text-display mt-6 text-[var(--text)]">
            Scaliamo il tuo Business
          </h1>
          <p className="text-lg text-[var(--text-dim)] mt-4 max-w-2xl">
            Soluzioni, strategie e flussi operativi per creare nuovo valore
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="px-6">
        <div className="max-w-[1200px] mx-auto mt-16">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                className="service-block relative overflow-hidden py-20"
              >
                <div className="relative z-10">
                  <div className="glow-line mb-20" style={index === 0 ? { display: "none" } : undefined} />
                  <div
                    className={`flex flex-col lg:flex-row gap-12 items-start ${
                      isEven ? "" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Content Side */}
                    <div className="flex-1">
                      <span className="text-5xl">{service.icon}</span>
                      <p className="gradient-text-warm text-sm font-semibold tracking-wide uppercase mt-4">
                        {service.headline}
                      </p>
                      <h2 className="text-3xl font-bold text-[var(--text)] mt-2">{service.title}</h2>
                      <p className="text-[var(--text-dim)] mt-4">
                        {service.description}
                      </p>
                    </div>

                    {/* Outcomes Side */}
                    <div className="flex-1 w-full">
                      <BorderGlow>
                        <div className="backdrop-blur-xl rounded-2xl p-8">
                          <h3 className="text-sm font-semibold text-[var(--text)] uppercase tracking-wide mb-6">
                            Quello che ottieni:
                          </h3>

                          <ul className="space-y-4">
                            {service.outcomes.map((outcome) => (
                              <li key={outcome} className="flex items-start gap-3">
                                <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--accent3)] shrink-0" />
                                <span className="text-sm text-[var(--text-dim)]">
                                  {outcome}
                                </span>
                              </li>
                            ))}
                          </ul>

                          <a
                            href="/contatti"
                            className="inline-flex items-center gap-1 mt-8 text-sm font-medium text-[var(--accent3)] hover:underline transition-all link-reveal"
                          >
                            Parliamo del tuo progetto &rarr;
                          </a>
                        </div>
                      </BorderGlow>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <ContactCTA />
    </div>
  );
}
