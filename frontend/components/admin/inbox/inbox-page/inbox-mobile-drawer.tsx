"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import type { Conversation } from "@/lib/inbox/inbox-types";
import ConversationList from "./conversation-list";

type InboxMobileDrawerProps = {
  open: boolean;
  conversations: Conversation[];
  selectedId: string;
  search: string;
  onSearchChange: (value: string) => void;
  onSelect: (conversation: Conversation) => void;
  onClose: () => void;
};

export default function InboxMobileDrawer({
  open,
  conversations,
  selectedId,
  search,
  onSearchChange,
  onSelect,
  onClose,
}: InboxMobileDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close conversation menu"
            className="fixed inset-0 z-40 bg-[var(--overlay)] backdrop-blur-[2px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />

          {/* Sliding drawer */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 340,
              damping: 32,
              mass: 0.8,
            }}
            className="fixed inset-y-0 left-0 z-50 flex w-[min(90vw,400px)] flex-col border-r border-[var(--border)] bg-[var(--surface)] shadow-2xl lg:hidden"
          >
            {/* Drawer header */}
            <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-[var(--border)] px-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Inbox
                </p>

                <p className="text-sm font-semibold text-[var(--text-secondary)]">
                  {conversations.length} conversation
                  {conversations.length === 1 ? "" : "s"}
                </p>
              </div>

              <button
                type="button"
                aria-label="Close conversation menu"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Conversation list */}
            <div className="min-h-0 flex-1 overflow-hidden">
              <ConversationList
                conversations={conversations}
                selectedId={selectedId}
                search={search}
                onSearchChange={onSearchChange}
                onSelect={onSelect}
              />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
