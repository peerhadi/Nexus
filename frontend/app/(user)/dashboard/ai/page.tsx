"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Bot,
  Check,
  Copy,
  Loader2,
  MessageSquare,
  Plus,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
type Message = {
  id: string;
  role: "USER" | "ASSISTANT";
  content: string;
  createdAt?: string;
};

type Conversation = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    messages: number;
  };
};

type ChatResponse = {
  success: boolean;
  conversationId?: string;
  message?: {
    id: string;
    role: "assistant";
    content: string;
    createdAt: string;
  };
  error?: string;
};

type ConversationsResponse = {
  success: boolean;
  conversations?: Conversation[];
  error?: string;
};

type ConversationResponse = {
  success: boolean;
  conversation?: {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    messages: Message[];
  };
  error?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const suggestions = [
  {
    title: "What is Nexus?",
    text: "What is Nexus and what can it help me with?",
  },
  {
    title: "Our services",
    text: "What services does Nexus provide?",
  },
  {
    title: "Start a project",
    text: "How can I start a project with Nexus?",
  },
  {
    title: "Website help",
    text: "What can I do on the Nexus website?",
  },
];

export default function AIPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingConversation, setLoadingConversation] = useState(false);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getToken = () => {
    if (typeof window === "undefined") return null;

    return localStorage.getItem("nexus_token");
  };

  const getHeaders = (): HeadersInit => {
    const token = getToken();

    return {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    };
  };

  /*
   * Load all conversations for the current user.
   */
  const loadConversations = async () => {
    setLoadingConversations(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/ai/conversations`, {
        method: "GET",
        headers: getHeaders(),
      });

      const data: ConversationsResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to load AI conversations.");
      }

      setConversations(data.conversations || []);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load AI conversations.";

      setError(message);
    } finally {
      setLoadingConversations(false);
    }
  };

  /*
   * Load one conversation and all of its messages.
   */
  const loadConversation = async (id: string) => {
    if (loading) return;

    setLoadingConversation(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/ai/conversations/${id}`, {
        method: "GET",
        headers: getHeaders(),
      });

      const data: ConversationResponse = await response.json();

      if (!response.ok || !data.success || !data.conversation) {
        throw new Error(data.error || "Failed to load conversation.");
      }

      setConversationId(data.conversation.id);
      setMessages(data.conversation.messages || []);
      setInput("");

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load conversation.";

      setError(message);
    } finally {
      setLoadingConversation(false);
    }
  };

  /*
   * Load conversations when the page mounts.
   */
  useEffect(() => {
    loadConversations();
  }, []);

  /*
   * Scroll to the newest message.
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);

  /*
   * Start a new conversation.
   *
   * This does NOT create a database row immediately.
   * The backend creates the conversation when the first
   * message is sent.
   */
  const newChat = () => {
    if (loading || loadingConversation) return;

    setConversationId(null);
    setMessages([]);
    setInput("");
    setError(null);

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  };

  /*
   * Send a message to Nexus AI.
   */
  const sendMessage = async (text?: string) => {
    const value = (text ?? input).trim();

    if (!value || loading || loadingConversation) return;

    const temporaryId = `temp-${Date.now()}`;

    const userMessage: Message = {
      id: temporaryId,
      role: "USER",
      content: value,
      createdAt: new Date().toISOString(),
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/ai/chat`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          prompt: value,
          conversationId,
        }),
      });

      let data: ChatResponse;

      try {
        data = await response.json();
      } catch {
        throw new Error("The server returned an invalid response.");
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Nexus AI could not process your request.",
        );
      }

      if (!data.conversationId || !data.message) {
        throw new Error("Nexus AI returned an incomplete response.");
      }

      /*
       * If this was the first message, the backend created
       * a new conversation.
       */
      setConversationId(data.conversationId);

      const assistantMessage: Message = {
        id: data.message.id,
        role: "ASSISTANT",
        content: data.message.content,
        createdAt: data.message.createdAt,
      };

      /*
       * Replace the temporary user message with a clean
       * persisted state and add the assistant response.
       */
      setMessages((current) => [
        ...current.filter((message) => message.id !== temporaryId),
        {
          ...userMessage,
          id: `${data.conversationId}-${Date.now()}`,
        },
        assistantMessage,
      ]);

      /*
       * Refresh the sidebar so the new conversation appears
       * immediately and its title/count are updated.
       */
      await loadConversations();
    } catch (err) {
      /*
       * Remove the temporary message if sending failed.
       */
      setMessages((current) =>
        current.filter((message) => message.id !== temporaryId),
      );

      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong while contacting Nexus AI.";

      setError(message);
    } finally {
      setLoading(false);

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    }
  };

  /*
   * Delete a conversation.
   */
  const deleteConversation = async (event: React.MouseEvent, id: string) => {
    event.stopPropagation();

    if (loading || loadingConversation) return;

    const conversation = conversations.find((item) => item.id === id);

    if (!conversation) return;

    try {
      setError(null);

      const response = await fetch(`${API_URL}/ai/conversations/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      const data: { success: boolean; error?: string } = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to delete conversation.");
      }

      setConversations((current) => current.filter((item) => item.id !== id));

      if (conversationId === id) {
        newChat();
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete conversation.";

      setError(message);
    }
  };

  /*
   * Copy an assistant response.
   */
  const copyMessage = async (message: Message) => {
    try {
      await navigator.clipboard.writeText(message.content);

      setCopiedId(message.id);

      setTimeout(() => {
        setCopiedId((current) => (current === message.id ? null : current));
      }, 1500);
    } catch {
      setError("Unable to copy this response.");
    }
  };

  /*
   * Format conversation timestamps for the sidebar.
   */
  const formatDate = (date: string) => {
    const value = new Date(date);
    const now = new Date();

    const diff = now.getTime() - value.getTime();

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diff < minute) return "Just now";

    if (diff < hour) {
      const minutes = Math.floor(diff / minute);
      return `${minutes}m ago`;
    }

    if (diff < day) {
      const hours = Math.floor(diff / hour);
      return `${hours}h ago`;
    }

    if (diff < day * 7) {
      const days = Math.floor(diff / day);
      return `${days}d ago`;
    }

    return value.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (!loading && !loadingConversation && input.trim()) {
        sendMessage();
      }
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <main className="flex h-[calc(100vh-70px)] min-h-0 overflow-hidden bg-[#fafafa] text-slate-800">
      {/* ========================================================= */}
      {/* SIDEBAR */}
      {/* ========================================================= */}

      <aside className="hidden w-[245px] shrink-0 border-r border-black/[0.05] bg-white/70 p-4 lg:flex lg:flex-col">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
              Nexus AI
            </div>

            <div className="mt-1 text-[13px] font-black text-slate-700">
              Conversations
            </div>
          </div>

          <button
            type="button"
            onClick={newChat}
            disabled={loading || loadingConversation}
            aria-label="New conversation"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-black/[0.06] bg-white text-slate-400 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={15} />
          </button>
        </div>

        {/* Conversation list */}
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          {loadingConversations ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={15} className="animate-spin text-cyan-400" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="px-2 py-8 text-center">
              <MessageSquare size={20} className="mx-auto text-slate-200" />

              <p className="mt-3 text-[9px] font-semibold leading-4 text-slate-300">
                Your conversations will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {conversations.map((conversation) => {
                const active = conversation.id === conversationId;

                return (
                  <div
                    key={conversation.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => loadConversation(conversation.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        loadConversation(conversation.id);
                      }
                    }}
                    className={`group flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 transition ${
                      active ? "bg-cyan-50" : "hover:bg-slate-50"
                    }`}
                  >
                    <MessageSquare
                      size={14}
                      className={
                        active
                          ? "shrink-0 text-cyan-500"
                          : "shrink-0 text-slate-300"
                      }
                    />

                    <div className="min-w-0 flex-1">
                      <div
                        className={`truncate text-[10px] font-black ${
                          active ? "text-cyan-600" : "text-slate-700"
                        }`}
                      >
                        {conversation.title || "New conversation"}
                      </div>

                      <div className="mt-0.5 text-[8px] text-slate-400">
                        {formatDate(conversation.updatedAt)}
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-label="Delete conversation"
                      onClick={(event) =>
                        deleteConversation(event, conversation.id)
                      }
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-slate-200 opacity-0 transition hover:bg-red-50 hover:text-red-400 group-hover:opacity-100"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar footer */}
        <div className="mt-4 rounded-2xl border border-black/[0.05] bg-gradient-to-br from-cyan-50 to-violet-50 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-cyan-500 shadow-sm">
            <Sparkles size={15} />
          </div>

          <div className="mt-3 text-[10px] font-black text-slate-700">
            Nexus AI
          </div>

          <p className="mt-1 text-[8px] font-medium leading-4 text-slate-400">
            Your intelligent Nexus workspace assistant.
          </p>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* MAIN CHAT */}
      {/* ========================================================= */}

      <section className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex h-[68px] shrink-0 items-center justify-between border-b border-black/[0.05] bg-white/75 px-5 backdrop-blur-xl sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-white shadow-[0_5px_18px_rgba(34,211,238,0.2)]">
              <Bot size={17} />
            </div>

            <div>
              <div className="text-[11px] font-black text-slate-700">
                Nexus AI
              </div>

              <div
                className={`mt-0.5 flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.12em] ${
                  loading || loadingConversation
                    ? "text-cyan-500"
                    : "text-emerald-500"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    loading || loadingConversation
                      ? "animate-pulse bg-cyan-400"
                      : "bg-emerald-400"
                  }`}
                />

                {loading
                  ? "Thinking"
                  : loadingConversation
                    ? "Loading"
                    : "Ready"}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={newChat}
            disabled={loading || loadingConversation || !hasMessages}
            className="rounded-xl px-3 py-2 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400 transition hover:bg-black/[0.03] hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-30"
          >
            New chat
          </button>
        </header>

        {/* ======================================================= */}
        {/* MESSAGES */}
        {/* ======================================================= */}

        <div className="min-h-0 flex-1 overflow-y-auto">
          {loadingConversation ? (
            <div className="flex h-full items-center justify-center">
              <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400">
                <Loader2 size={14} className="animate-spin text-cyan-500" />
                Loading conversation...
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex min-h-full items-center justify-center px-5 py-12">
              <div className="w-full max-w-2xl">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-white shadow-[0_12px_35px_rgba(34,211,238,0.2)]">
                  <Sparkles size={24} />
                </div>

                <div className="mt-6 text-center">
                  <h1 className="text-3xl font-black tracking-[-0.05em] text-slate-800 sm:text-4xl">
                    What can I help you with?
                  </h1>

                  <p className="mx-auto mt-3 max-w-md text-[11px] font-medium leading-5 text-slate-400">
                    Ask me anything about Nexus, our services, projects, or how
                    to use the website.
                  </p>
                </div>

                <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.title}
                      type="button"
                      disabled={loading}
                      onClick={() => sendMessage(suggestion.text)}
                      className="group rounded-2xl border border-black/[0.06] bg-white p-4 text-left shadow-[0_8px_30px_rgba(0,0,0,0.025)] transition hover:border-cyan-200 hover:bg-cyan-50/30 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <div className="text-[10px] font-black text-slate-700 transition group-hover:text-cyan-500">
                        {suggestion.title}
                      </div>

                      <div className="mt-1.5 text-[9px] font-medium leading-4 text-slate-400">
                        {suggestion.text}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-3xl space-y-7 px-5 py-8 sm:px-8">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "USER" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "ASSISTANT" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-white">
                      <Bot size={14} />
                    </div>
                  )}

                  <div
                    className={`max-w-[75%] ${
                      message.role === "USER"
                        ? "rounded-2xl rounded-tr-md bg-slate-800 px-4 py-3 text-white"
                        : "rounded-2xl rounded-tl-md border border-black/[0.05] bg-white px-4 py-3 shadow-[0_6px_25px_rgba(0,0,0,0.025)]"
                    }`}
                  >
                    <div
                      className={`whitespace-pre-wrap text-[11px] font-medium leading-5 ${
                        message.role === "USER"
                          ? "text-white"
                          : "text-slate-600"
                      }`}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>

                    {message.role === "ASSISTANT" && (
                      <button
                        type="button"
                        onClick={() => copyMessage(message)}
                        className="mt-3 flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.1em] text-slate-300 transition hover:text-cyan-500"
                      >
                        {copiedId === message.id ? (
                          <>
                            <Check size={11} />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            Copy
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {message.role === "USER" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                      <User size={14} />
                    </div>
                  )}
                </div>
              ))}

              {/* Thinking indicator */}
              {loading && (
                <div className="flex justify-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-white">
                    <Bot size={14} />
                  </div>

                  <div className="rounded-2xl rounded-tl-md border border-black/[0.05] bg-white px-4 py-3 shadow-[0_6px_25px_rgba(0,0,0,0.025)]">
                    <div className="flex items-center gap-2">
                      <Loader2
                        size={13}
                        className="animate-spin text-cyan-500"
                      />

                      <span className="text-[10px] font-semibold text-slate-400">
                        Nexus AI is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* ======================================================= */}
        {/* ERROR */}
        {/* ======================================================= */}

        {error && (
          <div className="shrink-0 px-4 pb-2 sm:px-6">
            <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-[9px] font-semibold text-red-500">
              <span>{error}</span>

              <button
                type="button"
                onClick={() => setError(null)}
                className="shrink-0 font-black uppercase tracking-wider text-red-400 hover:text-red-600"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* INPUT */}
        {/* ======================================================= */}

        <div className="shrink-0 border-t border-black/[0.05] bg-white/80 px-4 py-4 backdrop-blur-xl sm:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-end gap-2 rounded-2xl border border-black/[0.07] bg-white p-2 shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition focus-within:border-cyan-300">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading || loadingConversation}
                placeholder={
                  loading ? "Nexus AI is thinking..." : "Message Nexus AI..."
                }
                rows={1}
                className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent px-3 py-2.5 text-[11px] font-medium text-slate-700 outline-none placeholder:text-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading || loadingConversation}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-30"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <ArrowUp size={16} />
                )}
              </button>
            </div>

            <p className="mt-2 text-center text-[8px] font-medium text-slate-300">
              Nexus AI can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
