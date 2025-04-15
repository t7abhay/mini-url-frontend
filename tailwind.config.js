module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // You can add custom colors here
      },
      fontFamily: {
        // You can add custom fonts here
      },
    },
  },
  plugins: [],
  // JIT mode is now the default in Tailwind CSS v3
  // No need to specify it explicitly
};
