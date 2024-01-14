/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors :{
          grey_custom:'#1A1A1A',
          grey_bg:"#353434"
      },
    },
  plugins: [],
}
}
