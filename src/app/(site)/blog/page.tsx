"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  category: string | null;
  tags: string[];
  author: string;
  reading_time: number | null;
  published_at: string | null;
  blocks: unknown[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setPosts((data as BlogPost[]) || []);
        setLoading(false);
      });
  }, []);

  const categories = Array.from(
    new Set(posts.map((p) => p.category).filter(Boolean))
  ) as string[];

  const filtered = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-[1100px] mx-auto">
        <span className="text-[var(--text-faint)] text-xs uppercase tracking-[0.2em] font-medium">
          Blog
        </span>
        <h1 className="text-4xl md:text-6xl text-display mt-4">
          Insights & Risorse
        </h1>
        <p className="text-lg text-[var(--text-dim)] mt-4 max-w-2xl">
          Articoli su growth marketing, AI e innovazione digitale.
        </p>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !activeCategory
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--bg-card)] border border-[var(--line)] text-[var(--text-dim)] hover:text-[var(--text)]"
              }`}
            >
              Tutti
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--bg-card)] border border-[var(--line)] text-[var(--text-dim)] hover:text-[var(--text)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[var(--bg-card)] rounded-2xl h-72 animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-[var(--text-dim)] mt-16">Nessun articolo trovato.</p>
        ) : (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <article className="bg-[var(--bg-card)] border border-[var(--line)] rounded-2xl overflow-hidden h-full transition-all duration-300 hover:border-[var(--line-hover)] hover:translate-y-[-3px] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
                  {post.cover_image ? (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] bg-[var(--bg-raised)] flex items-center justify-center">
                      <span className="text-4xl opacity-20">✍️</span>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-[var(--text-faint)]">
                      {post.category && (
                        <span className="text-[var(--accent)]">{post.category}</span>
                      )}
                      {post.reading_time && <span>{post.reading_time} min</span>}
                      {post.published_at && (
                        <span>
                          {new Date(post.published_at).toLocaleDateString("it-IT", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg font-semibold mt-3 leading-snug group-hover:text-[var(--accent)] transition-colors">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="text-sm text-[var(--text-dim)] mt-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
