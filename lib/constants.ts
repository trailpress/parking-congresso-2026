export const colors = {
  greenDeep: '#0B332A',
  greenMain: '#123F34',
  sage: '#DDE8DA',
  ivory: '#F8F5EE',
  sand: '#EFE4D2',
  coral: '#D85D3B',
  red: '#D71920',
  purple: '#7B3FB3',
  orange: '#F47C20',
  yellow: '#FFD400',
  blue: '#0077C8',
  text: '#1D2A27',
  muted: '#5B625F'
} as const;

export const semanticColors = {
  page: colors.ivory,
  surface: '#FFFFFF',
  surfaceMuted: colors.sage,
  primary: colors.greenDeep,
  primarySoft: colors.greenMain,
  emergency: colors.red,
  focus: colors.blue
} as const;

export const operationalColorClasses = {
  green: 'bg-greenDeep text-ivory border-greenDeep',
  red: 'bg-passRed text-white border-passRed',
  purple: 'bg-passPurple text-white border-passPurple',
  orange: 'bg-passOrange text-white border-passOrange',
  yellow: 'bg-passYellow text-appText border-passYellow',
  blue: 'bg-routeBlue text-white border-routeBlue',
  sage: 'bg-sage text-appText border-sage',
  muted: 'bg-sand text-appText border-sand'
} as const;

export const appMeta = {
  title: 'Felici per sempre 2026',
  subtitle: 'Reparto Parcheggio',
  location: 'Inalpi Arena, Torino',
  placeholder: 'da definire'
} as const;
