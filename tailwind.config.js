/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
          },
        },
      },
      colors: {
        primary: {
          DEFAULT: '#0070f3',
          dark: '#0050d3',
        },
        secondary: {
          DEFAULT: '#ff4081',
          dark: '#c60055',
        },
        code: {
          DEFAULT: '#24292e',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}; 