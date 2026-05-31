import type { IndoorArea, IndoorFloor, IndoorNode } from '@/lib/types';
import { buildIndoorPolyline } from '@/components/indoor-route/routeGraph';

type IndoorMapSvgProps = {
  areas: IndoorArea[];
  destinationId: string;
  floor: IndoorFloor;
  nodes: IndoorNode[];
  originId: string;
  routeNodes: IndoorNode[];
  selectedAreaId?: string;
  onAreaSelect: (area: IndoorArea) => void;
  onNodeSelect: (nodeId: string) => void;
};

const areaColors: Record<string, { fill: string; stroke: string; text: string }> = {
  balcony: { fill: '#d8e6d7', stroke: '#7f9b88', text: '#123f34' },
  corridor: { fill: '#f5f0e5', stroke: '#cbbfaa', text: '#5b625f' },
  foyer: { fill: '#e5eddc', stroke: '#8fa47c', text: '#123f34' },
  parterre: { fill: '#dfe7df', stroke: '#607d66', text: '#0b332a' },
  shell: { fill: '#f8f5ee', stroke: '#0b332a', text: '#0b332a' },
  staff: { fill: '#ebe3ed', stroke: '#8d7196', text: '#4d2f57' },
  suite: { fill: '#efe4d2', stroke: '#a9926e', text: '#4d422f' },
  tribune: { fill: '#ecf2e8', stroke: '#98aa93', text: '#123f34' },
  vertical: { fill: '#f1e6df', stroke: '#b77e68', text: '#6a3929' },
  verticalAccessible: { fill: '#e4edf2', stroke: '#6991a5', text: '#244f61' }
};

const nodeColorByType: Record<IndoorNode['type'], string> = {
  balcony: '#3c6f52',
  corridor: '#6f746f',
  desk: '#7f9b88',
  elevator: '#386d82',
  entrance: '#0b332a',
  foyer: '#557a5a',
  sector: '#7b7656',
  service: '#7b5b82',
  staff: '#5f3a66',
  stairs: '#92513d',
  suite: '#806842',
  vertical: '#92513d'
};

function routeContainsNode(routeNodes: IndoorNode[], nodeId: string) {
  return routeNodes.some((node) => node.id === nodeId);
}

export function IndoorMapSvg({
  areas,
  destinationId,
  floor,
  nodes,
  originId,
  routeNodes,
  selectedAreaId,
  onAreaSelect,
  onNodeSelect
}: IndoorMapSvgProps) {
  const floorAreas = areas.filter((area) => area.floorId === floor.id);
  const floorNodes = nodes.filter((node) => node.floorId === floor.id);
  const routePolyline = buildIndoorPolyline(routeNodes, floor.id);

  return (
    <div className="overflow-hidden rounded-lg border border-sage bg-[#f6f2e9]">
      <svg
        aria-label={`Planimetria indoor ${floor.name}`}
        className="block h-auto w-full"
        role="img"
        viewBox={floor.viewBox}
      >
        <defs>
          <filter id="indoor-soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" floodColor="#0b332a" floodOpacity="0.08" stdDeviation="10" />
          </filter>
          <pattern id="indoor-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="#d8ddcf" strokeOpacity="0.38" strokeWidth="1" />
          </pattern>
        </defs>

        <rect fill="url(#indoor-grid)" height="700" width="1000" />

        {floorAreas.map((area) => {
          const colors = areaColors[area.colorToken] ?? areaColors.corridor;
          const isSelected = area.id === selectedAreaId;

          return (
            <g key={area.id}>
              <path
                aria-label={area.name}
                d={area.svgPath}
                fill={colors.fill}
                fillRule="evenodd"
                filter={area.type === 'outer-shell' ? 'url(#indoor-soft-shadow)' : undefined}
                onClick={() => onAreaSelect(area)}
                role="button"
                stroke={isSelected ? '#0077c8' : colors.stroke}
                strokeLinejoin="round"
                strokeWidth={isSelected ? 5 : 2}
                tabIndex={0}
                className="cursor-pointer transition"
              />
              <text
                fill={colors.text}
                fontSize={area.type === 'outer-shell' ? 15 : 13}
                fontWeight={area.type === 'outer-shell' ? 700 : 650}
                pointerEvents="none"
                textAnchor="middle"
                x={area.labelPosition.x}
                y={area.labelPosition.y}
              >
                {area.name}
              </text>
            </g>
          );
        })}

        {routePolyline ? (
          <g aria-label="Percorso calcolato" pointerEvents="none">
            <polyline
              fill="none"
              points={routePolyline}
              stroke="#0b332a"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.18"
              strokeWidth="18"
            />
            <polyline
              fill="none"
              points={routePolyline}
              stroke="#0077c8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="5"
            />
          </g>
        ) : null}

        {floorNodes.map((node) => {
          const isOrigin = node.id === originId;
          const isDestination = node.id === destinationId;
          const isRouteNode = routeContainsNode(routeNodes, node.id);
          const radius = isOrigin || isDestination ? 12 : isRouteNode ? 7 : 5;

          return (
            <g
              aria-label={`Seleziona ${node.name}`}
              className="cursor-pointer"
              key={node.id}
              onClick={() => onNodeSelect(node.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  onNodeSelect(node.id);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <circle
                cx={node.x}
                cy={node.y}
                fill={isOrigin || isDestination ? '#0077c8' : nodeColorByType[node.type]}
                r={radius}
                stroke="#ffffff"
                strokeWidth="3"
              />
              {isOrigin || isDestination ? (
                <text
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="800"
                  pointerEvents="none"
                  textAnchor="middle"
                  x={node.x}
                  y={node.y + 4}
                >
                  {isOrigin ? 'A' : 'B'}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
