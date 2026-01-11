# Styles Directory

Centralized styles and CSS configuration.

## Files

### `globals.css`
Global styles applied to the entire application.
- Tailwind CSS directives
- FontAwesome imports
- Responsive utilities
- Generic element styles

### `variables.css`
CSS custom properties (variables) for design tokens.
- Colors (primary, secondary, gray scales)
- Spacing scale
- Border radius
- Transitions and animations
- Shadow definitions

Imported by `globals.css` to make all variables available throughout the app.

## Usage

Import styles in your layout or pages:

```typescript
// src/app/layout.tsx
import '@/styles/globals.css';
```

Use CSS variables in your stylesheets:

```css
color: var(--color-primary);
padding: var(--spacing-lg);
border-radius: var(--radius-md);
transition: all var(--transition-normal);
```

## Best Practices

1. **Use CSS Variables** - Leverage design tokens for consistency
2. **Avoid inline styles** - Keep styles in CSS files or Tailwind
3. **Keep globals minimal** - Only add necessary global styles
4. **Use Tailwind first** - CSS files are for globals and utilities
5. **Dark mode support** - Add `@media (prefers-color-scheme: dark)` for dark mode

## Tailwind Configuration

Tailwind CSS is configured in `tailwind.config.js` at the project root.
Most styling should be done with Tailwind utility classes.
