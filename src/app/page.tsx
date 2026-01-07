import CafeCard from '@/components/CafeCard';
import BlogCard from '@/components/BlogCard';
import { getFeaturedCafes, getAllCafes } from '@/utils/cafeUtils';
import { getAllPosts } from '@/utils/blogUtils';

// Keep it static but with revalidation since blog posts and featured cafes don't change often
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const [cafes, allCafes, posts] = await Promise.all([
    getFeaturedCafes(),
    getAllCafes(),
    getAllPosts(),
  ]);

  const recentPosts = posts.slice(0, 3);

  // Create a mapping of cafe slugs to their original index
  const cafeNumbers = Object.fromEntries(allCafes.map((cafe, index) => [cafe.slug, index + 1]));

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Cafés Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Cafeterías Destacadas</h2>
          {cafes.length > 0 ? (
            <div className="overflow-hidden py-8 pb-12 px-4">
              <div className="flex justify-center lg:justify-evenly gap-6 max-w-full lg:max-w-5xl mx-auto">
                {cafes.map((cafe, index) => (
                  <div
                    key={`featured-${cafe.slug}`}
                    className={`$ {
                      index === 0 ? 'block' :
                      index === 1 ? 'hidden md:block' :
                      index === 2 ? 'hidden lg:block' :
                      'hidden'
                    }`}
                  >
                    <CafeCard cafe={cafe} number={cafeNumbers[cafe.slug]} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <h3 className="text-xl text-gray-600 dark:text-gray-400">
                Próximamente nuevas cafeterías
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-500">
                Estamos trabajando en traerte las mejores cafeterías de España.
              </p>
            </div>
          )}
        </section>

        {/* Blog Posts Section */}
        {/*
        <section>
          <h2 className="text-3xl font-bold mb-8">Últimas Publicaciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <div
                key={`home-post-${post.slug}`}
                className={`$${
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
        */}
      </main>
    </div>
  );
}
