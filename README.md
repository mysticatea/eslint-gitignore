# eslint-gitignore

[![npm version](https://img.shields.io/npm/v/eslint-gitignore.svg)](https://www.npmjs.com/package/eslint-gitignore)
[![Downloads/month](https://img.shields.io/npm/dm/eslint-gitignore.svg)](http://www.npmtrends.com/eslint-gitignore)
[![Build Status](https://github.com/mysticatea/eslint-gitignore/workflows/CI/badge.svg)](https://github.com/mysticatea/eslint-gitignore/actions)
[![codecov](https://codecov.io/gh/mysticatea/eslint-gitignore/branch/master/graph/badge.svg)](https://codecov.io/gh/mysticatea/eslint-gitignore)
[![Dependency Status](https://david-dm.org/mysticatea/eslint-gitignore.svg)](https://david-dm.org/mysticatea/eslint-gitignore)

A utility for ESLint respecting `.gitignore` files.

## 💿 Installation

Use [npm] or a compatible tool.

```
$ npm install -D eslint eslint-gitignore
```

## 📖 Usage

Use it in your `.eslintrc.js` file. For example:

```js
const { readGitignoreFiles } = require("eslint-gitignore")

module.exports = {
  // Your config.

  ignorePatterns: readGitignoreFiles({ cwd: __dirname })
};
```

Then run ESLint!

### `readGitignoreFiles(options)`

It finds `.gitignore` files, reads the found files, then converts the patterns in the found files to be able to use as `ignorePatterns` of ESLint config.

If you use `eslint --debug` CLI option, this function prints debug information.

#### Arguments

- `options.cwd` (`string`) ... Specify the current working directory. Default is `process.cwd()`. This should be the directory where your `.eslintrc.js` file exists.
- `options.patterns` (`string[]`) ... Specify glob patterns to find `.gitignore` files. Default is `["**/.gitignore", "!**/node_modules/**"]`. Please be careful to ignore unrelated directories.

#### Return Value

- (`string[]`) ... The `ignorePatterns` value.

## 📰 Changelog

See [GitHub Releases](https://github.com/mysticatea/eslint-gitignore/releases).

## ❤️ Contributing

Welcome contributing!

Please use GitHub's Issues/PRs.

### Development Tools

- `npm test` ... Run tests. It generates code coverage into `coverage` directory.
- `npm run watch` ... Run tests when files are edited.
- `npm version <patch|minor|major>` ... Bump a new version.

[npm]: https://www.npmjs.com/
