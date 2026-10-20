"use client";

import { LoaderCircle, Send, ShieldCheck, Sparkles } from "lucide-react";

import { formatDate } from "./format";
import { MessageItem } from "./message-item";
import type { Message } from "./types";

export function MessageThread({
  messages,
  currentUserId,
  loadingMessages,
  editingMessageId,
  editingContent,
  menuMessageId,
  messageEndRef,
  onComposerFocus,
  onEditingContentChange,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onToggleMenu,
  onRemove,
}: {
  messages: Message[];
  currentUserId: string;
  loadingMessages: boolean;
  editingMessageId: string;
  editingContent: string;
  menuMessageId: string;
  messageEndRef: React.RefObject<HTMLDivElement | null>;
  onComposerFocus: () => void;
  onEditingContentChange: (value: string) => void;
  onStartEdit: (message: Message) => void;
  onCancelEdit: () => void;
  onSaveEdit: (messageId: string) => void;
  onToggleMenu: (messageId: string) => void;
  onRemove: (messageId: string) => void;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[var(--background)] px-3 py-5 sm:px-6">
      {loadingMessages ? (
        <div className="flex flex-1 items-center justify-center gap-2 text-sm text-[var(--text-secondary)]">
          <LoaderCircle size={18} className="animate-spin text-[var(--accent)]" />
          Loading message history
        </div>
      ) : messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
          <div className="relative mb-5 grid h-16 w-16 place-items-center rounded-3xl border border-[var(--border)] bg-[var(--accent-subtle)] text-[var(--accent)]">
            <div className="absolute inset-x-3 top-0 h-1 rounded-full bg-[var(--accent)]" />
            <Sparkles size={25} />
          </div>
          <h3 className="text-base font-bold">Start something great</h3>
          <p className="mt-2 max-w-xs text-sm leading-6 text-[var(--text-secondary)]">
            This room is ready. Send a message to get the conversation going.
          </p>
          <button
            type="button"
            onClick={onComposerFocus}
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
              formatDate(previous.createdAt) !== formatDate(message.createdAt);

            return (
              <MessageItem
                key={message.id}
                message={message}
                showDate={showDate}
                dateLabel={formatDate(message.createdAt)}
                ownMessage={message.senderId === currentUserId}
                editing={editingMessageId === message.id}
                menuOpen={menuMessageId === message.id}
                editingContent={editingContent}
                onEditingContentChange={onEditingContentChange}
                onStartEdit={() => onStartEdit(message)}
                onCancelEdit={onCancelEdit}
                onSaveEdit={() => onSaveEdit(message.id)}
                onToggleMenu={() => onToggleMenu(message.id)}
                onRemove={() => onRemove(message.id)}
              />
            );
          })}
          <div ref={messageEndRef} />
        </div>
      )}
    </div>
  );
}
