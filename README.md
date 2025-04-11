# cafedex

Bienvenido a **Cafedex**, tu nueva plataforma para encontrar los mejores cafés de España

Un proyecto construido con:

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- 💻 Desarrollado en [VS Code](https://code.visualstudio.com/)
- 🚀 Preparado para producción con Vercel

---

## 🚧 Estado del Proyecto

En desarrollo 🛠️
Consulta la [checklist del proyecto](#) para seguir el progreso.

---

## 🔒 Uso privado

Este repositorio es estrictamente personal. Si llegas aquí por curiosidad, ¡gracias por tu interés! Pero por ahora, no está abierto al público.

## Changelog (April 2025)

### Initial Project Setup and Structure

- Created Next.js project with TypeScript support
- Set up Tailwind CSS for styling
- Implemented project folder structure:
  - /src/app for Next.js 13+ app router
  - /src/components for reusable components
  - /src/data for cafe data and types
  - /src/utils for utility functions
  - /src/lib for external integrations

### Core Features Implementation

1. Homepage Development

   - Created responsive layout with Header and Footer
   - Implemented featured cafes section
   - Added about section

2. Cafe Components

   - Developed CafeCard component for displaying cafe previews
   - Created cafe data structure and types
   - Implemented cafe listing and filtering functionality

3. Data Management

   - Created types.ts for TypeScript interfaces
   - Implemented cafe data structure in /data/cafes
   - Added utility functions for cafe operations (search, filter, random selection)

4. Map Integration

   - Added Map component for cafe locations
   - Integrated Google Places API utilities
   - Created map marker components

5. UI/UX Improvements
   - Implemented dark mode support
   - Added responsive navigation
   - Created loading states and animations

### Localization

- Translated UI to Spanish
  - Updated all component text
  - Localized cafe descriptions and features
  - Translated navigation and footer

### Recent Cleanup

- Removed unused SVG files (file.svg, next.svg, vercel.svg)
- Removed duplicate PostCSS config file (keeping postcss.config.mjs)
- Removed empty styles directory
- Optimized project structure

### Latest Updates (April 11, 2025)

1. Blog System Implementation

   - Created Markdown-based blog system
   - Added 5 initial blog posts about coffee culture and cafes
   - Implemented responsive blog cards
   - Added blog section to homepage showing latest posts
   - Created individual blog post pages with Markdown rendering

2. Enhanced Cafe Listing

   - Added chronological numbering system for cafes
   - Implemented ribbon-style number badges on cafe cards
   - Improved cafe card design and interactions

3. Homepage Improvements

   - Reduced featured cafes to 4 for better focus
   - Implemented responsive blog grid (1/2/3 columns based on screen size)
   - Enhanced overall layout and spacing

4. Content Management
   - Set up /content/blog directory for Markdown posts
   - Added blog images and assets
   - Implemented blog utilities for fetching and sorting posts
