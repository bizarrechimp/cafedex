#!/usr/bin/env node

import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { BlogPost } from '../lib/models/blogpost';

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

// At this point TypeScript knows MONGODB_URI is defined
const uri: string = MONGODB_URI;

async function seed() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    // Clean up existing data
    await BlogPost.deleteMany({});
    console.log('Cleaned up existing blog posts');

    const blogPosts = [
      {
        title: "Las Mejores Cafeterías de Madrid para Trabajar Remotamente",
        slug: "mejores-cafeterias-madrid-trabajo-remoto",
        excerpt: "Descubre los mejores lugares en Madrid donde puedes disfrutar de un buen café mientras trabajas. Analizamos el wifi, los enchufes disponibles y el ambiente de trabajo.",
        content: `En los últimos años, el trabajo remoto se ha convertido en una realidad para muchos profesionales, y encontrar el lugar perfecto para trabajar fuera de casa puede marcar la diferencia en nuestra productividad y bienestar.

Madrid, con su vibrante cultura cafetera, ofrece numerosos espacios que combinan café de calidad con un ambiente propicio para el trabajo.

## Factores Importantes

- Calidad del WiFi
- Disponibilidad de enchufes
- Ambiente de trabajo
- Calidad del café
- Horario extendido

## Nuestras Recomendaciones

### 1. Café de la Luz
- Ubicación: Barrio de Malasaña
- Destacado por: Su tranquilo patio interior
- WiFi: Fibra óptica estable

### 2. La Bicicleta
- Ubicación: Plaza de San Ildefonso
- Destacado por: Ambiente acogedor
- Extras: Múltiples enchufes disponibles`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const result = await BlogPost.insertMany(blogPosts);
    console.log(`Successfully seeded ${result.length} blog posts`);

    await mongoose.disconnect();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run the seed function
seed();