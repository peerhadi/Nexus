"use client";

import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";

export default function InboxEmptyDetail() {
  return (
    <motion.section
      key="empty"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="flex min-w-0 flex-1 items-center justify-center"
    >
      <div className="text-center">
        <Clock3 size={24} className="mx-auto text-[var(--text-disabled)]" />

        <div className="mt-3 text-[12px] font-bold">
          No conversation selected
        </div>

        <div className="mt-1 text-[10px] text-[var(--text-muted)]">
          Select a conversation to view its messages.
        </div>
      </div>
    </motion.section>
  );
}
