# Codex Launch Pack - Webapp Parcheggio Congresso 2026

## Scopo del documento

Questo documento serve come pacchetto operativo per avviare lo sviluppo su Codex della webapp mobile-first per il Reparto Parcheggio del congresso "Felici per sempre" 2026 presso Inalpi Arena, Torino.

Va usato insieme al documento:

- [Brief Master - Webapp Operativa Reparto Parcheggio](./brief-master.md)

Il Launch Pack definisce:

- struttura repository;
- ordine di sviluppo;
- prompt per Master Agent;
- prompt per agenti paralleli;
- gestione di PDF, planimetrie e dati;
- backlog V1;
- regole di coordinamento.

Nota importante: questo repository sara' pubblico. PDF originali, planimetrie reali complete e documenti sorgente non devono essere creati o pubblicati nel repository. Eventuali percorsi come `source-pdfs` o `floorplans` sono da intendere come aree locali/non versionate, oppure come riferimenti documentali esterni.

## 1. Strategia di sviluppo consigliata

### 1.1 Approccio generale

Lo sviluppo deve partire da una V1 navigabile e mock, non da una versione completa.

La V1 deve permettere di provare:

- home operativa;
- infografica interattiva;
- drawer dettagli;
- emergenza;
- mappa esterna stilizzata;
- diorama mock;
- navigazione interna A -> B simulata;
- catena di comando;
- dati locali JSON.

Non implementare subito:

- Google Maps reale;
- backend;
- autenticazione;
- routing interno avanzato;
- 3D reale pesante;
- gestione utenti.

### 1.2 Ordine corretto

1. Master Agent / Architect crea architettura base.
2. UI Agent implementa interfaccia principale.
3. Data Agent crea modelli e dati mock.
4. Infographic Agent implementa infografica interattiva.
5. Map & Diorama Agent implementa mappa mock e diorama mock.
6. Indoor Routing Agent implementa navigazione interna A -> B mock.
7. QA Agent verifica coerenza, responsive, accessibilita' e build.

## 2. Struttura repository consigliata

```text
parking-congresso-2026/
|- app/
|  |- layout.tsx
|  |- page.tsx
|  |- globals.css
|  `- routes/
|     |- infographic/
|     |- map/
|     |- diorama/
|     |- indoor-route/
|     |- command-chain/
|     `- emergency/
|
|- components/
|  |- shell/
|  |  |- AppShell.tsx
|  |  |- BottomNav.tsx
|  |  `- Header.tsx
|  |
|  |- ui/
|  |  |- Button.tsx
|  |  |- Card.tsx
|  |  |- Badge.tsx
|  |  |- Drawer.tsx
|  |  |- Icon.tsx
|  |  `- Tabs.tsx
|  |
|  |- emergency/
|  |  |- EmergencyBar.tsx
|  |  `- EmergencyPanel.tsx
|  |
|  |- instructions/
|  |  |- InstructionDrawer.tsx
|  |  |- InstructionSection.tsx
|  |  `- SourceBadge.tsx
|  |
|  |- infographic/
|  |  |- InteractiveInfographic.tsx
|  |  |- HotspotLayer.tsx
|  |  `- HotspotButton.tsx
|  |
|  |- map/
|  |  |- ExternalMapMock.tsx
|  |  |- MapMarker.tsx
|  |  `- MapLegend.tsx
|  |
|  |- diorama/
|  |  |- DioramaView.tsx
|  |  |- DioramaLayer.tsx
|  |  |- DioramaControls.tsx
|  |  `- DioramaHotspot.tsx
|  |
|  |- indoor-route/
|  |  |- IndoorRoutePlanner.tsx
|  |  |- IndoorPlanView.tsx
|  |  |- RouteSelector.tsx
|  |  `- RoutePath.tsx
|  |
|  `- command/
|     |- CommandChain.tsx
|     |- RoleCard.tsx
|     `- MyZoneCard.tsx
|
|- data/
|  |- instructions.json
|  |- passes.json
|  |- contacts.json
|  |- hotspots.json
|  |- mapAreas.json
|  |- dioramaHotspots.json
|  |- indoorNodes.json
|  `- indoorRoutes.json
|
|- docs/
|  |- brief-master.md
|  |- codex-launch-pack.md
|  |- source-manifest.md
|  |- extracted/
|  |  |- brochure-2026-extract.md
|  |  |- co-65-i-extract.md
|  |  `- dc-82-i-extract.md
|  `- reference/
|     `- README.md
|
|- public/
|  |- icons/
|  |- images/
|  |- maps/
|  `- app-icon.png
|
|- lib/
|  |- data.ts
|  |- routes.ts
|  |- constants.ts
|  `- types.ts
|
|- styles/
|  `- tokens.css
|
|- package.json
|- tsconfig.json
|- tailwind.config.ts
`- README.md
```

