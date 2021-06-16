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
const HMR_HEADER = "saber-hmr";

let socket;

try {
  const url = `${socketProtocol}://${socketHost}`;
  console.log("...socket url", url);
  socket = new WebSocket(url, HMR_HEADER);

  socket.onopen = function () {
    // Web Socket 已连接上，使用 send() 方法发送数据
    socket.send("发送数据");
    alert("数据发送中...");
  };
  // Listen for messages
  socket.onmessage = async ({ data }) => {
    console.log("Received Message: " + data);
    handleMessage(JSON.parse(data));
  };

  socket.onclose = function (event) {
    // handle error event
    console.error("WebSocket onClose:", event);
  };
  socket.onerror = function (event) {
    // handle error event
    console.error("WebSocket error observed:", event);
  };
} catch (e) {
  console.log("...socket e", e);
}

const base = "/"; //  __BASE__ ||

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
