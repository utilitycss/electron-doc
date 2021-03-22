module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        "1em": "1em",
      },
      height: {
        "1em": "1em",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
