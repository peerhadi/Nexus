import { Clock3, Mail } from "lucide-react";

import type { Conversation } from "@/lib/inbox/inbox-types";

type ArchiveMessageProps = {
  item: Conversation;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ArchiveMessage({ item }: ArchiveMessageProps) {
  const clientName = item.client?.name ?? "Unknown client";
  const clientEmail = item.client?.email ?? "";

  const messages = item.messages ?? [];

  return (
    <div className="group relative mt-7 overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.035)]">
      <div className="absolute left-0 top-0 h-full w-[2px] bg-black/[0.08]" />

      <div className="flex min-h-[72px] items-center justify-between border-b border-black/[0.07] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/[0.06] bg-[#f7f7f5]">
            <Mail size={13} className="text-black/55" />
          </div>

          <div>
            <div className="text-[11px] font-bold">{clientName}</div>

            <div className="mt-0.5 text-[8px] text-black/30">{clientEmail}</div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 text-[8px] text-black/25">
          <Clock3 size={10} />
          {formatDate(item.updatedAt)}
        </div>
      </div>

      <div className="min-h-[220px] px-6 py-8">
        <div className="mb-5 flex items-center gap-2">
          <div className="text-[8px] font-bold uppercase tracking-[0.16em] text-black/25">
            Conversation
          </div>

          <div className="h-px w-10 bg-black/[0.08]" />
        </div>

        {messages.length === 0 ? (
          <p className="text-[9px] text-black/30">
            No messages in this conversation.
          </p>
        ) : (
          <div className="space-y-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className="rounded-xl border border-black/[0.06] bg-[#f7f7f5] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-black/35">
                    {message.senderType}
                  </span>

                  <span className="text-[7px] text-black/25">
                    {formatDate(message.createdAt)}
                  </span>
                </div>

                <p className="mt-2 whitespace-pre-line text-[12px] leading-6 tracking-[-0.005em] text-black/65">
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
