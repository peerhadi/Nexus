import type { FastifyInstance } from "fastify";
import { requireAuth } from "../middleware/auth.js";
import {
  createConversationController,
  deleteConversationController,
  getConversationController,
  getConversationsController,
  updateConversationController,
} from "../controllers/conversation.controller.js";

export default async function conversationRoutes(app: FastifyInstance) {
  app.addHook("preHandler", requireAuth);

  app.get("/", getConversationsController);

  app.get("/:id", getConversationController);

  app.post("/", createConversationController);

  app.patch("/:id", updateConversationController);

  app.delete("/:id", deleteConversationController);
}
