"use client";

import { motion } from "framer-motion";
import { Menu } from "lucide-react";

import type { Conversation, ConversationStatus } from "@/lib/inbox/inbox-types";
import ConversationDetail from "./conversation-detail";

type InboxDetailPanelProps = {
  conversation: Conversation;
  status: ConversationStatus;
  reply: string;
  sent: boolean;
  onStatusChange: (status: ConversationStatus) => void;
  onReplyChange: (reply: string) => void;
  onSendReply: () => void;
  onOpenMenu: () => void;
};

export default function InboxDetailPanel({
  conversation,
  status,
  reply,
  sent,
  onStatusChange,
  onReplyChange,
  onSendReply,
  onOpenMenu,
}: InboxDetailPanelProps) {
  return (
    <motion.div
      key={conversation.id}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -6 }}
      transition={{
        duration: 0.18,
        ease: "easeOut",
      }}
      className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden"
    >
      {/* Mobile toolbar */}
      <div className="flex h-[58px] shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 lg:hidden">
        <button
          type="button"
          aria-label="Open conversation menu"
          onClick={onOpenMenu}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
            {conversation.subject || "Conversation"}
          </p>

          <p className="truncate text-[11px] text-[var(--text-muted)]">
            {conversation.client.name} · {conversation.client.email}
          </p>
        </div>

        <span className="hidden shrink-0 rounded-full bg-[var(--surface-hover)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--text-tertiary)] sm:inline">
          {conversation.status.replace("_", " ")}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <ConversationDetail
          conversation={conversation}
          status={status}
          reply={reply}
          sent={sent}
          onStatusChange={onStatusChange}
          onReplyChange={onReplyChange}
          onSendReply={onSendReply}
        />
      </div>
    </motion.div>
  );
}
