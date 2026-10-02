import type { FastifyReply, FastifyRequest } from "fastify";
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
} from "../services/user.service.js";

export async function getUsersController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  return reply.send({
    users: await getUsers(),
  });
}

export async function getUserController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  return reply.send({
    user: await getUserById(request.params.id),
  });
}

export async function createUserController(
  request: FastifyRequest<{
    Body: {
      name: string;
      email: string;
      password: string;
      role: "CLIENT" | "ADMIN";
    };
  }>,
  reply: FastifyReply,
) {
  const user = await createUser(request.body);

  return reply.code(201).send({ user });
}

export async function updateUserController(
  request: FastifyRequest<{
    Params: { id: string };
    Body: {
      name?: string;
      email?: string;
      password?: string;
      role?: "CLIENT" | "ADMIN";
    };
  }>,
  reply: FastifyReply,
) {
  const user = await updateUser(request.params.id, request.body);

  return reply.send({ user });
}
