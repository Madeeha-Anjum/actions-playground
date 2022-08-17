module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        h1: "clamp(2rem, 1.775rem + 1.125vw, 3.125rem)",
      },
    },
  },
  plugins: [],
};
