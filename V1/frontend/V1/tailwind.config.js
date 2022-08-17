module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0e2439",
      },
      backgroundImage: {
        "footer-pattern": "url('/src/img/footer.svg')",
        "wave-pattern": "url('/src/img/wave.svg')",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
