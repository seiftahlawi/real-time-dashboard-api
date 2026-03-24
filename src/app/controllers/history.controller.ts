import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { feed } from "../../feed";

const tickerSchema = z.object({
  ticker: z.enum(["AAPL", "TSLA", "BTC-USD", "XAGUSD", "XAUUSD", "ETHUSD", "USDTUSD", "USOIL", "SPX", "NASDAQ-NVDA"]),
});


class HistoryController {
index(req: FastifyRequest, reply: FastifyReply) {
  const result = tickerSchema.safeParse(req.params);
  if (!result.success) {
    return reply.status(400).send({ error: "Validation error", details: result.error.issues });
  }
  reply.send(feed.getHistory(result.data.ticker));
}
}

const historyController = new HistoryController();
export default historyController;
