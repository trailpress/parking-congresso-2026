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
  label: string;
  level: string;
  x: number;
  y: number;
  type: 'entrance' | 'foyer' | 'sector' | 'stairs' | 'elevator' | 'service' | 'desk' | 'corridor';
  accessible?: boolean;
  instructionId?: string;
};

export type IndoorRoute = {
  id: string;
  from: string;
  to: string;
  nodeIds: string[];
  mode: 'fastest' | 'accessible' | 'avoid-stairs' | 'staff' | 'public';
  estimatedMinutes?: number;
};

export type AppRoute = {
  href: string;
  label: string;
  shortLabel?: string;
  icon?: string;
  isPrimary?: boolean;
};
