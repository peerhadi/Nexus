"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  CheckCheck,
  ChevronLeft,
  Hash,
  LoaderCircle,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Plus,
  Radio,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Trash2,
  Users,
  X,
  Sparkles,
  MessagesSquare,
  Circle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
).replace(/\/+$/, "");

const WS_ORIGIN = API_URL.replace(/^http/, "ws").replace(/\/api$/, "");

type Admin = {
  id: string;
  name: string | null;
  email: string;
};

type Message = {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  sender: Admin;
};

type Room = {
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: Admin;
  lastMessage: Message | null;
  _count: { messages: number };
};

type StreamEvent = {
  type: string;
  conversationId?: string;
  data?: {
    message?: Message;
    messageId?: string;
    roomId?: string;
  };
};

function readToken() {
  if (typeof window === "undefined") return null;

  return (
    window.localStorage.getItem("nexus_token") ||
    window.sessionStorage.getItem("nexus_token")
  );
}

async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = readToken();

  if (!token) {
    throw new Error("Your session has expired. Please sign in again.");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
  });

  if (response.status === 204) return undefined as T;

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      body?.message || body?.error || `Request failed (${response.status})`,
    );
  }

  return body as T;
}

function initials(name?: string | null, email?: string) {
  const value = name?.trim() || email?.split("@")[0] || "A";

  return value
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function displayName(admin?: Admin | null) {
  return admin?.name?.trim() || admin?.email || "Admin";
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatDate(value: string) {
  const date = new Date(value);

  if (date.toDateString() === new Date().toDateString()) {
    return "Today";
  }

  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year:
      date.getFullYear() === new Date().getFullYear() ? undefined : "numeric",
  }).format(date);
}

const roomAccents = [
  {
    icon: "text-[var(--accent)]",
    surface: "bg-[var(--accent-subtle)]",
  },
  {
    icon: "text-[var(--success)]",
    surface: "bg-[var(--success-bg)]",
  },
  {
    icon: "text-[var(--info)]",
    surface: "bg-[var(--info-bg)]",
  },
  {
    icon: "text-[var(--warning)]",
    surface: "bg-[var(--warning-bg)]",
  },
];

function roomAccent(id: string) {
  const index = [...id].reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );
  return roomAccents[index % roomAccents.length];
}

