"use client";

import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { api } from "./api";
import {
  groupConversations,
  normalizeRole,
  visibleMessageContent,
} from "./format";
import type { AIConversation, AIMessage, User } from "./types";

export function useAiChat() {
  const [user, setUser] = useState<User | null>(null);
  const [authState, setAuthState] = useState<
    "checking" | "allowed" | "denied" | "error"
  >("checking");
  const [conversations, setConversations] = useState<AIConversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [pageError, setPageError] = useState("");
  const [sendError, setSendError] = useState("");
  const [menuId, setMenuId] = useState<string | null>(null);
  const [mobileHistoryOpen, setMobileHistoryOpen] = useState(false);
  const [scrollToBottomVisible, setScrollToBottomVisible] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortLoadRef = useRef(0);

  const loadConversations = useCallback(
    async (keepSelection = true) => {
      setLoadingConversations(true);
      try {
        const response = await api<
          | { success?: boolean; conversations?: AIConversation[] }
          | AIConversation[]
        >("/ai/conversations");
        const list = Array.isArray(response)
          ? response
          : response.conversations || [];
        setConversations(list);
        if (
          !keepSelection &&
          selectedId &&
          !list.some((item) => item.id === selectedId)
        )
          setSelectedId(null);
      } catch (error) {
        setPageError(
          error instanceof Error
            ? error.message
            : "Could not load conversations.",
        );
      } finally {
        setLoadingConversations(false);
      }
    },
    [selectedId],
  );

  useEffect(() => {
    let cancelled = false;
    async function verifyAccess() {
      try {
        const response = await api<{ success?: boolean; user?: User } | User>(
          "/auth/me",
        );
        const currentUser =
          (response as { user?: User }).user || (response as User);
        if (cancelled) return;
        setUser(currentUser);
        if (normalizeRole(currentUser?.role) !== "ADMIN") {
          setAuthState("denied");
          setLoadingConversations(false);
          return;
        }
        setAuthState("allowed");
      } catch (error) {
        if (cancelled) return;
        setPageError(
          error instanceof Error
            ? error.message
            : "Could not verify your session.",
        );
        setAuthState("error");
        setLoadingConversations(false);
      }
    }
    void verifyAccess();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (authState === "allowed") void loadConversations();
  }, [authState, loadConversations]);

  const loadMessages = useCallback(async (conversationId: string) => {
    const requestId = ++abortLoadRef.current;
    setLoadingMessages(true);
    setSendError("");
    try {
      const response = await api<{
        success?: boolean;
        conversation?: { messages?: AIMessage[] };
      }>(`/ai/conversations/${encodeURIComponent(conversationId)}`);
      if (requestId !== abortLoadRef.current) return;
      setMessages(response.conversation?.messages || []);
    } catch (error) {
      if (requestId !== abortLoadRef.current) return;
      setMessages([]);
      setSendError(
        error instanceof Error
          ? error.message
          : "Could not load this conversation.",
      );
    } finally {
      if (requestId === abortLoadRef.current) setLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    if (!selectedId || authState !== "allowed") {
      setMessages([]);
      setLoadingMessages(false);
      return;
    }
    void loadMessages(selectedId);
  }, [selectedId, authState, loadMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sending, selectedId]);

  const filteredConversations = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return conversations;
    return conversations.filter(
      (item) =>
        item.title?.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query),
    );
  }, [conversations, search]);

  const conversationGroups = useMemo(
    () => groupConversations(filteredConversations),
    [filteredConversations],
  );
  const selectedConversation =
    conversations.find((item) => item.id === selectedId) || null;
  const visibleMessages = messages.filter(
    (message) => visibleMessageContent(message.content).trim().length > 0,
  );

  const startNewChat = useCallback(() => {
    abortLoadRef.current += 1;
    setSelectedId(null);
    setMessages([]);
    setDraft("");
    setSendError("");
    setPageError("");
    setMobileHistoryOpen(false);
    textareaRef.current?.focus();
  }, []);

  const chooseConversation = useCallback((id: string) => {
    setSelectedId(id);
    setSendError("");
    setMobileHistoryOpen(false);
    setMenuId(null);
  }, []);

  const deleteConversation = useCallback(
    async (conversation: AIConversation) => {
      if (
        !window.confirm(
          `Delete “${conversation.title || "Untitled conversation"}”? This cannot be undone.`,
        )
      )
        return;
      setMenuId(null);
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
    [selectedId],
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
    [sending, selectedId, loadConversations],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(draft);
  };

  const handleComposerKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      void sendMessage(draft);
    }
  };

  const onMessageScroll = () => {
    const element = messageListRef.current;
    if (!element) return;
    setScrollToBottomVisible(
      element.scrollHeight - element.scrollTop - element.clientHeight > 220,
    );
  };

  return {
    user,
    authState,
    conversations,
    selectedId,
    messages,
    draft,
    setDraft,
    search,
    setSearch,
    loadingConversations,
    loadingMessages,
    sending,
    pageError,
    setPageError,
    sendError,
    setSendError,
    menuId,
    setMenuId,
    mobileHistoryOpen,
    setMobileHistoryOpen,
    scrollToBottomVisible,
    messageListRef,
    textareaRef,
    bottomRef,
    filteredConversations,
    conversationGroups,
    selectedConversation,
    visibleMessages,
    loadConversations,
    startNewChat,
    chooseConversation,
    deleteConversation,
    handleSubmit,
    handleComposerKeyDown,
    onMessageScroll,
  };
}
