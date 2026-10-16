import type { FastifyInstance } from "fastify";
import { requireAuth } from "../middleware/auth.js";
import {
  createMessageController,
  createRoomController,
  deleteMessageController,
  getMessagesController,
  getRoomsController,
  updateMessageController,
} from "../controllers/adminchat.controller.js";

export default async function adminChatRoutes(app: FastifyInstance) {
  app.get("/rooms", {
    preHandler: requireAuth,
    handler: getRoomsController,
  });

  app.post<{ Body: { name: string; description?: string } }>("/rooms", {
    preHandler: requireAuth,
    handler: createRoomController,
  });

  app.get<{ Params: { roomId: string } }>("/rooms/:roomId/messages", {
    preHandler: requireAuth,
    handler: getMessagesController,
  });

  app.post<{
    Params: { roomId: string };
    Body: { content: string };
  }>("/rooms/:roomId/messages", {
    preHandler: requireAuth,
    handler: createMessageController,
  });

  app.patch<{
    Params: { id: string };
    Body: { content: string };
  }>("/messages/:id", {
    preHandler: requireAuth,
    handler: updateMessageController,
  });

  app.delete<{ Params: { id: string } }>("/messages/:id", {
    preHandler: requireAuth,
    handler: deleteMessageController,
  });
}
