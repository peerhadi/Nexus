"use client";

import { Composer } from "./composer";
import { CreateRoomDialog } from "./create-room-dialog";
import { MessageThread } from "./message-thread";
import { NoRoomState } from "./no-room-state";
import { RoomHeader } from "./room-header";
import { RoomsSidebar } from "./rooms-sidebar";
import { TeamHeader } from "./team-header";
import { useTeamChat } from "./use-team-chat";

export function AdminChat() {
  const chat = useTeamChat();

  return (
    <main className="flex h-[calc(100dvh-2rem)] min-h-[540px] flex-col gap-5 overflow-hidden p-3 text-[var(--text)] sm:p-5 lg:p-6">
      <TeamHeader connected={chat.connected} />

      <section className="flex min-h-0 flex-1 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
        <RoomsSidebar
          rooms={chat.rooms}
          filteredRooms={chat.filteredRooms}
          selectedRoomId={chat.selectedRoomId}
          search={chat.search}
          loadingRooms={chat.loadingRooms}
          mobileRoomsOpen={chat.mobileRoomsOpen}
          onSearchChange={chat.setSearch}
          onSelectRoom={(id) => {
            chat.setSelectedRoomId(id);
            chat.setMobileRoomsOpen(false);
          }}
          onNewRoom={() => chat.setShowRoomDialog(true)}
        />

        <div
          className={`${
            chat.mobileRoomsOpen ? "hidden" : "flex"
          } min-w-0 flex-1 flex-col md:flex`}
        >
          {chat.selectedRoom ? (
            <>
              <RoomHeader
                room={chat.selectedRoom}
                loadingMessages={chat.loadingMessages}
                onBack={() => chat.setMobileRoomsOpen(true)}
                onReload={() => void chat.loadMessages(chat.selectedRoom!.id)}
              />

              <MessageThread
                messages={chat.messages}
                currentUserId={chat.currentUserId}
                loadingMessages={chat.loadingMessages}
                editingMessageId={chat.editingMessageId}
                editingContent={chat.editingContent}
                menuMessageId={chat.menuMessageId}
                messageEndRef={chat.messageEndRef}
                onComposerFocus={() => chat.composerRef.current?.focus()}
                onEditingContentChange={chat.setEditingContent}
                onStartEdit={(message) => {
                  chat.setEditingMessageId(message.id);
                  chat.setEditingContent(message.content);
                  chat.setMenuMessageId("");
                }}
                onCancelEdit={() => {
                  chat.setEditingMessageId("");
                  chat.setEditingContent("");
                }}
                onSaveEdit={(messageId) => void chat.saveEdit(messageId)}
                onToggleMenu={(messageId) =>
                  chat.setMenuMessageId((current) =>
                    current === messageId ? "" : messageId,
                  )
                }
                onRemove={(messageId) => void chat.removeMessage(messageId)}
              />

              <Composer
                roomName={chat.selectedRoom.name}
                draft={chat.draft}
                sending={chat.sending}
                composerRef={chat.composerRef}
                onDraftChange={chat.setDraft}
                onSend={() => void chat.sendMessage()}
              />
            </>
          ) : (
            <NoRoomState
              loadingRooms={chat.loadingRooms}
              onCreateRoom={() => chat.setShowRoomDialog(true)}
            />
          )}
        </div>
      </section>

      <CreateRoomDialog
        open={chat.showRoomDialog}
        roomName={chat.roomName}
        roomDescription={chat.roomDescription}
        creatingRoom={chat.creatingRoom}
        onRoomNameChange={chat.setRoomName}
        onRoomDescriptionChange={chat.setRoomDescription}
        onCreateRoom={chat.createRoom}
        onClose={() => chat.setShowRoomDialog(false)}
      />
    </main>
  );
}
