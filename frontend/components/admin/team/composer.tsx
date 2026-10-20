"use client";

import { LoaderCircle, Send } from "lucide-react";

export function Composer({
  roomName,
  draft,
  sending,
  composerRef,
  onDraftChange,
  onSend,
}: {
  roomName: string;
  draft: string;
  sending: boolean;
  composerRef: React.RefObject<HTMLTextAreaElement | null>;
  onDraftChange: (value: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="shrink-0 border-t border-[var(--border)] bg-[var(--surface)] p-3 sm:p-5">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSend();
        }}
        className="mx-auto max-w-3xl"
      >
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)] transition focus-within:border-[var(--accent)] focus-within:ring-1 focus-within:ring-[var(--accent)]">
          <textarea
            ref={composerRef}
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault();
                onSend();
              }
            }}
            placeholder={`Message in #${roomName}`}
            aria-label="Write a message"
            maxLength={5000}
            rows={2}
            className="max-h-36 min-h-[62px] w-full resize-y bg-transparent px-4 py-3 text-sm leading-6 outline-none placeholder:text-[var(--text-secondary)]"
          />

          <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] bg-[var(--surface-secondary)] px-3 py-2">
            <span className="text-[10px] text-[var(--text-secondary)]">
              Enter to send <span className="mx-1">·</span> Shift + Enter for a
              new line
            </span>

            <button
              type="submit"
              disabled={!draft.trim() || sending}
              className="flex h-9 items-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-xs font-bold text-[var(--accent-contrast)] transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {sending ? (
                <LoaderCircle size={15} className="animate-spin" />
              ) : (
                <Send size={15} />
              )}
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
