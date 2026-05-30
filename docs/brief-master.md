# Brief Master - Webapp Operativa Reparto Parcheggio

## Congresso "Felici per sempre" 2026 - Inalpi Arena, Torino

Questo documento raccoglie il brief operativo rielaborato per la futura webapp mobile-first del Reparto Parcheggio.

Nota repository pubblico: non inserire PDF originali, planimetrie reali complete, documenti sorgente o dati personali non necessari. I contatti personali devono essere pubblicati solo dopo conferma esplicita.

## 1. Obiettivo del progetto

Realizzare una webapp mobile-first destinata ai volontari del reparto parcheggio del congresso "Felici per sempre" 2026 presso l'Inalpi Arena di Torino.

La webapp deve essere uno strumento operativo rapido, consultabile da smartphone durante il servizio sul campo, per aiutare i volontari a capire immediatamente:

- chi deve fare cosa;
- chi deve andare dove;
- chi deve contattare chi;
- quale procedura applicare in caso di dubbio, emergenza o gestione accessi.

La webapp non deve essere solo informativa, ma deve funzionare come guida pratica da campo, con livelli di dettaglio progressivi:

1. sintesi immediata;
2. scheda operativa;
3. istruzione completa;
4. collegamento alla fonte ufficiale.

## 2. Utenti principali

### Volontari reparto parcheggio

Utenti principali. Devono consultare rapidamente istruzioni, mappe, contatti e procedure anche mentre sono in servizio.

### Capitani / responsabili di zona

Devono usare la webapp per coordinare il servizio, indicare dove mandare i volontari e verificare procedure condivise.

### Uomo Chiave / coordinamento generale

Deve avere una visione chiara delle aree, dei flussi, dei contatti e delle responsabilita'.

## 3. Principi guida UX

### Mobile-first reale

La webapp deve essere progettata prima di tutto per smartphone. I pulsanti devono essere grandi, leggibili e utilizzabili con una mano.

### Massimo 2-3 tocchi per l'informazione utile

L'utente deve raggiungere rapidamente:

- emergenza;
- pass e accessi;
- area di destinazione;
- contatti;
- procedura corretta.

### Gerarchia a livelli

Ogni informazione deve essere organizzata cosi':

1. Risposta rapida;
2. Chi fa cosa;
3. Chi va dove;
4. Chi contatta chi;
5. Istruzione completa;
6. Fonte PDF / riferimento ufficiale.

### Linguaggio operativo

Testi brevi, chiari, autorevoli ma incoraggianti. Evitare formulazioni ambigue. Ogni scheda deve dire cosa fare concretamente.

## 4. Moduli principali della webapp

La V1 della webapp deve includere:

1. Home operativa;
2. Infografica interattiva;
3. Schede dettaglio istruzione;
4. Mappa esterna / logistica parcheggi;
5. Diorama interno Inalpi Arena;
6. Navigazione interna Punto A -> Punto B;
7. Catena di comando;
8. Emergenze e contatti rapidi;
9. Ricerca rapida.

## 5. Schermate previste

### 5.1 Home operativa

Obiettivo: essere la schermata iniziale per il volontario sul campo.

Contenuti principali:

- titolo: "Felici per sempre 2026";
- sottotitolo: "Reparto Parcheggio - Inalpi Arena Torino";
- pulsante emergenza sempre evidente;
- accessi rapidi: "Chi fa cosa", "Chi va dove", "Chi contatta chi";
- accesso a infografica interattiva, mappa live, diorama interno, navigazione interna e contatti.

Interazioni:

- tap su emergenza -> schermata emergenza;
- tap su "Chi fa cosa" -> elenco ruoli e procedure;
- tap su "Chi va dove" -> mappa aree / pass / destinazioni;
- tap su "Chi contatta chi" -> catena comando e contatti;
- tap su infografica -> vista infografica tappabile;
- tap su diorama -> vista interna arena.

### 5.2 Infografica interattiva

Obiettivo: trasformare l'infografica operativa in una schermata navigabile con aree cliccabili.

Hotspot principali:

1. Identificazione pass e codici colore;
2. Mappa rapida delle aree;
3. Protocollo di accesso;
4. Equipaggiamento obbligatorio e sicurezza;
5. Contatti di emergenza;
6. Note operative - Area Retro Inalpi.

Hotspot secondari:

- Pass: P1 Rosso, P1 Viola, P2 Combi Arancione, P3 Giallo.
- Mappa aree: P1 Inalpi, P2 Combi, P3 sosta breve, area bus, accessi, percorso pedonale bus.
- Protocollo accesso: auto con pass; nessun pass ma reale necessita'; nessun pass e nessuna necessita'.
- Equipaggiamento: casacca gialla, distintivo nominale, cappellino, borraccia, ombrello, cellulare carico, cordialita', sicurezza.
- Contatti emergenza: nominativi e numeri da confermare prima della pubblicazione.
- Area Retro Inalpi: ingresso, strada, interno, sottopiano, posti aggiuntivi, area rifiuti / spazio manovra mezzi.

### 5.3 Scheda dettaglio standard

Ogni elemento cliccabile deve aprire una scheda dettaglio, preferibilmente come drawer dal basso su mobile.

Struttura scheda:

- titolo;
- badge categoria;
- risposta rapida;
- chi fa cosa;
- chi va dove;
- chi contatta chi;
- istruzione completa;
- azioni rapide;
- fonte PDF / riferimento.

Azioni rapide possibili:

- mostra sulla mappa;
- portami qui;
- chiama contatto;
- copia numero;
- apri protocollo collegato;
- torna all'infografica;
- apri fonte.

### 5.4 Logistica e accessi - Pass

#### P1 Rosso

- Destinatari: conducenti disabili.
- Ingresso: via Filadelfia 82C.
- Colore: rosso.
- Azione volontario: verificare pass e indirizzare all'area assegnata.

#### P1 Viola

- Destinatari: staff del congresso.
- Ingresso: via Filadelfia 82C.
- Colore: viola.
- Azione volontario: verificare pass e indirizzare all'area assegnata.

#### P2 Combi Arancione

- Destinatari: particolari necessita' e disabili.
- Ingresso: via Filadelfia 89.
- Nota: area Combi a circa 800 m dall'arena, con tratto verde.
- Azione volontario: consentire accesso solo secondo istruzioni e necessita' reali.

#### P3 Giallo

- Destinatari: area di sosta breve.
- Posizione: controviale Est di Corso Galileo Ferraris.
- Uso: scarico/carico veloce.
- Azione volontario: evitare soste prolungate e ingorghi.

#### Bus

- Percorso pedonale blu obbligatorio per passeggeri bus su Corso Galileo Ferraris.
- L'utente deve poter aprire la scheda "Percorso Bus" dalla mappa.

### 5.5 Protocollo di accesso - 3 casi

#### Caso 1 - Auto con pass

Se l'auto ha il pass, indirizzarla immediatamente all'area assegnata. Evitare soste inutili, rallentamenti e ingorghi.

#### Caso 2 - Nessun pass ma reale necessita'

Se manca il pass ma a bordo ci sono persone con disabilita', anziani o reali necessita', permettere l'ingresso per la sola manovra di scarico passeggeri. Dopo lo scarico, invitare l'autista a parcheggiare all'esterno.

#### Caso 3 - Nessun pass e nessuna necessita'

Se l'auto non ha pass e non trasporta persone con necessita', far fare manovra e uscire subito. Non far scendere nessuno.

### 5.6 Sicurezza ed emergenze

#### Emergenza sanitaria

In caso di malore o necessita' di ambulanza, il volontario non deve prendere iniziative autonome. Deve contattare subito i referenti di emergenza confermati.

Contatti ricevuti nel brief:

- Mirko Macario - numero da confermare prima della pubblicazione.
- Lorenzo Garino - numero da confermare prima della pubblicazione.

#### Schermata emergenza

Deve essere raggiungibile sempre, dalla home e dalla bottom navigation.

Contenuti:

- avviso "NON prendere iniziative";
- pulsanti chiamata, solo con numeri confermati;
- copia numero;
- cosa comunicare: tipo emergenza, posizione, nome e numero del volontario, dettagli utili;
- collegamento a mappa / posizione.

#### Sicurezza sul campo

- Vigilare costantemente sulla viabilita'.
- Mantenere libera la circolazione.
- Proteggere l'incolumita' dei pedoni.
- Non creare intralci.

#### Gestione disturbo

Integrare il principio:

- Evitare;
- Ostacolare;
- Difendere.

Questa voce deve essere consultabile come protocollo separato.

### 5.7 Equipaggiamento e uniforme

Obbligatorio:

- casacca gialla ad alta visibilita';
- distintivo nominale del reparto.

Dotazione consigliata / necessaria:

