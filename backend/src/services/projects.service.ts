import { Prisma } from "@prisma/client";
import { prisma } from "../plugins/db.js";
import { AppError } from "../utils/errors.js";

const PROJECT_STATUSES = [
  "PLANNING",
  "IN_PROGRESS",
  "REVIEW",
  "COMPLETED",
  "PAUSED",
] as const;

const UPDATE_TYPES = ["PROGRESS", "MILESTONE", "NOTE", "COMPLETED"] as const;

function validateText(
  value: string,
  field: string,
  maxLength: number,
  required = true,
): string {
  if (typeof value !== "string") {
    throw new AppError(`${field} must be a string`, 400);
  }

  const text = value.trim();

  if (required && !text) {
    throw new AppError(`${field} is required`, 400);
  }

  if (text.length > maxLength) {
    throw new AppError(`${field} must not exceed ${maxLength} characters`, 400);
  }

  return text;
}

function validateProgress(progress: number | undefined): void {
  if (
    progress !== undefined &&
    (!Number.isInteger(progress) || progress < 0 || progress > 100)
  ) {
    throw new AppError("Progress must be an integer from 0 to 100", 400);
  }
}

function validateDate(date: Date | undefined, field: string): void {
  if (date !== undefined && Number.isNaN(date.getTime())) {
    throw new AppError(`${field} must be a valid date`, 400);
  }
}

function validateStatus(status: string | undefined): void {
  if (
    status !== undefined &&
    !PROJECT_STATUSES.includes(status as (typeof PROJECT_STATUSES)[number])
  ) {
    throw new AppError("Invalid project status", 400);
  }
}

function validateUpdateType(type: string | undefined): void {
  if (
    type !== undefined &&
    !UPDATE_TYPES.includes(type as (typeof UPDATE_TYPES)[number])
  ) {
    throw new AppError("Invalid project update type", 400);
  }
}

function isRecordNotFound(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  );
}

export async function getProjects(userId: string, isAdmin: boolean) {
  return prisma.project.findMany({
    where: isAdmin ? {} : { clientId: userId },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      updates: {
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              role: true,
            },
          },
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getProject(id: string, userId: string, isAdmin: boolean) {
  const project = await prisma.project.findFirst({
    where: {
      id,
      ...(isAdmin ? {} : { clientId: userId }),
    },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      updates: {
        orderBy: { createdAt: "desc" },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              role: true,
            },
          },
          comments: {
            orderBy: { createdAt: "asc" },
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  role: true,
                },
              },
            },
          },
        },
      },
      logs: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return project;
}

export async function createProject(
  data: {
    clientId: string;
    name: string;
    description?: string;
    status?: "PLANNING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "PAUSED";
    progress?: number;
    startDate?: Date;
    deadline?: Date;
  },
  actorRole: string,
) {
  if (actorRole !== "ADMIN") {
    throw new AppError("Admin access required", 403);
  }
  const clientId = validateText(data.clientId, "Client ID", 128);
  const name = validateText(data.name, "Project name", 150);

  const description =
    data.description === undefined
      ? undefined
      : validateText(data.description, "Description", 10000, false);

  validateStatus(data.status);
  validateProgress(data.progress);
  validateDate(data.startDate, "Start date");
  validateDate(data.deadline, "Deadline");

  const client = await prisma.user.findUnique({
    where: { id: clientId },
    select: { id: true, role: true },
  });

  if (!client || client.role !== "CLIENT") {
    throw new AppError("Valid client not found", 400);
  }

  return prisma.project.create({
    data: {
      clientId,
      name,
      ...(description !== undefined ? { description } : {}),
      ...(data.status !== undefined ? { status: data.status } : {}),
      ...(data.progress !== undefined ? { progress: data.progress } : {}),
      ...(data.startDate !== undefined ? { startDate: data.startDate } : {}),
      ...(data.deadline !== undefined ? { deadline: data.deadline } : {}),
      logs: {
        create: {
          action: "PROJECT_CREATED",
          description: `Project "${name}" was created.`,
        },
      },
    },
  });
}

