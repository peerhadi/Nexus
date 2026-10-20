"use client";

import { AnimatePresence, motion } from "framer-motion";

type RequestsNoticesProps = {
  error: string;
  showError: boolean;
  showProjectCreated: boolean;
};

export default function RequestsNotices({
  error,
  showError,
  showProjectCreated,
}: RequestsNoticesProps) {
  return (
    <AnimatePresence initial={false}>
      {showError && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -4 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="mt-3 overflow-hidden rounded-xl border border-red-500/10 bg-red-500/[0.04] px-4 py-3 text-[10px] font-semibold text-red-600 sm:mt-4"
        >
          {error}
        </motion.div>
      )}

      {showProjectCreated && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -4 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="mt-3 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[10px] font-semibold text-[var(--text-secondary)] sm:mt-4"
        >
          Project created successfully.
        </motion.div>
      )}
    </AnimatePresence>
  );
}
