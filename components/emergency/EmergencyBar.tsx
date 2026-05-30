import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export function EmergencyBar() {
  return (
    <section className="rounded-lg border border-passRed/25 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-passRed text-white">
          <Icon name="alert" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold text-greenDeep">Emergenza</h2>
          <p className="mt-1 text-sm leading-5 text-muted">
            Fermati, avvisa un referente confermato e comunica posizione e necessita&apos;. Numeri
            non pubblicati finche&apos; non approvati.
          </p>
        </div>
      </div>
      <Button className="mt-4 w-full" href="/routes/emergency" variant="emergency">
        Apri emergenza
      </Button>
    </section>
  );
}
