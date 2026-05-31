export type InstructionAction =
  | 'showOnMap'
  | 'routeTo'
  | 'call'
  | 'copyNumber'
  | 'openSource'
  | 'openDiorama';

export type OperationalColor =
  | 'green'
  | 'red'
  | 'purple'
  | 'orange'
  | 'yellow'
  | 'blue'
  | 'sage'
  | 'muted';

export type SourceReference = {
  document: string;
  page?: string | number;
  note?: string;
};

export type Instruction = {
  id: string;
  title: string;
  category: string;
  color?: string;
  icon?: string;
  quickAnswer: string;
  whoDoesWhat: string[];
  whoGoesWhere: string[];
  whoContactsWhom: string[];
  fullInstruction?: string;
  actions?: InstructionAction[];
  source?: SourceReference[];
};

export type Pass = {
  id: string;
  label: string;
  color: OperationalColor;
  destination: string;
  instructionId: string;
};

export type Contact = {
  id: string;
  name: string;
  role: string;
  phone: string;
  publishStatus: 'da confermare' | 'pubblicabile' | 'non pubblicare';
  instructionId?: string;
};

export type Hotspot = {
  id: string;
  label: string;
  targetInstructionId: string;
  type: 'section' | 'pass' | 'map-area' | 'protocol' | 'equipment' | 'contact' | 'diorama';
  bounds?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export type MapArea = {
  id: string;
  label: string;
  type: 'parking' | 'bus' | 'access' | 'pedestrian' | 'service' | 'checkpoint';
  color: OperationalColor;
  instructionId: string;
  status: string;
};

export type DioramaHotspot = {
  id: string;
  label: string;
  targetInstructionId: string;
  type: 'diorama' | 'entrance' | 'level' | 'sector' | 'service';
  level: string;
  x: number;
  y: number;
};

export type IndoorNode = {
  id: string;
  floorId: string;
  name: string;
  type:
    | 'entrance'
    | 'foyer'
    | 'sector'
    | 'stairs'
    | 'elevator'
    | 'service'
    | 'desk'
    | 'corridor'
    | 'suite'
    | 'balcony'
    | 'staff'
    | 'vertical';
  x: number;
  y: number;
  areaId?: string;
  isSelectableAsStart: boolean;
  isSelectableAsDestination: boolean;
};

export type IndoorAccessLevel = 'public' | 'staff' | 'restricted' | 'hospitality';

export type IndoorFloor = {
  id: string;
  name: string;
  level: number;
  label: string;
  sourceReference: SourceReference;
  viewBox: string;
  sortOrder: number;
};

export type IndoorArea = {
  id: string;
  floorId: string;
  name: string;
  type:
    | 'outer-shell'
    | 'bowl'
    | 'parterre'
    | 'tribune'
    | 'foyer'
    | 'balcony'
    | 'corridor'
    | 'public-access'
    | 'staff-access'
    | 'suite'
    | 'vertical-link'
    | 'service';
  accessLevel: IndoorAccessLevel;
  svgPath: string;
  labelPosition: {
    x: number;
    y: number;
  };
  colorToken: string;
  description: string;
  connectedNodeIds: string[];
  instructionId?: string;
  dioramaLayerId?: string;
};

export type IndoorEdge = {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  distance: number;
  mode: 'walk' | 'stairs' | 'elevator' | 'service' | 'threshold';
  accessLevel: IndoorAccessLevel;
  isAccessible: boolean;
  isStaffOnly: boolean;
  via?: string;
};

export type IndoorRoute = {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  nodeIds: string[];
  mode: 'fastest' | 'accessible' | 'avoid-stairs' | 'staff' | 'public';
  estimatedTime: number;
  description: string;
};

export type DioramaLayer = {
  id: string;
  name: string;
  floorId: string;
  areaIds: string[];
  defaultTransform: string;
  explodedTransform: string;
  isExplodable: boolean;
  isRotatable: boolean;
  description: string;
};

export type AppRoute = {
  href: string;
  label: string;
  shortLabel?: string;
  icon?: string;
  isPrimary?: boolean;
};
