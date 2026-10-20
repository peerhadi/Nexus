"use client";

import { FileText } from "lucide-react";

export default function NotesEmptyEditor({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex flex-1 items-center justify-center px-6">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-secondary)] text-[var(--text-disabled)]">
          <FileText size={20} />
        </div>

        <h2 className="mt-4 text-sm font-black text-[var(--text-secondary)]">
          No note selected
        </h2>

        <p className="mt-1 text-[9px] font-medium text-[var(--text-muted)]">
          Create a note to start writing.
        </p>

        <button
          type="button"
          onClick={onCreate}
          className="mt-4 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.12em] text-[var(--text-inverse)] transition hover:bg-[var(--accent-hover)]"
        >
          Create a note
        </button>
      </div>
    </div>
  );
}
