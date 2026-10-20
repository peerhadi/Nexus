"use client";

import { Eye, Loader2, Pencil, Star, Trash2 } from "lucide-react";
import type { Note } from "./types";

export default function NotesMobileActions({
  selectedNote,
  editorMode,
  setEditorMode,
  toggleStar,
  deleteNote,
  deleting,
  changeCategory,
}: {
  selectedNote: Note;
  editorMode: "write" | "preview";
  setEditorMode: (mode: "write" | "preview") => void;
  toggleStar: (id: string) => void;
  deleteNote: (id: string) => void;
  deleting: boolean;
  changeCategory: (category: string) => void;
}) {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-[var(--border-subtle)] px-3 py-2 md:hidden">
      <select
        value={selectedNote.category}
        onChange={(event) => changeCategory(event.target.value)}
        className="max-w-[110px] truncate bg-transparent text-[8px] font-black uppercase tracking-[0.12em] text-[var(--text-disabled)] outline-none"
      >
        <option value="General">General</option>
        <option value="Projects">Projects</option>
        <option value="Ideas">Ideas</option>
      </select>

      <div className="flex items-center gap-1">
        <div className="flex rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-0.5">
          <button
            type="button"
            onClick={() => setEditorMode("write")}
            className={`flex h-8 items-center gap-1 rounded-lg px-2 text-[7px] font-black uppercase tracking-[0.05em] transition ${
              editorMode === "write"
                ? "bg-[var(--surface)] text-[var(--text-secondary)] shadow-[var(--shadow-sm)]"
                : "text-[var(--text-disabled)]"
            }`}
          >
            <Pencil size={9} />
            Write
          </button>

          <button
            type="button"
            onClick={() => setEditorMode("preview")}
            className={`flex h-8 items-center gap-1 rounded-lg px-2 text-[7px] font-black uppercase tracking-[0.05em] transition ${
              editorMode === "preview"
                ? "bg-[var(--surface)] text-[var(--accent)] shadow-[var(--shadow-sm)]"
                : "text-[var(--text-disabled)]"
            }`}
          >
            <Eye size={9} />
            Preview
          </button>
        </div>

        <button
          type="button"
          onClick={() => toggleStar(selectedNote.id)}
          className={`flex h-8 w-8 items-center justify-center rounded-xl ${
            selectedNote.starred
              ? "text-[var(--warning)]"
              : "text-[var(--text-disabled)]"
          }`}
        >
          <Star
            size={14}
            className={selectedNote.starred ? "fill-[var(--warning)]" : ""}
          />
        </button>

        <button
          type="button"
          onClick={() => deleteNote(selectedNote.id)}
          disabled={deleting}
          className="flex h-8 w-8 items-center justify-center rounded-xl text-[var(--text-disabled)] transition-colors hover:bg-[var(--danger-soft)] hover:text-[var(--danger)] disabled:opacity-50"
        >
          {deleting ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Trash2 size={14} />
          )}
        </button>
      </div>
    </div>
  );
}
