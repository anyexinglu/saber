import * as chokidar from "chokidar";
import * as path from "path";
import { normalizePath } from "./helper/util";
import { appRoot } from "./constants";

export default function hmr(start) {
  const watcher = chokidar.watch(path.resolve(appRoot), {
    ignored: ["**/node_modules/**", "**/.git/**"],
    ignoreInitial: true,
    ignorePermissionErrors: true,
    disableGlobbing: true,
    // ...watchOptions
  });

  watcher.on("change", async changeFile => {
    const file = normalizePath(changeFile);
    console.log("...change file...", start, changeFile, file);
    // // invalidate module graph cache on file change
    // moduleGraph.onFileChange(file)
    try {
      // start({});
      await handleHMRUpdate(file); // TODO: server
    } catch (err) {
      console.log("...ws.send", err);

      //     ws.send({
      //       type: 'error',
      //       err: prepareError(err)
      //     })
    }
  });

  watcher.on("add", file => {
    console.log("...add file", file);
    // handleFileAddUnlink(normalizePath(file), server)
  });
}

// https://github.com/ctripcorp/wean/blob/663810f09d513fbc7c8668f4be26dc00e43f1c13/core/cli.js#L35
// https://sourcegraph.com/github.com/vitejs/vite/-/blob/packages/vite/src/node/server/hmr.ts#L16:29
export async function handleHMRUpdate(
  file: string
  // server: ViteDevServer
): Promise<any> {
  console.log("...file", file);
}
