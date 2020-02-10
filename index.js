"use strict";

const testConfig = require('./rules/test.js');

module.exports = {
  "parser": "babel-eslint",

  "extends": [
    "airbnb-base",
    "plugin:node/recommended"
  ],
  
  "parserOptions": {
    "sourceType": "script"
  },

  "rules": {
    "strict": ["error", "global"],
    
    "no-await-in-loop": "off",

    "lines-between-class-members": [
      "error",
      "always",
      { "exceptAfterSingleLine": true }
    ],

    "arrow-body-style": "off",

    "node/no-missing-require": ["error", { "allowModules": ["homey"] }],

    "no-underscore-dangle": "off",

    "no-bitwise": "off",

    "no-param-reassign": "off",

    "no-empty": ["error", { "allowEmptyCatch": true }],

    "no-plusplus": "off",

    "arrow-parens": ["error", "as-needed"],

    "class-methods-use-this": "off",

    "no-continue": "off",

    "dot-notation": "off",

    "space-before-function-paren": [
      "error",
      { "anonymous": "never", "named": "never", "asyncArrow": "always" }
    ],

    "no-unused-vars": [
      "error",
      { "vars": "all", "args": "none", "ignoreRestSiblings": true }
    ],

    "padded-blocks": [
      "error",
      { "blocks": "never", "switches": "never", "classes": "always" }
    ],

    "nonblock-statement-body-position": [
      "error",
      "beside",
      { "overrides": { "if": "any" } }
    ],

    "brace-style": ["error", "1tbs"],

    "no-restricted-syntax": [
      "error",
      {
        "selector": "ForInStatement",
        "message": "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array."
      },
      {
        "selector": "LabeledStatement",
        "message": "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand."
      },
      {
        "selector": "WithStatement",
        "message": "`with` is disallowed in strict mode because it makes code impossible to predict and optimize."
      }
    ],
  },

  "settings": {
    "import/core-modules": ["homey"]
  },
  ...testConfig,
}
