import { prisma } from "../plugins/db.js";
import { emit } from "./event-stream.service.js";
import { AppError } from "../utils/errors.js";

async function getConversationForAccess(
  conversationId: string,
  userId: string,
  isAdmin: boolean,
) {
  const conversation = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
  });

  if (!conversation) {
    throw new AppError("Conversation not found", 404);
  }

  if (!isAdmin && conversation.clientId !== userId) {
    throw new AppError("Access denied", 403);
  }

  return conversation;
}

export async function getMessages(
  conversationId: string,
  userId: string,
  isAdmin: boolean,
) {
  await getConversationForAccess(conversationId, userId, isAdmin);

  return prisma.message.findMany({
    where: {
      conversationId,
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
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function createMessage(
  conversationId: string,
  senderId: string,
  senderType: "CLIENT" | "ADMIN",
  content: string,
) {
  const conversation = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
  });

  if (!conversation) {
    throw new AppError("Conversation not found", 404);
  }

  const message = await prisma.message.create({
    data: {
      conversationId,
      senderId,
      senderType,
      content,
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
  });

  emit(conversationId, {
    type: "message.created",
    conversationId,
    data: message,
  });

  return message;
}

export async function updateMessage(
  id: string,
  userId: string,
  content: string,
) {
  const message = await prisma.message.findUnique({
    where: {
      id,
    },
  });

  if (!message) {
    throw new AppError("Message not found", 404);
  }

  if (message.senderId !== userId) {
    throw new AppError("You can only edit your own messages", 403);
  }

  return prisma.message.update({
    where: {
      id,
    },
    data: {
      content,
    },
  });
}

export async function deleteMessage(
  id: string,
  userId: string,
  isAdmin: boolean,
) {
  const message = await prisma.message.findUnique({
    where: {
      id,
    },
  });

  if (!message) {
    throw new AppError("Message not found", 404);
  }

  if (!isAdmin && message.senderId !== userId) {
    throw new AppError("Access denied", 403);
  }

  return prisma.message.delete({
    where: {
      id,
    },
  });
}
