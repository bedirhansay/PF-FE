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
      boxShadow: {
        "count-badge": "0px 0px 6px 2px rgba(219, 188, 159, 0.30)",
        "groups-sidebar": "-30px 0px 60px 0px rgba(28, 28, 31, 0.50)",
      },
      animation: {
        bounceUpDown: "bounceUpDown 1s infinite alternate",
      },
      colors: {
        btnColor: "#232748",
      },
      keyframes: {
        bounceUpDown: {
          "0%": {
            top: "0",
            backgroundColor: "#fbe2e3",
          },
          "100%": {
            top: "32px",
            backgroundColor: "#dbd7fb",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
