# App Directory - Routes & Pages

Next.js 13+ App Router configuration with all page routes and layouts.

## Directory Structure

### Root Level (`/app`)
- `layout.tsx` - Root layout wrapper (HTML + shared head providers)
- `page.tsx` - Redirects to default locale (`/[locale]`)
- `favicon.ico` - Site favicon

### Locale Segment (`/app/[locale]`)
- `layout.tsx` - Locale layout (theme provider + header/footer)
- `page.tsx` - Home page (`/[locale]`)

### `/api`
API routes for backend endpoints.
- `/health` - Health check endpoint for monitoring

**Pattern**: Follow REST conventions for new endpoints.

```
/api/
├── health/
│   └── route.ts
├── cafes/
│   ├── [id]/
│   │   └── route.ts
│   └── route.ts
└── search/
    └── route.ts
```

### `/[locale]/cafe`
Cafe detail page routes.
- `[slug]/page.tsx` - Individual cafe detail page
- `[slug]/loading.tsx` - Loading state for cafe page
- `[slug]/not-found.tsx` - 404 handling
- `error.tsx` - Error boundary for cafe routes

**Usage**: Dynamic route parameter is `slug` (cafe URL slug).

```
/es/cafe/alicante-cafedex → /[locale]/cafe/[slug]/page.tsx
```

### `/[locale]/cafeterias`
Cafe listing and filtering page.
- `page.tsx` - Cafe directory with filters
- `loading.tsx` - Loading state during data fetch
- `error.tsx` - Error boundary

**Features**: Province/city filtering, search parameters in URL.

## Routing Patterns

### Dynamic Routes
Use square brackets for dynamic segments:
- `[slug]` - URL-friendly identifier
- `[id]` - Numeric or UUID identifier

### Special Files
- `layout.tsx` - Layout wrapper for route segment
- `page.tsx` - Route component
- `loading.tsx` - Suspense fallback
- `error.tsx` - Error boundary
- `not-found.tsx` - 404 page

## Search Parameters

The app uses URL search parameters for state management:
- `?state=alicante` - Filter by province
- `?city=alicante` - Filter by city

See `/src/lib/searchParams/` for utilities.

## Adding New Routes

1. Create a new directory following the route structure
2. Add `page.tsx` as the main component
3. Add `layout.tsx` if the route needs custom layout
4. Consider `loading.tsx` and `error.tsx` for better UX
5. Use `generateStaticParams()` for dynamic routes that should be static

## Server Components

By default, components in `/app` are Server Components. Use `'use client'` only when needed for:
- Client-side interactivity
- Browser APIs (localStorage, window, etc.)
- React hooks (useState, useEffect, etc.)

## Data Fetching

Server components can fetch data directly:

```typescript
import { getCafeBySlug } from '@/lib/services/cafeService';

export default async function CafePage({ params }) {
  const cafe = await getCafeBySlug(params.slug);
  // ...
}
```

**Never use** direct `fetch()` in client components for data fetching during initial render. Use API routes instead.
