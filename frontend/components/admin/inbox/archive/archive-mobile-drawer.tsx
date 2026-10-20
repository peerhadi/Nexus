"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type ArchiveMobileDrawerProps = {
  open: boolean;
  count: number;
  onClose: () => void;
  children: ReactNode;
};

export function ArchiveMobileDrawer({
  open,
  count,
  onClose,
  children,
}: ArchiveMobileDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close archive menu"
            className="fixed inset-x-0 bottom-0 top-0 z-40 bg-[var(--overlay)] backdrop-blur-[2px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 340,
              damping: 32,
              mass: 0.8,
            }}
            className="fixed bottom-0 left-0 top-0 z-50 flex w-[min(88vw,360px)] flex-col border-r border-[var(--border)] bg-[var(--surface)] shadow-2xl lg:hidden"
          >
            {/* Drawer header */}
            <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-[var(--border)] px-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Archive
                </p>

                <p className="text-sm font-semibold text-[var(--text-secondary)]">
                  {count} conversation
                  {count === 1 ? "" : "s"}
                </p>
              </div>

              <button
                type="button"
                aria-label="Close archive menu"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Drawer content */}
            <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
