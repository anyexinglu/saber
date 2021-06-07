import * as path from "path";

export const appRoot = path.resolve(
  path.dirname(require.resolve("koa")),
  "..",
  "..",
  ".."
);

export const CLIENT_DIR = path.join(appRoot, "src/core/v1/client");

console.log("...CLIENT_DIR", CLIENT_DIR);
