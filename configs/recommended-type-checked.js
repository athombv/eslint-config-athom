'use strict';

const ts = require('typescript-eslint');
const recommended = require('./recommended');

module.exports = [
  ...recommended,
  ...ts.configs.recommendedTypeChecked,
];
