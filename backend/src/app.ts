import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import dotenv from "dotenv";

import routes from "./routes/index.js";
import jwtPlugin from "./plugins/jwt.js";
import websocketPlugin from "./plugins/websocket.js";

dotenv.config();

function getAllowedOrigins(): string[] {
  const configured = process.env.FRONTEND_URL;

  if (!configured) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("FRONTEND_URL must be configured in production.");
    }

    return ["http://localhost:3000"];
  }

  const origins = configured
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  for (const origin of origins) {
    let parsed: URL;

    try {
      parsed = new URL(origin);
    } catch {
      throw new Error(`Invalid FRONTEND_URL origin: ${origin}`);
    }

    if (
      parsed.origin !== origin ||
      !["http:", "https:"].includes(parsed.protocol) ||
      parsed.username ||
      parsed.password
    ) {
      throw new Error(`Invalid FRONTEND_URL origin: ${origin}`);
    }

    if (process.env.NODE_ENV === "production" && parsed.protocol !== "https:") {
      throw new Error("Production frontend origins must use HTTPS.");
    }
  }

  return [...new Set(origins)];
}

export function buildApp() {
  const allowedOrigins = getAllowedOrigins();

  const app = Fastify({
    logger: true,
    bodyLimit: 1_048_576,
    // Do not enable trustProxy unless your deployment proxy
    // configuration is understood and trusted.
  });

  app.register(helmet);

  app.register(cors, {
    origin(origin, callback) {
      // Requests without Origin include server-to-server clients.
      // CORS does not authenticate those requests.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
  });

  app.register(jwtPlugin);
  app.register(websocketPlugin);

  app.register(routes, {
    prefix: "/api",
  });

  app.setErrorHandler((error: any, request, reply) => {
    request.log.error(
      {
        err: error,
        method: request.method,
        url: request.url,
      },
      "Request failed",
    );

    const statusCode =
      typeof error.statusCode === "number" &&
      error.statusCode >= 400 &&
      error.statusCode < 600
        ? error.statusCode
        : 500;

    const message =
      statusCode >= 500
        ? "Internal server error"
        : statusCode === 429
          ? "Too many requests. Please try again later."
          : error.message;

    return reply.code(statusCode).send({
      error: message,
    });
  });

  return app;
}
