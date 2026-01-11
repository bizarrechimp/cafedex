# Components Directory

Reusable React components organized by feature and type.

## Directory Structure

### `/layout`
Layout components used in page structure.
- `Header.tsx` - Main navigation header
- `Footer.tsx` - Footer component

**Usage**: Import in layout files and main pages.

```typescript
import { Header, Footer } from '@/components';
```

### `/cafe`
Cafe-specific components.
- `CafeCard.tsx` - Reusable card component for displaying cafe information

**Usage**: Used in listings and featured sections.

```typescript
import { CafeCard } from '@/components';
```

### `/filters`
Filter and state management components.
- `ProvinceFilter.tsx` - Filter by province/state
- `CityFilter.tsx` - Filter by city
- `EnsureStateInUrl.tsx` - Middleware component that ensures state parameter in URL

**Usage**: Used in listing pages with filtering capabilities.

```typescript
import { ProvinceFilter, CityFilter, EnsureStateInUrl } from '@/components';
```

### `/ui`
Generic, reusable UI components.
- `StarRating.tsx` - Star rating display component
- `Switch.tsx` - Toggle switch component

**Usage**: Generic components that can be used anywhere.

```typescript
import { StarRating, Switch } from '@/components/ui';
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
