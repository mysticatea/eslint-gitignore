import fs from "fs"
import path from "path"
import flatMap from "array.prototype.flatmap"
import createDebug from "debug"
import { escapePath, sync as glob } from "fast-glob"

const debug = createDebug("eslint:read-gitignore-files")
const DefaultPatterns = Object.freeze(["**/.gitignore", "!**/node_modules/**"])

/**
 * Read `.gitignore` files and convert it to `ignorePatterns` of ESLint config.
 */
export function readGitignoreFiles({
    cwd = process.cwd(),
    patterns = DefaultPatterns,
}: readGitignoreFiles.Options = {}): string[] {
    debug("START: cwd = %o, patterns = %o", cwd, patterns)

    const ignorePatterns = flatMap(
        glob(patterns as string[], {
            absolute: true,
            cwd,
            dot: true,
            onlyFiles: true,
        }),
        filePath => {
            debug("FOUND: %o", filePath)
            const dirPath = escapePath(
                `/${path
                    .relative(cwd, path.dirname(filePath))
                    .split(path.sep)
                    .join("/")}`,
            )
            return fs
                .readFileSync(filePath, "utf8")
                .split("\n")
                .filter(line => line.trim() && !line.trim().startsWith("#"))
                .map(pattern => {
                    if (dirPath === "/") {
                        return pattern
                    }

                    // Modify patterns to relative to cwd.
                    const negative = pattern.startsWith("!")
                    const body = negative ? pattern.slice(1) : pattern
                    const prefix = body.startsWith("/")
                        ? dirPath
                        : `${dirPath}/**/`
                    const converted = (negative ? "!" : "") + prefix + body

                    debug(
                        "CONVERT PATTERN: before = %o, after = %o",
                        pattern,
                        converted,
                    )

                    return converted
                })
        },
    )

    debug("FINISH: %o", ignorePatterns)
    return ignorePatterns
}

export namespace readGitignoreFiles {
    /**
     * The options.
     */
    export interface Options {
        /**
         * The absolute path to the current working directory.
         *
         * Default is `process.cwd()`.
         * This should be the directory of your `.eslintrc.js` file.
         */
        cwd?: string

        /**
         * The glob patterns to find `.gitignore` files.
         *
         * Default is `["**\/.gitignore", "!**\/node_modules/**"]`.
         * Please be careful to ignore unrelated directories for performance.
         */
        patterns?: readonly string[]
    }
}
