/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors : {
        "primary" : "#D05DD2",
        ["primary-hover"] : "#C25DD2",
        "secondary" : "#FFFFFF",
        "tertiary" : "#E2E3F4"
      }
    },
  },
  plugins: [],
}

