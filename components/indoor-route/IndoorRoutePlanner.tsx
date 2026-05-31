'use client';

import { useMemo, useState } from 'react';
import { AreaDetailDrawer } from '@/components/indoor-map/AreaDetailDrawer';
import { FloorSelector } from '@/components/indoor-map/FloorSelector';
import { IndoorMapSvg } from '@/components/indoor-map/IndoorMapSvg';
import { AppShell } from '@/components/shell/AppShell';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { RouteSelector, routeModeLabels, type RouteMode } from '@/components/indoor-route/RouteSelector';
import { calculateIndoorRoute } from '@/components/indoor-route/routeGraph';
import type { IndoorArea, IndoorEdge, IndoorFloor, IndoorNode, IndoorRoute } from '@/lib/types';

type IndoorRoutePlannerProps = {
  indoorAreas: IndoorArea[];
  indoorEdges: IndoorEdge[];
  indoorFloors: IndoorFloor[];
  indoorNodes: IndoorNode[];
  indoorRoutes: IndoorRoute[];
};

const noRouteMessage = 'Nessun percorso compatibile con i filtri selezionati.';

function getNodeName(nodesById: Map<string, IndoorNode>, nodeId: string) {
  return nodesById.get(nodeId)?.name ?? 'da definire';
}

function getRouteInstructions(routeNodes: IndoorNode[], routeEdges: IndoorEdge[]) {
  if (routeNodes.length < 2) {
    return [noRouteMessage, 'Prova a cambiare modalita oppure a selezionare un accesso diverso.'];
  }

  return routeNodes.map((node, index) => {
    if (index === 0) {
      return `Parti da ${node.name}.`;
    }

    const edge = routeEdges[index - 1];

    if (index === routeNodes.length - 1) {
      const via = edge?.via && edge.via !== node.name ? ` passando da ${edge.via}` : '';
      return `Arriva a ${node.name}${via}.`;
    }

    if (edge?.mode === 'elevator') {
      return `Usa gli ascensori verso ${node.name}.`;
    }

    if (edge?.mode === 'stairs') {
      return `Sali tramite scale verso ${node.name}.`;
    }

    const via = edge?.via && edge.via !== node.name ? ` via ${edge.via}` : '';
    return `Prosegui verso ${node.name}${via}.`;
  });
}

