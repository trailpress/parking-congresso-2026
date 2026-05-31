import type { IndoorFloor } from '@/lib/types';

type FloorSelectorProps = {
  activeFloorId: string;
  floors: IndoorFloor[];
  onFloorChange: (floorId: string) => void;
};

export function FloorSelector({ activeFloorId, floors, onFloorChange }: FloorSelectorProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {floors.map((floor) => (
        <button
          className={`min-h-11 rounded-lg border px-4 text-left transition focus:outline-none focus:ring-2 focus:ring-routeBlue focus:ring-offset-2 ${
            floor.id === activeFloorId
              ? 'border-greenDeep bg-greenDeep text-ivory'
              : 'border-sage bg-white text-appText hover:bg-sage/45'
          }`}
          key={floor.id}
          onClick={() => onFloorChange(floor.id)}
          type="button"
        >
          <span className="block text-xs font-semibold uppercase tracking-[0.08em] opacity-75">{floor.label}</span>
          <span className="block text-sm font-semibold">{floor.name}</span>
        </button>
      ))}
    </div>
  );
}
