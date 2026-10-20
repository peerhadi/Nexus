"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function RequestsEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="flex min-h-[600px] flex-1 items-center justify-center px-6 text-center"
    >
      <div>
        <Mail size={22} className="mx-auto text-[var(--text-disabled)]" />

        <div className="mt-3 text-[12px] font-bold">No requests yet</div>

        <div className="mt-1 text-[10px] text-[var(--text-muted)]">
          Requests submitted by clients will appear here.
        </div>
      </div>
    </motion.div>
  );
}
