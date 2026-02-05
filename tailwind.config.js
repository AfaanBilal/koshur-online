/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pl: ['Inter', 'sans-serif'],
      },
      colors: {
        redMain: '#f8312f',
      }
    },
  },
  plugins: [],
}
