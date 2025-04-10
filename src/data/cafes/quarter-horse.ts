import { Cafe } from '../types';

export const cafe: Cafe = {
  name: "Quarter Horse Coffee",
  image: "/cafes/cafe1.jpg",
  city: "Birmingham",
  address: "88-90 Bristol St, Birmingham B5 7AH",
  googleMapsUrl: "https://goo.gl/maps/quarterhorse",
  instagramUrl: "https://instagram.com/quarterhorsecoffee",
  websiteUrl: "https://www.quarterhorsecoffee.com",
  slug: "quarter-horse-birmingham",
  description: "Tostador de café artesanal y café de especialidad en Birmingham.",
  rating: 4.8,
  features: ["Café de Especialidad", "Tostador Propio", "Dulces Artesanales", "Cursos de Café"],
  openingHours: {
    Lunes: "8:00 - 17:00",
    Martes: "8:00 - 17:00",
    Miércoles: "8:00 - 17:00",
    Jueves: "8:00 - 17:00",
    Viernes: "8:00 - 17:00",
    Sábado: "9:00 - 17:00",
    Domingo: "10:00 - 16:00"
  }
};