import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "react/jsx-key": ["error", {
        "checkFragmentShorthand": true,
        "checkKeyMustBeforeSpread": true,
        "warnOnDuplicates": true
      }],
      // TypeScript-specific adjustments can be added here
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      // Allow explicit use of `any` for MVP/dev convenience, but warn rather than error
      "@typescript-eslint/no-explicit-any": "warn"
    },
  },
];

export default eslintConfig;
