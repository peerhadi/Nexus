"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  Bot,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  Command,
  FileText,
  LoaderCircle,
  MessageSquare,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MarkdownContent from "../components/MardownContent";

type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string | null;
};

type AIMessage = {
  id: string;
  role: "USER" | "ASSISTANT" | "user" | "assistant" | string;
  content: string;
  createdAt: string;
};

type AIConversation = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  _count?: { messages: number };
};

type ApiError = { error?: string; message?: string };

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
).replace(/\/+$/, "");
const ADMIN_INSTRUCTIONS_MARKER =
  "\n\n[ NEXUS ADMIN WORKSPACE INSTRUCTIONS ]\n";

function readToken() {
  if (typeof window === "undefined") return null;
  return (
    window.localStorage.getItem("nexus_token") ||
    window.sessionStorage.getItem("nexus_token")
  );
}

async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = readToken();
  if (!token)
    throw new Error("Your session has expired. Please sign in again.");

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
    cache: "no-store",
  });

  if (response.status === 204) return undefined as T;
  const body = (await response.json().catch(() => null)) as
    (T & ApiError) | null;
  if (!response.ok)
    throw new Error(
      body?.message || body?.error || `Request failed (${response.status})`,
    );
  return body as T;
}

function normalizeRole(role?: string | null) {
  return role?.trim().toUpperCase();
}

function normalizeMessageRole(role: string) {
  return role.toUpperCase() === "USER" ? "USER" : "ASSISTANT";
}

function visibleMessageContent(content: string) {
  const markerIndex = content.indexOf(ADMIN_INSTRUCTIONS_MARKER);
  return markerIndex >= 0 ? content.slice(0, markerIndex).trimEnd() : content;
}

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatConversationDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Earlier";
  const now = new Date();
  if (date.toDateString() === now.toDateString()) return "Today";
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
  }).format(date);
}

function displayName(user?: User | null) {
  return user?.name?.trim() || user?.email || "Administrator";
}

function initials(user?: User | null) {
  const value = displayName(user);
  return (
    value
      .split(/[\s._@-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "A"
  );
}

function groupConversations(conversations: AIConversation[]) {
  const groups = new Map<string, AIConversation[]>();
  for (const conversation of conversations) {
    const label = formatConversationDate(
      conversation.updatedAt || conversation.createdAt,
    );
    const current = groups.get(label) || [];
    current.push(conversation);
    groups.set(label, current);
  }
  return Array.from(groups.entries());
}

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MessageContent({ content }: { content: string }) {
  const normalizedContent = content
    .replace(/^[ \t]*\\+(-{3,}|_{3,}|\*{3,})[ \t]*$/gm, "$1")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x20;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  return (
    <div className="break-words text-sm leading-7 text-[var(--text-primary)]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="mb-3 mt-5 text-xl font-bold tracking-tight">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h3 className="mb-2 mt-5 text-base font-bold tracking-tight">
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="mb-2 mt-4 text-sm font-bold">{children}</h4>
          ),
          p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
          ul: ({ children }) => (
            <ul className="mb-4 ml-5 list-disc space-y-1.5">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 ml-5 list-decimal space-y-1.5">{children}</ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          hr: () => (
            <hr className="my-5 border-0 border-t border-[var(--border)]" />
          ),
          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          em: ({ children }) => <em>{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-2 border-[var(--accent)] pl-4 opacity-85">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] underline underline-offset-4"
            >
              {children}
            </a>
          ),
          pre: ({ children }) => (
            <pre className="my-4 overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-4 text-xs leading-6">
              {children}
            </pre>
          ),
          code: ({ className, children }) =>
            className ? (
              <code className={className}>{children}</code>
            ) : (
              <code className="rounded bg-[var(--bg-secondary)] px-1.5 py-0.5 text-[0.9em]">
                {children}
              </code>
            ),
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-[var(--border)] px-3 py-2 font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-[var(--border)] px-3 py-2">
              {children}
            </td>
          ),
        }}
      >
        {normalizedContent}
      </ReactMarkdown>
    </div>
  );
}

