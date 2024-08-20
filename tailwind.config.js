/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ou 'media' para detectar a preferência do sistema
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

