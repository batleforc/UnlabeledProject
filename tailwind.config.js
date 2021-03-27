const { colors: defaultColors } = require('tailwindcss/defaultTheme')
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}','./public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors:{
      ...defaultColors,
      primary   : "#7F1D1D",
      secondary : "#18181B",
      white     : "#F3F4F6",
      grey      : "#71717A"
    },
    fill: theme => theme('colors')
  },
  variants: {
    extend: {
      opacity:['disabled']
    },
  },
  plugins: [],
}
