export interface Service {
  id: string;
  title: string;
  headline: string;
  description: string;
  outcomes: string[];
  icon: string;
}

export const services: Service[] = [
  {
    id: "performance-marketing",
    title: "Performance Marketing",
    headline: "Più risultati, meno sprechi",
    description:
      "Gestiamo le tue campagne con un approccio ossessivo verso i numeri che contano. ROAS, CAC, LTV: ogni euro investito deve generare valore misurabile.",
    outcomes: [
      "Scaling campagne in 50+ paesi",
      "ROAS medio del 350%",
      "Riduzione CAC fino al 40%",
    ],
    icon: "📈",
  },
  {
    id: "martech-analytics",
    title: "Martech & Analytics",
    headline: "I tuoi dati, finalmente utili",
    description:
      "Connettiamo i puntini tra i tuoi tool. CRM, analytics, automazioni: costruiamo l'infrastruttura che trasforma i dati grezzi in decisioni che fanno crescere il business.",
    outcomes: [
      "Dashboard che parlano chiaro",
      "Automazioni che lavorano 24/7",
      "Integrazione completa del tuo stack",
    ],
    icon: "⚡",
  },
  {
    id: "creative-design",
    title: "Creative & Design",
    headline: "Creatività che converte",
    description:
      "Non facciamo cose belle. Facciamo cose belle che funzionano. Ogni asset è pensato per catturare attenzione, comunicare valore e spingere all'azione.",
    outcomes: [
      "Da concept a produzione in giorni",
      "Varianti creative scalabili con AI",
      "UX data-driven",
    ],
    icon: "🎨",
  },
  {
    id: "sviluppo-ai",
    title: "Sviluppo & AI Systems",
    headline: "Tecnologia che ti fa andare più veloce",
    description:
      "Siti, app, e-commerce, sistemi AI custom. Costruiamo le soluzioni digitali che il tuo business ha bisogno per competere. Veloci, scalabili, intelligenti.",
    outcomes: [
      "Da zero a MVP in settimane",
      "Sistemi AI integrati nel tuo workflow",
      "Architetture pronte a scalare",
    ],
    icon: "🛠",
  },
];

export const aiAreas = [
  {
    title: "Automazione AI",
    description:
      "Il tuo team fa ancora attività ripetitive? Le automatizziamo con AI, dalla gestione campagne all'analisi dati. Meno lavoro manuale, più strategia.",
  },
  {
    title: "Sistemi Agentici",
    description:
      "Agenti AI che lavorano per te, 24/7. Customer care, gestione lead, analisi competitor: sistemi intelligenti che si integrano nei tuoi processi esistenti.",
  },
  {
    title: "SaaS & Prodotti AI",
    description:
      "Costruiamo prodotti AI verticali: dal cold email generator che scrive email 1-to-1 impossibili da ignorare, agli agenti RAG che rispondono ai tuoi clienti con la tua knowledge base.",
  },
  {
    title: "AI Content & Vision",
    description:
      "Modelli LoRA per shooting virtuali e immagini contestualizzate. Heatmap predittive. Analisi immagini con modelli locali. Contenuti che nessun competitor può replicare.",
  },
];
