# Agent Workplan

## 1. Strategia multi-agente

Il progetto e' predisposto per piu' agenti Codex che lavorano in parallelo su aree separate. Ogni agente deve rispettare la ownership dei file, evitare duplicazioni e mantenere i dati operativi in `/data`.

## 2. Agent 0 - Master / Architect

Responsabile di architettura, tipi condivisi, componenti base, regole di progetto, integrazione finale e coerenza generale.

## 3. Agent 1 - UI / Home Agent

Responsabile di home operativa, shell mobile, layout, navigazione visiva e uso dei componenti comuni.

## 4. Agent 2 - Data Agent

Responsabile dei dati locali JSON, normalizzazione dei contenuti approvati e coerenza con i tipi in `/lib/types.ts`.

## 5. Agent 3 - Infographic Agent

Responsabile della vista infografica interattiva mock e degli hotspot collegati ai dati.

## 6. Agent 4 - Map / Diorama Agent

Responsabile della mappa esterna mock e del diorama interno mock leggero. Non deve introdurre Google Maps reale o vero 3D pesante nella V1.

## 7. Agent 5 - Indoor Routing Agent

Responsabile della navigazione interna Punto A -> Punto B mock, usando nodi e rotte locali da `/data`.

## 8. Agent 6 - QA / Integration Agent

Responsabile di build, lint, typecheck, responsive mobile, accessibilita' essenziale, conflitti tra componenti e verifica delle regole privacy.

## 9. File ownership per ciascun agente

- Master / Architect: `/lib`, `/components/ui`, `/components/shell`, configurazioni root, README.
- UI / Home Agent: `/app`, `/components/shell`, componenti home futuri.
- Data Agent: `/data`, `/docs/extracted`.
- Infographic Agent: `/components/infographic`, dati hotspot collegati.
- Map / Diorama Agent: `/components/map`, `/components/diorama`, `/public/maps` con soli asset semplificati.
- Indoor Routing Agent: `/components/indoor-route`, `/data/indoorNodes.json`, `/data/indoorRoutes.json`.
- QA / Integration Agent: nessuna ownership esclusiva; apre fix mirati dopo verifica.

## 10. Regole per evitare conflitti

- Non duplicare componenti comuni.
- `InstructionDrawer` deve essere unico e riutilizzato.
- `BottomNav` deve essere unico e riutilizzato.
- Ogni agente deve lavorare solo sulle proprie cartelle assegnate.
- I testi lunghi non devono essere hardcoded nei componenti.
- I dati operativi devono stare in `/data`.
- Usare placeholder espliciti come "da definire" quando un dato manca.
- Non inserire PDF originali, documenti sensibili o planimetrie reali complete.

## 11. Ordine consigliato dei task

1. Agent 0 crea architettura, tipi e componenti base.
2. Agent 2 prepara dati mock coerenti.
3. Agent 1 costruisce home e shell.
4. Agent 3 implementa infografica mock.
5. Agent 4 implementa mappa e diorama mock.
6. Agent 5 implementa routing interno mock.
7. Agent 6 verifica e prepara integrazione.
8. Agent 0 integra e rifinisce.

## 12. Checklist prima del merge

- `npm run lint` passa.
- `npm run typecheck` passa.
- `npm run build` passa.
- La UI resta mobile-first.
- Bottom navigation sempre accessibile quando implementata.
- Emergenza sempre accessibile quando implementata.
- Nessun testo operativo lungo hardcoded nei componenti.
- Nessun PDF originale nel repository.
- Nessuna planimetria reale completa nel repository.
- Nessun PDF o planimetria originale in `/public`.
- Nessun dato personale non necessario.
- Google Maps reale non implementato nella V1.
- Vero 3D pesante non implementato nella V1.

## 13. Stato dopo Agent 0

### Componenti creati/consolidati

- `/components/ui/Button.tsx`
- `/components/ui/Card.tsx`
- `/components/ui/Badge.tsx`
- `/components/ui/Drawer.tsx`
- `/components/ui/Icon.tsx`
- `/components/shell/AppShell.tsx`
- `/components/shell/BottomNav.tsx`
- `/components/shell/Header.tsx`
- `/components/emergency/EmergencyBar.tsx`
- `/components/instructions/InstructionDrawer.tsx`
- `/components/instructions/InstructionSection.tsx`
- `/components/instructions/SourceBadge.tsx`

