"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  Check,
  CheckCheck,
  ChevronDown,
  CircleAlert,
  Hash,
  LoaderCircle,
  Menu,
  MessageCircle,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  Users,
  X,
} from "lucide-react";
import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

const MAX_MESSAGE_LENGTH = 5000;

const TEAM = [
  { name: "Hadi Taha", email: "hadi@nexusmade.com", initials: "HT" },
  {
    name: "Mohammad Izhaan",
    email: "izhaan@nexusmade.com",
    initials: "MI",
  },
  {
    name: "Ahmad Abeen",
    email: "ahmad@nexusmade.com",
    initials: "AA",
  },
  {
    name: "Mohammad Suwaid",
    email: "suwaid@nexusmade.com",
    initials: "MS",
  },
];

type ChatUser = {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
};

type ChatMessage = {
  id: string;
  roomId?: string;
  content: string;
  senderId?: string;
  sender?: ChatUser;
  createdAt: string;
  updatedAt?: string;
};

type ChatRoom = {
  id: string;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: ChatUser;
  messages?: ChatMessage[];
  _count?: { messages?: number };
  latestMessage?: ChatMessage | null;
  lastMessage?: ChatMessage | null;
  messageCount?: number;
};

type ApiUser = {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  role?: string;
};

function getToken() {
  if (typeof window === "undefined") return null;

  return (
    window.localStorage.getItem("nexus_token") ??
    window.sessionStorage.getItem("nexus_token")
  );
}

function getCurrentUser(): ApiUser | null {
  if (typeof window === "undefined") return null;

  try {
    const raw =
      window.localStorage.getItem("nexus_user") ??
      window.sessionStorage.getItem("nexus_user");

    if (!raw) return null;

    return JSON.parse(raw) as ApiUser;
  } catch {
    return null;
  }
}

async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();

  if (!token) {
    throw new Error("Your session has expired. Please sign in again.");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ??
        data?.error ??
        `Request failed with status ${response.status}.`,
    );
  }

  return data as T;
}

function unwrapArray<T>(data: unknown, keys: string[]): T[] {
  if (Array.isArray(data)) return data as T[];

  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;

    for (const key of keys) {
      if (Array.isArray(record[key])) return record[key] as T[];
    }
  }

  return [];
}

function displayName(user?: ChatUser | null) {
  if (!user) return "Team member";

  return (
    user.name?.trim() ||
    user.username?.trim() ||
    user.email?.split("@")[0] ||
    "Team member"
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "N";

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatTime(value?: string) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatDate(value?: string) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (date.toDateString() === now.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: date.getFullYear() === now.getFullYear() ? undefined : "numeric",
  }).format(date);
}

function getRoomPreview(room: ChatRoom) {
  const message = room.latestMessage ?? room.lastMessage;

  return message?.content ?? room.description ?? "Start the conversation";
}

function getRoomTime(room: ChatRoom) {
  const message = room.latestMessage ?? room.lastMessage;

  return message?.createdAt ?? room.updatedAt ?? room.createdAt;
}

