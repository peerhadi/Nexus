"use client";

import {
  CheckCheck,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Avatar } from "./avatar";
import { displayName, formatTime } from "./format";
import { IconButton } from "./icon-button";
import type { Message } from "./types";

export function MessageItem({
  message,
  showDate,
  dateLabel,
  ownMessage,
  editing,
  menuOpen,
  editingContent,
  onEditingContentChange,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onToggleMenu,
  onRemove,
}: {
  message: Message;
  showDate: boolean;
  dateLabel: string;
  ownMessage: boolean;
  editing: boolean;
  menuOpen: boolean;
  editingContent: string;
  onEditingContentChange: (value: string) => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSaveEdit: () => void;
  onToggleMenu: () => void;
  onRemove: () => void;
}) {
  return (
    <div>
      {showDate && (
        <div className="my-4 flex items-center justify-center">
          <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-[10px] font-semibold text-[var(--text-secondary)] shadow-[var(--shadow-sm)]">
            {dateLabel}
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
              {ownMessage ? "You" : displayName(message.sender)}
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
                onChange={(event) => onEditingContentChange(event.target.value)}
                maxLength={5000}
                rows={3}
                className="w-full resize-y bg-transparent p-2 text-sm outline-none"
              />
              <div className="flex justify-end gap-1">
                <button
                  type="button"
                  onClick={onCancelEdit}
                  className="rounded-lg px-3 py-1.5 text-xs hover:bg-[var(--surface-secondary)]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onSaveEdit}
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
                  <IconButton label="Message options" onClick={onToggleMenu}>
                    <MoreHorizontal size={17} />
                  </IconButton>

                  <AnimatePresence>
                    {menuOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -4 }}
                        className="absolute left-0 top-9 z-20 w-40 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1 shadow-[var(--shadow-lg)]"
                      >
                        <button
                          type="button"
                          onClick={onStartEdit}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)]"
                        >
                          <Pencil size={13} />
                          Edit message
                        </button>
                        <button
                          type="button"
                          onClick={onRemove}
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
}
