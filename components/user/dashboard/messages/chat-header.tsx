import { conversations } from "./data";

interface ChatHeaderProps {
  activeConversation: number;
}

export default function ChatHeader({ activeConversation }: ChatHeaderProps) {
  const active = conversations[activeConversation];

  return (
    <header className="flex shrink-0 items-center gap-4 border-b border-violet-100 bg-white px-6 py-5">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${active.gradient} text-[11px] font-black text-white shadow-md`}
      >
        N
      </div>

      <div className="min-w-0">
        <div className="text-[12px] font-black text-slate-800">
          {active.name}
        </div>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-[8px] font-black uppercase tracking-[0.12em] text-violet-400">
            {active.project}
          </span>

          <span className="h-1 w-1 rounded-full bg-slate-200" />

          <span className="flex items-center gap-1 text-[8px] font-bold text-emerald-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Online
          </span>
        </div>
      </div>
    </header>
  );
}
