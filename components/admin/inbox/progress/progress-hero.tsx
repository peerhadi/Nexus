"use client";

import { Clock3, Minus, Plus, Target } from "lucide-react";
import type { Project } from "@/lib/inbox/progress-types";

type ProgressHeroProps = {
  project: Project;
  onProgressChange: (amount: number) => void;
};

export default function ProgressHero({
  project,
  onProgressChange,
}: ProgressHeroProps) {
  return (
    <div className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_5px_22px_rgba(0,0,0,0.035)]">
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-black/25">
            Project progress
          </div>

          <h2 className="mt-1.5 text-[23px] font-bold leading-[1.05] tracking-[-0.05em]">
            {project.name}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-[8px] text-black/30">
            <Clock3 size={10} />
            Deadline {project.deadline}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end">
          <div
            className="text-[34px] font-black leading-none tracking-[-0.07em]"
            style={{ color: project.color }}
          >
            {project.progress}%
          </div>

          <span className="mt-1 text-[7px] font-bold uppercase tracking-[0.12em] text-black/25">
            Complete
          </span>
        </div>
      </div>

      <div className="mt-7">
        <div className="relative h-3 overflow-hidden rounded-full bg-black/[0.06]">
          <div
            className="relative h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${project.progress}%`,
              backgroundColor: project.color,
            }}
          >
            <div className="absolute inset-y-0 right-0 w-8 bg-white/25 blur-md" />
          </div>
        </div>

        <div className="mt-2 flex justify-between text-[7px] font-bold text-black/25">
          <span>Started</span>
          <span>Target completion</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl border border-black/[0.06] bg-[#f7f7f5] p-2">
        <div className="flex items-center gap-2 px-2">
          <Target size={12} className="text-black/30" />

          <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-black/35">
            Adjust progress
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onProgressChange(-5)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.07] bg-white text-black/45 transition-all hover:-translate-y-0.5 hover:text-black hover:shadow-[0_4px_10px_rgba(0,0,0,0.07)]"
          >
            <Minus size={12} />
          </button>

          <button
            type="button"
            onClick={() => onProgressChange(5)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_5px_13px_rgba(0,0,0,0.14)]"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
