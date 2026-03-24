"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BorderGlow from "@/components/ui/BorderGlow";

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ nome: "", email: "", messaggio: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!formRef.current) return;
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const inputCls =
    "w-full bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-[var(--text)] placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] focus:bg-white/[0.06] focus:outline-none transition-all";

  return (
    <section ref={sectionRef} className="section relative overflow-hidden">
      {/* Warm aurora behind form */}

      <div
        ref={formRef}
        className="relative z-10 max-w-[600px] mx-auto px-6"
      >
        {/* Form container with BorderGlow */}
        <BorderGlow borderRadius={20} glowIntensity={1.0}>
        <div className="p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl text-display">
            Parliamo del tuo progetto
          </h2>

          <p className="text-[var(--text-dim)] mt-3 text-sm">
            Raccontaci i tuoi obiettivi. Ti diciamo come arrivarci.
          </p>

          <form
            className="mt-8 text-left"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={form.nome}
                onChange={handleChange}
                className={inputCls}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className={inputCls}
              />
            </div>

            <textarea
              name="messaggio"
              placeholder="Raccontaci il tuo progetto..."
              rows={3}
              value={form.messaggio}
              onChange={handleChange}
              className={`mt-3 resize-none ${inputCls}`}
            />

            <button type="submit" className="btn-accent w-full mt-4">
              Invia &rarr;
            </button>
          </form>

          <p className="text-xs text-[var(--text-faint)] mt-6">
            Oppure scrivici:{" "}
            <a
              href="mailto:hi@growthers.io"
              className="text-[var(--text-dim)] hover:text-[var(--text)] transition-colors"
            >
              hi@growthers.io
            </a>
          </p>
        </div>
        </BorderGlow>
      </div>
    </section>
  );
}
