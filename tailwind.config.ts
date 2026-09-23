import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        emerald: { DEFAULT: '#0F4C3A', deep: '#0A362A' },
        gold: { DEFAULT: '#C9972E', foil: '#E8C36B', ink: '#8C6516' },
        maroon: '#6B1F2A',
        plum: '#3D1F3D',
        ivory: '#FBF6EE',
        sand: '#F3EBDD',
        well: '#EFE6D8',
        line: { DEFAULT: '#E6DCCB', strong: '#D9CDB8' },
        surface: '#FFFFFF',
        ink: { DEFAULT: '#221A14', body: '#4A3F35', muted: '#6E6154' },
        strike: '#8A7C6D'
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif']
      },
      borderRadius: { btn: '2px', modal: '12px', arch: '50% 50% 0 0 / 30% 30% 0 0' },
      boxShadow: {
        card: '0 18px 36px -18px rgba(34,26,20,.38)',
        primary: '0 14px 26px -12px rgba(10,54,42,.6)',
        badge: '0 18px 36px -16px rgba(0,0,0,.55)',
        icon: '0 6px 16px -8px rgba(34,26,20,.45)',
        drawer: '-24px 0 48px -24px rgba(34,26,20,.35)'
      },
      transitionTimingFunction: { craft: 'cubic-bezier(.22,.61,.36,1)' },
      maxWidth: { shell: '1320px' }
    }
  },
  plugins: []
} satisfies Config;
