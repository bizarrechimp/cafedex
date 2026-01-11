# Config Directory

Centralized application configuration and constants.

## Files

### `app.ts`
General application metadata and configuration.
- App name, description, version
- Pagination defaults
- Cache revalidation times
- Default values (country, language)

### `routes.ts`
Type-safe route definitions.
- Navigation routes
- API endpoint routes
- Route helper functions

**Usage**:
```typescript
import { routes } from '@/config';

// Navigate to cafe detail
const cafeUrl = routes.cafe('alicante-cafedex');

// API endpoint
fetch(routes.api.health);
```

### `ui.ts`
UI-related configuration.
- Theme colors
- Breakpoints
- CSS transitions

## Best Practices

1. **Always export `as const`** - Enables TypeScript literal type inference
2. **Use type exports** - Export the type for IDE support
3. **Centralize magic strings** - Avoid hardcoding values
4. **Document with comments** - Explain why values exist
5. **Keep consistent structure** - Follow established patterns

## Adding New Configuration

When adding new config modules:

1. Create a new file (e.g., `email.config.ts`)
2. Export everything `as const`
3. Add type export
4. Import and re-export from `index.ts`
5. Document in this README

```typescript
// email.config.ts
export const email = {
  from: 'noreply@cafedex.com',
  // ...
} as const;

export type EmailConfig = typeof email;

// index.ts
export * from './email';
```
