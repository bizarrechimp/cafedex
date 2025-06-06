import BlogCard from '@/components/BlogCard';
import { getAllPosts } from '@/utils/blogUtils';

// Make it dynamic since we're using MongoDB now
export const dynamic = 'force-dynamic';
export const revalidate = false;

async function BlogPosts() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl text-gray-600 dark:text-gray-400">
          No hay entradas de blog disponibles en este momento.
        </h2>
      </div>
    );
  }

  return posts.map((post) => (
    <div key={post.slug} className="w-full lg:w-1/3 md:w-1/2 px-4">
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
  ));
}

export default async function BlogPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="flex flex-wrap justify-center gap-8">
        <BlogPosts />
      </div>
    </main>
  );
}