# parking-congresso-2026

Workspace repository-ready per una webapp mobile-first React/Next.js destinata ai volontari del Reparto Parcheggio del congresso "Felici per sempre" 2026 presso Inalpi Arena Torino.

Il progetto e' predisposto per GitHub, GitHub Codespaces e sviluppo multi-agente con Codex. Per ora contiene solo la base tecnica, documentale e dati mock minimi.

## Scopo del progetto

La webapp finale dovra' aiutare i volontari a consultare rapidamente istruzioni operative, contatti, aree, procedure e percorsi durante il servizio sul campo.

La V1 sara' un prototipo mobile navigabile con dati locali JSON in `/data`. L'app non deve leggere PDF direttamente.

## Avvio locale

```bash
npm install
npm run dev
```

Poi aprire:

```text
http://localhost:3000
```

Comandi disponibili:

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm audit --omit=dev
```

Prima di consegnare una modifica, eseguire almeno:

```bash
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev
```

## GitHub Codespaces

1. Aprire il repository su GitHub.
2. Avviare un nuovo Codespace.
3. Attendere l'installazione delle dipendenze.
4. Eseguire `npm run dev`.
5. Aprire la porta 3000 esposta da Codespaces.

La configurazione e' in `.devcontainer/devcontainer.json`.

## Struttura cartelle

- `/app`: App Router Next.js e pagina iniziale minimale.
- `/components`: componenti React divisi per area di responsabilita'.
- `/components/shell`: shell applicativa, header e navigazione.
- `/components/ui`: componenti base condivisi.
- `/components/emergency`: componenti emergenza.
- `/components/instructions`: drawer e sezioni istruzioni.
- `/components/infographic`: infografica interattiva mock.
- `/components/map`: mappa esterna mock.
- `/components/diorama`: diorama interno mock leggero.
- `/components/indoor-route`: navigazione interna mock.
- `/components/command`: catena di comando.
- `/data`: dati JSON locali usati dall'app.
- `/docs`: documentazione di progetto.
- `/docs/extracted`: estratti puliti e pubblicabili.
- `/docs/reference`: note sui riferimenti non pubblicabili.
- `/lib`: tipi, costanti, routing e loader dati.
- `/public`: asset pubblici non sensibili.
- `/styles`: design tokens CSS.

## Regole privacy e sicurezza

- Il repository e' pubblico: non inserire informazioni riservate, non necessarie o non approvate.
- Non creare cartelle con PDF originali.
- Non pubblicare PDF originali, documenti sorgente o allegati operativi completi.
- Non pubblicare planimetrie reali complete.
- Non inserire dati personali non necessari.
- Non mettere PDF o planimetrie originali in `/public`.
- Usare placeholder espliciti come "da definire" quando manca un dato.
- L'app finale deve usare dati JSON in `/data`, non leggere PDF direttamente.

## Cosa fare nella V1

- Creare una UI mobile-first navigabile.
- Usare Next.js, TypeScript, Tailwind CSS e Framer Motion.
- Usare dati locali JSON in `/data`.
- Predisporre home operativa, infografica, mappa, diorama mock, navigazione interna mock, emergenza e catena di comando.
- Usare componenti comuni riutilizzabili.
- Verificare build, lint, typecheck e responsive mobile.

## Cosa NON fare nella V1

- Non implementare Google Maps reale.
- Non implementare vero 3D pesante.
- Non aggiungere backend.
- Non aggiungere autenticazione.
- Non usare PDF come sorgente letta direttamente dall'app.
- Non hardcodare testi operativi lunghi nei componenti.
- Non duplicare `InstructionDrawer` o `BottomNav`.

## Flusso di lavoro multi-agente

Il piano operativo e' in [docs/agent-workplan.md](./docs/agent-workplan.md).

Regole principali:

- Il Master Agent crea architettura, tipi, componenti base e regole.
- Ogni agente lavora solo sulle proprie cartelle assegnate.
- Gli agenti non duplicano componenti comuni.
- I dati operativi stanno in `/data`.
- Il QA Agent verifica integrazione, responsive, build e conflitti prima del merge.

Regole sintetiche per agenti paralleli:

- Importare componenti comuni da `/components/ui`, `/components/shell`, `/components/emergency` e `/components/instructions`.
- Non creare drawer alternativi: usare `/components/ui/Drawer.tsx` e `/components/instructions/InstructionDrawer.tsx`.
- Non creare bottom navigation alternative: usare `/components/shell/BottomNav.tsx`.
- Centralizzare route in `/lib/routes.ts`, tipi in `/lib/types.ts`, colori in `/lib/constants.ts` e `styles/tokens.css`.
- Importare dati tipizzati da `/lib/data.ts`.
- Non hardcodare testi operativi lunghi nei componenti.
- Usare sempre placeholder espliciti `da definire` per dati non approvati.
- Non inserire numeri telefonici in chiaro finche' non sono confermati come pubblicabili.