Percorsi intenzionalmente esclusi dalla struttura pubblica:

- `/docs/source-pdfs/`
- `/docs/floorplans/`
- `/docs/reference-images/`

Questi materiali possono esistere solo localmente, fuori Git, o in un archivio privato autorizzato. Non crearli nel repository pubblico.

## 3. Gestione PDF e planimetrie

### 3.1 PDF originali

I PDF originali non devono essere pubblicati nel repository. Se necessari per lavorare, conservarli solo in un'area locale non versionata o in un archivio privato autorizzato.

Non creare nel repository pubblico:

```text
/docs/source-pdfs/
```

### 3.2 Estratti markdown

Per lavorare meglio con Codex, creare estratti puliti in:

```text
/docs/extracted/
```

Esempi:

```text
/docs/extracted/brochure-2026-extract.md
/docs/extracted/co-65-i-extract.md
/docs/extracted/dc-82-i-extract.md
```

Questi file devono contenere solo le parti operative utili, gia' ripulite e pubblicabili.

### 3.3 Planimetrie reali

Le planimetrie originali e screenshot di riferimento non devono essere pubblicati nel repository. Possono essere usati solo come riferimenti locali/non versionati per produrre mappe stilizzate e dati minimizzati.

Non creare nel repository pubblico:

```text
/docs/floorplans/
```

### 3.4 Asset pubblici

Solo le versioni semplificate, ridisegnate o ottimizzate per la webapp devono andare in:

```text
/public/maps/
/public/images/
```

Regola: non mettere PDF sensibili, documenti sorgente o planimetrie originali in `/public`.

## 4. Regole comuni per tutti gli agenti

### 4.1 Regole architetturali

- Usare TypeScript.
- Usare componenti riutilizzabili.
- Non duplicare drawer, card, bottoni o logiche comuni.
- Tutte le istruzioni operative devono venire da `/data`.
- Non hardcodare testi lunghi direttamente nei componenti.
- Ogni schermata deve essere mobile-first.
- Ogni funzione importante deve funzionare bene su viewport 360-430 px.

### 4.2 Regole UX

- Emergenza sempre accessibile.
- Bottom navigation sempre presente nella V1.
- Ogni dettaglio deve rispondere a:
  - chi fa cosa;
  - chi va dove;
  - chi contatta chi.
- Massimo 2-3 tocchi per raggiungere un'informazione utile.
- Drawer dal basso per dettagli operativi.
- Testi brevi e azionabili.

### 4.3 Regole visuali

- Mood: congresso "Felici per sempre".
- Palette: verde scuro, avorio, salvia, grigi caldi.
- Colori funzionali:
  - rosso: P1 / emergenza;
  - viola: staff;
  - arancione: P2;
  - giallo: P3;
  - blu: bus / GPS;
  - verde: percorso / conferma.
- Icone: lineari, sobrie, stile JW Library / jw.org.
- Vietato usare emoji come icone operative.
- Evitare stile cartoon o datato.

### 4.4 Regole prestazioni

- Niente 3D pesante in V1.
- Diorama solo mock semi-3D leggero.
- Mappa esterna solo stilizzata in V1.
- Animazioni brevi e funzionali.
- Evitare dipendenze non necessarie.

## 5. Design tokens V1

```ts
export const colors = {
  greenDeep: '#0B332A',
  greenMain: '#123F34',
  sage: '#DDE8DA',
  ivory: '#F8F5EE',
  sand: '#EFE4D2',
  coral: '#D85D3B',
  red: '#D71920',
  purple: '#7B3FB3',
  orange: '#F47C20',
  yellow: '#FFD400',
  blue: '#0077C8',
  text: '#1D2A27',
  muted: '#5B625F',
};
```

## 6. Data model minimo

### 6.1 Instruction

