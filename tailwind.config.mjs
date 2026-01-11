import typographyPlugin from '@tailwindcss/typography';
import { heroui } from '@heroui/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
      },
    },
  },
  plugins: [
    typographyPlugin,
    heroui({
      themes: {
        light: {
          colors: {
            primary: '#d97706',
            secondary: '#f59e0b',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
          },
        },
        dark: {
          colors: {
            primary: '#fbbf24',
            secondary: '#f59e0b',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
          },
        },
      },
    }),
  ],
  darkMode: 'class',
}


