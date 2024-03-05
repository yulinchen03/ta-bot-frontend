/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: ['./src/pages/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'ut-white': '#ffffff',
        'ut-black': '#000000',
        'ut-light-gray': '#919191',
        'ut-dark-gray': '#535353',
        'ut-pink': '#cf0072',
      },
      fontFamily: {
        arial: ["Arial"],
      }
    },
  },
  plugins: [],
}

