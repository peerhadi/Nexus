"use client";

import { useState } from "react";
import {
  ArrowUp,
  Bot,
  Copy,
  MessageSquare,
  Plus,
  Sparkles,
  User,
} from "lucide-react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  {
    title: "Explain something",
    text: "Explain a concept in a simple way",
  },
  {
    title: "Brainstorm ideas",
    text: "Help me come up with ideas for a project",
  },
  {
    title: "Write something",
    text: "Help me write something clearly",
  },
  {
    title: "Analyze something",
    text: "Help me understand or analyze something",
  },
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = (text?: string) => {
    const value = (text ?? input).trim();

    if (!value) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: value,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");

    setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "I'm currently running in preview mode. Connect an AI provider to enable real responses.",
      };

      setMessages((current) => [...current, assistantMessage]);
    }, 500);
  };

  return (
    <main className="flex h-[calc(100vh-70px)] min-h-0 overflow-hidden bg-[#fafafa] text-slate-800">
      {/* Chat history */}
      <aside className="hidden w-[245px] shrink-0 border-r border-black/[0.05] bg-white/70 p-4 lg:flex lg:flex-col">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
              Nexus AI
            </div>
            <div className="mt-1 text-[13px] font-black text-slate-700">
              Conversations
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMessages([])}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-black/[0.06] bg-white text-slate-400 hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-500"
          >
            <Plus size={15} />
          </button>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-3 rounded-xl bg-cyan-50 px-3 py-2.5">
            <MessageSquare size={14} className="text-cyan-500" />

            <div className="min-w-0 flex-1">
              <div className="truncate text-[10px] font-black text-slate-700">
                New conversation
              </div>
              <div className="mt-0.5 text-[8px] text-slate-400">Just now</div>
            </div>
          </div>
        </div>

        <div className="mt-auto rounded-2xl border border-black/[0.05] bg-gradient-to-br from-cyan-50 to-violet-50 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-cyan-500 shadow-sm">
            <Sparkles size={15} />
          </div>

          <div className="mt-3 text-[10px] font-black text-slate-700">
            Nexus AI
          </div>

          <p className="mt-1 text-[8px] font-medium leading-4 text-slate-400">
            Your intelligent workspace assistant.
          </p>
        </div>
      </aside>

      {/* Main chat */}
      <section className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex h-[68px] shrink-0 items-center justify-between border-b border-black/[0.05] bg-white/75 px-5 backdrop-blur-xl sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-white shadow-[0_5px_18px_rgba(34,211,238,0.2)]">
              <Bot size={17} />
            </div>

            <div>
              <div className="text-[11px] font-black text-slate-700">
                Nexus AI
              </div>

              <div className="mt-0.5 flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.12em] text-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Ready
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMessages([])}
            className="rounded-xl px-3 py-2 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400 hover:bg-black/[0.03] hover:text-slate-600"
          >
            New chat
          </button>
        </header>

        {/* Messages */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex min-h-full items-center justify-center px-5 py-12">
              <div className="w-full max-w-2xl">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-white shadow-[0_12px_35px_rgba(34,211,238,0.2)]">
                  <Sparkles size={24} />
                </div>

                <div className="mt-6 text-center">
                  <h1 className="text-3xl font-black tracking-[-0.05em] text-slate-800 sm:text-4xl">
                    What can I help you with?
                  </h1>

                  <p className="mx-auto mt-3 max-w-md text-[11px] font-medium leading-5 text-slate-400">
                    Ask questions, explore ideas, analyze information, or create
                    something new with Nexus AI.
                  </p>
                </div>

                <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.title}
                      type="button"
                      onClick={() => sendMessage(suggestion.text)}
                      className="group rounded-2xl border border-black/[0.06] bg-white p-4 text-left shadow-[0_8px_30px_rgba(0,0,0,0.025)] hover:border-cyan-200 hover:bg-cyan-50/30"
                    >
                      <div className="text-[10px] font-black text-slate-700 group-hover:text-cyan-500">
                        {suggestion.title}
                      </div>

                      <div className="mt-1.5 text-[9px] font-medium leading-4 text-slate-400">
                        {suggestion.text}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-3xl space-y-7 px-5 py-8 sm:px-8">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-white">
                      <Bot size={14} />
                    </div>
                  )}

                  <div
                    className={`max-w-[75%] ${
                      message.role === "user"
                        ? "rounded-2xl rounded-tr-md bg-slate-800 px-4 py-3 text-white"
                        : "rounded-2xl rounded-tl-md border border-black/[0.05] bg-white px-4 py-3 shadow-[0_6px_25px_rgba(0,0,0,0.025)]"
                    }`}
                  >
                    <p
                      className={`whitespace-pre-wrap text-[11px] font-medium leading-5 ${
                        message.role === "user"
                          ? "text-white"
                          : "text-slate-600"
                      }`}
                    >
                      {message.content}
                    </p>

                    {message.role === "assistant" && (
                      <button
                        type="button"
                        className="mt-3 flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.1em] text-slate-300 hover:text-cyan-500"
                        onClick={() =>
                          navigator.clipboard?.writeText(message.content)
                        }
                      >
                        <Copy size={11} />
                        Copy
                      </button>
                    )}
                  </div>

                  {message.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                      <User size={14} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="shrink-0 border-t border-black/[0.05] bg-white/80 px-4 py-4 backdrop-blur-xl sm:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-end gap-2 rounded-2xl border border-black/[0.07] bg-white p-2 shadow-[0_10px_35px_rgba(0,0,0,0.04)] focus-within:border-cyan-300">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Message Nexus AI..."
                rows={1}
                className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent px-3 py-2.5 text-[11px] font-medium text-slate-700 outline-none placeholder:text-slate-300"
              />

              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-white disabled:cursor-not-allowed disabled:opacity-30 hover:bg-cyan-500"
              >
                <ArrowUp size={16} />
              </button>
            </div>

            <p className="mt-2 text-center text-[8px] font-medium text-slate-300">
              Nexus AI can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
