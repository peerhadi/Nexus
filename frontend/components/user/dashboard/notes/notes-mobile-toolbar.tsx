"use client";

import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import type { Note } from "./types";

export default function NotesMobileToolbar({
  selectedNote,
  saving,
  onOpen,
}: {
  selectedNote: Note;
  saving: boolean;
  onOpen: () => void;
}) {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-[var(--border-subtle)] px-3 py-3 sm:px-5 md:hidden">
      <div className="flex min-w-0 items-center gap-3">
        <motion.button
          type="button"
          onClick={onOpen}
          aria-label="Open notes"
          whileTap={{ scale: 0.94 }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--accent-soft-strong)] bg-[var(--accent-soft)] text-[var(--accent)] transition-colors hover:bg-[var(--accent-soft-strong)]"
        >
          <Menu size={16} strokeWidth={2.5} />
        </motion.button>

        <div className="min-w-0">
          <div className="truncate text-[10px] font-black text-[var(--text-secondary)]">
            {selectedNote.title || "Untitled"}
          </div>

          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--success)]" />

            <span className="text-[8px] font-bold text-[var(--text-muted)]">
              {saving ? "Saving..." : "Saved"}
            </span>
          </div>
        </div>
      </div>

      <div className="ml-3 shrink-0 rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.12em] text-[var(--accent)]">
        Notes
      </div>
    </header>
  );
}
