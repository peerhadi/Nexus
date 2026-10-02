import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import type { FastifyInstance } from "fastify";

async function jwtPlugin(app: FastifyInstance) {
  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET ?? "development-secret-change-me",
  });
}

export default fp(jwtPlugin);
