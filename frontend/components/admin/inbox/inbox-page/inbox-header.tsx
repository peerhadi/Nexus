"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Archive } from "lucide-react";

export default function InboxHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="flex shrink-0 items-center justify-between border-b border-[var(--border)] px-4 py-4 sm:px-7"
    >
      <div className="min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
          Inbox
        </div>

        <h1 className="mt-1 truncate text-[20px] font-bold tracking-[-0.04em] sm:text-[22px]">
          Conversations
        </h1>
      </div>

      <Link
        href="/admin"
        className="flex shrink-0 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-[10px] font-bold text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
      >
        <Archive size={12} />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>
    </motion.div>
  );
}
