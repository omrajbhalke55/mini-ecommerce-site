/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#2AA7A1",
        "brand-dark": "#23918c",
        "brand-light": "rgba(42,167,161,0.1)",
        accent: "#ef4444",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
        "card-lg": "0 10px 25px rgba(0,0,0,0.12)",
      },
      animation: {
        "spin-slow": "spin 1s linear infinite",
        "fade-up": "fadeUp 0.3s ease both",
        "badge-pop": "badgePop 0.2s ease both",
      },
      boxShadow: {
        // card: "0 1px 3px rgba(0,0,0,.08), 0 4px 16px rgba(0,0,0,.06)",
        "card-lg": "0 10px 25px rgba(0,0,0,0.12)",
      },
      keyframes: {
        fadeUp: { from: { opacity: 0, transform: "translateY(8px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        badgePop: { from: { transform: "scale(0)" }, to: { transform: "scale(1)" } },
      },
    },
  },
  plugins: [],
};