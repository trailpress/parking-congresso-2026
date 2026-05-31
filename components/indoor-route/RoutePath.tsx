import type { IndoorNode } from '@/lib/types';

type RoutePathProps = {
  routeNodes: IndoorNode[];
};

export function RoutePath({ routeNodes }: RoutePathProps) {
  if (routeNodes.length < 2) {
    return null;
  }

  const points = routeNodes.map((node) => `${node.x},${node.y}`).join(' ');

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <polyline
        fill="none"
        points={points}
        stroke="rgba(0, 119, 200, 0.24)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="8"
      />
      <polyline
        fill="none"
        points={points}
        stroke="#0077C8"
        strokeDasharray="2 3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.8"
      />
    </svg>
  );
}
