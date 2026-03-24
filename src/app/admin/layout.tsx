"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/case-studies", label: "Case Studies" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/ai-products", label: "Prodotti AI" },
  { href: "/admin/clients", label: "Clienti" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/contacts", label: "Contatti" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && pathname !== "/admin/login") {
        router.replace("/admin/login");
      } else {
        setChecked(true);
      }
    });
  }, [pathname, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  // Login page: render without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!checked) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 bg-[#0c0c0c] h-screen fixed top-0 left-0 flex flex-col border-r border-white/5">
        <div className="px-5 py-6">
          <span className="text-sm font-bold text-[var(--accent)]">
            Growthers CMS
          </span>
        </div>

        <nav className="flex-1 px-3 space-y-0.5">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-sm py-2 px-4 rounded-lg transition-colors ${
                  isActive
                    ? "bg-white/5 text-white"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-6 space-y-1">
          <button
            onClick={handleLogout}
            className="block w-full text-left text-sm py-2 px-4 rounded-lg text-white/50 hover:bg-white/5 hover:text-white/80 transition-colors"
          >
            Logout
          </button>
          <Link
            href="/"
            className="block text-sm py-2 px-4 rounded-lg text-white/50 hover:bg-white/5 hover:text-white/80 transition-colors"
          >
            &larr; Torna al sito
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-56 flex-1 min-h-screen p-8 bg-[#050505]">
        {children}
      </main>
    </div>
  );
}
