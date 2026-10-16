import { prisma } from "../plugins/db.js";
import { emit } from "./event-stream.service.js";

export class AdminChatError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 400,
  ) {
    super(message);
    this.name = "AdminChatError";
  }
}

export async function requireAdmin(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!user || user.role !== "ADMIN") {
    throw new AdminChatError("Admin access required.", 403);
  }

  return user;
}

async function requireRoom(roomId: string) {
  const room = await prisma.adminChatRoom.findUnique({
    where: { id: roomId },
    select: { id: true },
  });

  if (!room) {
    throw new AdminChatError("Admin Chat room not found.", 404);
  }

  return room;
}

function publish(roomId: string, type: string, data: Record<string, unknown>) {
  emit(roomId, {
    type,
    conversationId: roomId,
    data,
  });
}

export async function listRooms(userId: string) {
  await requireAdmin(userId);

  const rooms = await prisma.adminChatRoom.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      messages: {
        take: 1,
        orderBy: { createdAt: "desc" },
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
  });

  return rooms.map(({ messages, ...room }) => ({
    ...room,
    lastMessage: messages[0] ?? null,
  }));
}

export async function createRoom(
  userId: string,
  input: { name: string; description?: string },
) {
  const admin = await requireAdmin(userId);
  const name = input.name.trim();
  const description = input.description?.trim() || null;

  if (!name || name.length > 80) {
    throw new AdminChatError(
      "Room name must contain between 1 and 80 characters.",
    );
  }

  if (description && description.length > 300) {
    throw new AdminChatError("Room description cannot exceed 300 characters.");
  }

  return prisma.adminChatRoom
    .create({
      data: {
        name,
        description,
        createdById: admin.id,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: { messages: true },
        },
      },
    })
    .then((room) => ({
      ...room,
      lastMessage: null,
    }));
}

export async function listMessages(userId: string, roomId: string) {
  await requireAdmin(userId);
  await requireRoom(roomId);

  return prisma.adminChatMessage.findMany({
    where: { roomId },
    orderBy: { createdAt: "asc" },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function createMessage(
  userId: string,
  roomId: string,
  input: { content: string },
) {
  const sender = await requireAdmin(userId);
  await requireRoom(roomId);

  const content = input.content.trim();

  if (!content || content.length > 5000) {
    throw new AdminChatError(
      "Message must contain between 1 and 5000 characters.",
    );
  }

  const message = await prisma.$transaction(async (tx) => {
    const created = await tx.adminChatMessage.create({
      data: {
        roomId,
        senderId: sender.id,
        content,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    await tx.adminChatRoom.update({
      where: { id: roomId },
      data: { updatedAt: new Date() },
    });

    return created;
  });

  publish(roomId, "adminchat.message.created", { message });

  return message;
}

export async function updateMessage(
  userId: string,
  messageId: string,
  input: { content: string },
) {
  const admin = await requireAdmin(userId);
  const content = input.content.trim();

  if (!content || content.length > 5000) {
    throw new AdminChatError(
      "Message must contain between 1 and 5000 characters.",
    );
  }

  const existing = await prisma.adminChatMessage.findUnique({
    where: { id: messageId },
    select: {
      id: true,
      roomId: true,
      senderId: true,
    },
  });

  if (!existing) {
    throw new AdminChatError("Message not found.", 404);
  }

  if (existing.senderId !== admin.id) {
    throw new AdminChatError("You can only edit your own messages.", 403);
  }

  const message = await prisma.adminChatMessage.update({
    where: { id: messageId },
    data: { content },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  publish(existing.roomId, "adminchat.message.updated", { message });

  return message;
}

export async function deleteMessage(userId: string, messageId: string) {
  const admin = await requireAdmin(userId);

  const existing = await prisma.adminChatMessage.findUnique({
    where: { id: messageId },
    select: {
      id: true,
      roomId: true,
      senderId: true,
    },
  });

  if (!existing) {
    throw new AdminChatError("Message not found.", 404);
  }

  if (existing.senderId !== admin.id) {
    throw new AdminChatError("You can only delete your own messages.", 403);
  }

  await prisma.adminChatMessage.delete({
    where: { id: messageId },
  });

  publish(existing.roomId, "adminchat.message.deleted", {
    messageId,
    roomId: existing.roomId,
  });

  return { id: messageId };
}

export async function assertAdminRoomAccess(userId: string, roomId: string) {
  await requireAdmin(userId);
  return requireRoom(roomId);
}
