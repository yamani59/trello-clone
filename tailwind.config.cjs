/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', 'src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        downShow: 'downShow .3s ease-in-out forwards',
        downHidden: 'downShow .3s ease-in-out forwards reverse',
      },
      keyframes: {
        downShow: {
          '0%': {
            minHeight: '0',
            height: '0',
            opacity: '0.5',
            display: 'block !important',
          },
          '100%': { minHeight: '100%', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
