/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        esmeralda: {
          DEFAULT: "#0F2E22",
          950: "#081B13",
          900: "#0F2E22",
          800: "#164430",
          700: "#1E5A40",
          600: "#2A7352"
        },
        arena: {
          DEFAULT: "#E8DCC8",
          50: "#F7F2E8",
          100: "#F0E7D6",
          200: "#E8DCC8",
          300: "#D9C9AC",
          400: "#C4B08C"
        },
        dorado: {
          DEFAULT: "#C9A227",
          light: "#E4C55B",
          dark: "#A3831B"
        },
        tinta: "#221C15"
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        label: "0.28em"
      },
      boxShadow: {
        card: "0 20px 50px -20px rgba(15, 46, 34, 0.35)",
        float: "0 24px 60px -18px rgba(15, 46, 34, 0.5)"
      }
    }
  },
  plugins: []
}
