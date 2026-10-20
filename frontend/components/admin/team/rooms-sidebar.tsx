"use client";

import { LoaderCircle, MessagesSquare, Plus, Search, ShieldCheck, Users, X } from "lucide-react";

import { IconButton } from "./icon-button";
import { RoomListItem } from "./room-list-item";
import type { Room } from "./types";

export function RoomsSidebar({
  rooms,
  filteredRooms,
  selectedRoomId,
  search,
  loadingRooms,
  mobileRoomsOpen,
  onSearchChange,
  onSelectRoom,
  onNewRoom,
}: {
  rooms: Room[];
  filteredRooms: Room[];
  selectedRoomId: string;
  search: string;
  loadingRooms: boolean;
  mobileRoomsOpen: boolean;
  onSearchChange: (value: string) => void;
  onSelectRoom: (id: string) => void;
  onNewRoom: () => void;
}) {
  return (
    <aside
      className={`${
        mobileRoomsOpen ? "flex" : "hidden"
      } w-full shrink-0 flex-col border-r border-[var(--border)] md:flex md:w-[290px] lg:w-[330px]`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-4">
        <div>
          <h2 className="text-sm font-bold">Conversations</h2>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            {rooms.length} active {rooms.length === 1 ? "room" : "rooms"}
          </p>
        </div>
        <button
          type="button"
          onClick={onNewRoom}
          className="flex h-9 items-center gap-1.5 rounded-xl bg-[var(--accent)] px-3 text-xs font-bold text-[var(--accent-contrast)] transition hover:opacity-85"
        >
          <Plus size={15} />
          New room
        </button>
      </div>

      <div className="border-b border-[var(--border)] p-3">
        <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-3 transition focus-within:border-[var(--accent)]">
          <Search size={15} className="shrink-0 text-[var(--text-secondary)]" />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search conversations..."
            aria-label="Search conversations"
            className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--text-secondary)]"
          />
          {search && (
            <IconButton label="Clear search" onClick={() => onSearchChange("")}>
              <X size={14} />
            </IconButton>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {loadingRooms ? (
          <div className="flex items-center justify-center gap-2 py-12 text-sm text-[var(--text-secondary)]">
            <LoaderCircle
              size={17}
              className="animate-spin text-[var(--accent)]"
            />
            Loading conversations
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--accent)]">
              {search ? <Search size={19} /> : <MessagesSquare size={21} />}
            </div>
            <p className="text-sm font-semibold">
              {search ? "No matching rooms" : "A fresh start"}
            </p>
            <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
              {search
                ? "Try a different search term."
                : "Create a room and get the team talking."}
            </p>
            {!search && (
              <button
                type="button"
                onClick={onNewRoom}
                className="mt-4 rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-semibold hover:bg-[var(--surface-secondary)]"
              >
                Create your first room
              </button>
            )}
          </div>
        ) : (
          filteredRooms.map((room) => (
            <RoomListItem
              key={room.id}
              room={room}
              active={room.id === selectedRoomId}
              onSelect={() => onSelectRoom(room.id)}
            />
          ))
        )}
      </div>

      <div className="flex items-center gap-3 border-t border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--success)]">
          <ShieldCheck size={17} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold">Private workspace</p>
          <p className="mt-0.5 text-[10px] text-[var(--text-secondary)]">
            Restricted to admins
          </p>
        </div>
        <Users size={16} className="text-[var(--text-secondary)]" />
      </div>
    </aside>
  );
}
