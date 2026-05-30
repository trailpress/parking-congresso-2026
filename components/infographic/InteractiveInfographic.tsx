'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { InstructionDrawer } from '@/components/instructions/InstructionDrawer';
import { Badge } from '@/components/ui/Badge';
import { Drawer } from '@/components/ui/Drawer';
import { Icon } from '@/components/ui/Icon';
import { appData, getInstructionById } from '@/lib/data';
import type { Hotspot, Instruction, OperationalColor } from '@/lib/types';

type PrimaryBlock = {
  id: string;
  icon: string;
  helper: string;
  secondaryIds?: string[];
};

const primaryBlocks: PrimaryBlock[] = [
  {
    id: 'hotspot-pass-main',
    icon: 'grid',
    helper: 'Pass, aree e colori operativi',
    secondaryIds: [
      'secondary-p1-rosso',
      'secondary-p1-viola',
      'secondary-p2-combi',
      'secondary-p3-giallo'
    ]
  },
  {
    id: 'hotspot-map-main',
    icon: 'map',
    helper: 'Aree principali e flussi mock',
    secondaryIds: [
      'secondary-p1-rosso',
      'secondary-p1-viola',
      'secondary-p2-combi',
      'secondary-p3-giallo',
      'secondary-bus',
      'secondary-palazzetto-inalpi-arena'
    ]
  },
  {
    id: 'hotspot-protocol-main',
    icon: 'route',
    helper: 'Tre casi decisionali rapidi',
    secondaryIds: ['secondary-caso-1', 'secondary-caso-2', 'secondary-caso-3']
  },
  {
    id: 'hotspot-equipment-main',
    icon: 'users',
    helper: 'Dotazione e comportamento sul campo',
    secondaryIds: [
      'secondary-casacca',
      'secondary-distintivo',
      'secondary-borraccia',
      'secondary-cappellino',
      'secondary-ombrello',
      'secondary-cellulare'
    ]
  },
  {
    id: 'hotspot-contacts-main',
    icon: 'alert',
    helper: 'Procedure senza numeri non confermati',
    secondaryIds: ['secondary-emergenza-sanitaria']
  },
  {
    id: 'hotspot-retro-main',
    icon: 'layers',
    helper: 'Area retro e collegamento arena',
    secondaryIds: ['secondary-area-retro-inalpi', 'secondary-palazzetto-inalpi-arena']
  }
];

const typeLabels: Record<Hotspot['type'], string> = {
  contact: 'Contatto',
  diorama: 'Diorama',
  equipment: 'Dotazione',
  'map-area': 'Area',
  pass: 'Pass',
  protocol: 'Accesso',
  section: 'Sezione'
};

function hotspotColor(hotspot: Hotspot): OperationalColor {
  const instruction = getInstructionById(hotspot.targetInstructionId);

  if (
    instruction?.color === 'green' ||
    instruction?.color === 'red' ||
    instruction?.color === 'purple' ||
    instruction?.color === 'orange' ||
    instruction?.color === 'yellow' ||
    instruction?.color === 'blue' ||
    instruction?.color === 'sage' ||
    instruction?.color === 'muted'
  ) {
    return instruction.color;
  }

  return hotspot.type === 'pass' ? 'muted' : 'sage';
}

function byId(id: string) {
  return appData.hotspots.find((hotspot) => hotspot.id === id);
}

function isHotspot(hotspot: Hotspot | undefined): hotspot is Hotspot {
  return Boolean(hotspot);
}

