"use client";

import { MessagesSquare, Plus } from "lucide-react";

export function NoRoomState({
  loadingRooms,
  onCreateRoom,
}: {
  loadingRooms: boolean;
  onCreateRoom: () => void;
}) {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-6 text-center">
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[var(--accent-subtle)] opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[var(--info-bg)] opacity-60 blur-3xl" />

      <div className="relative">
        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl border border-[var(--accent-border)] bg-[var(--accent-subtle)] text-[var(--accent)]">
          <MessagesSquare size={27} />
        </div>

        <h2 className="text-lg font-bold">
          {loadingRooms ? "Loading Admin Chat" : "Your team starts here"}
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
          {loadingRooms
            ? "Loading your team's conversations."
            : "Choose a room to catch up or create a new one for your next project."}
        </p>

        {!loadingRooms && (
          <button
            type="button"
            onClick={onCreateRoom}
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-sm font-bold text-[var(--accent-contrast)] transition hover:opacity-85"
          >
            <Plus size={16} />
            Create a room
          </button>
        )}
      </div>
    </div>
  );
}
