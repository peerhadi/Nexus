"use client";

import { motion } from "framer-motion";

export default function ProgressEmptyDetail() {
  return (
    <motion.section
      key="empty"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex min-h-0 min-w-0 flex-1 items-center justify-center bg-[var(--surface-secondary)]"
    >
      <div className="px-6 text-center">
        <div className="text-[11px] font-bold">No project selected</div>

        <div className="mt-1 text-[9px] text-[var(--text-muted)]">
          Select a project to manage its progress.
        </div>
      </div>
    </motion.section>
  );
}
