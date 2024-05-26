/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './_includes/*.{js,jsx,ts,tsx,html,njk}',
    './src/**/*.{js,jsx,ts,tsx,html,njk}',
    './src/*.{js,jsx,ts,tsx,html,njk}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'clicker': ['Clicker Script', 'cursive'],
      },
    },
  },
  plugins: [],
}
