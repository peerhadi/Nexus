"use client";

import {
  Eye,
  Loader2,
  MoreHorizontal,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";
import type { Note } from "./types";

export default function EditorActions({
  editorMode,
  setEditorMode,
  selectedNote,
  toggleStar,
  deleteNote,
  deleting,
}: {
  editorMode: "write" | "preview";
  setEditorMode: (mode: "write" | "preview") => void;
  selectedNote: Note;
  toggleStar: (id: string) => void;
  deleteNote: (id: string) => void;
  deleting: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      <div className="mr-2 flex rounded-xl border border-[var(--border-subtle)] bg-slate-50 p-0.5">
        <button
          type="button"
          onClick={() => setEditorMode("write")}
          className={`flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[8px] font-black uppercase tracking-[0.08em] transition ${
            editorMode === "write"
              ? "bg-[var(--surface)] text-[var(--text-secondary)] shadow-sm"
              : "text-[var(--text-disabled)] hover:text-[var(--text-tertiary)]"
          }`}
        >
          <Pencil size={10} />
          Write
        </button>

        <button
          type="button"
          onClick={() => setEditorMode("preview")}
          className={`flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[8px] font-black uppercase tracking-[0.08em] transition ${
            editorMode === "preview"
              ? "bg-[var(--surface)] text-cyan-500 shadow-sm"
              : "text-[var(--text-disabled)] hover:text-[var(--text-tertiary)]"
          }`}
        >
          <Eye size={10} />
          Preview
        </button>
      </div>

      <button
        type="button"
        onClick={() => toggleStar(selectedNote.id)}
        className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-yellow-50 ${
          selectedNote.starred
            ? "text-yellow-400"
            : "text-[var(--text-disabled)] hover:text-yellow-400"
        }`}
      >
        <Star
          size={15}
          className={selectedNote.starred ? "fill-yellow-400" : ""}
        />
      </button>

      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--text-disabled)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-tertiary)]"
      >
        <MoreHorizontal size={16} />
      </button>

      <button
        type="button"
        onClick={() => deleteNote(selectedNote.id)}
        disabled={deleting}
        className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--text-disabled)] transition-colors hover:bg-red-50 hover:text-red-400 disabled:opacity-50"
      >
        {deleting ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Trash2 size={15} />
        )}
      </button>
    </div>
  );
}
