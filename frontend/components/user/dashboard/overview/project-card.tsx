"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock3, FolderKanban } from "lucide-react";

type Project = {
  id: string;
  name: string;
  type: string;
  progress: number;
  status: string;
  color: string;
  soft: string;
  milestone: string;
  due: string;
};

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function OverviewProjectCard({
  project,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 + index * 0.08 }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={`/dashboard/projects/${project.id}`}
        className={`group relative block overflow-hidden rounded-[22px] border border-black/5 bg-gradient-to-br ${project.soft} p-5 shadow-sm transition hover:shadow-xl`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br ${project.color} opacity-15 blur-3xl`}
        />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 7, scale: 1.08 }}
              className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${project.color} text-white shadow-lg`}
            >
              <FolderKanban size={18} />
            </motion.div>

            <div>
              <div className="text-[13px] font-black text-slate-800">
                {project.name}
              </div>

              <div className="mt-1 text-[10px] font-bold text-slate-500/60">
                {project.type}
              </div>
            </div>
          </div>

          <div className="rounded-full border border-white bg-white/70 px-2.5 py-1 text-[9px] font-black text-slate-500 backdrop-blur">
            {project.status}
          </div>
        </div>

        <div className="relative mt-6 flex items-center justify-between text-[10px]">
          <span className="font-bold text-slate-500/70">
            {project.milestone}
          </span>

          <span className="font-black text-slate-700">{project.progress}%</span>
        </div>

        <div className="relative mt-2 h-2 overflow-hidden rounded-full bg-white/80">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{
              duration: 1,
              delay: 0.4,
              ease: "easeOut",
            }}
            className={`h-full rounded-full bg-gradient-to-r ${project.color}`}
          />
        </div>

        <div className="relative mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500/60">
            <Clock3 size={12} />
            Next milestone {project.due}
          </div>

          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${project.color} text-white shadow-md`}
          >
            <ArrowUpRight size={12} />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
