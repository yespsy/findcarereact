import type {Config} from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '16p': '1.33rem',
      '2xl': '1.563rem',
      '20p': '1.66rem',
      '22p': '1.75rem',
      '24p': '2rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
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
          "dark": "#000000"
        }
      }
    ]
  }
} satisfies Config;
