import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Cafetería no encontrada</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Lo sentimos, esta cafetería no está disponible en nuestra base de datos.
        </p>
        <Link
          href="/cafeterias"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          Ver todas las cafeterías
        </Link>
      </div>
    </main>
  );
}