"use client";

import type { Note } from "./types";
import MarkdownPreview from "./markdown-preview";

export default function NotesWritingArea({
  selectedNote,
  editorMode,
  setEditorMode,
  updateSelectedNote,
}: {
  selectedNote: Note;
  editorMode: "write" | "preview";
  setEditorMode: (mode: "write" | "preview") => void;
  updateSelectedNote: (
    field: "title" | "content" | "category",
    value: string,
  ) => void;
}) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto w-full max-w-3xl px-5 py-8 sm:px-10 sm:py-16">
        <input
          value={selectedNote.title}
          onChange={(event) =>
            updateSelectedNote("title", event.target.value)
          }
          placeholder="Untitled"
          className="w-full bg-transparent text-3xl font-black tracking-[-0.055em] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-disabled)] sm:text-5xl"
        />

        <div className="mt-4 h-px w-12 bg-[var(--accent)]" />

        {editorMode === "write" ? (
          <div className="mt-7 sm:mt-8">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[8px] font-black uppercase tracking-[0.15em] text-[var(--text-disabled)]">
                Markdown supported
              </span>

              <span className="text-[7px] font-medium text-[var(--text-disabled)] sm:text-[8px]">
                **bold** · *italic* · # headings · - lists
              </span>
            </div>

            <textarea
              value={selectedNote.content}
              onChange={(event) =>
                updateSelectedNote("content", event.target.value)
              }
              placeholder={`Start writing in Markdown...

# Example heading

Write **bold**, *italic*, lists, links, code, and more.`}
              className="min-h-[55vh] w-full resize-none bg-transparent text-[13px] font-medium leading-7 text-[var(--text-secondary)] outline-none placeholder:text-[var(--text-disabled)]"
            />
          </div>
        ) : (
          <MarkdownPreview
            content={selectedNote.content}
            onStartWriting={() => setEditorMode("write")}
          />
        )}
      </div>
    </div>
  );
}
