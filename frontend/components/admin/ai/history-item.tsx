"use client";

import {
  Clock3,
  MessageSquare,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { formatTime } from "./format";
import type { AIConversation } from "./types";

export function HistoryItem({
  conversation,
  selected,
  menuOpen,
  onSelect,
  onToggleMenu,
  onCloseMenu,
  onDelete,
}: {
  conversation: AIConversation;
  selected: boolean;
  menuOpen: boolean;
  onSelect: () => void;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        onClick={onSelect}
        className={`flex w-full items-start gap-2.5 rounded-xl px-2.5 py-2.5 pr-9 text-left transition ${selected ? "border border-[var(--accent-border,var(--border))] bg-[var(--accent-subtle)]" : "border border-transparent hover:bg-[var(--surface-hover)]"}`}
      >
        <MessageSquare
          className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${selected ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}`}
        />
        <span className="min-w-0 flex-1">
          <span
            className={`block truncate text-[11px] font-semibold ${selected ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}
          >
            {conversation.title || "Untitled conversation"}
          </span>
          <span className="mt-1 flex items-center gap-1 text-[9px] text-[var(--text-muted)]">
            <Clock3 className="h-2.5 w-2.5" />
            {formatTime(conversation.updatedAt || conversation.createdAt)}
            {typeof conversation._count?.messages === "number" && (
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
        onClick={onToggleMenu}
        className={`absolute right-1.5 top-2 grid h-7 w-7 place-items-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)] ${menuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100 focus:opacity-100"}`}
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      <AnimatePresence>
        {menuOpen && (
          <>
            <button
              aria-label="Close conversation menu"
              className="fixed inset-0 z-20 cursor-default"
              onClick={onCloseMenu}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -3 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="absolute right-1 top-9 z-30 w-40 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1 shadow-[var(--shadow-md)]"
            >
              <button
                type="button"
                onClick={onDelete}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[11px] font-semibold text-[var(--danger,var(--text-secondary))] transition hover:bg-[var(--danger-bg,var(--surface-secondary))]"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete conversation
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
