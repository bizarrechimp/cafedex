# Search Parameters Directory

Utilities for handling URL search parameters in Next.js 14+.

## Files

### `helpers.ts`
Consolidated helpers for managing search parameters.

**Key Functions**:
- `getSafeParam()` - Safely await a single parameter
- `getSafeParams()` - Safely await all parameters
- `getSafeSearchParams()` - Safely await all search parameters
- `getSafeSearchParam()` - Get single search parameter safely
- `buildQueryString()` - Create query string from object
- `parseQueryString()` - Parse query string into object
- `updateQueryParam()` - Update/remove specific parameter
- `getActiveFilters()` - Get only non-empty filter values

### `index.ts`
Consolidated exports.

## Usage

```typescript
// In server components with promise-based params
import { getSafeParams, getSafeSearchParams } from '@/lib/searchParams';

export default async function Page({ params, searchParams }) {
  const safeParams = await getSafeParams(params);
  const safeSearch = await getSafeSearchParams(searchParams);
  
  return <div>{safeSearch.state}</div>;
}
```

## Next.js 14+ Parameter Handling

In Next.js 14+, `params` and `searchParams` are promises that need to be awaited:

```typescript
// ❌ Old way (Next.js 13)
export default function Page({ params }) {
  // params.slug is available directly
}

// ✅ New way (Next.js 14+)
export default async function Page({ params }) {
  const safeParams = await getSafeParams(params);
  // safeParams.slug is now safe to use
}
```

## Query String Utilities

```typescript
// Build query string
const qs = buildQueryString({ 
  state: 'alicante', 
  city: 'alicante' 
});
// Result: "state=alicante&city=alicante"

// Parse query string
const params = parseQueryString('?state=alicante&city=alicante');
// Result: { state: 'alicante', city: 'alicante' }

// Update parameter
const newQs = updateQueryParam('state=alicante', 'city', 'valencia');
// Result: "state=alicante&city=valencia"
```

## Filter Management

Get only active (non-empty) filters:

```typescript
const filters = getActiveFilters(searchParams);
// Returns only parameters with truthy values
```
