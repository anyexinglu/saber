import * as Path from "path";

export const appRoot = Path.resolve(
  Path.dirname(require.resolve("koa")),
  "..",
  "..",
  ".."
);

export const V1_DIR = Path.join(appRoot, "src/core/v1");

export const CLIENT_DIR = Path.join(appRoot, "src/core/v1/client");

console.log("...CLIENT_DIR", CLIENT_DIR);
