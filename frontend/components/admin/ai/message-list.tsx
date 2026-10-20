"use client";

import { Check, LoaderCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { formatTime, initials, normalizeMessageRole, visibleMessageContent } from "./format";
import { MessageContent } from "./message-content";
import type { AIMessage, User } from "./types";

export function MessageList({
  messages,
  user,
  sending,
  loadingMessages,
  bottomRef,
}: {
  messages: AIMessage[];
  user: User | null;
  sending: boolean;
  loadingMessages: boolean;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-8 pt-7 sm:px-8 lg:px-12">
      {loadingMessages && (
        <div className="mb-4 flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> Loading
          conversation…
        </div>
      )}
      {messages.map((message, index) => {
        const isUser = normalizeMessageRole(message.role) === "USER";
        return (
          <motion.article
            key={message.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className={`mb-7 flex gap-3 sm:gap-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
          >
            <div
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl border ${isUser ? "border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)]" : "border-[var(--accent-border,var(--border))] bg-[var(--accent-subtle)] text-[var(--accent)]"}`}
            >
              {isUser ? (
                <span className="text-[10px] font-bold">{initials(user)}</span>
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
            </div>
            <div
              className={`min-w-0 max-w-[88%] sm:max-w-[82%] ${isUser ? "text-right" : "text-left"}`}
            >
              <div
                className={`mb-2 flex items-center gap-2 text-[10px] font-semibold text-[var(--text-muted)] ${isUser ? "justify-end" : ""}`}
              >
                <span>{isUser ? "You" : "Nexus Admin AI"}</span>
                <span>·</span>
                <span>{formatTime(message.createdAt)}</span>
                {index === messages.length - 1 && !isUser && (
                  <span className="inline-flex items-center gap-1 text-[var(--success)]">
                    <Check className="h-3 w-3" /> Response
                  </span>
                )}
              </div>
              {isUser ? (
                <div className="inline-block whitespace-pre-wrap rounded-2xl rounded-tr-md border border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-3 text-left text-sm leading-6">
                  {message.content}
                </div>
              ) : (
                <MessageContent content={visibleMessageContent(message.content)} />
              )}
            </div>
          </motion.article>
        );
      })}
      {sending && <ThinkingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}

function ThinkingIndicator() {
  return (
    <div className="mb-7 flex gap-3 sm:gap-4">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-[var(--accent-border,var(--border))] bg-[var(--accent-subtle)] text-[var(--accent)]">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="pt-1">
        <p className="mb-2 text-[10px] font-semibold text-[var(--text-muted)]">
          Nexus Admin AI is thinking
        </p>
        <div className="flex max-w-[100px] items-center gap-1.5 rounded-full bg-[var(--surface-secondary)] px-3 py-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)] [animation-delay:120ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)] [animation-delay:240ms]" />
        </div>
      </div>
    </div>
  );
}