export async function updateProject(
  id: string,
  data: {
    name?: string;
    description?: string;
    status?: "PLANNING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "PAUSED";
    progress?: number;
    startDate?: Date;
    deadline?: Date;
    completedAt?: Date;
  },
  actorRole: string,
) {
  if (actorRole !== "ADMIN") {
    throw new AppError("Admin access required", 403);
  }
  if (!id || typeof id !== "string") {
    throw new AppError("Invalid project ID", 400);
  }

  const updateData: Prisma.ProjectUpdateInput = {};

  if (data.name !== undefined) {
    updateData.name = validateText(data.name, "Project name", 150);
  }

  if (data.description !== undefined) {
    updateData.description = validateText(
      data.description,
      "Description",
      10000,
      false,
    );
  }

  if (data.status !== undefined) {
    validateStatus(data.status);
    updateData.status = data.status;
  }

  if (data.progress !== undefined) {
    validateProgress(data.progress);
    updateData.progress = data.progress;
  }

  if (data.startDate !== undefined) {
    validateDate(data.startDate, "Start date");
    updateData.startDate = data.startDate;
  }

  if (data.deadline !== undefined) {
    validateDate(data.deadline, "Deadline");
    updateData.deadline = data.deadline;
  }

  if (data.completedAt !== undefined) {
    validateDate(data.completedAt, "Completion date");
    updateData.completedAt = data.completedAt;
  }

  try {
    return await prisma.project.update({
      where: { id },
      data: updateData,
    });
  } catch (error) {
    if (isRecordNotFound(error)) {
      throw new AppError("Project not found", 404);
    }

    throw error;
  }
}

export async function createUpdate(
  projectId: string,
  authorId: string,
  data: {
    title: string;
    description: string;
    type?: "PROGRESS" | "MILESTONE" | "NOTE" | "COMPLETED";
    progress?: number;
  },
  actorRole: string,
) {
  if (actorRole !== "ADMIN") {
    throw new AppError("Admin access required", 403);
  }

  const safeProjectId = validateText(projectId, "Project ID", 128);
  const title = validateText(data.title, "Update title", 150);
  const description = validateText(
    data.description,
    "Update description",
    10000,
  );

  validateUpdateType(data.type);
  validateProgress(data.progress);

  const project = await prisma.project.findUnique({
    where: { id: safeProjectId },
    select: { id: true },
  });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return prisma.projectUpdate.create({
    data: {
      projectId: safeProjectId,
      authorId,
      title,
      description,
      ...(data.type !== undefined ? { type: data.type } : {}),
      ...(data.progress !== undefined ? { progress: data.progress } : {}),
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
  });
}

export async function createComment(
  updateId: string,
  authorId: string,
  content: string,
  isAdmin = false,
) {
  const safeContent = validateText(content, "Comment", 5000);

  const update = await prisma.projectUpdate.findUnique({
    where: { id: updateId },
    select: {
      id: true,
      project: {
        select: {
          clientId: true,
        },
      },
    },
  });

  if (!update) {
    throw new AppError("Project update not found", 404);
  }

  if (!isAdmin && update.project.clientId !== authorId) {
    throw new AppError("Project update not found", 404);
  }

  return prisma.updateComment.create({
    data: {
      updateId,
      authorId,
      content: safeContent,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
  });
}

export async function getStats(userId: string, isAdmin: boolean) {
  const where: Prisma.ProjectWhereInput = isAdmin ? {} : { clientId: userId };

  const [totalProjects, completedProjects, activeProjects, requests, projects] =
    await Promise.all([
      prisma.project.count({ where }),
      prisma.project.count({
        where: { ...where, status: "COMPLETED" },
      }),
      prisma.project.count({
        where: { ...where, status: "IN_PROGRESS" },
      }),
      prisma.request.count({
        where: isAdmin ? {} : { clientId: userId },
      }),
      prisma.project.findMany({
        where,
        select: { progress: true },
      }),
    ]);

  const averageProgress =
    projects.length === 0
      ? 0
      : Math.round(
          projects.reduce((sum, project) => sum + project.progress, 0) /
            projects.length,
        );

  return {
    totalProjects,
    completedProjects,
    activeProjects,
    requests,
    averageProgress,
  };
}
