'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Drawer } from '@/components/ui/Drawer';
import { Icon } from '@/components/ui/Icon';
import { InstructionSection } from '@/components/instructions/InstructionSection';
import { SourceBadge } from '@/components/instructions/SourceBadge';
import type { Instruction, OperationalColor } from '@/lib/types';

type InstructionDrawerProps = {
  instruction?: Instruction;
  open?: boolean;
  onClose?: () => void;
};

function toOperationalColor(color?: string): OperationalColor {
  if (
    color === 'green' ||
    color === 'red' ||
    color === 'purple' ||
    color === 'orange' ||
    color === 'yellow' ||
    color === 'blue' ||
    color === 'sage' ||
    color === 'muted'
  ) {
    return color;
  }

  return 'sage';
}

export function InstructionDrawer({ instruction, onClose, open = false }: InstructionDrawerProps) {
  if (!instruction) {
    return null;
  }

  return (
    <Drawer onClose={onClose} open={open} title={instruction.title}>
      <div className="space-y-3">
        <Badge color={toOperationalColor(instruction.color)}>{instruction.category}</Badge>
        <InstructionSection title="Risposta rapida">
          <p>{instruction.quickAnswer}</p>
        </InstructionSection>
        <InstructionSection items={instruction.whoDoesWhat} title="Chi fa cosa" />
        <InstructionSection items={instruction.whoGoesWhere} title="Chi va dove" />
        <InstructionSection items={instruction.whoContactsWhom} title="Chi contatta chi" />
        <InstructionSection title="Istruzione completa">
          <p>{instruction.fullInstruction ?? 'da definire'}</p>
        </InstructionSection>
        {instruction.actions?.includes('openDiorama') ? (
          <InstructionSection title="Azione rapida">
            <Button className="w-full" href="/routes/diorama" variant="primary">
              <Icon className="h-4 w-4" name="layers" />
              Apri Diorama
            </Button>
          </InstructionSection>
        ) : null}
        {instruction.actions?.includes('routeTo') ? (
          <InstructionSection title="Percorso">
            <Button className="w-full" href="/routes/indoor-route" variant="secondary">
              <Icon className="h-4 w-4" name="route" />
              Portami qui
            </Button>
          </InstructionSection>
        ) : null}
        <InstructionSection title="Fonte">
          <div className="flex flex-wrap gap-2">
            {instruction.source?.map((source) => (
              <SourceBadge key={`${source.document}-${source.page ?? source.note ?? ''}`} source={source} />
            )) ?? <Badge color="muted">da definire</Badge>}
          </div>
        </InstructionSection>
      </div>
    </Drawer>
  );
}
