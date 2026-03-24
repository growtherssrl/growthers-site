"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { aiProducts, aiStats, aiValueProps } from "@/data/ai-frameworks";
import { aiAreas } from "@/data/services";
import { techStack } from "@/data/tech-stack";
import BorderGlow from "@/components/ui/BorderGlow";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────── */
/*  Category labels for the tech stack legend          */
/* ─────────────────────────────────────────────────── */
const categoryLabels: Record<string, string> = {
  ai: "AI & LLM",
  automation: "Automation",
  analytics: "Analytics",
  design: "Design",
  development: "Development",
  platform: "Platform",
};

/* ================================================== */
/*  PAGE COMPONENT                                     */
/* ================================================== */
export default function AIInnovationPage() {
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const areasRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);
  const techRef = useRef<HTMLElement>(null);
  const valueRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  /* ---- GSAP ScrollTrigger animations ---- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance */
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo("[data-hero-chip]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
        .fromTo("[data-hero-title]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.4)
        .fromTo("[data-hero-sub]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.6)
        .fromTo("[data-hero-cta]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.8);

      /* Stats bar */
      gsap.fromTo(
        "[data-stat]",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.12,
          scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
        }
      );

      /* AI Areas */
      gsap.fromTo(
        "[data-areas-header]",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: areasRef.current, start: "top 80%" } }
      );
      gsap.fromTo(
        "[data-area-card]",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.12,
          scrollTrigger: { trigger: areasRef.current, start: "top 75%" },
        }
      );

      /* Products */
      gsap.fromTo(
        "[data-products-header]",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: productsRef.current, start: "top 80%" } }
      );
      gsap.fromTo(
        "[data-product-card]",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
          scrollTrigger: { trigger: productsRef.current, start: "top 70%" },
        }
      );

      /* Tech stack */
      gsap.fromTo(
        "[data-tech-header]",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: techRef.current, start: "top 80%" } }
      );
      gsap.fromTo(
        "[data-tech-marquee]",
        { opacity: 0 },
        { opacity: 1, duration: 1, scrollTrigger: { trigger: techRef.current, start: "top 75%" } }
      );

      /* Value props */
      gsap.fromTo(
        "[data-value-header]",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: valueRef.current, start: "top 80%" } }
      );
      gsap.fromTo(
        "[data-value-item]",
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.12,
          scrollTrigger: { trigger: valueRef.current, start: "top 70%" },
        }
      );

      /* Bottom CTA */
      gsap.fromTo(
        "[data-bottom-cta]",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: ctaRef.current, start: "top 85%" } }
      );
    });

    return () => ctx.revert();
  }, []);

  /* ---- Unique categories for legend ---- */
  const categories = Array.from(new Set(techStack.map((t) => t.category)));

  /* ================================================ */
  /*  RENDER                                           */
  /* ================================================ */
  return (
    <>
      {/* ===================== 1. HERO ===================== */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background layers */}
        <div className="bg-grid bg-grid-fade absolute inset-0 z-0" />
        <div className="hero-orb absolute w-[800px] h-[600px] top-[10%] left-1/2 -translate-x-1/2 z-0" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Chip */}
          <div data-hero-chip className="opacity-0 mb-8">
            <span className="chip">AI &amp; Innovation</span>
          </div>

          {/* Title */}
          <h1
            data-hero-title
            className="opacity-0 text-5xl md:text-7xl text-display"
          >
            L&apos;AI non è il futuro.{" "}
            <br className="hidden md:block" />
            È come lavoriamo oggi.
          </h1>

          {/* Subtitle */}
          <p
            data-hero-sub
            className="opacity-0 text-lg text-[var(--text-dim)] mt-8 max-w-3xl mx-auto text-center"
          >
            30+ progetti AI in produzione. Non POC. Non slide. Soluzioni che
            generano risultati per i nostri clienti, ogni giorno.
          </p>

          {/* CTA */}
          <div data-hero-cta className="opacity-0 mt-10">
            <a href="#products" className="btn-accent">
              Scopri le soluzioni AI
            </a>
          </div>
        </div>
      </section>

      {/* ===================== 2. STATS BAR ===================== */}
      <section ref={statsRef} className="py-16 bg-[var(--bg-raised)]">
        <div className="glow-line" />
        <div className="max-w-[1200px] mx-auto px-6 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {aiStats.map((stat) => (
              <div key={stat.label} data-stat className="opacity-0">
                <span className="inline-block px-4 py-2 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/[0.06]">
                  <span className="text-5xl font-bold gradient-text-warm">{stat.value}</span>
                </span>
                <div className="text-sm text-[var(--text-faint)] uppercase tracking-widest mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glow-line" />
      </section>

      {/* ===================== 3. AI AREAS ===================== */}
      <section ref={areasRef} className="section relative overflow-hidden">

        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <div data-areas-header className="opacity-0 text-center">
            <h2 className="text-3xl md:text-5xl text-display">
              Dove applichiamo l&apos;AI
            </h2>
            <p className="text-[var(--text-dim)] mt-4 max-w-2xl mx-auto">
              Non siamo esperti di AI. Siamo esperti di marketing che usano
              l&apos;AI meglio di tutti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {aiAreas.map((area) => (
              <div key={area.title} data-area-card className="opacity-0">
                <BorderGlow borderRadius={16}>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[var(--text)]">
                      {area.title}
                    </h3>
                    <p className="text-sm text-[var(--text-dim)] mt-3 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </BorderGlow>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 4. AI PRODUCTS ===================== */}
      <section
        ref={productsRef}
        id="products"
        className="section bg-[var(--bg-raised)] relative overflow-hidden"
      >

        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <div data-products-header className="opacity-0 text-center">
            <h2 className="text-3xl md:text-5xl text-display">
              Soluzioni AI pronte all&apos;uso
            </h2>
            <p className="text-[var(--text-dim)] mt-4 max-w-2xl mx-auto">
              Prodotti AI che puoi attivare per il tuo business. Testati,
              funzionanti, con risultati misurabili.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
            {aiProducts.map((product) => (
              <div
                key={product.id}
                data-product-card
                className="opacity-0"
              >
                <BorderGlow
                 
                  colors={["#bf5af2", "#ff5c35", "#30d158"]}
                  glowColor="270 70 65"
                >
                  <div className="p-8 backdrop-blur-xl">
                    {/* Category badge */}
                    {product.category === "product" ? (
                      <span className="chip">Prodotto AI</span>
                    ) : (
                      <span className="chip">Capability</span>
                    )}

                    {/* Name */}
                    <h3 className="text-xl font-semibold mt-4 text-[var(--text)]">
                      {product.name}
                    </h3>

                    {/* Tagline */}
                    <p className="text-lg gradient-text-warm font-medium mt-2">
                      {product.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-[var(--text-dim)] mt-4 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Benefits */}
                    <ul className="mt-6 space-y-2">
                      {product.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm">
                          <span
                            className="inline-block w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[var(--accent3)]"
                          />
                          <span className="text-[var(--text-dim)]">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </BorderGlow>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 5. TECH STACK ===================== */}
      <section ref={techRef} className="section">
        <div className="max-w-[1200px] mx-auto px-6">
          <div data-tech-header className="opacity-0 text-center">
            <h2 className="text-2xl font-bold text-[var(--text)]">
              Il nostro arsenale
            </h2>
            <p className="text-[var(--text-dim)] mt-2">
              I tool che usiamo ogni giorno per creare soluzioni che funzionano
            </p>
          </div>

          {/* Marquee */}
          <div
            data-tech-marquee
            className="opacity-0 relative overflow-hidden mt-12"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div className="flex animate-marquee gap-4">
              {[...techStack, ...techStack].map((tool, i) => (
                <div
                  key={`${tool.name}-${i}`}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] text-sm text-[var(--text-dim)] flex-shrink-0 hover:text-[var(--text)] transition-colors"
                >
                  {tool.name}
                </div>
              ))}
            </div>
          </div>

          {/* Category legend */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((cat) => (
              <span key={cat} className="chip text-xs">
                {categoryLabels[cat] ?? cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 6. VALUE PROPS ===================== */}
      <section ref={valueRef} className="section">
        <div className="max-w-[1000px] mx-auto px-6">
          <h2
            data-value-header
            className="opacity-0 text-3xl md:text-5xl text-display text-center mb-16"
          >
            Perché scegliere Growthers per l&apos;AI
          </h2>

          <div>
            {aiValueProps.map((item, i) => (
              <div key={item.number} data-value-item className="opacity-0">
                <div className="flex gap-8 items-start py-8">
                  {/* Number */}
                  <span className="text-5xl font-bold gradient-text-cool shrink-0">
                    {item.number}
                  </span>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--text)]">
                      {item.title}
                    </h3>
                    <p className="text-[var(--text-dim)] mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Divider between items */}
                {i < aiValueProps.length - 1 && <div className="glow-line" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 7. BOTTOM CTA ===================== */}
      <section ref={ctaRef} className="section relative overflow-hidden">

        <div
          data-bottom-cta
          className="opacity-0 relative z-10 max-w-[900px] mx-auto px-6 text-center"
        >
          <BorderGlow borderRadius={20} glowIntensity={1.0}>
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-5xl text-display">
                Pronto a integrare l&apos;AI nel tuo business?
              </h2>
              <p className="text-[var(--text-dim)] mt-4">
                Parliamo di cosa possiamo costruire insieme
              </p>
              <div className="mt-10">
                <Link href="/contatti" className="btn-accent">
                  Parliamo del tuo progetto
                </Link>
              </div>
            </div>
          </BorderGlow>
        </div>
      </section>
    </>
  );
}
