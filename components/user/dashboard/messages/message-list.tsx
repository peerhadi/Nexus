"use client";

import { motion } from "framer-motion";
import { CheckCheck } from "lucide-react";
import { messages } from "./data";

export default function MessageList() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-gradient-to-br from-white via-violet-50/20 to-pink-50/30">
      <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-8 py-8 lg:px-14">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-violet-100" />

          <div className="rounded-full border border-violet-100 bg-white px-4 py-1.5 text-[8px] font-black uppercase tracking-[0.18em] text-violet-300 shadow-sm">
            Today
          </div>

          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-100" />
        </div>

        <div className="space-y-7">
          {messages.map((item, index) => {
            const isUser = item.sender === "user";

            return (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex max-w-[680px] items-end gap-3 ${
                    isUser ? "flex-row-reverse" : ""
                  }`}
                >
                  {!isUser && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-pink-400 text-[8px] font-black text-white shadow-sm">
                      N
                    </div>
                  )}

                  <div>
                    <div
                      className={`rounded-[20px] px-5 py-4 ${
                        isUser
                          ? "rounded-br-sm bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-violet-200/30"
                          : "rounded-bl-sm border border-violet-100 bg-white text-slate-500 shadow-sm"
                      }`}
                    >
                      <p
                        className={`text-[11px] leading-6 ${
                          isUser ? "text-white/90" : "text-slate-500"
                        }`}
                      >
                        {item.text}
                      </p>
                    </div>

                    <div
                      className={`mt-2 flex items-center gap-1.5 text-[8px] font-bold text-slate-300 ${
                        isUser ? "justify-end" : ""
                      }`}
                    >
                      {item.time}

                      {isUser && (
                        <CheckCheck size={11} className="text-violet-400" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
