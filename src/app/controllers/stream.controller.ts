import { feed } from "../../feed";



class StreamController {
index(socket: import("ws").WebSocket) {
  const listener = (data: unknown) => socket.send(JSON.stringify(data));
  feed.on("price", listener);
  socket.on("close", () => feed.off("price", listener));
}
}

const streamController = new StreamController();
export default streamController;