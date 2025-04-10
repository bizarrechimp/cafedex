import { Cafe } from '../types';

export const cafe: Cafe = {
  name: "Laynes Espresso",
  image: "/cafes/cafe1.jpg",
  city: "Leeds",
  address: "16 New Station St, Leeds LS1 5DL",
  googleMapsUrl: "https://goo.gl/maps/laynes",
  instagramUrl: "https://instagram.com/laynesespresso",
  websiteUrl: "https://laynesespresso.co.uk",
  slug: "laynes-leeds",
  description: "Café de especialidad pionero en Leeds, conocido por su excelente café y servicio experto.",
  rating: 4.8,
  features: ["Café de Especialidad", "Brunch", "Wifi", "Para Llevar"],
  openingHours: {
    Lunes: "7:30 - 18:00",
    Martes: "7:30 - 18:00",
    Miércoles: "7:30 - 18:00",
    Jueves: "7:30 - 18:00",
    Viernes: "7:30 - 18:00",
    Sábado: "8:30 - 18:00",
    Domingo: "9:30 - 17:00"
  }
};