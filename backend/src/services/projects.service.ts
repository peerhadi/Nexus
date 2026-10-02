import { prisma } from "../plugins/db.js";
import { AppError } from "../utils/errors.js";

export async function getProjects(userId: string, isAdmin: boolean) {
  return prisma.project.findMany({
    where: isAdmin
      ? undefined
      : {
          clientId: userId,
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
        orderBy: {
          createdAt: "desc",
        },
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
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function getProject(id: string, userId: string, isAdmin: boolean) {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      updates: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              role: true,
            },
          },
          comments: {
            orderBy: {
              createdAt: "asc",
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
          },
        },
      },
      logs: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  if (!isAdmin && project.clientId !== userId) {
    throw new AppError("Access denied", 403);
  }

  return project;
}

export async function createProject(data: {
  clientId: string;
  name: string;
  description?: string;
  status?: "PLANNING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "PAUSED";
  progress?: number;
  startDate?: Date;
  deadline?: Date;
}) {
  return prisma.project.create({
    data: {
      ...data,
      logs: {
        create: {
          action: "PROJECT_CREATED",
          description: `Project "${data.name}" was created.`,
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
) {
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return prisma.project.update({
    where: { id },
    data,
  });
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
) {
  return prisma.projectUpdate.create({
    data: {
      projectId,
      authorId,
      ...data,
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
) {
  return prisma.updateComment.create({
    data: {
      updateId,
      authorId,
      content,
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
  const where = isAdmin
    ? {}
    : {
        clientId: userId,
      };

  const totalProjects = await prisma.project.count({
    where,
  });

  const completedProjects = await prisma.project.count({
    where: {
      ...where,
      status: "COMPLETED",
    },
  });

  const activeProjects = await prisma.project.count({
    where: {
      ...where,
      status: "IN_PROGRESS",
    },
  });

  const requests = isAdmin
    ? await prisma.request.count()
    : await prisma.request.count({
        where: {
          clientId: userId,
        },
      });

  const projects = await prisma.project.findMany({
    where,
    select: {
      progress: true,
    },
  });

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
