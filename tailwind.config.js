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
        'tree-turtle': '#2a9d8f',
        'tree-red': '#e76f51',
        'tree-yellow': '#e9c46a',
        'tree-blue': '#264653',
        'tree-orange': '#f4a261'
      },
      fontFamily: {
        arial: ["Arial"],
      }
    },
  },
  plugins: [],
}