- cappellino per il sole;
- borraccia d'acqua;
- ombrello per la pioggia;
- cellulare carico.

Comportamento associato:

- essere cordiali;
- essere gentili;
- non spazientirsi;
- non distrarsi;
- non usare il cellulare mentre si cammina o si e' in postazione se non per motivi di servizio.

### 5.8 Catena di comando

Ruoli:

- Usciere: riceve istruzioni dal Capitano.
- Capitano: coordina la squadra e riferisce all'Uomo Chiave.
- Uomo Chiave: coordina la zona / area generale.

Funzione app:

Ogni volontario deve poter salvare o visualizzare:

- la propria zona;
- il proprio Capitano;
- numero del Capitano;
- Uomo Chiave di zona;
- numero dell'Uomo Chiave.

La schermata deve rispondere rapidamente a:

- chi e' il mio riferimento;
- chi devo chiamare;
- a chi devo riferire;
- chi mi da' istruzioni.

### 5.9 Diorama interno Inalpi Arena

Obiettivo: creare una vista interna semi-3D / isometrica dell'Inalpi Arena, basata sulle planimetrie reali ma senza pubblicare planimetrie complete, per aiutare i volontari a orientarsi negli spazi interni.

Approccio consigliato: pseudo-3D leggero anziche' 3D realistico pesante.

Motivi:

- migliore leggibilita' su smartphone;
- prestazioni superiori;
- maggiore chiarezza operativa;
- minor complessita' di sviluppo;
- effetto visivo comunque forte.

Stati del diorama:

1. Vista esterna: volume sintetico dell'arena, pulsante "Apri struttura", hotspot ingressi principali.
2. Exploded view: involucro esterno che si apre, visualizzazione di arena, tribune, foyer, balconate e livelli.
3. Vista per livelli: livello 0, livello +6, parterre, platea, gallerie, foyer, balconate, ingressi, aree operative.
4. Focus settore: tap su un settore -> zoom guidato sull'area.
5. Scheda hotspot: cosa e' l'area, chi deve andare li', chi la gestisce, chi contattare, eventuale percorso.

Hotspot interni previsti:

- ingresso pubblico;
- ingresso staff tecnico;
- ingresso suites;
- foyer Filadelfia;
- foyer Sebastopoli;
- balconata Filadelfia;
- balconata Sebastopoli;
- parterre;
- platea;
- gallerie;
- tribuna Nord;
- tribuna Sud;
- tribuna Est;
- tribuna Ovest;
- lounge / aree speciali;
- bagni / servizi;
- scale;
- ascensori;
- desk o aree operative da definire.

### 5.10 Navigazione interna Punto A -> Punto B

Obiettivo: permettere a chi si trova all'interno dell'Inalpi Arena di impostare un percorso da un punto A a un punto B sulla planimetria o sul diorama.

Punto A selezionabile:

- posizione attuale;
- punto scelto su planimetria;
- area nota;
- ingresso;
- settore;
- foyer.

Punto B selezionabile:

- settore;
- ingresso;
- area operativa;
- foyer;
- balconata;
- posto di servizio;
- contatto / desk.

Tipi di percorso:

- piu' rapido;
- accessibile;
- evita scale;
- preferisci ascensori;
- percorso per staff;
- percorso pubblico.

Visualizzazione: il percorso viene mostrato come linea evidenziata sulla planimetria o sul diorama.

Per una V1 si puo' implementare una navigazione simulata basata su nodi manuali:

- ingressi;
- scale;
- ascensori;
- corridoi;
- foyer;
- settori;
- punti di servizio.

In una V2 si puo' migliorare con routing interno piu' accurato.

### 5.11 Mappa esterna / posizione live

Obiettivo: permettere al volontario di orientarsi all'esterno dell'arena e vedere:

- P1;
- P2;
- P3;
- area bus;
- accessi;
- posizione utente;
- percorsi principali.

Funzioni:

- mappa operativa stilizzata;
- eventuale Google Maps reale;
- pulsante "Centra su di me";
- "Apri istruzioni area vicina";
- link a percorso Google Maps.

## 6. Design system

### Stile generale

- pulito;
- tecnico;
- professionale;
- mobile-first;
- coerente con il mood "Felici per sempre";
- autorevole ma accogliente.

### Colori

Palette base:

- verde scuro istituzionale;
- avorio / panna;
- salvia;
- grigio caldo;
- toni naturali ispirati al programma del congresso.

Colori funzionali:

