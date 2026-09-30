"use client";

import { MessageSquare, Send } from "lucide-react";
import type { Project } from "@/lib/inbox/progress-types";

type ProjectUpdatesProps = {
  project: Project;
  newUpdate: string;
  onUpdateChange: (value: string) => void;
  onAddUpdate: () => void;
};

export default function ProjectUpdates({
  project,
  newUpdate,
  onUpdateChange,
  onAddUpdate,
}: ProjectUpdatesProps) {
  return (
    <div className="rounded-2xl border border-black/[0.07] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.025)]">
      <div className="border-b border-black/[0.07] px-5 py-4">
        <div className="flex items-center gap-2">
          <MessageSquare size={12} />

          <span className="text-[10px] font-bold">Project updates</span>
        </div>

        <div className="mt-1 text-[8px] text-black/30">
          Keep the project timeline up to date.
        </div>
      </div>

      <div className="p-4">
        <div className="flex gap-2">
          <textarea
            value={newUpdate}
            onChange={(event) => onUpdateChange(event.target.value)}
            placeholder="Write a project update..."
            rows={3}
            className="min-w-0 flex-1 resize-none rounded-xl border border-black/[0.08] bg-[#f7f7f5] p-3 text-[9px] leading-4 outline-none transition-colors placeholder:text-black/25 focus:border-black/20 focus:bg-white"
          />

          <button
            type="button"
            onClick={onAddUpdate}
            disabled={!newUpdate.trim()}
            className="flex h-9 w-9 shrink-0 items-center justify-center self-end rounded-xl bg-black text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_15px_rgba(0,0,0,0.13)] disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:translate-y-0"
          >
            <Send size={12} />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {project.updates.map((update, index) => (
            <div key={update.id} className="relative flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className="mt-1 h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: project.color,
                  }}
                />

                {index < project.updates.length - 1 && (
                  <div className="mt-1 h-full w-px bg-black/[0.08]" />
                )}
              </div>

              <div className="pb-2">
                <div className="text-[9px] leading-4 text-black/60">
                  {update.text}
                </div>

                <div className="mt-1 text-[7px] font-bold uppercase tracking-[0.1em] text-black/25">
                  {update.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
