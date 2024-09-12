import { defineConfig } from "tsup";

export default defineConfig({
  dts: false,
  banner: {
    js: "#!/usr/bin/env node",
  },
  outDir: "dist",
  minify: false,
  entry: ["src/**/*.ts"],
  format: ["esm"],
  tsconfig: "./tsconfig.json",
  external: ["plop"],
  bundle: false,
  clean: true,
  sourcemap: true,
  splitting: false,
});
