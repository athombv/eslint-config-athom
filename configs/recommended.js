'use strict';

const globals = require('globals');
const js = require('@eslint/js');
const ts = require('typescript-eslint');
const n = require('eslint-plugin-n');
const testConfiguration = require('./test');

module.exports = [
  // Extend the recommended ESLint rules for JavaScript files.
  js.configs.recommended,

  // Extend the recommended rules for Node.js files.
  n.configs.recommended,

  // Add basic support for TypeScript files, including type-aware rules.
  ...ts.configs.recommended,

  // Rules that apply to all JavaScript files, regardless of module type.
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.ts', '**/*.mts', '**/*.cts'],
    rules: {
      'lines-between-class-members': ['warn', 'always', { 'exceptAfterSingleLine': true }],

      'prefer-destructuring': [ 'warn', {
        'VariableDeclarator': { 'array': false, 'object': true },
        'AssignmentExpression': { 'array': false, 'object': false },
      }, { 'enforceForRenamedProperties': false } ],

      'no-empty': ['error', { 'allowEmptyCatch': true }],

      'no-unused-vars': ['error', { 'vars': 'all', 'args': 'none', 'ignoreRestSiblings': true }],

      'no-restricted-syntax': [
        'error',
        {
          'selector': 'ForInStatement',
          'message': 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
        },
        {
          'selector': 'LabeledStatement',
          'message': 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
        },
        {
          'selector': 'WithStatement',
          'message': '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
        }
      ],

      'max-len': ['warn', 200],
    },
  },

  // Import globals for ESM files.
  {
    files: ['**/*.mjs'],
    languageOptions: {
      sourceType: 'module',
      // nodeBuiltin does not include some globals like __dirname and __filename
      globals: globals.nodeBuiltin,
    },
  },

  // Import globals for CommonJS files.
  {
    files: ['**/*.js', '**/*.cjs'],
    languageOptions: {
      sourceType: 'script',
      globals: globals.node,
    },
  },

  // Force 'use strict' only in CommonJS files.
  {
    files: ['**/*.js', '**/*.cjs'],
    rules: {
      'strict': ['error', 'global'],
    },
  },

  // TypeScript specific rules that apply to all TypeScript files.
  {
    files: ['**/*.ts', '**/*.mts', '**/*.cts'],
    rules: {
      'no-underscore-dangle': 'warn'
    },
  },

  testConfiguration,
];
