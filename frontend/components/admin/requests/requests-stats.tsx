"use client";

import { motion } from "framer-motion";

import { Stat } from "@/components/admin/inbox/requests/stat";
import { countByStatus } from "./requests-data";
import type { Request } from "@/lib/inbox/request-types";

type RequestsStatsProps = {
  requests: Request[];
};

export default function RequestsStats({ requests }: RequestsStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.25,
        delay: 0.04,
        ease: "easeOut",
      }}
      className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4"
    >
      <Stat label="New" value={countByStatus(requests, "NEW")} />

      <Stat label="In progress" value={countByStatus(requests, "IN_PROGRESS")} />

      <Stat label="Replied" value={countByStatus(requests, "REPLIED")} />

      <Stat label="Closed" value={countByStatus(requests, "CLOSED")} />
    </motion.div>
  );
}
