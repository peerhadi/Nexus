"use client";

import { AnimatePresence, motion } from "framer-motion";

type RequestsToastsProps = {
  updating: boolean;
  creatingProject: boolean;
};

export default function RequestsToasts({
  updating,
  creatingProject,
}: RequestsToastsProps) {
  return (
    <AnimatePresence>
      {updating && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.16 }}
          className="pointer-events-none fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[10px] font-bold text-[var(--text-secondary)] shadow-lg sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0"
        >
          Updating request...
        </motion.div>
      )}

      {creatingProject && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.16 }}
          className="pointer-events-none fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[10px] font-bold text-[var(--text-secondary)] shadow-lg sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0"
        >
          Creating project...
        </motion.div>
      )}
    </AnimatePresence>
  );
}
