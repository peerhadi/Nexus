"use client";

import { motion } from "framer-motion";

import type { Conversation } from "@/lib/inbox/inbox-types";
import ConversationList from "./conversation-list";

type InboxDesktopListProps = {
  conversations: Conversation[];
  selectedId: string;
  search: string;
  onSearchChange: (value: string) => void;
  onSelect: (conversation: Conversation) => void;
};

export default function InboxDesktopList({
  conversations,
  selectedId,
  search,
  onSearchChange,
  onSelect,
}: InboxDesktopListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.25,
        delay: 0.04,
        ease: "easeOut",
      }}
      className="hidden min-h-0 shrink-0 lg:block"
    >
      <ConversationList
        conversations={conversations}
        selectedId={selectedId}
        search={search}
        onSearchChange={onSearchChange}
        onSelect={onSelect}
      />
    </motion.div>
  );
}
