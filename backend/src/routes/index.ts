import type { FastifyInstance } from "fastify";

import authRoutes from "./auth.js";
import userRoutes from "./users.js";
import requestRoutes from "./requests.js";
import conversationRoutes from "./conversations.js";
import messageRoutes from "./messages.js";
import projectRoutes from "./projects.js";
import statsRoutes from "./stats.js";
import eventRoutes from "./events.js";

export default async function routes(app: FastifyInstance) {
  app.get("/", async () => {
    return {
      name: "Nexus API",
      status: "online",
      version: "1.0.0",
    };
  });

  app.get("/health", async () => {
    return {
      status: "ok",
    };
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
}
