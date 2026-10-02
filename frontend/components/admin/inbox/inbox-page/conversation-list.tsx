"use client";

import { Mail, Search } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Conversation } from "@/lib/inbox/inbox-types";

type ConversationListProps = {
  conversations: Conversation[];
  selectedId: string;
  search: string;
  onSearchChange: (value: string) => void;
  onSelect: (conversation: Conversation) => void;
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
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function ConversationList({
  conversations,
  selectedId,
  search,
  onSearchChange,
  onSelect,
}: ConversationListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;

    if (!list || conversations.length === 0) {
      return;
    }

    const scrollToBottom = () => {
      list.scrollTop = list.scrollHeight;
    };

    const frame = requestAnimationFrame(() => {
      scrollToBottom();

      requestAnimationFrame(() => {
        scrollToBottom();
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [conversations]);

  return (
    <section className="flex min-h-0 w-[360px] shrink-0 flex-col border-r border-black/[0.08] bg-white">
      <div className="shrink-0 border-b border-black/[0.07] p-3">
        <div className="relative">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black/25"
          />

          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search conversations..."
            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#f7f7f5] pl-9 pr-3 text-[10px] outline-none placeholder:text-black/25 focus:border-black/20 focus:bg-white"
          />
        </div>
      </div>

      <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto ">
        {conversations.length === 0 ? (
          <div className="flex h-full items-center justify-center px-8 text-center">
            <div>
              <Mail size={20} className="mx-auto text-black/20" />

              <div className="mt-3 text-[11px] font-bold">No conversations</div>

              <div className="mt-1 text-[10px] text-black/35">
                Try a different search.
              </div>
            </div>
          </div>
        ) : (
          conversations.map((conversation) => {
            const isSelected = conversation.id === selectedId;
            const latestMessage =
              conversation.messages?.[conversation.messages.length - 1];

            return (
              <button
                key={conversation.id}
                type="button"
                onClick={() => onSelect(conversation)}
                className={`w-full border-b border-black/[0.06] px-4 py-4 text-left transition-colors ${
                  isSelected ? "bg-black/[0.045]" : "hover:bg-black/[0.025]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold ${
                      isSelected
                        ? "bg-[#111] text-white"
                        : "bg-black/[0.06] text-black/55"
                    }`}
                  >
                    {getInitials(conversation.client?.name)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[11px] font-bold">
                        {conversation.client.name}
                      </span>

                      <span className="shrink-0 text-[8px] text-black/30">
                        {formatDate(conversation.updatedAt)}
                      </span>
                    </div>

                    <div className="mt-0.5 truncate text-[9px] font-medium text-black/35">
                      {conversation.client.email}
                    </div>

                    {conversation.subject && (
                      <div className="mt-1 truncate text-[10px] font-semibold text-black/55">
                        {conversation.subject}
                      </div>
                    )}

                    {latestMessage && (
                      <div className="mt-1 line-clamp-2 text-[9px] leading-4 text-black/30">
                        {latestMessage.content}
                      </div>
                    )}

                    <div className="mt-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[8px] font-bold ${
                          conversation.status === "OPEN"
                            ? "bg-[#111] text-white"
                            : "bg-black/[0.06] text-black/45"
                        }`}
                      >
                        {conversation.status === "OPEN" ? "Open" : "Closed"}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </section>
  );
}
