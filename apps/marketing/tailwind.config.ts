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
      keyframes: {
        "bm-aurora-a": {
          "0%, 100%": {
            transform: "translate(-8%, -6%) scale(1)",
            opacity: "0.85",
          },
          "50%": {
            transform: "translate(6%, 8%) scale(1.18)",
            opacity: "1",
          },
        },
        "bm-aurora-b": {
          "0%, 100%": {
            transform: "translate(6%, 4%) scale(1.1)",
            opacity: "0.7",
          },
          "50%": {
            transform: "translate(-6%, -8%) scale(1)",
            opacity: "0.95",
          },
        },
        "bm-badge-glow": {
          "0%, 100%": {
            boxShadow:
              "0 0 0 1px rgba(190,194,169,0.4), 0 0 18px rgba(190,194,169,0.25)",
          },
          "50%": {
            boxShadow:
              "0 0 0 1px rgba(190,194,169,0.7), 0 0 30px rgba(190,194,169,0.5)",
          },
        },
      },
      animation: {
        "bm-aurora-a": "bm-aurora-a 16s ease-in-out infinite",
        "bm-aurora-b": "bm-aurora-b 19s ease-in-out infinite",
        "bm-badge-glow": "bm-badge-glow 4.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
