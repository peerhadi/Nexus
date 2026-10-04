"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Check,
  FileText,
  Folder,
  Loader2,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Trash2,
  Eye,
  Pencil,
} from "lucide-react";

type Note = {
  id: string;
  title: string;
  content: string;
  category: string;
  starred: boolean;
  createdAt: string;
  updatedAt: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const categories = ["All", "General", "Projects", "Ideas"];

function formatDate(date: string) {
  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "Unknown";
  }

  const now = new Date();
  const diff = now.getTime() - value.getTime();

  if (diff < 60_000) return "Just now";

  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / 60_000);
    return `${minutes}m ago`;
  }

  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    return `${hours}h ago`;
  }

  if (diff < 7 * 24 * 60 * 60 * 1000) {
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    return `${days}d ago`;
  }

  return value.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: value.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("nexus_token");
}

async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.error || `Request failed with status ${response.status}`,
    );
  }

  return data;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");
  const [editorMode, setEditorMode] = useState<"write" | "preview">("write");

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedNote = useMemo(
    () => notes.find((note) => note.id === selectedId) ?? null,
    [notes, selectedId],
  );

  const requestIdRef = useRef(0);

  const loadNotes = useCallback(async () => {
    const requestId = ++requestIdRef.current;

    try {
      setError("");

      const params = new URLSearchParams();

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (activeCategory !== "All") {
        params.set("category", activeCategory);
      }

      const query = params.toString();

      const data = await apiRequest<{ success: boolean; notes: Note[] }>(
        `/notes${query ? `?${query}` : ""}`,
      );

      // Ignore stale responses from older requests.
      if (requestId !== requestIdRef.current) {
        return;
      }

      setNotes(data.notes);

      setSelectedId((current) => {
        if (current && data.notes.some((note) => note.id === current)) {
          return current;
        }

        return data.notes[0]?.id ?? null;
      });
    } catch (err) {
      if (requestId !== requestIdRef.current) {
        return;
      }

      setError(err instanceof Error ? err.message : "Failed to load notes");
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [search, activeCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadNotes();
    }, 250);

    return () => clearTimeout(timer);
  }, [loadNotes]);

  useEffect(() => {
    return () => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }
    };
  }, []);

  const createNote = async () => {
    if (creating) return;

    try {
      setCreating(true);
      setError("");

      const data = await apiRequest<{ success: boolean; note: Note }>(
        "/notes",
        {
          method: "POST",
          body: JSON.stringify({
            title: "",
            content: "",
            category: activeCategory !== "All" ? activeCategory : "General",
            starred: false,
          }),
        },
      );

      setNotes((current) => [data.note, ...current]);
      setSelectedId(data.note.id);
      setEditorMode("write");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create note");
    } finally {
      setCreating(false);
    }
  };

  const updateNoteLocally = (id: string, changes: Partial<Note>) => {
    console.log(id, changes);
    setNotes((current) =>
      current.map((note) =>
        note.id === id
          ? {
              ...note,
              ...changes,
            }
          : note,
      ),
    );
  };

  const saveNote = (
    id: string,
    changes: Partial<Pick<Note, "title" | "content" | "category" | "starred">>,
  ) => {
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }

    setSaving(true);

    saveTimer.current = setTimeout(async () => {
      try {
        setError("");

        const data = await apiRequest<{ success: boolean; note: Note }>(
          `/notes/${id}`,
          {
            method: "PATCH",
            body: JSON.stringify(changes),
          },
        );
        console.log(data.note);
        updateNoteLocally(id, data.note);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save note");
      } finally {
        setSaving(false);
      }
    }, 500);
  };

  const updateSelectedNote = (
    field: "title" | "content" | "category",
    value: string,
  ) => {
    if (!selectedNote) return;
    updateNoteLocally(selectedNote.id, {
      [field]: value,
    });

    saveNote(selectedNote.id, {
      [field]: value,
    });
  };

  const toggleStar = async (id: string) => {
    try {
      setError("");

      updateNoteLocally(id, {
        starred: !notes.find((note) => note.id === id)?.starred,
      });

      const data = await apiRequest<{ success: boolean; note: Note }>(
        `/notes/${id}/star`,
        {
          method: "PATCH",
        },
      );

      updateNoteLocally(id, data.note);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update star");

      await loadNotes();
    }
  };

  const deleteNote = async (id: string) => {
    if (deleting) return;

    try {
      setDeleting(true);
      setError("");

      await apiRequest<{ success: boolean }>(`/notes/${id}`, {
        method: "DELETE",
      });

      const remaining = notes.filter((note) => note.id !== id);

      setNotes(remaining);

      if (selectedId === id) {
        setSelectedId(remaining[0]?.id ?? null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete note");
    } finally {
      setDeleting(false);
    }
  };

  const changeCategory = (category: string) => {
    if (!selectedNote) return;

    updateSelectedNote("category", category);
  };

  return (
    <main className="flex h-[calc(100vh-70px)] min-h-0 overflow-hidden bg-[#fafafa] text-slate-800">
      {/* Sidebar */}
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
              disabled={creating}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-white shadow-sm transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {creating ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Plus size={16} />
              )}
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

            {loading && (
              <Loader2 size={12} className="animate-spin text-cyan-400" />
            )}
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

        {/* Error */}
        {error && (
          <div className="border-b border-red-100 bg-red-50 px-4 py-2.5 text-[8px] font-bold leading-4 text-red-500">
            {error}
          </div>
        )}

        {/* Notes list */}
        <div className="min-h-0 flex-1 overflow-y-auto p-3">
          {loading && notes.length === 0 ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 size={18} className="animate-spin text-cyan-400" />
            </div>
          ) : (
            <div className="space-y-1">
              {notes.map((note) => (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(note.id);
                    setEditorMode("write");
                  }}
                  className={`group w-full rounded-xl p-3 text-left transition ${
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
                        {note.title || ""}
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
                    {formatDate(note.updatedAt)}
                  </div>
                </button>
              ))}

              {notes.length === 0 && (
                <div className="px-3 py-8 text-center">
                  <FileText size={18} className="mx-auto text-slate-200" />

                  <p className="mt-3 text-[9px] font-black text-slate-400">
                    No notes found
                  </p>

                  <button
                    type="button"
                    onClick={createNote}
                    className="mt-3 text-[8px] font-black uppercase tracking-[0.1em] text-cyan-500 hover:text-cyan-600"
                  >
                    Create one
                  </button>
                </div>
              )}
            </div>
          )}
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
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedNote.category}
                      onChange={(event) => changeCategory(event.target.value)}
                      className="max-w-[150px] cursor-pointer truncate bg-transparent text-[10px] font-black uppercase tracking-[0.15em] text-slate-300 outline-none"
                    >
                      <option value="General">General</option>
                      <option value="Projects">Projects</option>
                      <option value="Ideas">Ideas</option>
                    </select>
                  </div>

                  <div className="mt-0.5 flex items-center gap-1.5 text-[8px] font-medium text-slate-400">
                    {saving ? (
                      <>
                        <Loader2
                          size={9}
                          className="animate-spin text-cyan-400"
                        />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check size={9} className="text-emerald-400" />
                        Saved
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Write / Preview */}
                <div className="mr-2 flex rounded-xl border border-black/[0.05] bg-slate-50 p-0.5">
                  <button
                    type="button"
                    onClick={() => setEditorMode("write")}
                    className={`flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[8px] font-black uppercase tracking-[0.08em] transition ${
                      editorMode === "write"
                        ? "bg-white text-slate-700 shadow-sm"
                        : "text-slate-300 hover:text-slate-500"
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
                        ? "bg-white text-cyan-500 shadow-sm"
                        : "text-slate-300 hover:text-slate-500"
                    }`}
                  >
                    <Eye size={10} />
                    Preview
                  </button>
                </div>

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
                  disabled={deleting}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-300 hover:bg-red-50 hover:text-red-400 disabled:opacity-50"
                >
                  {deleting ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={15} />
                  )}
                </button>
              </div>
            </header>

            {/* Writing / preview area */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-16">
                <input
                  value={selectedNote.title}
                  onChange={(event) =>
                    updateSelectedNote("title", event.target.value)
                  }
                  className="w-full bg-transparent text-4xl font-black tracking-[-0.055em] text-slate-800 outline-none placeholder:text-slate-200 sm:text-5xl"
                />

                <div className="mt-4 h-px w-12 bg-cyan-400" />

                {editorMode === "write" ? (
                  <div className="mt-8">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[8px] font-black uppercase tracking-[0.15em] text-slate-300">
                        Markdown supported
                      </span>

                      <span className="text-[8px] font-medium text-slate-300">
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
                      className="min-h-[500px] w-full resize-none bg-transparent text-[13px] font-medium leading-7 text-slate-600 outline-none placeholder:text-slate-300"
                    />
                  </div>
                ) : (
                  <article className="prose prose-slate mt-8 max-w-none text-[13px] leading-7">
                    {selectedNote.content.trim() ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({ children }) => (
                            <h1 className="mb-4 mt-8 text-2xl font-black tracking-[-0.03em] text-slate-800 first:mt-0">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="mb-3 mt-7 text-xl font-black tracking-[-0.02em] text-slate-800">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="mb-2 mt-6 text-lg font-black text-slate-800">
                              {children}
                            </h3>
                          ),
                          p: ({ children }) => (
                            <p className="mb-4 text-[13px] font-medium leading-7 text-slate-600">
                              {children}
                            </p>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-bold text-slate-800">
                              {children}
                            </strong>
                          ),
                          em: ({ children }) => (
                            <em className="text-slate-700">{children}</em>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-4 ml-5 list-disc space-y-1.5 text-slate-600">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="mb-4 ml-5 list-decimal space-y-1.5 text-slate-600">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="pl-1">{children}</li>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="my-5 border-l-2 border-cyan-400 pl-4 italic text-slate-500">
                              {children}
                            </blockquote>
                          ),
                          code: ({ children }) => (
                            <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[12px] text-cyan-700">
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="my-5 overflow-x-auto rounded-2xl border border-black/[0.05] bg-slate-50 p-4 font-mono text-[12px] leading-6 text-slate-700">
                              {children}
                            </pre>
                          ),
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-cyan-500 underline decoration-cyan-200 underline-offset-2 hover:text-cyan-600"
                            >
                              {children}
                            </a>
                          ),
                          hr: () => <hr className="my-7 border-black/[0.06]" />,
                          table: ({ children }) => (
                            <div className="my-5 overflow-x-auto rounded-xl border border-black/[0.06]">
                              <table className="w-full text-left text-[12px]">
                                {children}
                              </table>
                            </div>
                          ),
                          th: ({ children }) => (
                            <th className="border-b border-black/[0.06] bg-slate-50 px-4 py-3 font-black text-slate-700">
                              {children}
                            </th>
                          ),
                          td: ({ children }) => (
                            <td className="border-b border-black/[0.04] px-4 py-3 text-slate-600">
                              {children}
                            </td>
                          ),
                        }}
                      >
                        {selectedNote.content}
                      </ReactMarkdown>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-black/[0.07] px-6 py-10 text-center">
                        <Eye size={18} className="mx-auto text-slate-200" />

                        <p className="mt-3 text-[10px] font-black text-slate-400">
                          Nothing to preview yet
                        </p>

                        <button
                          type="button"
                          onClick={() => setEditorMode("write")}
                          className="mt-3 text-[9px] font-black uppercase tracking-[0.1em] text-cyan-500"
                        >
                          Start writing
                        </button>
                      </div>
                    )}
                  </article>
                )}
              </div>
            </div>

            {/* Bottom status */}
            <footer className="flex h-10 shrink-0 items-center justify-between border-t border-black/[0.04] px-5 text-[8px] font-bold uppercase tracking-[0.12em] text-slate-300 sm:px-8">
              <div className="flex items-center gap-4">
                <span>{selectedNote.content.length} characters</span>

                <span>
                  {selectedNote.content.trim()
                    ? selectedNote.content.trim().split(/\s+/).length
                    : 0}{" "}
                  words
                </span>
              </div>

              <span className={saving ? "text-cyan-400" : "text-emerald-400"}>
                {saving ? "Saving..." : "Saved to Nexus"}
              </span>
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

              <p className="mt-1 text-[9px] font-medium text-slate-400">
                Create a note to start writing.
              </p>

              <button
                type="button"
                onClick={createNote}
                className="mt-4 rounded-xl bg-slate-800 px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.12em] text-white transition hover:bg-cyan-500"
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
