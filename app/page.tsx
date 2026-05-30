import { EmergencyBar } from '@/components/emergency/EmergencyBar';
import { AppShell } from '@/components/shell/AppShell';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { appData } from '@/lib/data';
import { routes } from '@/lib/routes';

export default function HomePage() {
  const instructionCount = appData.instructions.length;
  const passCount = appData.passes.length;

  return (
    <AppShell>
      <section className="rounded-lg bg-greenDeep px-5 py-6 text-ivory shadow-sm">
        <Badge color="sage">Workspace Agent 0</Badge>
        <h2 className="mt-4 text-2xl font-semibold leading-tight">
          Base architetturale mobile-first
        </h2>
        <p className="mt-3 text-sm leading-6 text-sage">
          Tipi, dati locali, route e componenti comuni sono predisposti per gli agenti paralleli.
        </p>
      </section>

      <EmergencyBar />

      <Card>
        <h2 className="text-base font-semibold text-greenDeep">Stato dati locali</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-ivory p-3">
            <p className="text-2xl font-semibold text-greenDeep">{instructionCount}</p>
            <p className="text-sm text-muted">istruzioni mock</p>
          </div>
          <div className="rounded-lg bg-ivory p-3">
            <p className="text-2xl font-semibold text-greenDeep">{passCount}</p>
            <p className="text-sm text-muted">pass censiti</p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-semibold text-greenDeep">Route predisposte</h2>
        <div className="mt-4 grid gap-3">
          {routes.map((route) => (
            <Button
              className="w-full justify-between"
              href={route.href}
              key={route.href}
              variant={route.href === '/routes/emergency' ? 'emergency' : 'secondary'}
            >
              <span className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4" name={route.icon} />
                {route.label}
              </span>
              <Icon className="h-4 w-4" name="chevron" />
            </Button>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
