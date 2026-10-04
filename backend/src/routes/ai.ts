import type { FastifyInstance } from "fastify";
import {
  chatWithAI,
  deleteAIConversation,
  getAIConversation,
  getAIConversations,
} from "../controllers/ai.controller.js";
import { requireAuth } from "../middleware/auth.js";

export async function aiRoutes(app: FastifyInstance) {
  app.get("/conversations", {
    preHandler: requireAuth,
    handler: getAIConversations,
  });

  app.get("/conversations/:id", {
    preHandler: requireAuth,
    handler: getAIConversation,
  });

  app.delete("/conversations/:id", {
    preHandler: requireAuth,
    handler: deleteAIConversation,
  });

  app.post("/chat", {
    preHandler: requireAuth,
    handler: chatWithAI,
  });
}
