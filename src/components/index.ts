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
export { default as SearchBar } from './filters/SearchBar';
export { default as QuickFilters } from './filters/QuickFilters';
export { default as SearchFiltersContainer } from './filters/SearchFiltersContainer';
