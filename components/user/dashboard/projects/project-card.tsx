"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, FolderKanban } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    type: string;
    status: string;
    progress: number;
    due: string;
    description: string;
    gradient: string;
  };
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link
        href={`/dashboard/projects/${project.id}`}
        className="group block overflow-hidden rounded-[25px] border border-black/5 bg-white shadow-sm transition hover:shadow-2xl"
      >
        <div
          className={`relative h-36 overflow-hidden bg-gradient-to-br ${project.gradient}`}
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
            {project.status}
          </div>
        </div>

        <div className="p-6">
          <div className="text-xl font-black">{project.name}</div>

          <div className="mt-1 text-[10px] font-bold text-black/30">
            {project.type}
          </div>

          <p className="mt-5 text-xs leading-6 text-black/45">
            {project.description}
          </p>

          <div className="mt-6 flex items-center justify-between text-[10px] font-black">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/[0.05]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{
                duration: 1,
                delay: 0.3,
              }}
              className={`h-full rounded-full bg-gradient-to-r ${project.gradient}`}
            />
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-5">
            <div className="flex items-center gap-2 text-[9px] font-bold text-black/35">
              <CalendarDays size={12} />
              Next milestone: {project.due}
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
