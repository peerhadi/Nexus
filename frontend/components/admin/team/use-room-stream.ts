"use client";

import { useEffect, useRef, type MutableRefObject } from "react";

import { api, WS_ORIGIN } from "./api";
import type { Message, Room, StreamEvent } from "./types";
import { extractStreamMessage, streamEventRoomId, type StreamData } from "./stream";

export function useRoomStream({
  selectedRoomId,
  loadMessages,
  setMessages,
  setRooms,
  setConnected,
  setError,
  socketRef,
}: {
  selectedRoomId: string;
  loadMessages: (roomId: string, silent?: boolean) => Promise<void>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  setConnected: (value: boolean) => void;
  setError: (value: string) => void;
  socketRef: MutableRefObject<WebSocket | null>;
}) {
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptRef = useRef(0);
  const processedCreatedMessageIdsRef = useRef(new Set<string>());

  useEffect(() => {
    if (!selectedRoomId) {
      setConnected(false);
      return;
    }

    let disposed = false;
    let socket: WebSocket | null = null;

    const connect = async () => {
      try {
        const ticketResponse = await api<{ ticket?: string; token?: string }>(
          "/auth/ws-ticket",
          {
            method: "POST",
            body: JSON.stringify({}),
          },
        );

        if (disposed) return;

        const ticket = ticketResponse.ticket || ticketResponse.token;

        if (!ticket) throw new Error("WebSocket ticket was missing.");

        const query = new URLSearchParams({ ticket });

        socket = new WebSocket(
          `${WS_ORIGIN}/api/events/adminchat/${encodeURIComponent(selectedRoomId)}?${query.toString()}`,
        );

        socketRef.current = socket;

        socket.onopen = () => {
          if (disposed) return;
          reconnectAttemptRef.current = 0;
          setConnected(true);
          setError("");
          // Resync after every connection/reconnection so events missed while
          // offline are recovered without requiring a manual refresh.
          void loadMessages(selectedRoomId, true);
        };

        socket.onmessage = (event) => {
          if (disposed) return;

          let payload: StreamEvent;

          try {
            payload = JSON.parse(event.data) as StreamEvent;
          } catch {
            return;
          }

          const data = payload.data as StreamData;
          const eventRoomId = streamEventRoomId(payload);
          if (eventRoomId && eventRoomId !== selectedRoomId) return;

          if (
            payload.type === "adminchat.message.created" ||
            payload.type === "adminchat.message.updated"
          ) {
            // Accept both { data: { message } } and a message-shaped data payload.
            const message = extractStreamMessage(data);
            if (!message?.id) return;

            const wasAlreadyProcessed =
              processedCreatedMessageIdsRef.current.has(message.id);
            if (payload.type === "adminchat.message.created") {
              processedCreatedMessageIdsRef.current.add(message.id);
            }
            setMessages((current) => {
              const wasAlreadyPresent = current.some(
                (item) => item.id === message.id,
              );
              if (wasAlreadyPresent) {
                return current.map((item) =>
                  item.id === message.id ? { ...item, ...message } : item,
                );
              }

              if (payload.type === "adminchat.message.created") {
                return [...current, message].sort(
                  (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime(),
                );
              }
              return current;
            });

            setRooms((current) =>
              current.map((room) => {
                if (room.id !== message.roomId) return room;
                if (payload.type === "adminchat.message.created") {
                  return {
                    ...room,
                    lastMessage: message,
                    updatedAt: message.createdAt,
                    _count: {
                      messages:
                        room._count.messages + (wasAlreadyProcessed ? 0 : 1),
                    },
                  };
                }
                return room.lastMessage?.id === message.id
                  ? { ...room, lastMessage: message }
                  : room;
              }),
            );
            return;
          }

          if (payload.type === "adminchat.message.deleted") {
            const messageId = data?.messageId || data?.id;
            if (!messageId) return;

            setMessages((current) =>
              current.filter((message) => message.id !== messageId),
            );

            setRooms((current) =>
              current.map((room) =>
                room.id === selectedRoomId && room.lastMessage?.id === messageId
                  ? {
                      ...room,
                      lastMessage: null,
                      _count: {
                        messages: Math.max(0, room._count.messages - 1),
                      },
                    }
                  : room,
              ),
            );
          }
        };

        socket.onerror = () => {
          if (!disposed) setConnected(false);
        };

        socket.onclose = () => {
          if (disposed) return;

          setConnected(false);

          const attempt = reconnectAttemptRef.current++;
          const delay = Math.min(1000 * 2 ** attempt, 15000);

          reconnectTimerRef.current = setTimeout(() => {
            if (!disposed) void connect();
          }, delay);
        };
      } catch (cause) {
        if (disposed) return;

        setConnected(false);

        const attempt = reconnectAttemptRef.current++;
        reconnectTimerRef.current = setTimeout(
          () => {
            if (!disposed) void connect();
          },
          Math.min(1000 * 2 ** attempt, 15000),
        );

        if (cause instanceof Error) setError(cause.message);
      }
    };

    reconnectAttemptRef.current = 0;
    void connect();

    return () => {
      disposed = true;

      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }

      if (socketRef.current === socket) socketRef.current = null;

      socket?.close();
      setConnected(false);
    };
  }, [
    selectedRoomId,
    loadMessages,
    setMessages,
    setRooms,
    setConnected,
    setError,
    socketRef,
  ]);

  return { processedCreatedMessageIdsRef };
}
