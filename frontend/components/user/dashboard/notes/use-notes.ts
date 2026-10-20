"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Note } from "./types";
import { apiRequest } from "./notes-api";

export function useNotes() {
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
  const [menuOpen, setMenuOpen] = useState(false);

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  const selectedNote = useMemo(
    () => notes.find((note) => note.id === selectedId) ?? null,
    [notes, selectedId],
  );

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

      const data = await apiRequest<{
        success: boolean;
        notes: Note[];
      }>(`/notes${query ? `?${query}` : ""}`);

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
      void loadNotes();
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

      const data = await apiRequest<{
        success: boolean;
        note: Note;
      }>("/notes", {
        method: "POST",
        body: JSON.stringify({
          title: "",
          content: "",
          category: activeCategory !== "All" ? activeCategory : "General",
          starred: false,
        }),
      });

      setNotes((current) => [data.note, ...current]);
      setSelectedId(data.note.id);
      setEditorMode("write");
      setMenuOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create note");
    } finally {
      setCreating(false);
    }
  };

  const updateNoteLocally = (id: string, changes: Partial<Note>) => {
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

        const data = await apiRequest<{
          success: boolean;
          note: Note;
        }>(`/notes/${id}`, {
          method: "PATCH",
          body: JSON.stringify(changes),
        });

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
    const note = notes.find((item) => item.id === id);

    if (!note) return;

    try {
      setError("");

      updateNoteLocally(id, {
        starred: !note.starred,
      });

      const data = await apiRequest<{
        success: boolean;
        note: Note;
      }>(`/notes/${id}/star`, {
        method: "PATCH",
      });

      updateNoteLocally(id, data.note);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update star");

      void loadNotes();
    }
  };

  const deleteNote = async (id: string) => {
    if (deleting) return;

    try {
      setDeleting(true);
      setError("");

      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
        saveTimer.current = null;
      }

      requestIdRef.current++;

      await apiRequest<{ success: boolean }>(`/notes/${id}`, {
        method: "DELETE",
      });

      const remaining = notes.filter((note) => note.id !== id);

      setNotes(remaining);

      if (selectedId === id) {
        setSelectedId(remaining[0]?.id ?? null);
        setEditorMode("write");
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

  const selectNote = (note: Note) => {
    setSelectedId(note.id);
    setEditorMode("write");
    setMenuOpen(false);
  };

  return {
    notes,
    selectedId,
    selectedNote,
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    loading,
    saving,
    creating,
    deleting,
    error,
    editorMode,
    setEditorMode,
    menuOpen,
    setMenuOpen,
    createNote,
    updateSelectedNote,
    toggleStar,
    deleteNote,
    changeCategory,
    selectNote,
  };
}

export type NotesController = ReturnType<typeof useNotes>;
