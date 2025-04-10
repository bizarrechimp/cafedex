import { Cafe } from '../types';

export const cafe: Cafe = {
  name: "Foundry Coffee Roasters",
  image: "/cafes/cafe1.jpg",
  city: "Sheffield",
  address: "69 Sellers Wheel, 151 Arundel St, Sheffield S1 2NU",
  googleMapsUrl: "https://goo.gl/maps/foundry",
  instagramUrl: "https://instagram.com/foundrycoffeeroasters",
  websiteUrl: "https://foundrycoffeeroasters.com",
  slug: "foundry-sheffield",
  description: "Tostador de café galardonado y café de especialidad en Sheffield.",
  rating: 4.9,
  features: ["Café de Especialidad", "Tostador Propio", "Cursos de Café", "Venta de Café en Grano"],
  openingHours: {
    Lunes: "8:30 - 17:00",
    Martes: "8:30 - 17:00",
    Miércoles: "8:30 - 17:00",
    Jueves: "8:30 - 17:00",
    Viernes: "8:30 - 17:00",
    Sábado: "10:00 - 17:00",
    Domingo: "10:00 - 16:00"
  }
};