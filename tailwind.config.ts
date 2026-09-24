import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Burgundy is the primary. `light` is a blush tint for soft grounds and
        // hover states, where a wash of the deep tone would be too heavy.
        primary: { DEFAULT: '#7A1F2B', deep: '#5C1620', light: '#F3E1E3' },
        // gold and gold-foil are unchanged. `ink` is the AA-contrast gold for text
        // on light grounds; nudged from #8C6516, which measured 4.45:1 on sand
        // and so missed AA for the 11.5px eyebrows set on it.
        gold: { DEFAULT: '#C9972E', foil: '#E8C36B', ink: '#866014' },
        // Errors sit close to the primary in hue, so `alert` is pulled warmer
        // and brighter to stay readable as an error beside a burgundy button.
        alert: '#A3302A',
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
        primary: '0 14px 26px -12px rgba(92,22,32,.55)',
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
