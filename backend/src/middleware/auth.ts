import type { FastifyRequest } from "fastify";
import { AppError } from "../utils/errors.js";

export async function requireAuth(request: FastifyRequest) {
  try {
    await request.jwtVerify();
  } catch {
    throw new AppError("Authentication required", 401);
  }
}

export async function requireAdmin(request: FastifyRequest) {
  await requireAuth(request);

  if (request.user.role !== "ADMIN") {
    throw new AppError("Admin access required", 403);
  }
}
