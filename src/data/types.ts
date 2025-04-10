export interface Cafe {
  name: string;           // Nombre de la cafetería
  image: string;          // Ruta de la imagen
  city: string;          // Ciudad donde se encuentra
  address: string;       // Dirección completa
  googleMapsUrl?: string; // URL de Google Maps
  instagramUrl?: string;  // URL del perfil de Instagram
  websiteUrl?: string;    // URL del sitio web
  slug: string;          // Identificador único para URLs
  rating?: number;       // Calificación (opcional)
  features?: string[];   // Características de la cafetería
  openingHours?: {       // Horario de apertura
    [key: string]: string;
  };
  description?: string;  // Descripción de la cafetería
  lastUpdated?: string;  // Última actualización de la información
}