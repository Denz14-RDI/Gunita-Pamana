import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: "#4A0F1B",
          dark: "#36080E",
          light: "#5E1523",
        },
        wine: {
          DEFAULT: "#681B2A",
        },
        gold: {
          DEFAULT: "#B08A52",
          hover: "#967440",
        },
        champagne: {
          DEFAULT: "#D8BE88",
          light: "#EAD8B7",
        },
        ivory: {
          DEFAULT: "#F5EBDD",
          dark: "#F0E4D5",
        },
        blush: {
          DEFAULT: "#C89A9A",
        },
        espresso: {
          DEFAULT: "#241719",
        },
        warmWhite: {
          DEFAULT: "#fffaf3",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["Segoe UI", "Arial", "sans-serif"],
      },
      borderRadius: {
        "2xl": "22px",
        "3xl": "28px",
      },
      boxShadow: {
        luxury: "0 18px 50px rgba(36,23,25,0.14)",
        card: "0 8px 28px rgba(36,23,25,0.06)",
        modal: "0 25px 80px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
