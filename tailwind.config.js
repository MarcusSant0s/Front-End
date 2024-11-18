/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-black': '#040404', // adiciona preto customizado
        'custom-orange': '#FF9100', // Adiciona laranja customizada
        'custom-gray': '#F5F5F5',   // Adiciona um cinza customizado
      },
    },
  },
  plugins: [],
}