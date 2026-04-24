# eslint-config-athom

ESLint config for Athom B.V. JavaScript and TypeScript projects.

## Requirements

- ESLint >= 10
- Node.js >= 20.19.0

## Installation

```bash
npm install --save-dev eslint eslint-config-athom
```

## Usage

Create an `eslint.config.js` in your project root and extend one of the available configs:

```js
import athom from 'eslint-config-athom';

export default [
  ...athom.configs.recommended,
];
```

### Available configs

| Config | Description |
|--------|-------------|
| `recommended` | Base config for JavaScript and TypeScript projects |
| `recommendedTypeChecked` | Extends `recommended` with type-aware rules — requires `tsconfig.json` |
| `homeyApp` | Extends `recommended` with Homey App-specific rules |
| `homeyAppTypeChecked` | Extends `homeyApp` with type-aware rules — requires `tsconfig.json` |

### Type-checked configs

When using `recommendedTypeChecked` or `homeyAppTypeChecked`, you must point the TypeScript parser at your `tsconfig.json`:

```js
import athom from 'eslint-config-athom';

export default [
  ...athom.configs.homeyAppTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
```

## Rules

### `recommended`

Extends the following:

- [`@eslint/js` recommended](https://eslint.org/docs/latest/rules/) — core JavaScript rules covering correctness, best practices, and common mistakes
- [`eslint-plugin-n` recommended](https://github.com/eslint-community/eslint-plugin-n#-rules) — Node.js-specific rules, including detecting missing dependencies, deprecated APIs, and syntax unsupported by the target Node version
- [`typescript-eslint` recommended](https://typescript-eslint.io/rules/) — TypeScript-specific rules for type safety and idiomatic TypeScript usage (TypeScript files only)

`.mjs` files are treated as ESM with Node.js built-in globals. `.cjs` files are treated as CommonJS with full Node.js globals (`__dirname`, `__filename`, `require`) and must declare `'use strict'`. `.js` files have no assumed module type — ESLint's default applies (`script`). It is good practice to explicitly set `sourceType` for `.js` files in your own config:

```js
export default [
  ...athom.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module', // or 'commonjs'
    },
  },
];
```

TypeScript files (`.ts`, `.mts`, `.cts`) rely on `tsconfig.json` for globals rather than ESLint.

Custom rules:

| Rule | Reason | Severity |
|------|--------|----------|
| [`lines-between-class-members`](https://eslint.org/docs/latest/rules/lines-between-class-members) | Homey drivers and devices are class-heavy; blank lines between members make them significantly easier to scan. Single-line members are exempt. | ⚠️ |
| [`max-len`](https://eslint.org/docs/latest/rules/max-len) | A hard error on long lines is too disruptive; 200 characters as a warning catches genuinely unreasonable lines without blocking common patterns. | ⚠️ |
| [`no-empty`](https://eslint.org/docs/latest/rules/no-empty) | Empty catch blocks are intentional in many Homey patterns where errors are expected and swallowed by design (`allowEmptyCatch` is enabled). | 🚫 |
| [`no-restricted-syntax`](https://eslint.org/docs/latest/rules/no-restricted-syntax) | `for...in` iterates prototype chains and has caused real bugs. Labeled statements and `with` are effectively never the right tool. | 🚫 |
| [`no-unused-vars`](https://eslint.org/docs/latest/rules/no-unused-vars) | Unused function arguments are common in Homey callbacks where the signature is fixed by the SDK but not all arguments are needed. | 🚫 |
| [`prefer-destructuring`](https://eslint.org/docs/latest/rules/prefer-destructuring) | Object destructuring is idiomatic in this codebase. Array destructuring and renamed properties are not enforced. | ⚠️ |
| [`strict`](https://eslint.org/docs/latest/rules/strict) | Explicit strict mode in CJS files (`.js`, `.cjs`) prevents accidental sloppy mode behavior. Not applied to TypeScript files. | 🚫 |
| [`no-underscore-dangle`](https://eslint.org/docs/latest/rules/no-underscore-dangle) | Underscore prefixes are a JS convention for private members that TypeScript's access modifiers make redundant. TypeScript files only. | ⚠️ |

---

### `recommendedTypeChecked`

Extends `recommended` and adds [`typescript-eslint` type-checked rules](https://typescript-eslint.io/rules/?=recommended-typeInformation). These rules require type information from `tsconfig.json` and enable deeper analysis than syntax-only rules — catching issues like unhandled promises (`no-floating-promises`), promises passed where synchronous callbacks are expected (`no-misused-promises`), and unsafe use of `any`-typed values.

---

### `homeyApp`

Extends `recommended` and adds [`eslint-plugin-homey-app` recommended](https://github.com/athombv/eslint-plugin-homey-app), which enforces Homey SDK conventions such as using `this.homey.setTimeout` instead of the global and `this.log` instead of `console.log`. Generated output in `.homeybuild/` is ignored automatically.

Custom rules:

| Rule | Reason | Severity |
|------|--------|----------|
| [`n/no-missing-import`](https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-missing-import.md) | Catches ESM imports of packages not in `dependencies`. `homey` is whitelisted as it is provided by the Homey runtime. | 🚫 |
| [`n/no-missing-require`](https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-missing-require.md) | Same as above for `require()` calls. | 🚫 |
| [`n/no-unsupported-features/es-syntax`](https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unsupported-features/es-syntax.md) | Homey apps target a specific Node.js version; this catches syntax that would silently fail at runtime. ES module syntax is exempted. | 🚫 |
| [`preserve-caught-error`](https://eslint.org/docs/latest/rules/no-throw-literal) | Disabled — Homey apps frequently re-throw domain-specific errors without wrapping the original, which this rule incorrectly flags. | off |
| [`@typescript-eslint/ban-ts-comment`](https://typescript-eslint.io/rules/ban-ts-comment) | `@ts-ignore` without an explanation is a code smell; requiring a description ensures suppression is intentional and documented. | ⚠️ |
| [`@typescript-eslint/consistent-type-imports`](https://typescript-eslint.io/rules/consistent-type-imports) | Type-only imports should use `import type` to make the distinction explicit and allow better tree-shaking. | ⚠️ |
| [`@typescript-eslint/explicit-function-return-type`](https://typescript-eslint.io/rules/explicit-function-return-type) | Homey SDK methods often have non-obvious return types; explicit annotations make the interface clearer. Inline expressions are exempt. | ⚠️ |
| [`@typescript-eslint/explicit-member-accessibility`](https://typescript-eslint.io/rules/explicit-member-accessibility) | Homey app classes have a mix of SDK-overridden and internal methods; explicit visibility makes the intended API surface clear. | ⚠️ |
| [`@typescript-eslint/no-import-type-side-effects`](https://typescript-eslint.io/rules/no-import-type-side-effects) | Type imports that cause side effects indicate a structural issue; paired with `consistent-type-imports` to keep the import model clean. | 🚫 |

---

### `homeyAppTypeChecked`

Extends `homeyApp` and adds the same type-checked rules as `recommendedTypeChecked`, enabling deeper async safety analysis on top of the Homey-specific rules.

**Migrating from JavaScript to TypeScript?** The `no-unsafe-*` rules will fire constantly on files that haven't been converted yet, because TypeScript infers `any` for untyped JS. You can temporarily disable them while the migration is in progress:

```js
import athom from 'eslint-config-athom';

export default [
  ...athom.configs.homeyAppTypeChecked,
  {
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
    },
  },
];
```

Re-enable them one by one as files are converted.

## Planned

- **`eslint-plugin-import`** — will be added to `recommended` once it supports ESLint v10. Provides rules for validating import/export correctness, ordering, and preventing duplicate imports.

## Legacy Config

This package requires ESLint v10 and flat config. For legacy config support, install v3:

```bash
npm install --save-dev eslint-config-athom@3
```
