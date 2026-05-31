'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { InstructionDrawer } from '@/components/instructions/InstructionDrawer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { appData, getInstructionById } from '@/lib/data';
import type { Instruction, MapArea } from '@/lib/types';
import { AreaListItem, MapMarker } from './MapMarker';
import { MapLegend } from './MapLegend';

const positions: Record<string, { left: number; top: number; compact?: boolean }> = {
  'accesso-filadelfia-82c': { left: 42, top: 32, compact: true },
  'accesso-filadelfia-89': { left: 16, top: 38, compact: true },
  'bus-area': { left: 83, top: 66 },
  'checkpoint-accessi': { left: 50, top: 47, compact: true },
  'p1-area': { left: 53, top: 30 },
  'p1-staff-area': { left: 65, top: 35 },
  'p2-combi-area': { left: 18, top: 55 },
  'p3-sosta-breve-area': { left: 76, top: 47 },
  'percorso-blu-bus': { left: 70, top: 73, compact: true },
  'percorso-verde-combi': { left: 31, top: 58, compact: true }
};

const routeSegments = {
  filadelfia: 'M34 154 C92 145 146 129 207 115 C246 106 284 107 350 118',
  ferraris: 'M292 78 C286 134 296 184 318 236 C336 279 343 329 333 424',
  combi: 'M70 314 C115 284 155 258 214 226 C245 209 275 195 317 180'
};

function instructionFor(area: MapArea): Instruction | undefined {
  return getInstructionById(area.instructionId);
}

export function ExternalMapMock() {
  const [activeInstruction, setActiveInstruction] = useState<Instruction | undefined>();
  const [centered, setCentered] = useState(false);

  const selectArea = (area: MapArea) => {
    setActiveInstruction(instructionFor(area));
  };

  return (
    <>
      <section className="space-y-4">
        <section className="rounded-lg border border-greenDeep/20 bg-greenDeep p-4 text-ivory shadow-[0_18px_38px_rgba(11,51,42,0.22)]">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sage">Mappa esterna</p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight">Accessi, aree e percorsi</h2>
          <p className="mt-3 text-sm leading-6 text-sage">
            Vista schematica per consultare rapidamente parcheggi, ingressi e tratte operative.
          </p>
        </section>

        <Card className="space-y-4 border-sage/80 bg-white/85 shadow-[0_18px_40px_rgba(29,42,39,0.08)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-greenDeep">Vista operativa</p>
              <p className="mt-1 text-xs leading-5 text-muted">Schema semplificato con gerarchia di accessi e percorsi.</p>
            </div>
            <MapLegend />
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-sage/80 bg-[#f7f2e8] shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(221,232,218,0.8),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.42)_0_25%,transparent_25%_50%,rgba(255,255,255,0.28)_50%_75%,transparent_75%)] bg-[length:auto,24px_24px] opacity-70" />
            <div className="absolute left-[5%] top-[12%] h-14 w-[86%] rotate-[-7deg] rounded-full border border-white/70 bg-[#e8deca] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]" />
            <div className="absolute bottom-[10%] left-[67%] h-[84%] w-14 rotate-[-9deg] rounded-full border border-white/70 bg-[#e8deca] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]" />
            <div className="absolute left-[9%] top-[32%] h-[50%] w-9 rotate-[18deg] rounded-full border border-white/70 bg-sage/85" />
            <div className="absolute left-[32%] top-[18%] h-[35%] w-[41%] rounded-[1.1rem] border border-greenDeep/18 bg-white/88 shadow-[0_18px_30px_rgba(29,42,39,0.11)]" />
            <div className="absolute left-[40%] top-[26%] h-[19%] w-[26%] rounded-full border border-sage bg-ivory/90 shadow-inner" />
            <div className="absolute left-[37%] top-[22%] h-[2px] w-[32%] rounded bg-greenDeep/10" />
            <p className="absolute left-[38%] top-[19%] text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-greenDeep">
              Inalpi Arena
            </p>
            <p className="absolute bottom-4 right-4 max-w-32 text-right text-[0.62rem] font-semibold uppercase leading-4 tracking-[0.08em] text-muted">
              Corso Galileo Ferraris
            </p>
            <p className="absolute left-4 top-4 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-muted">
              Via Filadelfia
            </p>

            <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 400 500">
              <path
                d={routeSegments.filadelfia}
                fill="none"
                stroke="rgba(255,255,255,0.72)"
                strokeLinecap="round"
                strokeWidth="15"
              />
              <path
                d={routeSegments.filadelfia}
                fill="none"
                stroke="#0B332A"
                strokeDasharray="3 12"
                strokeLinecap="round"
                strokeWidth="5"
              />
              <path
                d={routeSegments.ferraris}
                fill="none"
                stroke="rgba(255,255,255,0.78)"
                strokeLinecap="round"
                strokeWidth="17"
              />
              <path
                d={routeSegments.ferraris}
                fill="none"
                stroke="#0077C8"
                strokeDasharray="4 12"
                strokeLinecap="round"
                strokeWidth="6"
              />
              <path
                d={routeSegments.combi}
                fill="none"
                stroke="rgba(255,255,255,0.74)"
                strokeLinecap="round"
                strokeWidth="14"
              />
              <path
                d={routeSegments.combi}
                fill="none"
                stroke="#0B332A"
                strokeDasharray="3 11"
                strokeLinecap="round"
                strokeWidth="5"
              />
              <circle cx="214" cy="226" fill="#F8F5EE" r="6" stroke="#0B332A" strokeWidth="2" />
              <circle cx="318" cy="236" fill="#F8F5EE" r="6" stroke="#0077C8" strokeWidth="2" />
            </svg>

            {centered ? (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="absolute left-[50%] top-[72%] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-routeBlue shadow"
                initial={{ opacity: 0, scale: 0.6 }}
              />
            ) : null}

            {appData.mapAreas.map((area) => {
              const position = positions[area.id] ?? { left: 50, top: 50 };

              return (
                <MapMarker
                  area={area}
                  compact={position.compact}
                  key={area.id}
                  left={position.left}
                  onSelect={selectArea}
                  top={position.top}
                />
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => setCentered((value) => !value)}
              variant={centered ? 'primary' : 'secondary'}
            >
              <Icon className="h-4 w-4" name="map" />
              Centra su di me
            </Button>
            <Button disabled variant="secondary">
              <Icon className="h-4 w-4" name="route" />
              Google Maps V2
            </Button>
          </div>
        </Card>

        <Card className="border-sage/80 bg-white/85">
          <h3 className="text-base font-semibold text-greenDeep">Aree tappabili</h3>
          <div className="mt-3 grid gap-2">
            {appData.mapAreas.map((area) => (
              <AreaListItem area={area} key={area.id} onSelect={selectArea} />
            ))}
          </div>
        </Card>
      </section>

      <InstructionDrawer
        instruction={activeInstruction}
        onClose={() => setActiveInstruction(undefined)}
        open={Boolean(activeInstruction)}
      />
    </>
  );
}
