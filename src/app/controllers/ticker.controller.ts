import { FastifyRequest, FastifyReply } from "fastify";
import { feed } from "../../feed";


class TickerController {
index(_req: FastifyRequest, reply: FastifyReply) {
  reply.send(feed.getTickers());
}

}

const tickerController = new TickerController();
export default tickerController;