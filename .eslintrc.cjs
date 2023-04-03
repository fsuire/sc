module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:storybook/recommended', 'prettier'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'no-unused-vars': 'error',
    'prettier/prettier': ['error', {
      semi: false,
      singleQuote: true,
      printWidth: 120,
      tabWidth: 2
    }],
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  },
  overrides: [{
    files: ['*.html'],
    rules: {}
  }]
};