/** @type {import('eslint/lib/shared/types').ConfigData} */

module.exports = {
  extends: ['../../.eslintrc.js'],
  env: { node: true, jest: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  settings: {
    next: {
      rootDir: 'apps/api/',
    },
  },
};
