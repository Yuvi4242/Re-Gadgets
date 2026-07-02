/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Sora',    'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['ui-monospace', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
