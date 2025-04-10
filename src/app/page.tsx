import CafeCard from '@/components/CafeCard';
import { getFeaturedCafes } from '@/utils/cafeUtils';

export default function Home() {
  const cafes = getFeaturedCafes();

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Cafés Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Cafés Destacados</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {cafes.map((cafe) => (
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
              />
            ))}
          </div>
        </section>

        {/* Blog Posts Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Últimas Publicaciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Add blog post components here once created */}
          </div>
        </section>
      </main>
    </div>
  );
}
