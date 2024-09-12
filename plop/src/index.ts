import minimist from "minimist";
import { join } from "path/posix";
import { Plop, run } from "plop";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const args = process.argv.slice(2);
console.log(process.argv);

const argv = minimist(args);

console.log(process.cwd(), __dirname);

Plop.prepare(
  {
    cwd: process.cwd(),
    configPath: join(__dirname, "config.mjs"),
    preload: argv.preload || [],
  },
  (env: any) => Plop.execute(env, run as any)
);
