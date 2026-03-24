"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BorderGlow from "@/components/ui/BorderGlow";

gsap.registerPlugin(ScrollTrigger);

const results = [
  {
    number: "150K+",
    description:
      "Nuovi follower generati in 6 mesi con strategia paid + organic",
    client: "Museum of Dreamers",
  },
  {
    number: "350%",
    description:
      "ROAS in 150 giorni dal lancio con scaling internazionale",
    client: "School of Disruption",
  },
  {
    number: "+12.000",
    description:
      "Lead qualificati generati in un anno con automation AI",
    client: "Morfeo",
  },
];

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    gsap.set(cards, { y: 30, opacity: 0 });

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(cards, {
        start: "top 90%",
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          });
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section relative overflow-hidden">
      {/* Aurora cool variant */}

      {/* Glow line */}
      <div className="glow-line absolute top-0 left-0 right-0 z-10" aria-hidden="true" />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        <div>
          <span className="text-[var(--text-faint)] text-xs uppercase tracking-[0.2em] font-medium">
            Risultati
          </span>
          <h2 className="text-3xl md:text-5xl text-display mt-4">
            Non promettiamo. Dimostriamo.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16">
          {results.map((result, i) => (
            <div
              key={result.client}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
            >
              <BorderGlow
               
                colors={["#bf5af2", "#30d158", "#ff5c35"]}
                glowColor="270 70 65"
              >
                <div className="p-8 backdrop-blur-xl">
                  <p className="text-5xl md:text-6xl font-bold gradient-text-warm">
                    {result.number}
                  </p>
                  <p className="text-sm text-[var(--text-dim)] mt-3">
                    {result.description}
                  </p>
                  <p className="text-xs text-[var(--text-faint)] mt-6 uppercase tracking-widest">
                    {result.client}
                  </p>
                </div>
              </BorderGlow>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/case-study"
            className="link-reveal text-[var(--text-dim)] hover:text-[var(--text)] transition-colors"
          >
            Tutti i casi di successo &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
