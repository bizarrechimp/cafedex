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
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        ui: [
          'var(--font-ui)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
      },
      colors: {
        brand: {
          primary: 'rgb(var(--color-brand-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-brand-secondary) / <alpha-value>)',
          warm: 'rgb(var(--color-brand-warm) / <alpha-value>)',
          beige: 'rgb(var(--color-brand-beige) / <alpha-value>)',
          ink: 'rgb(var(--color-brand-ink) / <alpha-value>)',
          white: 'rgb(var(--color-white) / <alpha-value>)',
        },
        primary: {
          50: 'rgb(var(--color-brand-warm) / <alpha-value>)',
          100: 'rgb(var(--color-brand-beige) / <alpha-value>)',
          200: 'rgb(var(--color-brand-beige) / <alpha-value>)',
          300: 'rgb(var(--color-brand-warm) / <alpha-value>)',
          400: 'rgb(var(--color-brand-secondary) / <alpha-value>)',
          500: 'rgb(var(--color-brand-primary) / <alpha-value>)',
          600: 'rgb(var(--color-brand-primary) / <alpha-value>)',
          700: 'rgb(var(--color-brand-primary) / <alpha-value>)',
          800: 'rgb(var(--color-brand-primary) / <alpha-value>)',
          900: 'rgb(var(--color-brand-primary) / <alpha-value>)',
        },
      },
      fontSize: {
        h1: [
          'var(--font-size-h1)',
          {
            lineHeight: 'var(--line-height-h1)',
            fontWeight: 'var(--font-weight-h1)',
            letterSpacing: 'var(--letter-spacing-h1)',
          },
        ],
        h2: [
          'var(--font-size-h2)',
          {
            lineHeight: 'var(--line-height-h2)',
            fontWeight: 'var(--font-weight-h2)',
          },
        ],
        h3: [
          'var(--font-size-h3)',
          {
            lineHeight: 'var(--line-height-h3)',
            fontWeight: 'var(--font-weight-h3)',
          },
        ],
        h4: [
          'var(--font-size-h4)',
          {
            lineHeight: 'var(--line-height-h4)',
            fontWeight: 'var(--font-weight-h4)',
          },
        ],
        'body-l': [
          'var(--font-size-body-l)',
          {
            lineHeight: 'var(--line-height-body)',
            fontWeight: 'var(--font-weight-body)',
          },
        ],
        'body-m': [
          'var(--font-size-body-m)',
          {
            lineHeight: 'var(--line-height-body)',
            fontWeight: 'var(--font-weight-body)',
          },
        ],
        'body-s': [
          'var(--font-size-body-s)',
          {
            lineHeight: 'var(--line-height-body-s)',
            fontWeight: 'var(--font-weight-body)',
          },
        ],
        'ui-button': [
          'var(--font-size-ui-button)',
          {
            fontWeight: 'var(--font-weight-ui-button)',
            letterSpacing: 'var(--letter-spacing-ui-button)',
          },
        ],
        'ui-label': [
          'var(--font-size-ui-label)',
          {
            fontWeight: 'var(--font-weight-ui-label)',
            letterSpacing: 'var(--letter-spacing-ui-label)',
          },
        ],
        caption: [
          'var(--font-size-caption)',
          {
            fontWeight: 'var(--font-weight-caption)',
          },
        ],
      },
    },
  },
  plugins: [
    typographyPlugin,
    heroui({
      themes: {
        light: {
          colors: {
            primary: '#1B4D3E',
            secondary: '#E6994C',
            success: '#1B4D3E',
            warning: '#E6994C',
            error: '#ef4444',
          },
        },
        dark: {
          colors: {
            primary: '#1B4D3E',
            secondary: '#E6994C',
            success: '#1B4D3E',
            warning: '#E6994C',
            error: '#ef4444',
          },
        },
      },
    }),
  ],
  darkMode: 'class',
}
