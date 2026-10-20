"use client";

import { useCallback } from "react";

import { api } from "./api";
import type { AIConversation, AIMessage } from "./types";

export function useAiActions({
  sending,
  setSending,
  selectedId,
  setSelectedId,
  draft,
  setDraft,
  setMessages,
  setConversations,
  setSendError,
  loadConversations,
  textareaRef,
}: {
  sending: boolean;
  setSending: (value: boolean) => void;
  selectedId: string | null;
  setSelectedId: (value: string | null) => void;
  draft: string;
  setDraft: (value: string) => void;
  setMessages: React.Dispatch<React.SetStateAction<AIMessage[]>>;
  setConversations: React.Dispatch<React.SetStateAction<AIConversation[]>>;
  setSendError: (value: string) => void;
  loadConversations: () => Promise<void>;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}) {
  const deleteConversation = useCallback(
    async (conversation: AIConversation) => {
      if (
        !window.confirm(
          `Delete “${conversation.title || "Untitled conversation"}”? This cannot be undone.`,
        )
      )
        return;
      try {
        await api(`/ai/conversations/${encodeURIComponent(conversation.id)}`, {
          method: "DELETE",
        });
        setConversations((current) =>
          current.filter((item) => item.id !== conversation.id),
        );
        if (selectedId === conversation.id) {
          setSelectedId(null);
          setMessages([]);
        }
      } catch (error) {
        setSendError(
          error instanceof Error
            ? error.message
            : "Could not delete this conversation.",
        );
      }
    },
    [selectedId, setConversations, setMessages, setSelectedId, setSendError],
  );

  const sendMessage = useCallback(
    async (rawPrompt: string) => {
      const prompt = rawPrompt.trim();
      if (!prompt || sending) return;
      setSending(true);
      setSendError("");
      setDraft("");

      const optimisticId = `local-${Date.now()}`;
      const optimisticMessage: AIMessage = {
        id: optimisticId,
        role: "USER",
        content: prompt,
        createdAt: new Date().toISOString(),
      };
      setMessages((current) => [...current, optimisticMessage]);

      try {
        const wrappedPrompt = `${prompt}`;
        const response = await api<{
          success?: boolean;
          conversationId: string;
          message: AIMessage;
        }>("/ai/chat", {
          method: "POST",
          body: JSON.stringify({
            prompt: wrappedPrompt,
            ...(selectedId ? { conversationId: selectedId } : {}),
          }),
        });

        const conversationId = response.conversationId;
        setSelectedId(conversationId);
        setMessages((current) => {
          const withoutOptimistic = current.filter(
            (message) => message.id !== optimisticId,
          );
          return [...withoutOptimistic, optimisticMessage, response.message];
        });
        await loadConversations();
      } catch (error) {
        setMessages((current) =>
          current.filter((message) => message.id !== optimisticId),
        );
        setDraft(prompt);
        setSendError(
          error instanceof Error
            ? error.message
            : "Nexus Admin AI could not respond. Please try again.",
        );
      } finally {
        setSending(false);
        window.setTimeout(() => textareaRef.current?.focus(), 0);
      }
    },
    [
      sending,
      selectedId,
      loadConversations,
      setDraft,
      setMessages,
      setSelectedId,
      setSendError,
      setSending,
      textareaRef,
    ],
  );

  return { deleteConversation, sendMessage };
}
