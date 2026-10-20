"use client";

import { motion } from "framer-motion";

import type { Conversation } from "@/lib/inbox/inbox-types";

import { ArchiveHeader } from "./ArchiveHeader";
import { ArchiveStats } from "./ArchiveStats";

type ArchivePageHeaderProps = {
  items: Conversation[];
};

export function ArchivePageHeader({ items }: ArchivePageHeaderProps) {
  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="shrink-0"
      >
        <ArchiveHeader count={items.length} />
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.25,
          delay: 0.04,
          ease: "easeOut",
        }}
        className="shrink-0"
      >
        <ArchiveStats items={items} />
      </motion.div>
    </>
  );
}
