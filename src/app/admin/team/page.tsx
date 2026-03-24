"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo_url: string;
  sort_order: number;
}

const emptyForm = {
  name: "",
  role: "",
  photo_url: "",
  sort_order: 0,
};

const inputClass =
  "w-full bg-[#0c0c0c] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#f5f2ef] focus:border-[#ff5c35] focus:outline-none";

export default function TeamAdmin() {
  const [list, setList] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchList = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("team")
      .select("*")
      .order("sort_order");
    setList(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleEdit = (item: TeamMember) => {
    setEditingId(item.id);
    setForm({
      name: item.name || "",
      role: item.role || "",
      photo_url: item.photo_url || "",
      sort_order: item.sort_order || 0,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo membro?")) return;
    await supabase.from("team").delete().eq("id", id);
    fetchList();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      role: form.role,
      photo_url: form.photo_url,
      sort_order: form.sort_order,
    };

    if (editingId) {
      await supabase.from("team").update(payload).eq("id", editingId);
    } else {
      await supabase.from("team").insert(payload);
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
          <h1 className="text-2xl font-bold">Team</h1>
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
              {editingId ? "Modifica Membro" : "Nuovo Membro"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[rgba(245,242,239,0.5)] mb-1">Name</label>
                <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="block text-xs text-[rgba(245,242,239,0.5)] mb-1">Role</label>
                <input className={inputClass} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
              </div>
              <div>
                <label className="block text-xs text-[rgba(245,242,239,0.5)] mb-1">Photo URL</label>
                <input className={inputClass} value={form.photo_url} onChange={(e) => setForm({ ...form, photo_url: e.target.value })} />
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
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Sort Order</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item) => (
                  <tr key={item.id} className="border-t border-white/[0.08] hover:bg-white/[0.02]">
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.role}</td>
                    <td className="px-4 py-3">{item.sort_order}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button onClick={() => handleEdit(item)} className="text-[rgba(245,242,239,0.5)] hover:text-[#ff5c35] text-xs transition">Modifica</button>
                      <button onClick={() => handleDelete(item.id)} className="text-[rgba(245,242,239,0.5)] hover:text-red-400 text-xs transition">Elimina</button>
                    </td>
                  </tr>
                ))}
                {list.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-[rgba(245,242,239,0.5)]">Nessun membro trovato</td>
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
