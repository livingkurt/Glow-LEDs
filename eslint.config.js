import js from "@eslint/js";
import globals from "globals";
import eslintConfigAirbnb from "eslint-config-airbnb-base";
import eslintConfigPrettier from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import jestPlugin from "eslint-plugin-jest";
import importPlugin from "eslint-plugin-import";
import * as babelParser from "@babel/eslint-parser";

// Custom rule to add .js extensions
const addJsExtensionRule = {
  meta: {
    type: "problem",
    fixable: "code",
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const { source } = node;
        if (source.type === "Literal" && source.value.startsWith(".") && !source.value.endsWith(".js")) {
          context.report({
            node: source,
            message: "Missing file extension",
            fix: fixer => fixer.replaceText(source, `'${source.value}.js'`),
          });
        }
      },
    };
  },
};

// Define the custom plugin
const customPlugin = {
  rules: {
    "add-js-extension": addJsExtensionRule,
  },
};

export default [
  { ignores: ["dist", "client"] },
  {
    files: ["server/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021,
        jest: "readonly",
      },
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrcRoots: ["."],
          presets: ["@babel/preset-env"],
        },
      },
    },
    settings: {
      jest: { version: "29" },
      "import/resolver": {
        node: {
          extensions: [".js"],
        },
      },
    },
    plugins: {
      jest: jestPlugin,
      prettier,
      import: importPlugin,
      custom: customPlugin,
    },
    rules: {
      ...eslintConfigAirbnb.rules,
      ...eslintConfigPrettier.rules,
      ...js.configs.recommended.rules,
      "arrow-body-style": "off",
      "custom/add-js-extension": "error",
      "prefer-arrow-callback": "off",
      "prettier/prettier": "error",
      "sort-imports": ["error", { ignoreDeclarationSort: true, ignoreMemberSort: true }],
      "prefer-destructuring": [
        "warn",
        { AssignmentExpression: { array: false, object: false } },
        { enforceForRenamedProperties: false },
      ],
      "prefer-object-spread": "error",
      "max-nested-callbacks": ["warn", 4],
      "no-implicit-coercion": "warn",
      "import/no-unresolved": "off",
      "import/order": "off",
      "max-depth": ["warn", 4],
      "max-classes-per-file": ["warn", 1],
      "no-param-reassign": ["error", { props: true, ignorePropertyModificationsFor: ["state"] }],
      // "import/prefer-default-export": "warn",
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      "no-mixed-operators": "off",
      "function-paren-newline": "off",
      "space-before-function-paren": "off",
      "no-console": "warn",
      "no-alert": "error",
      "no-else-return": "off",
      "no-use-before-define": ["error", { variables: false }],
      camelcase: "off",
      "no-underscore-dangle": ["error", { allow: ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__", "__typename"] }],
      "import/extensions": ["error", "always", { ignorePackages: true }],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
];
