import type { FastifyReply, FastifyRequest } from "fastify";
import {
  createMessage,
  deleteMessage,
  getMessages,
  updateMessage,
} from "../services/messages.service.js";

export async function getMessagesController(
  request: FastifyRequest<{
    Params: { conversationId: string };
  }>,
  reply: FastifyReply,
) {
  const isAdmin = request.user.role === "ADMIN";

  return reply.send({
    messages: await getMessages(
      request.params.conversationId,
      request.user.id,
      isAdmin,
    ),
  });
}

export async function createMessageController(
  request: FastifyRequest<{
    Params: { conversationId: string };
    Body: {
      content: string;
    };
  }>,
  reply: FastifyReply,
) {
  const senderType = request.user.role === "ADMIN" ? "ADMIN" : "CLIENT";

  const message = await createMessage(
    request.params.conversationId,
    request.user.id,
    senderType,
    request.body.content,
  );

  return reply.code(201).send({
    message,
  });
}

export async function updateMessageController(
  request: FastifyRequest<{
    Params: { id: string };
    Body: {
      content: string;
    };
  }>,
  reply: FastifyReply,
) {
  return reply.send({
    message: await updateMessage(
      request.params.id,
      request.user.id,
      request.body.content,
    ),
  });
}

export async function deleteMessageController(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply,
) {
  const isAdmin = request.user.role === "ADMIN";

  await deleteMessage(request.params.id, request.user.id, isAdmin);

  return reply.code(204).send();
}
