"use client";

import { LoaderCircle, Send, X } from "lucide-react";
import { KeyboardEvent, RefObject } from "react";

export function Composer({
  draft,
  sending,
  sendError,
  textareaRef,
  onDraftChange,
  onKeyDown,
  onSubmit,
  onDismissError,
}: {
  draft: string;
  sending: boolean;
  sendError: string;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onDraftChange: (value: string, element: HTMLTextAreaElement) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onDismissError: () => void;
}) {
  return (
    <div className="shrink-0 border-t border-[var(--border)] bg-[var(--background)] px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 sm:px-6 sm:pt-4 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {sendError && (
          <div className="mb-2 flex items-start justify-between gap-3 rounded-xl border border-[var(--danger-border,var(--border))] bg-[var(--danger-bg,var(--surface-secondary))] px-3 py-2 text-xs leading-5 text-[var(--danger,var(--text-primary))]">
            <span>{sendError}</span>
            <button
              type="button"
              onClick={onDismissError}
              aria-label="Dismiss message error"
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <form
          onSubmit={onSubmit}
          className="rounded-[22px] border border-[var(--border-strong,var(--border))] bg-[var(--surface)] p-2 shadow-[var(--shadow-sm)] transition focus-within:border-[var(--accent-border,var(--border-strong,var(--border)))] focus-within:shadow-[var(--shadow-md)]"
        >
          <textarea
            ref={textareaRef}
            value={draft}
            onChange={(event) =>
              onDraftChange(event.target.value, event.currentTarget)
            }
            onKeyDown={onKeyDown}
            rows={1}
            maxLength={12000}
            placeholder="Ask about code, architecture, security, or the next Nexus task…"
            className="max-h-[180px] min-h-[48px] w-full resize-none border-0 bg-transparent px-3 py-3 text-sm leading-6 text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:ring-0"
            disabled={sending}
            aria-label="Message Nexus Admin AI"
          />
          <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-1">
            <div className="flex min-w-0 items-center gap-2 text-[10px] text-[var(--text-muted)]">
              <span className="hidden sm:inline">Enter to send</span>
              <span className="hidden text-[var(--border-strong)] sm:inline">
                ·
              </span>
              <span>Shift + Enter for a new line</span>
            </div>
            <button
              type="submit"
              disabled={!draft.trim() || sending}
              className="inline-flex h-9 shrink-0 items-center gap-2 rounded-xl bg-[var(--accent)] px-3.5 text-xs font-bold text-[var(--accent-contrast,var(--background))] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="hidden sm:inline">Send</span>
              {sending ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-[9px] leading-4 text-[var(--text-muted)]">
          Nexus Admin AI can make mistakes. Review suggestions before applying
          changes or deploying.
        </p>
      </div>
    </div>
  );
}
