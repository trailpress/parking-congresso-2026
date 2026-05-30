'use client';

import { useState } from 'react';
import { EmergencyBar } from '@/components/emergency/EmergencyBar';
import { InstructionDrawer } from '@/components/instructions/InstructionDrawer';
import { AppShell } from '@/components/shell/AppShell';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import type { AppRoute, Instruction, OperationalColor } from '@/lib/types';

type ImmediateCard = {
  title: string;
  text: string;
  icon: string;
  instruction?: Instruction;
};

type MacroArea = {
  title: string;
  color: OperationalColor;
  icon: string;
};

type HomeContentProps = {
  immediateCards: readonly ImmediateCard[];
  macroAreas: readonly MacroArea[];
  quickRoutes: readonly AppRoute[];
};

export function HomeContent({ immediateCards, macroAreas, quickRoutes }: HomeContentProps) {
  const [selectedInstruction, setSelectedInstruction] = useState<Instruction | undefined>();

  return (
    <AppShell>
      <section className="rounded-lg bg-greenDeep px-5 py-5 text-ivory shadow-sm">
        <Badge color="sage">Home operativa</Badge>
        <h2 className="mt-4 text-2xl font-semibold leading-tight">Pronto per il servizio</h2>
        <p className="mt-3 text-sm leading-6 text-sage">
          Trova subito emergenza, aree, pass e catena di comando.
        </p>
      </section>

      <EmergencyBar />

      <Card>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-greenDeep">Cosa devi capire subito?</h2>
          <Badge color="muted">V1</Badge>
        </div>
        <div className="mt-4 grid gap-3">
          {immediateCards.map((card) => (
            <button
              className="flex min-h-20 w-full items-center gap-3 rounded-lg border border-sage bg-ivory p-4 text-left transition hover:bg-sage/50 focus:outline-none focus:ring-2 focus:ring-routeBlue focus:ring-offset-2"
              key={card.title}
              onClick={() => setSelectedInstruction(card.instruction)}
              type="button"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-greenDeep text-ivory">
                <Icon name={card.icon} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-semibold text-greenDeep">{card.title}</span>
                <span className="mt-1 block text-sm leading-5 text-muted">{card.text}</span>
              </span>
              <Icon className="h-4 w-4 text-muted" name="chevron" />
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-semibold text-greenDeep">Accessi rapidi</h2>
        <div className="mt-4 grid gap-3">
          {quickRoutes.map((route) => (
            <Button
              className="min-h-14 w-full justify-between"
              href={route.href}
              key={route.href}
              variant="secondary"
            >
              <span className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4" name={route.icon} />
                {route.label}
              </span>
              <Icon className="h-4 w-4" name="chevron" />
            </Button>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-semibold text-greenDeep">Macro-aree</h2>
        <div className="mt-4 grid gap-2">
          {macroAreas.map((area) => (
            <div
              className="flex min-h-14 items-center gap-3 rounded-lg border border-sage bg-white px-3 py-2"
              key={area.title}
            >
              <Badge color={area.color} className="h-9 w-9 justify-center px-0">
                <Icon className="h-4 w-4" name={area.icon} />
              </Badge>
              <p className="text-sm font-semibold leading-5 text-appText">{area.title}</p>
            </div>
          ))}
        </div>
      </Card>

      <InstructionDrawer
        instruction={selectedInstruction}
        onClose={() => setSelectedInstruction(undefined)}
        open={Boolean(selectedInstruction)}
      />
    </AppShell>
  );
}
