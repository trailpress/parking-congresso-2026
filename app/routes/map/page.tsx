import { ExternalMapMock } from '@/components/map/ExternalMapMock';
import { AppShell } from '@/components/shell/AppShell';

export default function MapPage() {
  return (
    <AppShell
      location="Logistica esterna"
      subtitle="Mappa operativa"
      title="Mappa parcheggi"
    >
      <ExternalMapMock />
    </AppShell>
  );
}
