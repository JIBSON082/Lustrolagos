
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A0522D",
        "primary-light": "#C17B3F",
        cream: "#FAF7F2",
        "cream-dark": "#EDE8E0",
        charcoal: "#1A1A1A",
        "charcoal-light": "#2D2D2D",
        gold: "#C9A96E",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;