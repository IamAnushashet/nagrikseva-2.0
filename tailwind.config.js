/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      colors: {
        civic: {
          50: '#eefdf9',
          100: '#d4f7ef',
          500: '#129b86',
          600: '#0f766e',
          700: '#115e59',
          900: '#123c3a',
        },
        saffron: {
          50: '#fff7ed',
          500: '#f97316',
          600: '#ea580c',
        },
      },
      boxShadow: {
        civic: '0 18px 45px rgba(15, 23, 42, 0.10)',
      },
    },
  },
  plugins: [],
};
