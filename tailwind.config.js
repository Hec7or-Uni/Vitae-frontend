module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      minHeight: {
        80: '20',
        64: '16'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
