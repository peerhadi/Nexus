"use client";

import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { conversations } from "./data";

interface ConversationListProps {
  activeConversation: number;
  onSelect: (index: number) => void;
}

export default function ConversationList({
  activeConversation,
  onSelect,
}: ConversationListProps) {
  return (
    <aside className="flex w-[320px] shrink-0 flex-col border-r border-violet-100 bg-gradient-to-b from-violet-50/80 via-white to-pink-50/60">
      <div className="border-b border-violet-100 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
              Inbox
            </div>

            <div className="mt-1 text-lg font-black tracking-tight text-slate-800">
              Conversations
            </div>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-pink-400 text-white shadow-md">
            <Sparkles size={15} />
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-xl border border-violet-100 bg-white px-3.5 py-3 shadow-sm">
          <Search size={14} className="shrink-0 text-violet-300" />

          <input
            placeholder="Search messages..."
            className="w-full bg-transparent text-[10px] font-bold text-slate-700 outline-none placeholder:text-slate-300"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="mb-2 px-2 text-[8px] font-black uppercase tracking-[0.18em] text-slate-300">
          Projects
        </div>

        {conversations.map((item, index) => {
          const selected = index === activeConversation;

          return (
            <motion.button
              key={item.id}
              onClick={() => onSelect(index)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.99 }}
              className={`relative mb-2 w-full rounded-2xl p-3.5 text-left transition ${
                selected
                  ? `border border-white bg-gradient-to-br ${item.background} shadow-md`
                  : "border border-transparent hover:bg-white"
              }`}
            >
              {selected && (
                <div
                  className={`absolute bottom-3 left-0 top-3 w-1 rounded-r-full bg-gradient-to-b ${item.gradient}`}
                />
              )}

              <div className="flex gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-[10px] font-black text-white shadow-md`}
                >
                  N
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate text-[11px] font-black text-slate-800">
                      {item.name}
                    </div>

                    <div className="shrink-0 text-[8px] font-bold text-slate-300">
                      {item.time}
                    </div>
                  </div>

                  <div className="mt-1 text-[8px] font-black uppercase tracking-[0.08em] text-violet-400">
                    {item.project}
                  </div>

                  <div className="mt-1.5 truncate text-[9px] font-medium text-slate-400">
                    {item.message}
                  </div>
                </div>

                {item.unread > 0 && (
                  <div className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-400 to-pink-400 px-1.5 text-[8px] font-black text-white">
                    {item.unread}
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="border-t border-violet-100 p-4">
        <div className="rounded-2xl bg-gradient-to-br from-violet-100 via-fuchsia-50 to-pink-100 p-4">
          <div className="text-[9px] font-black text-slate-700">
            Need something?
          </div>

          <div className="mt-1 text-[8px] font-medium leading-4 text-slate-400">
            Send the Nexus team a message and continue the conversation here.
          </div>
        </div>
      </div>
    </aside>
  );
}
