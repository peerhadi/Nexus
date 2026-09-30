"use client";

import { useState } from "react";
import ConversationList from "@/components/user/dashboard/messages/conversation-list";
import ChatHeader from "@/components/user/dashboard/messages/chat-header";
import MessageList from "@/components/user/dashboard/messages/message-list";
import Composer from "@/components/user/dashboard/messages/composer";
import { conversations } from "@/components/user/dashboard/messages/data";

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState(0);

  const active = conversations[activeConversation];

  return (
    <div className="flex min-h-[calc(100vh-208px)] flex-col">
      {/* Page header */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-[-0.05em] text-slate-800 sm:text-5xl">
            Messages
          </h1>

          <p className="mt-2 max-w-xl text-[11px] font-medium leading-5 text-slate-400">
            Talk directly with the Nexus team about your projects, milestones,
            ideas, and changes.
          </p>
        </div>

        <div className="hidden items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 sm:flex">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-pink-400 text-[9px] font-black text-white shadow-md">
            N
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-emerald-50 bg-emerald-400" />
          </div>

          <div>
            <div className="text-[10px] font-black text-slate-700">
              Nexus Team
            </div>

            <div className="mt-0.5 text-[8px] font-bold text-emerald-500">
              Online now
            </div>
          </div>
        </div>
      </div>

      {/* Main messaging workspace */}
      <div className="flex min-h-0 flex-1 overflow-hidden rounded-[28px] border border-violet-100 bg-white shadow-[0_20px_70px_rgba(139,92,246,0.08)]">
        <ConversationList
          activeConversation={activeConversation}
          onSelect={setActiveConversation}
        />

        <section className="flex min-w-0 flex-1 flex-col">
          <ChatHeader activeConversation={activeConversation} />

          <MessageList />

          <Composer />
        </section>
      </div>
    </div>
  );
}
