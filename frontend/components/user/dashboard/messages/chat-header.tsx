import { Conversation } from "./types";

export function ChatHeader({ conversation }: { conversation: Conversation }) {
  return (
    <div className="flex shrink-0 items-center gap-4 border-b border-violet-100 bg-white px-6 py-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 text-sm font-black text-white shadow-lg shadow-violet-500/20">
        N
      </div>

      <div className="min-w-0">
        <div className="truncate text-sm font-black text-slate-800">
          {conversation.subject ?? "Nexus Team"}
        </div>

        <div className="mt-1 flex items-center gap-2 text-[11px] font-semibold text-slate-400">
          <span>
            {conversation.status === "OPEN"
              ? "Open conversation"
              : "Closed conversation"}
          </span>

          <span className="h-1 w-1 rounded-full bg-slate-300" />

          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Online
          </span>
        </div>
      </div>
    </div>
  );
}
