/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: { screen: "var(--viewport-height)" },
      minHeight: { screen: "var(--viewport-height)" },
    },
  },
  plugins: [],
}
