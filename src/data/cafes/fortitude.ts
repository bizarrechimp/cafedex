import { Cafe } from '../types';

export const cafe: Cafe = {
  name: "Fortitude",
  image: "/cafes/cafe1.jpg",
  city: "Edinburgh",
  address: "3C York Pl, Edinburgh EH1 3EB",
  googleMapsUrl: "https://goo.gl/maps/fortitude",
  instagramUrl: "https://instagram.com/fortitudecoffee",
  websiteUrl: "https://www.fortitudecoffee.com",
  slug: "fortitude-edinburgh",
  description: "Un acogedor espacio en el corazón de Edimburgo que sirve café de especialidad tostado localmente.",
  rating: 4.9,
  features: ["Café de Especialidad", "Pastelería Artesanal", "Venta de Café en Grano"],
  openingHours: {
    Lunes: "8:00 - 17:00",
    Martes: "8:00 - 17:00",
    Miércoles: "8:00 - 17:00",
    Jueves: "8:00 - 17:00",
    Viernes: "8:00 - 17:00",
    Sábado: "9:00 - 17:00",
    Domingo: "9:00 - 16:00"
  }
};