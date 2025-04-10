export interface Cafe {
  name: string;
  image: string;
  city: string;
  address: string;
  googleMapsUrl?: string;
  instagramUrl?: string;
  websiteUrl?: string;
  slug: string;
}

export const cafes: Cafe[] = [
  {
    name: "Bean & Cole",
    image: "/cafes/cafe1.jpg",
    city: "Chester",
    address: "39 Frodsham St, Chester CH1 3JJ",
    googleMapsUrl: "https://maps.google.com/?cid=xyz",
    instagramUrl: "https://instagram.com/beanandcole",
    websiteUrl: "https://beanandcole.co.uk",
    slug: "bean-and-cole-chester"
  },
  {
    name: "Federal Café Bar",
    image: "/cafes/cafe1.jpg",
    city: "Manchester",
    address: "9 Nicholas Croft, Northern Quarter, Manchester M4 1EY",
    googleMapsUrl: "https://goo.gl/maps/federalmanchester",
    instagramUrl: "https://instagram.com/federalcafebar",
    websiteUrl: "https://federalcafe.co.uk",
    slug: "federal-manchester"
  },
  {
    name: "Takk Coffee House",
    image: "/cafes/cafe1.jpg",
    city: "Manchester",
    address: "6 Tariff St, Manchester M1 2FF",
    googleMapsUrl: "https://goo.gl/maps/takkcoffee",
    instagramUrl: "https://instagram.com/takkmcr",
    websiteUrl: "https://takkmcr.com",
    slug: "takk-manchester"
  },
  {
    name: "Bold Street Coffee",
    image: "/cafes/cafe1.jpg",
    city: "Liverpool",
    address: "89 Bold St, Liverpool L1 4HF",
    googleMapsUrl: "https://goo.gl/maps/boldstreetcoffee",
    instagramUrl: "https://instagram.com/boldstcoffee",
    websiteUrl: "https://boldstreetcoffee.co.uk",
    slug: "bold-street-liverpool"
  },
  {
    name: "200 Degrees Coffee",
    image: "/cafes/cafe1.jpg",
    city: "Birmingham",
    address: "12 Lower Temple St, Birmingham B2 4JD",
    googleMapsUrl: "https://goo.gl/maps/200degrees",
    instagramUrl: "https://instagram.com/200degs",
    websiteUrl: "https://200degs.com",
    slug: "200-degrees-birmingham"
  },
  {
    name: "Kafi & Co",
    image: "/cafes/cafe1.jpg",
    city: "York",
    address: "53 Shambles, York YO1 7LX",
    googleMapsUrl: "https://goo.gl/maps/kafico",
    instagramUrl: "https://instagram.com/kafiandco",
    websiteUrl: "https://kafiandco.com",
    slug: "kafi-york"
  }
];