/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./node_modules/flowbite-react/lib/**/*.{js,ts}",
    "./src/**/*.{ts,tsx}",],
  theme: {
    extend: {
      colors: {
        "primary": "#388087",
        ["primary-hover"]: "#2c787f",
        "primary-bg" : "#111827",
        "seconday-bg" : "#1f2937",
        // "primary": "#cc5de8",
        // ["primary-hover"]: "#C25DD2",
        "secondary": "#FFFFFF",
        "tertiary": "#E2E3F4"
      }
    },
  },
  plugins: [require("flowbite/plugin")],
}

