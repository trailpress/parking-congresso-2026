import type { AppRoute } from './types';

export const routes: AppRoute[] = [
  { href: '/', label: 'Home operativa', shortLabel: 'Home', icon: 'home', isPrimary: true },
  { href: '/routes/infographic', label: 'Infografica', shortLabel: 'Info', icon: 'grid' },
  { href: '/routes/map', label: 'Mappa', shortLabel: 'Mappa', icon: 'map' },
  { href: '/routes/diorama', label: 'Diorama', shortLabel: 'Arena', icon: 'layers' },
  {
    href: '/routes/indoor-route',
    label: 'Navigazione interna',
    shortLabel: 'Percorsi',
    icon: 'route'
  },
  {
    href: '/routes/emergency',
    label: 'Emergenza',
    shortLabel: 'SOS',
    icon: 'alert',
    isPrimary: true
  },
  {
    href: '/routes/command-chain',
    label: 'Catena di comando',
    shortLabel: 'Comando',
    icon: 'users'
  }
];

export const primaryRoutes = routes.filter((route) => route.isPrimary);
export const bottomNavRoutes = routes.filter((route) =>
  ['/', '/routes/infographic', '/routes/map', '/routes/emergency'].includes(route.href)
);
