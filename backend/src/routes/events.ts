import type { FastifyInstance } from "fastify";
import type { WebSocket } from "ws";

import { prisma } from "../plugins/db.js";
import { subscribe } from "../services/event-stream.service.js";

export default async function eventRoutes(app: FastifyInstance) {
  app.get(
    "/conversation/:conversationId",
    {
      websocket: true,
    },
    async (socket: WebSocket, request: any) => {
      try {
        const conversationId = request.params.conversationId;

        const ticket = request.query?.ticket;

        if (!ticket) {
          socket.close(1008, "WebSocket ticket required");
          return;
        }

        let user;

        try {
          user = await app.jwt.verify(ticket);
        } catch {
          socket.close(1008, "Invalid or expired ticket");
          return;
        }

        const conversation = await prisma.conversation.findUnique({
          where: {
            id: conversationId,
          },
        });

        if (!conversation) {
          socket.close(1008, "Conversation not found");
          return;
        }

        if (user.role !== "ADMIN" && conversation.clientId !== user.id) {
          socket.close(1008, "Access denied");
          return;
        }

        subscribe(conversationId, socket);

        socket.send(
          JSON.stringify({
            type: "connected",
            conversationId,
          }),
        );
      } catch {
        socket.close(1011, "Internal server error");
      }
    },
  );
}
