"use client";

import { ChevronLeft, Hash, MessagesSquare, RefreshCw } from "lucide-react";

import { roomAccent } from "./accents";
import { IconButton } from "./icon-button";
import type { Room } from "./types";

export function RoomHeader({
  room,
  loadingMessages,
  onBack,
  onReload,
}: {
  room: Room;
  loadingMessages: boolean;
  onBack: () => void;
  onReload: () => void;
}) {
  const accent = roomAccent(room.id);

  return (
    <header className="flex shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-3 py-3 sm:px-5 sm:py-4">
      <IconButton label="Back to conversations" onClick={onBack}>
        <ChevronLeft size={19} className="md:hidden" />
        <MessagesSquare size={17} className="hidden md:block" />
      </IconButton>

      <div
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--border)] ${accent.surface} ${accent.icon}`}
      >
        <Hash size={19} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="truncate text-sm font-bold sm:text-base">
            {room.name}
          </h2>
          <span className="rounded-md bg-[var(--success-bg)] px-1.5 py-0.5 text-[9px] font-bold text-[var(--success)]">
            TEAM ROOM
          </span>
        </div>
        <p className="mt-1 truncate text-xs text-[var(--text-secondary)]">
          {room.description || "A private Nexus admin conversation"}
        </p>
      </div>

      <div className="hidden items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-3 py-2 lg:flex">
        <span className={`h-2 w-2 rounded-full ${"bg-[var(--success)]"}`} />
        <span className="text-xs font-semibold">Real-time updates</span>
      </div>

      <IconButton
        label="Reload message history"
        onClick={onReload}
        disabled={loadingMessages}
      >
        <RefreshCw
          size={16}
          className={loadingMessages ? "animate-spin" : ""}
        />
      </IconButton>
    </header>
  );
}
