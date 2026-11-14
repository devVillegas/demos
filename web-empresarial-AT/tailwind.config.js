/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          950: '#070A14',
          900: '#0B0F1A',
          850: '#0F1526',
          800: '#141B30',
          700: '#1C2540',
          600: '#263152'
        },
        electric: {
          DEFAULT: '#4F46E5',
          soft: '#6366F1',
          bright: '#22D3EE',
          deep: '#3730A3'
        },
        ice: '#E6ECFF',
        muted: '#8B93B8'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #4F46E5 0%, #22D3EE 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(79,70,229,0.14) 0%, rgba(34,211,238,0.10) 100%)',
        'grid-faint': 'linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)'
      },
      backgroundSize: {
        grid: '48px 48px'
      },
      boxShadow: {
        glow: '0 0 40px rgba(79,70,229,0.35)',
        'glow-cyan': '0 0 40px rgba(34,211,238,0.25)',
        card: '0 24px 60px -20px rgba(3,6,18,0.8)'
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        }
      },
      animation: {
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
