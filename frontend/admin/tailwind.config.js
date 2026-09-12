/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: { colors: { navy: { DEFAULT: '#0B1B36', dark: '#040D1C', light: '#1E3A5F' }, gold: { DEFAULT: '#D9A441', light: '#F3C663', dark: '#B07C1F' } } } },
  plugins: []
};
