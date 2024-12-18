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
      screens: {
        // Custom breakpoint for screens greater than 300px
        'xxs-300': '300px',
        'xs-400': '400px',
        'xs-500': '500px',
      },
      boxShadow: {
        'whiteShadow': '0px 0px 20px 1px rgba(250, 250, 250)',
        'BlueShadow': '0px 0px 20px 1px #020933' // Custom shadow with teal color
      },
      colors:{
        col: '#020933'
      }
    },
  },
  plugins: [require('tailwindcss-primeui')],
  prefix: 'tw-'
}

