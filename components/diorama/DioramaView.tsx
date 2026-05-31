'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { InstructionDrawer } from '@/components/instructions/InstructionDrawer';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { appData, getInstructionById } from '@/lib/data';
import type { DioramaHotspot, Instruction } from '@/lib/types';
import { DioramaControls, type DioramaMode } from './DioramaControls';
import { DioramaHotspotButton } from './DioramaHotspot';

const modeLabels: Record<DioramaMode, string> = {
  exploded: 'Vista esplosa',
  external: 'Vista esterna arena',
  focus: 'Focus settore/area'
};

function useHotspotInstruction(hotspot?: DioramaHotspot): Instruction | undefined {
  return useMemo(
    () => (hotspot ? getInstructionById(hotspot.targetInstructionId) : undefined),
    [hotspot]
  );
}

export function DioramaView() {
  const [mode, setMode] = useState<DioramaMode>('external');
  const [labelsVisible, setLabelsVisible] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<DioramaHotspot | undefined>();
  const activeInstruction = useHotspotInstruction(activeHotspot);

  const selectHotspot = (hotspot: DioramaHotspot) => {
    setActiveHotspot(hotspot);
    if (hotspot.type === 'sector') {
      setMode('focus');
    }
  };

  return (
    <>
      <section className="space-y-4">
        <section className="rounded-lg border border-greenDeep/20 bg-greenDeep p-4 text-ivory shadow-[0_18px_38px_rgba(11,51,42,0.22)]">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sage">Diorama interno</p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight">Modello navigabile arena</h2>
          <p className="mt-3 text-sm leading-6 text-sage">
            Modello sintetico a livelli con hotspot discreti per orientamento e istruzioni.
          </p>
        </section>

        <Card className="space-y-4 border-sage/80 bg-white/85 shadow-[0_18px_40px_rgba(29,42,39,0.08)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-greenDeep">{modeLabels[mode]}</p>
              <p className="mt-1 text-xs leading-5 text-muted">
                Tocca un punto per aprire l&apos;istruzione collegata.
              </p>
            </div>
            <Badge color={mode === 'focus' ? 'green' : mode === 'exploded' ? 'blue' : 'sage'}>
              {mode === 'external' ? 'Esterno' : mode === 'exploded' ? 'Livelli' : 'Focus'}
            </Badge>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-sage/80 bg-[#f7f2e8] shadow-inner [perspective:920px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(221,232,218,0.82),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.38)_0_25%,transparent_25%_50%,rgba(255,255,255,0.24)_50%_75%,transparent_75%)] bg-[length:auto,26px_26px] opacity-80" />
            <div className="absolute inset-x-10 bottom-9 h-16 rounded-full bg-[rgba(92,98,95,0.16)] blur-xl" />
            <motion.div
              animate={{
                opacity: mode === 'focus' ? 0.24 : 0.38,
                rotateX: mode === 'external' ? 58 : 64,
                rotateZ: -6,
                y: mode === 'exploded' ? 34 : 62
              }}
              className="absolute left-[14%] top-[48%] h-[38%] w-[72%] rounded-[1.6rem] border border-greenDeep/15 bg-sage shadow-[0_24px_42px_rgba(29,42,39,0.16)]"
            />
            <motion.div
              animate={{
                rotateX: 58,
                rotateZ: -6,
                y: mode === 'external' ? 50 : mode === 'exploded' ? 18 : 34
              }}
              className="absolute left-[18%] top-[38%] h-[34%] w-[64%] rounded-[1.4rem] border border-greenDeep/20 bg-white/92 shadow-[0_22px_36px_rgba(29,42,39,0.15)]"
            />
            <motion.div
              animate={{
                scale: mode === 'focus' ? 1.08 : 1,
                rotateX: 58,
                rotateZ: -6,
                y: mode === 'exploded' ? -16 : mode === 'focus' ? -8 : 0
              }}
              className="absolute left-[28%] top-[31%] h-[26%] w-[45%] rounded-[1rem] border border-sage/90 bg-ivory/95 shadow-[inset_0_0_0_8px_rgba(221,232,218,0.45),0_14px_28px_rgba(29,42,39,0.12)]"
            />
            <motion.div
              animate={{
                opacity: mode === 'external' ? 0.62 : 0.95,
                rotateX: 58,
                rotateZ: -6,
                y: mode === 'exploded' ? -52 : mode === 'focus' ? -24 : -8
              }}
              className="absolute left-[24%] top-[20%] h-[29%] w-[52%] rounded-[1.4rem] border border-routeBlue/20 bg-white/82 shadow-[0_18px_32px_rgba(29,42,39,0.13)] backdrop-blur-sm"
            />
            <motion.div
              animate={{ opacity: mode === 'external' ? 0 : 1 }}
              className="absolute left-[34%] top-[35%] h-[14%] w-[32%] rotate-[-6deg] rounded-full border border-greenDeep/25 bg-sage/80 shadow-inner"
            />

            <div className="absolute left-[24%] top-[66%] h-8 w-[18%] skew-x-[-18deg] rounded-md border border-routeBlue/25 bg-routeBlue/10 shadow-sm" />
            <div className="absolute left-[58%] top-[66%] h-8 w-[18%] skew-x-[18deg] rounded-md border border-passOrange/25 bg-passOrange/10 shadow-sm" />
            <div className="absolute left-[31%] top-[60%] h-2 w-[38%] rounded-full bg-greenDeep/10" />
            <p className="absolute right-4 top-4 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-muted">
              Livelli separati
            </p>
            <div className="absolute left-4 top-[47%] h-[34%] w-px bg-greenDeep/12" />
            <div className="absolute left-3 top-[47%] h-px w-3 bg-greenDeep/12" />
            <div className="absolute left-3 top-[80%] h-px w-3 bg-greenDeep/12" />

            {appData.dioramaHotspots.map((hotspot) => (
              <DioramaHotspotButton
                hotspot={hotspot}
                key={hotspot.id}
                labelsVisible={labelsVisible}
                onSelect={selectHotspot}
              />
            ))}
          </div>

          <DioramaControls
            labelsVisible={labelsVisible}
            mode={mode}
            onModeChange={setMode}
            onToggleLabels={() => setLabelsVisible((value) => !value)}
          />
        </Card>

        <Card className="border-sage/80 bg-white/85">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-greenDeep">
                {activeHotspot?.label ?? 'Nessun hotspot selezionato'}
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted">
                {activeInstruction?.quickAnswer ??
                  'Seleziona un ingresso, foyer, settore o servizio per preparare il percorso.'}
              </p>
            </div>
            {activeHotspot ? <Badge color="sage">Livello {activeHotspot.level}</Badge> : null}
          </div>
          <Button className="mt-4 w-full" href="/routes/indoor-route" variant="secondary">
            <Icon className="h-4 w-4" name="route" />
            Portami qui
          </Button>
        </Card>
      </section>

      <InstructionDrawer
        instruction={activeInstruction}
        onClose={() => setActiveHotspot(undefined)}
        open={Boolean(activeHotspot && activeInstruction)}
      />
    </>
  );
}
