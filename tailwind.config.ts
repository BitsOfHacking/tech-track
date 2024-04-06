import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "background": "#494949",
        "secondary-background": "#E7E7E7",
        "primary-color": "#CCCCCC",
        "secondary-color": "#D9D9D9",
        "primary-text": "#000000",
        "secondary-text": "#6C6C6C",
        "primary-button": "#FFF000",
        "secondary-button": "#CCF0F0",
      }
    },
  },
  plugins: [],
};
export default config;
