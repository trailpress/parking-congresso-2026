import { DioramaView } from '@/components/diorama/DioramaView';
import { AppShell } from '@/components/shell/AppShell';

export default function DioramaPage() {
  return (
    <AppShell
      location="Inalpi Arena"
      subtitle="Modello interno navigabile"
      title="Diorama arena"
    >
      <DioramaView />
    </AppShell>
  );
}
