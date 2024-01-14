/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./node_modules/flowbite-react/lib/**/*.{js,ts}",
    "./src/**/*.{ts,tsx}",],
  theme: {
    extend: {
      colors: {
        "primary": "#D05DD2",
        ["primary-hover"]: "#C25DD2",
        "secondary": "#FFFFFF",
        "tertiary": "#E2E3F4"
      }
    },
  },
  plugins: [require("flowbite/plugin")],
}

