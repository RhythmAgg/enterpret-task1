/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: ["./src/**/*.{html,js,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        modalBG: '#1D2025',
        modalHeader: '#5C61F0',
      },
    },
  },
  plugins: [flowbite.plugin()],
}

