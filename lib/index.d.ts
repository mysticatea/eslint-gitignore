/**
 * Read `.gitignore` files and convert it to `ignorePatterns` of ESLint config.
 */
export declare function readGitignoreFiles({ cwd, patterns, }?: readGitignoreFiles.Options): string[];
export declare namespace readGitignoreFiles {
    /**
     * The options.
     */
    interface Options {
        /**
         * The absolute path to the current working directory.
         *
         * Default is `process.cwd()`.
         * This should be the directory of your `.eslintrc.js` file.
         */
        cwd?: string;
        /**
         * The glob patterns to find `.gitignore` files.
         *
         * Default is `["**\/.gitignore", "!**\/node_modules/**"]`.
         * Please be careful to ignore unrelated directories for performance.
         */
        patterns?: readonly string[];
    }
}
