/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      keyframes: {
        "slidein-left": {
          '0%': {
            opacity: 0,
            transform: 'translateX(-50px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        "slidein-right": {
          '0%': {
            opacity: 0,
            transform: 'translateX(50px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        "reveal-left": {
          '0%': {
            opacity: 0,
            transform: 'rotateY(100deg)',
            'transform-origin': 'left',
          },
          '100%': {
            opacity: 1,
            transform: 'rotateY(0deg)',
            'transform-origin': 'left',
          },
        }
      },
      animation: {
        'slidein-left': 'slidein-left 0.5s ease-in-out normal forwards',
        'slidein-right': 'slidein-right 0.5s ease-in-out normal forwards',
      }
    },
  },
  plugins: [],
}
