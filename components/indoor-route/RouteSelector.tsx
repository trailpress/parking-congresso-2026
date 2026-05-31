import type { IndoorNode, IndoorRoute } from '@/lib/types';

export type RouteMode = IndoorRoute['mode'];

type RouteSelectorProps = {
  destinationId: string;
  mode: RouteMode;
  nodes: IndoorNode[];
  originId: string;
  onDestinationChange: (nodeId: string) => void;
  onModeChange: (mode: RouteMode) => void;
  onOriginChange: (nodeId: string) => void;
};

export const routeModeLabels: Record<RouteMode, string> = {
  accessible: 'Accessibile',
  'avoid-stairs': 'Evita scale',
  fastest: 'Piu rapido',
  public: 'Pubblico',
  staff: 'Staff'
};

const routeModes: RouteMode[] = ['fastest', 'accessible', 'avoid-stairs', 'staff', 'public'];

export function RouteSelector({
  destinationId,
  mode,
  nodes,
  originId,
  onDestinationChange,
  onModeChange,
  onOriginChange
}: RouteSelectorProps) {
  const startNodes = nodes.filter((node) => node.isSelectableAsStart);
  const destinationNodes = nodes.filter((node) => node.isSelectableAsDestination);

  return (
    <div className="space-y-4">
      <label className="grid gap-2 text-sm font-semibold text-greenDeep">
        Punto A
        <select
          className="min-h-12 w-full rounded-lg border border-sage bg-white px-3 text-sm font-medium text-appText outline-none transition focus:border-routeBlue focus:ring-2 focus:ring-routeBlue/25"
          onChange={(event) => onOriginChange(event.target.value)}
          value={originId}
        >
          {startNodes.map((node) => (
            <option key={node.id} value={node.id}>
              {node.name}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm font-semibold text-greenDeep">
        Punto B
        <select
          className="min-h-12 w-full rounded-lg border border-sage bg-white px-3 text-sm font-medium text-appText outline-none transition focus:border-routeBlue focus:ring-2 focus:ring-routeBlue/25"
          onChange={(event) => onDestinationChange(event.target.value)}
          value={destinationId}
        >
          {destinationNodes.map((node) => (
            <option key={node.id} value={node.id}>
              {node.name}
            </option>
          ))}
        </select>
      </label>

      <div>
        <p className="text-sm font-semibold text-greenDeep">Filtro percorso</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {routeModes.map((routeMode) => (
            <button
              className={`min-h-11 rounded-lg border px-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-routeBlue focus:ring-offset-2 ${
                mode === routeMode
                  ? 'border-greenDeep bg-greenDeep text-ivory'
                  : 'border-sage bg-white text-appText hover:bg-sage/40'
              }`}
              key={routeMode}
              onClick={() => onModeChange(routeMode)}
              type="button"
            >
              {routeModeLabels[routeMode]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
