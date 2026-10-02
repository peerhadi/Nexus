import type { FastifyReply, FastifyRequest } from "fastify";
import {
  createComment,
  createProject,
  createUpdate,
  getProject,
  getProjects,
  updateProject,
} from "../services/projects.service.js";

export async function getProjectsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const isAdmin = request.user.role === "ADMIN";

  const projects = await getProjects(request.user.id, isAdmin);

  console.log("PROJECT DEBUG");
  console.log("JWT user:", request.user);
  console.log(
    "Projects:",
    projects.map((project) => ({
      id: project.id,
      name: project.name,
      clientId: project.clientId,
    })),
  );

  return reply.send({
    projects,
  });
}

export async function getProjectController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const isAdmin = request.user.role === "ADMIN";

  return reply.send({
    project: await getProject(request.params.id, request.user.id, isAdmin),
  });
}

export async function createProjectController(
  request: FastifyRequest<{
    Body: {
      clientId: string;
      name: string;
      description?: string;
      status?: "PLANNING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "PAUSED";
      progress?: number;
      startDate?: string;
      deadline?: string;
    };
  }>,
  reply: FastifyReply,
) {
  const project = await createProject({
    ...request.body,
    startDate: request.body.startDate
      ? new Date(request.body.startDate)
      : undefined,
    deadline: request.body.deadline
      ? new Date(request.body.deadline)
      : undefined,
  });

  return reply.code(201).send({ project });
}

export async function updateProjectController(
  request: FastifyRequest<{
    Params: { id: string };
    Body: {
      name?: string;
      description?: string;
      status?: "PLANNING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "PAUSED";
      progress?: number;
      startDate?: string;
      deadline?: string;
      completedAt?: string;
    };
  }>,
  reply: FastifyReply,
) {
  const body = request.body;

  const project = await updateProject(request.params.id, {
    ...body,
    startDate: body.startDate ? new Date(body.startDate) : undefined,
    deadline: body.deadline ? new Date(body.deadline) : undefined,
    completedAt: body.completedAt ? new Date(body.completedAt) : undefined,
  });

  return reply.send({ project });
}

export async function createUpdateController(
  request: FastifyRequest<{
    Params: { id: string };
    Body: {
      title: string;
      description: string;
      type?: "PROGRESS" | "MILESTONE" | "NOTE" | "COMPLETED";
      progress?: number;
    };
  }>,
  reply: FastifyReply,
) {
  const update = await createUpdate(
    request.params.id,
    request.user.id,
    request.body,
  );

  return reply.code(201).send({ update });
}

export async function createCommentController(
  request: FastifyRequest<{
    Params: { updateId: string };
    Body: {
      content: string;
    };
  }>,
  reply: FastifyReply,
) {
  const comment = await createComment(
    request.params.updateId,
    request.user.id,
    request.body.content,
  );

  return reply.code(201).send({ comment });
}
