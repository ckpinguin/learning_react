module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    indent: ["error", 2],
    // Enforce the use of double quotes in JSX attributes
    "jsx-quotes": ["error", "prefer-double"],
    // Enforce the use of === and !==
    eqeqeq: ["error", "always"],
    // Enforce consistent spacing within curly braces
    "object-curly-spacing": ["error", "always"],
    // Enforce the use of propTypes declarations
    "react/prop-types": "off",
    // Enforce the use of stateless functional components where possible
    "react/prefer-stateless-function": "error",
    "max-len": ["warn", { code: 80 }],
    camelcase: "warn",
    "react-hooks/rules-of-hooks": "error",
    // Enforce the use of dependency arrays for Hooks that need them
    "react-hooks/exhaustive-deps": "warn",
    // Enforce self-closing tags in JSX
    "react/self-closing-comp": "error",
    // Enforce the placement of JSX opening bracket
    "react/jsx-closing-bracket-location": ["error", "line-aligned"],
    // Enforce the use of PascalCase for JSX components
    "react/jsx-pascal-case": "error",
    // Enforce consistent spacing around equal signs on JSX attributes
    "react/jsx-equals-spacing": ["error", "never"],
    // Treat unused variables as warnings instead of errors
    "no-unused-vars": ["warn", { vars: "local", args: "none" }],
  },
}
