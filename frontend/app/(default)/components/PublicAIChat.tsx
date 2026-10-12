"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  Check,
  ChevronDown,
  MessageCircle,
  Plus,
  X,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const starters = [
  {
    title: "I've got an idea",
    description: "Let's turn it into something real.",
    message:
      "I've got an idea for a project, and I'd like to talk it through with you.",
  },
  {
    title: "Help me choose an approach",
    description: "Find the right solution for what I need.",
    message:
      "I have a goal in mind, but I'm not sure what kind of website, app, or digital solution would suit it best. Can you help me figure it out?",
  },
  {
    title: "Let's talk about working together",
    description: "Understand the process and next steps.",
    message:
      "I'd like to understand how working with Nexus works, from the first conversation to the finished project.",
  },
];

const panelTransition = {
  type: "spring" as const,
  stiffness: 360,
  damping: 32,
};

export default function PublicAIChat() {
  const reduceMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("nexus_public_ai_session");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setMessages(
            parsed.filter(
              (message): message is ChatMessage =>
                message &&
                typeof message.id === "string" &&
                (message.role === "user" || message.role === "assistant") &&
                typeof message.content === "string",
            ),
          );
        }
      }
    } catch {
      sessionStorage.removeItem("nexus_public_ai_session");
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    bottomRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "end",
    });

    inputRef.current?.focus();
  }, [messages, loading, open, reduceMotion]);

  useEffect(() => {
    try {
      sessionStorage.setItem(
        "nexus_public_ai_session",
        JSON.stringify(messages),
      );
    } catch {
      // Chat remains usable if session storage is unavailable.
    }
  }, [messages]);

  async function sendMessage(
    event?: FormEvent<HTMLFormElement>,
    suggestedMessage?: string,
  ) {
    event?.preventDefault();

    const content = (suggestedMessage ?? input).trim();

    if (!content || loading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/ai/public-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          history: messages.slice(-12).map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : "Unable to get a response. Please try again.",
        );
      }

      if (typeof data.reply !== "string" || !data.reply.trim()) {
        throw new Error("The assistant returned an empty response.");
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply.trim(),
        },
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  function startNewChat() {
    setMessages([]);
    setInput("");
    setError("");

    try {
      sessionStorage.removeItem("nexus_public_ai_session");
    } catch {
      // The new conversation still starts in memory.
    }

    inputRef.current?.focus();
  }

  const instant = reduceMotion ? { duration: 0 } : { duration: 0.18 };

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence initial={false}>
        {open && (
          <motion.section
            key="nexus-chat-panel"
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }
            }
            transition={panelTransition}
            aria-label="Chat with Nexus AI"
            className="flex h-[min(500px,calc(100dvh-110px))] w-[min(370px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] shadow-[var(--shadow-xl)]"
          >
            {/* Header */}
            <header className="flex shrink-0 items-center justify-between border-b border-[var(--border)] px-4 py-3.5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]">
                  <MessageCircle
                    size={17}
                    strokeWidth={1.8}
                    className="text-[var(--text-primary)]"
                  />
                </div>

                <div className="min-w-0">
                  <h2 className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">
                    Nexus AI
                  </h2>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                    Your project, figured out.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={startNewChat}
                  aria-label="Start a new conversation"
                  title="New conversation"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                >
                  <Plus size={17} strokeWidth={1.8} />
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                >
                  <X size={17} strokeWidth={1.8} />
                </button>
              </div>
            </header>

            {/* Conversation */}
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.length === 0 && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="pt-2"
                >
                  <p className="text-xs font-medium tracking-wide text-[var(--accent)]">
                    A QUICK CHAT WITH NEXUS
                  </p>

                  <h3 className="mt-3 text-[23px] font-semibold leading-tight tracking-tight text-[var(--text-primary)]">
                    Hey, what&apos;s on your mind?
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                    A website you&apos;ve been thinking about? An app idea? Or
                    just figuring out where to start? Tell me a little about it,
                    and we&apos;ll work it out together.
                  </p>

                  <div className="mt-5 space-y-2">
                    {starters.map((starter, index) => (
                      <motion.button
                        key={starter.title}
                        type="button"
                        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.22,
                          delay: reduceMotion ? 0 : index * 0.06,
                        }}
                        onClick={() =>
                          void sendMessage(undefined, starter.message)
                        }
                        disabled={loading}
                        className="group flex w-full items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-left transition-colors hover:border-[var(--accent)] hover:bg-[var(--surface-secondary)] disabled:opacity-50"
                      >
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-[var(--text-primary)]">
                            {starter.title}
                          </span>
                          <span className="mt-1 block text-xs leading-5 text-[var(--text-muted)]">
                            {starter.description}
                          </span>
                        </span>

                        <ArrowUp
                          size={16}
                          strokeWidth={1.8}
                          className="shrink-0 rotate-45 text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={instant}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={
                      message.role === "user"
                        ? "max-w-[86%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-[var(--surface-secondary)] px-3.5 py-2.5 text-sm leading-6 text-[var(--text-primary)]"
                        : "markdown-content max-w-[95%] break-words px-1 py-1 text-sm leading-6 text-[var(--text-primary)]"
                    }
                  >
                    {message.role === "user" ? (
                      message.content
                    ) : (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 px-1 py-2 text-xs text-[var(--text-muted)]"
                  role="status"
                  aria-label="Nexus AI is responding"
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
                  Thinking
                </motion.div>
              )}

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-[var(--danger)] bg-[var(--danger-soft)] px-3 py-2.5 text-xs leading-5 text-[var(--text-primary)]"
                >
                  <p>{error}</p>
                  <button
                    type="button"
                    onClick={() => {
                      const lastUserMessage = [...messages]
                        .reverse()
                        .find((message) => message.role === "user");

                      if (lastUserMessage) {
                        setMessages((current) => {
                          const index = current.findIndex(
                            (message) => message.id === lastUserMessage.id,
                          );

                          return index === -1
                            ? current
                            : current.slice(0, index);
                        });

                        void sendMessage(undefined, lastUserMessage.content);
                      } else {
                        setError("");
                      }
                    }}
                    className="mt-1 font-medium underline underline-offset-2"
                  >
                    Try again
                  </button>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Composer */}
            <div className="shrink-0 border-t border-[var(--border)] bg-[var(--surface)] p-3">
              <form
                onSubmit={(event) => void sendMessage(event)}
                className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--input)] p-1.5 transition-colors focus-within:border-[var(--border-focus)]"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask something..."
                  aria-label="Message Nexus AI"
                  autoComplete="off"
                  maxLength={2000}
                  disabled={loading}
                  className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--input-placeholder)] disabled:opacity-60"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--text-primary)] transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ArrowUp size={17} strokeWidth={2} />
                </button>
              </form>

              <p className="mt-2 text-center text-[10px] text-[var(--text-muted)]">
                Nexus AI · Responses may not always be accurate
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Compact launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((current) => !current)}
        whileHover={reduceMotion ? undefined : { y: -2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        aria-expanded={open}
        aria-label={open ? "Minimize Nexus AI" : "Open Nexus AI"}
        className="group flex h-12 items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 text-[var(--text-primary)] shadow-[var(--shadow-lg)] transition-colors hover:bg-[var(--surface-hover)]"
      >
        <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--text-primary)]">
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="minimize"
                initial={reduceMotion ? false : { opacity: 0, rotate: -30 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 30 }}
                transition={instant}
              >
                <ChevronDown size={17} strokeWidth={1.8} />
              </motion.span>
            ) : (
              <motion.span
                key="message"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={instant}
              >
                <MessageCircle size={16} strokeWidth={1.8} />
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        <span className="text-sm font-medium tracking-tight">
          {open ? "Minimize" : "Ask Nexus"}
        </span>

        {!open && (
          <span className="ml-0.5 h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
        )}
      </motion.button>
    </div>
  );
}