export function InteractiveInfographic() {
  const [activeBlock, setActiveBlock] = useState<PrimaryBlock | null>(null);
  const [activeInstruction, setActiveInstruction] = useState<Instruction | undefined>();

  const blocks = useMemo(
    () =>
      primaryBlocks.map((block) => ({
        ...block,
        hotspot: byId(block.id),
        secondaryHotspots: block.secondaryIds?.map(byId).filter(isHotspot) ?? []
      })),
    []
  );

  const openBlock = (block: PrimaryBlock) => {
    const secondaryHotspots = block.secondaryIds?.map(byId).filter(isHotspot);

    if (secondaryHotspots?.length) {
      setActiveBlock(block);
      return;
    }

    const hotspot = byId(block.id);
    const instruction = hotspot?.targetInstructionId
      ? getInstructionById(hotspot.targetInstructionId)
      : undefined;

    setActiveInstruction(instruction);
  };

  const openHotspot = (hotspot: Hotspot) => {
    setActiveBlock(null);
    setActiveInstruction(getInstructionById(hotspot.targetInstructionId));
  };

  return (
    <>
      <section className="space-y-4">
        <div className="rounded-lg bg-greenDeep px-5 py-5 text-ivory shadow-sm">
          <Badge color="sage">Mock strutturale V1</Badge>
          <h2 className="mt-4 text-2xl font-semibold leading-tight">
            Infografica operativa interattiva
          </h2>
          <p className="mt-3 text-sm leading-6 text-sage">
            Sei blocchi tappabili per raggiungere pass, accessi, dotazione, emergenza e note
            dell&apos;area Retro Inalpi.
          </p>
        </div>

        <div className="rounded-lg border border-sage bg-ivory p-3 shadow-sm">
          <div className="rounded-lg border border-sage bg-white p-3">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-greenDeep">Vista mobile</p>
              <Badge color="sage">6 blocchi</Badge>
            </div>
            <div className="grid gap-3">
              {blocks.map((block, index) => (
                <motion.button
                  animate={{ opacity: 1, y: 0 }}
                  className="group w-full rounded-lg border border-sage bg-white p-4 text-left shadow-sm transition hover:border-greenDeep focus:outline-none focus:ring-2 focus:ring-routeBlue focus:ring-offset-2"
                  initial={{ opacity: 0, y: 8 }}
                  key={block.id}
                  onClick={() => openBlock(block)}
                  transition={{ delay: index * 0.035, duration: 0.18 }}
                  type="button"
                >
                  <span className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sage text-greenDeep">
                      <Icon name={block.icon} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-semibold leading-snug text-greenDeep">
                        {block.hotspot?.label ?? 'Sezione'}
                      </span>
                      <span className="mt-1 block text-sm leading-5 text-muted">{block.helper}</span>
                    </span>
                    <Icon
                      className="mt-1 h-5 w-5 text-greenDeep transition group-hover:translate-x-0.5"
                      name="chevron"
                    />
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Drawer
        onClose={() => setActiveBlock(null)}
        open={Boolean(activeBlock)}
        title={activeBlock ? byId(activeBlock.id)?.label ?? 'Dettagli' : 'Dettagli'}
      >
        <div className="space-y-3">
          {activeBlock ? (
            <p className="text-sm leading-6 text-muted">{activeBlock.helper}</p>
          ) : null}
          <div className="grid gap-3">
            {activeBlock?.secondaryIds
              ?.map(byId)
              .filter(isHotspot)
              .map((hotspot) => (
                <button
                  className="flex w-full items-center justify-between gap-3 rounded-lg border border-sage bg-white p-4 text-left shadow-sm transition hover:border-greenDeep focus:outline-none focus:ring-2 focus:ring-routeBlue focus:ring-offset-2"
                  key={hotspot.id}
                  onClick={() => openHotspot(hotspot)}
                  type="button"
                >
                  <span className="min-w-0">
                    <span className="block text-base font-semibold text-greenDeep">
                      {hotspot.label}
                    </span>
                    <span className="mt-2 flex flex-wrap gap-2">
                      <Badge color={hotspotColor(hotspot)}>{typeLabels[hotspot.type]}</Badge>
                    </span>
                  </span>
                  <Icon className="h-5 w-5 text-greenDeep" name="chevron" />
                </button>
              ))}
          </div>
        </div>
      </Drawer>

      <InstructionDrawer
        instruction={activeInstruction}
        onClose={() => setActiveInstruction(undefined)}
        open={Boolean(activeInstruction)}
      />
    </>
  );
}
