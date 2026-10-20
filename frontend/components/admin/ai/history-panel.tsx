"use client";

import {
  LoaderCircle,
  MessageSquare,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";

import { displayName, initials } from "./format";
import { HistoryItem } from "./history-item";
import type { AIConversation, User } from "./types";

export function HistoryPanel({
  user,
  conversations,
  groups,
  selectedId,
  search,
  loading,
  menuId,
  setSearch,
  setMenuId,
  onNew,
  onSelect,
  onDelete,
  onRefresh,
  onClose,
}: {
  user: User | null;
  conversations: AIConversation[];
  groups: [string, AIConversation[]][];
  selectedId: string | null;
  search: string;
  loading: boolean;
  menuId: string | null;
  setSearch: (value: string) => void;
  setMenuId: (value: string | null) => void;
  onNew: () => void;
  onSelect: (id: string) => void;
  onDelete: (conversation: AIConversation) => void;
  onRefresh: () => void;
  onClose?: () => void;
}) {
  return (
    <>
      <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-[var(--border)] px-4">
        <Link href="/admin" className="flex min-w-0 items-center gap-2.5">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[var(--accent-border,var(--border))] bg-[var(--accent-subtle)] text-[var(--accent)]">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-tight">
              NEXUS <span className="text-[var(--accent)]">AI</span>
            </p>
            <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)]">
              Admin workspace
            </p>
          </div>
        </Link>
        {onClose && (
          <button
            type="button"
            aria-label="Close history"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-[var(--text-secondary)]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="p-3">
        <button
          type="button"
          onClick={onNew}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-3 py-3 text-xs font-bold text-[var(--accent-contrast,var(--background))] shadow-[var(--shadow-sm)] transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> New conversation
        </button>
      </div>
      <div className="px-3 pb-3">
        <label className="flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-[var(--text-muted)] focus-within:border-[var(--accent-border,var(--border-strong,var(--border)))]">
          <Search className="h-3.5 w-3.5 shrink-0" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search history"
            className="min-w-0 flex-1 bg-transparent text-xs text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
          />
          <span className="text-[9px]">{conversations.length}</span>
        </label>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-2 pb-3">
        <div className="flex items-center justify-between px-2 pb-2 pt-1">
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Recent conversations
          </p>
          <button
            type="button"
            onClick={onRefresh}
            aria-label="Refresh conversations"
            className="grid h-6 w-6 place-items-center rounded-md text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
        {loading && conversations.length === 0 ? (
          <div className="flex items-center justify-center gap-2 py-10 text-xs text-[var(--text-muted)]">
            <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> Loading
            history
          </div>
        ) : groups.length === 0 ? (
          <div className="px-3 py-8 text-center">
            <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-[var(--surface-secondary)] text-[var(--text-muted)]">
              <MessageSquare className="h-4 w-4" />
            </div>
            <p className="mt-3 text-xs font-semibold text-[var(--text-secondary)]">
              No conversations yet
            </p>
            <p className="mt-1 text-[10px] leading-5 text-[var(--text-muted)]">
              Start a chat and it will appear here.
            </p>
          </div>
        ) : (
          groups.map(([label, items]) => (
            <div key={label} className="mb-4">
              <p className="px-2 pb-1.5 pt-2 text-[9px] font-semibold text-[var(--text-muted)]">
                {label}
              </p>
              <div className="space-y-1">
                {items.map((conversation) => (
                  <HistoryItem
                    key={conversation.id}
                    conversation={conversation}
                    selected={selectedId === conversation.id}
                    menuOpen={menuId === conversation.id}
                    onSelect={() => onSelect(conversation.id)}
                    onToggleMenu={() =>
                      setMenuId(
                        menuId === conversation.id ? null : conversation.id,
                      )
                    }
                    onCloseMenu={() => setMenuId(null)}
                    onDelete={() => onDelete(conversation)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="shrink-0 border-t border-[var(--border)] p-3">
        <div className="flex items-center gap-2.5 rounded-xl bg-[var(--surface-secondary)] p-2.5">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[10px] font-bold text-[var(--text-secondary)]">
            {initials(user)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-bold text-[var(--text-primary)]">
              {displayName(user)}
            </p>
            <p className="mt-0.5 truncate text-[9px] text-[var(--text-muted)]">
              Administrator
            </p>
          </div>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--success)]" />
        </div>
      </div>
    </>
  );
}