```ts
export type Instruction = {
  id: string;
  title: string;
  category: string;
  color?: string;
  icon?: string;
  quickAnswer: string;
  whoDoesWhat: string[];
  whoGoesWhere: string[];
  whoContactsWhom: string[];
  fullInstruction?: string;
  actions?: InstructionAction[];
  source?: SourceReference[];
};

export type InstructionAction =
  | 'showOnMap'
  | 'routeTo'
  | 'call'
  | 'copyNumber'
  | 'openSource'
  | 'openDiorama';

export type SourceReference = {
  document: string;
  page?: string | number;
  note?: string;
};
```

### 6.2 Hotspot

```ts
export type Hotspot = {
  id: string;
  label: string;
  targetInstructionId: string;
  type: 'section' | 'pass' | 'map-area' | 'protocol' | 'equipment' | 'contact' | 'diorama';
  bounds?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};
```

### 6.3 Indoor node

```ts
export type IndoorNode = {
  id: string;
  label: string;
  level: string;
  x: number;
  y: number;
  type: 'entrance' | 'foyer' | 'sector' | 'stairs' | 'elevator' | 'service' | 'desk' | 'corridor';
  accessible?: boolean;
  instructionId?: string;
};
```

### 6.4 Indoor route

```ts
export type IndoorRoute = {
  id: string;
  from: string;
  to: string;
  nodeIds: string[];
  mode: 'fastest' | 'accessible' | 'avoid-stairs' | 'staff' | 'public';
  estimatedMinutes?: number;
};
```

## 7. Backlog V1

### Epic 1 - Setup progetto

- Creare progetto Next.js / React + TypeScript.
- Installare Tailwind CSS.
- Installare Framer Motion.
- Creare struttura cartelle.
- Creare design tokens.
- Creare README iniziale.

### Epic 2 - Shell mobile

- AppShell.
- Header.
- BottomNav.
- Layout max-width mobile.
- Safe area per smartphone.

### Epic 3 - Home operativa

- Titolo congresso.
- EmergencyBar.
- Quick actions:
  - Chi fa cosa;
  - Chi va dove;
  - Chi contatta chi.
- Accesso a infografica.
- Accesso a mappa.
- Accesso a diorama.
- Accesso a navigazione interna.

### Epic 4 - Emergency

- EmergencyPanel.
- Numeri dei referenti confermati prima della pubblicazione.
- Pulsanti `tel:` solo con numeri confermati e autorizzati.
- Cosa comunicare.
- Link posizione / mappa.

### Epic 5 - Instruction system

- InstructionDrawer.
- Sezioni standard:
  - risposta rapida;
  - chi fa cosa;
  - chi va dove;
  - chi contatta chi;
  - istruzione completa;
  - fonte.
- SourceBadge.

### Epic 6 - Infografica interattiva

- InteractiveInfographic mock.
- 6 hotspot principali.
- Hotspot secondari.
- Apertura InstructionDrawer.
- Collegamento a diorama dal palazzetto.

### Epic 7 - Mappa esterna mock

- Mappa stilizzata.
- Marker P1, P2, P3, Bus.
- Legenda.
- Pulsante "Apri istruzioni area".

### Epic 8 - Diorama mock

- Vista esterna arena.
- Exploded view mock.
- Layer interni.
- Hotspot ingressi / foyer / settori.
- Controlli:
  - apri struttura;
  - livelli;
  - etichette;
  - focus settore.

### Epic 9 - Navigazione interna A -> B

- Selettore punto A.
- Selettore punto B.
- Mappa interna mock.
- Linea percorso mock.
- Filtri:
  - piu' rapido;
  - accessibile;
  - evita scale.

### Epic 10 - Catena comando

- CommandChain.
- RoleCard.
- MyZoneCard mock.
- Flusso Uomo Chiave -> Capitano -> Usciere.

### Epic 11 - QA V1

- Build passa.
- TypeScript senza errori.
- Mobile responsive.
- Nessuna emoji nelle icone.
- Emergency sempre accessibile.
- Drawer riutilizzato.
- Dati da JSON, non hardcoded.

## 8. Prompt Master Agent / Architect

Usare questo prompt come primo task su Codex.