- rosso: emergenze, P1 rosso, avvisi critici;
- viola: P1 staff;
- arancione: P2 Combi;
- giallo: P3 sosta breve;
- blu: bus / percorso pedonale bus;
- verde: percorsi sicuri / conferme.

### Icone

Icone lineari, moderne, sobrie, ispirate allo stile JW Library / jw.org.

Evitare:

- emoji;
- icone cartoon;
- stile anni '90;
- eccessi decorativi.

### Animazioni

Animazioni leggere e funzionali:

- drawer dal basso;
- highlight su tap;
- zoom morbido su area selezionata;
- apertura diorama / exploded view;
- transizione tra livelli;
- fade degli elementi non rilevanti.

Le animazioni non devono rallentare la consultazione.

## 7. Struttura dati consigliata

Ogni istruzione deve essere gestita come oggetto dati.

```json
{
  "id": "p2-combi",
  "title": "P2 COMBI",
  "category": "Logistica e accessi",
  "color": "orange",
  "quickAnswer": "Ingresso via Filadelfia 89. Solo per particolari necessita' e disabili.",
  "whoDoesWhat": "Il volontario verifica la reale necessita' e indirizza all'area assegnata.",
  "whoGoesWhere": "Veicoli con P2 o particolari necessita' verso ingresso via Filadelfia 89.",
  "whoContactsWhom": "In caso di dubbio contattare il Capitano.",
  "fullInstruction": "Testo completo dell'istruzione ufficiale.",
  "actions": ["showOnMap", "routeTo", "openSource"],
  "source": {
    "document": "PDF istruzioni ufficiali",
    "page": null
  }
}
```

## 8. Roadmap sviluppo

### V1 - Prototipo operativo mock

Obiettivo: creare una webapp navigabile, senza integrazioni complesse.

Include:

- home operativa;
- bottom navigation;
- infografica interattiva mock;
- schede dettaglio;
- emergenza con pulsanti chiamata;
- mappa esterna stilizzata;
- diorama mock semi-3D;
- navigazione interna A -> B simulata;
- dati locali JSON;
- stile grafico V1.

### V2 - Integrazioni reali

Include:

- Google Maps;
- geolocalizzazione esterna;
- collegamento a fonti PDF;
- ricerca rapida;
- personalizzazione zona volontario;
- maggiore dettaglio contenuti.

### V3 - Avanzamento diorama e PWA

Include:

- pseudo-3D avanzato;
- rotazione controllata;
- livelli separati;
- routing interno piu' preciso;
- modalita' offline / PWA;
- salvataggio riferimenti personali;
- ottimizzazione prestazioni.

## 9. Stack tecnico consigliato

Frontend:

- Next.js o React;
- TypeScript;
- Tailwind CSS;
- Framer Motion per animazioni;
- dati locali JSON nella V1.

Mappe:

- V1: mappa stilizzata SVG / immagine con hotspot;
- V2: Google Maps API o link esterni Google Maps;
- interno: planimetrie vettoriali o raster con hotspot.

Diorama:

- V1: pseudo-3D con SVG / CSS transform / layer;
- V2/V3: valutare React Three Fiber solo se serve vero 3D.

Distribuzione:

- Vercel consigliato;
- PWA per uso mobile e offline in V2/V3.

## 10. Prompt operativo per Codex

Usare il prompt completo in [codex-launch-pack.md](./codex-launch-pack.md) quando si passa allo sviluppo.

## 11. Decisioni aperte

Da definire prima dello sviluppo avanzato:

1. elenco definitivo dei ruoli e dei responsabili;
2. elenco definitivo delle zone operative;
3. numeri dei Capitani e Uomini Chiave;
4. quali aree interne dell'arena devono essere davvero operative;
5. livello di fedelta' richiesto per il diorama;
6. se la navigazione interna deve essere solo indicativa o precisa;
7. se la webapp sara' pubblica, privata o protetta da link;
8. se serve funzionamento offline;
9. se usare Google Maps reale o solo collegamenti esterni;
10. se integrare aggiornamenti live durante il congresso.

## 12. Priorita' immediata

Il prossimo passo consigliato e' creare la UI V1 mobile, partendo dal wireframe gia' realizzato.

La UI V1 deve includere:

- home rifinita;
- schermata infografica interattiva;
- drawer dettaglio;
- schermata emergenza;
- mappa esterna stilizzata;
- diorama mock;
- navigazione interna A -> B mock.

Solo dopo la validazione della UI V1 si passa allo sviluppo completo.

