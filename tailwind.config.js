/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
      fontFamily: {
        body: "Manrope"
      },
      colors: {
        'orange-brand': "#EB433D",
        'primary-blue': '#1894E0',
      },
    },
  },
  plugins: [],
}

