/* ─────────────────────────────────────────
   AI Products — the ones worth showcasing
   These are tangible, sellable, impressive.
   ───────────────────────────────────────── */

export interface AIProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  benefits: string[];
  category: "product" | "capability";
}

export const aiProducts: AIProduct[] = [
  {
    id: "cold-mail-ai",
    name: "Cold Mail Generator",
    tagline: "Email 1-to-1 che convertono. Su scala.",
    description:
      "Analizza il sito del prospect, identifica pain point e tecnologie usate, e genera email personalizzate che sembrano scritte a mano. Database di 128 tecnologie. Batch processing illimitato.",
    benefits: [
      "Ogni email è unica e contestualizzata",
      "Analisi automatica del sito prospect",
      "Da 10 email/ora a batch illimitati",
    ],
    category: "product",
  },
  {
    id: "rag-agents",
    name: "Agenti AI RAG",
    tagline: "Customer care intelligente. Sempre online.",
    description:
      "Agenti conversazionali che conoscono il tuo business meglio di chiunque altro. Si addestrano sulla tua knowledge base e rispondono ai clienti con risposte precise, contestuali, in tempo reale.",
    benefits: [
      "Risposte basate solo sui tuoi dati reali",
      "Qualifica lead automatica in chat",
      "Integrazione CRM e ticketing",
    ],
    category: "product",
  },
  {
    id: "local-vision",
    name: "AI Vision & Analisi Immagini",
    tagline: "Modelli locali. Costi zero. Privacy totale.",
    description:
      "Analisi di immagini con modelli AI che girano sui tuoi server. Classificazione prodotti, enrichment automatico, quality check visivo. Nessun dato esce dalla tua infrastruttura.",
    benefits: [
      "Modelli locali su GPU dedicata",
      "Zero costi API ricorrenti",
      "Compliance e privacy garantita",
    ],
    category: "product",
  },
  {
    id: "predictive-heatmaps",
    name: "Heatmap Predittive",
    tagline: "Sapere dove guarderanno. Prima di pubblicare.",
    description:
      "Genera heatmap di attenzione predittive sulle tue creatività e landing page. Ottimizza layout, posizionamento CTA e gerarchia visiva prima ancora di andare live.",
    benefits: [
      "Testa senza spendere in A/B test",
      "Ottimizza la UX prima del lancio",
      "Dati oggettivi, non opinioni",
    ],
    category: "product",
  },
  {
    id: "ai-creative-studio",
    name: "AI Creative Studio",
    tagline: "Shooting virtuali. Modelli su misura. Infinite varianti.",
    description:
      "Training di modelli LoRA per creare shooting fotografici virtuali, modelli ad hoc per il tuo brand, e immagini contestualizzate che nessun stock photo può offrire. Da 1 concept a 50 varianti.",
    benefits: [
      "Shooting senza fotografo",
      "Modelli virtuali brandizzati",
      "Scale infinito mantenendo qualità",
    ],
    category: "product",
  },
  {
    id: "seo-multilingua",
    name: "SEO Content Multi-Lingua",
    tagline: "8.390 contenuti in 5 lingue. In un'ora. A $7.",
    description:
      "Architettura multi-agente con 3 AI specializzate (Researcher, Writer, Translator) su GPU locale e cloud. Genera contenuti SEO per centinaia di prodotti in più lingue, a costi quasi zero. Fatto per Rizoma.",
    benefits: [
      "3 agenti AI specializzati in pipeline",
      "GPU locale per costi 17x inferiori",
      "Da mesi di lavoro editoriale a 1 ora",
    ],
    category: "product",
  },
  {
    id: "marketing-automation",
    name: "Hyper Automation",
    tagline: "Workflow che lavorano mentre dormi.",
    description:
      "Ecosistema di 13 connessioni AI dirette ai tuoi tool. CRM, analytics, advertising, design: tutto parla con tutto, tutto si ottimizza in automatico.",
    benefits: [
      "13 integrazioni AI native",
      "Workflow n8n + Make.com + AI",
      "Setup in giorni, non mesi",
    ],
    category: "capability",
  },
];

/* ─────────────────────────────────────────
   Stats — the proof
   ───────────────────────────────────────── */

export const aiStats = [
  { value: "30+", label: "Progetti AI in produzione" },
  { value: "10+", label: "Framework proprietari" },
  { value: "13", label: "Integrazioni AI native" },
  { value: "5x", label: "Più veloci della media" },
];

/* ─────────────────────────────────────────
   Value props — why Growthers for AI
   ───────────────────────────────────────── */

export const aiValueProps = [
  {
    number: "01",
    title: "Produzione, non teoria",
    description:
      "Ogni soluzione AI che offriamo è già in produzione su clienti reali. Zero POC che finiscono in un cassetto.",
  },
  {
    number: "02",
    title: "Il framework diventa tuo",
    description:
      "Ogni progetto genera un framework documentato e replicabile. Paghi una volta, lo usi per sempre.",
  },
  {
    number: "03",
    title: "Full-stack AI",
    description:
      "Non siamo specialisti di un solo verticale. L'AI attraversa tutto: strategia, design, sviluppo, analytics, outreach.",
  },
  {
    number: "04",
    title: "Costi reali, non enterprise",
    description:
      "Modelli locali, architetture smart, zero sprechi. Un progetto da $120 di API lo facciamo a $7. Stessa qualità.",
  },
  {
    number: "05",
    title: "AI custom, non generica",
    description:
      "Costruiamo tool AI su misura per il tuo business. Non adattiamo il tuo business a tool generici.",
  },
];
