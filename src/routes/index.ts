import { FastifyInstance } from "fastify";
import healthController from "../app/controllers/health.controller";
import tickerController from "../app/controllers/ticker.controller";
import historyController from "../app/controllers/history.controller";
import streamController from "../app/controllers/stream.controller";

export function registerRoutes(app: FastifyInstance) {
  app.get("/health", healthController.index);
  app.get("/tickers", tickerController.index);
  app.get("/history/:ticker", historyController.index);
  app.get("/prices/live", { websocket: true }, streamController.index);
}
