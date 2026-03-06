/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "#e5e7eb",
        background: "#ffffff",
        foreground: "#0f172a",
        ring: "#94a3b8",
      },
    },
  },
  plugins: [],
}