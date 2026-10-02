import { prisma } from "../plugins/db.js";
import { AppError } from "../utils/errors.js";

interface CreateRequestInput {
  clientId: string;
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
}

export async function getRequests(userId: string, isAdmin: boolean) {
  return prisma.request.findMany({
    where: isAdmin ? undefined : { clientId: userId },
    orderBy: { createdAt: "desc" },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      project: {
        select: {
          id: true,
          name: true,
          status: true,
          progress: true,
        },
      },
    },
  });
}

export async function getRequestById(
  id: string,
  userId: string,
  isAdmin: boolean,
) {
  const request = await prisma.request.findUnique({
    where: { id },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!request) {
    throw new AppError("Request not found", 404);
  }

  if (!isAdmin && request.clientId !== userId) {
    throw new AppError("Access denied", 403);
  }

  return request;
}

export async function createRequest(data: CreateRequestInput) {
  return prisma.request.create({
    data,
  });
}

export async function updateRequest(
  id: string,
  userId: string,
  isAdmin: boolean,
  data: {
    status?: "NEW" | "IN_PROGRESS" | "REPLIED" | "CLOSED";
    subject?: string;
    message?: string;
  },
) {
  await getRequestById(id, userId, isAdmin);

  return prisma.request.update({
    where: { id },
    data,
  });
}

export async function deleteRequest(
  id: string,
  userId: string,
  isAdmin: boolean,
) {
  await getRequestById(id, userId, isAdmin);

  return prisma.request.delete({
    where: { id },
  });
}

export async function createProjectFromRequest(
  requestId: string,
  adminId: string,
) {
  const request = await prisma.request.findUnique({
    where: { id: requestId },
  });

  if (!request) {
    throw new AppError("Request not found", 404);
  }

  if (request.status === "CLOSED") {
    throw new AppError("Closed requests cannot be turned into projects", 400);
  }

  const admin = await prisma.user.findUnique({
    where: { id: adminId },
  });

  if (!admin || admin.role !== "ADMIN") {
    throw new AppError("Admin not found", 404);
  }

  const result = await prisma.$transaction(async (tx) => {
    const project = await tx.project.create({
      data: {
        requestId: request.id,
        clientId: request.clientId,
        name: request.subject?.trim() || "New Project",
        description: request.message,
        status: "PLANNING",
        progress: 0,
        logs: {
          create: {
            userId: adminId,
            action: "PROJECT_CREATED_FROM_REQUEST",
            description: `Project "${request.subject?.trim() || "New Project"}" was created from request "${request.id}".`,
          },
        },
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    const conversation = await tx.conversation.create({
      data: {
        clientId: request.clientId,
        adminId,
        projectId: project.id,
        subject: project.name,
        status: "OPEN",
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        project: true,
      },
    });

    const updatedRequest = await tx.request.update({
      where: { id: requestId },
      data: {
        status: "IN_PROGRESS",
      },
    });

    return {
      project,
      conversation,
      request: updatedRequest,
    };
  });

  return result;
}
