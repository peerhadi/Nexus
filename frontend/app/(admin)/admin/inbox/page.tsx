"use client";

import InboxHeader from "@/components/admin/inbox/inbox-page/inbox-header";
import InboxErrorState from "@/components/admin/inbox/inbox-page/inbox-error-state";
import InboxWorkspace from "@/components/admin/inbox/inbox-page/inbox-workspace";
import { useInboxPage } from "@/components/admin/inbox/inbox-page/use-inbox-page";

export default function InboxPage() {
  const {
    error,
    filteredConversations,
    mobileDrawerOpen,
    reply,
    search,
    selectConversation,
    selectedConversation,
    sendReply,
    sent,
    setMobileDrawerOpen,
    setReply,
    setSearch,
    updateConversationStatus,
  } = useInboxPage();

  if (error) {
    return <InboxErrorState error={error} />;
  }

  return (
    <main className="flex h-dvh w-full min-w-0 flex-col overflow-hidden">
      {/* =========================
          HEADER
      ========================== */}
      <InboxHeader />

      <InboxWorkspace
        conversations={filteredConversations}
        selectedConversation={selectedConversation}
        search={search}
        reply={reply}
        sent={sent}
        mobileDrawerOpen={mobileDrawerOpen}
        onSearchChange={setSearch}
        onSelect={selectConversation}
        onOpenMenu={() => setMobileDrawerOpen(true)}
        onCloseMenu={() => setMobileDrawerOpen(false)}
        onStatusChange={updateConversationStatus}
        onReplyChange={setReply}
        onSendReply={sendReply}
      />
    </main>
  );
}
