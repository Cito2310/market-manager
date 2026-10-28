// No verificado por humano
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import prettier from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores(["**/node_modules/", "**/dist/", "NOTSAVE/"]),
    js.configs.recommended,
    tseslint.configs.recommended,
    {
        files: ["**/*.ts"],
        languageOptions: {
            globals: globals.node
        },
        rules: {
            "func-style": ["error", "expression"],
            "prefer-arrow-callback": "error",
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }
            ]
        }
    },
    prettier
]);
