const prettierConfig = require("./_prettier.cjs");

module.exports = {
  extends: [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
    sourceType: "module",
    createDefaultProgram: true,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {},
    },
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "react",
    "react-hooks",
    "import",
  ],
  rules: {
    "class-methods-use-this": "off",
    "import/prefer-default-export": "off",
    "prettier/prettier": ["error", prettierConfig],
    "react/jsx-props-no-spreading": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/order": [
      "error",
      {
        groups: [
          "external",
          "sibling",
          "parent",
          "internal",
          "builtin",
          "object",
          "type",
          "index",
        ],
        "newlines-between": "always",
      },
    ],
    // 카카오는 어쩔 수 없음... 다른 거에서 any 안쓰게 항상 생각하고 있음...
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
