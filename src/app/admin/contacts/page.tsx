"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

export default function ContactsAdmin() {
  const [list, setList] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    setList(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const toggleRead = async (item: Contact) => {
    await supabase
      .from("contacts")
      .update({ read: !item.read })
      .eq("id", item.id);
    fetchList();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo messaggio?")) return;
    await supabase.from("contacts").delete().eq("id", id);
    fetchList();
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f2ef] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Contacts</h1>
          <span className="text-sm text-[rgba(245,242,239,0.5)]">
            {list.filter((c) => !c.read).length} non letti
          </span>
        </div>

        {loading ? (
          <p className="text-[rgba(245,242,239,0.5)] text-sm">Caricamento...</p>
        ) : (
          <div className="bg-[#141414] border border-white/[0.08] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[rgba(245,242,239,0.5)] uppercase tracking-wider text-xs text-left">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Read</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item) => (
                  <tr
                    key={item.id}
                    className={`border-t border-white/[0.08] hover:bg-white/[0.02] ${!item.read ? "bg-white/[0.03]" : ""}`}
                  >
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3">{item.email}</td>
                    <td className="px-4 py-3 max-w-[300px] truncate">{item.message}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleRead(item)}
                        className={`inline-block w-3 h-3 rounded-full cursor-pointer transition ${
                          item.read ? "bg-green-500" : "bg-[#ff5c35]"
                        }`}
                        title={item.read ? "Segna come non letto" : "Segna come letto"}
                      />
                    </td>
                    <td className="px-4 py-3 text-[rgba(245,242,239,0.5)]">
                      {formatDate(item.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-[rgba(245,242,239,0.5)] hover:text-red-400 text-xs transition"
                      >
                        Elimina
                      </button>
                    </td>
                  </tr>
                ))}
                {list.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-[rgba(245,242,239,0.5)]">
                      Nessun messaggio trovato
                    </td>
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
