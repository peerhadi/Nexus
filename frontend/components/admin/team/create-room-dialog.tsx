"use client";

import { Hash, LoaderCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { IconButton } from "./icon-button";

export function CreateRoomDialog({
  open,
  roomName,
  roomDescription,
  creatingRoom,
  onRoomNameChange,
  onRoomDescriptionChange,
  onCreateRoom,
  onClose,
}: {
  open: boolean;
  roomName: string;
  roomDescription: string;
  creatingRoom: boolean;
  onRoomNameChange: (value: string) => void;
  onRoomDescriptionChange: (value: string) => void;
  onCreateRoom: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--overlay)] p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-lg)]"
          >
            <div className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface-secondary)] p-5">
              <div className="absolute inset-x-0 top-0 h-1 bg-[var(--accent)]" />
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--accent-border)] bg-[var(--accent-subtle)] text-[var(--accent)]">
                    <Hash size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Create a room</h2>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      Bring the right conversations together.
                    </p>
                  </div>
                </div>
                <IconButton label="Close dialog" onClick={onClose}>
                  <X size={18} />
                </IconButton>
              </div>
            </div>

            <form onSubmit={onCreateRoom} className="space-y-4 p-5">
              <label className="block">
                <span className="mb-2 block text-xs font-bold">Room name</span>
                <input
                  autoFocus
                  required
                  maxLength={80}
                  value={roomName}
                  onChange={(event) => onRoomNameChange(event.target.value)}
                  placeholder="e.g. Project discussions"
                  className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm outline-none transition placeholder:text-[var(--text-secondary)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold">
                  Description{" "}
                  <span className="font-normal text-[var(--text-secondary)]">
                    (optional)
                  </span>
                </span>
                <textarea
                  rows={3}
                  maxLength={300}
                  value={roomDescription}
                  onChange={(event) =>
                    onRoomDescriptionChange(event.target.value)
                  }
                  placeholder="What is this room for?"
                  className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm outline-none transition placeholder:text-[var(--text-secondary)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                />
              </label>

              <div className="flex justify-end gap-2 border-t border-[var(--border)] pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-10 rounded-xl border border-[var(--border)] px-4 text-sm font-semibold hover:bg-[var(--surface-secondary)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!roomName.trim() || creatingRoom}
                  className="flex h-10 items-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-sm font-bold text-[var(--accent-contrast)] transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {creatingRoom && (
                    <LoaderCircle size={15} className="animate-spin" />
                  )}
                  Create room
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
