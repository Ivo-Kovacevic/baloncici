/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        allison: ["Allison", "serif"],
      },
      colors: {
        light: "#DCECD6",
        dark: "#222720",
        darker: "#171b16",
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
