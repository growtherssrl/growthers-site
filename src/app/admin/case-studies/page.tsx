"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface CaseStudy {
  id: string;
  client: string;
  sector: string;
  target: string;
  scope: string;
  description: string;
  services: string[];
  results: string[];
  featured: boolean;
  ai_project: boolean;
  sort_order: number;
}

const emptyForm = {
  client: "",
  sector: "",
  target: "",
  scope: "",
  description: "",
  services: "",
  results: "",
  featured: false,
  ai_project: false,
  sort_order: 0,
};

const inputClass =
  "w-full bg-[#0c0c0c] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#f5f2ef] focus:border-[#ff5c35] focus:outline-none";

export default function CaseStudiesAdmin() {
  const [list, setList] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchList = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("case_studies")
      .select("*")
      .order("sort_order");
    setList(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleEdit = (item: CaseStudy) => {
    setEditingId(item.id);
    setForm({
      client: item.client || "",
      sector: item.sector || "",
      target: item.target || "",
      scope: item.scope || "",
      description: item.description || "",
      services: (item.services || []).join(", "),
      results: (item.results || []).join(", "),
      featured: item.featured || false,
      ai_project: item.ai_project || false,
      sort_order: item.sort_order || 0,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo case study?")) return;
    await supabase.from("case_studies").delete().eq("id", id);
    fetchList();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      client: form.client,
      sector: form.sector,
      target: form.target,
      scope: form.scope,
      description: form.description,
      services: form.services.split(",").map((s) => s.trim()).filter(Boolean),
      results: form.results.split(",").map((s) => s.trim()).filter(Boolean),
      featured: form.featured,
      ai_project: form.ai_project,
      sort_order: form.sort_order,
    };

    if (editingId) {
      await supabase.from("case_studies").update(payload).eq("id", editingId);
    } else {
      await supabase.from("case_studies").insert(payload);
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
          <h1 className="text-2xl font-bold">Case Studies</h1>
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
              {editingId ? "Modifica Case Study" : "Nuovo Case Study"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[rgba(245,242,239,0.5)] mb-1">Client</label>
                <input className={inputClass} value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} required />
              </div>
              <div>
                <label className="block text-xs text-[rgba(245,242,239,0.5)] mb-1">Sector</label>
                <input className={inputClass} value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs text-[rgba(245,242,239,0.5)] mb-1">Target</label>
                <input className={inputClass} value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs text-[rgba(245,242,239,0.5)] mb-1">Scope</label>
                <input className={inputClass} value={form.scope} onChange={(e) => setForm({ ...form, scope: e.target.value })} />
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-[rgba(245,242,239,0.5)] mb-1">Description</label>
                <textarea className={inputClass + " min-h-[80px]"} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs text-[rgba(245,242,239,0.5)] mb-1">Services (comma-separated)</label>
                <input className={inputClass} value={form.services} onChange={(e) => setForm({ ...form, services: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs text-[rgba(245,242,239,0.5)] mb-1">Results (comma-separated)</label>
                <input className={inputClass} value={form.results} onChange={(e) => setForm({ ...form, results: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs text-[rgba(245,242,239,0.5)] mb-1">Sort Order</label>
                <input type="number" className={inputClass} value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
              </div>
              <div className="flex items-center gap-6 pt-5">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-[#ff5c35]" />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.ai_project} onChange={(e) => setForm({ ...form, ai_project: e.target.checked })} className="accent-[#ff5c35]" />
                  AI Project
                </label>
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
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Sector</th>
                  <th className="px-4 py-3">Target</th>
                  <th className="px-4 py-3">Featured</th>
                  <th className="px-4 py-3">AI Project</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item) => (
                  <tr key={item.id} className="border-t border-white/[0.08] hover:bg-white/[0.02]">
                    <td className="px-4 py-3">{item.client}</td>
                    <td className="px-4 py-3">{item.sector}</td>
                    <td className="px-4 py-3">{item.target}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block w-2 h-2 rounded-full ${item.featured ? "bg-[#ff5c35]" : "bg-white/20"}`} />
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block w-2 h-2 rounded-full ${item.ai_project ? "bg-[#ff5c35]" : "bg-white/20"}`} />
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button onClick={() => handleEdit(item)} className="text-[rgba(245,242,239,0.5)] hover:text-[#ff5c35] text-xs transition">Modifica</button>
                      <button onClick={() => handleDelete(item.id)} className="text-[rgba(245,242,239,0.5)] hover:text-red-400 text-xs transition">Elimina</button>
                    </td>
                  </tr>
                ))}
                {list.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-[rgba(245,242,239,0.5)]">Nessun case study trovato</td>
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
