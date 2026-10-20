"use client";

import { Hash } from "lucide-react";
import { motion } from "framer-motion";

import { roomAccent } from "./accents";
import { displayName, formatTime } from "./format";
import type { Room } from "./types";

export function RoomListItem({
  room,
  active,
  onSelect,
}: {
  room: Room;
  active: boolean;
  onSelect: () => void;
}) {
  const accent = roomAccent(room.id);

  return (
    <motion.button
      layout
      type="button"
      onClick={onSelect}
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
          <span className="truncate text-sm font-bold">{room.name}</span>
          <span className="shrink-0 text-[10px] text-[var(--text-secondary)]">
            {room.lastMessage ? formatTime(room.lastMessage.createdAt) : ""}
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
}
