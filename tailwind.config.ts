import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: "#999A8A",
        mist: "#E6E3D9",
        stone: "#DACEBF",
        "faded-blue": "#989FA5",
        mauve: "#8C6F7B",
        ink: "#232824",
        "soft-ink": "#4B504A",
        "warm-paper": "#F6F0E6",
        cream: "#FAF7EF",
        "dark-room": "#1F2925",
        "deep-card": "#16201C",
        "glow-sage": "#BEC2A9",
        "line-stone": "#CFC4B5",
        // UI-specific (DESIGN_SYSTEM buttons, logo)
        "btn-primary": "#354238",
        "btn-primary-hover": "#2D372F",
        "btn-text": "#F8F4EA",
        wordmark: "#6B6B60",
        "warm-tint": "#EDE8E2",
        "chart-population": "#D6D4C8",
        "pcl-pill-bg": "#E2E6EA",
        "pcl-pill-text": "#4B606F",
        "error-border": "#C4533A",
        "disabled-bg": "#E6E3D9",
        "disabled-text": "#9B978D",
        "card-border": "#D8CFC1",
        "chart-card-border": "#DDD4C7",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "label-sm": ["10px", { lineHeight: "1.4", letterSpacing: "0.1em" }],
        label: ["11px", { lineHeight: "1.4", letterSpacing: "0.12em" }],
        "body-sm": ["13px", { lineHeight: "1.65" }],
        body: ["14px", { lineHeight: "1.7" }],
        "body-lg": ["15px", { lineHeight: "1.72" }],
      },
      borderRadius: {
        card: "14px",
        button: "16px",
        shell: "32px",
      },
      boxShadow: {
        shell: "0px 12px 40px rgba(70, 60, 45, 0.10)",
      },
      maxWidth: {
        phone: "430px",
      },
    },
  },
  plugins: [],
};

export default config;
