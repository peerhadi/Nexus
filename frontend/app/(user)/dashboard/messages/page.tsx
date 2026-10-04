"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import ConversationList from "@/components/user/dashboard/messages/conversation-list";
import { ChatHeader } from "@/components/user/dashboard/messages/chat-header";
import MessageList from "@/components/user/dashboard/messages/message-list";
import Composer from "@/components/user/dashboard/messages/composer";
import type { Conversation } from "@/lib/inbox/inbox-types";
import { API_URL } from "@/lib/api";

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const token =
          localStorage.getItem("nexus_token") ??
          sessionStorage.getItem("nexus_token");

        if (!token) return;

        const response = await fetch(`${API_URL}/conversations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) return;

        const data = await response.json();

        const loadedConversations: Conversation[] = Array.isArray(data)
          ? data
          : (data.conversations ?? []);

        setConversations(loadedConversations);

        if (loadedConversations.length > 0) {
          setSelectedId(loadedConversations[0].id);
        }
      } catch (error) {
        console.error("Failed to load conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    void loadConversations();
  }, []);

  const filteredConversations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return conversations;
    }

    return conversations.filter((conversation) => {
      return (
        conversation.client.name.toLowerCase().includes(query) ||
        conversation.subject?.toLowerCase().includes(query) ||
        conversation.messages?.some((message) =>
          message.content.toLowerCase().includes(query),
        )
      );
    });
  }, [conversations, search]);

  const activeConversation =
    conversations.find((conversation) => conversation.id === selectedId) ??
    null;

  const handleSelect = (conversation: Conversation) => {
    setSelectedId(conversation.id);
    setMenuOpen(false);
  };

  return (
    <main className="mx-auto max-w-[1500px] px-4 py-5 sm:px-5 sm:py-8 lg:px-9">
      <div className="flex min-h-[calc(100vh-208px)] flex-col">
        {/* Page header */}
        <div className="mb-4 flex items-end justify-between sm:mb-6">
          <div>
            <h1 className="text-3xl font-black tracking-[-0.05em] text-slate-800 sm:text-5xl">
              Messages
            </h1>

            <p className="mt-2 max-w-xl text-[10px] font-medium leading-5 text-slate-400 sm:text-[11px]">
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

        {/* Messaging workspace */}
        <div className="relative flex min-h-0 flex-1 overflow-hidden rounded-[24px] border border-violet-100 bg-white shadow-[0_20px_70px_rgba(139,92,246,0.08)] sm:rounded-[28px]">
          {loading ? (
            <div className="flex flex-1 items-center justify-center text-[11px] font-semibold text-slate-400">
              Loading conversations...
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex flex-1 items-center justify-center px-6 text-center">
              <div>
                <div className="text-sm font-black text-slate-700">
                  No conversations yet
                </div>

                <p className="mt-2 text-[10px] font-medium text-slate-400">
                  Start a conversation with the Nexus team and it will appear
                  here.
                </p>
              </div>
            </div>
          ) : activeConversation ? (
            <>
              {/* Desktop conversation list */}
              <div className="hidden md:flex">
                <ConversationList
                  conversations={filteredConversations}
                  selectedId={selectedId}
                  search={search}
                  onSearchChange={setSearch}
                  onSelect={handleSelect}
                />
              </div>

              {/* Mobile sliding drawer */}
              <AnimatePresence>
                {menuOpen && (
                  <div className="absolute inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <motion.button
                      type="button"
                      aria-label="Close conversations"
                      onClick={() => setMenuOpen(false)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px]"
                    />

                    {/* Drawer */}
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "-100%" }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 34,
                        mass: 0.8,
                      }}
                      className="absolute inset-y-0 left-0 w-[88%] max-w-[380px] overflow-hidden bg-white shadow-[20px_0_60px_rgba(15,23,42,0.15)]"
                    >
                      <div className="flex h-full flex-col">
                        {/* Drawer header */}
                        <div className="flex shrink-0 items-center justify-between border-b border-violet-100/80 px-4 py-4">
                          <div>
                            <div className="text-[8px] font-black uppercase tracking-[0.2em] text-violet-400">
                              Nexus Inbox
                            </div>

                            <div className="mt-1 text-lg font-black tracking-[-0.03em] text-slate-800">
                              Conversations
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setMenuOpen(false)}
                            aria-label="Close conversations"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 active:scale-[0.97]"
                          >
                            <X size={15} strokeWidth={2.5} />
                          </button>
                        </div>

                        <ConversationList
                          conversations={filteredConversations}
                          selectedId={selectedId}
                          search={search}
                          onSearchChange={setSearch}
                          onSelect={handleSelect}
                        />
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              {/* Message panel */}
              <section className="flex min-w-0 min-h-[600px] flex-1 flex-col">
                {/* Mobile toolbar */}
                <div className="flex shrink-0 items-center justify-between border-b border-violet-100/80 bg-white px-4 py-3 md:hidden">
                  <div className="flex min-w-0 items-center gap-3">
                    <motion.button
                      type="button"
                      onClick={() => setMenuOpen(true)}
                      aria-label="Open conversations"
                      whileTap={{ scale: 0.94 }}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-violet-500 transition-colors hover:border-violet-200 hover:bg-violet-100"
                    >
                      <Menu size={16} strokeWidth={2.5} />
                    </motion.button>

                    <div className="min-w-0">
                      <div className="truncate text-[10px] font-black tracking-tight text-slate-700">
                        {activeConversation.client.name}
                      </div>

                      <div className="mt-0.5 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />

                        <span className="truncate text-[8px] font-bold text-slate-400">
                          {activeConversation.subject || "No subject"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-3 shrink-0 rounded-full bg-violet-50 px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.12em] text-violet-400">
                    Messages
                  </div>
                </div>

                <ChatHeader conversation={activeConversation} />

                <MessageList conversationId={activeConversation.id} />

                <Composer conversationId={activeConversation.id} />
              </section>
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
}
