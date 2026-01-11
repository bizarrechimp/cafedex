// Layout Components
export { default as Header } from './layout/Header';
export { default as Footer } from './layout/Footer';

// Cafe Components
export {
  CafeCard,
  CafeInfoSection,
  CafeDescription,
  LocationSection,
  OpeningHours,
  SpecialtyFeatures,
  HeroImage,
  PageHeader,
  BackLink,
} from './cafe';

// Section Components (layouts reutilizables)
export { FeaturedCafesSection, HorizontalScroll, CardGrid } from './sections';

// Filter Components
export { default as CityFilter } from './filters/CityFilter';
export { default as ProvinceFilter } from './filters/ProvinceFilter';
export { default as EnsureStateInUrl } from './filters/EnsureStateInUrl';

// UI Components (HERO UI based)
export { default as StarRating } from './ui/StarRating';
export { default as Switch } from './ui/Switch';
export { default as SocialButton } from './ui/SocialButton';
export { default as SocialLinks } from './ui/SocialLinks';
export { default as FeatureBadge } from './ui/FeatureBadge';

// Export types and utilities
export type {} from '@heroui/react';
