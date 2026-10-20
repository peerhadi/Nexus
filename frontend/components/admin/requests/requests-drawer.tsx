"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { RequestList } from "@/components/admin/inbox/requests/request-list";
import type {
  Request,
  RequestFilter,
} from "@/lib/inbox/request-types";

type RequestsDrawerProps = {
  open: boolean;
  requests: Request[];
  selectedRequest: Request;
  search: string;
  filter: RequestFilter;
  statusOptions: RequestFilter[];
  onClose: () => void;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: RequestFilter) => void;
  onSelect: (request: Request) => void;
};

export default function RequestsDrawer({
  open,
  requests,
  selectedRequest,
  search,
  filter,
  statusOptions,
  onClose,
  onSearchChange,
  onFilterChange,
  onSelect,
}: RequestsDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close request menu"
            className="fixed inset-0 z-40 bg-[var(--overlay)] backdrop-blur-[2px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />

          {/* Sliding drawer */}
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
            className="fixed inset-y-0 left-0 z-50 flex w-[min(90vw,400px)] flex-col border-r border-[var(--border)] bg-[var(--surface)] shadow-2xl lg:hidden"
          >
            {/* Drawer header */}
            <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-[var(--border)] px-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Requests
                </p>

                <p className="text-sm font-semibold text-[var(--text-secondary)]">
                  {requests.length} request
                  {requests.length === 1 ? "" : "s"}
                </p>
              </div>

              <button
                type="button"
                aria-label="Close request menu"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Request list */}
            <div className="min-h-0 flex-1 overflow-hidden">
              <RequestList
                requests={requests}
                selectedRequest={selectedRequest}
                search={search}
                filter={filter}
                statusOptions={statusOptions}
                onSearchChange={onSearchChange}
                onFilterChange={onFilterChange}
                onSelect={onSelect}
              />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
