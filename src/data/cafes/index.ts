import { Cafe } from '../types';
import { cafe as beanAndCole } from './bean-and-cole';
import { cafe as laynesEspresso } from './laynes-espresso';
import { cafe as fortitude } from './fortitude';
import { cafe as northStar } from './north-star';
import { cafe as quarterHorse } from './quarter-horse';
import { cafe as foundry } from './foundry';

export const cafes: Cafe[] = [
  beanAndCole,
  laynesEspresso,
  fortitude,
  northStar,
  quarterHorse,
  foundry
];

export const getAllCafes = (): Cafe[] => cafes;

export const getCafeBySlug = (slug: string): Cafe | undefined => {
  return cafes.find(cafe => cafe.slug === slug);
};

export const getCafesByCity = (city: string): Cafe[] => {
  return cafes.filter(cafe => cafe.city.toLowerCase() === city.toLowerCase());
};

export const getCafesByFeature = (feature: string): Cafe[] => {
  return cafes.filter(cafe => cafe.features?.includes(feature));
};