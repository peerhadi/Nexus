"use client";

import { MessagesSquare, Radio } from "lucide-react";

export function TeamHeader({ connected }: { connected: boolean }) {
  return (
    <header className="flex shrink-0 items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--accent-subtle)] text-[var(--accent)]">
          <div className="absolute inset-x-0 top-0 h-1 bg-[var(--accent)]" />
          <MessagesSquare size={22} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Admin Chat
            </h1>
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] px-2 py-0.5 text-[10px] font-semibold text-[var(--text-secondary)]">
              INTERNAL
            </span>
          </div>
          <p className="mt-1 text-xs text-[var(--text-secondary)] sm:text-sm">
            One workspace. Your entire Nexus team.
          </p>
        </div>
      </div>

      <div
        role="status"
        aria-live="polite"
        className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${
          connected
            ? "border-[var(--success-border)] bg-[var(--success-bg)] text-[var(--success)]"
            : "border-[var(--warning-border)] bg-[var(--warning-bg)] text-[var(--warning)]"
        }`}
      >
        <Radio size={14} className={connected ? "animate-pulse" : ""} />
        <span className="hidden sm:inline">
          {connected ? "Connected live" : "Reconnecting…"}
        </span>
        <span className="sm:hidden">{connected ? "Live" : "Offline"}</span>
      </div>
    </header>
  );
}
