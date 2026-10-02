"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Archive, Clock3 } from "lucide-react";
import ConversationList from "@/components/admin/inbox/inbox-page/conversation-list";
import ConversationDetail from "@/components/admin/inbox/inbox-page/conversation-detail";
import type { Conversation, ConversationStatus } from "@/lib/inbox/inbox-types";
import { API_URL } from "@/lib/api";

export default function InboxPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const [reply, setReply] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedConversation = useMemo(
    () =>
      conversations.find((conversation) => conversation.id === selectedId) ??
      conversations[0],
    [conversations, selectedId],
  );

  const filteredConversations = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return conversations;
    }

    return conversations.filter((conversation) => {
      const latestMessage =
        conversation.messages?.[conversation.messages.length - 1];

      return (
        conversation.client.name.toLowerCase().includes(query) ||
        conversation.client.email.toLowerCase().includes(query) ||
        conversation.subject?.toLowerCase().includes(query) ||
        conversation.id.toLowerCase().includes(query) ||
        latestMessage?.content.toLowerCase().includes(query)
      );
    });
  }, [conversations, search]);

  useEffect(() => {
    async function loadConversations() {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("nexus_token");

        if (!token) {
          setError("Authentication required.");
          return;
        }

        const response = await fetch(`${API_URL}/conversations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load conversations.");
        }

        const data = await response.json();

        const loadedConversations: Conversation[] = data.conversations ?? data;

        setConversations(loadedConversations);

        if (loadedConversations.length > 0) {
          setSelectedId(loadedConversations[0].id);
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load conversations.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadConversations();
  }, []);

  useEffect(() => {
    if (!selectedConversation?.id) {
      return;
    }

    const conversationId = selectedConversation.id;

    async function loadMessages() {
      try {
        setMessagesLoading(true);

        const token = localStorage.getItem("nexus_token");

        if (!token) {
          return;
        }

        const response = await fetch(
          `${API_URL}/messages/conversation/${conversationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to load messages.");
        }

        const data = await response.json();

        const messages = data.messages ?? data;

        setConversations((current) =>
          current.map((conversation) =>
            conversation.id === conversationId
              ? {
                  ...conversation,
                  messages,
                }
              : conversation,
          ),
        );
      } catch (error) {
        console.error("Failed to load conversation messages:", error);
      } finally {
        setMessagesLoading(false);
      }
    }

    loadMessages();
  }, [selectedConversation?.id]);

  useEffect(() => {
    if (!selectedConversation?.id) {
      return;
    }

    const token = localStorage.getItem("nexus_token");

    if (!token) {
      return;
    }

    const conversationId = selectedConversation.id;

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

    connect();

    return () => {
      stopped = true;

      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }

      socket?.close();
    };
  }, [selectedConversation?.id]);

  function selectConversation(conversation: Conversation) {
    setSelectedId(conversation.id);
    setReply("");
    setSent(false);
  }

  async function updateConversationStatus(nextStatus: ConversationStatus) {
    if (!selectedConversation) {
      return;
    }

    try {
      const token = localStorage.getItem("nexus_token");

      if (!token) {
        return;
      }

      const response = await fetch(
        `${API_URL}/conversations/${selectedConversation.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: nextStatus,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update conversation.");
      }

      const data = await response.json();

      const updatedConversation: Conversation = data.conversation ?? data;

      setConversations((current) =>
        current.map((conversation) =>
          conversation.id === updatedConversation.id
            ? updatedConversation
            : conversation,
        ),
      );
    } catch (error) {
      console.error("Failed to update conversation:", error);
    }
  }

  async function sendReply() {
    if (!selectedConversation || !reply.trim()) {
      return;
    }

    try {
      const token = localStorage.getItem("nexus_token");

      if (!token) {
        return;
      }

      const content = reply.trim();

      const response = await fetch(
        `${API_URL}/messages/conversation/${selectedConversation.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to send reply.");
      }

      const data = await response.json();

      const message = data.message ?? data;

      setConversations((current) =>
        current.map((conversation) => {
          if (conversation.id !== selectedConversation.id) {
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
            updatedAt: message.createdAt ?? conversation.updatedAt,
          };
        }),
      );

      setReply("");
      setSent(true);

      setTimeout(() => {
        setSent(false);
      }, 2200);
    } catch (error) {
      console.error("Failed to send reply:", error);
    }
  }
  if (error) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-center"
        >
          <div className="text-[12px] font-bold">Unable to load inbox</div>

          <div className="mt-2 text-[10px] text-black/40">{error}</div>
        </motion.div>
      </motion.main>
    );
  }

  return (
    <main className="flex min-h-[100vh] max-h-[100vh] min-w-0 w-[calc(100vw_-_250px)] flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="flex shrink-0 items-center justify-between border-b border-black/[0.08] px-5 py-4 sm:px-7"
      >
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/30">
            Inbox
          </div>

          <h1 className="mt-1 text-[22px] font-bold tracking-[-0.04em]">
            Conversations
          </h1>
        </div>

        <Link
          href="/admin"
          className="flex items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-3.5 py-2.5 text-[10px] font-bold text-black/60 transition-colors hover:border-black/15 hover:text-black"
        >
          <Archive size={12} />
          Dashboard
        </Link>
      </motion.div>

      <div className="flex min-h-0 flex-1">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.25,
            delay: 0.04,
            ease: "easeOut",
          }}
          className="min-h-0"
        >
          <ConversationList
            conversations={filteredConversations}
            selectedId={selectedConversation?.id ?? ""}
            search={search}
            onSearchChange={setSearch}
            onSelect={selectConversation}
          />
        </motion.div>

        <AnimatePresence mode="wait" initial={false}>
          {selectedConversation ? (
            <motion.div
              key={selectedConversation.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{
                duration: 0.18,
                ease: "easeOut",
              }}
              className="flex min-w-0 flex-1"
            >
              <ConversationDetail
                conversation={selectedConversation}
                status={selectedConversation.status}
                reply={reply}
                sent={sent}
                onStatusChange={updateConversationStatus}
                onReplyChange={setReply}
                onSendReply={sendReply}
              />
            </motion.div>
          ) : (
            <motion.section
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex min-w-0 flex-1 items-center justify-center"
            >
              <div className="text-center">
                <Clock3 size={24} className="mx-auto text-black/20" />

                <div className="mt-3 text-[12px] font-bold">
                  No conversation selected
                </div>

                <div className="mt-1 text-[10px] text-black/35">
                  Select a conversation to view its messages.
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
