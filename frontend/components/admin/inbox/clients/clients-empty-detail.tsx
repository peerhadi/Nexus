"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

export function ClientsEmptyDetail() {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex min-h-[560px] min-w-0 items-center justify-center p-6 text-center lg:min-h-0"
    >
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-hover)]">
          <Users size={18} className="text-[var(--text-muted)]" />
        </div>

        <div className="mt-4 text-sm font-bold">No clients yet</div>

        <div className="mt-1 text-[10px] text-[var(--text-muted)]">
          Client accounts will appear here when users sign up.
        </div>
      </div>
    </motion.div>
  );
}