```text
Sei il Master Agent / Architect del progetto "Webapp Reparto Parcheggio - Congresso Felici per sempre 2026".

Obiettivo:
Creare la base tecnica di una webapp mobile-first operativa per volontari del reparto parcheggio presso Inalpi Arena Torino.

Stack:
- Next.js o React con TypeScript
- Tailwind CSS
- Framer Motion
- dati locali JSON

Crea la struttura del progetto, senza implementare ancora tutte le feature complesse.

Devi creare:
1. struttura cartelle coerente con il Codex Launch Pack
2. AppShell mobile-first
3. BottomNav sempre visibile
4. design tokens colore
5. tipi TypeScript principali
6. dati mock minimi in /data
7. componenti base:
   - Button
   - Card
   - Badge
   - Drawer
   - Icon
   - EmergencyBar
   - InstructionDrawer
8. pagine o viste placeholder per:
   - Home
   - Infografica
   - Mappa
   - Diorama
   - Navigazione interna
   - Catena comando
   - Emergenza
9. README con istruzioni per gli agenti successivi

Regole:
- mobile-first
- no emoji come icone
- icone lineari sobrie
- non usare Google Maps reale in V1
- non usare 3D reale pesante in V1
- contenuti operativi in JSON
- ogni istruzione deve supportare: risposta rapida, chi fa cosa, chi va dove, chi contatta chi, fonte

Output atteso:
- progetto compilabile
- struttura pulita
- README chiaro
- nessun errore TypeScript
```

## 9. Prompt UI Agent

```text
Sei UI Agent del progetto Webapp Reparto Parcheggio 2026.

Lavora sulla UI mobile-first usando i componenti creati dal Master Agent.

Implementa:
1. Home operativa rifinita
2. EmergencyBar in alto o card prioritaria
3. Quick action cards:
   - Chi fa cosa
   - Chi va dove
   - Chi contatta chi
4. accesso a:
   - Infografica interattiva
   - Mappa
   - Diorama
   - Navigazione interna A -> B
5. BottomNav coerente
6. drawer animato con Framer Motion

Stile:
- mood "Felici per sempre"
- verde scuro, avorio, salvia, grigi caldi
- icone lineari stile JW Library / jw.org
- niente emoji
- pulsanti grandi e leggibili

Non creare nuovi sistemi paralleli di card o drawer se esistono gia' componenti comuni.
```

## 10. Prompt Data Agent

```text
Sei Data Agent del progetto Webapp Reparto Parcheggio 2026.

Obiettivo:
Creare e organizzare i dati mock/locali della V1.

Crea o aggiorna:
- /data/instructions.json
- /data/passes.json
- /data/contacts.json
- /data/hotspots.json
- /data/mapAreas.json
- /data/dioramaHotspots.json
- /data/indoorNodes.json
- /data/indoorRoutes.json

Ogni instruction deve contenere:
- id
- title
- category
- quickAnswer
- whoDoesWhat
- whoGoesWhere
- whoContactsWhom
- fullInstruction
- actions
- source

Inserisci dati mock coerenti con il Brief Master:
- P1 Rosso
- P1 Viola
- P2 Combi
- P3 Sosta Breve
- Bus
- Caso 1
- Caso 2
- Caso 3
- Emergenza sanitaria
- Equipaggiamento
- Catena comando
- Diorama hotspot principali
- Navigazione interna mock

Non inventare dettagli non confermati come nomi di responsabili diversi da Mirko Macario e Lorenzo Garino.
Se manca un dato, usa placeholder esplicito: "da definire".
Non inserire numeri telefonici finche' non sono confermati come pubblicabili.
```

## 11. Prompt Infographic Agent

```text
Sei Infographic Agent del progetto Webapp Reparto Parcheggio 2026.

Obiettivo:
Implementare la vista "Infografica interattiva".

La schermata deve mostrare una rappresentazione mock dell'infografica con 6 aree cliccabili:
1. Pass e codici colore
2. Mappa rapida aree
3. Protocollo accesso
4. Equipaggiamento
5. Contatti emergenza
6. Note operative Retro Inalpi

Ogni area deve aprire InstructionDrawer o una lista di hotspot secondari.

Hotspot secondari richiesti:
- P1 Rosso
- P1 Viola
- P2 Combi
- P3 Giallo
- Bus
- Caso 1
- Caso 2
- Caso 3
- Casacca
- Distintivo
- Borraccia
- Cappellino
- Ombrello
- Cellulare
- Mirko Macario
- Lorenzo Garino
- Area Retro Inalpi
- Palazzetto / Inalpi Arena -> apre Diorama

Usa dati da /data/hotspots.json e /data/instructions.json.
Non hardcodare testi lunghi nel componente.
Non inserire numeri telefonici finche' non sono confermati come pubblicabili.
```

