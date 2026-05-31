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

## 15. Stato dopo Agent 6 - Indoor Mapping Architecture

### Obiettivo completato

- La navigazione interna passa da mock statico a modello dati indoor derivato e controllato.
- La schermata `/routes/indoor-route` usa livelli, aree SVG cliccabili, nodi, archi e calcolo percorso su grafo.
- Non sono stati aggiunti PDF originali, immagini raw di planimetrie, Google Maps, numeri telefonici o 3D pesante.

### Tipi aggiunti o consolidati

- `IndoorFloor`
- `IndoorArea`
- `IndoorNode`
- `IndoorEdge`
- `IndoorRoute`
- `DioramaLayer`
- `IndoorAccessLevel`

### Dati indoor creati

- `/data/indoorFloors.json`: livelli L0 e L+1 con viewBox e riferimento sorgente derivato.
- `/data/indoorAreas.json`: perimetro, cavea, parterre, tribune, foyer, balconate, corridoi, accessi staff, suites e collegamenti verticali.
- `/data/indoorNodes.json`: nodi selezionabili e nodi tecnici per il grafo indoor.
- `/data/indoorEdges.json`: archi pesati con access level, staff only e accessibilita'.
- `/data/indoorRoutes.json`: rotte seed di controllo, affiancate al calcolo live su grafo.

### Componenti e routing

- `/components/indoor-map/IndoorMapSvg.tsx` renderizza la planimetria SVG da JSON/TypeScript.
- `/components/indoor-map/FloorSelector.tsx` gestisce cambio livello.
- `/components/indoor-map/AreaDetailDrawer.tsx` mostra dettaglio area e nodi collegati.
- `/components/indoor-route/routeGraph.ts` implementa Dijkstra pesato.
- `/components/indoor-route/IndoorRoutePlanner.tsx` coordina selettori, mappa, drawer e card percorso.

### Regole del routing

- Input: `startNodeId`, `endNodeId`, `mode`.
- Output: nodi ordinati, archi usati, distanza e tempo stimato.
- `public` esclude staff-only e hospitality.
- `staff` puo' usare archi staff-only.
- `accessible` e `avoid-stairs` escludono scale e archi non accessibili.
- `fastest` usa tutti gli archi pubblici compatibili e pesa leggermente meglio le scale.

### Preparazione al diorama esploso

- Ogni area puo' puntare a `dioramaLayerId`.
- I dati area/floor sono indipendenti dalla UI e possono alimentare una futura vista esplosa.
- Manca ancora un file dati dedicato ai `DioramaLayer` indoor e una vista 3D/2.5D ruotabile; questa fase ha solo predisposto i riferimenti.

## 16. Base indoor mapping pronta per Agent 5

Questa sezione e' la consegna operativa per Agent 5. L'obiettivo e' riusare la base dati indoor esistente per routing avanzato, diorama esploso e animazioni leggere, senza duplicare modello dati, componenti comuni o logica di calcolo percorso.

### Nuovi file dati creati

- `/data/indoorFloors.json`: catalogo dei livelli indoor. Ogni record descrive un piano con `id`, `name`, `level`, `label`, `sourceReference`, `viewBox` e `sortOrder`.
- `/data/indoorAreas.json`: aree SVG semplificate e controllate. Ogni record collega un'area a un piano tramite `floorId`, contiene `svgPath`, posizione label, tipo area, accesso, colore, nodi collegati, eventuale `instructionId` ed eventuale `dioramaLayerId`.
- `/data/indoorNodes.json`: nodi del grafo indoor. Ogni nodo ha coordinate nello stesso `viewBox` del piano, appartiene a un `floorId`, puo' puntare a una `areaId` ed espone flag per selezione come partenza o destinazione.
- `/data/indoorEdges.json`: archi pesati tra nodi. Ogni arco contiene `fromNodeId`, `toNodeId`, `distance`, `mode`, `accessLevel`, `isAccessible`, `isStaffOnly` ed eventuale testo `via`.
- `/data/indoorRoutes.json`: rotte seed di controllo. Non sostituiscono il grafo live; servono come percorsi noti/validati per confronto, QA e stati iniziali.

### Tipi aggiunti o consolidati in `/lib/types.ts`

- `IndoorFloor`: livello/piano indoor con viewBox SVG e riferimento sorgente derivato.
- `IndoorArea`: area cliccabile, semplificata e collegabile a instruction e diorama layer.
- `IndoorNode`: nodo navigabile o tecnico, con coordinate per rendering SVG e grafo.
- `IndoorEdge`: segmento del grafo con peso, accessibilita', modalita' e regole staff.
- `IndoorRoute`: rotta seed o validata con lista ordinata di `nodeIds`, modalita', tempo stimato e descrizione.
- `DioramaLayer`: contratto gia' pronto per futura esplosione/rotazione, con `defaultTransform`, `explodedTransform`, `isExplodable` e `isRotatable`.
- `IndoorAccessLevel`: livelli di accesso `public`, `staff`, `restricted`, `hospitality`.

