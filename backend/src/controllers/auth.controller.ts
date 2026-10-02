import type { FastifyReply, FastifyRequest } from "fastify";
import { login, signup } from "../services/auth.service.js";
import { prisma } from "../plugins/db.js";

interface SignupBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export async function signupController(
  request: FastifyRequest<{ Body: SignupBody }>,
  reply: FastifyReply,
) {
  const user = await signup(request.body);

  const token = await reply.jwtSign({
    id: user.id,
    role: user.role,
    email: user.email,
  });

  return reply.code(201).send({
    user,
    token,
  });
}

export async function loginController(
  request: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply,
) {
  const user = await login(request.body);

  const token = await reply.jwtSign({
    id: user.id,
    role: user.role,
    email: user.email,
  });

  return reply.send({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
}

export async function meController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = await prisma.user.findUnique({
    where: {
      id: request.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    return reply.status(404).send({
      error: "User not found",
    });
  }

  return reply.send({
    user,
  });
}

export async function wsTicketController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const ticket = await reply.jwtSign(
    {
      id: request.user.id,
      role: request.user.role,
      email: request.user.email,
    },
    {
      expiresIn: "60s",
    },
  );

  return reply.send({ ticket });
}
