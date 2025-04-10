module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",   // Make sure to include the pages directory too
    "./components/**/*.{js,ts,jsx,tsx}", // Include the components directory if it exists
    // If you have other directories like "app" in your Next.js project structure, add them here
  ],
  darkMode: 'class',  // Habilita el cambio basado en clase
  theme: {
    extend: {
      // Puedes agregar tu personalización aquí si es necesario
    },
  },
  plugins: [],
}
