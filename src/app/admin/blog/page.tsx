"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import BlockEditor from "@/components/admin/BlockEditor";
import ImageUpload from "@/components/admin/ImageUpload";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  status: "draft" | "published";
  category: string;
  tags: string[];
  author: string;
  reading_time: number | null;
  blocks: unknown[];
  published_at: string | null;
  created_at: string;
}

const emptyPost: Omit<BlogPost, "id" | "created_at"> = {
  title: "",
  slug: "",
  excerpt: "",
  cover_image: "",
  status: "draft",
  category: "",
  tags: [],
  author: "Growthers",
  reading_time: null,
  blocks: [],
  published_at: null,
};

const inputCls =
  "w-full bg-[#0c0c0c] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-sm text-[#f5f2ef] placeholder:text-[rgba(245,242,239,0.25)] focus:border-[#ff5c35] focus:outline-none transition-colors";

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "editor">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyPost);
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);

  async function fetchPosts() {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts((data as BlogPost[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  function openNew() {
    setEditingId(null);
    setForm(emptyPost);
    setTagsInput("");
    setView("editor");
  }

  function openEdit(post: BlogPost) {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      cover_image: post.cover_image || "",
      status: post.status,
      category: post.category || "",
      tags: post.tags || [],
      author: post.author || "Growthers",
      reading_time: post.reading_time,
      blocks: post.blocks || [],
      published_at: post.published_at,
    });
    setTagsInput((post.tags || []).join(", "));
    setView("editor");
  }

  async function handleSave() {
    setSaving(true);
    const payload = {
      ...form,
      slug: form.slug || generateSlug(form.title),
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      published_at:
        form.status === "published" && !form.published_at
          ? new Date().toISOString()
          : form.published_at,
      updated_at: new Date().toISOString(),
    };

    if (editingId) {
      await supabase.from("blog_posts").update(payload).eq("id", editingId);
    } else {
      await supabase.from("blog_posts").insert(payload);
    }

    setSaving(false);
    setView("list");
    fetchPosts();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Eliminare questo articolo?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    fetchPosts();
  }

  // ── LIST VIEW ──
  if (view === "list") {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Blog</h1>
            <p className="text-sm text-[rgba(245,242,239,0.5)] mt-1">
              {posts.length} articol{posts.length === 1 ? "o" : "i"}
            </p>
          </div>
          <button onClick={openNew} className="btn-accent text-sm px-5 py-2">
            + Nuovo articolo
          </button>
        </div>

        {loading ? (
          <p className="text-[rgba(245,242,239,0.5)]">Caricamento...</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[rgba(245,242,239,0.3)] text-lg">
              Nessun articolo ancora
            </p>
            <button
              onClick={openNew}
              className="btn-accent text-sm px-5 py-2 mt-4"
            >
              Crea il primo
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-[#141414] border border-[rgba(255,255,255,0.08)] rounded-xl p-5 flex items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold truncate">{post.title}</h3>
                    <span
                      className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        post.status === "published"
                          ? "bg-[#30d158]/10 text-[#30d158]"
                          : "bg-[rgba(255,255,255,0.05)] text-[rgba(245,242,239,0.4)]"
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-[rgba(245,242,239,0.4)]">
                    {post.category && <span>{post.category}</span>}
                    <span>
                      {new Date(post.created_at).toLocaleDateString("it-IT")}
                    </span>
                    <span>
                      {(post.blocks || []).length} blocc
                      {(post.blocks || []).length === 1 ? "o" : "hi"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEdit(post)}
                    className="text-xs text-[rgba(245,242,239,0.5)] hover:text-[#f5f2ef] px-3 py-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                  >
                    Modifica
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-xs text-red-400/60 hover:text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-400/5 transition-colors"
                  >
                    Elimina
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── EDITOR VIEW ──
  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#050505] py-4 z-20 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setView("list")}
            className="text-sm text-[rgba(245,242,239,0.5)] hover:text-[#f5f2ef] transition-colors"
          >
            ← Indietro
          </button>
          <h1 className="text-lg font-semibold">
            {editingId ? "Modifica articolo" : "Nuovo articolo"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={form.status}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                status: e.target.value as "draft" | "published",
              }))
            }
            className="bg-[#0c0c0c] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-1.5 text-sm text-[#f5f2ef] focus:outline-none"
          >
            <option value="draft">Bozza</option>
            <option value="published">Pubblicato</option>
          </select>
          <button
            onClick={handleSave}
            disabled={saving || !form.title}
            className="btn-accent text-sm px-5 py-2 disabled:opacity-40"
          >
            {saving ? "Salvataggio..." : "Salva"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        {/* Main content */}
        <div className="space-y-6">
          {/* Title */}
          <input
            type="text"
            value={form.title}
            onChange={(e) => {
              const title = e.target.value;
              setForm((f) => ({
                ...f,
                title,
                slug: f.slug || generateSlug(title),
              }));
            }}
            placeholder="Titolo dell'articolo"
            className="w-full bg-transparent text-3xl font-bold text-[#f5f2ef] placeholder:text-[rgba(245,242,239,0.2)] focus:outline-none"
          />

          {/* Excerpt */}
          <textarea
            value={form.excerpt}
            onChange={(e) =>
              setForm((f) => ({ ...f, excerpt: e.target.value }))
            }
            placeholder="Estratto / descrizione breve (SEO)"
            rows={2}
            className={`${inputCls} resize-none`}
          />

          {/* Block Editor */}
          <div>
            <h2 className="text-xs uppercase tracking-wider text-[rgba(245,242,239,0.4)] mb-4">
              Contenuto
            </h2>
            <BlockEditor
              blocks={form.blocks as Parameters<typeof BlockEditor>[0]["blocks"]}
              onChange={(blocks) => setForm((f) => ({ ...f, blocks }))}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-[#141414] border border-[rgba(255,255,255,0.08)] rounded-xl p-5 space-y-4">
            <h3 className="text-xs uppercase tracking-wider text-[rgba(245,242,239,0.4)]">
              Metadati
            </h3>

            <div>
              <label className="text-xs text-[rgba(245,242,239,0.4)] mb-1 block">
                Slug
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) =>
                  setForm((f) => ({ ...f, slug: e.target.value }))
                }
                placeholder="url-articolo"
                className={inputCls}
              />
            </div>

            <div>
              <label className="text-xs text-[rgba(245,242,239,0.4)] mb-1 block">
                Categoria
              </label>
              <input
                type="text"
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                placeholder="es. AI, Marketing, Case Study"
                className={inputCls}
              />
            </div>

            <div>
              <label className="text-xs text-[rgba(245,242,239,0.4)] mb-1 block">
                Tag (separati da virgola)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="ai, growth, marketing"
                className={inputCls}
              />
            </div>

            <div>
              <label className="text-xs text-[rgba(245,242,239,0.4)] mb-1 block">
                Autore
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) =>
                  setForm((f) => ({ ...f, author: e.target.value }))
                }
                className={inputCls}
              />
            </div>

            <div>
              <label className="text-xs text-[rgba(245,242,239,0.4)] mb-1 block">
                Immagine di copertina
              </label>
              <ImageUpload
                value={form.cover_image}
                onChange={(url) =>
                  setForm((f) => ({ ...f, cover_image: url }))
                }
                folder="blog/covers"
              />
            </div>

            <div>
              <label className="text-xs text-[rgba(245,242,239,0.4)] mb-1 block">
                Tempo di lettura (min)
              </label>
              <input
                type="number"
                value={form.reading_time || ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    reading_time: e.target.value
                      ? parseInt(e.target.value)
                      : null,
                  }))
                }
                placeholder="5"
                className={inputCls}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
