import assert from "assert"
import path from "path"
import { readGitignoreFiles } from "../lib/index"

describe("readGitignoreFiles() function", () => {
    it("should return proper patterns.", () => {
        assert.deepStrictEqual(
            readGitignoreFiles({ cwd: path.join(__dirname, "fixtures") }),
            [
                "/aaa.js",
                "bbb.js",
                "/\\(a special name\\)/special.js",
                "/nested/foo.js",
                "/nested/**/bar.js",
                "!/nested/**/bbb.js",
            ],
        )
    })

    it("should return proper patterns if `options.patterns` is present.", () => {
        assert.deepStrictEqual(
            readGitignoreFiles({
                cwd: path.join(__dirname, "fixtures"),
                patterns: [".gitignore"],
            }),
            ["/aaa.js", "bbb.js"],
        )
    })

    it("should not be timed out by node_modules.", () => {
        assert.deepStrictEqual(
            readGitignoreFiles({ cwd: path.resolve(__dirname, "..") }),
            [
                "/.nyc_output",
                "/coverage",
                "/dist",
                "/node_modules",
                "/test.*",
                "/test/fixtures/aaa.js",
                "/test/fixtures/**/bbb.js",
                "/test/fixtures/\\(a special name\\)/special.js",
                "/test/fixtures/nested/foo.js",
                "/test/fixtures/nested/**/bar.js",
                "!/test/fixtures/nested/**/bbb.js",
            ],
        )
    })
})
