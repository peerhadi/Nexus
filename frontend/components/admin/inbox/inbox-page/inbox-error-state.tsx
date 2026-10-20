"use client";

import { motion } from "framer-motion";

type InboxErrorStateProps = {
  error: string;
};

export default function InboxErrorState({ error }: InboxErrorStateProps) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="text-center"
      >
        <div className="text-[12px] font-bold">Unable to load inbox</div>

        <div className="mt-2 text-[10px] text-[var(--text-tertiary)]">
          {error}
        </div>
      </motion.div>
    </motion.main>
  );
}
