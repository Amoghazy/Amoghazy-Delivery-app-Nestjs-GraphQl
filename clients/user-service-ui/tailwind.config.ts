import type { Config } from "tailwindcss";
import daisyui from "daisyui";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        nunito: ["var(--font-nunito)", "sans-serif"],
        geistMono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [ {
      myLightTheme: { // You can name your custom theme here
        "primary": "#4f46e5", // Example primary color
        "secondary": "#6ee7b7", // Example secondary color
        "accent": "#fbbf24", // Accent color
        "neutral": "#f3f4f6", // Neutral background
        "base-100": "#ffffff", // Base background color
        "info": "#3abff8", // Info color
        "success": "#36d399", // Success color
        "warning": "#fbbd23", // Warning color
        "error": "#f87272", // Error color
      },
    },, "dark"], // default themes
    darkTheme: "dark", // use 'dark' as the dark mode theme
    base: true, // applies base styling
    styled: true, 
    utils: true, 
    prefix: "", 
    logs: true, 
    themeRoot: ":root", // assigns theme variables to :root
  },
};
export default config;
