
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:   "#0A0A0A",      // чорний фон
        card: "rgba(255,255,255,0.06)",
        line: "rgba(255,255,255,0.10)",
        text: { base: "#FFFFFF", dim: "#C9CCD1", acc: "#111111" },
        brand: { yellow: "#FFD400", black: "#0A0A0A", white: "#FFFFFF" }
      },
      fontFamily: { sans: ["Inter","system-ui","Segoe UI","Arial","sans-serif"] },
      dropShadow: { glow: "0 0 20px rgba(255,212,0,0.45)" },
    }
  },
  plugins: []
}
