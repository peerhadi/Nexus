"use client";

import { useEffect } from "react";

import type { Conversation } from "@/lib/inbox/inbox-types";
import { API_URL } from "@/lib/api";

type UseInboxSocketArgs = {
  conversationId: string | undefined;
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
};

export function useInboxSocket({
  conversationId,
  setConversations,
}: UseInboxSocketArgs) {
  useEffect(() => {
    if (!conversationId) {
      return;
    }

    const token =
      localStorage.getItem("nexus_token") ??
      sessionStorage.getItem("nexus_token");

    if (!token) {
      return;
    }

    let socket: WebSocket | null = null;
    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
    let stopped = false;

    async function connect() {
      try {
        const ticketResponse = await fetch(`${API_URL}/auth/ws-ticket`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!ticketResponse.ok) {
          return;
        }

        const ticketData = await ticketResponse.json();

        if (!ticketData.ticket || stopped) {
          return;
        }

        const apiUrl = new URL(API_URL);

        const protocol = apiUrl.protocol === "https:" ? "wss:" : "ws:";

        socket = new WebSocket(
          `${protocol}//${apiUrl.host}/api/events/conversation/${conversationId}?ticket=${encodeURIComponent(
            ticketData.ticket,
          )}`,
        );

        socket.onmessage = (event) => {
          try {
            const payload = JSON.parse(event.data);

            if (payload.type !== "message.created") {
              return;
            }

            const message =
              payload.message ?? payload.data?.message ?? payload.data;

            if (
              !message ||
              typeof message !== "object" ||
              typeof message.id !== "string"
            ) {
              console.warn("Invalid message.created event:", payload);
              return;
            }

            setConversations((current) =>
              current.map((conversation) => {
                if (conversation.id !== conversationId) {
                  return conversation;
                }

                if (
                  conversation.messages.some(
                    (existingMessage) => existingMessage.id === message.id,
                  )
                ) {
                  return conversation;
                }

                return {
                  ...conversation,
                  messages: [...conversation.messages, message],
                  updatedAt:
                    typeof message.createdAt === "string"
                      ? message.createdAt
                      : conversation.updatedAt,
                };
              }),
            );
          } catch (error) {
            console.warn("Invalid WebSocket event:", error);
          }
        };

        socket.onclose = () => {
          if (stopped) {
            return;
          }

          reconnectTimeout = setTimeout(() => {
            connect();
          }, 2000);
        };
      } catch {
        if (stopped) {
          return;
        }

        reconnectTimeout = setTimeout(() => {
          connect();
        }, 2000);
      }
    }

    void connect();

    return () => {
      stopped = true;

      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }

      socket?.close();
    };
  }, [conversationId, setConversations]);
}
