// src/app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        Sobre Nosotros
      </h1>
      <div className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
        <p className="mb-4">
          Bienvenidos a Cafedex, tu guía definitiva para descubrir las mejores cafeterías
          independientes en España. Nuestra misión es conectar a los amantes del café con
          establecimientos únicos que sirven café de especialidad.
        </p>
        <p>
          Cada cafetería en nuestra plataforma ha sido cuidadosamente seleccionada por
          su compromiso con la calidad, la artesanía y la experiencia única que ofrece
          a sus clientes.
        </p>
      </div>
    </div>
  );
}
