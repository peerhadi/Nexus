"use client";

import { Check, FileText, Loader2 } from "lucide-react";
import type { Note } from "./types";
import EditorActions from "./editor-actions";

export default function NotesEditorHeader({
  selectedNote,
  saving,
  editorMode,
  setEditorMode,
  toggleStar,
  deleteNote,
  deleting,
  changeCategory,
}: {
  selectedNote: Note;
  saving: boolean;
  editorMode: "write" | "preview";
  setEditorMode: (mode: "write" | "preview") => void;
  toggleStar: (id: string) => void;
  deleteNote: (id: string) => void;
  deleting: boolean;
  changeCategory: (category: string) => void;
}) {
  return (
    <header className="hidden h-[68px] shrink-0 items-center justify-between border-b border-[var(--border-subtle)] px-5 sm:px-8 md:flex">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
          <FileText size={15} />
        </div>

        <div className="min-w-0">
          <select
            value={selectedNote.category}
            onChange={(event) => changeCategory(event.target.value)}
            className="max-w-[150px] cursor-pointer truncate bg-transparent text-[10px] font-black uppercase tracking-[0.15em] text-[var(--text-disabled)] outline-none"
          >
            <option value="General">General</option>
            <option value="Projects">Projects</option>
            <option value="Ideas">Ideas</option>
          </select>

          <div className="mt-0.5 flex items-center gap-1.5 text-[8px] font-medium text-[var(--text-muted)]">
            {saving ? (
              <>
                <Loader2
                  size={9}
                  className="animate-spin text-[var(--accent)]"
                />
                Saving...
              </>
            ) : (
              <>
                <Check size={9} className="text-[var(--success)]" />
                Saved
              </>
            )}
          </div>
        </div>
      </div>

      <EditorActions
        editorMode={editorMode}
        setEditorMode={setEditorMode}
        selectedNote={selectedNote}
        toggleStar={toggleStar}
        deleteNote={deleteNote}
        deleting={deleting}
      />
    </header>
  );
}
