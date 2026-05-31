import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { RoutePath } from '@/components/indoor-route/RoutePath';
import type { IndoorNode, OperationalColor } from '@/lib/types';

type IndoorPlanViewProps = {
  destinationId: string;
  nodes: IndoorNode[];
  originId?: string;
  routeNodes: IndoorNode[];
  onNodeInstructionOpen: (node: IndoorNode) => void;
  onSetDestination: (nodeId: string) => void;
};

const nodeColors: Record<IndoorNode['type'], OperationalColor> = {
  corridor: 'muted',
  desk: 'sage',
  elevator: 'blue',
  entrance: 'green',
  foyer: 'sage',
  sector: 'orange',
  service: 'purple',
  staff: 'purple',
  stairs: 'red',
  suite: 'orange',
  balcony: 'sage',
  vertical: 'muted'
};

function isRouteNode(node: IndoorNode, routeNodes: IndoorNode[]) {
  return routeNodes.some((routeNode) => routeNode.id === node.id);
}

export function IndoorPlanView({
  destinationId,
  nodes,
  originId,
  routeNodes,
  onNodeInstructionOpen,
  onSetDestination
}: IndoorPlanViewProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-sage bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-sage bg-ivory px-4 py-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">Planimetria mock</p>
          <p className="text-sm font-semibold text-greenDeep">Coordinate dimostrative, non definitive</p>
        </div>
        <Badge color="blue">V1</Badge>
      </div>

      <div className="relative aspect-[4/3] min-h-72 bg-sage/55">
        <div className="absolute inset-x-[13%] top-[14%] h-[34%] rounded-lg border border-greenDeep/20 bg-white/70" />
        <div className="absolute inset-x-[16%] bottom-[15%] h-[29%] rounded-lg border border-greenDeep/20 bg-ivory/90" />
        <div className="absolute left-[47%] top-[15%] h-[69%] w-[6%] rounded-md bg-white/70" />
        <div className="absolute left-[20%] top-[54%] h-[10%] w-[60%] rounded-md bg-sand/80" />
        <RoutePath routeNodes={routeNodes} />

        {nodes.map((node) => {
          const isOrigin = node.id === originId;
          const isDestination = node.id === destinationId;
          const active = isOrigin || isDestination || isRouteNode(node, routeNodes);

          return (
            <button
              aria-label={`${node.name}. Imposta come destinazione.`}
              className={`absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-xs font-bold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-routeBlue focus:ring-offset-2 ${
                active
                ? 'border-routeBlue bg-routeBlue text-white'
                : 'border-white bg-greenDeep text-ivory hover:bg-greenMain'
              }`}
              key={node.id}
              onClick={() => onSetDestination(node.id)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              title={node.name}
              type="button"
            >
              {isOrigin ? 'A' : isDestination ? 'B' : ''}
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 border-t border-sage bg-white p-4">
        <div className="grid grid-cols-2 gap-2 text-xs text-muted">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-routeBlue" />
            percorso selezionato
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-greenDeep" />
            nodo disponibile
          </span>
        </div>
        <div className="grid gap-2">
          {nodes
            .filter((node) => node.isSelectableAsDestination)
            .map((node) => (
              <div
                className="flex items-center justify-between gap-3 rounded-lg border border-sage bg-ivory px-3 py-2"
                key={node.id}
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge color={nodeColors[node.type]}>{node.floorId}</Badge>
                    <p className="text-sm font-semibold text-greenDeep">{node.name}</p>
                  </div>
                  <p className="mt-1 text-xs text-muted">Nodo selezionabile</p>
                </div>
                <Button
                  aria-label={`Apri dettaglio per ${node.name}`}
                  className="min-h-10 px-3"
                  onClick={() => onNodeInstructionOpen(node)}
                  variant="ghost"
                >
                  <Icon className="h-4 w-4" name="source" />
                </Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
