module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  plugins: ['node'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-console': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
  },
};