import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        greenDeep: '#0B332A',
        greenMain: '#123F34',
        sage: '#DDE8DA',
        ivory: '#F8F5EE',
        sand: '#EFE4D2',
        coral: '#D85D3B',
        passRed: '#D71920',
        passPurple: '#7B3FB3',
        passOrange: '#F47C20',
        passYellow: '#FFD400',
        routeBlue: '#0077C8',
        appText: '#1D2A27',
        muted: '#5B625F'
      }
    }
  },
  plugins: []
};

export default config;
