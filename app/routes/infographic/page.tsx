import { InteractiveInfographic } from '@/components/infographic/InteractiveInfographic';
import { AppShell } from '@/components/shell/AppShell';

export default function InfographicPage() {
  return (
    <AppShell
      location="Infografica"
      subtitle="Mock navigabile per volontari parcheggio"
      title="Infografica interattiva"
    >
      <InteractiveInfographic />
    </AppShell>
  );
}
