module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    "standard"
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "no-new": "warn"
  }
};
