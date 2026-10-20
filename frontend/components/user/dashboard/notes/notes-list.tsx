"use client";

import { FileText, Loader2, Star } from "lucide-react";
import type { Note } from "./types";
import { formatDate } from "./notes-api";

export default function NotesList({
  notes,
  selectedId,
  loading,
  variant,
  onSelect,
  onCreate,
}: {
  notes: Note[];
  selectedId: string | null;
  loading: boolean;
  variant: "sidebar" | "drawer";
  onSelect: (note: Note) => void;
  onCreate: () => void;
}) {
  if (loading && notes.length === 0) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 size={18} className="animate-spin text-[var(--accent)]" />
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {notes.map((note) => (
        <button
          key={note.id}
          type="button"
          onClick={() => onSelect(note)}
          className={`${
            variant === "sidebar" ? "group " : ""
          }w-full rounded-xl p-3 text-left transition ${
            selectedId === note.id
              ? "bg-[var(--accent-soft)]"
              : "hover:bg-[var(--surface-hover)]"
          }`}
        >
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <div
                className={`truncate text-[10px] font-black ${
                  selectedId === note.id
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-secondary)]"
                }`}
              >
                {note.title || "Untitled"}
              </div>

              <div className="mt-1 line-clamp-2 text-[8px] font-medium leading-4 text-[var(--text-muted)]">
                {note.content || "No content yet..."}
              </div>
            </div>

            {note.starred && (
              <Star
                size={11}
                className="mt-0.5 shrink-0 fill-[var(--warning)] text-[var(--warning)]"
              />
            )}
          </div>

          <div className="mt-2 text-[7px] font-bold uppercase tracking-[0.1em] text-[var(--text-disabled)]">
            {formatDate(note.updatedAt)}
          </div>
        </button>
      ))}

      {notes.length === 0 && (
        <div className="px-3 py-8 text-center">
          <FileText
            size={18}
            className="mx-auto text-[var(--text-disabled)]"
          />

          <p className="mt-3 text-[9px] font-black text-[var(--text-muted)]">
            No notes found
          </p>

          <button
            type="button"
            onClick={onCreate}
            className={`mt-3 text-[8px] font-black uppercase tracking-[0.1em] text-[var(--accent)]${
              variant === "sidebar" ? " hover:text-[var(--accent-hover)]" : ""
            }`}
          >
            Create one
          </button>
        </div>
      )}
    </div>
  );
}
