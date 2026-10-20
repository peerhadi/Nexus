"use client";

import type { NotesController } from "./use-notes";
import NotesEditorHeader from "./notes-editor-header";
import NotesMobileToolbar from "./notes-mobile-toolbar";
import NotesMobileActions from "./notes-mobile-actions";
import NotesWritingArea from "./notes-writing-area";
import NotesEditorFooter from "./notes-editor-footer";
import NotesEmptyEditor from "./notes-empty-editor";

export default function NotesEditor({
  controller,
}: {
  controller: NotesController;
}) {
  const {
    selectedNote,
    saving,
    deleting,
    editorMode,
    setEditorMode,
    setMenuOpen,
    createNote,
    updateSelectedNote,
    toggleStar,
    deleteNote,
    changeCategory,
  } = controller;

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-[var(--surface)]">
      {selectedNote ? (
        <>
          <NotesMobileToolbar
            selectedNote={selectedNote}
            saving={saving}
            onOpen={() => setMenuOpen(true)}
          />

          <NotesEditorHeader
            selectedNote={selectedNote}
            saving={saving}
            editorMode={editorMode}
            setEditorMode={setEditorMode}
            toggleStar={toggleStar}
            deleteNote={deleteNote}
            deleting={deleting}
            changeCategory={changeCategory}
          />

          <NotesMobileActions
            selectedNote={selectedNote}
            editorMode={editorMode}
            setEditorMode={setEditorMode}
            toggleStar={toggleStar}
            deleteNote={deleteNote}
            deleting={deleting}
            changeCategory={changeCategory}
          />

          <NotesWritingArea
            selectedNote={selectedNote}
            editorMode={editorMode}
            setEditorMode={setEditorMode}
            updateSelectedNote={updateSelectedNote}
          />

          <NotesEditorFooter selectedNote={selectedNote} saving={saving} />
        </>
      ) : (
        <NotesEmptyEditor onCreate={createNote} />
      )}
    </section>
  );
}
