import type { FastifyInstance } from "fastify";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import {
  createUserController,
  getUserController,
  getUsersController,
  updateUserController,
} from "../controllers/user.controller.js";

export default async function userRoutes(app: FastifyInstance) {
  app.get("/", {
    preHandler: requireAdmin,
    handler: getUsersController,
  });

  app.get("/:id", {
    preHandler: requireAuth,
    handler: getUserController,
  });

  app.post("/", {
    preHandler: requireAdmin,
    handler: createUserController,
  });

  app.patch("/:id", {
    preHandler: requireAuth,
    handler: updateUserController,
  });
}
