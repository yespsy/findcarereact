import type {Config} from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '16p': '1.33rem',
        '22px': '1.422rem',
        '24px': '1.563rem',
        '20p': '1.66rem',
        '22p': '1.75rem',
        '24p': '2rem',
      },
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
