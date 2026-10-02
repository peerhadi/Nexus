"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCheck } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:3001/api";

type Message = {
  id: string;
  content: string;
  senderType: "CLIENT" | "ADMIN";
  createdAt: string;
  sender: {
    id: string;
    name: string;
    email: string;
    role: "CLIENT" | "ADMIN";
  };
};

interface MessageListProps {
  conversationId: string;
}

function formatTime(date: string) {
  return new Date(date).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function isToday(date: string) {
  const value = new Date(date);
  const now = new Date();

  return (
    value.getFullYear() === now.getFullYear() &&
    value.getMonth() === now.getMonth() &&
    value.getDate() === now.getDate()
  );
}

export default function MessageList({ conversationId }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let socket: WebSocket | null = null;
    let cancelled = false;

    const loadMessages = async () => {
      setLoading(true);

      try {
        const token =
          localStorage.getItem("nexus_token") ??
          sessionStorage.getItem("nexus_token");

        if (!token) return;

        const response = await fetch(
          `${API_URL}/messages/conversation/${conversationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) return;

        const data = await response.json();

        if (!cancelled) {
          setMessages(Array.isArray(data) ? data : (data.messages ?? []));
        }
      } catch (error) {
        console.error("Failed to load messages:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    const connectEventStream = async () => {
      try {
        const token =
          localStorage.getItem("nexus_token") ??
          sessionStorage.getItem("nexus_token");

        if (!token) return;

        const response = await fetch(`${API_URL}/auth/ws-ticket`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Failed to get WebSocket ticket");
          return;
        }

        const data = await response.json();

        if (!data.ticket || cancelled) return;

        socket = new WebSocket(
          `${WS_URL}/events/conversation/${conversationId}?ticket=${encodeURIComponent(
            data.ticket,
          )}`,
        );

        socket.onopen = () => {
          console.log(`Connected to conversation ${conversationId}`);
        };

        socket.onmessage = (event) => {
          try {
            const payload = JSON.parse(event.data);

            if (
              payload.type !== "message.created" ||
              payload.conversationId !== conversationId
            ) {
              return;
            }

            const message = payload.data as Message;

            setMessages((current) => {
              if (current.some((existing) => existing.id === message.id)) {
                return current;
              }

              return [...current, message];
            });
          } catch (error) {
            console.error("Failed to process WebSocket message:", error);
          }
        };

        socket.onerror = (error) => {
          console.error("Conversation WebSocket error:", error);
        };

        socket.onclose = () => {
          console.log(`Disconnected from conversation ${conversationId}`);
        };
      } catch (error) {
        console.error("Failed to connect to EventStream:", error);
      }
    };

    void loadMessages();
    void connectEventStream();

    return () => {
      cancelled = true;

      if (socket) {
        socket.close();
        socket = null;
      }
    };
  }, [conversationId]);

  useEffect(() => {
    if (loading || messages.length === 0) {
      return;
    }

    const scrollToBottom = () => {
      const container = messagesContainerRef.current;

      if (container) {
        container.scrollTop = container.scrollHeight;
      }

      messagesEndRef.current?.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    };

    const frame = requestAnimationFrame(() => {
      scrollToBottom();

      requestAnimationFrame(() => {
        scrollToBottom();
      });
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [conversationId, loading, messages.length]);

  return (
    <div
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto bg-gradient-to-br from-white via-violet-50/20 to-pink-50/30 min-h-[450px] max-h-[450px]"
    >
      <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-8 py-8 lg:px-14">
        {loading ? (
          <div className="flex flex-1 items-center justify-center text-[10px] font-bold text-slate-400">
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-center">
            <div>
              <div className="text-sm font-black text-slate-700">
                No messages yet
              </div>

              <p className="mt-1 text-[10px] font-medium text-slate-400">
                Send a message to start the conversation.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-violet-100" />

              <div className="rounded-full border border-violet-100 bg-white px-4 py-1.5 text-[8px] font-black uppercase tracking-[0.18em] text-violet-300 shadow-sm">
                {messages.every((message) => isToday(message.createdAt))
                  ? "Today"
                  : "Messages"}
              </div>

              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-100" />
            </div>

            <div className="space-y-7">
              {messages.map((item, index) => {
                const isUser = item.senderType === "CLIENT";

                return (
                  <motion.div
                    key={item.id}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.04,
                    }}
                    className={`flex ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex max-w-[680px] items-end gap-3 ${
                        isUser ? "flex-row-reverse" : ""
                      }`}
                    >
                      {!isUser && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-pink-400 text-[8px] font-black text-white shadow-sm">
                          N
                        </div>
                      )}

                      <div>
                        <div
                          className={`rounded-[20px] px-5 py-4 ${
                            isUser
                              ? "rounded-br-sm bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-violet-200/30"
                              : "rounded-bl-sm border border-violet-100 bg-white text-slate-500 shadow-sm"
                          }`}
                        >
                          <p
                            className={`text-[11px] leading-6 ${
                              isUser ? "text-white/90" : "text-slate-500"
                            }`}
                          >
                            {item.content}
                          </p>
                        </div>

                        <div
                          className={`mt-2 flex items-center gap-1.5 text-[8px] font-bold text-slate-300 ${
                            isUser ? "justify-end" : ""
                          }`}
                        >
                          {formatTime(item.createdAt)}

                          {isUser && (
                            <CheckCheck size={11} className="text-violet-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <div
                ref={messagesEndRef}
                className="h-px w-full"
                aria-hidden="true"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
