import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          DEFAULT: "#A0522D",
          light: "#C17B3F",
          dark: "#7A3B1E",
        },
        cream: {
          DEFAULT: "#FAF7F2",
          dark: "#EDE8E0",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          light: "#2D2D2D",
        },
        gold: "#C9A96E",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "lustro-gradient":
          "linear-gradient(135deg, #1A1A1A 0%, #2D1810 50%, #1A1A1A 100%)",
      },
    },
  },
  plugins: [],
};

export default config;

