/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        'bgImage': "url('/src/assets/images/bgImage.webp')",
      },
      maxWidth: {
        container: "800px",
      },
    },
  },
  plugins: [],
};
