"use client";

import { motion } from "framer-motion";
import { Activity, Check, Flag, Target } from "lucide-react";

import Summary from "./summary";

type ProgressSummaryBarProps = {
  stats: {
    totalProjects: number;
    completedProjects: number;
    activeProjects: number;
    requests: number;
    averageProgress: number;
  };
};

export default function ProgressSummaryBar({ stats }: ProgressSummaryBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.24,
        delay: 0.04,
        ease: "easeOut",
      }}
      className="grid h-auto shrink-0 grid-cols-2 border-b border-[var(--border)] bg-[var(--surface)] sm:h-[68px] sm:grid-cols-4 py-2 gap-2"
    >
      <Summary
        label="Active projects"
        value={String(stats.activeProjects)}
        icon={<Activity size={11} />}
      />

      <Summary
        label="Average progress"
        value={`${stats.averageProgress}%`}
        icon={<Target size={11} />}
      />

      <Summary
        label="Requests"
        value={String(stats.requests)}
        icon={<Flag size={11} />}
      />

      <Summary
        label="Completed"
        value={String(stats.completedProjects)}
        icon={<Check size={11} />}
      />
    </motion.div>
  );
}
