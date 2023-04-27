/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // main: "#000000",
        // myWhite: "#FFFFFF",
        loginColor: "#D7DBE7",
        btnColor: "#353A48",
      },
    },
  },
  plugins: [],
};
