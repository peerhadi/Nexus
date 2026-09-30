"use client";

import { Mail, Search } from "lucide-react";
import type { Conversation } from "@/lib/inbox/inbox-types";
import { getInitials } from "@/lib/inbox/inbox-utils";

type ConversationListProps = {
  conversations: Conversation[];
  selectedId: string;
  search: string;
  onSearchChange: (value: string) => void;
  onSelect: (conversation: Conversation) => void;
};

export default function ConversationList({
  conversations,
  selectedId,
  search,
  onSearchChange,
  onSelect,
}: ConversationListProps) {
  return (
    <section className="flex w-[360px] shrink-0 min-h-0 flex-col border-r border-black/[0.08] bg-white">
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

      <div className="min-h-0 flex-1 overflow-y-auto">
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
                    {getInitials(conversation.sender)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[11px] font-bold">
                        {conversation.sender}
                      </span>

                      <span className="shrink-0 text-[8px] text-black/30">
                        {conversation.received}
                      </span>
                    </div>

                    <div className="mt-1 truncate text-[10px] font-semibold text-black/55">
                      {conversation.subject}
                    </div>

                    <div className="mt-1 line-clamp-2 text-[9px] leading-4 text-black/30">
                      {conversation.message}
                    </div>

                    <div className="mt-2 flex items-center gap-1.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[8px] font-bold ${
                          conversation.status === "New"
                            ? "bg-[#111] text-white"
                            : conversation.status === "Replied"
                              ? "bg-black/[0.07] text-black/50"
                              : "bg-black/[0.04] text-black/35"
                        }`}
                      >
                        {conversation.status}
                      </span>

                      <span className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[8px] font-semibold text-black/35">
                        {conversation.type}
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
