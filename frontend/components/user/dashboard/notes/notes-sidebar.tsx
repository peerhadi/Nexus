"use client";

import { FileText, Folder, Loader2, Plus, Search } from "lucide-react";
import { categories } from "./notes-api";
import type { NotesController } from "./use-notes";
import NotesList from "./notes-list";

export default function NotesSidebar({ controller }: { controller: NotesController }) {
  const {
    notes,
    selectedId,
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    loading,
    creating,
    error,
    createNote,
    selectNote,
  } = controller;

  return (
    <aside className="hidden w-[280px] shrink-0 flex-col border-r border-[var(--border-subtle)] bg-[var(--surface)] md:flex">
      <div className="border-b border-[var(--border-subtle)] p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--accent)]">
              <FileText size={12} />
              Workspace
            </div>

            <h1 className="mt-1 text-xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
              Notes
            </h1>
          </div>

          <button
            type="button"
            onClick={createNote}
            disabled={creating}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--text-inverse)] shadow-[var(--shadow-sm)] transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {creating ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Plus size={16} />
            )}
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--input)] px-3">
          <Search size={13} className="shrink-0 text-[var(--text-disabled)]" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search notes..."
            className="h-9 min-w-0 flex-1 bg-transparent text-[9px] font-medium text-[var(--text-secondary)] outline-none placeholder:text-[var(--input-placeholder)]"
          />

          {loading && (
            <Loader2 size={12} className="animate-spin text-[var(--accent)]" />
          )}
        </div>
      </div>

      <div className="border-b border-[var(--border-subtle)] p-3">
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[9px] font-black transition-colors ${
                activeCategory === category
                  ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-secondary)]"
              }`}
            >
              {category === "All" ? (
                <FileText size={13} />
              ) : (
                <Folder size={13} />
              )}

              {category}

              {category === "All" && (
                <span className="ml-auto text-[8px] text-[var(--text-disabled)]">
                  {notes.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="border-b border-[var(--danger)] bg-[var(--danger-soft)] px-4 py-2.5 text-[8px] font-bold leading-4 text-[var(--danger)]">
          {error}
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <NotesList
          notes={notes}
          selectedId={selectedId}
          loading={loading}
          variant="sidebar"
          onSelect={selectNote}
          onCreate={createNote}
        />
      </div>
    </aside>
  );
}
