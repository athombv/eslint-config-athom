'use strict';

const homeyApp = require('./homey-app');
const ts = require('typescript-eslint');

module.exports = [
  ...homeyApp,
  ...ts.config({
    files: ['**/*.ts', '**/*.mts', '**/*.cts'],
    extends: ts.configs.recommendedTypeCheckedOnly,
  }),
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: process.cwd(),
      },
    },
  },
];
