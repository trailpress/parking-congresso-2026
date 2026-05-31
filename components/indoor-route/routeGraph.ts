import type { IndoorEdge, IndoorNode, IndoorRoute } from '@/lib/types';

export type RouteMode = IndoorRoute['mode'];

export type CalculatedIndoorRoute = {
  nodeIds: string[];
  nodes: IndoorNode[];
  edges: IndoorEdge[];
  distance: number;
  estimatedTime: number;
  description: string;
};

function canUseEdge(edge: IndoorEdge, mode: RouteMode) {
  if (mode !== 'staff' && edge.isStaffOnly) {
    return false;
  }

  if (mode !== 'staff' && edge.accessLevel === 'staff') {
    return false;
  }

  if (mode === 'public' && edge.accessLevel === 'hospitality') {
    return false;
  }

  if ((mode === 'accessible' || mode === 'avoid-stairs') && !edge.isAccessible) {
    return false;
  }

  if ((mode === 'accessible' || mode === 'avoid-stairs') && edge.mode === 'stairs') {
    return false;
  }

  return true;
}

function edgeWeight(edge: IndoorEdge, mode: RouteMode) {
  if (mode === 'staff' && edge.isStaffOnly) {
    return edge.distance * 0.75;
  }

  if (mode === 'accessible' && edge.mode === 'elevator') {
    return edge.distance * 0.9;
  }

  if (mode === 'fastest' && edge.mode === 'stairs') {
    return edge.distance * 0.82;
  }

  return edge.distance;
}

export function calculateIndoorRoute({
  edges,
  endNodeId,
  mode,
  nodes,
  startNodeId
}: {
  edges: IndoorEdge[];
  endNodeId: string;
  mode: RouteMode;
  nodes: IndoorNode[];
  startNodeId: string;
}): CalculatedIndoorRoute | undefined {
  const nodesById = new Map(nodes.map((node) => [node.id, node]));

  if (!nodesById.has(startNodeId) || !nodesById.has(endNodeId) || startNodeId === endNodeId) {
    return undefined;
  }

  const adjacency = new Map<string, Array<{ edge: IndoorEdge; nextNodeId: string; weight: number }>>();

  edges.filter((edge) => canUseEdge(edge, mode)).forEach((edge) => {
    const weight = edgeWeight(edge, mode);
    const fromList = adjacency.get(edge.fromNodeId) ?? [];
    const toList = adjacency.get(edge.toNodeId) ?? [];

    fromList.push({ edge, nextNodeId: edge.toNodeId, weight });
    toList.push({ edge, nextNodeId: edge.fromNodeId, weight });

    adjacency.set(edge.fromNodeId, fromList);
    adjacency.set(edge.toNodeId, toList);
  });

  const distances = new Map<string, number>();
  const previous = new Map<string, { nodeId: string; edge: IndoorEdge }>();
  const unvisited = new Set(nodes.map((node) => node.id));

  nodes.forEach((node) => distances.set(node.id, Number.POSITIVE_INFINITY));
  distances.set(startNodeId, 0);

  while (unvisited.size > 0) {
    let currentNodeId: string | undefined;
    let currentDistance = Number.POSITIVE_INFINITY;

    unvisited.forEach((nodeId) => {
      const distance = distances.get(nodeId) ?? Number.POSITIVE_INFINITY;

      if (distance < currentDistance) {
        currentDistance = distance;
        currentNodeId = nodeId;
      }
    });

    if (!currentNodeId || currentDistance === Number.POSITIVE_INFINITY) {
      break;
    }

    if (currentNodeId === endNodeId) {
      break;
    }

    const current = currentNodeId;
    unvisited.delete(current);

    (adjacency.get(current) ?? []).forEach(({ edge, nextNodeId, weight }) => {
      if (!unvisited.has(nextNodeId)) {
        return;
      }

      const nextDistance = currentDistance + weight;

      if (nextDistance < (distances.get(nextNodeId) ?? Number.POSITIVE_INFINITY)) {
        distances.set(nextNodeId, nextDistance);
        previous.set(nextNodeId, { edge, nodeId: current });
      }
    });
  }

  if (!previous.has(endNodeId)) {
    return undefined;
  }

  const routeNodeIds = [endNodeId];
  const routeEdges: IndoorEdge[] = [];
  let cursor = endNodeId;

  while (cursor !== startNodeId) {
    const step = previous.get(cursor);

    if (!step) {
      return undefined;
    }

    routeEdges.unshift(step.edge);
    routeNodeIds.unshift(step.nodeId);
    cursor = step.nodeId;
  }

  const routeNodes = routeNodeIds.flatMap((nodeId) => {
    const node = nodesById.get(nodeId);
    return node ? [node] : [];
  });
  const distance = routeEdges.reduce((total, edge) => total + edge.distance, 0);
  const estimatedTime = Math.max(1, Math.ceil(distance / 85));

  return {
    description: `Percorso calcolato su grafo indoor con ${routeEdges.length} segmenti disponibili.`,
    distance,
    edges: routeEdges,
    estimatedTime,
    nodeIds: routeNodeIds,
    nodes: routeNodes
  };
}

export function buildIndoorPolyline(nodes: IndoorNode[], floorId: string) {
  return nodes
    .filter((node) => node.floorId === floorId)
    .map((node) => `${node.x},${node.y}`)
    .join(' ');
}
