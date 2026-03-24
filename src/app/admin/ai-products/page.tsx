"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface AiProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  benefits: string[];
  category: string;
  sort_order: number;
}

const emptyForm = {
  name: "",
  tagline: "",
  description: "",
  benefits: "",
  category: "product",
  sort_order: 0,
};

const inputClass =
  "w-full bg-[#0c0c0c] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#f5f2ef] focus:border-[#ff5c35] focus:outline-none";

export default function AiProductsAdmin() {
  const [list, setList] = useState<AiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchList = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("ai_products")
      .select("*")
      .order("sort_order");
    setList(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleEdit = (item: AiProduct) => {
    setEditingId(item.id);
    setForm({
      name: item.name || "",
      tagline: item.tagline || "",
      description: item.description || "",
      benefits: (item.benefits || []).join(", "),
      category: item.category || "product",
      sort_order: item.sort_order || 0,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo prodotto?")) return;
    await supabase.from("ai_products").delete().eq("id", id);
    fetchList();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      tagline: form.tagline,
      description: form.description,
      benefits: form.benefits.split(",").map((s) => s.trim()).filter(Boolean),
      category: form.category,
      sort_order: form.sort_order,
    };

    if (editingId) {
      await supabase.from("ai_products").update(payload).eq("id", editingId);
    } else {
      await supabase.from("ai_products").insert(payload);
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    fetchList();
  };

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f2ef] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">AI Products</h1>
          <button
            onClick={openNew}
            className="px-4 py-2 bg-[#ff5c35] text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
          >
            Aggiungi
          </button>
        </div>

        {showForm && (
          <div className="bg-[#141414] border border-white/[0.08] rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? "Modifica Prodotto" : "Nuovo Prodotto"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[rgba(245,242,239,0.5)] mb-1">Name</label>
                <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="block text-xs text-[rgba(245,242,239,0.5)] mb-1">Tagline</label>
                <input className={inputClass} value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-[rgba(245,242,239,0.5)] mb-1">Description</label>
                <textarea className={inputClass + " min-h-[80px]"} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs text-[rgba(245,242,239,0.5)] mb-1">Benefits (comma-separated)</label>
                <input className={inputClass} value={form.benefits} onChange={(e) => setForm({ ...form, benefits: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs text-[rgba(245,242,239,0.5)] mb-1">Category</label>
                <select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  <option value="product">Product</option>
                  <option value="capability">Capability</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[rgba(245,242,239,0.5)] mb-1">Sort Order</label>
                <input type="number" className={inputClass} value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
              </div>
              <div className="col-span-2 flex gap-3 mt-2">
                <button type="submit" className="px-4 py-2 bg-[#ff5c35] text-white rounded-lg text-sm font-medium hover:opacity-90 transition">
                  {editingId ? "Salva modifiche" : "Crea"}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="px-4 py-2 bg-white/[0.06] text-[#f5f2ef] rounded-lg text-sm hover:bg-white/[0.1] transition">
                  Annulla
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="text-[rgba(245,242,239,0.5)] text-sm">Caricamento...</p>
        ) : (
          <div className="bg-[#141414] border border-white/[0.08] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[rgba(245,242,239,0.5)] uppercase tracking-wider text-xs text-left">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Tagline</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item) => (
                  <tr key={item.id} className="border-t border-white/[0.08] hover:bg-white/[0.02]">
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.tagline}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-white/[0.06]">{item.category}</span>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button onClick={() => handleEdit(item)} className="text-[rgba(245,242,239,0.5)] hover:text-[#ff5c35] text-xs transition">Modifica</button>
                      <button onClick={() => handleDelete(item.id)} className="text-[rgba(245,242,239,0.5)] hover:text-red-400 text-xs transition">Elimina</button>
                    </td>
                  </tr>
                ))}
                {list.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-[rgba(245,242,239,0.5)]">Nessun prodotto trovato</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
