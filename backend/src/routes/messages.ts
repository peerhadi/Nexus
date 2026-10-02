import type { FastifyInstance } from "fastify";
import { requireAuth } from "../middleware/auth.js";
import {
  createMessageController,
  deleteMessageController,
  getMessagesController,
  updateMessageController,
} from "../controllers/message.controller.js";

export default async function messageRoutes(app: FastifyInstance) {
  app.addHook("preHandler", requireAuth);

  app.get("/conversation/:conversationId", getMessagesController);

  app.post("/conversation/:conversationId", createMessageController);

  app.patch("/:id", updateMessageController);

  app.delete("/:id", deleteMessageController);
}
