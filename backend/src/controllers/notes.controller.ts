import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../plugins/db.js";

type NoteParams = {
  id: string;
};

type CreateNoteBody = {
  title?: string;
  content?: string;
  category?: string;
  starred?: boolean;
};

type UpdateNoteBody = {
  title?: string;
  content?: string;
  category?: string;
  starred?: boolean;
};

type GetNotesQuery = {
  search?: string;
  category?: string;
};

function getUserId(request: FastifyRequest): string | null {
  return request.user?.id ?? null;
}

export async function getNotes(
  request: FastifyRequest<{ Querystring: GetNotesQuery }>,
  reply: FastifyReply,
) {
  try {
    const userId = getUserId(request);

    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: "Authentication required",
      });
    }

    const { search, category } = request.query;

    const notes = await prisma.note.findMany({
      where: {
        userId,
        ...(category && category !== "All" ? { category } : {}),
        ...(search?.trim()
          ? {
              OR: [
                {
                  title: {
                    contains: search.trim(),
                    mode: "insensitive",
                  },
                },
                {
                  content: {
                    contains: search.trim(),
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {}),
      },
      orderBy: [{ starred: "desc" }, { updatedAt: "desc" }],
    });

    return reply.send({
      success: true,
      notes,
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      success: false,
      error: "Failed to load notes",
    });
  }
}

export async function getNote(
  request: FastifyRequest<{ Params: NoteParams }>,
  reply: FastifyReply,
) {
  try {
    const userId = getUserId(request);

    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: "Authentication required",
      });
    }

    const note = await prisma.note.findFirst({
      where: {
        id: request.params.id,
        userId,
      },
    });

    if (!note) {
      return reply.status(404).send({
        success: false,
        error: "Note not found",
      });
    }

    return reply.send({
      success: true,
      note,
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      success: false,
      error: "Failed to load note",
    });
  }
}

export async function createNote(
  request: FastifyRequest<{ Body: CreateNoteBody }>,
  reply: FastifyReply,
) {
  try {
    const userId = getUserId(request);

    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: "Authentication required",
      });
    }

    const {
      title = "",
      content = "",
      category = "General",
      starred = false,
    } = request.body ?? {};

    const note = await prisma.note.create({
      data: {
        userId,
        title: title.trim(),
        content,
        category: category.trim() || "General",
        starred,
      },
    });

    return reply.status(201).send({
      success: true,
      note,
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      success: false,
      error: "Failed to create note",
    });
  }
}

export async function updateNote(
  request: FastifyRequest<{
    Params: NoteParams;
    Body: UpdateNoteBody;
  }>,
  reply: FastifyReply,
) {
  try {
    const userId = getUserId(request);

    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: "Authentication required",
      });
    }

    const existingNote = await prisma.note.findFirst({
      where: {
        id: request.params.id,
        userId,
      },
    });

    if (!existingNote) {
      return reply.status(404).send({
        success: false,
        error: "Note not found",
      });
    }

    const { title, content, category, starred } = request.body ?? {};

    const note = await prisma.note.update({
      where: {
        id: existingNote.id,
      },
      data: {
        ...(title !== undefined
          ? {
              title: title.trim(),
            }
          : {}),
        ...(content !== undefined ? { content } : {}),
        ...(category !== undefined
          ? {
              category: category.trim() || "General",
            }
          : {}),
        ...(starred !== undefined ? { starred } : {}),
      },
    });

    return reply.send({
      success: true,
      note,
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      success: false,
      error: "Failed to update note",
    });
  }
}

export async function toggleNoteStar(
  request: FastifyRequest<{ Params: NoteParams }>,
  reply: FastifyReply,
) {
  try {
    const userId = getUserId(request);

    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: "Authentication required",
      });
    }

    const existingNote = await prisma.note.findFirst({
      where: {
        id: request.params.id,
        userId,
      },
    });

    if (!existingNote) {
      return reply.status(404).send({
        success: false,
        error: "Note not found",
      });
    }

    const note = await prisma.note.update({
      where: {
        id: existingNote.id,
      },
      data: {
        starred: !existingNote.starred,
      },
    });

    return reply.send({
      success: true,
      note,
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      success: false,
      error: "Failed to update note",
    });
  }
}

export async function deleteNote(
  request: FastifyRequest<{ Params: NoteParams }>,
  reply: FastifyReply,
) {
  try {
    const userId = getUserId(request);

    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: "Authentication required",
      });
    }

    const existingNote = await prisma.note.findFirst({
      where: {
        id: request.params.id,
        userId,
      },
    });

    if (!existingNote) {
      return reply.status(404).send({
        success: false,
        error: "Note not found",
      });
    }

    await prisma.note.delete({
      where: {
        id: existingNote.id,
      },
    });

    return reply.send({
      success: true,
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      success: false,
      error: "Failed to delete note",
    });
  }
}
