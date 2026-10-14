/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        arabic: ['Amiri', 'serif'],
      },
      colors: {
        ink: { 950: '#0b0907', 900: '#14100c', 800: '#1f1913' },
        gold: { 300: '#f3d9a4', 400: '#e8c27a', 500: '#d4a24c' },
      },
    },
  },
  plugins: [],
};
