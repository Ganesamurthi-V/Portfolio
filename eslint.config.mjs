import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // The animated React Bits wrappers (ScrollExpand, TiltedCard,
    // PixelTransition) take a raw `src` string and render their own <img>, so
    // project imagery has to stay on plain <img> to flow through them. Sizes
    // are set explicitly at the call sites to avoid layout shift.
    files: ["src/components/**/*.tsx"],
    rules: { "@next/next/no-img-element": "off" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored React Bits components (installed via the shadcn registry).
    // Upstream source, kept unmodified so it stays updatable — linting it
    // against this project's rules would mean forking 30+ files.
    "src/components/reactbits/**",
  ]),
]);

export default eslintConfig;
