/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'whiteShadow': '0px 0px 20px 1px rgba(250, 250, 250)', // Custom shadow with teal color
      },
      colors:{
        col: '#020933'
      }
    },
  },
  plugins: [require('tailwindcss-primeui')],
  prefix: 'tw-'
}

