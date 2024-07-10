/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    extend: {
      backgroundImage: {
        'saintek': "url('/src/assets/images/saintek.png')",
      },
      colors:{
        'primary':'#1f2327',
      }
    },
  },
  plugins: [],
}

