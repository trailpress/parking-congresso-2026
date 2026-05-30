import { HomeContent } from '@/components/shell/HomeContent';
import { getInstructionById } from '@/lib/data';
import { routes } from '@/lib/routes';
import type { AppRoute } from '@/lib/types';

const immediatelyCards = [
  {
    title: 'Chi fa cosa',
    text: "Ruoli, compiti e priorita' di servizio.",
    icon: 'users',
    instruction: getInstructionById('ruolo-usciere')
  },
  {
    title: 'Chi va dove',
    text: 'Aree, pass e destinazioni principali.',
    icon: 'map',
    instruction: getInstructionById('mappa-esterna-mock')
  },
  {
    title: 'Chi contatta chi',
    text: 'Referenti e passaggi di coordinamento.',
    icon: 'users',
    instruction: getInstructionById('emergenza-sanitaria')
  }
];

const quickAccessHrefs = [
  '/routes/infographic',
  '/routes/map',
  '/routes/diorama',
  '/routes/indoor-route',
  '/routes/command-chain'
];

const quickRoutes = quickAccessHrefs
  .map((href) => routes.find((route) => route.href === href))
  .filter((route): route is AppRoute => Boolean(route));

const macroAreas = [
  { title: 'Logistica e accessi', color: 'green', icon: 'map' },
  { title: 'Sicurezza ed emergenze', color: 'red', icon: 'alert' },
  { title: 'Equipaggiamento e uniforme', color: 'sage', icon: 'source' },
  { title: 'Comportamento e attitudine', color: 'muted', icon: 'users' },
  { title: 'Organizzazione e catena di comando', color: 'blue', icon: 'layers' }
] as const;

export default function HomePage() {
  return (
    <HomeContent
      immediateCards={immediatelyCards}
      macroAreas={macroAreas}
      quickRoutes={quickRoutes}
    />
  );
}