function Avatar({
  admin,
  size = "md",
}: {
  admin?: Admin | null;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = {
    sm: "h-8 w-8 text-[10px] rounded-xl",
    md: "h-9 w-9 text-xs rounded-xl",
    lg: "h-11 w-11 text-sm rounded-2xl",
  }[size];

  return (
    <div
      title={displayName(admin)}
      className={`grid shrink-0 place-items-center border border-[var(--border)] bg-[var(--surface-secondary)] font-bold text-[var(--text)] ${sizeClass}`}
    >
      {initials(admin?.name, admin?.email)}
    </div>
  );
}

function IconButton({
  label,
  onClick,
  children,
  disabled = false,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[var(--text-secondary)] transition hover:bg-[var(--surface-secondary)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export default function AdminChatPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [showRoomDialog, setShowRoomDialog] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState("");
  const [editingContent, setEditingContent] = useState("");
  const [menuMessageId, setMenuMessageId] = useState("");
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [creatingRoom, setCreatingRoom] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");
  const [mobileRoomsOpen, setMobileRoomsOpen] = useState(true);

  const socketRef = useRef<WebSocket | null>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const composerRef = useRef<HTMLTextAreaElement | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptRef = useRef(0);
  const activeRef = useRef(true);
  const loadingRoomRef = useRef("");

  const selectedRoom = rooms.find((room) => room.id === selectedRoomId);

  const filteredRooms = rooms.filter((room) => {
    const query = search.toLowerCase();

    return (
      room.name.toLowerCase().includes(query) ||
      (room.description || "").toLowerCase().includes(query) ||
      (room.lastMessage?.content || "").toLowerCase().includes(query)
    );
  });

  const loadRooms = useCallback(async () => {
    setLoadingRooms(true);

    try {
      const data = await api<Room[]>("/adminchat/rooms");

      if (!activeRef.current) return;

      setRooms(data);

      setSelectedRoomId((current) =>
        current && data.some((room) => room.id === current)
          ? current
          : data[0]?.id || "",
      );
    } catch (cause) {
      if (activeRef.current) {
        setError(
          cause instanceof Error ? cause.message : "Could not load rooms.",
        );
      }
    } finally {
      if (activeRef.current) setLoadingRooms(false);
    }
  }, []);

  const loadMessages = useCallback(async (roomId: string) => {
    if (!roomId) {
      setMessages([]);
      return;
    }

    loadingRoomRef.current = roomId;
    setLoadingMessages(true);
    setError("");

    try {
      const data = await api<Message[]>(
        `/adminchat/rooms/${encodeURIComponent(roomId)}/messages`,
      );

      if (!activeRef.current || loadingRoomRef.current !== roomId) return;

      setMessages(data);
    } catch (cause) {
      if (activeRef.current && loadingRoomRef.current === roomId) {
        setError(
          cause instanceof Error ? cause.message : "Could not load messages.",
        );
      }
    } finally {
      if (activeRef.current && loadingRoomRef.current === roomId) {
        setLoadingMessages(false);
      }
    }
  }, []);

  useEffect(() => {
    activeRef.current = true;

    void loadRooms();

    void api<{ id: string }>("/auth/me")
      .then((user) => {
        if (activeRef.current) setCurrentUserId(user.id);
      })
      .catch(() => {
        if (activeRef.current)
          setError("Could not verify your session. Please sign in again.");
      });

    return () => {
      activeRef.current = false;
      socketRef.current?.close();
      socketRef.current = null;

      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
    };
  }, [loadRooms]);

  useEffect(() => {
    if (!selectedRoomId) {
      setMessages([]);
      return;
    }

    void loadMessages(selectedRoomId);
    setMobileRoomsOpen(false);
  }, [selectedRoomId, loadMessages]);

  useEffect(() => {
    if (!selectedRoomId) {
      setConnected(false);
      return;
    }

    let disposed = false;
    let socket: WebSocket | null = null;

    const connect = async () => {
      try {
        const ticketResponse = await api<{ ticket?: string; token?: string }>(
          "/auth/ws-ticket",
          { method: "POST" },
        );

        if (disposed) return;

        const ticket = ticketResponse.ticket || ticketResponse.token;

        if (!ticket) throw new Error("WebSocket ticket was missing.");

        const query = new URLSearchParams({ ticket });

        socket = new WebSocket(
          `${WS_ORIGIN}/api/events/adminchat/${encodeURIComponent(selectedRoomId)}?${query.toString()}`,
        );

        socketRef.current = socket;

        socket.onopen = () => {
          if (disposed) return;
          reconnectAttemptRef.current = 0;
          setConnected(true);
        };

        socket.onmessage = (event) => {
          if (disposed) return;

          let payload: StreamEvent;

          try {
            payload = JSON.parse(event.data) as StreamEvent;
          } catch {
            return;
          }

          const eventRoomId = payload.conversationId || payload.data?.roomId;
          if (eventRoomId && eventRoomId !== selectedRoomId) return;

          if (
            payload.type === "adminchat.message.created" ||
            payload.type === "adminchat.message.updated"
          ) {
            const message = payload.data?.message;
            if (!message) return;

            setMessages((current) => {
              const exists = current.some((item) => item.id === message.id);

              if (exists) {
                return current.map((item) =>
                  item.id === message.id ? message : item,
                );
              }

              if (payload.type === "adminchat.message.created") {
                return [...current, message].sort(
                  (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime(),
                );
              }

              return current;
            });

            if (payload.type === "adminchat.message.created") {
              setRooms((current) =>
                current.map((room) =>
                  room.id === message.roomId
                    ? {
                        ...room,
                        lastMessage: message,
                        updatedAt: message.createdAt,
                        _count: { messages: room._count.messages + 1 },
                      }
                    : room,
                ),
              );
            } else {
              setRooms((current) =>
                current.map((room) =>
                  room.id === message.roomId &&
                  room.lastMessage?.id === message.id
                    ? { ...room, lastMessage: message }
                    : room,
                ),
              );
            }

            return;
          }

          if (payload.type === "adminchat.message.deleted") {
            const messageId = payload.data?.messageId;
            if (!messageId) return;

            setMessages((current) =>
              current.filter((message) => message.id !== messageId),
            );

            setRooms((current) =>
              current.map((room) =>
                room.id === selectedRoomId && room.lastMessage?.id === messageId
                  ? { ...room, lastMessage: null }
                  : room,
              ),
            );
          }
        };

        socket.onerror = () => {
          if (!disposed) setConnected(false);
        };

        socket.onclose = () => {
          if (disposed) return;

          setConnected(false);

          const attempt = reconnectAttemptRef.current++;
          const delay = Math.min(1000 * 2 ** attempt, 15000);

          reconnectTimerRef.current = setTimeout(() => {
            if (!disposed) void connect();
          }, delay);
        };
      } catch (cause) {
        if (disposed) return;

        setConnected(false);

        const attempt = reconnectAttemptRef.current++;
        reconnectTimerRef.current = setTimeout(
          () => {
            if (!disposed) void connect();
          },
          Math.min(1000 * 2 ** attempt, 15000),
        );

        if (cause instanceof Error) setError(cause.message);
      }
    };

    reconnectAttemptRef.current = 0;
    void connect();

    return () => {
      disposed = true;

      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }

      if (socketRef.current === socket) socketRef.current = null;

      socket?.close();
      setConnected(false);
    };
  }, [selectedRoomId]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const content = draft.trim();

    if (!content || !selectedRoomId || sending) return;

    setSending(true);
    setError("");

    try {
      const message = await api<Message>(
        `/adminchat/rooms/${encodeURIComponent(selectedRoomId)}/messages`,
        {
          method: "POST",
          body: JSON.stringify({ content }),
        },
      );

      setDraft("");

      setMessages((current) => {
        if (current.some((item) => item.id === message.id)) return current;
        return [...current, message].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
      });

      setRooms((current) =>
        current.map((room) =>
          room.id === selectedRoomId
            ? {
                ...room,
                lastMessage: message,
                updatedAt: message.createdAt,
                _count: { messages: room._count.messages + 1 },
              }
            : room,
        ),
      );
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Message could not be sent.",
      );
    } finally {
      setSending(false);
      composerRef.current?.focus();
    }
  };

  const createRoom = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!roomName.trim() || creatingRoom) return;

    setCreatingRoom(true);
    setError("");

    try {
      const room = await api<Room>("/adminchat/rooms", {
        method: "POST",
        body: JSON.stringify({
          name: roomName.trim(),
          description: roomDescription.trim() || undefined,
        }),
      });

      setRooms((current) => [
        room,
        ...current.filter((item) => item.id !== room.id),
      ]);
      setSelectedRoomId(room.id);
      setRoomName("");
      setRoomDescription("");
      setShowRoomDialog(false);
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Could not create room.",
      );
    } finally {
      setCreatingRoom(false);
    }
  };

  const saveEdit = async (messageId: string) => {
    const content = editingContent.trim();
    if (!content) return;

    try {
      const message = await api<Message>(
        `/adminchat/messages/${encodeURIComponent(messageId)}`,
        {
          method: "PATCH",
          body: JSON.stringify({ content }),
        },
      );

      setMessages((current) =>
        current.map((item) => (item.id === message.id ? message : item)),
      );

      setEditingMessageId("");
      setEditingContent("");
      setMenuMessageId("");
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Could not edit message.",
      );
    }
  };

  const removeMessage = async (messageId: string) => {
    if (!window.confirm("Delete this message? This cannot be undone.")) return;

    try {
      await api(`/adminchat/messages/${encodeURIComponent(messageId)}`, {
        method: "DELETE",
      });

      setMessages((current) =>
        current.filter((message) => message.id !== messageId),
      );
      setMenuMessageId("");
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Could not delete message.",
      );
    }
  };

  return (
    <main className="flex h-[calc(100dvh-2rem)] min-h-[540px] flex-col gap-5 overflow-hidden p-3 text-[var(--text)] sm:p-5 lg:p-6">
      <header className="flex shrink-0 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--accent-subtle)] text-[var(--accent)]">
            <div className="absolute inset-x-0 top-0 h-1 bg-[var(--accent)]" />
            <MessagesSquare size={22} />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                Admin Chat
              </h1>
              <span className="rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] px-2 py-0.5 text-[10px] font-semibold text-[var(--text-secondary)]">
                INTERNAL
              </span>
            </div>
            <p className="mt-1 text-xs text-[var(--text-secondary)] sm:text-sm">
              One workspace. Your entire Nexus team.
            </p>
          </div>
        </div>

        <div
          className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${"border-[var(--success-border)] bg-[var(--success-bg)] text-[var(--success)]"}`}
        >
          <Radio size={14} className={"animate-pulse"} />
          <span className="hidden sm:inline">Connected live </span>
          <span className="sm:hidden">Live</span>
        </div>
      </header>

      <section className="flex min-h-0 flex-1 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
        <aside
          className={`${
            mobileRoomsOpen ? "flex" : "hidden"
          } w-full shrink-0 flex-col border-r border-[var(--border)] md:flex md:w-[290px] lg:w-[330px]`}
        >
          <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-4">
            <div>
              <h2 className="text-sm font-bold">Conversations</h2>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                {rooms.length} active {rooms.length === 1 ? "room" : "rooms"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowRoomDialog(true)}
              className="flex h-9 items-center gap-1.5 rounded-xl bg-[var(--accent)] px-3 text-xs font-bold text-[var(--accent-contrast)] transition hover:opacity-85"
            >
              <Plus size={15} />
              New room
            </button>
          </div>

          <div className="border-b border-[var(--border)] p-3">
            <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-3 transition focus-within:border-[var(--accent)]">
              <Search
                size={15}
                className="shrink-0 text-[var(--text-secondary)]"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search conversations..."
                aria-label="Search conversations"
                className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--text-secondary)]"
              />
              {search && (
                <IconButton label="Clear search" onClick={() => setSearch("")}>
                  <X size={14} />
                </IconButton>
              )}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            {loadingRooms ? (
              <div className="flex items-center justify-center gap-2 py-12 text-sm text-[var(--text-secondary)]">
                <LoaderCircle
                  size={17}
                  className="animate-spin text-[var(--accent)]"
                />
                Loading conversations
              </div>
            ) : filteredRooms.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--accent)]">
                  {search ? <Search size={19} /> : <MessagesSquare size={21} />}
                </div>
                <p className="text-sm font-semibold">
                  {search ? "No matching rooms" : "A fresh start"}
                </p>
                <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                  {search
                    ? "Try a different search term."
                    : "Create a room and get the team talking."}
                </p>
                {!search && (
                  <button
                    type="button"
                    onClick={() => setShowRoomDialog(true)}
                    className="mt-4 rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-semibold hover:bg-[var(--surface-secondary)]"
                  >
                    Create your first room
                  </button>
                )}
              </div>
            ) : (
              filteredRooms.map((room) => {
                const active = room.id === selectedRoomId;
                const accent = roomAccent(room.id);

                return (
                  <motion.button
                    layout
                    type="button"
                    key={room.id}
                    onClick={() => {
                      setSelectedRoomId(room.id);
                      setMobileRoomsOpen(false);
                    }}
                    className={`relative mb-1 flex w-full items-start gap-3 overflow-hidden rounded-xl p-3 text-left transition ${
                      active
                        ? "bg-[var(--accent-subtle)]"
                        : "hover:bg-[var(--surface-secondary)]"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="active-admin-room"
                        className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-[var(--accent)]"
                      />
                    )}

                    <div
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--border)] ${accent.surface} ${accent.icon}`}
                    >
                      <Hash size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-bold">
                          {room.name}
                        </span>
                        <span className="shrink-0 text-[10px] text-[var(--text-secondary)]">
                          {room.lastMessage
                            ? formatTime(room.lastMessage.createdAt)
                            : ""}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-xs text-[var(--text-secondary)]">
                        {room.lastMessage
                          ? `${displayName(room.lastMessage.sender)}: ${room.lastMessage.content}`
                          : room.description || "No messages yet"}
                      </p>

                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="rounded-md border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-semibold text-[var(--text-secondary)]">
                          {room._count.messages} messages
                        </span>
                        {active && (
                          <span className="rounded-md bg-[var(--accent)] px-1.5 py-0.5 text-[9px] font-bold text-[var(--accent-contrast)]">
                            OPEN
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })
            )}
          </div>

          <div className="flex items-center gap-3 border-t border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--success)]">
              <ShieldCheck size={17} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold">Private workspace</p>
              <p className="mt-0.5 text-[10px] text-[var(--text-secondary)]">
                Restricted to admins
              </p>
            </div>
            <Users size={16} className="text-[var(--text-secondary)]" />
          </div>
        </aside>

        <div
          className={`${
            mobileRoomsOpen ? "hidden" : "flex"
          } min-w-0 flex-1 flex-col md:flex`}
        >
          {selectedRoom ? (
            <>
              <header className="flex shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-3 py-3 sm:px-5 sm:py-4">
                <IconButton
                  label="Back to conversations"
                  onClick={() => setMobileRoomsOpen(true)}
                >
                  <ChevronLeft size={19} className="md:hidden" />
                  <MessagesSquare size={17} className="hidden md:block" />
                </IconButton>

                <div
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--border)] ${roomAccent(selectedRoom.id).surface} ${roomAccent(selectedRoom.id).icon}`}
                >
                  <Hash size={19} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="truncate text-sm font-bold sm:text-base">
                      {selectedRoom.name}
                    </h2>
                    <span className="rounded-md bg-[var(--success-bg)] px-1.5 py-0.5 text-[9px] font-bold text-[var(--success)]">
                      TEAM ROOM
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs text-[var(--text-secondary)]">
                    {selectedRoom.description ||
                      "A private Nexus admin conversation"}
                  </p>
                </div>

                <div className="hidden items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-3 py-2 lg:flex">
                  <span
                    className={`h-2 w-2 rounded-full ${"bg-[var(--success)]"}`}
                  />
                  <span className="text-xs font-semibold">
                    Real-time updates
                  </span>
                </div>

                <IconButton
                  label="Reload message history"
                  onClick={() => void loadMessages(selectedRoom.id)}
                  disabled={loadingMessages}
                >
                  <RefreshCw
                    size={16}
                    className={loadingMessages ? "animate-spin" : ""}
                  />
                </IconButton>
              </header>

              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[var(--background)] px-3 py-5 sm:px-6">
                {loadingMessages ? (
                  <div className="flex flex-1 items-center justify-center gap-2 text-sm text-[var(--text-secondary)]">
                    <LoaderCircle
                      size={18}
                      className="animate-spin text-[var(--accent)]"
                    />
                    Loading message history
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
                    <div className="relative mb-5 grid h-16 w-16 place-items-center rounded-3xl border border-[var(--border)] bg-[var(--accent-subtle)] text-[var(--accent)]">
                      <div className="absolute inset-x-3 top-0 h-1 rounded-full bg-[var(--accent)]" />
                      <Sparkles size={25} />
                    </div>
                    <h3 className="text-base font-bold">
                      Start something great
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-[var(--text-secondary)]">
                      This room is ready. Send a message to get the conversation
                      going.
                    </p>
                    <button
                      type="button"
                      onClick={() => composerRef.current?.focus()}
                      className="mt-5 flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-xs font-bold text-[var(--accent-contrast)] transition hover:opacity-85"
                    >
                      <Send size={14} />
                      Write the first message
                    </button>
                  </div>
                ) : (
                  <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="h-px flex-1 bg-[var(--border)]" />
                      <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                        <ShieldCheck size={12} />
                        Private team conversation
                      </span>
                      <div className="h-px flex-1 bg-[var(--border)]" />
                    </div>

                    {messages.map((message, index) => {
                      const previous = messages[index - 1];
                      const showDate =
                        !previous ||
                        formatDate(previous.createdAt) !==
                          formatDate(message.createdAt);
                      const ownMessage = message.senderId === currentUserId;
                      const editing = editingMessageId === message.id;

                      return (
                        <div key={message.id}>
                          {showDate && (
                            <div className="my-4 flex items-center justify-center">
                              <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-[10px] font-semibold text-[var(--text-secondary)] shadow-[var(--shadow-sm)]">
                                {formatDate(message.createdAt)}
                              </span>
                            </div>
                          )}

                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`group flex items-start gap-2.5 ${
                              ownMessage ? "flex-row-reverse" : ""
                            }`}
                          >
                            <Avatar admin={message.sender} size="sm" />

                            <div
                              className={`flex min-w-0 max-w-[88%] flex-col sm:max-w-[78%] ${
                                ownMessage ? "items-end" : "items-start"
                              }`}
                            >
                              <div className="mb-1.5 flex flex-wrap items-center gap-2 px-1">
                                <span className="text-xs font-bold">
                                  {ownMessage
                                    ? "You"
                                    : displayName(message.sender)}
                                </span>
                                <span className="text-[10px] text-[var(--text-secondary)]">
                                  {formatTime(message.createdAt)}
                                </span>
                                {message.updatedAt !== message.createdAt && (
                                  <span className="rounded-md bg-[var(--surface-secondary)] px-1.5 py-0.5 text-[9px] text-[var(--text-secondary)]">
                                    Edited
                                  </span>
                                )}
                              </div>

                              {editing ? (
                                <div className="w-full min-w-[220px] rounded-2xl border border-[var(--accent)] bg-[var(--surface)] p-2 shadow-[var(--shadow-sm)]">
                                  <textarea
                                    autoFocus
                                    value={editingContent}
                                    onChange={(event) =>
                                      setEditingContent(event.target.value)
                                    }
                                    maxLength={5000}
                                    rows={3}
                                    className="w-full resize-y bg-transparent p-2 text-sm outline-none"
                                  />
                                  <div className="flex justify-end gap-1">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditingMessageId("");
                                        setEditingContent("");
                                      }}
                                      className="rounded-lg px-3 py-1.5 text-xs hover:bg-[var(--surface-secondary)]"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => void saveEdit(message.id)}
                                      className="rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-bold text-[var(--accent-contrast)] hover:opacity-85"
                                    >
                                      Save changes
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className={`relative whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 shadow-[var(--shadow-sm)] ${
                                    ownMessage
                                      ? "rounded-tr-md border border-[var(--accent-border)] bg-[var(--accent-subtle)]"
                                      : "rounded-tl-md border border-[var(--border)] bg-[var(--surface)]"
                                  }`}
                                >
                                  {message.content}

                                  {ownMessage && (
                                    <div className="absolute -left-10 top-1 opacity-0 transition group-hover:opacity-100">
                                      <IconButton
                                        label="Message options"
                                        onClick={() =>
                                          setMenuMessageId((current) =>
                                            current === message.id
                                              ? ""
                                              : message.id,
                                          )
                                        }
                                      >
                                        <MoreHorizontal size={17} />
                                      </IconButton>

                                      <AnimatePresence>
                                        {menuMessageId === message.id && (
                                          <motion.div
                                            initial={{
                                              opacity: 0,
                                              scale: 0.96,
                                              y: -4,
                                            }}
                                            animate={{
                                              opacity: 1,
                                              scale: 1,
                                              y: 0,
                                            }}
                                            exit={{
                                              opacity: 0,
                                              scale: 0.96,
                                              y: -4,
                                            }}
                                            className="absolute left-0 top-9 z-20 w-40 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1 shadow-[var(--shadow-lg)]"
                                          >
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setEditingMessageId(message.id);
                                                setEditingContent(
                                                  message.content,
                                                );
                                                setMenuMessageId("");
                                              }}
                                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)]"
                                            >
                                              <Pencil size={13} />
                                              Edit message
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() =>
                                                void removeMessage(message.id)
                                              }
                                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium text-[var(--danger)] hover:bg-[var(--danger-bg)]"
                                            >
                                              <Trash2 size={13} />
                                              Delete message
                                            </button>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  )}
                                </div>
                              )}

                              {ownMessage && (
                                <span className="mt-1.5 flex items-center gap-1 px-1 text-[10px] text-[var(--accent)]">
                                  <CheckCheck size={12} />
                                  Sent
                                </span>
                              )}
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                    <div ref={messageEndRef} />
                  </div>
                )}
              </div>

              <div className="shrink-0 border-t border-[var(--border)] bg-[var(--surface)] p-3 sm:p-5">
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    void sendMessage();
                  }}
                  className="mx-auto max-w-3xl"
                >
                  <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)] transition focus-within:border-[var(--accent)] focus-within:ring-1 focus-within:ring-[var(--accent)]">
                    <textarea
                      ref={composerRef}
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" &&
                          !event.shiftKey &&
                          !event.nativeEvent.isComposing
                        ) {
                          event.preventDefault();
                          void sendMessage();
                        }
                      }}
                      placeholder={`Message in #${selectedRoom.name}`}
                      aria-label="Write a message"
                      maxLength={5000}
                      rows={2}
                      className="max-h-36 min-h-[62px] w-full resize-y bg-transparent px-4 py-3 text-sm leading-6 outline-none placeholder:text-[var(--text-secondary)]"
                    />

                    <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] bg-[var(--surface-secondary)] px-3 py-2">
                      <span className="text-[10px] text-[var(--text-secondary)]">
                        Enter to send <span className="mx-1">·</span> Shift +
                        Enter for a new line
                      </span>

                      <button
                        type="submit"
                        disabled={!draft.trim() || sending}
                        className="flex h-9 items-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-xs font-bold text-[var(--accent-contrast)] transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {sending ? (
                          <LoaderCircle size={15} className="animate-spin" />
                        ) : (
                          <Send size={15} />
                        )}
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-6 text-center">
              <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[var(--accent-subtle)] opacity-60 blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[var(--info-bg)] opacity-60 blur-3xl" />

              <div className="relative">
                <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl border border-[var(--accent-border)] bg-[var(--accent-subtle)] text-[var(--accent)]">
                  <MessagesSquare size={27} />
                </div>

                <h2 className="text-lg font-bold">
                  {loadingRooms
                    ? "Loading Admin Chat"
                    : "Your team starts here"}
                </h2>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
                  {loadingRooms
                    ? "Loading your team's conversations."
                    : "Choose a room to catch up or create a new one for your next project."}
                </p>

                {!loadingRooms && (
                  <button
                    type="button"
                    onClick={() => setShowRoomDialog(true)}
                    className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-sm font-bold text-[var(--accent-contrast)] transition hover:opacity-85"
                  >
                    <Plus size={16} />
                    Create a room
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {showRoomDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--overlay)] p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget)
                setShowRoomDialog(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              className="w-full max-w-md overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-lg)]"
            >
              <div className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface-secondary)] p-5">
                <div className="absolute inset-x-0 top-0 h-1 bg-[var(--accent)]" />
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--accent-border)] bg-[var(--accent-subtle)] text-[var(--accent)]">
                      <Hash size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">Create a room</h2>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        Bring the right conversations together.
                      </p>
                    </div>
                  </div>
                  <IconButton
                    label="Close dialog"
                    onClick={() => setShowRoomDialog(false)}
                  >
                    <X size={18} />
                  </IconButton>
                </div>
              </div>

              <form onSubmit={createRoom} className="space-y-4 p-5">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold">
                    Room name
                  </span>
                  <input
                    autoFocus
                    required
                    maxLength={80}
                    value={roomName}
                    onChange={(event) => setRoomName(event.target.value)}
                    placeholder="e.g. Project discussions"
                    className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm outline-none transition placeholder:text-[var(--text-secondary)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold">
                    Description{" "}
                    <span className="font-normal text-[var(--text-secondary)]">
                      (optional)
                    </span>
                  </span>
                  <textarea
                    rows={3}
                    maxLength={300}
                    value={roomDescription}
                    onChange={(event) => setRoomDescription(event.target.value)}
                    placeholder="What is this room for?"
                    className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm outline-none transition placeholder:text-[var(--text-secondary)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </label>

                <div className="flex justify-end gap-2 border-t border-[var(--border)] pt-4">
                  <button
                    type="button"
                    onClick={() => setShowRoomDialog(false)}
                    className="h-10 rounded-xl border border-[var(--border)] px-4 text-sm font-semibold hover:bg-[var(--surface-secondary)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!roomName.trim() || creatingRoom}
                    className="flex h-10 items-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-sm font-bold text-[var(--accent-contrast)] transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {creatingRoom && (
                      <LoaderCircle size={15} className="animate-spin" />
                    )}
                    Create room
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
