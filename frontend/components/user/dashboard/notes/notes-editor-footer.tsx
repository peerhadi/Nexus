"use client";

import type { Note } from "./types";

export default function NotesEditorFooter({
  selectedNote,
  saving,
}: {
  selectedNote: Note;
  saving: boolean;
}) {
  return (
    <footer className="flex min-h-10 shrink-0 flex-wrap items-center justify-between gap-2 border-t border-[var(--border-subtle)] px-4 py-2 text-[7px] font-bold uppercase tracking-[0.12em] text-[var(--text-disabled)] sm:px-8 sm:text-[8px]">
      <div className="flex items-center gap-3">
        <span>{selectedNote.content.length} characters</span>

        <span>
          {selectedNote.content.trim()
            ? selectedNote.content.trim().split(/\s+/).length
            : 0}{" "}
          words
        </span>
      </div>

      <span
        className={saving ? "text-[var(--accent)]" : "text-[var(--success)]"}
      >
        {saving ? "Saving..." : "Saved to Nexus"}
      </span>
    </footer>
  );
}
