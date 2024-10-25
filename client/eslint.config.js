import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintConfigAirbnb from "eslint-config-airbnb";
import eslintConfigPrettier from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import jestPlugin from "eslint-plugin-jest";
import jsxA11y from "eslint-plugin-jsx-a11y";
import testingLibrary from "eslint-plugin-testing-library";
import jestDom from "eslint-plugin-jest-dom";
import babelEslint from "@babel/eslint-plugin";
import * as babelParser from "@babel/eslint-parser";
import importPlugin from "eslint-plugin-import"; // Add this import

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
        jquery: "readonly",
        jest: "readonly",
        node: "readonly",
        serviceworker: "readonly",
      },
      parser: babelParser, // Use the imported parser object
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          experimentalObjectRestSpread: true,
        },
        requireConfigFile: false, // Add this line
        babelOptions: {
          babelrcRoots: ["."],
          presets: ["@babel/preset-react"],
        },
      },
    },
    settings: {
      react: { version: "16.14" },
      jest: { version: "29" },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@babel": babelEslint,
      jest: jestPlugin,
      "jsx-a11y": jsxA11y,
      prettier,
      "testing-library": testingLibrary,
      "jest-dom": jestDom,
      import: importPlugin, // Add this line
    },
    rules: {
      ...eslintConfigAirbnb.rules,
      ...eslintConfigPrettier.rules,
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // Add all the custom rules from your provided configuration
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off",
      "prettier/prettier": "error",
      "sort-imports": ["error", { ignoreDeclarationSort: true, ignoreMemberSort: true }],
      "prefer-destructuring": [
        "warn",
        { AssignmentExpression: { array: false, object: false } },
        { enforceForRenamedProperties: false },
      ],
      "jsx-quotes": ["error", "prefer-double"],
      "prefer-object-spread": "error",
      complexity: ["warn", 20],
      "max-len": [
        "warn",
        {
          code: 120,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      "max-nested-callbacks": ["warn", 4],
      "no-implicit-coercion": "warn",
      "react/jsx-curly-brace-presence": ["error", { props: "never", children: "always" }],
      "react/no-access-state-in-setstate": "warn",
      "import/no-unresolved": "off",
      "import/order": "off",
      "react/sort-comp": "warn",
      "max-depth": ["warn", 4],
      "max-lines": ["warn", { max: 800, skipBlankLines: true, skipComments: true }],
      "max-lines-per-function": ["warn", { max: 100, skipBlankLines: true, skipComments: true, IIFEs: true }],
      "max-statements": ["warn", 200],
      "max-classes-per-file": ["warn", 1],
      "react/prop-types": ["error", { ignore: ["intl", "data", "router", "children"] }],
      "no-param-reassign": ["error", { props: true, ignorePropertyModificationsFor: ["state"] }],
      "react/jsx-no-literals": "off",
      "react/no-unused-prop-types": "error",
      "react/jsx-props-no-spreading": "off",
      "import/prefer-default-export": "warn",
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      "no-mixed-operators": "off",
      "function-paren-newline": "off",
      "space-before-function-paren": "off",
      "no-console": "error",
      "no-alert": "error",
      "react/require-default-props": "error",
      "react/forbid-prop-types": "off",
      "react/function-component-definition": [
        1,
        { namedComponents: "arrow-function", unnamedComponents: "arrow-function" },
      ],
      "react/jsx-one-expression-per-line": "off",
      "react/jsx-fragments": [2, "syntax"],
      "no-else-return": "off",
      "no-use-before-define": ["error", { variables: false }],
      camelcase: "off",
      "no-underscore-dangle": ["error", { allow: ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__", "__typename"] }],
      "jsx-a11y/label-has-for": [2, { required: { every: ["id"] } }],
    },
  },
];
