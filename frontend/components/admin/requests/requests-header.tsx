"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Archive, Mail } from "lucide-react";

type RequestsHeaderProps = {
  requestCount: number;
};

export default function RequestsHeader({ requestCount }: RequestsHeaderProps) {
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
          Requests
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
          className="hidden items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 sm:flex"
        >
          <Mail size={14} className="text-[var(--text-muted)]" />

          <span className="text-[11px] font-semibold text-[var(--text-secondary)]">
            {requestCount} requests
          </span>
        </motion.div>

        <Link
          href="/inbox"
          className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-3 py-2 text-[10px] font-bold text-white transition-colors hover:bg-[var(--accent)]/80"
        >
          <Archive size={13} />
          <span className="hidden xs:inline">Inbox</span>
        </Link>
      </div>
    </motion.header>
  );
}
