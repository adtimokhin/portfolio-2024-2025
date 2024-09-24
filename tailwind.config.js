/** @type {import('tailwindcss').Config} */

// Colors and screen sizes are re-used from _global.sass

module.exports = {
  darkMode: 'selector',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Theme
        background_light:"#FFFFFF",
        text_light: "#1C1C1C",
        light_gray_dimmed_light: "#DFDFDF",
        dark_gray_dimmed_light: "#242424",

        // Dark Theme
        background_dark:"#181818",
        text_dark: "#FFFFFF",
        light_gray_dimmed_dark: "#3E3E3E",
        dark_gray_dimmed_dark: "#C3C3C3",

      },

      screens: {
        desktop: "1280px",
        tablet: "768px",
        phone: "320px"
      }
    },
  },
  plugins: [],
};
