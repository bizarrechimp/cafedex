import { Cafe } from '../types';

export const cafe: Cafe = {
  name: "North Star Coffee Shop",
  image: "/cafes/cafe1.jpg",
  city: "Leeds",
  address: "The Boulevard, Leeds Dock, Leeds LS10 1PZ",
  googleMapsUrl: "https://goo.gl/maps/northstar",
  instagramUrl: "https://instagram.com/northstarroast",
  websiteUrl: "https://www.northstarroast.com",
  slug: "north-star-leeds",
  description: "Tostador y café de especialidad con vista al canal en Leeds Dock.",
  rating: 4.7,
  features: ["Café de Especialidad", "Tostador Propio", "Brunch", "Terraza"],
  openingHours: {
    Lunes: "8:00 - 16:00",
    Martes: "8:00 - 16:00",
    Miércoles: "8:00 - 16:00",
    Jueves: "8:00 - 16:00",
    Viernes: "8:00 - 16:00",
    Sábado: "9:00 - 17:00",
    Domingo: "9:00 - 16:00"
  }
};