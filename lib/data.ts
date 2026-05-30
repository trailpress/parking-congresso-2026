import contacts from '@/data/contacts.json';
import dioramaHotspots from '@/data/dioramaHotspots.json';
import hotspots from '@/data/hotspots.json';
import indoorNodes from '@/data/indoorNodes.json';
import indoorRoutes from '@/data/indoorRoutes.json';
import instructions from '@/data/instructions.json';
import mapAreas from '@/data/mapAreas.json';
import passes from '@/data/passes.json';
import type {
  Contact,
  DioramaHotspot,
  Hotspot,
  IndoorNode,
  IndoorRoute,
  Instruction,
  MapArea,
  Pass
} from './types';

export const appData = {
  contacts: contacts as Contact[],
  dioramaHotspots: dioramaHotspots as DioramaHotspot[],
  hotspots: hotspots as Hotspot[],
  indoorNodes: indoorNodes as IndoorNode[],
  indoorRoutes: indoorRoutes as IndoorRoute[],
  instructions: instructions as Instruction[],
  mapAreas: mapAreas as MapArea[],
  passes: passes as Pass[]
};

export const instructionsById = new Map(
  appData.instructions.map((instruction) => [instruction.id, instruction])
);

export function getInstructionById(id: string): Instruction | undefined {
  return instructionsById.get(id);
}
