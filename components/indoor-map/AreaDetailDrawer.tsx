import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import type { IndoorArea, IndoorNode } from '@/lib/types';

type AreaDetailDrawerProps = {
  area?: IndoorArea;
  connectedNodes: IndoorNode[];
  onClose: () => void;
  onSetDestination: (nodeId: string) => void;
};

export function AreaDetailDrawer({
  area,
  connectedNodes,
  onClose,
  onSetDestination
}: AreaDetailDrawerProps) {
  if (!area) {
    return null;
  }

  return (
    <aside className="fixed inset-x-0 bottom-20 z-30 mx-auto max-w-md px-4 md:bottom-6 md:right-6 md:left-auto md:w-96">
      <div className="rounded-lg border border-sage bg-white p-4 shadow-2xl shadow-greenDeep/15">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Badge color={area.accessLevel === 'staff' ? 'purple' : area.accessLevel === 'hospitality' ? 'orange' : 'sage'}>
              {area.accessLevel}
            </Badge>
            <h2 className="mt-2 text-lg font-semibold leading-tight text-greenDeep">{area.name}</h2>
          </div>
          <Button aria-label="Chiudi dettaglio area" className="min-h-10 px-3" onClick={onClose} variant="ghost">
            <Icon className="h-4 w-4" name="close" />
          </Button>
        </div>

        <p className="mt-3 text-sm leading-6 text-muted">{area.description}</p>

        {connectedNodes.length > 0 ? (
          <div className="mt-4 grid gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">Punti collegati</p>
            {connectedNodes.map((node) => (
              <button
                className="flex items-center justify-between gap-3 rounded-lg border border-sage bg-ivory px-3 py-2 text-left transition hover:bg-sage/50 focus:outline-none focus:ring-2 focus:ring-routeBlue"
                key={node.id}
                onClick={() => onSetDestination(node.id)}
                type="button"
              >
                <span className="text-sm font-semibold text-greenDeep">{node.name}</span>
                <span className="text-xs font-semibold text-routeBlue">Punto B</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
