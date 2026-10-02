import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";

import routes from "./routes/index.js";
import jwtPlugin from "./plugins/jwt.js";
import websocketPlugin from "./plugins/websocket.js";

dotenv.config();

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(cors, {
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
  });

  app.register(jwtPlugin);

  app.register(websocketPlugin);

  app.register(routes, {
    prefix: "/api",
  });

  app.setErrorHandler((error: any, _request, reply) => {
    app.log.error(error);

    const statusCode =
      "statusCode" in error && typeof error.statusCode === "number"
        ? error.statusCode
        : 500;

    return reply.code(statusCode).send({
      error: statusCode === 500 ? "Internal server error" : error.message,
    });
  });

  return app;
}
