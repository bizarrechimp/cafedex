import { Loader } from '@googlemaps/js-api-loader';

interface PlaceDetails {
  photo?: string;
  rating?: number;
  openingHours?: {
    periods: Array<{
      open: google.maps.places.PlaceOpeningHoursTime;
      close?: google.maps.places.PlaceOpeningHoursTime;
    }>;
    weekdayText: string[];
  };
}

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  version: 'weekly',
  libraries: ['places']
});

export async function getPlaceDetails(placeId: string): Promise<PlaceDetails> {
  await loader.load();
  const service = new google.maps.places.PlacesService(document.createElement('div'));

  return new Promise((resolve, reject) => {
    service.getDetails(
      {
        placeId: placeId,
        fields: ['photos', 'rating', 'opening_hours']
      },
      (
        place: google.maps.places.PlaceResult | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          const details: PlaceDetails = {
            photo: place.photos?.[0]?.getUrl(),
            rating: place.rating,
            openingHours: place.opening_hours && place.opening_hours.periods && place.opening_hours.weekday_text ? {
              periods: place.opening_hours.periods,
              weekdayText: place.opening_hours.weekday_text
            } : undefined
          };
          resolve(details);
        } else {
          reject(new Error('Failed to fetch place details'));
        }
      }
    );
  });
}