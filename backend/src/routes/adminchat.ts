import type { FastifyInstance } from "fastify";
import { requireAuth } from "../middleware/auth.js";
import {
  createAdminChatMessageController,
  createAdminChatRoomController,
  deleteAdminChatMessageController,
  getAdminChatMessagesController,
  getAdminChatRoomsController,
  updateAdminChatMessageController,
} from "../controllers/adminchat.controller.js";

export default async function adminChatRoutes(app: FastifyInstance) {
  app.addHook("preHandler", requireAuth);

  app.get("/rooms", getAdminChatRoomsController);
  app.post("/rooms", createAdminChatRoomController);

  app.get("/rooms/:roomId/messages", getAdminChatMessagesController);
  app.post("/rooms/:roomId/messages", createAdminChatMessageController);

  app.patch("/messages/:id", updateAdminChatMessageController);
  app.delete("/messages/:id", deleteAdminChatMessageController);
}
