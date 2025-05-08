import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/utils/blogUtils';
import Image from 'next/image';
import type { Metadata } from 'next';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

export const revalidate = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Updated metadata generation for async request
export async function generateMetadata({ params }: { params: { slug: string } | Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) {
    notFound();
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  // Await params if it's a Promise (Next.js 14/15 dynamic route API)
  const resolvedParams = params instanceof Promise ? await params : params;
  try {
    const post = await getPostBySlug(resolvedParams.slug);
    if (!post) {
      notFound();
    }
    // Set up DOMPurify with jsdom for server-side sanitization
    const window = new JSDOM('').window;
    const purify = DOMPurify(window as any);
    const sanitizedContent = purify.sanitize(post.content);

    // Fetch all posts for navigation/related
    const allPosts = await getAllPosts();
    // Find index of current post
    const currentIndex = allPosts.findIndex(p => p.slug === post.slug);
    // Previous and next posts (chronological order)
    const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
    const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    // Related posts: pick 2 others, excluding current
    const relatedPosts = allPosts.filter(p => p.slug !== post.slug).slice(0, 2);

    return (
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="mb-8 text-gray-600">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {post.author && <span className="ml-4">por {post.author}</span>}
        </div>
        {post.coverImage && (
          <div className="mb-8 relative w-full h-[400px]">
            <Image
              src={post.coverImage}
              alt={post.title} // Use title as alt text since imageAlt does not exist
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )}
        <div
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        {/* Navigation Links */}
        <nav className="flex justify-between mt-12">
          {prevPost ? (
            <a href={`/blog/${prevPost.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">← {prevPost.title}</a>
          ) : <span />}
          {nextPost ? (
            <a href={`/blog/${nextPost.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">{nextPost.title} →</a>
          ) : <span />}
        </nav>
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-4">Entradas relacionadas</h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {relatedPosts.map(rp => (
                <li key={rp.slug} className="border rounded-lg p-4 hover:shadow">
                  <a href={`/blog/${rp.slug}`} className="text-lg font-semibold text-blue-700 dark:text-blue-300 hover:underline">{rp.title}</a>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{rp.excerpt}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    );
  } catch (error: any) {
    // Log error for debugging
    console.error('Error loading blog post:', error);
    let message = 'Ha ocurrido un error inesperado.';
    if (error?.message?.includes('network')) {
      message = 'Error de red: no se pudo conectar al servidor.';
    } else if (error?.message?.includes('database') || error?.message?.includes('Mongo')) {
      message = 'Error de base de datos: no se pudo acceder a la información.';
    } else if (error?.message?.includes('query')) {
      message = 'Error en la consulta de datos.';
    }
    return (
      <div className="container mx-auto px-4 py-16 text-center text-red-600 dark:text-red-400">
        <h2 className="text-2xl font-bold mb-4">{message}</h2>
        <p className="text-lg">Por favor, inténtalo de nuevo más tarde.</p>
      </div>
    );
  }
}