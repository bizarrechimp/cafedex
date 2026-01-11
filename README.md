# Cafedex

Una plataforma moderna para descubrir y explorar cafeterías independientes en España.

## 🚀 Stack Tecnológico

- **Frontend**: [Next.js 15](https://nextjs.org/) + [React 19](https://react.dev/) + TypeScript
- **UI Library**: [HERO UI](https://heroui.com/) - Componentes modernos, accesibles y personalizables
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- **Base de Datos**: [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- **Iconos**: [Lucide React](https://lucide.dev/) + [FontAwesome](https://fontawesome.com/)
- **Mapas**: [Google Maps API](https://developers.google.com/maps)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Despliegue**: Preparado para [Vercel](https://vercel.com/)

## 📁 Estructura del Proyecto

```
src/
├── app/                           # Next.js App Router
│   ├── api/                      # API routes
│   │   └── health/              # Health check endpoint
│   ├── cafe/[slug]/             # Página detalle de café
│   ├── cafeterias/              # Listado de cafeterías
│   ├── layout.tsx               # Layout raíz (con ThemeProvider)
│   ├── page.tsx                 # Página de inicio
│   └── globals.css              # Estilos globales (HERO UI)
│
├── providers/                    # Proveedores de contexto
│   └── ThemeProvider.tsx        # Gestor de temas light/dark
│
├── components/                   # Componentes React (Basados en HERO UI)
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx          # Navegación principal (Navbar HERO)
│   │   └── Footer.tsx          # Footer (con Divider HERO)
│   ├── cafe/                    # Componentes relacionados con cafés
│   │   └── CafeCard.tsx        # Tarjeta de café (Card + Badge HERO)
│   ├── filters/                 # Componentes de filtrado
│   │   ├── CityFilter.tsx      # Filtro por ciudad (Select HERO)
│   │   ├── ProvinceFilter.tsx  # Filtro por provincia (Select HERO)
│   │   └── EnsureStateInUrl.tsx # Middleware de state
│   └── ui/                      # Componentes genéricos UI
│       ├── StarRating.tsx      # Puntuación de estrellas (con Tooltip HERO)
│       └── Switch.tsx          # Toggle switch (Switch HERO)
│
├── types/                        # Definiciones TypeScript
│   └── cafe.ts                  # Tipos de cafeterías
│
├── lib/                         # Librerías y utilidades
│   ├── db/                      # Base de datos
│   ├── constants/               # Constantes y datos estáticos
│   ├── external/                # Integraciones externas
│   ├── cafe/                    # Lógica de negocio de cafés
│   └── searchParams/            # Utilidades de parámetros URL
│
├── scripts/                     # Scripts de utilidad
│   └── seed-db.ts             # Script de seed de base de datos
│
├── constants/                   # Constantes de aplicación
│
├── styles/                      # Estilos globales
│   ├── globals.css            # Estilos base + HERO UI
│   └── variables.css          # Variables CSS personalizadas
│
└── __tests__/                  # Tests unitarios
```

## 🎨 Sistema de Temas

### Características del Tema

- **Automático**: Detecta las preferencias del sistema (light/dark)
- **Manual**: Switch de tema en el header
- **Persistente**: Se guarda en `localStorage`
- **Suave**: Transiciones animadas entre temas
- **Global**: Disponible en todos los componentes vía `useTheme()`

### Colores Principales

| Elemento | Light | Dark |
|----------|-------|------|
| Primary | Amber-600 (#d97706) | Amber-300 (#fbbf24) |
| Secondary | Amber-500 (#f59e0b) | Amber-500 (#f59e0b) |
| Success | Green-500 (#10b981) | Green-500 (#10b981) |
| Warning | Amber-500 (#f59e0b) | Amber-500 (#f59e0b) |
| Error | Red-500 (#ef4444) | Red-500 (#ef4444) |

### Usar el Tema en Componentes

```typescript
'use client';

import { useTheme } from '@/providers/ThemeProvider';

export default function MyComponent() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <div className="bg-white dark:bg-slate-900">
      {isDarkMode ? '🌙 Dark' : '☀️ Light'}
    </div>
  );
}
```

## 🛠️ Instalación y Setup

### Requisitos Previos
- Node.js 18+
- npm o pnpm
- MongoDB Atlas (o instancia local)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/bizarrechimp/cafedex.git
   cd cafedex
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crear un archivo `.env.local` en la raíz del proyecto:
   ```env
   # MongoDB
   MONGODB_URI=your_mongodb_connection_string

   # Google Maps API
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

   # Google Places API
   GOOGLE_PLACES_API_KEY=your_google_places_api_key
   ```

4. **Inicializar la base de datos**
   ```bash
   npm run seed
   ```

5. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`

## 📚 Comandos Disponibles

| Comando | Descripción |
|---------|------------|
| `npm run dev` | Inicia el servidor de desarrollo (localhost:3000) |
| `npm run build` | Compila el proyecto para producción |
| `npm start` | Inicia el servidor de producción |
| `npm run lint` | Ejecuta eslint y typescript |
| `npm run lint:fix` | Corrige problemas de linting automáticamente |
| `npm run seed` | Inicializa la base de datos con datos iniciales |
| `npm run clean` | Limpia la carpeta .next |

## 🎨 Características Principales

### Página de Inicio
- Listado destacado de cafeterías con tarjetas HERO UI
- Interfaz limpia y moderna con temas adaptables
- Diseño 100% responsive

### Directorio de Cafeterías
- Listado completo de cafeterías
- Filtros por provincia y ciudad (Select HERO UI)
- Búsqueda y ordenamiento
- Paginación
- Soporte para light/dark mode

### Página Detalle de Café
- Información completa del café
- Galería de imágenes
- Mapa de ubicación (Google Maps)
- Horario de apertura
- Enlaces a redes sociales
- Puntuación con estrellas (StarRating HERO)

### Funcionalidades Técnicas
- **Caché**: React cache para queries críticas
- **Revalidación**: Revalidación automática de datos en build
- **Búsqueda por parámetros URL**: Sistema robusto de state en URL
- **Temas**: Soporte completo para modo oscuro/claro
- **Responsive**: Optimizado para móvil, tablet y desktop
- **Accesibilidad**: Componentes HERO UI con ARIA labels y keyboard support

## 🏗️ Arquitectura de Datos

### Modelo de Café
```typescript
interface Cafe {
  _id?: string;
  id: string;                          // Hash determinista
  name: string;                        // Nombre del café
  description: string;                 // Descripción
  slug: string;                        // URL-friendly identifier
  city: string;
  state: string;                       // Provincia
  country: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  specialty_features: {
    brew_methods: string[];            // Métodos de preparación
    roastery: boolean;                 // Tiene tostadería
    beans_origin: string[];            // Origen de granos
    opening_hours: { [day: string]: string };
    services: string[];                // Servicios oferecidos
    serving: string[];                 // Bebidas/Comida
  };
  source: {
    origin: string;                    // Origen de datos
    curated: boolean;                  // Verificado manualmente
  };
  published: boolean;
  featured: boolean;                   // Destacado en home
  rrss: {
    instagram: string;
    website: string;
    facebook: string;
  };
  image: string;
  rating?: number;                     // 0-5 estrellas
  lastUpdated: string;
  createdAt?: Date;
  updatedAt?: Date;
}
```

## 🔄 Flujo de Datos

1. **Client**: El usuario interactúa con componentes React
2. **URL Search Params**: State se mantiene en la URL (`?state=alicante&city=alicante`)
3. **Server Components**: Fetching de datos en el servidor
4. **React Cache**: Deduplicación automática de requests
5. **MongoDB**: Persistencia de datos
6. **Revalidation**: Regeneración de páginas estáticas según configuración

## 📖 Documentación Adicional

- [HERO UI Setup](./HERO_UI_SETUP.md) - Configuración detallada de temas y componentes HERO UI
- [Components README](./src/components/README.md) - Documentación de componentes individuales

## 🚀 Despliegue

### Preparación para Producción

1. **Verificar variables de entorno** en tu proveedor de hosting
2. **Ejecutar build local** para verificar:
   ```bash
   npm run build
   ```
3. **Conectar repositorio** a Vercel
4. **Configurar variables** en el dashboard de Vercel
5. **Desplegar**: El proyecto se despliega automáticamente en push a main

## 📝 Licencia

Este repositorio es privado y de uso personal. Se mantiene con fines educativos y experimentales.

## 👤 Autor

**bizarrechimp** - Desarrollo y mantenimiento del proyecto

---

⭐ Si encuentras este proyecto interesante, ¡siéntete libre de visitarlo!

