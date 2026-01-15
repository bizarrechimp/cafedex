/**
 * Mock Cafes for testing
 */

import { Cafe } from '@/types/cafe';

export const mockCafes: Cafe[] = [
  {
    id: 'mock-001',
    i18n: {
      es: { name: 'Café Test 1', description: 'Un excelente café para probar' },
      en: { name: 'Cafe Test 1', description: 'A great cafe to try' },
    },
    slug: 'cafe-test-1',
    city: 'Alicante',
    state: 'Alicante',
    country: 'Spain',
    location: {
      lat: 38.3454,
      lng: -0.481,
      address: 'Calle Test 1, Alicante',
    },
    specialty_features: {
      brew_methods: ['espresso', 'v60'],
      roastery: true,
      beans_origin: ['Colombia'],
      opening_hours: { mon: '08:00-18:00' },
      services: ['free_wifi'],
      serving: ['breakfast'],
    },
    source: {
      origin: 'test',
      curated: true,
    },
    published: true,
    featured: true,
    rrss: {
      instagram: '@cafetest1',
      website: 'https://cafetest1.com',
      facebook: 'cafetest1',
    },
    image: 'https://example.com/cafe1.jpg',
    rating: 4.5,
    lastUpdated: new Date().toISOString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'mock-002',
    i18n: {
      es: { name: 'Café Test 2', description: 'Otro café para pruebas' },
      en: { name: 'Cafe Test 2', description: 'Another cafe for tests' },
    },
    slug: 'cafe-test-2',
    city: 'Alicante',
    state: 'Alicante',
    country: 'Spain',
    location: {
      lat: 38.3456,
      lng: -0.482,
      address: 'Calle Test 2, Alicante',
    },
    specialty_features: {
      brew_methods: ['espresso'],
      roastery: false,
      beans_origin: ['Ethiopia'],
      opening_hours: { mon: '09:00-17:00' },
      services: ['free_wifi', 'outdoor_seating'],
      serving: ['breakfast', 'lunch'],
    },
    source: {
      origin: 'test',
      curated: false,
    },
    published: true,
    featured: false,
    rrss: {
      instagram: '@cafetest2',
      website: '',
      facebook: '',
    },
    image: '',
    rating: 3.8,
    lastUpdated: new Date().toISOString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockCafe: Cafe = mockCafes[0];
