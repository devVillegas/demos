/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0F172A',
          900: '#1E293B',
          800: '#334155',
          700: '#475569',
          500: '#64748B',
          400: '#94A3B8',
          200: '#E2E8F0',
          100: '#F1F5F9',
          50: '#F8FAFC'
        },
        brand: {
          600: '#6366F1',
          500: '#818CF8',
          400: '#A5B4FC',
          100: '#E0E7FF',
          50: '#EEF2FF'
        },
        violetx: {
          600: '#8B5CF6',
          500: '#A78BFA',
          100: '#EDE9FE'
        },
        mint: {
          600: '#059669',
          100: '#D1FAE5',
          50: '#ECFDF5'
        },
        ambar: {
          600: '#D97706',
          100: '#FEF3C7'
        },
        rosita: {
          600: '#E11D48',
          100: '#FFE4E6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -8px rgba(15,23,42,0.10)',
        lift: '0 2px 4px rgba(15,23,42,0.05), 0 16px 40px -12px rgba(99,102,241,0.22)',
        modal: '0 24px 80px -16px rgba(15,23,42,0.35)'
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      animation: {
        shimmer: 'shimmer 2.2s linear infinite'
      }
    }
  },
  plugins: []
}
