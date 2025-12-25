import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/utils/blogUtils';
import Image from 'next/image';
import type { Metadata } from 'next';
import 'server-only';

// Sanitizado sencillo del HTML en servidor
function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\s+on\w+=['"][^'"]*['"]/gi, '')
    .replace(/\bhref=['"]javascript:[^'"]*['"]/gi, 'href="#"');
}

export const revalidate = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params }: any
): Promise<Metadata> {
  try {
    const { slug } = params;
    const post = await getPostBySlug(slug);
    if (!post) {
      return { title: 'Post Not Found', description: 'The requested post could not be found' };
    }
    return { title: post.title, description: post.excerpt };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return { title: 'Error', description: 'An error occurred' };
  }
}

export default async function BlogPost(
  { params }: any
) {
  try {
    const { slug } = params;
    const post = await getPostBySlug(slug);

    if (!post) notFound();

    const sanitizedContent = sanitizeHtml(post.content);
    const section = slug.includes('cafe') ? 'cafe' : 'blog';

    const allPosts = await getAllPosts();
    const currentIndex = allPosts.findIndex(p => p.slug === slug);
    const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
    const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const relatedPosts = allPosts.filter(p => p.slug !== slug).slice(0, 2);

    return (
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="mb-8 text-gray-600">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          {post.author && <span className="ml-4">por {post.author}</span>}
        </div>

        <div className="mb-8 relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
          {post.coverImage ? (
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 px-12 text-center">
              <svg className="w-24 h-24 text-blue-200 dark:text-gray-700 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14 4v4h4" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 12h8M8 16h4" />
              </svg>
              <h2 className="text-blue-800/10 dark:text-white/5 font-black text-6xl uppercase tracking-tighter italic">
                {post.title}
              </h2>
            </div>
          )}
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />

        <nav className="flex justify-between mt-12">
          {prevPost ? (
            <a href={`/${section}/${prevPost.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">← {prevPost.title}</a>
          ) : <span />}
          {nextPost ? (
            <a href={`/${section}/${nextPost.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">{nextPost.title} →</a>
          ) : <span />}
        </nav>

        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-4">Entradas relacionadas</h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {relatedPosts.map(rp => (
                <li key={rp.slug} className="border rounded-lg p-4 hover:shadow">
                  <a href={`/${section}/${rp.slug}`} className="text-lg font-semibold text-blue-700 dark:text-blue-300 hover:underline">{rp.title}</a>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{rp.excerpt}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    );
  } catch (error: any) {
    console.error('Error loading blog post:', error);
    const message =
      error?.message?.includes('network') ? 'Error de red: no se pudo conectar al servidor.' :
      error?.message?.includes('database') || error?.message?.includes('Mongo') ? 'Error de base de datos: no se pudo acceder a la información.' :
      error?.message?.includes('query') ? 'Error en la consulta de datos.' :
      'Ha ocurrido un error inesperado.';
    return (
      <div className="container mx-auto px-4 py-16 text-center text-red-600 dark:text-red-400">
        <h2 className="text-2xl font-bold mb-4">{message}</h2>
        <p className="text-lg">Por favor, inténtalo de nuevo más tarde.</p>
      </div>
    );
  }
}