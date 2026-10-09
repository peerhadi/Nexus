import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import type { FastifyInstance } from "fastify";

async function jwtPlugin(app: FastifyInstance) {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_SECRET must be configured and contain at least 32 characters.",
    );
  }

  app.register(fastifyJwt, {
    secret,
    sign: {
      expiresIn: "15m",
    },
  });
}

export default fp(jwtPlugin);
