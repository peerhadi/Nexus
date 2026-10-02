import type { FastifyInstance } from "fastify";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import {
  createProjectFromRequestController,
  createRequestController,
  deleteRequestController,
  getRequestController,
  getRequestsController,
  updateRequestController,
} from "../controllers/request.controller.js";

export default async function requestRoutes(app: FastifyInstance) {
  app.addHook("preHandler", requireAuth);

  app.get("/", getRequestsController);

  app.get("/:id", getRequestController);

  app.post("/", createRequestController);

  app.patch("/:id", updateRequestController);

  app.delete("/:id", deleteRequestController);
  app.post("/:id/project", {
    preHandler: requireAdmin,
    handler: createProjectFromRequestController,
  });
}
