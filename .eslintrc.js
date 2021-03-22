module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  root: true,
  extends: [
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
    "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: ["react-hooks"],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  env: {
    es6: true,
    node: true,
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  rules: {
    // TODO: Re-evaluate this config
    "@typescript-eslint/explicit-function-return-type": "off",
    // TODO: Re-evaluate this config
    "@typescript-eslint/no-explicit-any": "off",
    "react/prop-types": "off",
    "@typescript-eslint/camelcase": "off",
  },
  overrides: [
    {
      files: ["./**/**/*.js"],
      rules: {
        // Allow require statement for all JS files
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
