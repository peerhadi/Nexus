import type { FastifyReply, FastifyRequest } from "fastify";
import { getStats } from "../services/projects.service.js";

export async function getStatsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const isAdmin = request.user.role === "ADMIN";

  return reply.send({
    stats: await getStats(request.user.id, isAdmin),
  });
}
