import type { FastifyReply, FastifyRequest } from "fastify";
import {
  createAdminChatMessage,
  createAdminChatRoom,
  deleteAdminChatMessage,
  getAdminChatMessages,
  getAdminChatRooms,
  updateAdminChatMessage,
} from "../services/adminchat.service.js";

export async function getAdminChatRoomsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const rooms = await getAdminChatRooms(request.user.id);

  return reply.send({ rooms });
}

export async function createAdminChatRoomController(
  request: FastifyRequest<{
    Body: {
      name: string;
      description?: string;
    };
  }>,
  reply: FastifyReply,
) {
  const room = await createAdminChatRoom(
    request.user.id,
    request.body.name,
    request.body.description,
  );

  return reply.code(201).send({ room });
}

export async function getAdminChatMessagesController(
  request: FastifyRequest<{
    Params: { roomId: string };
  }>,
  reply: FastifyReply,
) {
  const messages = await getAdminChatMessages(
    request.params.roomId,
    request.user.id,
  );

  return reply.send({ messages });
}

export async function createAdminChatMessageController(
  request: FastifyRequest<{
    Params: { roomId: string };
    Body: { content: string };
  }>,
  reply: FastifyReply,
) {
  const content = request.body.content?.trim();

  if (!content) {
    return reply.code(400).send({ error: "Message content is required" });
  }

  if (content.length > 5000) {
    return reply.code(400).send({
      error: "Message cannot exceed 5000 characters",
    });
  }

  const message = await createAdminChatMessage(
    request.params.roomId,
    request.user.id,
    content,
  );

  return reply.code(201).send({ message });
}

export async function updateAdminChatMessageController(
  request: FastifyRequest<{
    Params: { id: string };
    Body: { content: string };
  }>,
  reply: FastifyReply,
) {
  const content = request.body.content?.trim();

  if (!content) {
    return reply.code(400).send({ error: "Message content is required" });
  }

  if (content.length > 5000) {
    return reply.code(400).send({
      error: "Message cannot exceed 5000 characters",
    });
  }

  const message = await updateAdminChatMessage(
    request.params.id,
    request.user.id,
    content,
  );

  return reply.send({ message });
}

export async function deleteAdminChatMessageController(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply,
) {
  await deleteAdminChatMessage(request.params.id, request.user.id);

  return reply.code(204).send();
}
