/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        light: "#DCECD6",
        dark: "#222720",
      },
      backgroundImage: {
        bgImage: "url('/src/assets/images/bgImage.webp')",
      },
      maxWidth: {
        container: "800px",
      },
    },
  },
  plugins: [],
};
