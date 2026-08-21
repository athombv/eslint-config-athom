"use strict";

module.exports = {
  "parser": "@typescript-eslint/parser",

  "extends": [
    "airbnb-base",
    "plugin:node/recommended",
    "./rules/test", // Import rules for test files (currently mostly mocha rules)
  ],
  
  "parserOptions": {
    "sourceType": "script"
  },

  "rules": {
    "strict": ["error", "global"],
    "padded-blocks": "off",

    "no-await-in-loop": "off",

    "lines-between-class-members": [
      "error",
      "always",
      { "exceptAfterSingleLine": true }
    ],

    "prefer-destructuring": [
      "error",
      {
        "VariableDeclarator": { "array": false, "object": true },
        "AssignmentExpression": { "array": false, "object": false },
      },
      { "enforceForRenamedProperties": false }
    ],

    "arrow-body-style": "off",

    "node/no-missing-require": ["error", { "allowModules": ["homey"] }],

    "node/no-unpublished-require": ["error", { "allowModules": ["homey"]}],

    "no-underscore-dangle": "off",

    "no-bitwise": "off",

    "no-param-reassign": "off",

    "no-empty": ["error", { "allowEmptyCatch": true }],

    "no-plusplus": "off",

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

    "no-shadow": "off",
    "max-len": ["warn", 200],

    "no-import-assign": "warn",
    "no-loss-of-precision": "warn",
    "no-constructor-return": "warn",
    "no-setter-return": "warn",
    "no-promise-executor-return": "warn",
    "no-useless-backreference": "warn",
    "import/no-import-module-exports": "warn",

    "default-case-last": "off",
    "default-param-last": "off",
    "function-call-argument-newline": "off",
    "function-paren-newline": ["error", "consistent"],
    "grouped-accessor-pairs": "off",
    "no-restricted-exports": "off",
    "prefer-exponentiation-operator": "off",
    "prefer-regex-literals": "off",
    "no-nonoctal-decimal-escape": "off",
    "import/no-relative-packages": "off",
  },
  "overrides": [
    {
      "files": ["*.ts", "*.mts", "*.cts"],
      "rules": {
        "strict": "off"
      }
    }
  ],

  "settings": {
    "import/core-modules": ["homey"]
  },
}
