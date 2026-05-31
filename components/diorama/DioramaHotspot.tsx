'use client';

import { cn } from '@/lib/classNames';
import type { DioramaHotspot } from '@/lib/types';

type DioramaHotspotProps = {
  hotspot: DioramaHotspot;
  labelsVisible: boolean;
  onSelect: (hotspot: DioramaHotspot) => void;
};

const typeClasses: Record<DioramaHotspot['type'], string> = {
  diorama: 'border-greenDeep bg-greenDeep',
  entrance: 'border-routeBlue bg-white after:bg-routeBlue',
  level: 'border-greenDeep/30 bg-white after:bg-sage',
  sector: 'border-greenDeep bg-white after:bg-greenDeep',
  service: 'border-passOrange bg-white after:bg-passOrange'
};

export function DioramaHotspotButton({
  hotspot,
  labelsVisible,
  onSelect
}: DioramaHotspotProps) {
  return (
    <button
      aria-label={`Apri hotspot ${hotspot.label}`}
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none focus:ring-2 focus:ring-routeBlue focus:ring-offset-2"
      onClick={() => onSelect(hotspot)}
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
      type="button"
    >
      <span
        className={cn(
          'block h-4 w-4 rounded-full border shadow-[0_7px_16px_rgba(29,42,39,0.18)] ring-[5px] ring-white/75 after:absolute after:left-1/2 after:top-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full',
          typeClasses[hotspot.type]
        )}
      />
      {labelsVisible ? (
        <span className="absolute left-1/2 top-5 min-w-24 -translate-x-1/2 rounded-md border border-sage/80 bg-white/92 px-2 py-1 text-center text-[0.64rem] font-semibold leading-4 text-greenDeep shadow-[0_8px_18px_rgba(29,42,39,0.11)] backdrop-blur">
          {hotspot.label}
        </span>
      ) : null}
    </button>
  );
}
