/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        wine: {
          DEFAULT: "#7C2D12",
          dark: "#5C1D0A",
          deep: "#451105",
        },
        ink: {
          DEFAULT: "#1C1917",
          soft: "#292524",
          muted: "#57534E",
        },
        cream: {
          DEFAULT: "#FDF6EC",
          dark: "#F5E9D7",
          deep: "#EADCC3",
        },
        gold: {
          DEFAULT: "#D97706",
          light: "#F59E0B",
          pale: "#FBBF24",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grain-light":
          "radial-gradient(circle at 1px 1px, rgba(124,45,18,0.07) 1px, transparent 0)",
        "grain-dark":
          "radial-gradient(circle at 1px 1px, rgba(253,246,236,0.06) 1px, transparent 0)",
      },
      boxShadow: {
        dish: "0 18px 40px -18px rgba(28,25,23,0.35)",
        "dish-hover": "0 28px 55px -18px rgba(124,45,18,0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "steam": {
          "0%": { opacity: "0", transform: "translateY(4px) scaleX(1)" },
          "50%": { opacity: "0.7" },
          "100%": { opacity: "0", transform: "translateY(-14px) scaleX(1.4)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        float: "float 5s ease-in-out infinite",
        steam: "steam 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
