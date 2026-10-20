"use client";

import { motion } from "framer-motion";
import { Activity, Target } from "lucide-react";

type ProgressPageHeaderProps = {
  activeProjects: number;
};

export default function ProgressPageHeader({
  activeProjects,
}: ProgressPageHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="flex h-[74px] shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-4 sm:px-7"
    >
      <div>
        <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">
          Nexus
        </div>

        <h1 className="mt-1 text-[18px] font-bold tracking-[-0.04em]">
          Project progress
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: 0.05 }}
        className="flex items-center gap-2"
      >
        <div className="hidden items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-3 py-2 sm:flex">
          <Activity size={11} className="text-[var(--text-muted)]" />

          <span className="text-[8px] font-bold text-[var(--text-tertiary)]">
            {activeProjects} active
          </span>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--accent-contrast)]">
          <Target size={12} />
        </div>
      </motion.div>
    </motion.header>
  );
}
