import type {Config} from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      flexBasis: {
        '0344': '36%',
        '0656': '64%'
      }
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        findcare: {
          "primary": "#EE46BC",
          "secondary": "#F59AD8",
          "accent": "#EE46BC",
          "neutral": "#FFFFFF",
          "base-100": "#FCEEF5",
          "info": "#98A2B3",
          "success": "#EE46BC",
          "warning": "#EA559D",
          "error": "#c71e4a",
        }
      }
    ]
  }
} satisfies Config;
