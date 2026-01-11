/**
 * UI and Error Messages
 * Centralized text and message constants
 */

export const messages = {
  // Errors
  error: {
    notFound: 'No encontrado',
    cafeNotFound: 'Café no encontrado',
    invalidRequest: 'Solicitud inválida',
    serverError: 'Error del servidor',
    networkError: 'Error de red',
  },

  // Success
  success: {
    saved: 'Guardado correctamente',
    deleted: 'Eliminado correctamente',
  },

  // Info
  info: {
    loading: 'Cargando...',
    noResults: 'No hay resultados',
    noResultsForFilter: 'No hay cafés con esos filtros',
  },

  // Filters
  filters: {
    allProvinces: 'Todas las provincias',
    allCities: 'Todas las ciudades',
    filterByProvince: 'Filtrar por provincia',
    filterByCity: 'Filtrar por ciudad',
  },

  // Cafe details
  cafe: {
    openingHours: 'Horario de apertura',
    brewMethods: 'Métodos de preparación',
    services: 'Servicios',
    specialties: 'Especialidades',
    hasRoastery: 'Tiene tostadora',
    website: 'Sitio web',
    instagram: 'Instagram',
    facebook: 'Facebook',
  },
} as const;

export type Messages = typeof messages;
