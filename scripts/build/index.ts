import { nodeResolve } from "@rollup/plugin-node-resolve";
import esbuild from "rollup-plugin-esbuild";
import replace from "@rollup/plugin-replace";
import glob from "fast-glob";
import { rmSync } from "fs";
import { resolve } from "node:path/posix";
import type { Plugin, RollupOptions } from "rollup";
import * as rollup from "rollup";
import { preserveDirectives } from "rollup-plugin-preserve-directives";
import { getConfig } from "./config";
import alias from "@rollup/plugin-alias";

const dir = resolve(__dirname);

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

const main = async () => {
  const cwd = process.cwd();
  const flags = process.argv.slice(2);
  const isWatch = flags.includes("--watch");
  const isTypes = flags.includes("--types");
  const isClean = flags.includes("--clean");
  const pkg = await import(resolve(cwd, "package.json"));

  if (isClean) {
    // Clean dist folder
    rmSync("dist", { recursive: true, force: true });
  }

  const config = await getConfig({
    dir,
  });

  if (isWatch) {
    config.watch = {
      include: config.input as string[],
      chokidar: {
        ignoreInitial: true,
      },
    };
    const watcher = rollup.watch(config);
    watcher.on("change", () => {
      console.log(`[${pkg.name}]:rebuilding...`);
    });
    return;
  }
  const outputs: rollup.OutputOptions[] = Array.isArray(config.output)
    ? config.output
    : [config.output!];

  const build = await rollup.rollup(config);

  await Promise.all(outputs.map((output) => build.write(output)));

  if (isTypes) {
    await generateTypes();
  }

  console.log(`[${pkg.name}]:Build completed`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
