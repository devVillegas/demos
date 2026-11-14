export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0B",
          800: "#121214",
          700: "#1A1A1D",
          600: "#232327",
          500: "#2E2E33",
        },
        gold: {
          DEFAULT: "#D4AF37",
          soft: "#E8C96A",
          deep: "#A8862A",
        },
        amberAccent: {
          DEFAULT: "#F59E0B",
          soft: "#FBBF24",
        },
        champagne: "#F5E6C8",
      },
      fontFamily: {
        display: ["Cinzel", "serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 40px -8px rgba(212, 175, 55, 0.35)",
        goldLg: "0 0 80px -10px rgba(212, 175, 55, 0.45)",
        card: "0 20px 60px -20px rgba(0, 0, 0, 0.8)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #F59E0B 100%)",
        "gold-gradient-soft": "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(245,158,11,0.08) 100%)",
      },
    },
  },
  plugins: [],
}
