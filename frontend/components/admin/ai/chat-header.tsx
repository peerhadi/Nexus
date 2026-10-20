"use client";

import { ArrowLeft, Command, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export function ChatHeader({
  loadingConversations,
  onOpenHistory,
  onRefresh,
}: {
  loadingConversations: boolean;
  onOpenHistory: () => void;
  onRefresh: () => void;
}) {
  return (
    <header className="flex h-[68px] shrink-0 items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface)]/90 px-3 sm:px-5 lg:px-7">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Open conversation history"
          onClick={onOpenHistory}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] lg:hidden"
        >
          <Command className="h-4 w-4" />
        </button>
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[var(--accent-border,var(--border))] bg-[var(--accent-subtle)] text-[var(--accent)]">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-sm font-bold tracking-tight sm:text-base">
              Nexus Admin AI
            </h1>
            <span className="hidden rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)] sm:inline-flex">
              Internal
            </span>
          </div>
          <p className="mt-0.5 truncate text-[11px] text-[var(--text-secondary)]">
            Technical partner for the Nexus team
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <div className="hidden items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] px-2.5 py-1.5 text-[10px] font-semibold text-[var(--text-secondary)] sm:flex">
          <ShieldCheck className="h-3.5 w-3.5 text-[var(--success)]" /> Admin
          session
        </div>
        <Link
          href="/admin"
          className="hidden items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] sm:inline-flex"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
        </Link>
        <button
          type="button"
          aria-label="Refresh history"
          onClick={onRefresh}
          className="grid h-9 w-9 place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${loadingConversations ? "animate-spin" : ""}`}
          />
        </button>
      </div>
    </header>
  );
}
