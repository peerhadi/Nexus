"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

type ClientsHeaderProps = {
  count: number;
};

export function ClientsHeader({ count }: ClientsHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="flex h-[74px] shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-4 backdrop-blur-xl sm:px-8"
    >
      <div className="min-w-0">
        <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Communication
        </div>

        <h1 className="mt-1 text-[21px] font-bold tracking-[-0.045em]">
          Clients
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: 0.05 }}
        className="flex shrink-0 items-center gap-2"
      >
        <div className="hidden items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 sm:flex">
          <Users size={14} className="text-[var(--text-muted)]" />

          <span className="text-[11px] font-semibold text-[var(--text-secondary)]">
            {count} clients
          </span>
        </div>

        {/* Mobile client count */}
        <div className="flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2 sm:hidden">
          <Users size={13} className="text-[var(--text-muted)]" />

          <span className="text-[10px] font-semibold text-[var(--text-secondary)]">
            {count}
          </span>
        </div>
      </motion.div>
    </motion.header>
  );
}
