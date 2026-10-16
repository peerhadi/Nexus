import type { FastifyReply, FastifyRequest } from "fastify";
import {
  generateAIResponse,
  generatePublicAIResponse,
} from "../services/ai.service.js";
import { prisma } from "../plugins/db.js";

type ChatBody = {
  prompt: string;
  conversationId?: string;
};

type ConversationParams = {
  id: string;
};

function getUserId(request: FastifyRequest): string | null {
  return request.user?.id ?? null;
}
type PublicChatBody = {
  message: string;
  history?: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
};

export async function publicChatWithAI(
  request: FastifyRequest<{ Body: PublicChatBody }>,
  reply: FastifyReply,
) {
  try {
    const { message, history = [] } = request.body ?? {};

    if (
      typeof message !== "string" ||
      !message.trim() ||
      message.trim().length > 2000
    ) {
      return reply.status(400).send({
        success: false,
        error: "Please provide a message between 1 and 2000 characters.",
      });
    }

    const safeHistory = Array.isArray(history)
      ? history
          .filter(
            (item) =>
              item &&
              (item.role === "user" || item.role === "assistant") &&
              typeof item.content === "string",
          )
          .slice(-10)
          .map((item) => ({
            role: item.role,
            content: item.content.slice(0, 2000),
          }))
      : [];

    const replyText = await generatePublicAIResponse({
      message: message.trim(),
      history: safeHistory,
    });

    return reply.send({
      success: true,
      reply: replyText,
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      success: false,
      error: "Nexus AI is temporarily unavailable. Please try again.",
    });
  }
}
export async function chatWithAI(
  request: FastifyRequest<{ Body: ChatBody }>,
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

    const { prompt, conversationId } = request.body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return reply.status(400).send({
        success: false,
        error: "Prompt is required",
      });
    }

    const result = await generateAIResponse({
      userId,
      prompt: prompt.trim(),
      conversationId,
      role: request.user.role,
    });

    return reply.send({
      success: true,
      conversationId: result.conversationId,
      message: result.message,
    });
  } catch (error) {
    request.log.error(error);

    if (error instanceof Error && error.message === "Conversation not found") {
      return reply.status(404).send({
        success: false,
        error: "Conversation not found",
      });
    }

    return reply.status(500).send({
      success: false,
      error: "Failed to generate AI response",
    });
  }
}

export async function getAIConversations(
  request: FastifyRequest,
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

    const conversations = await prisma.aIConversation.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });

    return reply.send({
      success: true,
      conversations,
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      success: false,
      error: "Failed to load AI conversations",
    });
  }
}

export async function getAIConversation(
  request: FastifyRequest<{ Params: ConversationParams }>,
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

    const { id } = request.params;

    const conversation = await prisma.aIConversation.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!conversation) {
      return reply.status(404).send({
        success: false,
        error: "Conversation not found",
      });
    }

    return reply.send({
      success: true,
      conversation,
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      success: false,
      error: "Failed to load conversation",
    });
  }
}

export async function deleteAIConversation(
  request: FastifyRequest<{ Params: ConversationParams }>,
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

    const { id } = request.params;

    const conversation = await prisma.aIConversation.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!conversation) {
      return reply.status(404).send({
        success: false,
        error: "Conversation not found",
      });
    }

    await prisma.aIConversation.delete({
      where: {
        id,
      },
    });

    return reply.send({
      success: true,
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      success: false,
      error: "Failed to delete conversation",
    });
  }
}
