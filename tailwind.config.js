const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ['class'],
  content: [
    './src/_root/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './public/index.html',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'primary-500': '#8C429D',
        'background-card-color': '#F1EEDD',
        'primary-600': '#FF5A5A',
        'secondary-500': '#FFB620',
        'off-white': '#D0DFFF',
        'red': '#FF5A5A',
        'dark-1': '#000000',
        'dark-2': '#FFFFFF',
        'dark-3': '#101012',
        'dark-4': '#ffff',
        'light-1': '#FFFFFF',
        'light-2': '#5C5C7B',
        'light-3': '#7878A3',
        'light-4': '#5C5C7B',
        'purple-1': '#8C429D',
      },
      screens: {
        xs: '480px',
      },
      width: {
        420: '420px',
        465: '465px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'background-wallpaper': "url('/assets/wallpaper.svg')",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
