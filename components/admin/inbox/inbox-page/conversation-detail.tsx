"use client";

import {
  Archive,
  ChevronDown,
  MoreHorizontal,
  Paperclip,
  Send,
  Star,
  UserRound,
} from "lucide-react";
import type { Conversation, Status } from "@/lib/inbox/inbox-types";
import { getInitials } from "@/lib/inbox/inbox-utils";
import MetaPill from "./meta-pill";

type ConversationDetailProps = {
  conversation: Conversation;
  status: Status;
  reply: string;
  sent: boolean;
  onStatusChange: (status: Status) => void;
  onReplyChange: (reply: string) => void;
  onSendReply: () => void;
};

export default function ConversationDetail({
  conversation,
  status,
  reply,
  sent,
  onStatusChange,
  onReplyChange,
  onSendReply,
}: ConversationDetailProps) {
  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col">
      <div className="flex h-[74px] shrink-0 items-center justify-between border-b border-black/[0.08] bg-white px-5 sm:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/[0.06] text-[10px] font-bold">
            {getInitials(conversation.sender)}
          </div>

          <div className="min-w-0">
            <div className="truncate text-[12px] font-bold">
              {conversation.sender}
            </div>

            <div className="truncate text-[9px] text-black/35">
              {conversation.email}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-black/30 hover:bg-black/[0.05] hover:text-black"
          >
            <Star size={14} />
          </button>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-black/30 hover:bg-black/[0.05] hover:text-black"
          >
            <Archive size={14} />
          </button>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-black/30 hover:bg-black/[0.05] hover:text-black"
          >
            <MoreHorizontal size={15} />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-4xl px-5 py-6 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-[18px] font-bold tracking-[-0.04em]">
                {conversation.subject}
              </h2>

              <div className="mt-1 text-[9px] text-black/35">
                {conversation.received}
              </div>
            </div>

            <div className="relative shrink-0">
              <select
                value={status}
                onChange={(event) =>
                  onStatusChange(event.target.value as Status)
                }
                className="h-8 appearance-none rounded-lg border border-black/[0.08] bg-white pl-3 pr-7 text-[9px] font-bold outline-none"
              >
                <option value="New">New</option>
                <option value="Replied">Replied</option>
                <option value="Waiting">Waiting</option>
                <option value="Closed">Closed</option>
              </select>

              <ChevronDown
                size={11}
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-black/30"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <MetaPill label="Type" value={conversation.type} />
            <MetaPill label="Budget" value={conversation.budget} />
            <MetaPill label="Timeline" value={conversation.timeline} />
            <MetaPill label="Request" value={conversation.id} />
          </div>

          <div className="mt-6 rounded-2xl border border-black/[0.08] bg-white">
            <div className="flex items-center justify-between border-b border-black/[0.07] px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/[0.06]">
                  <UserRound size={12} />
                </div>

                <div>
                  <div className="text-[10px] font-bold">
                    {conversation.sender}
                  </div>

                  <div className="text-[8px] text-black/30">
                    {conversation.email}
                  </div>
                </div>
              </div>

              <span className="text-[8px] text-black/25">
                {conversation.received}
              </span>
            </div>

            <div className="px-5 py-5">
              <p className="whitespace-pre-line text-[12px] leading-6 text-black/65">
                {conversation.message}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-black/[0.08] bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-black/30">
                Reply as Nexus
              </span>

              {sent && (
                <span className="text-[9px] font-bold text-black/45">
                  Reply sent
                </span>
              )}
            </div>

            <textarea
              value={reply}
              onChange={(event) => onReplyChange(event.target.value)}
              placeholder="Write a reply..."
              rows={5}
              className="w-full resize-none rounded-xl border border-black/[0.08] bg-[#fafaf8] p-3 text-[11px] leading-5 outline-none placeholder:text-black/25 focus:border-black/20 focus:bg-white"
            />

            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-black/30 hover:bg-black/[0.05] hover:text-black"
              >
                <Paperclip size={14} />
              </button>

              <button
                type="button"
                onClick={onSendReply}
                disabled={!reply.trim()}
                className="flex items-center gap-2 rounded-xl bg-[#111] px-3.5 py-2.5 text-[10px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_7px_18px_rgba(0,0,0,0.12)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                <Send size={12} />
                Send reply
              </button>
            </div>
          </div>

          <div className="h-8" />
        </div>
      </div>
    </section>
  );
}
