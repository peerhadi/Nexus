"use client";

import { AnimatePresence, motion } from "framer-motion";

type ProgressErrorBannerProps = {
  error: string;
};

export default function ProgressErrorBanner({
  error,
}: ProgressErrorBannerProps) {
  return (
    <AnimatePresence initial={false}>
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.18 }}
          className="shrink-0 overflow-hidden border-b border-red-500/10 bg-red-50 px-4 py-2 text-[8px] font-semibold text-red-500 sm:px-5"
        >
          {error}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
