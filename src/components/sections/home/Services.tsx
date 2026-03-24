"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BorderGlow from "@/components/ui/BorderGlow";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Performance Marketing",
    description:
      "Campagne che portano numeri, non vanity metrics. ROAS reali, scaling globale, budget che lavorano.",
    metric: "350%",
    metricLabel: "ROAS medio",
    color: "#ff5c35",
  },
  {
    title: "Martech & Analytics",
    description:
      "Connettiamo i tuoi tool. Automatizziamo i tuoi processi. I tuoi dati iniziano a lavorare per te, non il contrario.",
    metric: "13",
    metricLabel: "Integrazioni AI attive",
    color: "#bf5af2",
  },
  {
    title: "Creative & Design",
    description:
      "Creatività guidata dai dati e scalata dall'AI. Da un concept a 50 varianti in ore, non settimane.",
    metric: "50x",
    metricLabel: "Output creativo scalato",
    color: "#30d158",
  },
  {
    title: "Sviluppo & AI",
    description:
      "Siti, app, agenti AI, sistemi RAG. Costruiamo il software che serve al tuo business per andare più veloce.",
    metric: "30+",
    metricLabel: "Progetti AI in produzione",
    color: "#f5f2ef",
  },
];

export default function Services() {
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
      {/* Aurora behind the cards */}

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        <div>
          <span className="text-[var(--text-faint)] text-xs uppercase tracking-[0.2em] font-medium">
            Cosa facciamo
          </span>
          <h2 className="text-3xl md:text-5xl text-display mt-4">
            Quattro discipline. Un obiettivo: la tua crescita.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-16">
          {services.map((service, i) => (
            <div
              key={service.title}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
            >
              <BorderGlow
               
                glowColor="15 80 70"
              >
                <div className="p-8 backdrop-blur-xl">
                  <div
                    className="h-0.5 w-12 rounded-full"
                    style={{ backgroundColor: service.color }}
                  />
                  <h3 className="text-xl font-semibold mt-6">{service.title}</h3>
                  <p className="text-sm text-[var(--text-dim)] mt-3 leading-relaxed">
                    {service.description}
                  </p>
                  <p className="text-2xl font-bold gradient-text-warm mt-6">
                    {service.metric}
                  </p>
                  <p className="text-xs text-[var(--text-faint)] mt-1">
                    {service.metricLabel}
                  </p>
                </div>
              </BorderGlow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
