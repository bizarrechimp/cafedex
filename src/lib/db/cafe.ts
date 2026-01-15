/**
 * Cafe Mongoose Schema
 *
 * Defines the structure and validation rules for cafe documents in MongoDB
 * Includes indexes for optimized querying
 *
 * @module db/cafe
 */

import mongoose from 'mongoose';

/**
 * Cafe Schema Definition
 *
 * Documents in this schema represent physical cafes with their properties,
 * location, services, and social media information.
 */
const cafeSchema = new mongoose.Schema(
  {
    /**
     * Unique identifier generated as a deterministic hash (SHA-256)
     * Format: "abbr-city-number" (e.g., "aff-madrid-001")
     * Used for stable identification across imports and exports
     */
    id: { type: String, required: true, unique: true },

    /** Localized name/description */
    i18n: {
      es: {
        name: { type: String, required: true },
        description: { type: String, default: '' },
      },
      en: {
        name: { type: String, required: true },
        description: { type: String, default: '' },
      },
    },

    /**
     * URL-friendly slug for routing
     * Example: "aff-madrid-001"
     * Used in URLs for cafe detail pages
     */
    slug: { type: String, required: true, unique: true },

    /** City name (required) */
    city: { type: String, required: true },

    /** Province/State name (required, should be from PROVINCES list) */
    state: { type: String, required: true },

    /** Country code (required, typically "ES" for Spain) */
    country: { type: String, required: true },

    /** Geographic and address information */
    location: {
      /** Latitude coordinate */
      lat: { type: Number },
      /** Longitude coordinate */
      lng: { type: Number },
      /** Street address (required) */
      address: { type: String, required: true },
    },

    /**
     * Specialty features and service offerings
     * Nested object containing arrays of services and features
     */
    specialty_features: {
      /**
       * Available brewing methods
       * Examples: 'espresso', 'v60', 'pour-over', 'aeropress', 'moka'
       */
      brew_methods: { type: [String], default: [] },

      /** Whether the cafe has an in-house roastery */
      roastery: { type: Boolean, default: false },

      /**
       * Coffee bean origins available
       * Examples: 'Colombia', 'Ethiopia', 'Kenya', 'Peru'
       */
      beans_origin: { type: [String], default: [] },

      /**
       * Opening hours by day of week (weekday codes)
       * Format: { "mon": "08:00-18:00", "tue": "08:00-18:00", ... }
       * Stored as a Map for flexible key-value structure
       */
      opening_hours: { type: Map, of: String, default: {} },

      /**
       * Services available
       * Examples: 'wifi', 'parking', 'outdoor-seating', 'pet-friendly'
       */
      services: { type: [String], default: [] },

      /**
       * Items available for serving
       * Examples: 'food', 'desserts', 'sandwiches', 'pastries'
       */
      serving: { type: [String], default: [] },
    },

    /**
     * Source and curation metadata
     * Tracks where the data came from and if it's been manually reviewed
     */
    source: {
      /**
       * Origin of the data
       * Examples: 'google-places', 'manual-entry', 'web-scrape', 'import'
       */
      origin: { type: String },

      /** Whether an admin has manually reviewed and curated this entry */
      curated: { type: Boolean, default: false },
    },

    /** Whether the cafe should be visible in public listings */
    published: { type: Boolean, default: false },

    /** Whether the cafe should be featured in homepage and promotions */
    featured: { type: Boolean, default: false },

    /**
     * Social media and contact links
     * Empty strings indicate unavailable social media
     */
    rrss: {
      /** Instagram handle (without @) */
      instagram: { type: String },
      /** Website URL */
      website: { type: String },
      /** Facebook page URL */
      facebook: { type: String },
    },

    /** Cover/hero image URL */
    image: { type: String },

    /** Average rating on 0-5 scale (optional, may be from Google Places or manual review) */
    rating: { type: Number },

    /** ISO 8601 timestamp of when the cafe data was last updated in our system */
    lastUpdated: { type: String },
  },
  {
    /**
     * Enable automatic createdAt and updatedAt timestamps
     * These are managed by Mongoose and track document changes
     */
    timestamps: true,
  }
);

/**
 * Database Indexes
 *
 * These indexes optimize common queries:
 * - city: Filtering by location
 * - published: Listing only public cafes
 * - featured: Finding featured cafes for homepage
 * - id & slug: Primary lookups
 * - roastery: Filtering by specialty feature
 */
cafeSchema.index({ city: 1 });
cafeSchema.index({ published: 1 });
cafeSchema.index({ featured: 1 });
cafeSchema.index({ id: 1, published: 1 });
cafeSchema.index({ 'specialty_features.roastery': 1 });
cafeSchema.index({ 'i18n.es.name': 1 });
cafeSchema.index({ 'i18n.en.name': 1 });

/**
 * Export the model
 * Uses 'Cafe' as the collection name (MongoDB will pluralize to 'cafes')
 */
const Cafe = mongoose.models.Cafe || mongoose.model('Cafe', cafeSchema, 'cafes');
export default Cafe;
