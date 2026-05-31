import { IndoorRoutePlanner } from '@/components/indoor-route/IndoorRoutePlanner';
import { appData } from '@/lib/data';

export default function IndoorRoutePage() {
  return (
    <IndoorRoutePlanner
      indoorAreas={appData.indoorAreas}
      indoorEdges={appData.indoorEdges}
      indoorFloors={appData.indoorFloors}
      indoorNodes={appData.indoorNodes}
      indoorRoutes={appData.indoorRoutes}
    />
  );
}
