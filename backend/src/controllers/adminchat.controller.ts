import type { FastifyReply, FastifyRequest } from "fastify";
import {
  AdminChatError,
  createMessage,
  createRoom,
  deleteMessage,
  listMessages,
  listRooms,
  updateMessage,
} from "../services/adminchat.service.js";

type RoomParams = {
  roomId: string;
};

type MessageParams = {
  id: string;
};

type CreateRoomBody = {
  name: string;
  description?: string;
};

type MessageBody = {
  content: string;
};

function handleError(error: unknown, reply: FastifyReply) {
  if (error instanceof AdminChatError) {
    return reply.code(error.statusCode).send({
      message: error.message,
    });
  }

  throw error;
}

export async function getRoomsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    return await listRooms(request.user.id);
  } catch (error) {
    return handleError(error, reply);
  }
}

export async function createRoomController(
  request: FastifyRequest<{ Body: CreateRoomBody }>,
  reply: FastifyReply,
) {
  try {
    const room = await createRoom(request.user.id, request.body);
    return reply.code(201).send(room);
  } catch (error) {
    return handleError(error, reply);
  }
}

export async function getMessagesController(
  request: FastifyRequest<{ Params: RoomParams }>,
  reply: FastifyReply,
) {
  try {
    return await listMessages(request.user.id, request.params.roomId);
  } catch (error) {
    return handleError(error, reply);
  }
}

export async function createMessageController(
  request: FastifyRequest<{
    Params: RoomParams;
    Body: MessageBody;
  }>,
  reply: FastifyReply,
) {
  try {
    const message = await createMessage(
      request.user.id,
      request.params.roomId,
      request.body,
    );

    return reply.code(201).send(message);
  } catch (error) {
    return handleError(error, reply);
  }
}

export async function updateMessageController(
  request: FastifyRequest<{
    Params: MessageParams;
    Body: MessageBody;
  }>,
  reply: FastifyReply,
) {
  try {
    return await updateMessage(
      request.user.id,
      request.params.id,
      request.body,
    );
  } catch (error) {
    return handleError(error, reply);
  }
}

export async function deleteMessageController(
  request: FastifyRequest<{ Params: MessageParams }>,
  reply: FastifyReply,
) {
  try {
    return await deleteMessage(request.user.id, request.params.id);
  } catch (error) {
    return handleError(error, reply);
  }
}
