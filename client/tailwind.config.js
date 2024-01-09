/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors : {
        "primary" : "#A254D4",
        "secondary" : "#FFFFFF",
        "tertiary" : "#E2E3F4"
      }
    },
  },
  plugins: [],
}

