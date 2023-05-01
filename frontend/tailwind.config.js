/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // main: "#000000",
        // myWhite: "#FFFFFF",
        loginColor: "#D7DBE7",
        btnColor: "#353A48",
        homeBg: "#dae0e6",
      },
      width: {
        inherit: "inherit",
        body: "1024px",
      },
    },
  },
  plugins: [],
};
