import type { FastifyInstance } from "fastify";

import authRoutes from "./auth.js";
import userRoutes from "./users.js";
import requestRoutes from "./requests.js";
import conversationRoutes from "./conversations.js";
import messageRoutes from "./messages.js";
import projectRoutes from "./projects.js";
import statsRoutes from "./stats.js";
import eventRoutes from "./events.js";
import { aiRoutes } from "./ai.js";
import { notesRoutes } from "./notes.js";
import { prisma } from "../plugins/db.js";

export default async function routes(app: FastifyInstance) {
  app.get("/", async () => {
    return {
      name: "Nexus API",
      status: "online",
      version: "1.0.0",
    };
  });

  // Public health check
  // Checks both the Fastify server AND PostgreSQL through Prisma.
  app.get("/health", async (_request, reply) => {
    try {
      await prisma.$queryRaw`SELECT 1`;

      return reply.send({
        status: "ok",
        database: "connected",
      });
    } catch (error) {
      app.log.error(error, "Health check database query failed");

      return reply.status(503).send({
        status: "error",
        database: "disconnected",
      });
    }
  });

  app.register(authRoutes, { prefix: "/auth" });
  app.register(userRoutes, { prefix: "/users" });
  app.register(requestRoutes, { prefix: "/requests" });

  app.register(conversationRoutes, {
    prefix: "/conversations",
  });

  app.register(messageRoutes, { prefix: "/messages" });
  app.register(projectRoutes, { prefix: "/projects" });
  app.register(statsRoutes, { prefix: "/stats" });
  app.register(eventRoutes, { prefix: "/events" });
  app.register(aiRoutes, { prefix: "/ai" });
  app.register(notesRoutes, { prefix: "/notes" });
}
