import type { FastifyInstance } from "fastify";
import { requireAuth } from "../middleware/auth.js";
import { getStatsController } from "../controllers/stats.controller.js";

export default async function statsRoutes(app: FastifyInstance) {
  app.get("/", {
    preHandler: requireAuth,
    handler: getStatsController,
  });
}
