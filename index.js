'use strict';

module.exports = {
  "plugins": ["node"],
  "extends": [
    "airbnb-base",
    "plugin:node/recommended"
  ],
  "rules": {
    "node/no-missing-require": ["error", {"allowModules": ["homey"]}],
    "node/exports-style": ["error", "module.exports"],
    "no-underscore-dangle": "off",
    "max-len": ["warn", {
      "code": 300
    }],
    "consistent-return": "off",
    "no-bitwise": "off",
    "no-param-reassign": ["warn"],
    "no-await-in-loop": "off",
    "no-empty": "off",
    "no-plusplus": "off",
    "no-shadow": "off",
    "no-process-exit": "off",
    "arrow-parens": "off",
    "arrow-body-style": "off",
    "curly": "off",
    "prefer-destructuring": "off",
    "class-methods-use-this": "off",
    "no-continue": "off",
    // copied from https://github.com/airbnb/javascript/blob/6d05dd898acfec3299cc2be8b6188be542824965/packages/eslint-config-airbnb-base/rules/style.js#L332-L352
    "no-restricted-syntax": [
      "error",
      {
        "selector": "ForInStatement",
        "message": "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array."
      },
      // we don't transpile so allow for..of loops
      // {
      //   "selector": "ForOfStatement",
      //   "message": "iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations."
      // },
      {
        "selector": "LabeledStatement",
        "message": "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand."
      },
      {
        "selector": "WithStatement",
        "message": "`with` is disallowed in strict mode because it makes code impossible to predict and optimize."
      }
    ]
  },
  "parserOptions": {
    "sourceType": "script",
    "ecmaVersion": 2018
  },
  "settings": {
    "import/core-modules": ["homey"]
  }
}
