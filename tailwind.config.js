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
        bShadow: '0px 0px 12px 12px #020933',
      },
      colors:{
        col: '#020933'
      }
    },
  },
  plugins: [require('tailwindcss-primeui')],
  prefix: 'tw-'
}

