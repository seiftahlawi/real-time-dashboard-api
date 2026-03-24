import Fastify from "fastify";
import websocket from "@fastify/websocket";
import cors from "@fastify/cors";
import { feed } from "./feed";
import { registerRoutes } from "./routes";

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = Fastify({ logger: true });

async function start() {
  await app.register(cors);
  await app.register(websocket);
  registerRoutes(app);
  feed.start();
  await app.listen({ port: PORT, host: HOST });
}


start();
