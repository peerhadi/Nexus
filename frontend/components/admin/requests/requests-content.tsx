"use client";

import RequestsErrorScreen from "./requests-error-screen";
import RequestsHeader from "./requests-header";
import RequestsNotices from "./requests-notices";
import RequestsStats from "./requests-stats";
import RequestsWorkspace from "./requests-workspace";
import { statusOptions } from "./requests-data";
import { useRequests } from "./use-requests";

export default function RequestsContent() {
  const {
    requests,
    updating,
    creatingProject,
    createdProjectRequestId,
    error,
    mobileDrawerOpen,
    search,
    filter,
    status,
    setSearch,
    setFilter,
    setMobileDrawerOpen,
    filteredRequests,
    selectedRequest,
    selectRequest,
    updateRequestStatus,
    createProjectFromRequest,
  } = useRequests();

  if (error && !selectedRequest) {
    return <RequestsErrorScreen error={error} />;
  }

  return (
    <main className="flex h-dvh w-full min-w-0 flex-col overflow-hidden bg-[var(--surface-secondary)] text-[var(--text-primary)]">
      <div className="flex h-full min-h-0 flex-col">
        <RequestsHeader requestCount={requests.length} />

        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1500px] p-3 sm:p-5">
            <RequestsStats requests={requests} />

            <RequestsNotices
              error={error}
              showError={!!error && !!selectedRequest}
              showProjectCreated={
                createdProjectRequestId === selectedRequest?.id
              }
            />

            <RequestsWorkspace
              selectedRequest={selectedRequest}
              filteredRequests={filteredRequests}
              search={search}
              filter={filter}
              status={status}
              statusOptions={statusOptions}
              mobileDrawerOpen={mobileDrawerOpen}
              updating={updating}
              creatingProject={creatingProject}
              projectCreated={
                !!selectedRequest &&
                createdProjectRequestId === selectedRequest.id
              }
              onSearchChange={setSearch}
              onFilterChange={setFilter}
              onSelect={selectRequest}
              onOpenDrawer={() => setMobileDrawerOpen(true)}
              onCloseDrawer={() => setMobileDrawerOpen(false)}
              onStatusChange={updateRequestStatus}
              onCreateProject={createProjectFromRequest}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
