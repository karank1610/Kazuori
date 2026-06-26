/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.jsx',
    './src/**/*.js',
    './src/**/*.tsx',
    './src/**/*.ts',
  ],
  theme: {
    extend: {
      padding: {
        '10': '2.5rem',
        '14': '3.5rem',
      },
    },
  },
  plugins: [],
}
