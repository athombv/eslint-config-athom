# eslint-config-athom
ESLint config for Athom B.V. JavaScript projects.

## :fire: Starting a new project? 
If you want to create a new project that uses this ESLint config consider running [`npm init github:athombv/nodejs`](https://github.com/athombv/create-nodejs), this will create a solid base for any new Athom project!

## Usage

In your JavaScript project:

```bash
$ npm install --save-dev eslint eslint-config-athom
```

Then create a file `/.eslintrc.json` in your project's root:

```javascript
{
  "extends": "athom"
}
```

Now, edit your project's `/package.json` file to contain the following:

```json
"engines": {
  "node": ">=12.16.1"
}
```
