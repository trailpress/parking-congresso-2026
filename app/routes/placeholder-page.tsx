import { AppShell } from '@/components/shell/AppShell';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

type PlaceholderPageProps = {
  title: string;
};

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <AppShell title={title}>
      <Card>
        <p className="text-sm font-medium text-muted">Placeholder V1</p>
        <h2 className="mt-2 text-2xl font-semibold text-greenDeep">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          Sezione predisposta. La feature completa non e&apos; ancora implementata.
        </p>
        <Button className="mt-5 w-full" href="/">
          Torna al workspace
        </Button>
      </Card>
    </AppShell>
  );
}
