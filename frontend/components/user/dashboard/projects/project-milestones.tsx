"use client";

import { Check } from "lucide-react";

type ProjectUpdate = {
  id: string;
  title: string;
  description: string;
  type: "PROGRESS" | "MILESTONE" | "NOTE" | "COMPLETED";
  progress: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    role: "CLIENT" | "ADMIN";
  };
  comments: {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    author: {
      id: string;
      name: string;
      role: "CLIENT" | "ADMIN";
    };
  }[];
};

interface ProjectMilestonesProps {
  updates: ProjectUpdate[];
}

function getStatus(update: ProjectUpdate, index: number) {
  if (update.type === "COMPLETED") {
    return "Completed";
  }

  if (update.type === "MILESTONE") {
    return update.progress >= 100 ? "Completed" : "Milestone";
  }

  if (index === 0) {
    return "In progress";
  }

  return update.type === "NOTE" ? "Note" : "Progress update";
}

export default function ProjectMilestones({ updates }: ProjectMilestonesProps) {
  const milestones = [...updates].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  return (
    <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
      <div className="mb-7">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">
          Roadmap
        </div>

        <h2 className="mt-1 text-xl font-black">Project milestones</h2>
      </div>

      {milestones.length === 0 ? (
        <div className="rounded-xl bg-black/[0.03] px-5 py-8 text-center">
          <div className="text-[11px] font-black text-black/40">
            No milestones yet
          </div>

          <p className="mt-1 text-[9px] font-medium text-black/25">
            Project updates will appear here as work progresses.
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {milestones.map((update, index) => {
            const status = getStatus(update, index);

            const done = update.progress >= 100 || update.type === "COMPLETED";

            const isCurrent =
              !done &&
              (status === "In progress" || index === milestones.length - 1);

            return (
              <div
                key={update.id}
                className="relative flex items-center gap-4 py-4"
              >
                {index !== milestones.length - 1 && (
                  <div
                    className={`absolute left-[15px] top-[46px] h-8 w-px ${
                      done ? "bg-black/40" : "bg-black/10"
                    }`}
                  />
                )}

                <div
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    done
                      ? "bg-black/90 text-white"
                      : isCurrent
                        ? "bg-gradient-to-br from-pink-400 to-violet-400 text-white"
                        : "bg-black/[0.05] text-black/20"
                  }`}
                >
                  {done ? <Check size={13} /> : index + 1}
                </div>

                <div className="min-w-0">
                  <div className="text-[12px] font-black">{update.title}</div>

                  <div className="mt-1 text-[9px] font-bold text-black/35">
                    {status}
                  </div>

                  {update.description && (
                    <p className="mt-1 max-w-lg text-[9px] leading-4 text-black/25">
                      {update.description}
                    </p>
                  )}
                </div>

                {isCurrent && (
                  <div className="ml-auto shrink-0 rounded-full bg-violet-50 px-2.5 py-1 text-[8px] font-black text-violet-600">
                    CURRENT
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
