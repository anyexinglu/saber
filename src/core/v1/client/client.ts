// const __BASE__: string = "";
// const __HMR_PROTOCOL__: string = "";
// const __HMR_HOSTNAME__: string = "";
// const __HMR_PORT__: string = "24678";
// const __HMR_TIMEOUT__: number = 4000;
// const __HMR_ENABLE_OVERLAY__: boolean = false;

// use server configuration, then fallback to inference
const socketProtocol = "ws";
// __HMR_PROTOCOL__ ||
// ((window.location as any).protocol === "https:" ? "wss" : "ws");
const socketHost = "localhost:4000"; // localhost / 127.0.0.1 is not supported
// `${
//   __HMR_HOSTNAME__ || (window.location as any).hostname
// }:${__HMR_PORT__}`;

let socket;

try {
  const url = `${socketProtocol}://${socketHost}`;
  console.log("...socket url", url);
  socket = new WebSocket(url, "saber-hmr");
  WebSocket.onerror = function (event) {
    console.error("WebSocket error observed:", event);
  };
} catch (e) {
  console.log("...socket e", e);
}

const base = "/"; //  __BASE__ ||

// Listen for messages
socket?.addEventListener("message", async ({ data }) => {
  handleMessage(JSON.parse(data));
});

async function handleMessage(payload) {
  switch (payload.type) {
    case "connected":
      console.log(`[vite] connected.`);
      // proxy(nginx, docker) hmr ws maybe caused timeout,
      // so send ping package let ws keep alive.
      setInterval(() => socket.send("ping"), 4000);
      break;
    case "update":
      // if this is the first update and there's already an error overlay, it
      // means the page opened with existing server compile error and the whole
      // module script failed to load (since one of the nested imports is 500).
      // in this case a normal update won't work and a full reload is needed.
      window.location.reload();
    // if (isFirstUpdate && hasErrorOverlay()) {
    //   window.location.reload();
    //   return;
    // } else {
    //   clearErrorOverlay();
    //   isFirstUpdate = false;
    // }
  }
}
