"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { api } from "./api";
import type { Message, Room } from "./types";
import { useRoomStream } from "./use-room-stream";
import { useTeamActions } from "./use-team-actions";

export function useTeamChat() {
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

  const loadMessages = useCallback(async (roomId: string, silent = false) => {
    if (!roomId) {
      setMessages([]);
      return;
    }

    loadingRoomRef.current = roomId;
    if (!silent) setLoadingMessages(true);
    if (!silent) setError("");

    try {
      const data = await api<Message[]>(
        `/adminchat/rooms/${encodeURIComponent(roomId)}/messages`,
      );

      if (!activeRef.current || loadingRoomRef.current !== roomId) return;

      setMessages(data);
    } catch (cause) {
      if (!silent && activeRef.current && loadingRoomRef.current === roomId) {
        setError(
          cause instanceof Error ? cause.message : "Could not load messages.",
        );
      }
    } finally {
      if (!silent && activeRef.current && loadingRoomRef.current === roomId) {
        setLoadingMessages(false);
      }
    }
  }, []);

  const { processedCreatedMessageIdsRef } = useRoomStream({
    selectedRoomId,
    loadMessages,
    setMessages,
    setRooms,
    setConnected,
    setError,
    socketRef,
  });

  const { sendMessage, createRoom, saveEdit, removeMessage } = useTeamActions({
    selectedRoomId,
    draft,
    sending,
    setDraft,
    setSending,
    setError,
    setMessages,
    setRooms,
    setSelectedRoomId,
    roomName,
    roomDescription,
    creatingRoom,
    setCreatingRoom,
    setRoomName,
    setRoomDescription,
    setShowRoomDialog,
    editingContent,
    setEditingMessageId,
    setEditingContent,
    setMenuMessageId,
    processedCreatedMessageIdsRef,
    composerRef,
  });

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
    };
  }, [loadRooms, socketRef]);

  useEffect(() => {
    if (!selectedRoomId) {
      setMessages([]);
      return;
    }

    void loadMessages(selectedRoomId);
    setMobileRoomsOpen(false);
  }, [selectedRoomId, loadMessages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return {
    rooms,
    filteredRooms,
    selectedRoom,
    selectedRoomId,
    setSelectedRoomId,
    messages,
    currentUserId,
    draft,
    setDraft,
    search,
    setSearch,
    roomName,
    setRoomName,
    roomDescription,
    setRoomDescription,
    showRoomDialog,
    setShowRoomDialog,
    editingMessageId,
    setEditingMessageId,
    editingContent,
    setEditingContent,
    menuMessageId,
    setMenuMessageId,
    loadingRooms,
    loadingMessages,
    sending,
    creatingRoom,
    connected,
    error,
    mobileRoomsOpen,
    setMobileRoomsOpen,
    messageEndRef,
    composerRef,
    loadMessages,
    sendMessage,
    createRoom,
    saveEdit,
    removeMessage,
  };
}
