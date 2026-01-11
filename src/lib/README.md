# Lib Directory - Utilities & Core Logic

This directory contains all business logic, database operations, and utility functions used throughout the application.

## Directory Structure

### `/db`
Database connection, models, and core data access layer.
- `mongodb.ts` - MongoDB connection management
- `cafe.ts` - Mongoose Cafe model schema
- `cafeDb.ts` - Direct database queries (legacy, use cafeService instead)
- `serializers.ts` - Document serialization utilities
- `index.ts` - DB exports

### `/services`
Business logic layer that abstracts database operations.
- `cafeService.ts` - All cafe-related business logic and queries

**Usage**: Prefer importing from `cafeService` instead of direct database access.

```typescript
import { getCafeBySlug, getAllCafes } from '@/lib/services/cafeService';
```

### `/constants`
Application constants and static data.
- `provinces.ts` - Spanish provinces configuration and utilities
- `initial_cafes.json` - Initial cafe seed data
- `scraped_enums.json` - Enumeration values from data scraping

### `/external`
External API integrations and third-party services.
- `googlePlaces.ts` - Google Places API wrapper

### `/searchParams`
URL search parameter utilities.
- `params-helper.ts` - Parameter parsing utilities
- `search-params-helper.ts` - Search-specific parameter handling
- `index.ts` - Consolidated exports

### `/cafe`
Cafe-specific utilities (prefer using `cafeService` instead).
- `cafeUtils.ts` - Legacy cafe utilities

## Best Practices

1. **Always use `cafeService`** for business logic instead of direct database queries
2. **Use serializers** when converting MongoDB documents
3. **External APIs** should be wrapped in their own modules
4. **Constants** should be centralized in `/constants`
5. **Search parameters** should use the helper utilities for consistency

## Adding New Features

When adding a new domain area:
1. Create a service file in `/services` (e.g., `userService.ts`)
2. Create a model in `/db` if needed
3. Add exports to `/lib/index.ts`
4. Document the new service here
