"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FileText, Folder, Loader2, Plus, Search, X } from "lucide-react";
import { categories } from "./notes-api";
import type { NotesController } from "./use-notes";
import NotesList from "./notes-list";

export default function NotesMobileDrawer({
  controller,
}: {
  controller: NotesController;
}) {
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
    menuOpen,
    setMenuOpen,
    createNote,
    selectNote,
  } = controller;

  return (
    <AnimatePresence>
      {menuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <motion.button
            type="button"
            aria-label="Close notes menu"
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="absolute inset-0 bg-[var(--accent)]/20 backdrop-blur-[2px]"
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 34,
              mass: 0.8,
            }}
            className="absolute inset-y-0 left-0 flex w-[88%] max-w-[360px] flex-col overflow-hidden border-r border-[var(--border-subtle)] bg-[var(--surface)] shadow-[var(--shadow-xl)]"
          >
            <div className="shrink-0 border-b border-[var(--border-subtle)] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--accent)]">
                    <FileText size={12} />
                    Workspace
                  </div>

                  <h2 className="mt-1 text-xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
                    Notes
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={createNote}
                    disabled={creating}
                    aria-label="Create note"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--text-inverse)] transition-colors hover:bg-[var(--accent-hover)] disabled:opacity-50"
                  >
                    {creating ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Plus size={16} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close notes"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-secondary)] active:scale-[0.97]"
                  >
                    <X size={15} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--input)] px-3">
                <Search
                  size={13}
                  className="shrink-0 text-[var(--text-disabled)]"
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search notes..."
                  className="h-9 min-w-0 flex-1 bg-transparent text-[9px] font-medium text-[var(--text-secondary)] outline-none placeholder:text-[var(--input-placeholder)]"
                />

                {loading && (
                  <Loader2
                    size={12}
                    className="animate-spin text-[var(--accent)]"
                  />
                )}
              </div>
            </div>

            <div className="shrink-0 border-b border-[var(--border-subtle)] p-3">
              <div className="grid grid-cols-2 gap-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[9px] font-black transition-colors ${
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
              <div className="shrink-0 border-b border-[var(--border)] bg-[var(--danger-soft)] px-4 py-2.5 text-[8px] font-bold leading-4 text-[var(--danger)]">
                {error}
              </div>
            )}

            <div className="min-h-0 flex-1 overflow-y-auto p-3">
              <NotesList
                notes={notes}
                selectedId={selectedId}
                loading={loading}
                variant="drawer"
                onSelect={selectNote}
                onCreate={createNote}
              />
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
