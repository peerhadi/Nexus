"use client";

import { useState } from "react";

import type { Conversation, ConversationStatus } from "@/lib/inbox/inbox-types";
import { API_URL } from "@/lib/api";

type UseInboxActionsArgs = {
  selectedConversation: Conversation | undefined;
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  setMobileDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useInboxActions({
  selectedConversation,
  setConversations,
  setSelectedId,
  setMobileDrawerOpen,
}: UseInboxActionsArgs) {
  const [reply, setReply] = useState("");
  const [sent, setSent] = useState(false);

  function selectConversation(conversation: Conversation) {
    setSelectedId(conversation.id);
    setReply("");
    setSent(false);
    setMobileDrawerOpen(false);
  }

  async function updateConversationStatus(nextStatus: ConversationStatus) {
    if (!selectedConversation) {
      return;
    }

    try {
      const token =
        localStorage.getItem("nexus_token") ??
        sessionStorage.getItem("nexus_token");

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
      const token =
        localStorage.getItem("nexus_token") ??
        sessionStorage.getItem("nexus_token");

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

  return {
    reply,
    sent,
    selectConversation,
    sendReply,
    setReply,
    updateConversationStatus,
  };
}
