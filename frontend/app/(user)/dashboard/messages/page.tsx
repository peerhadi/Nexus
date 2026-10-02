"use client";

import { useEffect, useMemo, useState } from "react";
import ConversationList from "@/components/user/dashboard/messages/conversation-list";
import { ChatHeader } from "@/components/user/dashboard/messages/chat-header";
import MessageList from "@/components/user/dashboard/messages/message-list";
import Composer from "@/components/user/dashboard/messages/composer";
import type { Conversation } from "@/lib/inbox/inbox-types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

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
  };

  return (
    <main className="mx-auto max-w-[1500px] px-5 py-8 lg:px-9">
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
          {loading ? (
            <div className="flex flex-1 items-center justify-center text-[11px] font-semibold text-slate-400">
              Loading conversations...
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-center">
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
              <ConversationList
                conversations={filteredConversations}
                selectedId={selectedId}
                search={search}
                onSearchChange={setSearch}
                onSelect={handleSelect}
              />

              <section className="flex min-w-0 flex-1 flex-col min-h-[600px]">
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
