"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Stats {
  caseStudies: number;
  teamMembers: number;
  aiProducts: number;
  clients: number;
  unreadContacts: number;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    caseStudies: 0,
    teamMembers: 0,
    aiProducts: 0,
    clients: 0,
    unreadContacts: 0,
  });
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [
        { count: caseStudies },
        { count: teamMembers },
        { count: aiProducts },
        { count: clients },
        { count: unreadContacts },
        { data: contacts },
      ] = await Promise.all([
        supabase
          .from("case_studies")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("team_members")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("ai_products")
          .select("*", { count: "exact", head: true }),
        supabase.from("clients").select("*", { count: "exact", head: true }),
        supabase
          .from("contacts")
          .select("*", { count: "exact", head: true })
          .eq("read", false),
        supabase
          .from("contacts")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      setStats({
        caseStudies: caseStudies ?? 0,
        teamMembers: teamMembers ?? 0,
        aiProducts: aiProducts ?? 0,
        clients: clients ?? 0,
        unreadContacts: unreadContacts ?? 0,
      });
      setRecentContacts(contacts ?? []);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-5 h-5 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const cards = [
    { label: "Case Studies", value: stats.caseStudies },
    { label: "Team Members", value: stats.teamMembers },
    { label: "Prodotti AI", value: stats.aiProducts },
    { label: "Clienti", value: stats.clients },
    { label: "Contatti non letti", value: stats.unreadContacts },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-[#141414] border border-white/[0.08] rounded-xl p-6"
          >
            <p className="text-3xl font-bold text-white mb-1">{card.value}</p>
            <p className="text-sm text-white/50">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Recent contacts */}
      <h2 className="text-lg font-semibold text-white mb-4">
        Contatti recenti
      </h2>
      {recentContacts.length === 0 ? (
        <p className="text-white/40 text-sm">Nessun contatto presente.</p>
      ) : (
        <div className="bg-[#141414] border border-white/[0.08] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left px-4 py-3 text-white/40 font-medium">
                  Nome
                </th>
                <th className="text-left px-4 py-3 text-white/40 font-medium">
                  Email
                </th>
                <th className="text-left px-4 py-3 text-white/40 font-medium">
                  Messaggio
                </th>
                <th className="text-left px-4 py-3 text-white/40 font-medium">
                  Data
                </th>
                <th className="text-left px-4 py-3 text-white/40 font-medium">
                  Stato
                </th>
              </tr>
            </thead>
            <tbody>
              {recentContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-b border-white/[0.04] last:border-0"
                >
                  <td className="px-4 py-3 text-white">{contact.name}</td>
                  <td className="px-4 py-3 text-white/60">{contact.email}</td>
                  <td className="px-4 py-3 text-white/60 max-w-xs truncate">
                    {contact.message}
                  </td>
                  <td className="px-4 py-3 text-white/40">
                    {new Date(contact.created_at).toLocaleDateString("it-IT")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                        contact.read
                          ? "bg-white/5 text-white/40"
                          : "bg-[var(--accent)]/15 text-[var(--accent)]"
                      }`}
                    >
                      {contact.read ? "Letto" : "Nuovo"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
