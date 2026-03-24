"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { navLinks } from "@/data/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 h-16"
      style={{
        background: scrolled ? "rgba(5,5,5,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/" className="relative z-10 flex-shrink-0">
          <Image
            src="/images/logo.svg"
            alt="Growthers"
            width={120}
            height={24}
            className="h-6 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-[13px] font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--text)]"
                      : "text-[var(--text-dim)] hover:text-[var(--text)]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/contatti"
          className="btn-accent hidden lg:inline-flex text-[13px] font-medium px-5 py-2 rounded-[10px]"
        >
          Parliamo
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
          className="relative z-10 flex lg:hidden flex-col justify-center items-center w-10 h-10 gap-[6px]"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span
            className="block h-[2px] w-6 rounded-full transition-all duration-300 origin-center"
            style={{
              backgroundColor: "var(--text)",
              transform: mobileOpen
                ? "translateY(4px) rotate(45deg)"
                : "none",
            }}
          />
          <span
            className="block h-[2px] w-6 rounded-full transition-all duration-300"
            style={{
              backgroundColor: "var(--text)",
              opacity: mobileOpen ? 0 : 1,
              transform: mobileOpen ? "scaleX(0)" : "scaleX(1)",
            }}
          />
          <span
            className="block h-[2px] w-6 rounded-full transition-all duration-300 origin-center"
            style={{
              backgroundColor: "var(--text)",
              transform: mobileOpen
                ? "translateY(-4px) rotate(-45deg)"
                : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile overlay menu */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center lg:hidden transition-all duration-500"
        style={{
          background: "rgba(5,5,5,0.98)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
      >
        <ul className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <li
                key={link.href}
                className="transition-all duration-500"
                style={{
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen
                    ? "translateY(0)"
                    : "translateY(24px)",
                  transitionDelay: mobileOpen ? `${100 + i * 60}ms` : "0ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <Link
                  href={link.href}
                  className={`text-[28px] font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--text)]"
                      : "text-[var(--text-dim)] hover:text-[var(--text)]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile CTA */}
        <div
          className="mt-12 transition-all duration-500"
          style={{
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? "translateY(0)" : "translateY(24px)",
            transitionDelay: mobileOpen
              ? `${100 + navLinks.length * 60}ms`
              : "0ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <Link
            href="/contatti"
            className="btn-accent inline-flex text-[15px] font-medium px-7 py-3 rounded-[10px]"
          >
            Parliamo
          </Link>
        </div>
      </div>
    </nav>
  );
}
