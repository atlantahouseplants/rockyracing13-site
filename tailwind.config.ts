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
          // Primary colors - clean, professional
          black: '#0A0A0B',
          white: '#FAFAFA',
          gold: '#C9A227',

          // Accent colors - use sparingly
          accent: '#2563EB',
          success: '#059669',
          warning: '#D97706',

          // Gray scale for UI
          gray: {
            900: '#18181B',
            800: '#27272A',
            700: '#3F3F46',
            600: '#52525B',
            500: '#71717A',
            400: '#A1A1AA',
            300: '#D4D4D8',
            200: '#E4E4E7',
            100: '#F4F4F5',
          },
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