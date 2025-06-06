# cafedex

Bienvenido a **Cafedex**, tu nueva plataforma para encontrar los mejores cafés de España

Un proyecto construido con:

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/) para la base de datos
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

### Latest Updates (April 12, 2025)

5. UI/UX Refinements

   - Enhanced CafeCard hover effects with improved scale animation
   - Fixed shadow clipping issues in card containers
   - Optimized padding in cafe sections for better visual presentation
   - Improved responsive layout spacing in both homepage and cafeterias page

### Latest Updates (April 26, 2025)

1. MongoDB Integration

   - Successfully integrated MongoDB Atlas as the database backend
   - Implemented robust error handling and connection management
   - Created health check endpoint for monitoring database status
   - Set up proper environment configuration for database access

2. Data Architecture Improvements

   - Migrated from static data to dynamic MongoDB collections
   - Implemented caching for database queries using React cache
   - Enhanced getFeaturedCafes to intelligently fall back to top-rated cafes
   - Optimized database queries with proper sorting and limiting

3. UI Enhancements

   - Removed placeholder "coming soon" banner in favor of real cafe data
   - Ensured smooth transition from static to dynamic data display
   - Maintained responsive design across all viewport sizes
   - Improved error handling and loading states

4. Performance Optimizations
   - Added connection pooling for MongoDB
   - Implemented proper error boundaries for database operations
   - Optimized database queries with appropriate indexes
   - Enhanced error reporting for better debugging

### Latest Updates (April 27, 2025)

1. Cafe Location Refactor

   - Refactored cafe data model to use separate `city` and `country` fields instead of a combined `location` field.
   - Updated all components, pages, and TypeScript types to support the new structure.
   - Adjusted MongoDB data to match the new schema for all cafes.
   - Improved display of city and country throughout the UI for clarity and future internationalization.

2. Codebase Consistency
   - Ensured all usages of cafe location are now using the new `city` and `country` fields.
   - Committed and pushed all changes to the main branch.
