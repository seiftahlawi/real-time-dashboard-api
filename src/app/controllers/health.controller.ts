import { FastifyRequest, FastifyReply } from "fastify";

class HealthController {
   index(_req: FastifyRequest, reply: FastifyReply) {
  reply.send({ status: "ok" });
}
}
const healthController = new HealthController();
export default healthController;