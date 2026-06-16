/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy1: '#0A0F1E',
        navy2: '#0B1120',
        brand: {
          cyan: '#3AC2FC',
          emerald: '#4CCD79',
          orange: '#FF7A1A',
          danger: '#EF4444',
          amber: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
