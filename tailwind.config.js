/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'yellow-50': '#fdf7e1',
        'yellow-100': '#e6d7b1',
        'brown-800': '#5c3d00',
        'brown-700': '#6d4800',
        'brown-300': '#CC9965',
      },
    },
  },
  plugins: [],
};