function ErrorBanner({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="flex items-start gap-3 rounded-xl border border-[var(--danger)]/25 bg-[var(--danger-soft)] p-3 text-sm text-[var(--text-primary)]"
      role="alert"
    >
      <CircleAlert className="mt-0.5 size-4 shrink-0 text-[var(--danger)]" />
      <p className="min-w-0 flex-1 break-words">{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss error"
        className="rounded-lg p-1 text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)]"
      >
        <X className="size-4" />
      </button>
    </motion.div>
  );
}

function Avatar({
  name,
  size = "md",
  current = false,
}: {
  name: string;
  size?: "sm" | "md" | "lg";
  current?: boolean;
}) {
  const dimensions = {
    sm: "size-8 text-[10px]",
    md: "size-10 text-xs",
    lg: "size-12 text-sm",
  };

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--accent-soft)] font-semibold tracking-tight text-[var(--accent)] ${dimensions[size]}`}
      aria-label={name}
      title={name}
    >
      {initials(name)}
      {current && (
        <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-[var(--surface)] bg-[var(--success)]" />
      )}
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="space-y-3 p-3" aria-label="Loading rooms">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse items-center gap-3 rounded-2xl p-3"
        >
          <div className="size-10 rounded-2xl bg-[var(--surface-tertiary)]" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-2/5 rounded-full bg-[var(--surface-tertiary)]" />
            <div className="h-3 w-4/5 rounded-full bg-[var(--surface-tertiary)]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminChatPage() {
  const reduceMotion = useReducedMotion();

  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentUser, setCurrentUser] = useState<ApiUser | null>(null);

  const [roomSearch, setRoomSearch] = useState("");
  const [messageSearch, setMessageSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");

  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [creatingRoom, setCreatingRoom] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomDescription, setNewRoomDescription] = useState("");
  const [mobileRoomsOpen, setMobileRoomsOpen] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [authError, setAuthError] = useState(false);

  const messageEndRef = useRef<HTMLDivElement>(null);
  const messageScrollRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const roomNameRef = useRef<HTMLInputElement>(null);
  const previousMessageCount = useRef(0);
  const isInitialMessageLoad = useRef(true);

  const selectedRoom = useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) ?? null,
    [rooms, selectedRoomId],
  );

  const filteredRooms = useMemo(() => {
    const query = roomSearch.trim().toLowerCase();

    const result = !query
      ? rooms
      : rooms.filter((room) => {
          return (
            room.name.toLowerCase().includes(query) ||
            room.description?.toLowerCase().includes(query) ||
            getRoomPreview(room).toLowerCase().includes(query)
          );
        });

    return [...result].sort((a, b) => {
      const aTime = new Date(getRoomTime(a) ?? 0).getTime();
      const bTime = new Date(getRoomTime(b) ?? 0).getTime();

      return bTime - aTime;
    });
  }, [rooms, roomSearch]);

  const filteredMessages = useMemo(() => {
    const query = messageSearch.trim().toLowerCase();

    if (!query) return messages;

    return messages.filter((message) => {
      return (
        message.content.toLowerCase().includes(query) ||
        displayName(message.sender).toLowerCase().includes(query)
      );
    });
  }, [messages, messageSearch]);

  const ownMessage = useCallback(
    (message: ChatMessage) => {
      return Boolean(
        (currentUser?.id && message.senderId === currentUser.id) ||
        (currentUser?.id && message.sender?.id === currentUser.id) ||
        (currentUser?.email &&
          message.sender?.email?.toLowerCase() ===
            currentUser.email.toLowerCase()),
      );
    },
    [currentUser],
  );

  const loadRooms = useCallback(
    async (showSpinner = true) => {
      if (showSpinner) setLoadingRooms(true);

      try {
        const data = await apiRequest<unknown>("/adminchat/rooms");
        const nextRooms = unwrapArray<ChatRoom>(data, ["rooms", "data"]);

        setRooms((previous) => {
          if (!selectedRoomId && nextRooms.length > 0) {
            setSelectedRoomId(nextRooms[0].id);
          } else if (
            selectedRoomId &&
            !nextRooms.some((room) => room.id === selectedRoomId)
          ) {
            setSelectedRoomId(nextRooms[0]?.id ?? "");
          }

          return nextRooms;
        });

        setAuthError(false);
      } catch (caught) {
        const message =
          caught instanceof Error
            ? caught.message
            : "Unable to load chat rooms.";

        setError(message);

        if (
          message.toLowerCase().includes("session") ||
          message.toLowerCase().includes("authentication") ||
          message.toLowerCase().includes("unauthorized") ||
          message.toLowerCase().includes("forbidden")
        ) {
          setAuthError(true);
        }
      } finally {
        if (showSpinner) setLoadingRooms(false);
      }
    },
    [selectedRoomId],
  );

  const loadMessages = useCallback(
    async (roomId: string, showSpinner = true) => {
      if (!roomId) {
        setMessages([]);
        return;
      }

      if (showSpinner) setLoadingMessages(true);

      try {
        const data = await apiRequest<unknown>(
          `/adminchat/rooms/${encodeURIComponent(roomId)}/messages`,
        );

        const nextMessages = unwrapArray<ChatMessage>(data, [
          "messages",
          "data",
        ]).sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );

        setMessages(nextMessages);
        setRooms((previous) =>
          previous.map((room) =>
            room.id === roomId
              ? {
                  ...room,
                  messages: nextMessages,
                  latestMessage: nextMessages.at(-1) ?? null,
                  messageCount: nextMessages.length,
                  _count: { messages: nextMessages.length },
                }
              : room,
          ),
        );

        setError("");
      } catch (caught) {
        setError(
          caught instanceof Error ? caught.message : "Unable to load messages.",
        );
      } finally {
        if (showSpinner) setLoadingMessages(false);
      }
    },
    [],
  );

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    void loadRooms(true);
  }, [loadRooms]);

  useEffect(() => {
    if (!selectedRoomId) {
      setMessages([]);
      return;
    }

    isInitialMessageLoad.current = true;
    previousMessageCount.current = 0;
    setMessages([]);
    setDraft("");
    setEditingId(null);

    void loadMessages(selectedRoomId, true);
    setMobileRoomsOpen(false);
  }, [selectedRoomId, loadMessages]);

  useEffect(() => {
    if (!selectedRoomId || loadingMessages) return;

    const interval = window.setInterval(() => {
      void loadMessages(selectedRoomId, false);
      void loadRooms(false);
    }, 8000);

    return () => window.clearInterval(interval);
  }, [selectedRoomId, loadingMessages, loadMessages, loadRooms]);

  useEffect(() => {
    const count = messages.length;

    const shouldScroll =
      isInitialMessageLoad.current || count > previousMessageCount.current;

    if (shouldScroll) {
      messageEndRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "end",
      });
    }

    previousMessageCount.current = count;
    isInitialMessageLoad.current = false;
  }, [messages, reduceMotion]);

  useEffect(() => {
    if (showCreateRoom) {
      const timeout = window.setTimeout(() => roomNameRef.current?.focus(), 80);
      return () => window.clearTimeout(timeout);
    }
  }, [showCreateRoom]);

  useEffect(() => {
    if (!notice) return;

    const timeout = window.setTimeout(() => setNotice(""), 2800);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  async function createRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = newRoomName.trim();
    const description = newRoomDescription.trim();

    if (!name) {
      setError("Give your room a name first.");
      return;
    }

    setCreatingRoom(true);
    setError("");

    try {
      const data = await apiRequest<unknown>("/adminchat/rooms", {
        method: "POST",
        body: JSON.stringify({
          name,
          ...(description ? { description } : {}),
        }),
      });

      const record =
        data && typeof data === "object" && "room" in data
          ? (data as { room: ChatRoom }).room
          : (data as ChatRoom);

      await loadRooms(false);

      if (record?.id) {
        setSelectedRoomId(record.id);
      }

      setNewRoomName("");
      setNewRoomDescription("");
      setShowCreateRoom(false);
      setNotice("Room created successfully.");
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Could not create room.",
      );
    } finally {
      setCreatingRoom(false);
    }
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const content = draft.trim();

    if (!content || !selectedRoomId || sending) return;

    if (content.length > MAX_MESSAGE_LENGTH) {
      setError(`Messages can contain up to ${MAX_MESSAGE_LENGTH} characters.`);
      return;
    }

    setSending(true);
    setError("");

    try {
      const data = await apiRequest<unknown>(
        `/adminchat/rooms/${encodeURIComponent(selectedRoomId)}/messages`,
        {
          method: "POST",
          body: JSON.stringify({ content }),
        },
      );

      const record =
        data && typeof data === "object" && "message" in data
          ? (data as { message: ChatMessage }).message
          : (data as ChatMessage);

      if (record?.id) {
        setMessages((previous) =>
          previous.some((message) => message.id === record.id)
            ? previous
            : [...previous, record].sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime(),
              ),
        );
      }

      setDraft("");
      composerRef.current?.focus();
      await loadMessages(selectedRoomId, false);
      void loadRooms(false);
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Could not send message.",
      );
    } finally {
      setSending(false);
    }
  }

  async function saveEdit(messageId: string) {
    const content = editDraft.trim();

    if (!content || savingEdit) return;

    if (content.length > MAX_MESSAGE_LENGTH) {
      setError(`Messages can contain up to ${MAX_MESSAGE_LENGTH} characters.`);
      return;
    }

    setSavingEdit(true);
    setError("");

    try {
      const data = await apiRequest<unknown>(
        `/adminchat/messages/${encodeURIComponent(messageId)}`,
        {
          method: "PATCH",
          body: JSON.stringify({ content }),
        },
      );

      const record =
        data && typeof data === "object" && "message" in data
          ? (data as { message: ChatMessage }).message
          : (data as ChatMessage);

      setMessages((previous) =>
        previous.map((message) =>
          message.id === messageId
            ? {
                ...message,
                ...(record?.content ? record : {}),
                content: record?.content ?? content,
                updatedAt: record?.updatedAt ?? new Date().toISOString(),
              }
            : message,
        ),
      );

      setEditingId(null);
      setEditDraft("");
      setNotice("Message updated.");
      void loadRooms(false);
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Could not edit message.",
      );
    } finally {
      setSavingEdit(false);
    }
  }

  async function deleteMessage(messageId: string) {
    const confirmed = window.confirm(
      "Delete this message? This action cannot be undone.",
    );

    if (!confirmed) return;

    setDeletingId(messageId);
    setError("");

    try {
      await apiRequest(`/adminchat/messages/${encodeURIComponent(messageId)}`, {
        method: "DELETE",
      });

      setMessages((previous) =>
        previous.filter((message) => message.id !== messageId),
      );

      setEditingId(null);
      setNotice("Message deleted.");
      void loadRooms(false);
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Could not delete message.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  function handleComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  function groupDateChanged(current: ChatMessage, previous?: ChatMessage) {
    if (!previous) return true;

    return formatDate(current.createdAt) !== formatDate(previous.createdAt);
  }

  const pageVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.35 },
    },
  };

  return (
    <motion.main
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="flex h-[calc(100dvh-2rem)] min-h-[560px] flex-col gap-5 overflow-hidden bg-[var(--background)] p-3 text-[var(--text-primary)] sm:p-5 lg:p-6"
    >
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
            <MessageSquare className="size-5 text-[var(--accent)]" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Team chat
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-secondary)]">
                <ShieldCheck className="size-3.5 text-[var(--accent)]" />
                Admin workspace
              </span>
            </div>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              One space for the people building Nexus.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void loadRooms(true)}
            disabled={loadingRooms}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] disabled:opacity-50"
          >
            <RefreshCw
              className={`size-4 ${loadingRooms ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCreateRoom(true)}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--accent)] px-3.5 text-sm font-semibold text-[var(--accent-contrast)] shadow-[var(--shadow-sm)] transition hover:opacity-90 active:scale-[0.98]"
          >
            <Plus className="size-4" />
            <span>New room</span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {error && (
          <ErrorBanner message={error} onDismiss={() => setError("")} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notice && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed right-5 top-5 z-50 flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-sm shadow-[var(--shadow-lg)]"
            role="status"
          >
            <Check className="size-4 text-[var(--success)]" />
            {notice}
          </motion.div>
        )}
      </AnimatePresence>

      {authError && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-secondary)]">
          Check that you are signed in with an admin account and that your API
          server is running.
        </div>
      )}

      <section className="relative flex min-h-0 flex-1 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-md)]">
        <AnimatePresence>
          {mobileRoomsOpen && (
            <motion.button
              type="button"
              aria-label="Close room list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileRoomsOpen(false)}
              className="absolute inset-0 z-20 bg-[var(--overlay)] backdrop-blur-sm md:hidden"
            />
          )}
        </AnimatePresence>

        <aside
          className={`absolute inset-y-0 left-0 z-30 flex w-[min(86%,340px)] flex-col border-r border-[var(--border)] bg-[var(--surface)] transition-transform duration-300 md:relative md:z-0 md:w-[290px] md:translate-x-0 lg:w-[320px] ${
            mobileRoomsOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="border-b border-[var(--border-subtle)] p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">Your rooms</h2>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  {rooms.length}{" "}
                  {rooms.length === 1 ? "conversation" : "conversations"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateRoom(true)}
                aria-label="Create a room"
                className="flex size-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <Plus className="size-4" />
              </button>
            </div>

            <label className="flex h-10 items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--input)] px-3 transition focus-within:border-[var(--border-focus)] focus-within:ring-2 focus-within:ring-[var(--focus-ring)]">
              <Search className="size-4 shrink-0 text-[var(--text-muted)]" />
              <input
                value={roomSearch}
                onChange={(event) => setRoomSearch(event.target.value)}
                placeholder="Find a room..."
                aria-label="Search rooms"
                className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--input-placeholder)]"
              />
              {roomSearch && (
                <button
                  type="button"
                  onClick={() => setRoomSearch("")}
                  aria-label="Clear room search"
                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </label>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-2.5">
            {loadingRooms ? (
              <LoadingRows />
            ) : filteredRooms.length === 0 ? (
              <div className="flex h-full min-h-56 flex-col items-center justify-center px-5 text-center">
                <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-[var(--surface-secondary)]">
                  <MessageCircle className="size-5 text-[var(--text-muted)]" />
                </div>
                <p className="text-sm font-medium">
                  {roomSearch ? "No matching rooms" : "A quiet start"}
                </p>
                <p className="mt-1.5 max-w-[210px] text-xs leading-5 text-[var(--text-secondary)]">
                  {roomSearch
                    ? "Try another search term."
                    : "Create a room and bring the team into the conversation."}
                </p>
                {!roomSearch && (
                  <button
                    type="button"
                    onClick={() => setShowCreateRoom(true)}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:opacity-80"
                  >
                    <Plus className="size-3.5" />
                    Create your first room
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-1">
                {filteredRooms.map((room, index) => {
                  const active = room.id === selectedRoomId;
                  const messageCount =
                    room.messageCount ?? room._count?.messages ?? 0;

                  return (
                    <motion.button
                      key={room.id}
                      type="button"
                      initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.2,
                        delay: reduceMotion ? 0 : Math.min(index * 0.025, 0.15),
                      }}
                      onClick={() => {
                        setSelectedRoomId(room.id);
                        setMobileRoomsOpen(false);
                      }}
                      className={`group flex w-full items-start gap-3 rounded-2xl p-3 text-left transition ${
                        active
                          ? "bg-[var(--accent-soft)] ring-1 ring-inset ring-[var(--accent)]/20"
                          : "hover:bg-[var(--surface-hover)]"
                      }`}
                    >
                      <div
                        className={`flex size-10 shrink-0 items-center justify-center rounded-xl border transition ${
                          active
                            ? "border-[var(--accent)]/20 bg-[var(--surface)] text-[var(--accent)]"
                            : "border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] group-hover:text-[var(--accent)]"
                        }`}
                      >
                        <Hash className="size-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={`truncate text-sm font-semibold ${
                              active
                                ? "text-[var(--text-primary)]"
                                : "text-[var(--text-primary)]"
                            }`}
                          >
                            {room.name}
                          </p>
                          <span className="shrink-0 text-[10px] text-[var(--text-muted)]">
                            {formatTime(getRoomTime(room))}
                          </span>
                        </div>

                        <p className="mt-1 line-clamp-2 break-words text-xs leading-5 text-[var(--text-secondary)]">
                          {getRoomPreview(room)}
                        </p>

                        <div className="mt-2 flex items-center justify-between gap-2">
                          <span className="truncate text-[10px] text-[var(--text-muted)]">
                            {room.description
                              ? "Team room"
                              : "Shared workspace"}
                          </span>

                          {messageCount > 0 && (
                            <span className="shrink-0 rounded-md bg-[var(--surface-secondary)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">
                              {messageCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="border-t border-[var(--border-subtle)] p-3">
            <div className="flex items-center gap-3 rounded-2xl bg-[var(--surface-secondary)] p-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <ShieldCheck className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold">Private team space</p>
                <p className="mt-0.5 text-[10px] leading-4 text-[var(--text-secondary)]">
                  Intended for Nexus administrators
                </p>
              </div>
              <span
                className="size-2 rounded-full bg-[var(--success)]"
                title="Workspace"
              />
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {selectedRoom ? (
            <>
              <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--border)] px-3 py-3.5 sm:px-5 sm:py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setMobileRoomsOpen(true)}
                    aria-label="Open room list"
                    className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] md:hidden"
                  >
                    <Menu className="size-4" />
                  </button>

                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Hash className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold sm:text-base">
                      {selectedRoom.name}
                    </h2>
                    <p className="mt-0.5 truncate text-xs text-[var(--text-secondary)]">
                      {selectedRoom.description ||
                        "A shared room for the Nexus team"}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setShowTeam((value) => !value)}
                    className={`flex h-9 items-center gap-2 rounded-xl border px-2.5 text-xs font-medium transition sm:px-3 ${
                      showTeam
                        ? "border-[var(--accent)]/30 bg-[var(--accent-soft)] text-[var(--accent)]"
                        : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
                    }`}
                  >
                    <Users className="size-4" />
                    <span className="hidden sm:inline">Team</span>
                    <ChevronDown className="hidden size-3.5 sm:block" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMessageSearch((value) => (value ? "" : " "));
                      window.setTimeout(() => {
                        const input = document.getElementById(
                          "admin-chat-message-search",
                        ) as HTMLInputElement | null;
                        input?.focus();
                      }, 40);
                    }}
                    aria-label="Search messages"
                    className="flex size-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                  >
                    <Search className="size-4" />
                  </button>
                </div>
              </header>

              <AnimatePresence>
                {showTeam && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="shrink-0 overflow-hidden border-b border-[var(--border)] bg-[var(--surface-secondary)]"
                  >
                    <div className="flex flex-wrap gap-2 p-3 sm:p-4">
                      {TEAM.map((member) => (
                        <div
                          key={member.email}
                          className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2"
                        >
                          <Avatar name={member.name} size="sm" />
                          <div>
                            <p className="text-xs font-medium">{member.name}</p>
                            <p className="mt-0.5 text-[10px] text-[var(--text-secondary)]">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {messageSearch !== "" && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="shrink-0 border-b border-[var(--border)] px-4 py-3"
                  >
                    <label className="flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--input)] px-3 focus-within:border-[var(--border-focus)] focus-within:ring-2 focus-within:ring-[var(--focus-ring)]">
                      <Search className="size-4 text-[var(--text-muted)]" />
                      <input
                        id="admin-chat-message-search"
                        autoFocus
                        value={messageSearch.trimStart()}
                        onChange={(event) =>
                          setMessageSearch(event.target.value)
                        }
                        placeholder="Search messages and senders..."
                        aria-label="Search messages and senders"
                        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--input-placeholder)]"
                      />
                      <button
                        type="button"
                        onClick={() => setMessageSearch("")}
                        aria-label="Close message search"
                        className="rounded-lg p-1 text-[var(--text-muted)] hover:bg-[var(--surface-hover)]"
                      >
                        <X className="size-4" />
                      </button>
                    </label>
                    {messageSearch.trim() && (
                      <p className="mt-2 text-xs text-[var(--text-secondary)]">
                        {filteredMessages.length} matching{" "}
                        {filteredMessages.length === 1 ? "message" : "messages"}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                ref={messageScrollRef}
                className="min-h-0 flex-1 overflow-y-auto scroll-smooth"
              >
                {loadingMessages ? (
                  <div className="flex h-full min-h-64 flex-col items-center justify-center gap-3 p-6">
                    <div className="flex size-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)]">
                      <LoaderCircle className="size-5 animate-spin text-[var(--accent)]" />
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Loading conversation...
                    </p>
                  </div>
                ) : filteredMessages.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex h-full min-h-72 flex-col items-center justify-center px-6 py-10 text-center"
                  >
                    <div className="relative mb-5 flex size-16 items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--surface-secondary)]">
                      <MessageCircle className="size-7 text-[var(--accent)]" />
                      <motion.span
                        animate={
                          reduceMotion
                            ? {}
                            : {
                                scale: [1, 1.16, 1],
                                opacity: [0.45, 0.1, 0.45],
                              }
                        }
                        transition={{ duration: 2.8, repeat: Infinity }}
                        className="absolute -right-1 -top-1 size-4 rounded-full bg-[var(--accent-soft-strong)]"
                      />
                    </div>

                    <h3 className="text-base font-semibold">
                      {messageSearch.trim()
                        ? "No messages found"
                        : "Start something good"}
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-[var(--text-secondary)]">
                      {messageSearch.trim()
                        ? "Try a different word or search for another teammate."
                        : "This room is ready. Share an update, ask a question, or get the team moving."}
                    </p>

                    {!messageSearch.trim() && (
                      <button
                        type="button"
                        onClick={() => composerRef.current?.focus()}
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-contrast)] transition hover:opacity-90"
                      >
                        <Send className="size-4" />
                        Write the first message
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <div className="mx-auto w-full max-w-4xl px-3 py-5 sm:px-6 sm:py-7">
                    {!messageSearch.trim() && (
                      <div className="mb-7 flex flex-col items-center text-center">
                        <div className="mb-3 flex size-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)]">
                          <Hash className="size-5 text-[var(--accent)]" />
                        </div>
                        <p className="text-sm font-semibold">
                          Welcome to #{selectedRoom.name}
                        </p>
                        <p className="mt-1 max-w-sm text-xs leading-5 text-[var(--text-secondary)]">
                          {selectedRoom.description ||
                            "A shared space for ideas, updates, and building Nexus together."}
                        </p>
                      </div>
                    )}

                    <div className="space-y-5">
                      {filteredMessages.map((message, index) => {
                        const mine = ownMessage(message);
                        const senderName = displayName(message.sender);
                        const previous = filteredMessages[index - 1];
                        const showDate = groupDateChanged(message, previous);
                        const isEditing = editingId === message.id;

                        return (
                          <div key={message.id}>
                            {showDate && (
                              <div className="my-6 flex items-center gap-3">
                                <div className="h-px flex-1 bg-[var(--border-subtle)]" />
                                <span className="rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] px-3 py-1 text-[10px] font-medium text-[var(--text-secondary)]">
                                  {formatDate(message.createdAt)}
                                </span>
                                <div className="h-px flex-1 bg-[var(--border-subtle)]" />
                              </div>
                            )}

                            <motion.article
                              initial={
                                reduceMotion ? false : { opacity: 0, y: 8 }
                              }
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: reduceMotion ? 0 : 0.22,
                              }}
                              className={`group flex items-start gap-2.5 sm:gap-3 ${
                                mine ? "flex-row-reverse" : ""
                              }`}
                            >
                              <Avatar name={senderName} size="md" />

                              <div
                                className={`flex min-w-0 max-w-[88%] flex-col sm:max-w-[78%] ${
                                  mine ? "items-end" : "items-start"
                                }`}
                              >
                                <div
                                  className={`mb-1.5 flex flex-wrap items-center gap-2 ${
                                    mine ? "flex-row-reverse" : ""
                                  }`}
                                >
                                  <span className="text-xs font-semibold text-[var(--text-primary)]">
                                    {mine ? "You" : senderName}
                                  </span>
                                  <span className="text-[10px] text-[var(--text-muted)]">
                                    {formatTime(message.createdAt)}
                                  </span>
                                  {message.updatedAt &&
                                    message.updatedAt !== message.createdAt && (
                                      <span className="text-[10px] italic text-[var(--text-muted)]">
                                        edited
                                      </span>
                                    )}
                                </div>

                                {isEditing ? (
                                  <div className="w-full min-w-[220px] rounded-2xl border border-[var(--border-focus)] bg-[var(--surface)] p-3 shadow-[var(--shadow-sm)]">
                                    <textarea
                                      value={editDraft}
                                      onChange={(event) =>
                                        setEditDraft(event.target.value)
                                      }
                                      maxLength={MAX_MESSAGE_LENGTH}
                                      rows={3}
                                      aria-label="Edit message"
                                      className="w-full resize-y bg-transparent text-sm leading-6 outline-none"
                                      autoFocus
                                    />
                                    <div className="mt-2 flex items-center justify-between gap-2">
                                      <span className="text-[10px] text-[var(--text-muted)]">
                                        {editDraft.length}/{MAX_MESSAGE_LENGTH}
                                      </span>
                                      <div className="flex gap-2">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setEditingId(null);
                                            setEditDraft("");
                                          }}
                                          className="rounded-lg px-2.5 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          type="button"
                                          disabled={
                                            savingEdit || !editDraft.trim()
                                          }
                                          onClick={() =>
                                            void saveEdit(message.id)
                                          }
                                          className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-2.5 py-1.5 text-xs font-semibold text-[var(--accent-contrast)] disabled:opacity-50"
                                        >
                                          {savingEdit && (
                                            <LoaderCircle className="size-3 animate-spin" />
                                          )}
                                          Save
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    className={`relative rounded-2xl border px-3.5 py-2.5 sm:px-4 ${
                                      mine
                                        ? "rounded-tr-md border-[var(--accent)]/15 bg-[var(--accent-soft)]"
                                        : "rounded-tl-md border-[var(--border)] bg-[var(--surface-secondary)]"
                                    }`}
                                  >
                                    <p className="whitespace-pre-wrap break-words text-sm leading-6 text-[var(--text-primary)]">
                                      {message.content}
                                    </p>
                                  </div>
                                )}

                                {!isEditing && (
                                  <div
                                    className={`mt-1 flex items-center gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 ${
                                      mine ? "flex-row-reverse" : ""
                                    }`}
                                  >
                                    {mine && (
                                      <>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setEditingId(message.id);
                                            setEditDraft(message.content);
                                          }}
                                          aria-label="Edit message"
                                          className="flex size-7 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                                        >
                                          <Pencil className="size-3.5" />
                                        </button>
                                        <button
                                          type="button"
                                          disabled={deletingId === message.id}
                                          onClick={() =>
                                            void deleteMessage(message.id)
                                          }
                                          aria-label="Delete message"
                                          className="flex size-7 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--danger-soft)] hover:text-[var(--danger)] disabled:opacity-50"
                                        >
                                          {deletingId === message.id ? (
                                            <LoaderCircle className="size-3.5 animate-spin" />
                                          ) : (
                                            <Trash2 className="size-3.5" />
                                          )}
                                        </button>
                                      </>
                                    )}

                                    {mine && (
                                      <span
                                        title="Message sent"
                                        className="ml-1 text-[var(--accent)]"
                                      >
                                        <CheckCheck className="size-3.5" />
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </motion.article>
                          </div>
                        );
                      })}
                    </div>

                    <div ref={messageEndRef} className="h-2" />
                  </div>
                )}
              </div>

              <footer className="shrink-0 border-t border-[var(--border)] bg-[var(--surface)] p-3 sm:px-5 sm:py-4">
                <form onSubmit={sendMessage} className="mx-auto max-w-4xl">
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--input)] transition focus-within:border-[var(--border-focus)] focus-within:ring-2 focus-within:ring-[var(--focus-ring)]">
                    <textarea
                      ref={composerRef}
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      onKeyDown={handleComposerKeyDown}
                      placeholder={`Message #${selectedRoom.name}...`}
                      aria-label="Write a message"
                      maxLength={MAX_MESSAGE_LENGTH}
                      rows={2}
                      className="max-h-36 min-h-[62px] w-full resize-y bg-transparent px-4 pt-3.5 text-sm leading-6 text-[var(--text-primary)] outline-none placeholder:text-[var(--input-placeholder)]"
                    />

                    <div className="flex items-center justify-between gap-3 px-3 pb-3">
                      <div className="flex min-w-0 items-center gap-2 text-[10px] text-[var(--text-muted)]">
                        <span className="hidden sm:inline">
                          <kbd className="rounded border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5 font-sans">
                            Enter
                          </kbd>{" "}
                          to send ·{" "}
                          <kbd className="rounded border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5 font-sans">
                            Shift + Enter
                          </kbd>{" "}
                          for a new line
                        </span>
                        <span className="sm:hidden">Enter to send</span>
                        {draft.length > MAX_MESSAGE_LENGTH - 300 && (
                          <span
                            className={
                              draft.length >= MAX_MESSAGE_LENGTH
                                ? "text-[var(--danger)]"
                                : ""
                            }
                          >
                            {draft.length}/{MAX_MESSAGE_LENGTH}
                          </span>
                        )}
                      </div>

                      <motion.button
                        whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                        type="submit"
                        disabled={!draft.trim() || sending}
                        className="inline-flex h-9 shrink-0 items-center gap-2 rounded-xl bg-[var(--accent)] px-3.5 text-xs font-semibold text-[var(--accent-contrast)] shadow-[var(--shadow-sm)] transition disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        {sending ? (
                          <LoaderCircle className="size-4 animate-spin" />
                        ) : (
                          <Send className="size-4" />
                        )}
                        <span>{sending ? "Sending" : "Send"}</span>
                      </motion.button>
                    </div>
                  </div>
                </form>
              </footer>
            </>
          ) : (
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-12 text-center">
              <button
                type="button"
                onClick={() => setMobileRoomsOpen(true)}
                className="mb-6 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] md:hidden"
              >
                <ArrowLeft className="size-3.5" />
                Browse rooms
              </button>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative mb-6 flex size-20 items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--surface-secondary)]"
              >
                <MessageSquare className="size-8 text-[var(--accent)]" />
                <motion.div
                  animate={
                    reduceMotion ? {} : { y: [0, -5, 0], rotate: [0, 4, 0] }
                  }
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="absolute -right-3 -top-3 flex size-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]"
                >
                  <Sparkles className="size-4 text-[var(--accent)]" />
                </motion.div>
              </motion.div>

              <h2 className="text-xl font-semibold tracking-tight">
                Your team, in sync.
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
                Select a room to jump into the conversation, or create a new
                space for your next idea.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setMobileRoomsOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium transition hover:bg-[var(--surface-hover)] md:hidden"
                >
                  <Hash className="size-4" />
                  Browse rooms
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateRoom(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-contrast)] transition hover:opacity-90"
                >
                  <Plus className="size-4" />
                  Create a room
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {showCreateRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[var(--overlay)] p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setShowCreateRoom(false);
              }
            }}
          >
            <motion.div
              initial={
                reduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: reduceMotion ? 0 : 0.22 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="create-room-title"
              className="w-full max-w-md overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-xl)]"
            >
              <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Hash className="size-5" />
                  </div>
                  <div>
                    <h2
                      id="create-room-title"
                      className="text-lg font-semibold tracking-tight"
                    >
                      Create a room
                    </h2>
                    <p className="mt-1 text-sm leading-5 text-[var(--text-secondary)]">
                      Give your team a dedicated place to collaborate.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCreateRoom(false)}
                  aria-label="Close create room dialog"
                  className="flex size-9 shrink-0 items-center justify-center rounded-xl text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                >
                  <X className="size-4" />
                </button>
              </div>

              <form onSubmit={createRoom} className="space-y-5 p-5 sm:p-6">
                <div>
                  <label
                    htmlFor="new-room-name"
                    className="mb-2 block text-xs font-semibold"
                  >
                    Room name <span className="text-[var(--danger)]">*</span>
                  </label>
                  <div className="flex h-11 items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--input)] px-3.5 transition focus-within:border-[var(--border-focus)] focus-within:ring-2 focus-within:ring-[var(--focus-ring)]">
                    <Hash className="size-4 text-[var(--text-muted)]" />
                    <input
                      ref={roomNameRef}
                      id="new-room-name"
                      value={newRoomName}
                      onChange={(event) => setNewRoomName(event.target.value)}
                      maxLength={80}
                      required
                      placeholder="e.g. product-planning"
                      className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--input-placeholder)]"
                    />
                  </div>
                  <p className="mt-1.5 text-[10px] text-[var(--text-muted)]">
                    {newRoomName.length}/80 characters
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="new-room-description"
                    className="mb-2 block text-xs font-semibold"
                  >
                    Description{" "}
                    <span className="font-normal text-[var(--text-muted)]">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="new-room-description"
                    value={newRoomDescription}
                    onChange={(event) =>
                      setNewRoomDescription(event.target.value)
                    }
                    maxLength={240}
                    rows={3}
                    placeholder="What will your team use this room for?"
                    className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--input)] px-3.5 py-3 text-sm leading-6 outline-none transition placeholder:text-[var(--input-placeholder)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--focus-ring)]"
                  />
                  <p className="mt-1.5 text-right text-[10px] text-[var(--text-muted)]">
                    {newRoomDescription.length}/240 characters
                  </p>
                </div>

                <div className="flex items-start gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] p-3.5">
                  <Users className="mt-0.5 size-4 shrink-0 text-[var(--accent)]" />
                  <p className="text-xs leading-5 text-[var(--text-secondary)]">
                    This room is created through your authenticated admin
                    workspace. Room access is controlled by your backend.
                  </p>
                </div>

                <div className="flex justify-end gap-2 border-t border-[var(--border-subtle)] pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateRoom(false)}
                    className="h-10 rounded-xl border border-[var(--border)] px-4 text-sm font-medium transition hover:bg-[var(--surface-hover)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creatingRoom || !newRoomName.trim()}
                    className="inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-contrast)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {creatingRoom ? (
                      <LoaderCircle className="size-4 animate-spin" />
                    ) : (
                      <Plus className="size-4" />
                    )}
                    {creatingRoom ? "Creating..." : "Create room"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
