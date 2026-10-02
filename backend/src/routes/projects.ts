import type { FastifyInstance } from "fastify";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import {
  createCommentController,
  createProjectController,
  createUpdateController,
  getProjectController,
  getProjectsController,
  updateProjectController,
} from "../controllers/project.controller.js";

export default async function projectRoutes(app: FastifyInstance) {
  app.addHook("preHandler", requireAuth);

  app.get("/", getProjectsController);

  app.get("/:id", getProjectController);

  app.post("/", {
    preHandler: requireAdmin,
    handler: createProjectController,
  });

  app.patch("/:id", {
    preHandler: requireAdmin,
    handler: updateProjectController,
  });

  app.post("/:id/updates", {
    preHandler: requireAdmin,
    handler: createUpdateController,
  });

  app.post("/updates/:updateId/comments", {
    handler: createCommentController,
  });
}
