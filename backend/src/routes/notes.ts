import type { FastifyInstance } from "fastify";
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  toggleNoteStar,
  updateNote,
} from "../controllers/notes.controller.js";
import { requireAuth } from "../middleware/auth.js";

export async function notesRoutes(app: FastifyInstance) {
  app.get("/", {
    preHandler: requireAuth,
    handler: getNotes,
  });

  app.get("/:id", {
    preHandler: requireAuth,
    handler: getNote,
  });

  app.post("/", {
    preHandler: requireAuth,
    handler: createNote,
  });

  app.patch("/:id", {
    preHandler: requireAuth,
    handler: updateNote,
  });

  app.patch("/:id/star", {
    preHandler: requireAuth,
    handler: toggleNoteStar,
  });

  app.delete("/:id", {
    preHandler: requireAuth,
    handler: deleteNote,
  });
}
