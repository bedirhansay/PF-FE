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
        gradient:
          "linear-gradient(to right top, #3f5169, #394963, #33415d, #2e3957, #293151, #293154, #293156, #293159, #2d3967, #314175, #344983, #365292)",

        bgIm: "linear-gradient(to right bottom, #c7d7ec, #a1b0c2, #7d8a9a, #5b6773, #3b454f, #3a444e, #3a434c, #39424b, #58616c, #78818e, #9ba4b2, #bfc7d8)",
        opened:
          "linear-gradient(to right top, #879cb5, #91a5bb, #9badc1, #a5b6c8, #afbfce, #b0c2d2, #b2c4d6, #b3c7da, #acc3dd, #a7bfe0, #a3bbe3, #a1b6e5)",
      },
      boxShadow: {
        "count-badge": "0px 0px 6px 2px rgba(219, 188, 159, 0.30)",
        "groups-sidebar": "-30px 0px 60px 0px rgba(28, 28, 31, 0.50)",
      },
      animation: {
        bounceUpDown: "bounceUpDown 1s infinite alternate  ",
      },
      colors: {
        btnColor: "#232748",
        darkBlue: "#232748",
        darkGray: "#454555",
        ligthGray: "#aaaabc",
        ligthGrays: "#f8f8f8",
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
