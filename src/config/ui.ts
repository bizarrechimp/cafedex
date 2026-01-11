/**
 * UI Configuration
 * Theme colors, breakpoints, and UI constants
 */

export const ui = {
  theme: {
    colors: {
      primary: '#a8704d', // Coffee brown
      secondary: '#e8b9a0', // Latte
      accent: '#f4a460', // Sandy brown
      dark: '#1f1f1f',
      light: '#ffffff',
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
} as const;

export type UIConfig = typeof ui;
