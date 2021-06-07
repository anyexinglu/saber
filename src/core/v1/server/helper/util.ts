import * as path from "path";
import * as os from "os";

const isWindows = os.platform() === "win32";

function slash(p: string): string {
  return p.replace(/\\/g, "/");
}

export function normalizePath(id: string): string {
  return path.posix.normalize(isWindows ? slash(id) : id);
}
