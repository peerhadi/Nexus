"use client";

import { AnimatePresence, motion } from "framer-motion";

import { RequestDetail } from "@/components/admin/inbox/requests/request-detail";
import { RequestList } from "@/components/admin/inbox/requests/request-list";
import RequestsDrawer from "./requests-drawer";
import RequestsEmpty from "./requests-empty";
import RequestsToolbar from "./requests-toolbar";
import RequestsToasts from "./requests-toasts";
import type {
  Request,
  RequestFilter,
  RequestStatus,
} from "@/lib/inbox/request-types";

type RequestsWorkspaceProps = {
  selectedRequest: Request | null;
  filteredRequests: Request[];
  search: string;
  filter: RequestFilter;
  status: RequestStatus;
  statusOptions: RequestFilter[];
  mobileDrawerOpen: boolean;
  updating: boolean;
  creatingProject: boolean;
  projectCreated: boolean;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: RequestFilter) => void;
  onSelect: (request: Request) => void;
  onOpenDrawer: () => void;
  onCloseDrawer: () => void;
  onStatusChange: (status: RequestStatus) => void | Promise<void>;
  onCreateProject: () => void | Promise<void>;
};

export default function RequestsWorkspace({
  selectedRequest,
  filteredRequests,
  search,
  filter,
  status,
  statusOptions,
  mobileDrawerOpen,
  updating,
  creatingProject,
  projectCreated,
  onSearchChange,
  onFilterChange,
  onSelect,
  onOpenDrawer,
  onCloseDrawer,
  onStatusChange,
  onCreateProject,
}: RequestsWorkspaceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.28,
        delay: 0.08,
        ease: "easeOut",
      }}
      className="relative mt-3 flex min-h-[600px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] sm:mt-5"
    >
      {selectedRequest ? (
        <>
          {/* =========================
              DESKTOP REQUEST LIST
          ========================== */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.22,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="hidden min-h-0 shrink-0 lg:block"
          >
            <RequestList
              requests={filteredRequests}
              selectedRequest={selectedRequest}
              search={search}
              filter={filter}
              statusOptions={statusOptions}
              onSearchChange={onSearchChange}
              onFilterChange={onFilterChange}
              onSelect={onSelect}
            />
          </motion.div>

          {/* =========================
              MOBILE REQUEST DRAWER
          ========================== */}
          <RequestsDrawer
            open={mobileDrawerOpen}
            requests={filteredRequests}
            selectedRequest={selectedRequest}
            search={search}
            filter={filter}
            statusOptions={statusOptions}
            onClose={onCloseDrawer}
            onSearchChange={onSearchChange}
            onFilterChange={onFilterChange}
            onSelect={onSelect}
          />

          {/* =========================
              REQUEST DETAIL
          ========================== */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedRequest.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{
                duration: 0.18,
                ease: "easeOut",
              }}
              className="flex min-w-0 flex-1 flex-col"
            >
              <RequestsToolbar
                selectedRequest={selectedRequest}
                onOpenDrawer={onOpenDrawer}
              />

              <div className="min-h-0 flex-1 overflow-y-auto">
                <RequestDetail
                  request={selectedRequest}
                  status={status}
                  statusOptions={statusOptions}
                  onStatusChange={onStatusChange}
                  onCreateProject={onCreateProject}
                  creatingProject={creatingProject}
                  projectCreated={projectCreated}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* STATUS TOASTS */}
          <RequestsToasts
            updating={updating}
            creatingProject={creatingProject}
          />
        </>
      ) : (
        <RequestsEmpty />
      )}
    </motion.div>
  );
}
