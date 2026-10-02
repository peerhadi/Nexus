"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Paperclip, Send, Smile } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

interface ComposerProps {
  conversationId: string;
  onMessageSent?: () => void;
}

export default function Composer({
  conversationId,
  onMessageSent,
}: ComposerProps) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const sendMessage = async () => {
    const content = message.trim();

    if (!content || sending) return;

    try {
      const token =
        localStorage.getItem("nexus_token") ??
        sessionStorage.getItem("nexus_token");

      if (!token) return;

      setSending(true);

      const response = await fetch(
        `${API_URL}/messages/conversation/${conversationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content,
          }),
        },
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to send message");
      }

      setMessage("");
      onMessageSent?.();
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  return (
    <div className="shrink-0 border-t border-violet-100 bg-white px-6 py-5 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex min-h-[64px] items-center gap-2 rounded-[20px] border border-violet-100 bg-white p-2 shadow-[0_8px_30px_rgba(139,92,246,0.07)]">
          <button
            type="button"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] text-slate-300 transition hover:bg-violet-50 hover:text-violet-500"
          >
            <Paperclip size={17} />
          </button>

          <div className="flex min-h-12 flex-1 items-center px-2">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write a message..."
              rows={1}
              disabled={sending}
              className="block max-h-24 min-h-6 w-full resize-none overflow-y-auto bg-transparent py-2 text-[15px] font-medium leading-5 text-slate-700 outline-none placeholder:text-slate-300 disabled:opacity-50"
            />
          </div>

          <button
            type="button"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] text-slate-300 transition hover:bg-pink-50 hover:text-pink-500"
          >
            <Smile size={17} />
          </button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => void sendMessage()}
            disabled={!message.trim() || sending}
            className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-[15px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 px-5 text-[9px] font-black text-white shadow-md shadow-violet-200 transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="hidden sm:inline">
              {sending ? "Sending..." : "Send"}
            </span>
            <Send size={14} />
          </motion.button>
        </div>

        <div className="mt-2 flex items-center justify-between px-2 text-[8px] font-bold text-slate-300">
          <span>Messages are connected to your project.</span>

          <span className="hidden sm:block">
            Enter to send · Shift + Enter for new line
          </span>
        </div>
      </div>
    </div>
  );
}
