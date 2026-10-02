import type { FastifyInstance } from "fastify";
import {
  loginController,
  meController,
  signupController,
  wsTicketController,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";

export default async function authRoutes(app: FastifyInstance) {
  app.post("/signup", signupController);

  app.post("/login", loginController);

  app.get("/me", {
    preHandler: requireAuth,
    handler: meController,
  });

  app.post("/ws-ticket", {
    preHandler: requireAuth,
    handler: wsTicketController,
  });
}
