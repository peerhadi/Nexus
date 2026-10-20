"use client";

import { useEffect, useMemo, useState } from "react";

import type { Conversation } from "@/lib/inbox/inbox-types";
import { API_URL } from "@/lib/api";
import { useInboxSocket } from "./use-inbox-socket";

export function useInboxData() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [error, setError] = useState("");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

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

        const token =
          localStorage.getItem("nexus_token") ??
          sessionStorage.getItem("nexus_token");

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

    void loadConversations();
  }, []);

  useEffect(() => {
    if (!selectedConversation?.id) {
      return;
    }

    const conversationId = selectedConversation.id;

    async function loadMessages() {
      try {
        setMessagesLoading(true);

        const token =
          localStorage.getItem("nexus_token") ??
          sessionStorage.getItem("nexus_token");

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

    void loadMessages();
  }, [selectedConversation?.id]);

  useInboxSocket({
    conversationId: selectedConversation?.id,
    setConversations,
  });

  useEffect(() => {
    document.body.style.overflow = mobileDrawerOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileDrawerOpen]);

  return {
    conversations,
    error,
    filteredConversations,
    loading,
    messagesLoading,
    mobileDrawerOpen,
    search,
    selectedConversation,
    selectedId,
    setConversations,
    setMobileDrawerOpen,
    setSearch,
    setSelectedId,
  };
}
