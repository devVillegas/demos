/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F7F3EE',
          deep: '#EFE7DD',
          soft: '#FBF8F4',
        },
        powder: {
          DEFAULT: '#B76E79',
          soft: '#D9A7AF',
          dark: '#96525E',
        },
        gold: {
          DEFAULT: '#C9A227',
          soft: '#E3C766',
          deep: '#A5851B',
        },
        ink: {
          DEFAULT: '#2E2A26',
          soft: '#6B625B',
          faint: '#A39B92',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      boxShadow: {
        editorial: '0 24px 60px -30px rgba(46, 42, 38, 0.35)',
        card: '0 12px 40px -18px rgba(46, 42, 38, 0.25)',
      },
    },
  },
  plugins: [],
};
