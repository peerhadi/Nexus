"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Archive, Clock3 } from "lucide-react";
import { conversations } from "@/lib/inbox/inbox-data";
import type { Conversation, Status } from "@/lib/inbox/inbox-types";
import { filterConversations } from "@/lib/inbox/inbox-utils";
import ConversationList from "@/components/admin/inbox/inbox-page/conversation-list";
import ConversationDetail from "@/components/admin/inbox/inbox-page/conversation-detail";

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState("REQ-001");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<Status>("New");
  const [reply, setReply] = useState("");
  const [sent, setSent] = useState(false);

  const filteredConversations = useMemo(
    () => filterConversations(conversations, search),
    [search],
  );

  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedId) ??
    conversations[0];

  function selectConversation(conversation: Conversation) {
    setSelectedId(conversation.id);
    setStatus(conversation.status);
    setReply("");
    setSent(false);
  }

  function sendReply() {
    if (!reply.trim()) return;

    setSent(true);
    setReply("");
    setStatus("Replied");

    setTimeout(() => {
      setSent(false);
    }, 2200);
  }

  return (
    <main className="min-h-screen w-[100vw] overflow-hidden bg-[#f7f7f5] text-[#111]">
      <div className="flex min-h-screen flex-col">
        <header className="flex h-[74px] shrink-0 items-center justify-between border-b border-black/[0.08] bg-white/85 px-5 backdrop-blur-xl sm:px-8">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[21px] font-bold tracking-[-0.045em]">
                Inbox
              </h1>

              <span className="rounded-full bg-black/[0.06] px-2 py-0.5 text-[9px] font-bold text-black/45">
                {conversations.length}
              </span>
            </div>

            <p className="mt-0.5 text-[10px] text-black/35">
              Client conversations
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/inbox/requests"
              className="hidden items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-2.5 py-2 text-[9px] font-semibold text-black/45 transition-colors hover:bg-black/[0.03] hover:text-black sm:flex"
            >
              <Clock3 size={12} />
              Requests
            </Link>

            <Link
              href="/inbox/archive"
              className="hidden items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-2.5 py-2 text-[9px] font-semibold text-black/45 transition-colors hover:bg-black/[0.03] hover:text-black sm:flex"
            >
              <Archive size={12} />
              Archive
            </Link>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <ConversationList
            conversations={filteredConversations}
            selectedId={selectedConversation.id}
            search={search}
            onSearchChange={setSearch}
            onSelect={selectConversation}
          />

          <ConversationDetail
            conversation={selectedConversation}
            status={status}
            reply={reply}
            sent={sent}
            onStatusChange={setStatus}
            onReplyChange={setReply}
            onSendReply={sendReply}
          />
        </div>
      </div>
    </main>
  );
}
