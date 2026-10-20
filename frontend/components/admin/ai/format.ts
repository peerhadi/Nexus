import type { AIConversation, User } from "./types";
import { ADMIN_INSTRUCTIONS_MARKER } from "./api";

export function normalizeRole(role?: string | null) {
  return role?.trim().toUpperCase();
}

export function normalizeMessageRole(role: string) {
  return role.toUpperCase() === "USER" ? "USER" : "ASSISTANT";
}

export function visibleMessageContent(content: string) {
  const markerIndex = content.indexOf(ADMIN_INSTRUCTIONS_MARKER);
  return markerIndex >= 0 ? content.slice(0, markerIndex).trimEnd() : content;
}

export function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatConversationDate(value: string) {
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

export function displayName(user?: User | null) {
  return user?.name?.trim() || user?.email || "Administrator";
}

export function initials(user?: User | null) {
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

export function groupConversations(conversations: AIConversation[]) {
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
