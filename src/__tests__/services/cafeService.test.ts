/**
 * @jest-environment node
 * Cafe Service Tests
 */

import { mockCafes } from '../fixtures/mockCafes';
import { filterByCity, filterByState, applyFilters } from '@/lib/filters';

describe('cafeService', () => {
  describe('filterByCity', () => {
    it('should filter cafes by city', () => {
      const result = filterByCity(mockCafes, 'Alicante');
      expect(result).toHaveLength(2);
      expect(result.every((c) => c.city === 'Alicante')).toBe(true);
    });

    it('should return all cafes if city is "all"', () => {
      const result = filterByCity(mockCafes, 'all');
      expect(result).toEqual(mockCafes);
    });

    it('should return empty array if city does not match', () => {
      const result = filterByCity(mockCafes, 'Madrid');
      expect(result).toHaveLength(0);
    });
  });

  describe('filterByState', () => {
    it('should filter cafes by state', () => {
      const result = filterByState(mockCafes, 'Alicante');
      expect(result).toHaveLength(2);
      expect(result.every((c) => c.state === 'Alicante')).toBe(true);
    });

    it('should return all cafes if state is invalid', () => {
      const result = filterByState(mockCafes, 'InvalidState');
      expect(result).toEqual(mockCafes);
    });
  });

  describe('applyFilters', () => {
    it('should apply multiple filters', () => {
      const result = applyFilters(mockCafes, { city: 'Alicante', state: 'Alicante' });
      expect(result).toHaveLength(2);
      expect(result.every((c) => c.city === 'Alicante' && c.state === 'Alicante')).toBe(true);
    });

    it('should filter by featured status', () => {
      const result = applyFilters(mockCafes, { featured: true });
      expect(result).toHaveLength(1);
      expect(result[0].featured).toBe(true);
    });

    it('should filter by roastery', () => {
      const result = applyFilters(mockCafes, { roastery: true });
      expect(result).toHaveLength(1);
      expect(result[0].specialty_features.roastery).toBe(true);
    });
  });
});
