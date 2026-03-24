import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <span className="chip text-xs font-semibold tracking-widest uppercase">BLOG</span>
        <h1 className="text-4xl md:text-6xl text-display mt-4 text-[var(--text)]">
          Insights & Risorse
        </h1>
        <p className="text-lg text-[var(--text-dim)] mt-4 max-w-2xl">
          Articoli, guide e approfondimenti su growth marketing, AI e
          innovazione digitale.
        </p>

        <div className="mt-20 flex flex-col items-center justify-center py-20">
          <div className="card-glow rounded-2xl p-12 text-center max-w-lg">
            <p className="text-5xl mb-6">🚀</p>
            <h2 className="text-2xl font-bold text-[var(--text)]">Coming Soon</h2>
            <p className="text-[var(--text-dim)] mt-3">
              Stiamo preparando contenuti di valore su AI, growth marketing e
              innovazione. Stay tuned.
            </p>
            <Link href="/" className="btn-accent mt-8 inline-flex">
              <span>Torna alla home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
