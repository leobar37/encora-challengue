import { nodeResolve } from "@rollup/plugin-node-resolve";
import esbuild from "rollup-plugin-esbuild";
import replace from "@rollup/plugin-replace";
import { readFileSync } from "node:fs";
import { preserveDirectives } from "rollup-plugin-preserve-directives";
import type { Plugin, RollupOptions } from "rollup";
import * as rollup from "rollup";
import glob from "fast-glob";
import { rmSync } from "fs";
import { resolve } from "node:path/posix";
import alias from "@rollup/plugin-alias";
const dir = resolve(__dirname, "dist");

const generateTypes = async () => {
  const { execa } = await import("execa");
  await execa(
    "pnpm",
    ["tsc", "--project", "./tsconfig.build.json", "--emitDeclarationOnly"],
    {
      cwd: dir,
      stdio: "inherit",
    }
  );
};
const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));

const main = async () => {
  const plugins: Plugin[] = [
    nodeResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    alias({}),
    esbuild({
      sourceMap: true,
      tsconfig: resolve(dir, "tsconfig.json"),
      platform: "browser",
    }),
    replace({
      preventAssignment: true,
    }),
    preserveDirectives(),
  ];

  const watch = process.argv.includes("--watch");
  const types = process.argv.includes("--types");

  // Clean dist folder
  rmSync("dist", { recursive: true, force: true });

  const deps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ];

  const external = deps.length ? new RegExp(`^(${deps.join("|")})`) : undefined;
  const entries = await glob("./src/**/*.{ts,tsx}");

  const outputs: RollupOptions["output"] = [
    {
      format: "es",
      exports: "named",
      entryFileNames: "[name].js",
      dir: "dist/esm",
      preserveModules: true,
    },
    {
      format: "cjs",
      exports: "named",
      entryFileNames: "[name].cjs",
      preserveModules: true,
      dir: "dist/cjs",
    },
  ];

  const config = {
    input: entries,
    output: outputs,
    plugins,
    external,
  } as RollupOptions;

  if (watch) {
    config.watch = {
      include: config.input as string[],
      chokidar: {
        ignoreInitial: true,
      },
    };
    const watcher = rollup.watch(config);
    watcher.on("change", () => {
      console.log(`rebuilding...`);
    });
    return;
  }
  const build = await rollup.rollup(config);
  await Promise.all(outputs.map((output) => build.write(output)));
  if (types) {
    await generateTypes();
  }
  console.log("Build completed");
};

main();
