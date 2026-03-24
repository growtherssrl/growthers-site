export interface CaseStudy {
  id: string;
  client: string;
  sector: string;
  target: string;
  scope: string;
  description: string;
  services: string[];
  results: string[];
  featured: boolean;
  aiProject?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "museum-of-dreamers",
    client: "Museum of Dreamers",
    sector: "Culturale / Eventi",
    target: "B2C",
    scope: "EU",
    description:
      "Fenomeno culturale nelle metropoli europee. Lancio sofisticato a Roma con strategie di marketing avanzate.",
    services: ["Ads Management & Scaling", "Lead Generation B2C", "Automation Intelligence", "Event Scaling", "Web Development"],
    results: ["Milioni di impression", "Migliaia di biglietti venduti in presale su TicketOne", "Da 30.000 a 150.000+ nuovi follower in 6 mesi"],
    featured: true,
  },
  {
    id: "impact2030",
    client: "IMPACT2030",
    sector: "Business / Formazione",
    target: "B2B",
    scope: "Nazionale",
    description: "Evento di livello enterprise con Forbes e H-FARM.",
    services: ["Ads Management", "Lead Generation B2B", "Automation", "Event Scaling", "Web Development"],
    results: ["370 decision-maker aziendali partecipanti", "50.000 lead nei primi 60 giorni"],
    featured: true,
  },
  {
    id: "school-of-disruption",
    client: "School of Disruption",
    sector: "Educazione",
    target: "B2B & B2C",
    scope: "Internazionale",
    description: "Piattaforma educativa internazionale con targeting multi-mercato.",
    services: ["Ads Management", "Lead Generation B2C", "Event Scaling", "Automation", "Web Development"],
    results: ["ROAS del 350% in 150 giorni dal lancio", "Ads scaling in più di 50 paesi world-wide"],
    featured: true,
  },
  {
    id: "rizoma",
    client: "Rizoma",
    sector: "Accessori moto premium",
    target: "B2C",
    scope: "Internazionale",
    description:
      "Generazione di 8.390 righe di contenuti SEO per 390+ modelli di moto in 5 lingue, con architettura multi-agente AI.",
    services: ["AI Multi-Agent System", "SEO Content", "Automazione"],
    results: ["8.390 righe di contenuto generate", "5 lingue gestite automaticamente", "Costo $7 vs $120+ cloud", "Completato in ~1 ora vs mesi"],
    featured: true,
    aiProject: true,
  },
  {
    id: "shr-italia",
    client: "SHR Italia",
    sector: "Risorse Umane",
    target: "B2B",
    scope: "Nazionale",
    description: "Incubatore per iniziative nel settore lavoro. Gestione lancio piattaforma '12minuti al lavoro'.",
    services: ["AI System", "Ads Management", "Lead Generation", "Automation", "Web Development"],
    results: [],
    featured: false,
  },
  {
    id: "laborability",
    client: "Laborability",
    sector: "Risorse Umane",
    target: "B2B",
    scope: "Nazionale",
    description: "Redesign completo del sito con architettura modulare, 18 sezioni homepage. Pipeline Figma-to-Elementor applicata su larga scala.",
    services: ["Ads Management", "Lead Generation B2B", "Automation", "Web Development", "AI Pipeline"],
    results: ["18 sezioni homepage mappate", "Pipeline Figma→WordPress testata in produzione"],
    featured: false,
    aiProject: true,
  },
  {
    id: "morfeo",
    client: "Morfeo",
    sector: "Arredamento / Riposo",
    target: "B2C",
    scope: "Nazionale",
    description: "Commercio di sistemi per il riposo con sistema di prenotazione self-booking.",
    services: ["Lead Generation B2C", "Automation", "Ads Management", "Web Development"],
    results: ["+12.000 lead generati in un anno", "Sistema prenotazione self-booking"],
    featured: false,
  },
  {
    id: "ymanage",
    client: "YManage",
    sector: "Yachting",
    target: "B2B",
    scope: "Internazionale",
    description: "Azienda di Yachting management con piattaforma cloud collaborativa.",
    services: ["Ads Management", "Lead Generation B2B", "Web Development"],
    results: ["Incremento partner del 150%"],
    featured: false,
  },
  {
    id: "silagum",
    client: "Silagum",
    sector: "Prodotti Alimentari",
    target: "B2B/B2C",
    scope: "Nazionale",
    description: "Azienda calabrese che produce gelatine e caramelle gommose certificate BIO, VEGANO, DOP.",
    services: ["Ads Management", "Lead Generation B2B/B2C", "Automation", "Web Development", "E-Commerce"],
    results: ["Raddoppio ordini su Amazon", "Lancio e-commerce di successo"],
    featured: false,
  },
  {
    id: "showclub",
    client: "ShowClub",
    sector: "Intrattenimento",
    target: "B2C",
    scope: "Nazionale",
    description: "Audit tecnico completo di 78 tag, 130 trigger, 33 variabili custom, consent mode e strategia tracking su 3 workspace GTM.",
    services: ["Audit GTM & GA4", "AI System"],
    results: ["78 tag analizzati programmaticamente", "130 trigger mappati", "3 workspace GTM auditati"],
    featured: false,
    aiProject: true,
  },
  {
    id: "tech4you",
    client: "Tech4You",
    sector: "Innovazione",
    target: "B2B",
    scope: "Nazionale",
    description: "Ecosistema innovazione completo: brand identity, content strategy, landing page, LinkedIn strategy, AI agent automation.",
    services: ["Brand Identity", "Content Strategy", "Landing Page", "LinkedIn Strategy", "AI Automation"],
    results: ["Integrazione massima di framework AI Growthers"],
    featured: false,
    aiProject: true,
  },
  {
    id: "essia-skincare",
    client: "Essia Skincare",
    sector: "Bellezza",
    target: "B2C",
    scope: "EU",
    description: "Brand di prodotti per la bellezza Made in Italy. Espansione internazionale.",
    services: ["Ads Management", "Web Development"],
    results: ["Lancio su Amazon Italia", "Espansione in Francia e Spagna"],
    featured: false,
  },
];

export const featuredStats = [
  { value: "150K+", label: "Nuovi follower generati" },
  { value: "50K", label: "Lead in 60 giorni" },
  { value: "350%", label: "ROAS in 150 giorni" },
  { value: "50+", label: "Paesi raggiunti" },
];
