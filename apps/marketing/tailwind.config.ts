import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#232824",
        "soft-ink": "#4B504A",
        cream: "#FAF7EF",
        "warm-paper": "#F6F0E6",
        sage: "#999A8A",
        "glow-sage": "#BEC2A9",
        stone: "#DACEBF",
        mist: "#E6E3D9",
        "line-stone": "#CFC4B5",
        "dark-room": "#1F2925",
        "deep-card": "#16201C",
        "btn-primary": "#354238",
        "btn-primary-hover": "#2D372F",
        "btn-text": "#F8F4EA",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        label: ["11px", { lineHeight: "1.4", letterSpacing: "0.12em" }],
        body: ["14px", { lineHeight: "1.7" }],
        "body-lg": ["15px", { lineHeight: "1.72" }],
      },
    },
  },
  plugins: [],
};

export default config;
