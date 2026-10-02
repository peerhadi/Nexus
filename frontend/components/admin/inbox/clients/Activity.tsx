import { Clock3 } from "lucide-react";

type ActivityProps = {
  title: string;
  description: string;
  time: string;
};

export function Activity({ title, description, time }: ActivityProps) {
  return (
    <div className="flex gap-3 rounded-xl border border-black/[0.07] bg-white px-3.5 py-3">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-black/[0.05]">
        <Clock3 size={11} className="text-black/35" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-bold">{title}</div>

        <div className="mt-0.5 truncate text-[9px] text-black/35">
          {description}
        </div>
      </div>

      <span className="shrink-0 text-[8px] text-black/25">{time}</span>
    </div>
  );
}
