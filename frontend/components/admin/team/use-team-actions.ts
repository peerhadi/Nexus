"use client";

import type { MutableRefObject } from "react";

import { api } from "./api";
import type { Message, Room } from "./types";

export function useTeamActions({
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
}: {
  selectedRoomId: string;
  draft: string;
  sending: boolean;
  setDraft: (value: string) => void;
  setSending: (value: boolean) => void;
  setError: (value: string) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  setSelectedRoomId: (value: string) => void;
  roomName: string;
  roomDescription: string;
  creatingRoom: boolean;
  setCreatingRoom: (value: boolean) => void;
  setRoomName: (value: string) => void;
  setRoomDescription: (value: string) => void;
  setShowRoomDialog: (value: boolean) => void;
  editingContent: string;
  setEditingMessageId: (value: string) => void;
  setEditingContent: (value: string) => void;
  setMenuMessageId: (value: string) => void;
  processedCreatedMessageIdsRef: MutableRefObject<Set<string>>;
  composerRef: MutableRefObject<HTMLTextAreaElement | null>;
}) {
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
      const wasAlreadyProcessed = processedCreatedMessageIdsRef.current.has(
        message.id,
      );
      processedCreatedMessageIdsRef.current.add(message.id);

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
                _count: {
                  messages:
                    room._count.messages + (wasAlreadyProcessed ? 0 : 1),
                },
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

  return { sendMessage, createRoom, saveEdit, removeMessage };
}