export function IndoorRoutePlanner({
  indoorAreas,
  indoorEdges,
  indoorFloors,
  indoorNodes,
  indoorRoutes
}: IndoorRoutePlannerProps) {
  const sortedFloors = useMemo(
    () => [...indoorFloors].sort((left, right) => left.sortOrder - right.sortOrder),
    [indoorFloors]
  );
  const startNodes = indoorNodes.filter((node) => node.isSelectableAsStart);
  const destinationNodes = indoorNodes.filter((node) => node.isSelectableAsDestination);
  const [activeFloorId, setActiveFloorId] = useState(sortedFloors[0]?.id ?? '');
  const [originId, setOriginId] = useState(startNodes[0]?.id ?? indoorNodes[0]?.id ?? '');
  const [destinationId, setDestinationId] = useState(
    destinationNodes.find((node) => node.id !== originId)?.id ?? destinationNodes[0]?.id ?? indoorNodes[0]?.id ?? ''
  );
  const [mode, setMode] = useState<RouteMode>('public');
  const [selectedAreaId, setSelectedAreaId] = useState<string | undefined>();

  const nodesById = useMemo(() => new Map(indoorNodes.map((node) => [node.id, node])), [indoorNodes]);
  const areasById = useMemo(() => new Map(indoorAreas.map((area) => [area.id, area])), [indoorAreas]);
  const activeFloor = sortedFloors.find((floor) => floor.id === activeFloorId) ?? sortedFloors[0];
  const selectedArea = selectedAreaId ? areasById.get(selectedAreaId) : undefined;

  const calculatedRoute = useMemo(
    () =>
      calculateIndoorRoute({
        edges: indoorEdges,
        endNodeId: destinationId,
        mode,
        nodes: indoorNodes,
        startNodeId: originId
      }),
    [destinationId, indoorEdges, indoorNodes, mode, originId]
  );

  const matchingSeedRoute = useMemo(
    () =>
      indoorRoutes.find(
        (route) => route.fromNodeId === originId && route.toNodeId === destinationId && route.mode === mode
      ),
    [destinationId, indoorRoutes, mode, originId]
  );
  const routeNodes = calculatedRoute?.nodes ?? [];
  const routeInstructions = getRouteInstructions(routeNodes, calculatedRoute?.edges ?? []);
  const connectedAreaNodes = selectedArea
    ? selectedArea.connectedNodeIds.flatMap((nodeId) => {
        const node = nodesById.get(nodeId);
        return node ? [node] : [];
      })
    : [];

  function handleOriginChange(nextOriginId: string) {
    setOriginId(nextOriginId);
    const node = nodesById.get(nextOriginId);

    if (node) {
      setActiveFloorId(node.floorId);
    }
  }

  function handleDestinationChange(nextDestinationId: string) {
    setDestinationId(nextDestinationId);
    const node = nodesById.get(nextDestinationId);

    if (node) {
      setActiveFloorId(node.floorId);
      setSelectedAreaId(node.areaId);
    }
  }

  if (!activeFloor) {
    return null;
  }

  return (
    <AppShell className="max-w-6xl" title="Navigazione interna">
      <section className="rounded-lg bg-greenDeep px-5 py-5 text-ivory shadow-sm">
        <Badge color="sage">Indoor mapping</Badge>
        <h1 className="mt-4 text-2xl font-semibold leading-tight">Planimetria dinamica e percorso A-B</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-sage">
          Prototipo dati-first con SVG derivato, livelli, aree cliccabili e routing su grafo locale. Nessuna planimetria
          raw o dato sensibile viene salvato nel repository.
        </p>
      </section>

      <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="grid content-start gap-5">
          <Card>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-greenDeep">Livello</h2>
              <Badge color="muted">{activeFloor.label}</Badge>
            </div>
            <div className="mt-4">
              <FloorSelector activeFloorId={activeFloor.id} floors={sortedFloors} onFloorChange={setActiveFloorId} />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-greenDeep">Punto A {'->'} Punto B</h2>
              <Badge color={calculatedRoute ? 'blue' : 'muted'}>{calculatedRoute ? 'calcolato' : 'nessuna rotta'}</Badge>
            </div>
            <div className="mt-4">
              <RouteSelector
                destinationId={destinationId}
                mode={mode}
                nodes={indoorNodes}
                onDestinationChange={handleDestinationChange}
                onModeChange={setMode}
                onOriginChange={handleOriginChange}
                originId={originId}
              />
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-greenDeep">Percorso</h2>
                <p className="mt-1 text-sm leading-5 text-muted">
                  {calculatedRoute?.description ?? noRouteMessage}
                </p>
              </div>
              <Icon className="h-5 w-5 text-routeBlue" name="route" />
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-sage bg-ivory p-3">
                <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">Da</dt>
                <dd className="mt-1 font-semibold text-greenDeep">{getNodeName(nodesById, originId)}</dd>
              </div>
              <div className="rounded-lg border border-sage bg-ivory p-3">
                <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">A</dt>
                <dd className="mt-1 font-semibold text-greenDeep">{getNodeName(nodesById, destinationId)}</dd>
              </div>
              <div className="rounded-lg border border-sage bg-ivory p-3">
                <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">Tempo</dt>
                <dd className="mt-1 font-semibold text-greenDeep">
                  {calculatedRoute ? `${calculatedRoute.estimatedTime} min` : 'da definire'}
                </dd>
              </div>
              <div className="rounded-lg border border-sage bg-ivory p-3">
                <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">Filtro</dt>
                <dd className="mt-1 font-semibold text-greenDeep">{routeModeLabels[mode]}</dd>
              </div>
            </dl>

            <div className="mt-4 rounded-lg border border-sage bg-white p-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-greenDeep">Istruzioni base</h3>
                {matchingSeedRoute ? <Badge color="sage">seed validata</Badge> : <Badge color="muted">live graph</Badge>}
              </div>
              <ol className="mt-3 grid gap-2 text-sm leading-5 text-muted">
                {routeInstructions.map((instruction, index) => (
                  <li className="flex gap-2" key={`${instruction}-${index}`}>
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage text-[11px] font-bold text-greenDeep">
                      {index + 1}
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Card>
        </div>

        <section className="grid content-start gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-sage bg-white px-4 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">SVG derivato scalabile</p>
              <p className="text-sm font-semibold text-greenDeep">{activeFloor.name}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge color="sage">aree cliccabili</Badge>
              <Badge color="muted">nodi piccoli</Badge>
            </div>
          </div>

          <IndoorMapSvg
            areas={indoorAreas}
            destinationId={destinationId}
            floor={activeFloor}
            nodes={indoorNodes}
            onAreaSelect={(area) => setSelectedAreaId(area.id)}
            onNodeSelect={handleDestinationChange}
            originId={originId}
            routeNodes={routeNodes}
            selectedAreaId={selectedAreaId}
          />
        </section>
      </div>

      <AreaDetailDrawer
        area={selectedArea}
        connectedNodes={connectedAreaNodes}
        onClose={() => setSelectedAreaId(undefined)}
        onSetDestination={handleDestinationChange}
      />
    </AppShell>
  );
}
