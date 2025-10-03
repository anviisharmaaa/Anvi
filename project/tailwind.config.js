/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: '#EC4899',
          light: '#F472B6',
          dark: '#DB2777',
        },
        beige: {
          DEFAULT: '#F5F5DC',
          light: '#FAFAF0',
        },
        grey: {
          dark: '#2D2D2D',
          DEFAULT: '#3D3D3D',
          light: '#4D4D4D',
        },
        charcoal: '#333333',
        navy: '#1B1B3A',
      },
      lineHeight: {
        'body': '1.5',
        'heading': '1.2',
      },
    },
  },
  plugins: [],
};
