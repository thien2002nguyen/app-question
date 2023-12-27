/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ['Poppins', 'sans-serif;']
      },
      backgroundColor: {
        correct: "#278a48",
        incorrect: "#a43030",
        option: "#27838a"
      }
    },
  },
  plugins: [],
}