### Tipi disponibili

- `Instruction`
- `InstructionAction`
- `SourceReference`
- `Pass`
- `Contact`
- `Hotspot`
- `MapArea`
- `DioramaHotspot`
- `IndoorNode`
- `IndoorRoute`
- `AppRoute`
- `OperationalColor`

### Regole per gli agenti successivi

- Usare `/lib/types.ts` per i contratti dati condivisi.
- Usare `/lib/routes.ts` per route, label e voci di navigazione.
- Usare `/lib/constants.ts` e `styles/tokens.css` per colori e token.
- Importare i dati tramite `/lib/data.ts`; non importare JSON direttamente nei componenti se non c'e' un motivo locale e documentato.
- Mantenere i testi operativi lunghi in `/data` o `/docs/extracted`, non dentro i componenti.
- Usare `da definire` per dati mancanti o non confermati.
- Non pubblicare PDF originali, planimetrie reali complete o numeri telefonici non confermati.
- Non introdurre Google Maps reale, backend, autenticazione o 3D pesante nella V1.

### File che NON devono essere duplicati

- `/components/ui/Drawer.tsx`
- `/components/instructions/InstructionDrawer.tsx`
- `/components/shell/BottomNav.tsx`
- `/components/ui/Button.tsx`
- `/components/ui/Card.tsx`
- `/components/ui/Badge.tsx`
- `/components/ui/Icon.tsx`
- `/lib/routes.ts`
- `/lib/data.ts`
- `/lib/types.ts`

## 14. Stato dopo Agent 0B - Integrazione UI/Data/Infographic

### Cosa e' stato integrato

- Le modifiche di Agent 1, Agent 2 e Agent 3 risultano consolidate nello stesso working tree su `main`, senza branch o PR locali separati.
- La home operativa usa `HomeContent`, `AppShell`, `Header`, `EmergencyBar` e il `BottomNav` condiviso.
- L'infografica e' attiva su `/routes/infographic` e usa `InteractiveInfographic` con hotspot letti da `/data` tramite `/lib/data.ts`.
- `InstructionDrawer` resta il drawer unico per le schede operative e viene riutilizzato da home e infografica.

### Conflitti risolti o controllati

- `data/instructions.json` mantiene tutti i 30 record operativi del Data Agent.
- `data/hotspots.json` mantiene gli hotspot richiesti dall'Infographic Agent, inclusi i blocchi principali e gli hotspot secondari.
- Il collegamento "Palazzetto / Inalpi Arena" punta a `diorama-ingressi` e apre una scheda con azione `openDiorama`.
- Tutti gli hotspot referenziano instruction esistenti e rispettano la struttura richiesta da `/lib/types.ts`.

### Dati consolidati

- Instruction finali: 30.
- Hotspot finali: 23.
- Dati locali attivi: pass, contatti placeholder, hotspot infografica, map areas mock, diorama hotspot mock, nodi e rotte indoor mock.
- Numeri reali e dati sensibili restano esclusi; usare `da definire` o placeholder finche' non sono approvati.

### Componenti pronti

- `HomeContent` per la home operativa.
- `EmergencyBar` per l'accesso rapido emergenza.
- `InteractiveInfographic` per la vista infografica navigabile.
- `InstructionDrawer` come drawer operativo unico e riutilizzabile.
- Route placeholder coerenti per mappa, diorama, navigazione interna, emergenza e catena di comando.

### Vincoli per Agent 4 e Agent 5

- Agent 4 deve usare i dati esistenti in `/data/mapAreas.json`, `/data/dioramaHotspots.json` e le instruction collegate, senza introdurre Google Maps reale, planimetrie complete o 3D pesante.
- Agent 5 deve usare `/data/indoorNodes.json` e `/data/indoorRoutes.json` per una navigazione interna mock, senza pubblicare planimetrie reali complete.
- Entrambi devono importare dati da `/lib/data.ts`, rispettare `/lib/types.ts`, riusare `InstructionDrawer` e non duplicare shell, bottom navigation, drawer o componenti comuni.
