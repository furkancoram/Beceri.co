// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: '#98ff98',
        navy: '#0a0a23',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
