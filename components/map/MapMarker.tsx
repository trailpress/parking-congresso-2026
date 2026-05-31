'use client';

import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/classNames';
import type { MapArea, OperationalColor } from '@/lib/types';

type MapMarkerProps = {
  area: MapArea;
  compact?: boolean;
  left: number;
  onSelect: (area: MapArea) => void;
  top: number;
};

const markerClasses: Record<OperationalColor, string> = {
  blue: 'border-routeBlue/65 bg-white/95 text-routeBlue before:bg-routeBlue',
  green: 'border-greenDeep/45 bg-white/95 text-greenDeep before:bg-greenDeep',
  muted: 'border-sand bg-white/95 text-appText before:bg-sand',
  orange: 'border-passOrange/65 bg-white/95 text-appText before:bg-passOrange',
  purple: 'border-passPurple/65 bg-white/95 text-passPurple before:bg-passPurple',
  red: 'border-passRed/65 bg-white/95 text-passRed before:bg-passRed',
  sage: 'border-greenDeep/20 bg-white/95 text-appText before:bg-sage',
  yellow: 'border-passYellow/80 bg-white/95 text-appText before:bg-passYellow'
};

function shortLabel(label: string) {
  if (label.startsWith('P1 Staff')) return 'Staff';
  if (label.startsWith('P1')) return 'P1';
  if (label.startsWith('P2')) return 'P2';
  if (label.startsWith('P3')) return 'P3';
  if (label.startsWith('Area Bus')) return 'Bus';
  if (label.startsWith('Accesso')) return 'Accesso';
  if (label.startsWith('Percorso')) return 'Percorso';
  if (label.startsWith('Tratto')) return 'P2';
  return label;
}

function compactLabel(area: MapArea) {
  if (area.id === 'accesso-filadelfia-82c') return '82C';
  if (area.id === 'accesso-filadelfia-89') return '89';
  if (area.id === 'checkpoint-accessi') return 'C';
  if (area.id === 'percorso-blu-bus') return 'B';
  if (area.id === 'percorso-verde-combi') return 'V';
  return shortLabel(area.label);
}

export function MapMarker({ area, compact, left, onSelect, top }: MapMarkerProps) {
  return (
    <button
      aria-label={`Apri istruzione ${area.label}`}
      className={cn(
        'absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-md border px-2.5 py-1.5 text-left text-[0.68rem] font-semibold shadow-[0_8px_18px_rgba(29,42,39,0.12)] backdrop-blur transition before:mr-1.5 before:inline-block before:h-1.5 before:w-1.5 before:rounded-full hover:-translate-y-[53%] hover:shadow-[0_12px_22px_rgba(29,42,39,0.16)] focus:outline-none focus:ring-2 focus:ring-routeBlue focus:ring-offset-2',
        markerClasses[area.color],
        compact &&
          'min-h-8 min-w-8 rounded-full px-1.5 text-center before:mr-0 before:h-0 before:w-0'
      )}
      onClick={() => onSelect(area)}
      style={{ left: `${left}%`, top: `${top}%` }}
      type="button"
    >
      {compact ? compactLabel(area) : shortLabel(area.label)}
    </button>
  );
}

type AreaListItemProps = {
  area: MapArea;
  onSelect: (area: MapArea) => void;
};

export function AreaListItem({ area, onSelect }: AreaListItemProps) {
  const cleanStatus = area.status.replace(/^mock V1 -\s*/i, '');

  return (
    <button
      className="flex w-full items-center justify-between gap-3 rounded-lg border border-sage/80 bg-white/85 p-3 text-left shadow-sm transition hover:border-greenDeep/50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-routeBlue focus:ring-offset-2"
      onClick={() => onSelect(area)}
      type="button"
    >
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-greenDeep">{area.label}</span>
        <span className="mt-1 block text-xs leading-5 text-muted">{cleanStatus}</span>
      </span>
      <Badge className="bg-white/80 shadow-sm" color={area.color}>
        {shortLabel(area.label)}
      </Badge>
    </button>
  );
}
