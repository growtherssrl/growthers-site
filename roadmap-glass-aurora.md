# Roadmap — Effetto Glass + Aurora

## Il concetto

Due livelli che lavorano insieme:
1. **Aurora** — Sfondo vivo con blob gradient animati (già abbiamo `AuroraGlow` + `AnimatedGrid`)
2. **Glass** — Card e contenitori con `backdrop-filter: blur()`, background semi-trasparente, bordi luminosi sottili. Il contenuto "galleggia" sopra l'aurora, creando profondità.

L'effetto glass funziona SOLO quando c'è qualcosa di visivamente ricco dietro (aurora, gradient, grid). Su sfondo piatto nero, il glass non si vede. Quindi le due cose vanno sempre accoppiate.

---

## Dove applicarlo (per pagina)

### HOME

| Sezione | Aurora/Background | Glass | Note |
|---------|------------------|-------|------|
| **Hero** | ✅ Già attivo (AnimatedGrid + AuroraGlow) | ❌ Non serve — il testo è protagonista | L'hero funziona già, non aggiungere glass |
| **Clients marquee** | ❌ Resta pulito | ❌ | Sezione di servizio, non decorarla |
| **Services** | ✅ Aurora sottile dietro la griglia | ✅ Le 4 card diventano glass | Sostituire BorderGlow con glass card + aurora dietro. Il glow resta on hover. |
| **Results** | ✅ Aurora accent (viola/verde) nella sezione raised | ✅ Le 3 card risultati diventano glass | I numeri gradient risaltano di più su glass |
| **CTA** | ✅ Aurora calda (arancio) dietro il form | ✅ Il form container diventa glass card | Crea focus sul form, effetto premium |

### SERVIZI (/servizi)

| Sezione | Aurora | Glass | Note |
|---------|-------|-------|------|
| **Hero** | ✅ Aurora leggera | ❌ | Solo testo, come home hero |
| **Service blocks** | ✅ Aurora che cambia colore per ogni servizio (arancio→viola→verde→neutro) | ✅ Il blocco "Quello che ottieni" per ogni servizio in glass card | L'aurora di sfondo shifta tonalità per ogni servizio, creando sezioni visivamente distinte |
| **CTA bottom** | ✅ | ✅ | Come home |

### AI & INNOVATION (/ai-innovation)

| Sezione | Aurora | Glass | Note |
|---------|-------|-------|------|
| **Hero** | ✅ Aurora intensa — questa è la pagina wow | ❌ | Testo protagonista |
| **Stats bar** | ❌ | ✅ Ogni stat in un piccolo glass container | Numeri che galleggiano |
| **AI Areas** | ✅ Aurora calda sottile | ✅ Ogni area in glass card con bordo glow | Le 4 aree diventano card glass interattive |
| **AI Products** | ✅ Aurora multi-color (cambia per prodotto) | ✅✅ Ogni prodotto in glass card prominente | Sezione chiave — il glass qui deve essere al massimo. Card grandi, bordi luminosi, backdrop-blur forte. L'aurora dietro dà vita. |
| **Tech Stack marquee** | ❌ | ✅ Ogni tool badge in micro glass chip | Badge piccoli semi-trasparenti |
| **Value Props** | ❌ Sfondo raised | ❌ | Sezione di testo, resta pulita |
| **CTA** | ✅ | ✅ | Come home |

### CASE STUDY (/case-study)

| Sezione | Aurora | Glass | Note |
|---------|-------|-------|------|
| **Hero + Stats** | ✅ Aurora leggera | ✅ I 4 stat in glass chips inline | Stats che galleggiano |
| **Filter bar** | ❌ | ✅ I filtri diventano glass chips | Sottile, funzionale |
| **Case study grid** | ✅ Aurora sottilissima | ✅ Ogni card case study in glass | Con BorderGlow on hover + glass base. Il gradient bar top risalta sul glass. |
| **CTA** | ✅ | ✅ | Come home |

### ABOUT (/about)

| Sezione | Aurora | Glass | Note |
|---------|-------|-------|------|
| **Hero** | ✅ Aurora calda | ❌ | Testo |
| **Team grid** | ❌ Sfondo raised | ✅ Ogni member card in glass | Avatar + nome su card glass. Effetto "team che emerge". |
| **DNA pillars** | ✅ Aurora viola | ✅ I 3 pillar in glass card grandi | Sezione statement, il glass dà importanza |
| **Partnership** | ❌ | ✅ Ogni partner in glass badge | Sottile |

### BLOG (/blog)

| Sezione | Aurora | Glass | Note |
|---------|-------|-------|------|
| **Coming soon card** | ✅ Aurora leggera | ✅ La card placeholder in glass | Per quando sarà live: ogni post card in glass |

---

## Specifiche tecniche Glass

### Glass Card (standard)
```css
background: rgba(255, 255, 255, 0.04);
backdrop-filter: blur(16px);
-webkit-backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 16px;
```

### Glass Card (prominente — per prodotti AI, DNA)
```css
background: rgba(255, 255, 255, 0.06);
backdrop-filter: blur(24px);
-webkit-backdrop-filter: blur(24px);
border: 1px solid rgba(255, 255, 255, 0.12);
border-radius: 20px;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
```

### Glass Chip (per badge, tag, filtri)
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(8px);
border: 1px solid rgba(255, 255, 255, 0.06);
border-radius: 999px;
```

### Hover state (tutte le varianti)
```css
/* On hover */
background: rgba(255, 255, 255, 0.07);
border-color: rgba(255, 255, 255, 0.15);
transform: translateY(-2px);
box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
```

---

## Combinazione Glass + BorderGlow

Il glass e il BorderGlow di React Bits non si escludono — si sommano:
- **Base:** Glass card (trasparente, blur, bordo sottile)
- **Hover:** BorderGlow si attiva (glow colorato che segue il cursore)
- **Aurora dietro:** Dà il "contenuto" al blur del glass

L'ordine dei layer:
1. Aurora (z-0) — blob animati
2. Glass card (z-10) — backdrop-filter cattura l'aurora
3. BorderGlow (wrappa la glass card) — aggiunge il glow interattivo
4. Contenuto (z-20) — testo, numeri, badge

---

## Priorità di implementazione

### Fase 1 — Impatto massimo (Home)
1. Services cards → glass + aurora
2. Results cards → glass + aurora
3. CTA form → glass + aurora

### Fase 2 — Pagina hero (AI & Innovation)
4. AI Products cards → glass prominente + aurora multi-color
5. AI Areas → glass standard + aurora
6. Stats → glass chips

### Fase 3 — Pagine interne
7. Case Study cards → glass + BorderGlow
8. About team + DNA → glass
9. Servizi detail blocks → glass

### Fase 4 — Polish
10. Glass chips per tag/filtri ovunque
11. Fine-tuning opacità e blur per sezione
12. Performance check (backdrop-filter è pesante su mobile — serve fallback)

---

## Note performance

- `backdrop-filter: blur()` è GPU-intensive. Su mobile con tante card, può laggare.
- **Fallback mobile:** ridurre il blur a 8px o rimuoverlo, aumentare l'opacità del background a 0.08-0.10.
- **Limitare le aurora:** max 2-3 blob per sezione visibile.
- **will-change: transform** sulle card glass per promuovere a GPU layer.
- Testare su Safari (ha storicamente problemi con backdrop-filter).
