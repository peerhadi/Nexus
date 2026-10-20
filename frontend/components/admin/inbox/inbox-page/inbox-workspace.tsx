"use client";

import { AnimatePresence } from "framer-motion";

import type { Conversation, ConversationStatus } from "@/lib/inbox/inbox-types";
import InboxDesktopList from "./inbox-desktop-list";
import InboxDetailPanel from "./inbox-detail-panel";
import InboxEmptyDetail from "./inbox-empty-detail";
import InboxMobileDrawer from "./inbox-mobile-drawer";

type InboxWorkspaceProps = {
  conversations: Conversation[];
  selectedConversation: Conversation | undefined;
  search: string;
  reply: string;
  sent: boolean;
  mobileDrawerOpen: boolean;
  onSearchChange: (value: string) => void;
  onSelect: (conversation: Conversation) => void;
  onOpenMenu: () => void;
  onCloseMenu: () => void;
  onStatusChange: (status: ConversationStatus) => void;
  onReplyChange: (reply: string) => void;
  onSendReply: () => void;
};

export default function InboxWorkspace({
  conversations,
  selectedConversation,
  search,
  reply,
  sent,
  mobileDrawerOpen,
  onSearchChange,
  onSelect,
  onOpenMenu,
  onCloseMenu,
  onStatusChange,
  onReplyChange,
  onSendReply,
}: InboxWorkspaceProps) {
  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 overflow-hidden">
      {/* =========================
          DESKTOP CONVERSATION LIST
      ========================== */}
      <InboxDesktopList
        conversations={conversations}
        selectedId={selectedConversation?.id ?? ""}
        search={search}
        onSearchChange={onSearchChange}
        onSelect={onSelect}
      />

      {/* =========================
          MOBILE DRAWER
      ========================== */}
      <InboxMobileDrawer
        open={mobileDrawerOpen}
        conversations={conversations}
        selectedId={selectedConversation?.id ?? ""}
        search={search}
        onSearchChange={onSearchChange}
        onSelect={onSelect}
        onClose={onCloseMenu}
      />

      {/* =========================
          CONVERSATION DETAIL
      ========================== */}
      <AnimatePresence mode="wait" initial={false}>
        {selectedConversation ? (
          <InboxDetailPanel
            key={selectedConversation.id}
            conversation={selectedConversation}
            status={selectedConversation.status}
            reply={reply}
            sent={sent}
            onStatusChange={onStatusChange}
            onReplyChange={onReplyChange}
            onSendReply={onSendReply}
            onOpenMenu={onOpenMenu}
          />
        ) : (
          <InboxEmptyDetail />
        )}
      </AnimatePresence>
    </div>
  );
}
