module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["standard"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "comma-dangle": 0,
    "space-before-function-paren": 2,
    quotes: [2, "double", { avoidEscape: true }],
  },
}
