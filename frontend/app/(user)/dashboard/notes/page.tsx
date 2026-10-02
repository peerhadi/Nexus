"use client";

import { useMemo, useState } from "react";
import {
  FileText,
  Folder,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Trash2,
} from "lucide-react";

type Note = {
  id: number;
  title: string;
  content: string;
  category: string;
  starred: boolean;
  updated: string;
};

const initialNotes: Note[] = [
  {
    id: 1,
    title: "Welcome to Nexus Notes",
    content:
      "Keep ideas, plans, research, and anything else you want to remember here.",
    category: "General",
    starred: true,
    updated: "Just now",
  },
  {
    id: 2,
    title: "Project ideas",
    content:
      "Ideas for future Nexus features, experiments, and things worth building.",
    category: "Projects",
    starred: false,
    updated: "Yesterday",
  },
  {
    id: 3,
    title: "Things to remember",
    content:
      "Useful links, concepts, reminders, and random thoughts collected in one place.",
    category: "General",
    starred: false,
    updated: "Sep 29",
  },
];

const categories = ["All", "General", "Projects", "Ideas"];

export default function NotesPage() {
  const [notes, setNotes] = useState(initialNotes);
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const selectedNote = notes.find((note) => note.id === selectedId);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "All" || note.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [notes, search, activeCategory]);

  const createNote = () => {
    const newNote: Note = {
      id: Date.now(),
      title: "Untitled note",
      content: "",
      category: "General",
      starred: false,
      updated: "Just now",
    };

    setNotes((current) => [newNote, ...current]);
    setSelectedId(newNote.id);
  };

  const updateSelectedNote = (field: "title" | "content", value: string) => {
    setNotes((current) =>
      current.map((note) =>
        note.id === selectedId
          ? {
              ...note,
              [field]: value,
              updated: "Just now",
            }
          : note,
      ),
    );
  };

  const toggleStar = (id: number) => {
    setNotes((current) =>
      current.map((note) =>
        note.id === id ? { ...note, starred: !note.starred } : note,
      ),
    );
  };

  const deleteNote = (id: number) => {
    const remaining = notes.filter((note) => note.id !== id);

    setNotes(remaining);

    if (selectedId === id) {
      setSelectedId(remaining[0]?.id ?? 0);
    }
  };

  return (
    <main className="flex h-screen min-h-0 overflow-hidden bg-[#fafafa]">
      {/* Notes sidebar */}
      <aside className="flex w-[280px] shrink-0 flex-col border-r border-black/[0.05] bg-white/80">
        {/* Header */}
        <div className="border-b border-black/[0.05] p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
                <FileText size={12} />
                Workspace
              </div>

              <h1 className="mt-1 text-xl font-black tracking-[-0.04em] text-slate-800">
                Notes
              </h1>
            </div>

            <button
              type="button"
              onClick={createNote}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-white shadow-sm hover:bg-cyan-500"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Search */}
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-black/[0.06] bg-slate-50 px-3">
            <Search size={13} className="shrink-0 text-slate-300" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search notes..."
              className="h-9 min-w-0 flex-1 bg-transparent text-[9px] font-medium text-slate-600 outline-none placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="border-b border-black/[0.05] p-3">
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[9px] font-black transition-colors ${
                  activeCategory === category
                    ? "bg-cyan-50 text-cyan-500"
                    : "text-slate-400 hover:bg-black/[0.025] hover:text-slate-600"
                }`}
              >
                {category === "All" ? (
                  <FileText size={13} />
                ) : (
                  <Folder size={13} />
                )}

                {category}

                {category === "All" && (
                  <span className="ml-auto text-[8px] text-slate-300">
                    {notes.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Note list */}
        <div className="min-h-0 flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {filteredNotes.map((note) => (
              <button
                key={note.id}
                type="button"
                onClick={() => setSelectedId(note.id)}
                className={`group w-full rounded-xl p-3 text-left ${
                  selectedId === note.id
                    ? "bg-cyan-50"
                    : "hover:bg-black/[0.025]"
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <div
                      className={`truncate text-[10px] font-black ${
                        selectedId === note.id
                          ? "text-cyan-600"
                          : "text-slate-700"
                      }`}
                    >
                      {note.title || "Untitled note"}
                    </div>

                    <div className="mt-1 line-clamp-2 text-[8px] font-medium leading-4 text-slate-400">
                      {note.content || "No content yet..."}
                    </div>
                  </div>

                  {note.starred && (
                    <Star
                      size={11}
                      className="mt-0.5 shrink-0 fill-yellow-400 text-yellow-400"
                    />
                  )}
                </div>

                <div className="mt-2 text-[7px] font-bold uppercase tracking-[0.1em] text-slate-300">
                  {note.updated}
                </div>
              </button>
            ))}

            {filteredNotes.length === 0 && (
              <div className="px-3 py-8 text-center">
                <FileText size={18} className="mx-auto text-slate-200" />

                <p className="mt-3 text-[9px] font-black text-slate-400">
                  No notes found
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Editor */}
      <section className="flex min-w-0 flex-1 flex-col bg-white">
        {selectedNote ? (
          <>
            {/* Editor header */}
            <header className="flex h-[68px] shrink-0 items-center justify-between border-b border-black/[0.05] px-5 sm:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500">
                  <FileText size={15} />
                </div>

                <div className="min-w-0">
                  <div className="truncate text-[10px] font-black uppercase tracking-[0.15em] text-slate-300">
                    {selectedNote.category}
                  </div>

                  <div className="mt-0.5 text-[8px] font-medium text-slate-400">
                    Last edited {selectedNote.updated}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => toggleStar(selectedNote.id)}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl hover:bg-yellow-50 ${
                    selectedNote.starred
                      ? "text-yellow-400"
                      : "text-slate-300 hover:text-yellow-400"
                  }`}
                >
                  <Star
                    size={15}
                    className={selectedNote.starred ? "fill-yellow-400" : ""}
                  />
                </button>

                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-300 hover:bg-black/[0.03] hover:text-slate-500"
                >
                  <MoreHorizontal size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => deleteNote(selectedNote.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-300 hover:bg-red-50 hover:text-red-400"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </header>

            {/* Writing area */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-16">
                <input
                  value={selectedNote.title}
                  onChange={(event) =>
                    updateSelectedNote("title", event.target.value)
                  }
                  placeholder="Untitled note"
                  className="w-full bg-transparent text-4xl font-black tracking-[-0.055em] text-slate-800 outline-none placeholder:text-slate-200 sm:text-5xl"
                />

                <div className="mt-4 h-px w-12 bg-cyan-400" />

                <textarea
                  value={selectedNote.content}
                  onChange={(event) =>
                    updateSelectedNote("content", event.target.value)
                  }
                  placeholder="Start writing..."
                  className="mt-8 min-h-[500px] w-full resize-none bg-transparent text-[12px] font-medium leading-7 text-slate-600 outline-none placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Bottom status */}
            <footer className="flex h-10 shrink-0 items-center justify-between border-t border-black/[0.04] px-5 text-[8px] font-bold uppercase tracking-[0.12em] text-slate-300 sm:px-8">
              <span>{selectedNote.content.length} characters</span>
              <span className="text-emerald-400">Saved locally</span>
            </footer>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">
                <FileText size={20} />
              </div>

              <h2 className="mt-4 text-sm font-black text-slate-600">
                No note selected
              </h2>

              <button
                type="button"
                onClick={createNote}
                className="mt-4 rounded-xl bg-slate-800 px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.12em] text-white hover:bg-cyan-500"
              >
                Create a note
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
