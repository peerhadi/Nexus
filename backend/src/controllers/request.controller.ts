import type { FastifyReply, FastifyRequest } from "fastify";
import {
  createProjectFromRequest,
  createRequest,
  deleteRequest,
  getRequestById,
  getRequests,
  updateRequest,
} from "../services/request.service.js";

export async function getRequestsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const isAdmin = request.user.role === "ADMIN";

  return reply.send({
    requests: await getRequests(request.user.id, isAdmin),
  });
}

export async function getRequestController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const isAdmin = request.user.role === "ADMIN";

  return reply.send({
    request: await getRequestById(request.params.id, request.user.id, isAdmin),
  });
}

export async function createRequestController(
  request: FastifyRequest<{
    Body: {
      name: string;
      email: string;
      company?: string;
      subject?: string;
      message: string;
    };
  }>,
  reply: FastifyReply,
) {
  const created = await createRequest({
    ...request.body,
    clientId: request.user.id,
  });

  return reply.code(201).send({
    request: created,
  });
}

export async function updateRequestController(
  request: FastifyRequest<{
    Params: { id: string };
    Body: {
      status?: "NEW" | "IN_PROGRESS" | "REPLIED" | "CLOSED";
      subject?: string;
      message?: string;
    };
  }>,
  reply: FastifyReply,
) {
  const isAdmin = request.user.role === "ADMIN";

  return reply.send({
    request: await updateRequest(
      request.params.id,
      request.user.id,
      isAdmin,
      request.body,
    ),
  });
}

export async function deleteRequestController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const isAdmin = request.user.role === "ADMIN";

  await deleteRequest(request.params.id, request.user.id, isAdmin);

  return reply.code(204).send();
}
export async function createProjectFromRequestController(
  request: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
) {
  const result = await createProjectFromRequest(
    request.params.id,
    request.user.id,
  );

  return {
    project: result.project,
    request: result.request,
  };
}
