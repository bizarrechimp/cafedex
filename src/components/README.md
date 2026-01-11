# Components Directory

Reusable React components built with **HERO UI** - a modern, accessible, and customizable UI library.

## Overview

All components in this directory are built on top of [HERO UI](https://heroui.com/), ensuring consistency, accessibility, and a polished user experience. The design system supports both light and dark modes seamlessly.

## Directory Structure

### `/layout`
Layout components used in page structure.
- **`Header.tsx`** - Main navigation header with theme toggle
  - Built with: `@heroui/react` Navbar
  - Features: Responsive mobile menu, theme switcher, navigation links
  
- **`Footer.tsx`** - Footer component with social links
  - Built with: `@heroui/react` Divider
  - Features: Social media links, quick links, copyright info

**Usage**: 
```typescript
import { Header, Footer } from '@/components';
```

### `/cafe`
Cafe-specific components.
- **`CafeCard.tsx`** - Reusable card component for displaying cafe information
  - Built with: `@heroui/react` Card, Button, Tooltip, Badge
  - Features: Image gallery, star ratings, action buttons, hover effects
  - Responsive and accessible

**Usage**:
```typescript
import { CafeCard } from '@/components';

<CafeCard 
  cafe={cafeData} 
  number={1} 
  hideMeta={false} 
/>
```

### `/filters`
Filter and state management components.
- **`ProvinceFilter.tsx`** - Filter by province/state
  - Built with: `@heroui/react` Select
  - Features: Dropdown with provinces, URL state management
  
- **`CityFilter.tsx`** - Filter by city
  - Built with: `@heroui/react` Select
  - Features: Dynamic city options, URL state management
  
- **`EnsureStateInUrl.tsx`** - Middleware component that ensures state parameter in URL

**Usage**:
```typescript
import { ProvinceFilter, CityFilter } from '@/components';

<ProvinceFilter selectedState="Alicante" />
<CityFilter cities={cities} selectedCity="Valencia" />
```

### `/ui`
Generic, reusable UI components.
- **`StarRating.tsx`** - Star rating display component
  - Built with: `@heroui/react` Tooltip + Lucide React icons
  - Features: Customizable max stars, half-star support, tooltips
  - Props: `rating`, `maxStars`, `showTooltip`
  
- **`Switch.tsx`** - Toggle switch component for theme switching
  - Built with: `@heroui/react` Switch + Lucide React icons
  - Features: Sun/Moon icons, smooth animations, accessibility
  - Props: `isDarkMode`, `onToggle`

**Usage**:
```typescript
import { StarRating, Switch } from '@/components/ui';

<StarRating rating={4.5} maxStars={5} showTooltip={true} />
<Switch isDarkMode={isDarkMode} onToggle={handleThemeChange} />
```

## Theme System

### Global Theme Configuration

The application uses a centralized theme provider (`ThemeProvider`) that manages both light and dark modes:

- **Location**: `src/providers/ThemeProvider.tsx`
- **Features**: 
  - Automatic theme detection (system preference or localStorage)
  - Smooth theme transitions
  - Context API for global access
  - HydrationWarning fix

### Theme Customization

Colors are configured in `tailwind.config.mjs`:

```javascript
heroui({
  themes: {
    light: {
      colors: {
        primary: '#d97706',      // Amber-600
        secondary: '#f59e0b',    // Amber-500
        success: '#10b981',      // Green
        warning: '#f59e0b',      // Amber
        error: '#ef4444',        // Red
      },
    },
    dark: {
      colors: {
        primary: '#fbbf24',      // Amber-300
        secondary: '#f59e0b',    // Amber-500
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
    },
  },
})
```

### Using Theme Colors

Components automatically respect the current theme. To access theme context in components:

```typescript
'use client';

import { useTheme } from '@/providers/ThemeProvider';

export default function MyComponent() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>{isDarkMode ? '🌙 Dark' : '☀️ Light'}</p>
      <button onClick={() => toggleTheme(!isDarkMode)}>
        Toggle Theme
      </button>
    </div>
  );
}
```

## Component Styling

### Tailwind CSS + HERO UI

All components use:
- **Tailwind CSS v4+** for utility-first styling
- **HERO UI components** for pre-built, accessible UI elements
- **Dark mode support** via `dark:` prefix in Tailwind

### Custom Styling

Example of a styled component:

```typescript
import { Card, Button } from '@heroui/react';

export default function StyledCard() {
  return (
    <Card className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800">
      <Button
        color="warning"
        variant="flat"
        className="font-semibold"
      >
        Action
      </Button>
    </Card>
  );
}
```

## Accessibility

All HERO UI components come with built-in accessibility features:
- ARIA labels and attributes
- Keyboard navigation support
- Focus management
- High contrast mode support

When building custom components, ensure:
```typescript
<select aria-label="Filter options">
  {/* options */}
</select>

<button aria-label="Open menu">Menu</button>

<img alt="Descriptive text" src="..." />
```

## Import Patterns

### From Index
```typescript
import { Header, Footer, CafeCard, StarRating, Switch } from '@/components';
```

### From Subdirectories
```typescript
import Header from '@/components/layout/Header';
import StarRating from '@/components/ui/StarRating';
import ProvinceFilter from '@/components/filters/ProvinceFilter';
```

## HERO UI Resources

- [HERO UI Documentation](https://heroui.com/)
- [Component Gallery](https://heroui.com/docs/components)
- [Customization Guide](https://heroui.com/docs/customization)
- [Theming](https://heroui.com/docs/themes)

## Adding New Components

1. Create component file in appropriate subdirectory
2. Use HERO UI components as base
3. Add dark mode support with `dark:` classes
4. Export from `index.ts`
5. Update this README

Example:
```typescript
'use client';

import { Button } from '@heroui/react';

interface MyComponentProps {
  label: string;
}

export default function MyComponent({ label }: MyComponentProps) {
  return (
    <Button
      color="warning"
      className="bg-white dark:bg-slate-800"
    >
      {label}
    </Button>
  );
}
```


## Component Guidelines

1. **Use `'use client'` sparingly** - Prefer server components when possible
2. **Props should be typed** - Always define TypeScript interfaces
3. **Components should be modular** - Single responsibility principle
4. **Use the index.ts** - Import from `@/components` for convenience
5. **Naming conventions** - PascalCase for component files

## Component Exports

All components are exported from `index.ts` for convenience:

```typescript
export { Header, Footer } from './layout';
export { CafeCard } from './cafe';
export { ProvinceFilter, CityFilter, EnsureStateInUrl } from './filters';
export { StarRating, Switch } from './ui';
```

## Adding New Components

1. Create a directory if organizing by feature
2. Create the component file with `.tsx` extension
3. Add export to `index.ts`
4. Create a comment block explaining usage
5. Document in this README if it's a major component
