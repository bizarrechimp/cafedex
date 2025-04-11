import CafeCard from '@/components/CafeCard';
import BlogCard from '@/components/BlogCard';
import { getFeaturedCafes, getAllCafes } from '@/utils/cafeUtils';
import { getAllPosts } from '@/utils/blogUtils';

export default async function Home() {
  const cafes = getFeaturedCafes();
  const allCafes = getAllCafes().sort((a, b) => a.slug.localeCompare(b.slug));
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 3);

  // Create a mapping of cafe slugs to their original index
  const cafeNumbers = Object.fromEntries(
    allCafes.map((cafe, index) => [cafe.slug, index + 1])
  );

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Cafés Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Cafés Destacados</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {cafes.map((cafe) => (
              <CafeCard
                key={`featured-${cafe.slug}`}
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
        </section>

        {/* Blog Posts Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Últimas Publicaciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <div
                key={`home-post-${post.slug}`}
                className={`${
                  index === 0 ? 'block' : // Always show first post
                  index === 1 ? 'hidden md:block' : // Show on md and up
                  'hidden lg:block' // Show only on lg and up
                }`}
              >
                <BlogCard
                  title={post.title}
                  excerpt={post.excerpt}
                  image={post.coverImage}
                  date={new Date(post.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  slug={post.slug}
                  author={post.author}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
