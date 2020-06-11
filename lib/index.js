"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readGitignoreFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const array_prototype_flatmap_1 = __importDefault(require("array.prototype.flatmap"));
const debug_1 = __importDefault(require("debug"));
const fast_glob_1 = require("fast-glob");
const debug = debug_1.default("eslint:read-gitignore-files");
const DefaultPatterns = Object.freeze(["**/.gitignore", "!**/node_modules/**"]);
/**
 * Read `.gitignore` files and convert it to `ignorePatterns` of ESLint config.
 */
function readGitignoreFiles({ cwd = process.cwd(), patterns = DefaultPatterns, } = {}) {
    debug("START: cwd = %o, patterns = %o", cwd, patterns);
    const ignorePatterns = array_prototype_flatmap_1.default(fast_glob_1.sync(patterns, {
        absolute: true,
        cwd,
        dot: true,
        onlyFiles: true,
    }), filePath => {
        debug("FOUND: %o", filePath);
        const dirPath = fast_glob_1.escapePath(`/${path_1.default
            .relative(cwd, path_1.default.dirname(filePath))
            .split(path_1.default.sep)
            .join("/")}`);
        return fs_1.default
            .readFileSync(filePath, "utf8")
            .split("\n")
            .filter(line => line.trim() && !line.trim().startsWith("#"))
            .map(pattern => {
            if (dirPath === "/") {
                return pattern;
            }
            // Modify patterns to relative to cwd.
            const negative = pattern.startsWith("!");
            const body = negative ? pattern.slice(1) : pattern;
            const prefix = body.startsWith("/")
                ? dirPath
                : `${dirPath}/**/`;
            const converted = (negative ? "!" : "") + prefix + body;
            debug("CONVERT PATTERN: before = %o, after = %o", pattern, converted);
            return converted;
        });
    });
    debug("FINISH: %o", ignorePatterns);
    return ignorePatterns;
}
exports.readGitignoreFiles = readGitignoreFiles;
//# sourceMappingURL=index.js.map