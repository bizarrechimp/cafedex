# Types Directory

TypeScript type definitions and interfaces used throughout the application.

## Files

### `cafe.ts`
All cafe-related types and interfaces.

```typescript
interface Cafe {
  _id?: string;
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  // ... see file for complete definition
}
```

### `index.ts`
Centralized exports for all types.

## Usage

Import types from `@/types`:

```typescript
import type { Cafe } from '@/types';
// or
import { Cafe } from '@/types/cafe';
```

## Adding New Types

When creating a new domain area:

1. Create a new file (e.g., `user.ts`, `review.ts`)
2. Export from `index.ts`
3. Use proper TypeScript conventions
4. Add JSDoc comments for complex types

```typescript
// user.ts
export interface User {
  id: string;
  email: string;
  // ...
}

// index.ts
export type { Cafe } from './cafe';
export type { User } from './user';
```

## Type Safety Best Practices

1. **Always export as `type`** for type-only exports
2. **Use interfaces** for objects that will be extended
3. **Use types** for unions, tuples, and primitives
4. **Document complex types** with JSDoc comments
5. **Avoid `any`** - use proper typing instead
