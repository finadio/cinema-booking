/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#d1437b",
        "on-primary": "#ffffff",
        "primary-container": "#ffd9e4",
        "on-primary-container": "#3f001f",
        "primary-fixed": "#ffd9e4",
        "on-primary-fixed": "#3f001f",
        "on-primary-fixed-variant": "#712046",
        "primary-fixed-dim": "#f45b95",
        "inverse-primary": "#ffa7c8",
        
        "secondary": "#74565f",
        "on-secondary": "#ffffff",
        "secondary-container": "#ffd9e2",
        "on-secondary-container": "#2b151c",
        "secondary-fixed": "#ffd9e2",
        "on-secondary-fixed": "#2b151c",
        "secondary-fixed-dim": "#e3b3c1",
        "on-secondary-fixed-variant": "#5a3f47",
        
        "tertiary": "#7c5635",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#ffdcbe",
        "on-tertiary-container": "#2c1500",
        "tertiary-fixed": "#ffdcbe",
        "on-tertiary-fixed": "#2c1500",
        "on-tertiary-fixed-variant": "#604020",
        "tertiary-fixed-dim": "#efbda0",
        
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#410002",
        
        "surface": "#fff8f9",
        "on-surface": "#201a1b",
        "surface-variant": "#f2dde1",
        "on-surface-variant": "#514347",
        "outline": "#837377",
        "outline-variant": "#d5c2c6",
        
        "background": "#fff8f9",
        "on-background": "#201a1b",
        
        "inverse-surface": "#352f30",
        "inverse-on-surface": "#faeeee",
        
        "surface-bright": "#fff8f9",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#fcf2f3",
        "surface-container": "#f6ecee",
        "surface-container-high": "#f0e6e8",
        "surface-container-highest": "#eae0e2",
        "surface-dim": "#e1d7d9",
        "surface-tint": "#d1437b"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "container-max": "1280px",
        "gutter": "20px",
        "xl": "32px",
        "xs": "4px",
        "md": "16px",
        "sm": "8px",
        "base": "4px",
        "lg": "24px"
      },
      fontFamily: {
        "headline-lg": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "headline-lg-mobile": ["Inter", "sans-serif"]
      },
      fontSize: {
        "headline-lg": ["30px", {"lineHeight": "36px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
        "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
        "headline-md": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
        "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}],
        "headline-lg-mobile": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.02em", "fontWeight": "700"}]
      }
    },
  },
  plugins: [],
}
