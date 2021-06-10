import WebSocket from "ws";

export function createWebSocketServer() {
  let wss = new WebSocket.Server({ noServer: true });

  let bufferedError = null;
  return {
    send(payload) {
      if (payload.type === "error" && !wss.clients.size) {
        bufferedError = payload;
        return;
      }

      const stringified = JSON.stringify(payload);
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(stringified);
        }
      });
    },
  };
}