function renderInline(value: string) {
  const parts = value.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`"))
      return (
        <code
          key={index}
          className="rounded-md border border-[var(--border)] bg-[var(--surface-secondary)] px-1.5 py-0.5 font-mono text-[0.88em]"
        >
          {part.slice(1, -1)}
        </code>
      );
    if (part.startsWith("**") && part.endsWith("**"))
      return (
        <strong key={index} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    return <span key={index}>{part}</span>;
  });
}

export default function AdminAIPage() {
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

  if (authState === "checking") {
    return (
      <main className="grid min-h-[calc(100dvh-1px)] place-items-center bg-[var(--background)] px-5 text-[var(--text-primary)]">
        <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 text-sm text-[var(--text-secondary)]">
          <LoaderCircle className="h-4 w-4 animate-spin text-[var(--accent)]" />{" "}
          Verifying administrator access…
        </div>
      </main>
    );
  }

  if (authState === "denied") {
    return (
      <main className="grid min-h-[calc(100dvh-1px)] place-items-center bg-[var(--background)] px-5 text-[var(--text-primary)]">
        <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow-md)]">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-[var(--danger-border,var(--border))] bg-[var(--danger-bg,var(--surface-secondary))] text-[var(--danger,var(--text-primary))]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-xl font-bold">
            Administrator access required
          </h1>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            Nexus Admin AI is only available to accounts with the ADMIN role.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-contrast,var(--background))]"
          >
            Return to Nexus <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </main>
    );
  }

  if (authState === "error") {
    return (
      <main className="grid min-h-[calc(100dvh-1px)] place-items-center bg-[var(--background)] px-5 text-[var(--text-primary)]">
        <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[var(--surface-secondary)]">
            <ShieldCheck className="h-5 w-5 text-[var(--text-secondary)]" />
          </div>
          <h1 className="mt-4 text-lg font-bold">Could not verify access</h1>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            {pageError || "Check your session and try again."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-2.5 text-sm font-semibold"
          >
            <RefreshCw className="h-4 w-4" /> Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-[100dvh] min-h-[560px] overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      <AnimatePresence>
        {mobileHistoryOpen && (
          <>
            <motion.button
              aria-label="Close conversation history"
              onClick={() => setMobileHistoryOpen(false)}
              className="fixed inset-0 z-40 bg-[var(--overlay)] backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[min(88vw,340px)] flex-col border-r border-[var(--border)] bg-[var(--surface)] lg:hidden"
            >
              <HistoryPanel
                user={user}
                conversations={filteredConversations}
                groups={conversationGroups}
                selectedId={selectedId}
                search={search}
                loading={loadingConversations}
                menuId={menuId}
                setSearch={setSearch}
                setMenuId={setMenuId}
                onNew={startNewChat}
                onSelect={chooseConversation}
                onDelete={deleteConversation}
                onRefresh={() => void loadConversations()}
                onClose={() => setMobileHistoryOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <aside className="hidden w-[286px] shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface)] lg:flex xl:w-[310px]">
        <HistoryPanel
          user={user}
          conversations={filteredConversations}
          groups={conversationGroups}
          selectedId={selectedId}
          search={search}
          loading={loadingConversations}
          menuId={menuId}
          setSearch={setSearch}
          setMenuId={setMenuId}
          onNew={startNewChat}
          onSelect={chooseConversation}
          onDelete={deleteConversation}
          onRefresh={() => void loadConversations()}
        />
      </aside>

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[68px] shrink-0 items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface)]/90 px-3 sm:px-5 lg:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              aria-label="Open conversation history"
              onClick={() => setMobileHistoryOpen(true)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] lg:hidden"
            >
              <Command className="h-4 w-4" />
            </button>
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[var(--accent-border,var(--border))] bg-[var(--accent-subtle)] text-[var(--accent)]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-sm font-bold tracking-tight sm:text-base">
                  Nexus Admin AI
                </h1>
                <span className="hidden rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)] sm:inline-flex">
                  Internal
                </span>
              </div>
              <p className="mt-0.5 truncate text-[11px] text-[var(--text-secondary)]">
                Technical partner for the Nexus team
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] px-2.5 py-1.5 text-[10px] font-semibold text-[var(--text-secondary)] sm:flex">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--success)]" />{" "}
              Admin session
            </div>
            <Link
              href="/admin"
              className="hidden items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] sm:inline-flex"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
            </Link>
            <button
              type="button"
              aria-label="Refresh history"
              onClick={() => void loadConversations()}
              className="grid h-9 w-9 place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${loadingConversations ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </header>

        {pageError && (
          <div className="mx-4 mt-3 flex items-center justify-between gap-3 rounded-xl border border-[var(--danger-border,var(--border))] bg-[var(--danger-bg,var(--surface-secondary))] px-3 py-2 text-xs text-[var(--danger,var(--text-primary))] sm:mx-7">
            <span>{pageError}</span>
            <button onClick={() => setPageError("")} aria-label="Dismiss error">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div
          ref={messageListRef}
          onScroll={onMessageScroll}
          className="relative min-h-0 flex-1 overflow-y-auto"
        >
          {visibleMessages.length === 0 && !loadingMessages ? (
            <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col justify-center px-4 py-10 sm:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-[20px] border border-[var(--accent-border,var(--border))] bg-[var(--accent-subtle)] text-[var(--accent)] shadow-[var(--shadow-sm)]">
                  <Bot className="h-7 w-7" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                  Nexus operations workspace
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-[-0.045em] sm:text-4xl">
                  Let’s build something{" "}
                  <span className="text-[var(--accent)]">better.</span>
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
                  Your internal partner for debugging, architecture decisions,
                  code reviews, security, and planning the next steps for Nexus.
                  What are we working on?
                </p>
                <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
                  <Suggestion
                    icon={<Code2 className="h-4 w-4" />}
                    title="Debug a problem"
                    text="Help me trace a bug from the logs and code."
                    onClick={() =>
                      setDraft(
                        "Help me debug an issue. I'll provide the relevant code and logs.",
                      )
                    }
                  />
                  <Suggestion
                    icon={<ShieldCheck className="h-4 w-4" />}
                    title="Review security"
                    text="Find risks in a route, component, or workflow."
                    onClick={() =>
                      setDraft(
                        "Help me review a Nexus feature for security issues. Tell me which files you need to inspect.",
                      )
                    }
                  />
                  <Suggestion
                    icon={<FileText className="h-4 w-4" />}
                    title="Plan a feature"
                    text="Break an idea into practical implementation steps."
                    onClick={() =>
                      setDraft(
                        "Help me plan a new Nexus feature. Start with architecture and implementation steps.",
                      )
                    }
                  />
                  <Suggestion
                    icon={<Sparkles className="h-4 w-4" />}
                    title="Improve Nexus"
                    text="Identify high-impact product and UX improvements."
                    onClick={() =>
                      setDraft(
                        "Help me identify high-impact improvements for Nexus. Separate known facts from assumptions.",
                      )
                    }
                  />
                </div>
                <div className="mt-6 flex items-start gap-2 text-[11px] leading-5 text-[var(--text-muted)]">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>
                    Internal guidance only. Verify important code and security
                    recommendations before deploying.
                  </span>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-4xl px-4 pb-8 pt-7 sm:px-8 lg:px-12">
              {loadingMessages && (
                <div className="mb-4 flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> Loading
                  conversation…
                </div>
              )}
              {visibleMessages.map((message, index) => {
                const isUser = normalizeMessageRole(message.role) === "USER";
                return (
                  <motion.article
                    key={message.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className={`mb-7 flex gap-3 sm:gap-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl border ${isUser ? "border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)]" : "border-[var(--accent-border,var(--border))] bg-[var(--accent-subtle)] text-[var(--accent)]"}`}
                    >
                      {isUser ? (
                        <span className="text-[10px] font-bold">
                          {initials(user)}
                        </span>
                      ) : (
                        <Sparkles className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={`min-w-0 max-w-[88%] sm:max-w-[82%] ${isUser ? "text-right" : "text-left"}`}
                    >
                      <div
                        className={`mb-2 flex items-center gap-2 text-[10px] font-semibold text-[var(--text-muted)] ${isUser ? "justify-end" : ""}`}
                      >
                        <span>{isUser ? "You" : "Nexus Admin AI"}</span>
                        <span>·</span>
                        <span>{formatTime(message.createdAt)}</span>
                        {index === visibleMessages.length - 1 && !isUser && (
                          <span className="inline-flex items-center gap-1 text-[var(--success)]">
                            <Check className="h-3 w-3" /> Response
                          </span>
                        )}
                      </div>
                      {isUser ? (
                        <div className="inline-block whitespace-pre-wrap rounded-2xl rounded-tr-md border border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-3 text-left text-sm leading-6">
                          {message.content}
                        </div>
                      ) : (
                        <MessageContent
                          content={visibleMessageContent(message.content)}
                        />
                      )}
                    </div>
                  </motion.article>
                );
              })}
              {sending && (
                <div className="mb-7 flex gap-3 sm:gap-4">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-[var(--accent-border,var(--border))] bg-[var(--accent-subtle)] text-[var(--accent)]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="pt-1">
                    <p className="mb-2 text-[10px] font-semibold text-[var(--text-muted)]">
                      Nexus Admin AI is thinking
                    </p>
                    <div className="flex items-center gap-1.5 rounded-full bg-[var(--surface-secondary)] px-3 py-2 max-w-[100px]">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)] [animation-delay:120ms]" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)] [animation-delay:240ms]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
          {scrollToBottomVisible && (
            <button
              type="button"
              onClick={() =>
                bottomRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                })
              }
              className="sticky bottom-4 left-1/2 z-10 mx-auto flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] shadow-[var(--shadow-md)]"
              aria-label="Scroll to latest message"
            >
              <ArrowDown className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="shrink-0 border-t border-[var(--border)] bg-[var(--background)] px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 sm:px-6 sm:pt-4 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {sendError && (
              <div className="mb-2 flex items-start justify-between gap-3 rounded-xl border border-[var(--danger-border,var(--border))] bg-[var(--danger-bg,var(--surface-secondary))] px-3 py-2 text-xs leading-5 text-[var(--danger,var(--text-primary))]">
                <span>{sendError}</span>
                <button
                  type="button"
                  onClick={() => setSendError("")}
                  aria-label="Dismiss message error"
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className="rounded-[22px] border border-[var(--border-strong,var(--border))] bg-[var(--surface)] p-2 shadow-[var(--shadow-sm)] transition focus-within:border-[var(--accent-border,var(--border-strong,var(--border)))] focus-within:shadow-[var(--shadow-md)]"
            >
              <textarea
                ref={textareaRef}
                value={draft}
                onChange={(event) => {
                  setDraft(event.target.value);
                  event.currentTarget.style.height = "auto";
                  event.currentTarget.style.height = `${Math.min(event.currentTarget.scrollHeight, 180)}px`;
                }}
                onKeyDown={handleComposerKeyDown}
                rows={1}
                maxLength={12000}
                placeholder="Ask about code, architecture, security, or the next Nexus task…"
                className="max-h-[180px] min-h-[48px] w-full resize-none border-0 bg-transparent px-3 py-3 text-sm leading-6 text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:ring-0"
                disabled={sending}
                aria-label="Message Nexus Admin AI"
              />
              <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-1">
                <div className="flex min-w-0 items-center gap-2 text-[10px] text-[var(--text-muted)]">
                  <span className="hidden sm:inline">Enter to send</span>
                  <span className="hidden sm:inline text-[var(--border-strong)]">
                    ·
                  </span>
                  <span>Shift + Enter for a new line</span>
                </div>
                <button
                  type="submit"
                  disabled={!draft.trim() || sending}
                  className="inline-flex h-9 shrink-0 items-center gap-2 rounded-xl bg-[var(--accent)] px-3.5 text-xs font-bold text-[var(--accent-contrast,var(--background))] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span className="hidden sm:inline">Send</span>
                  {sending ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </form>
            <p className="mt-2 text-center text-[9px] leading-4 text-[var(--text-muted)]">
              Nexus Admin AI can make mistakes. Review suggestions before
              applying changes or deploying.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Suggestion({
  icon,
  title,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-border,var(--border-strong,var(--border)))] hover:bg-[var(--surface-hover)]"
    >
      <div className="flex items-center gap-2 text-[var(--accent)]">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-[var(--accent-subtle)]">
          {icon}
        </span>
        <span className="text-xs font-bold text-[var(--text-primary)]">
          {title}
        </span>
      </div>
      <p className="mt-3 text-xs leading-5 text-[var(--text-secondary)]">
        {text}
      </p>
    </button>
  );
}

function HistoryPanel({
  user,
  conversations,
  groups,
  selectedId,
  search,
  loading,
  menuId,
  setSearch,
  setMenuId,
  onNew,
  onSelect,
  onDelete,
  onRefresh,
  onClose,
}: {
  user: User | null;
  conversations: AIConversation[];
  groups: [string, AIConversation[]][];
  selectedId: string | null;
  search: string;
  loading: boolean;
  menuId: string | null;
  setSearch: (value: string) => void;
  setMenuId: (value: string | null) => void;
  onNew: () => void;
  onSelect: (id: string) => void;
  onDelete: (conversation: AIConversation) => void;
  onRefresh: () => void;
  onClose?: () => void;
}) {
  return (
    <>
      <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-[var(--border)] px-4">
        <Link href="/admin" className="flex min-w-0 items-center gap-2.5">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[var(--accent-border,var(--border))] bg-[var(--accent-subtle)] text-[var(--accent)]">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-tight">
              NEXUS <span className="text-[var(--accent)]">AI</span>
            </p>
            <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)]">
              Admin workspace
            </p>
          </div>
        </Link>
        {onClose && (
          <button
            type="button"
            aria-label="Close history"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-[var(--text-secondary)]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="p-3">
        <button
          type="button"
          onClick={onNew}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-3 py-3 text-xs font-bold text-[var(--accent-contrast,var(--background))] shadow-[var(--shadow-sm)] transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> New conversation
        </button>
      </div>
      <div className="px-3 pb-3">
        <label className="flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-[var(--text-muted)] focus-within:border-[var(--accent-border,var(--border-strong,var(--border)))]">
          <Search className="h-3.5 w-3.5 shrink-0" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search history"
            className="min-w-0 flex-1 bg-transparent text-xs text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
          />
          <span className="text-[9px]">{conversations.length}</span>
        </label>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-2 pb-3">
        <div className="flex items-center justify-between px-2 pb-2 pt-1">
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Recent conversations
          </p>
          <button
            type="button"
            onClick={onRefresh}
            aria-label="Refresh conversations"
            className="grid h-6 w-6 place-items-center rounded-md text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
        {loading && conversations.length === 0 ? (
          <div className="flex items-center justify-center gap-2 py-10 text-xs text-[var(--text-muted)]">
            <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> Loading
            history
          </div>
        ) : groups.length === 0 ? (
          <div className="px-3 py-8 text-center">
            <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-[var(--surface-secondary)] text-[var(--text-muted)]">
              <MessageSquare className="h-4 w-4" />
            </div>
            <p className="mt-3 text-xs font-semibold text-[var(--text-secondary)]">
              No conversations yet
            </p>
            <p className="mt-1 text-[10px] leading-5 text-[var(--text-muted)]">
              Start a chat and it will appear here.
            </p>
          </div>
        ) : (
          groups.map(([label, items]) => (
            <div key={label} className="mb-4">
              <p className="px-2 pb-1.5 pt-2 text-[9px] font-semibold text-[var(--text-muted)]">
                {label}
              </p>
              <div className="space-y-1">
                {items.map((conversation) => (
                  <div key={conversation.id} className="group relative">
                    <button
                      type="button"
                      onClick={() => onSelect(conversation.id)}
                      className={`flex w-full items-start gap-2.5 rounded-xl px-2.5 py-2.5 pr-9 text-left transition ${selectedId === conversation.id ? "border border-[var(--accent-border,var(--border))] bg-[var(--accent-subtle)]" : "border border-transparent hover:bg-[var(--surface-hover)]"}`}
                    >
                      <MessageSquare
                        className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${selectedId === conversation.id ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}`}
                      />
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate text-[11px] font-semibold ${selectedId === conversation.id ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}
                        >
                          {conversation.title || "Untitled conversation"}
                        </span>
                        <span className="mt-1 flex items-center gap-1 text-[9px] text-[var(--text-muted)]">
                          <Clock3 className="h-2.5 w-2.5" />
                          {formatTime(
                            conversation.updatedAt || conversation.createdAt,
                          )}
                          {typeof conversation._count?.messages ===
                            "number" && (
                            <>
                              <span>·</span>
                              {conversation._count.messages} messages
                            </>
                          )}
                        </span>
                      </span>
                    </button>
                    <button
                      type="button"
                      aria-label={`Options for ${conversation.title || "conversation"}`}
                      onClick={() =>
                        setMenuId(
                          menuId === conversation.id ? null : conversation.id,
                        )
                      }
                      className={`absolute right-1.5 top-2 grid h-7 w-7 place-items-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)] ${menuId === conversation.id ? "opacity-100" : "opacity-0 group-hover:opacity-100 focus:opacity-100"}`}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    <AnimatePresence>
                      {menuId === conversation.id && (
                        <>
                          <button
                            aria-label="Close conversation menu"
                            className="fixed inset-0 z-20 cursor-default"
                            onClick={() => setMenuId(null)}
                          />
                          <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: -3 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            className="absolute right-1 top-9 z-30 w-40 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1 shadow-[var(--shadow-md)]"
                          >
                            <button
                              type="button"
                              onClick={() => onDelete(conversation)}
                              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[11px] font-semibold text-[var(--danger,var(--text-secondary))] transition hover:bg-[var(--danger-bg,var(--surface-secondary))]"
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                              conversation
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="shrink-0 border-t border-[var(--border)] p-3">
        <div className="flex items-center gap-2.5 rounded-xl bg-[var(--surface-secondary)] p-2.5">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[10px] font-bold text-[var(--text-secondary)]">
            {initials(user)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-bold text-[var(--text-primary)]">
              {displayName(user)}
            </p>
            <p className="mt-0.5 truncate text-[9px] text-[var(--text-muted)]">
              Administrator
            </p>
          </div>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--success)]" />
        </div>
      </div>
    </>
  );
}
