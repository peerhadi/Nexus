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
        style={{ background: project.soft }}
        className="group relative block overflow-hidden rounded-[22px] border border-[var(--border-subtle)] p-5 shadow-[var(--shadow-sm)] transition hover:shadow-[var(--shadow-xl)]"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{ background: project.color }}
          className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-15 blur-3xl"
        />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 7, scale: 1.08 }}
              style={{ background: project.color }}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-[var(--text-inverse)] shadow-[var(--shadow-lg)]"
            >
              <FolderKanban size={18} />
            </motion.div>

            <div>
              <div className="text-[13px] font-black text-[var(--text-primary)]">
                {project.name}
              </div>

              <div className="mt-1 text-[10px] font-bold text-[var(--text-tertiary)]">
                {project.type}
              </div>
            </div>
          </div>

          <div className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[9px] font-black text-[var(--text-tertiary)] backdrop-blur">
            {project.status}
          </div>
        </div>

        <div className="relative mt-6 flex items-center justify-between text-[10px]">
          <span className="font-bold text-[var(--text-tertiary)]">
            {project.milestone}
          </span>

          <span className="font-black text-[var(--text-secondary)]">
            {project.progress}%
          </span>
        </div>

        <div className="relative mt-2 h-2 overflow-hidden rounded-full bg-[var(--surface)]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{
              duration: 1,
              delay: 0.4,
              ease: "easeOut",
            }}
            style={{ background: project.color }}
            className="h-full rounded-full"
          />
        </div>

        <div className="relative mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-[var(--text-tertiary)]">
            <Clock3 size={12} />
            Next milestone {project.due}
          </div>

          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            style={{ background: project.color }}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-[var(--text-inverse)] shadow-[var(--shadow-md)]"
          >
            <ArrowUpRight size={12} />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
