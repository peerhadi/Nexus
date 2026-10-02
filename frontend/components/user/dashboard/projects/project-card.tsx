"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, FolderKanban } from "lucide-react";

const gradients = [
  "from-violet-400 via-fuchsia-400 to-pink-400",
  "from-cyan-400 via-blue-400 to-violet-400",
  "from-emerald-400 via-cyan-400 to-blue-400",
  "from-orange-400 via-pink-400 to-fuchsia-400",
  "from-yellow-400 via-orange-400 to-pink-400",
  "from-indigo-400 via-violet-400 to-fuchsia-400",
];

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string | null;
    status: "PLANNING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "PAUSED";
    progress: number;
    startDate: string | null;
    deadline: string | null;
    completedAt: string | null;
    createdAt: string;
    updatedAt: string;
  };
  index: number;
}

function formatStatus(status: ProjectCardProps["project"]["status"]) {
  return status.replaceAll("_", " ");
}

function formatDeadline(deadline: string | null) {
  if (!deadline) {
    return "No deadline set";
  }

  return new Date(deadline).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getProjectType(status: ProjectCardProps["project"]["status"]) {
  switch (status) {
    case "PLANNING":
      return "Planning";
    case "IN_PROGRESS":
      return "Development";
    case "REVIEW":
      return "Review";
    case "COMPLETED":
      return "Completed";
    case "PAUSED":
      return "Paused";
    default:
      return "Project";
  }
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.1,
      }}
      whileHover={{
        y: -5,
      }}
    >
      <Link
        href={`/dashboard/projects/${project.id}`}
        className="group block overflow-hidden rounded-[25px] border border-black/5 bg-white shadow-sm transition hover:shadow-2xl"
      >
        <div
          className={`relative h-36 overflow-hidden bg-gradient-to-br ${gradient}`}
        >
          <motion.div
            animate={{
              x: [0, 80, -20, 0],
              y: [0, -30, 20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
            }}
            className="absolute -right-10 -top-24 h-64 w-64 rounded-full bg-white/20 blur-3xl"
          />

          <div className="absolute bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-xl bg-black/80 text-white backdrop-blur">
            <FolderKanban size={18} />
          </div>

          <div className="absolute right-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-black">
            {formatStatus(project.status)}
          </div>
        </div>

        <div className="p-6">
          <div className="text-xl font-black">{project.name}</div>

          <div className="mt-1 text-[10px] font-bold text-black/30">
            {getProjectType(project.status)}
          </div>

          <p className="mt-5 text-xs leading-6 text-black/45">
            {project.description ?? "No project description yet."}
          </p>

          <div className="mt-6 flex items-center justify-between text-[10px] font-black">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/[0.05]">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${project.progress}%`,
              }}
              transition={{
                duration: 1,
                delay: 0.3,
              }}
              className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
            />
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-5">
            <div className="flex items-center gap-2 text-[9px] font-bold text-black/35">
              <CalendarDays size={12} />
              Next milestone: {formatDeadline(project.deadline)}
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black text-white transition group-hover:translate-x-1">
              <ArrowUpRight size={13} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
