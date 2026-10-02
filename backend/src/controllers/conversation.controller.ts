import type { FastifyReply, FastifyRequest } from "fastify";
import {
  createConversation,
  deleteConversation,
  getConversation,
  getConversations,
  updateConversation,
} from "../services/conversation.service.js";

export async function getConversationsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const isAdmin = request.user.role === "ADMIN";

  return reply.send({
    conversations: await getConversations(request.user.id, isAdmin),
  });
}

export async function getConversationController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const isAdmin = request.user.role === "ADMIN";

  return reply.send({
    conversation: await getConversation(
      request.params.id,
      request.user.id,
      isAdmin,
    ),
  });
}

export async function createConversationController(
  request: FastifyRequest<{
    Body: {
      clientId?: string;
      adminId?: string;
      projectId?: string;
      subject?: string;
    };
  }>,
  reply: FastifyReply,
) {
  let clientId = request.user.id;
  let adminId = request.body.adminId;

  if (request.user.role === "ADMIN") {
    if (!request.body.clientId) {
      return reply.code(400).send({
        error: "clientId is required",
      });
    }

    clientId = request.body.clientId;
    adminId = request.user.id;
  }

  if (!adminId) {
    const admin = await import("../plugins/db.js").then(({ prisma }) =>
      prisma.user.findFirst({
        where: {
          role: "ADMIN",
        },
        orderBy: {
          createdAt: "asc",
        },
      }),
    );

    if (!admin) {
      return reply.code(404).send({
        error: "No admin is available",
      });
    }

    adminId = admin.id;
  }

  const conversation = await createConversation(
    clientId,
    adminId,
    request.body.subject,
    request.body.projectId,
  );

  return reply.code(201).send({
    conversation,
  });
}

export async function updateConversationController(
  request: FastifyRequest<{
    Params: { id: string };
    Body: {
      subject?: string;
      status?: "OPEN" | "CLOSED";
    };
  }>,
  reply: FastifyReply,
) {
  const isAdmin = request.user.role === "ADMIN";

  return reply.send({
    conversation: await updateConversation(
      request.params.id,
      request.user.id,
      isAdmin,
      request.body,
    ),
  });
}

export async function deleteConversationController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const isAdmin = request.user.role === "ADMIN";

  await deleteConversation(request.params.id, request.user.id, isAdmin);

  return reply.code(204).send();
}
