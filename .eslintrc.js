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
  "rules": {
    // These must be disabled or the prettier integration breaks
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    // End rules that must be disabled for prettier integration to work
    "prettier/prettier": "error",
    "sort-imports": [
      "error",
      {
        "ignoreDeclarationSort": true,
        "ignoreMemberSort": true,
      },
    ],
    "prefer-destructuring": [
      "warn",
      {
        "AssignmentExpression": {
          "array": false,
          "object": false,
        },
      },
      {
        "enforceForRenamedProperties": false,
      },
    ],
    "jsx-quotes": ["error", "prefer-double"],
    "prefer-object-spread": "error",
    "complexity": ["warn", 20],
    "max-len": [
      "warn",
      {
        "code": 120,
        "ignoreComments": true,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true,
      },
    ],
    "max-nested-callbacks": ["warn", 4],
    "no-implicit-coercion": "warn",
    "react/jsx-curly-brace-presence": ["error", { "props": "never", "children": "always" }],
    "react/no-access-state-in-setstate": "warn",
    // Probably want to set options for this
    "react/sort-comp": "warn",
    // maximum depth that blocks can be nested
    "max-depth": ["warn", 4],
    "max-lines": [
      "warn",
      {
        "max": 800,
        "skipBlankLines": true,
        "skipComments": true,
      },
    ],
    "max-lines-per-function": [
      "warn",
      {
        "max": 100,
        "skipBlankLines": true,
        "skipComments": true,
        "IIFEs": true,
      },
    ],
    "max-statements": ["warn", 200],
    "max-classes-per-file": ["warn", 1],
    // "semi": [2, "never"],
    "react/prop-types": [
      "error",
      {
        "ignore": ["intl", "data", "router", "children"],
      },
    ],
    "react/jsx-no-literals": "off",
    "react/no-unused-prop-types": "error",
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "import/no-anonymous-default-export": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true,
      },
    ],
    "no-mixed-operators": "off",
    "function-paren-newline": "off",
    "space-before-function-paren": "off",
    "no-console": "error",
    "no-alert": "error",
    "react/require-default-props": "error",
    "react/forbid-prop-types": "off",
    "react/function-component-definition": [
      1,
      { "namedComponents": "arrow-function", "unnamedComponents": "arrow-function" },
    ],
    "react/jsx-one-expression-per-line": "warn",
    "react/jsx-fragments": [2, "syntax"],
    "jest/no-mocks-import": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "no-else-return": "off",
    "no-use-before-define": ["error", { "variables": false }],
    "camelcase": "off",
    "no-underscore-dangle": ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__", "__typename"] }],
    "jsx-a11y/label-has-for": [
      2,
      {
        "required": {
          "every": ["id"],
        },
      },
    ],
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
