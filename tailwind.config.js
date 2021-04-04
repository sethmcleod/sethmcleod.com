const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.html'],
  darkMode: 'media', // 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Proza Libre', ...defaultTheme.fontFamily.sans],
      serif: ['Quando', ...defaultTheme.fontFamily.serif],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
