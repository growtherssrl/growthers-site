"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface TextBlock {
  type: "text";
  content: string;
}
interface ImageBlock {
  type: "image";
  url: string;
  alt: string;
  caption: string;
  width?: string;
  borderRadius?: string;
  customCss?: string;
}
interface CarouselBlock {
  type: "carousel";
  images: { url: string; alt: string }[];
  width?: string;
  borderRadius?: string;
  customCss?: string;
}
interface VideoBlock {
  type: "video";
  url: string;
  caption: string;
}
interface BannerBlock {
  type: "banner";
  title: string;
  description: string;
  cta_text: string;
  cta_url: string;
  variant: "accent" | "dark" | "gradient";
}

type Block = TextBlock | ImageBlock | CarouselBlock | VideoBlock | BannerBlock;

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
  blocks: Block[];
}

function parseCss(css: string): React.CSSProperties {
  const style: Record<string, string> = {};
  css.split(";").forEach((rule) => {
    const [prop, val] = rule.split(":").map((s) => s.trim());
    if (prop && val) {
      const camel = prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
      style[camel] = val;
    }
  });
  return style as React.CSSProperties;
}

function getYouTubeId(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return match?.[1] || null;
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return (
        <div
          className="prose-block"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      );

    case "image": {
      const imgStyle: React.CSSProperties = {
        width: `${block.width || 100}%`,
        borderRadius: `${block.borderRadius || 12}px`,
        ...(block.customCss ? parseCss(block.customCss) : {}),
      };
      return (
        <figure className="my-10" style={{ textAlign: Number(block.width || 100) < 100 ? "center" : undefined }}>
          <img
            src={block.url}
            alt={block.alt}
            style={imgStyle}
            className="inline-block"
          />
          {block.caption && (
            <figcaption className="text-sm text-[var(--text-faint)] mt-3 text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "carousel": {
      const slideStyle: React.CSSProperties = {
        borderRadius: `${block.borderRadius || 12}px`,
        ...(block.customCss ? parseCss(block.customCss) : {}),
      };
      return (
        <div className="my-10 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {block.images.map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt={img.alt}
              style={{ ...slideStyle, width: `${block.width || 80}%`, flexShrink: 0 }}
              className="snap-center object-cover"
            />
          ))}
        </div>
      );
    }

    case "video": {
      const ytId = getYouTubeId(block.url);
      return (
        <figure className="my-10">
          {ytId ? (
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${ytId}`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <a
              href={block.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[var(--bg-card)] border border-[var(--line)] rounded-xl p-6 text-center hover:border-[var(--accent)] transition-colors"
            >
              <span className="text-3xl">▶️</span>
              <p className="text-sm text-[var(--text-dim)] mt-2">
                Guarda il video
              </p>
            </a>
          )}
          {block.caption && (
            <figcaption className="text-sm text-[var(--text-faint)] mt-3 text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "banner": {
      const variants = {
        accent: "bg-[var(--accent)]",
        dark: "bg-[var(--bg-card)] border border-[var(--line)]",
        gradient: "bg-gradient-to-r from-[#ff5c35] to-[#bf5af2]",
      };
      return (
        <div
          className={`my-10 rounded-xl p-8 md:p-10 ${variants[block.variant]}`}
        >
          <h3 className="text-xl md:text-2xl font-bold">{block.title}</h3>
          {block.description && (
            <p className="mt-2 text-sm opacity-80">{block.description}</p>
          )}
          {block.cta_text && block.cta_url && (
            <a
              href={block.cta_url}
              className={`inline-block mt-6 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                block.variant === "dark"
                  ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                  : "bg-white text-[#050505] hover:bg-white/90"
              }`}
            >
              {block.cta_text}
            </a>
          )}
        </div>
      );
    }
  }
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single()
      .then(({ data }) => {
        setPost(data as BlogPost | null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-[800px] mx-auto">
        <div className="h-8 w-48 bg-[var(--bg-card)] rounded animate-pulse" />
        <div className="h-12 w-full bg-[var(--bg-card)] rounded mt-6 animate-pulse" />
        <div className="h-64 w-full bg-[var(--bg-card)] rounded mt-10 animate-pulse" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 pb-20 px-6 text-center">
        <h1 className="text-3xl font-bold">Articolo non trovato</h1>
        <Link
          href="/blog"
          className="text-[var(--accent)] mt-4 inline-block hover:underline"
        >
          ← Torna al blog
        </Link>
      </div>
    );
  }

  return (
    <article className="pt-32 pb-20 px-6">
      <div className="max-w-[800px] mx-auto">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-[var(--text-faint)]">
          <Link
            href="/blog"
            className="hover:text-[var(--text)] transition-colors"
          >
            ← Blog
          </Link>
          <span>·</span>
          {post.category && (
            <span className="text-[var(--accent)]">{post.category}</span>
          )}
          {post.published_at && (
            <span>
              {new Date(post.published_at).toLocaleDateString("it-IT", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
          {post.reading_time && <span>{post.reading_time} min di lettura</span>}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl text-display mt-6">{post.title}</h1>

        {/* Author */}
        <div className="flex items-center gap-3 mt-6">
          <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-xs font-bold text-white">
            {post.author?.[0] || "G"}
          </div>
          <span className="text-sm text-[var(--text-dim)]">{post.author}</span>
        </div>

        {/* Cover */}
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full rounded-xl mt-10"
          />
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs bg-[var(--bg-card)] border border-[var(--line)] text-[var(--text-faint)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Blocks */}
        <div className="mt-10">
          {post.blocks.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </div>

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-[var(--line)]">
          <Link
            href="/blog"
            className="text-[var(--accent)] hover:underline text-sm"
          >
            ← Tutti gli articoli
          </Link>
        </div>
      </div>

      {/* Article typography styles */}
      <style jsx global>{`
        .prose-block h2 {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          color: var(--text);
        }
        .prose-block h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 0.5rem;
          color: var(--text);
        }
        .prose-block p {
          margin-bottom: 1rem;
          line-height: 1.8;
          color: var(--text-dim);
        }
        .prose-block strong,
        .prose-block b {
          color: var(--text);
          font-weight: 600;
        }
        .prose-block em,
        .prose-block i {
          font-style: italic;
        }
        .prose-block a {
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .prose-block a:hover {
          color: var(--accent-hover);
        }
        .prose-block ul,
        .prose-block ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          color: var(--text-dim);
          line-height: 1.8;
        }
        .prose-block ul {
          list-style-type: disc;
        }
        .prose-block ol {
          list-style-type: decimal;
        }
        .prose-block li {
          margin-bottom: 0.4rem;
        }
        .prose-block blockquote {
          border-left: 3px solid var(--accent);
          padding-left: 1.25rem;
          margin: 1.5rem 0;
          color: rgba(245, 242, 239, 0.45);
          font-style: italic;
        }
        .prose-block hr {
          border: none;
          border-top: 1px solid var(--line);
          margin: 2rem 0;
        }
      `}</style>
    </article>
  );
}
