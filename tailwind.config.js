/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  jit: true,
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "count-badge": "0px 0px 6px 2px rgba(219, 188, 159, 0.30)",
        "groups-sidebar": "-30px 0px 60px 0px rgba(28, 28, 31, 0.50)",
      },
      animation: {
        bounceUpDown: "bounceUpDown 1s infinite alternate",
      },
      colors: {
        btnColor: "#232748",
        darkBlue: "#232748",
        darkGray: "#454555",
        lightGray: "#aaaabc",
        lightGrays: "#f8f8f8",
        lightBlue: "#0065A7",
        blue: "#0065a7",
        grays: "#3e4756",
        lightYellow: "#eee8a9",

        blue100: "#AED9E0",
        blue300: "#78a2a9",
      },
      keyframes: {
        bounceUpDown: {
          "0%, 100%": {
            top: "0",
            backgroundColor: "#fbe2e3",
          },
          "50%": {
            top: "32px",
            backgroundColor: "#dbd7fb",
          },
        },
        animIn: {
          "100%": {
            opacity: 0,
            borderRadius: 0,
            width: "600px",
            height: "600px",
          },
          "0%": {
            width: "0px",
            height: "0px",
            borderRadius: "100%",
            opacity: "20%",
          },
        },
      },
    },
  },
  plugins: [],
};
