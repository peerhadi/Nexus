import { prisma } from "../plugins/db.js";
import { AppError } from "../utils/errors.js";

export async function getConversations(userId: string, isAdmin: boolean) {
  return prisma.conversation.findMany({
    where: isAdmin
      ? {
          adminId: userId,
        }
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
      admin: {
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
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function getConversation(
  id: string,
  userId: string,
  isAdmin: boolean,
) {
  const conversation = await prisma.conversation.findUnique({
    where: { id },
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
      project: {
        select: {
          id: true,
          name: true,
          description: true,
          status: true,
          progress: true,
          startDate: true,
          deadline: true,
          completedAt: true,
        },
      },
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      },
    },
  });

  if (!conversation) {
    throw new AppError("Conversation not found", 404);
  }

  const hasAccess = isAdmin
    ? conversation.adminId === userId
    : conversation.clientId === userId;

  if (!hasAccess) {
    throw new AppError("Access denied", 403);
  }

  return conversation;
}

export async function createConversation(
  clientId: string,
  adminId: string,
  subject?: string,
  projectId?: string,
) {
  const [client, admin] = await Promise.all([
    prisma.user.findUnique({
      where: { id: clientId },
    }),
    prisma.user.findUnique({
      where: { id: adminId },
    }),
  ]);

  if (!client) {
    throw new AppError("Client not found", 404);
  }

  if (!admin || admin.role !== "ADMIN") {
    throw new AppError("Admin not found", 404);
  }

  if (projectId) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new AppError("Project not found", 404);
    }

    if (project.clientId !== clientId) {
      throw new AppError("Project does not belong to client", 400);
    }
  }

  return prisma.conversation.create({
    data: {
      clientId,
      adminId,
      projectId,
      subject,
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
}

export async function updateConversation(
  id: string,
  userId: string,
  isAdmin: boolean,
  data: {
    subject?: string;
    status?: "OPEN" | "CLOSED";
  },
) {
  await getConversation(id, userId, isAdmin);

  return prisma.conversation.update({
    where: { id },
    data,
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
}

export async function deleteConversation(
  id: string,
  userId: string,
  isAdmin: boolean,
) {
  await getConversation(id, userId, isAdmin);

  return prisma.conversation.delete({
    where: { id },
  });
}
