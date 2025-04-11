"use client";

import CafeCard from '@/components/CafeCard';
import { getAllCafes } from '@/utils/cafeUtils';
import { useState, useEffect } from 'react';
import { Cafe } from '@/data/types';

export default function CafeteriasPage() {
  // Sort cafes by date/id (using slug for now as a temporary solution)
  const allCafes = getAllCafes().sort((a, b) => a.slug.localeCompare(b.slug));
  const [filteredCafes, setFilteredCafes] = useState<Cafe[]>(allCafes);
  const cities = Array.from(new Set(allCafes.map((cafe: Cafe) => cafe.city))).sort();

  useEffect(() => {
    setFilteredCafes(allCafes);
  }, [allCafes]);

  const handleFilter = (city: string) => {
    if (city === 'all') {
      setFilteredCafes(allCafes);
    } else {
      setFilteredCafes(allCafes.filter((cafe: Cafe) => cafe.city === city));
    }
  };

  // Create a mapping of cafe slugs to their original index
  const cafeNumbers = Object.fromEntries(
    allCafes.map((cafe, index) => [cafe.slug, index + 1])
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cafeterías</h1>

      {/* Filter Section */}
      <div className="mb-8">
        <label htmlFor="city-filter" className="block text-lg font-medium mb-2">Filtrar por ciudad:</label>
        <select
          id="city-filter"
          className="border border-gray-300 rounded px-4 py-2"
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="all">Todas</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Cafes Section */}
      <div className="flex flex-wrap justify-center gap-6">
        {filteredCafes.map((cafe: Cafe) => (
          <CafeCard
            key={cafe.slug}
            name={cafe.name}
            image={cafe.image}
            location={cafe.city}
            rating={cafe.rating}
            slug={cafe.slug}
            googleMapsUrl={cafe.googleMapsUrl}
            instagramUrl={cafe.instagramUrl}
            websiteUrl={cafe.websiteUrl}
            number={cafeNumbers[cafe.slug]}
          />
        ))}
      </div>
    </main>
  );
}