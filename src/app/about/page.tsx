"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { team, partners } from "@/data/team";
import ContactCTA from "@/components/sections/home/ContactCTA";
import BorderGlow from "@/components/ui/BorderGlow";

gsap.registerPlugin(ScrollTrigger);

const dnaPillars = [
  {
    title: "Smart per natura",
    description:
      "Competenze ibride e multicanale: strategia, tecnologia, creatività e dati si fondono in ogni progetto.",
  },
  {
    title: "AI-first",
    description:
      "L'AI attraversa ogni processo: dalla ricerca alla produzione, dall'analisi all'automazione operativa.",
  },
  {
    title: "Data-driven",
    description:
      "Decisioni basate su dati reali. Ogni azione è misurabile, ogni risultato è tracciabile.",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const blocks = gsap.utils.toArray<HTMLElement>(".about-reveal");
      blocks.forEach((block, i) => {
        gsap.from(block, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.08,
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
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <span className="chip text-xs font-semibold tracking-widest uppercase">
            ABOUT
          </span>
          <h1 className="text-4xl md:text-6xl text-display mt-6 text-[var(--text)]">
            We&apos;re Growth Maker
          </h1>
          <p className="gradient-text-warm text-2xl font-semibold mt-2">
            Competenze ibride e visione AI-native
          </p>
          <p className="text-lg text-[var(--text-dim)] mt-4 max-w-2xl">
            Un team eterogeneo e coeso, pronti a portare il tuo progetto di
            crescita digitale a un nuovo livello
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="relative section px-6 overflow-hidden">
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-[var(--text)]">Il Team</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="about-reveal opacity-0">
                <BorderGlow borderRadius={16}>
                  <div className="p-6 text-center">
                    {/* Avatar placeholder */}
                    <div className="w-20 h-20 rounded-full bg-[var(--bg-card)] border border-[var(--line)] mx-auto flex items-center justify-center">
                      <span className="text-lg font-bold gradient-text-warm">
                        {getInitials(member.name)}
                      </span>
                    </div>
                    <p className="text-base font-semibold mt-4 text-[var(--text)]">{member.name}</p>
                    <p className="text-sm text-[var(--text-dim)] mt-1">
                      {member.role}
                    </p>
                  </div>
                </BorderGlow>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DNA Section */}
      <section className="relative section px-6 bg-[var(--bg-raised)] overflow-hidden">
        <div className="relative z-10 max-w-[1000px] mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-[var(--text)]">Il nostro DNA</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dnaPillars.map((pillar) => (
              <div key={pillar.title} className="about-reveal opacity-0">
                <BorderGlow borderRadius={20} glowIntensity={1.0}>
                  <div className="p-8">
                    {/* Icon placeholder */}
                    <div className="w-12 h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--line)] flex items-center justify-center mb-4">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--accent), var(--accent3))",
                        }}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--text)]">{pillar.title}</h3>
                    <p className="text-sm text-[var(--text-dim)] mt-3">
                      {pillar.description}
                    </p>
                  </div>
                </BorderGlow>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="section px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-2xl font-bold mb-10 text-[var(--text)]">Le nostre partnership</h2>

          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((partner) => (
              <div key={partner.name} className="about-reveal opacity-0">
                <BorderGlow borderRadius={12} glowRadius={20} glowIntensity={0.6}>
                  <div className="px-8 py-4 text-center">
                    <span className="text-sm font-medium text-[var(--text)]">{partner.name}</span>
                  </div>
                </BorderGlow>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <ContactCTA />
    </div>
  );
}
