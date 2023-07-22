/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        appgrey: {
          100: '#F5F8FC',
          200: '#ECF2FF',
          300: '#FDFDFF'
        },
        appblue: {
          100: '#007AFF',
          200: '#006FE9'
        }
      },
      fontFamily: {
        'main': ['Plus Jakarta Sans', 'sans-serif']
      },
      screens: {
        'xs-1': '500px',
        'b-1136': '1136px',
        'b-1070': '1070px',
        'b-648': '648px',
        'b-480': '480px',
        'b-732': '732px'
      }
    },
  },
  plugins: [],
}

