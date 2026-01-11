/**
 * Cafe location information
 */
export interface Location {
  /** Latitude coordinate */
  lat: number;
  /** Longitude coordinate */
  lng: number;
  /** Street address */
  address: string;
}

/**
 * Specialty features and services offered by the cafe
 */
export interface SpecialtyFeatures {
  /** Available brew methods (e.g., espresso, v60, pour-over) */
  brew_methods: string[];
  /** Whether the cafe has an in-house roastery */
  roastery: boolean;
  /** Origins of coffee beans available */
  beans_origin: string[];
  /** Opening hours by day of week */
  opening_Hours: { [key: string]: string };
  /** Services available (e.g., wifi, parking) */
  services: string[];
  /** Items available for serving (e.g., food, desserts) */
  serving: string[];
}

/**
 * Content source and curation information
 */
export interface Source {
  /** Origin of the data (e.g., 'google-places', 'manual', 'scrape') */
  origin: string;
  /** Whether the entry has been manually curated */
  curated: boolean;
}

/**
 * Social media and contact links
 */
export interface SocialLinks {
  /** Instagram profile handle */
  instagram: string;
  /** Website URL */
  website: string;
  /** Facebook profile URL */
  facebook: string;
}

/**
 * Core Cafe document interface
 *
 * @example
 * ```typescript
 * const cafe: Cafe = {
 *   id: 'aff-madrid-001',
 *   name: 'Café del Barrio',
 *   slug: 'cafe-del-barrio',
 *   city: 'Madrid',
 *   state: 'Madrid',
 *   country: 'Spain',
 *   // ... rest of properties
 * }
 * ```
 */
export interface Cafe {
  /** MongoDB document ID (auto-generated, optional during creation) */
  _id?: string;

  /**
   * Deterministic unique identifier (SHA-256 hash of name-city-country)
   * Used for stable identification across imports
   *
   * @example "aff-madrid-001"
   */
  id: string;

  /** Cafe name */
  name: string;

  /** Cafe description or overview */
  description: string;

  /**
   * URL-friendly slug identifier
   * Used for routes and SEO
   *
   * @example "cafe-del-barrio"
   */
  slug: string;

  /** City where the cafe is located */
  city: string;

  /** State/Province where the cafe is located */
  state: string;

  /** Country where the cafe is located (ISO code) */
  country: string;

  /** Geographic and address information */
  location: Location;

  /** Specialty features, services, and offerings */
  specialty_features: SpecialtyFeatures;

  /** Source and curation metadata */
  source: Source;

  /** Whether the cafe is published and visible in listings */
  published: boolean;

  /** Whether the cafe should be featured in homepage/promotions */
  featured: boolean;

  /** Social media and contact information */
  rrss: SocialLinks;

  /** Cover image URL */
  image: string;

  /** Average rating (0-5 stars, optional) */
  rating?: number;

  /** ISO timestamp of last update */
  lastUpdated: string;

  /** Mongoose timestamp - document creation date */
  createdAt?: Date;

  /** Mongoose timestamp - last document modification date */
  updatedAt?: Date;
}

/**
 * MongoDB Error interface with extended properties
 */
export interface MongoDBError extends Error {
  /** MongoDB error code */
  code?: number;
  /** MongoDB error code name */
  codeName?: string;
  /** MongoDB error message */
  errmsg?: string;
}
