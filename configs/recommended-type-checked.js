'use strict';

const ts = require('typescript-eslint');
const recommended = require('./recommended');

module.exports = [
  ...recommended,
  ...ts.config({
    files: ['**/*.ts', '**/*.mts', '**/*.cts'],
    extends: ts.configs.recommendedTypeCheckedOnly,
  }),
];
