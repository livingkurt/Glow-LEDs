module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jquery: true,
    jest: true,
    serviceworker: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb/hooks",
    "plugin:jest/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: ["react", "@typescript-eslint", "@babel", "import", "jest", "jsx-a11y", "react-hooks", "prettier"],
  rules: {
    // Your merged rules here...
  },
  settings: {
    react: {
      version: "detect",
    },
    jest: {
      version: "28",
    },
    "import/resolver": {
      webpack: {
        config: "config/webpack/custom.js",
      },
    },
    "import/core-modules": ["react-redux"],
  },
};
