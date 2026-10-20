import type { Admin, Message, StreamEvent } from "./types";

type StreamMessage = Message | undefined;

export function extractStreamMessage(data: {
  message?: Message;
  id?: string;
  content?: string;
} | undefined): StreamMessage {
  return (data?.message ||
    (data?.id && data?.content ? (data as Message) : undefined)) as
    | Message
    | undefined;
}

export function streamEventRoomId(payload: StreamEvent) {
  const data = payload.data as
    | (StreamEvent["data"] & { id?: string })
    | undefined;

  return payload.conversationId || data?.roomId || data?.message?.roomId;
}

export type StreamData = (StreamEvent["data"] & {
  id?: string;
  content?: string;
  sender?: Admin;
  senderId?: string;
  createdAt?: string;
  updatedAt?: string;
}) | undefined;
