/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    colors: {
      'primary': 'hsla(160, 100%, 37%, 1)',
      'input': '#0cfcac'
    }
  }
};
export const plugins = [];

