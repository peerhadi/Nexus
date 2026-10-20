"use client";

import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

type DashboardHeaderProps = {
  refreshing: boolean;
  onRefresh: () => void;
};

export default function DashboardHeader({
  refreshing,
  onRefresh,
}: DashboardHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
    >
      <div>
        <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          Nexus Administration
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
          Dashboard
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">
          Your workspace at a glance. Monitor activity and manage every part of
          Nexus from one place.
        </p>
      </div>

      <div
        onClick={onRefresh}
        className="cursor-pointer inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-hover)] disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
      >
        <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
        Refresh data
      </div>
    </motion.header>
  );
}
