"use client";

import Link from "next/link";
import { ArrowUpRight, Clock3, MessageCircle } from "lucide-react";

interface ProjectSidebarProps {
  project: {
    deadline: string | null;
    updates: {
      id: string;
      title: string;
      progress: number;
      type: "PROGRESS" | "MILESTONE" | "NOTE" | "COMPLETED";
      createdAt: string;
    }[];
  };
}

function formatDeadline(deadline: string | null) {
  if (!deadline) {
    return "No deadline set";
  }

  return new Date(deadline).toLocaleDateString([], {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getNextMilestone(updates: ProjectSidebarProps["project"]["updates"]) {
  const incomplete = updates
    .filter((update) => update.progress < 100 && update.type !== "COMPLETED")
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

  return incomplete[0] ?? null;
}

export default function ProjectSidebar({ project }: ProjectSidebarProps) {
  const nextMilestone = getNextMilestone(project.updates);

  return (
    <section className="space-y-3">
      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <Clock3 size={18} />

        <div className="mt-7 text-[10px] font-black uppercase tracking-[0.15em] text-black/30">
          Next milestone
        </div>

        <div className="mt-2 text-2xl font-black">
          {nextMilestone?.title ?? "No upcoming milestone"}
        </div>

        <div className="mt-2 text-[10px] font-bold text-black/35">
          {formatDeadline(project.deadline)}
        </div>
      </div>

      <Link
        href="/dashboard/messages"
        className="group flex items-center justify-between rounded-2xl border border-black/5 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 p-6 text-white shadow-lg transition hover:-translate-y-1"
      >
        <div>
          <MessageCircle size={18} />

          <div className="mt-5 text-sm font-black">Talk about this project</div>

          <div className="mt-1 text-[10px] text-white/60">
            Message the Nexus team.
          </div>
        </div>

        <ArrowUpRight
          size={18}
          className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </Link>
    </section>
  );
}
