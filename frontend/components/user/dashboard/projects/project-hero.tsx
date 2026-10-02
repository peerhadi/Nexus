"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ProjectHeroProps {
  project: {
    name: string;
    description: string | null;
    status: "PLANNING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "PAUSED";
    progress: number;
    startDate: string | null;
  };
}

function formatStatus(status: ProjectHeroProps["project"]["status"]) {
  switch (status) {
    case "PLANNING":
      return "Planning";
    case "IN_PROGRESS":
      return "In development";
    case "REVIEW":
      return "In review";
    case "COMPLETED":
      return "Completed";
    case "PAUSED":
      return "Paused";
    default:
      return status;
  }
}

function formatStartDate(date: string | null) {
  if (!date) return "Start date not set";

  return `Started ${new Date(date).toLocaleDateString([], {
    month: "short",
    day: "numeric",
  })}`;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="relative overflow-hidden rounded-[28px] border border-black/5 bg-gradient-to-br from-violet-100 via-fuchsia-50 to-cyan-50 p-7 shadow-sm lg:p-9"
    >
      <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-violet-400/30 blur-[90px]" />

      <div className="absolute -bottom-40 left-[35%] h-80 w-80 rounded-full bg-cyan-400/25 blur-[90px]" />

      <div className="relative">
        <div className="mb-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/35">
          <Sparkles size={12} />
          Active project
        </div>

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-black tracking-[-0.04em] text-black">
              {project.name}
            </h1>

            <p className="mt-2 text-sm text-black/40">
              {project.description ?? "No project description yet."} ·{" "}
              {formatStartDate(project.startDate)}
            </p>
          </div>

          <div className="rounded-full border border-black/5 bg-white/70 px-4 py-2 text-[10px] font-black text-black/60 backdrop-blur">
            {formatStatus(project.status)}
          </div>
        </div>

        <div className="mt-9 max-w-2xl">
          <div className="mb-2 flex justify-between text-[10px] font-black">
            <span className="text-black/35">Overall progress</span>

            <span className="text-black">{project.progress}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-black/5">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${project.progress}%`,
              }}
              transition={{
                duration: 1.2,
              }}
              className="h-full rounded-full bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
