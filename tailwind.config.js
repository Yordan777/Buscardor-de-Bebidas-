/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage : {
        "header" : "url('/bg.jpg')"
      }
    },
  },
  plugins: [],
}

