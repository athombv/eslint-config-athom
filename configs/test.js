'use strict';

const mochaPlugin = require('eslint-plugin-mocha');

module.exports = {
  ...mochaPlugin.configs.recommended,
  files: ['test/**/*.js'],
  rules: {
    // Recommended sets this to 'error' with a limit of 1
    'mocha/max-top-level-suites': ['warn', { limit: 2 }],

    // Recommended sets this to 'warn'
    'mocha/no-exclusive-tests': 'error',

    // Recommended sets this to 'warn'
    'mocha/no-pending-tests': 'error',

    // Recommended sets this to 'off'
    'mocha/no-return-from-async': 'error',

    // Recommended sets this to 'warn'
    'mocha/no-top-level-hooks': 'error',
  }
};
