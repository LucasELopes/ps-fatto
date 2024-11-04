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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryColor: '#6143FF',
        secondColor: '#C1BCEC',
      },
      animation: {
        pulseSize: "pulseSize 1s ease-in-out infinite"
      },
      keyframes: {
        pulseSize: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.01)" },
        },
      }
    },
  },
  plugins: [],
};
export default config;
