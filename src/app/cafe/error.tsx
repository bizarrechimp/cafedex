'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ha ocurrido un error</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Lo sentimos, ha ocurrido un error al cargar la información de la cafetería.
        </p>
        <button
          onClick={() => reset()}
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    </main>
  );
}