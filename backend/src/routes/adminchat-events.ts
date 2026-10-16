import type { FastifyInstance } from "fastify";
import { WebSocket } from "ws";
import { prisma } from "../plugins/db.js";
import {
  AdminChatError,
  assertAdminRoomAccess,
} from "../services/adminchat.service.js";
import { subscribe } from "../services/event-stream.service.js";

type TicketClaims = {
  id: string;
  role: string;
  email: string;
};

type EventParams = {
  roomId: string;
};

type EventQuery = {
  ticket?: string;
};

export default async function adminChatEventsRoutes(app: FastifyInstance) {
  app.get<{
    Params: EventParams;
    Querystring: EventQuery;
  }>("/adminchat/:roomId", { websocket: true }, (socket, request) => {
    const { roomId } = request.params;
    const ticket = request.query.ticket;

    if (!ticket) {
      socket.close(1008, "Missing WebSocket ticket");
      return;
    }

    void (async () => {
      try {
        const claims = await app.jwt.verify<TicketClaims>(ticket);

        if (!claims.id || claims.role !== "ADMIN") {
          socket.close(1008, "Admin access required");
          return;
        }

        const user = await prisma.user.findUnique({
          where: { id: claims.id },
          select: {
            id: true,
            role: true,
            email: true,
          },
        });

        if (
          !user ||
          user.role !== "ADMIN" ||
          user.email.toLowerCase() !== claims.email?.toLowerCase()
        ) {
          socket.close(1008, "Invalid WebSocket ticket");
          return;
        }

        await assertAdminRoomAccess(user.id, roomId);

        if (socket.readyState !== WebSocket.OPEN) {
          return;
        }

        subscribe(roomId, socket);
      } catch (error) {
        if (socket.readyState !== WebSocket.OPEN) {
          return;
        }

        if (error instanceof AdminChatError) {
          socket.close(1008, error.message);
          return;
        }

        socket.close(1008, "Unauthorized WebSocket connection");
      }
    })();
  });
}
