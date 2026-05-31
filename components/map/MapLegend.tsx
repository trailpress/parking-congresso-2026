import type { OperationalColor } from '@/lib/types';

const legendItems: Array<{ label: string; color: OperationalColor }> = [
  { label: 'P1', color: 'red' },
  { label: 'Staff', color: 'purple' },
  { label: 'P2', color: 'orange' },
  { label: 'P3', color: 'yellow' },
  { label: 'Bus', color: 'blue' },
  { label: 'Percorso', color: 'green' }
];

const swatchClasses: Record<OperationalColor, string> = {
  blue: 'bg-routeBlue',
  green: 'bg-greenDeep',
  muted: 'bg-muted',
  orange: 'bg-passOrange',
  purple: 'bg-passPurple',
  red: 'bg-passRed',
  sage: 'bg-sage',
  yellow: 'bg-passYellow'
};

export function MapLegend() {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 rounded-md border border-sage/70 bg-white/70 px-2.5 py-2 shadow-sm">
      {legendItems.map((item) => (
        <span className="inline-flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.06em] text-appText" key={item.label}>
          <span className={`h-2 w-2 rounded-full ${swatchClasses[item.color]}`} />
          {item.label}
        </span>
      ))}
    </div>
  );
}
