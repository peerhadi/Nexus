"use client";

import { useNotes } from "./use-notes";
import NotesSidebar from "./notes-sidebar";
import NotesMobileDrawer from "./notes-mobile-drawer";
import NotesEditor from "./notes-editor";

export default function NotesWorkspace() {
  const controller = useNotes();

  return (
    <main className="flex h-[calc(100vh-70px)] min-h-0 overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      <NotesSidebar controller={controller} />
      <NotesMobileDrawer controller={controller} />
      <NotesEditor controller={controller} />
    </main>
  );
}
