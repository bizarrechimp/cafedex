// src/components/Footer.tsx
"use client"; // Mark the component as client-side only

const Footer = () => {
  return (
<footer className="bg-[var(--primary-color)] text-[var(--secondary-color)]">
<div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Brand or Logo Section */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl font-semibold">Cafedex</h1>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/bizarrechimp"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
            aria-label="Visitar perfil de GitHub"
          >
            <i className="fab fa-github"></i> {/* GitHub Icon */}
          </a>
          <a
            href="https://twitter.com/bizarrechimp1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
            aria-label="Visitar perfil de Twitter"
          >
            <i className="fab fa-twitter"></i> {/* Twitter Icon */}
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-4 text-sm">
        <p>© 2025 Cafedex. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
