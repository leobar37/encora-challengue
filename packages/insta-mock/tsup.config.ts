import { defineConfig } from "tsup";

const isDev = process.env.NODE_ENV === "development";
export default defineConfig({
  entry: ["./src/index.ts"],
  splitting: false,
  sourcemap: false,
  clean: false,
  minify: !isDev,
  plugins: [],
  dts: true,
  outDir: "./dist",
  format: ["cjs", "esm"],
  tsconfig: "./tsconfig.json",
});
