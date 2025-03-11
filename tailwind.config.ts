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
        "primary": "rgba(255, 136, 0, 1)",
        "gray-800": "#1F1F1F",
        "gray-700": "#525252",
        "gray-50": "rgba(250, 250, 250, 1)"
      },
      animation: {
        'attention-pulse': 'attention 2s infinite',
        'rotate': 'skew 0.4s ease-out forwards',
      },
      keyframes: {
        attention: {
          '0%': { boxShadow: '0 0 0 0 #FF8800FF' },
          '70%': { boxShadow: '0 0 0 20px rgba(255,0,0, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(255,0,0, 0)' },
        },
        skew: {
          '0%': { transform: 'rotate(0deg)', },
          '100%': { transform: 'rotate(45deg)', },
        }
      }
    },
  },
  plugins: [],
};
export default config;
