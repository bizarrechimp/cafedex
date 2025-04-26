import { getAllPosts, getPostBySlug } from '@/utils/blogUtils';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="mb-8 text-gray-600">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
        {post.author && (
          <span className="ml-4">por {post.author}</span>
        )}
      </div>
      {post.coverImage && (
        <div className="mb-8 relative w-full h-[400px]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}