### Struttura dati da rispettare

- Floors sono il contenitore visivo primario: Agent 5 deve partire da `indoorFloors`, ordinare per `sortOrder` e usare `viewBox` come sistema coordinate.
- Areas sono la sorgente per layer visivi e future parti esplodibili: non ricostruire sagome in componenti; usare `svgPath`, `labelPosition`, `colorToken`, `connectedNodeIds` e `dioramaLayerId`.
- Nodes sono i punti di calcolo e interazione: le coordinate `x` e `y` sono nel sistema del piano, non percentuali; la selezionabilita' passa dai flag `isSelectableAsStart` e `isSelectableAsDestination`.
- Edges sono l'unica sorgente per il routing live: non creare liste hardcoded di adiacenze nei componenti; aggiornare o estendere `/data/indoorEdges.json`.
- Routes sono seed controllate: usarle per QA, fallback descrittivi o confronto con percorsi noti, non come unico motore di navigazione.

### Componenti pronti da riusare

- `/components/indoor-map/IndoorMapSvg.tsx`: rendering SVG data-driven di piano, aree, nodi e polyline percorso.
- `/components/indoor-map/FloorSelector.tsx`: cambio livello responsive.
- `/components/indoor-map/AreaDetailDrawer.tsx`: dettaglio area, access level e nodi collegati.
- `/components/indoor-route/RouteSelector.tsx`: selezione Punto A, Punto B e modalita' percorso.
- `/components/indoor-route/routeGraph.ts`: calcolo percorso con Dijkstra pesato e helper polyline.
- `/components/indoor-route/IndoorRoutePlanner.tsx`: orchestrazione della pagina indoor route.
- `/app/routes/indoor-route/page.tsx`: route gia' collegata a `appData` da `/lib/data.ts`.

### Come Agent 5 deve riusarli per diorama esploso e animazioni

- Creare eventuale dataset indoor diorama separato solo se serve, ad esempio `/data/indoorDioramaLayers.json`, usando il tipo `DioramaLayer`.
- Collegare i layer del diorama agli `IndoorArea.dioramaLayerId` gia' presenti, invece di creare nuovi id area paralleli.
- Usare `DioramaLayer.areaIds` nei layer per aggregare foyer, tribune, balconate, suites e collegamenti verticali in sezioni esplodibili.
- Le animazioni devono leggere `defaultTransform` ed `explodedTransform` dai dati del layer, non da valori sparsi nei componenti.
- Per una prima fase, preferire SVG/2.5D con transform CSS o SVG group transforms. Non introdurre Three.js finche' non serve davvero una scena 3D ruotabile.
- Se viene aggiunta una vista ruotabile, deve continuare a consumare gli stessi `floors`, `areas`, `nodes`, `edges` e `routes`, lasciando `routeGraph.ts` come unica logica di calcolo percorso.
- Le evidenziazioni route/area nel diorama devono usare `nodeIds`, `areaId` e `dioramaLayerId` esistenti, cosi' la selezione resta coerente tra mappa piatta e vista esplosa.

### Cosa Agent 5 NON deve duplicare

- Non duplicare tipi indoor in nuovi file locali: usare `/lib/types.ts`.
- Non importare JSON direttamente nei componenti di pagina se i dati sono gia' esposti da `/lib/data.ts`.
- Non creare un secondo motore routing: estendere `/components/indoor-route/routeGraph.ts`.
- Non creare un secondo selettore Punto A/Punto B se `RouteSelector` basta o puo' essere esteso.
- Non creare una seconda mappa SVG hardcoded: estendere `IndoorMapSvg` o creare un wrapper che consumi gli stessi dati.
- Non duplicare `InstructionDrawer`, `AreaDetailDrawer`, `BottomNav`, `AppShell`, `Button`, `Badge`, `Card` o `Icon`.
- Non introdurre PDF originali, planimetrie raw, numeri telefonici reali, dati sensibili, Google Maps o 3D pesante nella fase successiva senza approvazione esplicita.
- Non usare id alternativi per gli stessi luoghi: se manca un luogo, aggiungerlo ai dataset indoor esistenti mantenendo riferimenti stabili.

### Estensioni consigliate per Agent 5

- Aggiungere `indoorDioramaLayers.json` con layer per shell, anelli, foyer, parterre, tribune, balconate, suites e vertical links.
- Introdurre stato condiviso tra mappa e diorama: `selectedAreaId`, `activeFloorId`, `routeNodeIds`.
- Aggiungere animazioni leggere di esplosione/ricomposizione tramite transform su gruppi SVG.
- Aggiungere test/QA su almeno tre percorsi: pubblico L0, accessibile L0 -> L+1 via ascensori, staff con arco staff-only.
- Mantenere documentata ogni nuova area o nodo con sorgente derivata e descrizione non sensibile.
