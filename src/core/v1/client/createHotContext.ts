const ctxToListenersMap = new Map<
  string,
  Map<string, ((customData: any) => void)[]>
>();
const customListenersMap = new Map<string, ((customData: any) => void)[]>();

// Just infer the return type for now
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createHotContext = (ownerPath: string) => {
  if (!dataMap.has(ownerPath)) {
    dataMap.set(ownerPath, {});
  }

  // when a file is hot updated, a new context is created
  // clear its stale callbacks
  const mod = hotModulesMap.get(ownerPath);
  if (mod) {
    mod.callbacks = [];
  }

  // clear stale custom event listeners
  const staleListeners = ctxToListenersMap.get(ownerPath);
  if (staleListeners) {
    for (const [event, staleFns] of staleListeners) {
      const listeners = customListenersMap.get(event);
      if (listeners) {
        customListenersMap.set(
          event,
          listeners.filter(l => !staleFns.includes(l))
        );
      }
    }
  }

  const newListeners = new Map();
  ctxToListenersMap.set(ownerPath, newListeners);

  function acceptDeps(deps: string[], callback: HotCallback["fn"] = () => {}) {
    const mod: HotModule = hotModulesMap.get(ownerPath) || {
      id: ownerPath,
      callbacks: [],
    };
    mod.callbacks.push({
      deps,
      fn: callback,
    });
    hotModulesMap.set(ownerPath, mod);
  }

  const hot = {
    get data() {
      return dataMap.get(ownerPath);
    },

    accept(deps: any, callback?: any) {
      if (typeof deps === "function" || !deps) {
        // self-accept: hot.accept(() => {})
        acceptDeps([ownerPath], ([mod]) => deps && deps(mod));
      } else if (typeof deps === "string") {
        // explicit deps
        acceptDeps([deps], ([mod]) => callback && callback(mod));
      } else if (Array.isArray(deps)) {
        acceptDeps(deps, callback);
      } else {
        throw new Error(`invalid hot.accept() usage.`);
      }
    },

    acceptDeps() {
      throw new Error(
        `hot.acceptDeps() is deprecated. ` +
          `Use hot.accept() with the same signature instead.`
      );
    },

    dispose(cb: (data: any) => void) {
      disposeMap.set(ownerPath, cb);
    },

    prune(cb: (data: any) => void) {
      pruneMap.set(ownerPath, cb);
    },

    // TODO
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    decline() {},

    invalidate() {
      // TODO should tell the server to re-perform hmr propagation
      // from this module as root
      location.reload();
    },

    // custom events
    on(event: string, cb: () => void) {
      const addToMap = (map: Map<string, any[]>) => {
        const existing = map.get(event) || [];
        existing.push(cb);
        map.set(event, existing);
      };
      addToMap(customListenersMap);
      addToMap(newListeners);
    },
  };

  return hot;
};
