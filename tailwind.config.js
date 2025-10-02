/** @type {import('tailwindcss').Config} */
module.exports = {
  // Files to scan for class names when using the Tailwind CLI/build
  content: [
    './index.html',
    './**/*.{js,ts}',
  ],
  theme: {
    extend: {
      // Define a 1px spacing unit. With the Play CDN we also set this via @theme in index.html,
      // but this file is useful if/when you switch to the CLI build.
      spacing: {
        '1': '1px',
      },
    },
  },
  plugins: [],
};
