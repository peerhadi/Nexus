"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  MoreHorizontal,
  Paperclip,
  Send,
  Star,
  UserRound,
} from "lucide-react";
import type { Conversation, ConversationStatus } from "@/lib/inbox/inbox-types";

type ConversationDetailProps = {
  conversation: Conversation;
  status: ConversationStatus;
  reply: string;
  sent: boolean;
  onStatusChange: (status: ConversationStatus) => void;
  onReplyChange: (reply: string) => void;
  onSendReply: () => void;
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(date: string) {
  return new Date(date).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function ConversationDetail({
  conversation,
  status,
  reply,
  sent,
  onStatusChange,
  onReplyChange,
  onSendReply,
}: ConversationDetailProps) {
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesRef.current;

    if (!container) {
      return;
    }

    const scrollToBottom = () => {
      container.scrollTop = container.scrollHeight;
    };

    const frame1 = requestAnimationFrame(() => {
      scrollToBottom();

      const frame2 = requestAnimationFrame(() => {
        scrollToBottom();
      });

      setTimeout(() => {
        scrollToBottom();
      }, 250);

      return () => cancelAnimationFrame(frame2);
    });

    return () => {
      cancelAnimationFrame(frame1);
    };
  }, [conversation.id, conversation.messages?.length]);

  return (
    <section className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      {/* Header stays outside animation */}
      <div className="flex h-[74px] shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-5 sm:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-hover)] text-[10px] font-bold">
            {getInitials(conversation.client.name)}
          </div>

          <div className="min-w-0">
            <div className="truncate text-[12px] font-bold">
              {conversation.client.name}
            </div>

            <div className="truncate text-[9px] text-[var(--text-muted)]">
              {conversation.client.email}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
          >
            <Star size={14} />
          </button>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
          >
            <MoreHorizontal size={15} />
          </button>
        </div>
      </div>

      {/* THIS stays mounted permanently */}
      <div ref={messagesRef} className="min-h-0 flex-1 overflow-y-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={conversation.id}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="mx-auto w-full max-w-4xl px-5 py-6 sm:px-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="text-[18px] font-bold tracking-[-0.04em]">
                  {conversation.subject || "Conversation"}
                </h2>

                <div className="mt-1 text-[9px] text-[var(--text-muted)]">
                  Updated {formatDate(conversation.updatedAt)}
                </div>
              </div>

              <div className="relative shrink-0">
                <select
                  value={status}
                  onChange={(event) =>
                    onStatusChange(event.target.value as ConversationStatus)
                  }
                  className="h-8 appearance-none rounded-lg border border-[var(--border)] bg-[var(--surface)] pl-3 pr-7 text-[9px] font-bold outline-none"
                >
                  <option value="OPEN">Open</option>
                  <option value="CLOSED">Closed</option>
                </select>

                <ChevronDown
                  size={11}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <div className="rounded-full bg-[var(--surface-hover)] px-2.5 py-1 text-[8px] font-semibold text-[var(--text-tertiary)]">
                {conversation.client.email}
              </div>

              <div className="rounded-full bg-[var(--surface-hover)] px-2.5 py-1 text-[8px] font-semibold text-[var(--text-tertiary)]">
                {conversation.id}
              </div>

              <div className="rounded-full bg-[var(--surface-hover)] px-2.5 py-1 text-[8px] font-semibold text-[var(--text-tertiary)]">
                {conversation.messages?.length}{" "}
                {conversation.messages?.length === 1 ? "message" : "messages"}
              </div>
            </div>

            <div className="mt-6 space-y-4 pb-6">
              {conversation.messages.map((message) => {
                const isAdmin = message.senderType === "ADMIN";

                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.18,
                      ease: "easeOut",
                    }}
                    className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] ${
                      isAdmin ? "ml-8" : "mr-8"
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--surface-hover)]">
                          <UserRound size={12} />
                        </div>

                        <div>
                          <div className="text-[10px] font-bold">
                            {isAdmin ? "Nexus" : conversation.client.name}
                          </div>

                          <div className="text-[8px] text-[var(--text-muted)]">
                            {isAdmin ? "Nexus team" : conversation.client.email}
                          </div>
                        </div>
                      </div>

                      <span className="text-[8px] text-[var(--text-muted)]">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>

                    <div className="px-5 py-5">
                      <p className="whitespace-pre-line text-[12px] leading-6 text-[var(--text-secondary)]">
                        {message.content}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Reply area stays outside animation */}
      <div className="shrink-0 border-t border-[var(--border)] bg-[var(--surface)] px-5 py-4 sm:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Reply as Nexus
            </span>

            {sent && (
              <span className="text-[9px] font-bold text-[var(--text-tertiary)]">
                Reply sent
              </span>
            )}
          </div>

          <textarea
            value={reply}
            onChange={(event) => onReplyChange(event.target.value)}
            placeholder="Write a reply..."
            rows={3}
            className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--background)] p-3 text-[11px] leading-5 outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--border-strong)] focus:bg-[var(--surface)]"
          />

          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
            >
              <Paperclip size={14} />
            </button>

            <button
              type="button"
              onClick={onSendReply}
              disabled={!reply.trim()}
              className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-3.5 py-2.5 text-[10px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_7px_18px_rgba(0,0,0,0.12)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              <Send size={12} />
              Send reply
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
