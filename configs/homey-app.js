'use strict';

const recommended = require('./recommended');
const homeyApp = require('eslint-plugin-homey-app');
const { getAppSourceType } = require('../util/parse-source-type');

module.exports = [
  { ignores: ['.homeybuild', 'node_modules', '**/*.d.ts'] },

  // Extend the recommended config, which includes the ESLint recommended rules and some of our own
  ...recommended,

  // Include the recommended rules from eslint-plugin-homey-app, which includes rules specific to Homey app development
  homeyApp.configs.recommended,

  {
    settings: {
      node: {
        version: '>=22.17.0',
      },
    },
    languageOptions: {
      sourceType: getAppSourceType(),
    },
    rules: {
      'n/no-missing-import': ['error', { allowModules: ['homey'] }],
      'n/no-missing-require': ['error', { allowModules: ['homey'] }],
      'n/no-unpublished-import': ['error', { allowModules: ['homey'] }],
      'preserve-caught-error': 'off',
    }
  },

  // Override some rules for TypeScript files
  {
    files: ['**/*.ts', '**/*.mts', '**/*.cts'],
    rules: {
      '@typescript-eslint/ban-ts-comment': ['warn', { 'ts-ignore': 'allow-with-description' }],
      '@typescript-eslint/consistent-type-imports': ['warn', { fixStyle: 'separate-type-imports' }],
      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
      '@typescript-eslint/explicit-member-accessibility': ['warn'],
      '@typescript-eslint/no-import-type-side-effects': 'error',
    },
  },
];
