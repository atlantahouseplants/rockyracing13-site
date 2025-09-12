import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rr: {
          black: '#000000',
          gold: '#D4AF37',
          white: '#FFFFFF',
          'neon-green': '#00FF41',
          'electric-blue': '#00BFFF',
          'racing-red': '#FF0040',
          'cyber-purple': '#9D00FF',
          'speed-yellow': '#FFFF00',
        },
      },
      fontFamily: {
        'heading': ['var(--font-bebas-neue)', 'Bebas Neue', 'Anton', 'sans-serif'],
        'body': ['var(--font-inter)', 'Inter', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config