## 12. Prompt Map & Diorama Agent

```text
Sei Map & Diorama Agent del progetto Webapp Reparto Parcheggio 2026.

Obiettivo:
Implementare due viste mock:
1. Mappa esterna operativa
2. Diorama interno mock dell'Inalpi Arena

Mappa esterna:
- mostra area stilizzata
- marker P1, P2, P3, Bus
- legenda colori
- pulsante "Apri istruzioni area"
- nessuna integrazione Google Maps reale in V1

Diorama:
- vista esterna arena
- pulsante "Apri struttura"
- exploded view mock
- layer interni: parterre, tribune, foyer, balconate
- hotspot cliccabili
- controlli: livelli, etichette, focus settore
- stile semi-3D leggero, non Three.js

Usa CSS transform, SVG o div layerizzati.
Non implementare vero 3D pesante.
Usa dati da /data/dioramaHotspots.json.
Non usare o pubblicare planimetrie reali complete.
```

## 13. Prompt Indoor Routing Agent

```text
Sei Indoor Routing Agent del progetto Webapp Reparto Parcheggio 2026.

Obiettivo:
Implementare la navigazione interna Punto A -> Punto B mock.

Funzioni richieste:
- selezione Punto A
- selezione Punto B
- opzione "usa la mia posizione" come placeholder
- scelta da lista di nodi interni
- mappa/planimetria mock
- linea percorso tra nodi
- filtri:
  - piu' rapido
  - accessibile
  - evita scale
  - staff
  - pubblico

Usa dati da:
- /data/indoorNodes.json
- /data/indoorRoutes.json

Non implementare geolocalizzazione interna reale.
Non inventare coordinate reali definitive: usa coordinate mock e lascia commenti "da calibrare su planimetria reale".
Non pubblicare planimetrie reali complete.
```

## 14. Prompt QA Agent

```text
Sei QA Agent del progetto Webapp Reparto Parcheggio 2026.

Controlla:
1. build TypeScript
2. lint
3. responsive mobile 360-430 px
4. bottom nav sempre visibile
5. emergenza sempre accessibile
6. nessuna emoji usata come icona operativa
7. drawer unico riutilizzato
8. dati operativi presi da /data
9. testi placeholder chiaramente indicati come "da definire"
10. nessun PDF o planimetria originale in /public
11. nessun PDF originale, documento sorgente o planimetria reale completa nel repository pubblico
12. nessuna integrazione Google Maps reale nella V1
13. nessun 3D pesante nella V1

Produci una lista di bug e una lista di miglioramenti prioritari.
```

## 15. Sequenza pratica su Codex

### Passo 1

Lancia solo il Master Agent.

Obiettivo: repo compilabile, struttura e componenti base.

### Passo 2

Dopo che il Master Agent ha finito, lancia in parallelo:

- UI Agent;
- Data Agent;
- Infographic Agent.

### Passo 3

Poi lancia:

- Map & Diorama Agent;
- Indoor Routing Agent.

### Passo 4

Infine:

- QA Agent;
- poi Master Agent per integrazione finale.

## 16. Checklist prima dello sviluppo

Prima di passare allo sviluppo, preparare:

- repository GitHub configurato secondo la policy di pubblicazione scelta;
- `brief-master.md` in `/docs`;
- `codex-launch-pack.md` in `/docs`;
- estratti markdown pubblicabili in `/docs/extracted/`;
- README iniziale, anche minimale;
- eventuali PDF originali solo in area locale/non versionata o archivio privato autorizzato;
- eventuali planimetrie e screenshot solo in area locale/non versionata o archivio privato autorizzato.

## 17. Nota finale

La priorita' non e' creare subito l'app definitiva.

La priorita' e' creare una V1 mobile navigabile, utile per validare:

- struttura;
- flussi;
- rapidita';
- coerenza grafica;
- diorama mock;
- navigazione interna mock;
- sistema dati.

Solo dopo la validazione della V1 si passa a:

- Google Maps reale;
- PWA offline;
- diorama piu' avanzato;
- navigazione interna piu' precisa;
- contenuti definitivi e verificati.

