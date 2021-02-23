const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}','./public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors:{
      primary   : "#7F1D1D",
      secondary : "#18181B",
      white     : "#F3F4F6",
      grey      : "#71717A"
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
