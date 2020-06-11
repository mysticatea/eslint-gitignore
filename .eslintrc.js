"use strict"

require("ts-node/register")
const { readGitignoreFiles } = require("./lib/index.ts")

module.exports = {
    extends: ["plugin:@mysticatea/es2020", "plugin:@mysticatea/+node"],
    ignorePatterns: readGitignoreFiles({ cwd: __dirname }),
}
