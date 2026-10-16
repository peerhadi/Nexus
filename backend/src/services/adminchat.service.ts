import { prisma } from "../plugins/db.js";
import { AppError } from "../utils/errors.js";
import { emit } from "./event-stream.service.js";

const ADMIN_CHAT_MEMBERS = [
  "hadi@nexusmade.com",
  "izhaan@nexusmade.com",
  "ahmad@nexusmade.com",
  "suwaid@nexusmade.com",
];

async function requireAdmin(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      role: true,
      email: true,
      name: true,
    },
  });

  if (!user || user.role !== "ADMIN") {
    throw new AppError("Admin access required", 403);
  }

  return user;
}

async function requireRoom(roomId: string) {
  const room = await prisma.adminChatRoom.findUnique({
    where: { id: roomId },
  });

  if (!room) {
    throw new AppError("Admin chat room not found", 404);
  }

  return room;
}

export async function getAdminChatRooms(userId: string) {
  await requireAdmin(userId);

  return prisma.adminChatRoom.findMany({
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      _count: {
        select: { messages: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
}

export async function createAdminChatRoom(
  userId: string,
  name: string,
  description?: string,
) {
  await requireAdmin(userId);

  const normalizedName = name?.trim();

  if (!normalizedName) {
    throw new AppError("Room name is required", 400);
  }

  if (normalizedName.length > 60) {
    throw new AppError("Room name cannot exceed 60 characters", 400);
  }

  if (description && description.trim().length > 250) {
    throw new AppError("Description cannot exceed 250 characters", 400);
  }

  const admins = await prisma.user.findMany({
    where: {
      role: "ADMIN",
      email: { in: ADMIN_CHAT_MEMBERS },
    },
    select: { id: true },
  });

  if (admins.length !== ADMIN_CHAT_MEMBERS.length) {
    throw new AppError(
      "One or more configured Nexus admin accounts could not be found",
      500,
    );
  }

  return prisma.adminChatRoom.create({
    data: {
      name: normalizedName,
      description: description?.trim() || null,
      createdById: userId,
    },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function getAdminChatMessages(roomId: string, userId: string) {
  await requireAdmin(userId);
  await requireRoom(roomId);

  return prisma.adminChatMessage.findMany({
    where: { roomId },
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
    orderBy: { createdAt: "asc" },
  });
}

export async function createAdminChatMessage(
  roomId: string,
  senderId: string,
  content: string,
) {
  await requireAdmin(senderId);
  await requireRoom(roomId);

  const normalizedContent = content.trim();

  if (!normalizedContent) {
    throw new AppError("Message content is required", 400);
  }

  if (normalizedContent.length > 5000) {
    throw new AppError("Message cannot exceed 5000 characters", 400);
  }

  const message = await prisma.adminChatMessage.create({
    data: {
      roomId,
      senderId,
      content: normalizedContent,
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
  });

  await prisma.adminChatRoom.update({
    where: { id: roomId },
    data: { updatedAt: new Date() },
  });

  emit(roomId, {
    type: "adminchat.message.created",
    conversationId: roomId,
    data: message,
  });

  return message;
}

export async function updateAdminChatMessage(
  messageId: string,
  userId: string,
  content: string,
) {
  await requireAdmin(userId);

  const message = await prisma.adminChatMessage.findUnique({
    where: { id: messageId },
  });

  if (!message) {
    throw new AppError("Message not found", 404);
  }

  if (message.senderId !== userId) {
    throw new AppError("You can only edit your own messages", 403);
  }

  const normalizedContent = content.trim();

  if (!normalizedContent) {
    throw new AppError("Message content is required", 400);
  }

  if (normalizedContent.length > 5000) {
    throw new AppError("Message cannot exceed 5000 characters", 400);
  }

  const updatedMessage = await prisma.adminChatMessage.update({
    where: { id: messageId },
    data: { content: normalizedContent },
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
  });

  emit(message.roomId, {
    type: "adminchat.message.updated",
    conversationId: message.roomId,
    data: updatedMessage,
  });

  return updatedMessage;
}

export async function deleteAdminChatMessage(
  messageId: string,
  userId: string,
) {
  await requireAdmin(userId);

  const message = await prisma.adminChatMessage.findUnique({
    where: { id: messageId },
  });

  if (!message) {
    throw new AppError("Message not found", 404);
  }

  if (message.senderId !== userId) {
    throw new AppError("You can only delete your own messages", 403);
  }

  await prisma.adminChatMessage.delete({
    where: { id: messageId },
  });

  emit(message.roomId, {
    type: "adminchat.message.deleted",
    conversationId: message.roomId,
    data: { id: messageId },
  });
}
