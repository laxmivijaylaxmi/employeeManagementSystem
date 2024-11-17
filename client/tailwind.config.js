// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pacific: ["Pacifico", "sans-serif"], // Ensure this is added
      },
    },
  },
  plugins: [],
}
