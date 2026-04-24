# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## What this repo is

`eslint-config-athom` is a shareable ESLint config published to npm as `eslint-config-athom`. It exports two configs:

- `index.js` — the base config for all Athom JavaScript/TypeScript projects (extends `airbnb-base` + `plugin:node/recommended`)
- `homey-app.js` — Homey App-specific config (extends `index.js` + `@typescript-eslint/recommended` + `plugin:homey-app/recommended`); requires a `tsconfig.json` in the consuming project

`rules/test.js` is an internal override applied via `extends` in `index.js` that enables Mocha rules for files under `test/`.

## Development workflow

There are no build steps and no automated tests in this repo. To manually validate rule changes, use the playground:

```bash
npm run lint-playground   # runs eslint on playground.js with nodemon (auto-reloads on save)
```

Edit `playground.js` with code snippets to verify that a rule fires (or doesn't) as expected, then run the command above.

## Publishing

Publishing is handled by CI via GitHub Actions (`.github/workflows/deploy.yml`):

- Push to `production` → publishes to npm under the `latest` tag
- Push to `testing` → publishes under the `beta` tag

Version bumps are triggered by including `#patch`, `#minor`, or `#major` in the commit message pushed to those branches. The `master` branch is for development; changes are promoted by merging to `production` or `testing`.

## Key design decisions

- `homey-app.js` enables `@typescript-eslint/no-floating-promises` (with `ignoreVoid: false`) and `@typescript-eslint/no-misused-promises` — these require type-checked linting, which is why `parserOptions.project` points to the consuming project's `tsconfig.json`.
- `strict` is disabled for TypeScript files (`*.ts`, `*.mts`, `*.cts`) in `index.js` because TypeScript already enforces strict mode semantics.
- `ForOfStatement` is intentionally NOT in the `no-restricted-syntax` list (unlike stock airbnb), so `for...of` loops are allowed.
- `homey` is whitelisted as a known module in both `node/no-missing-require` and `import/core-modules` since it is provided by the Homey runtime, not npm.
