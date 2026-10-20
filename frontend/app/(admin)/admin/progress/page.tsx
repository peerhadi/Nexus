"use client";

import ProgressErrorBanner from "@/components/admin/inbox/progress/progress-error-banner";
import ProgressPageHeader from "@/components/admin/inbox/progress/progress-page-header";
import ProgressSummaryBar from "@/components/admin/inbox/progress/progress-summary-bar";
import ProgressWorkspace from "@/components/admin/inbox/progress/progress-workspace";
import { statusOptions } from "@/components/admin/inbox/progress/progress-status";
import { useProgressPage } from "@/components/admin/inbox/progress/use-progress-page";

export default function ProgressPage() {
  const {
    addUpdate,
    error,
    filter,
    mobileDrawerOpen,
    selectedProject,
    setFilter,
    setMobileDrawerOpen,
    stats,
    updateDeadline,
    updateProgress,
    updateStatus,
    visibleProjects,
    selectProject,
  } = useProgressPage();

  return (
    <main className="flex h-dvh w-full min-w-0 flex-col overflow-hidden bg-[var(--surface-secondary)] text-[var(--text-primary)]">
      <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        <ProgressPageHeader activeProjects={stats.activeProjects} />

        <ProgressErrorBanner error={error} />

        <ProgressSummaryBar stats={stats} />

        <ProgressWorkspace
          projects={visibleProjects}
          selectedProject={selectedProject}
          filter={filter}
          statusOptions={statusOptions}
          mobileDrawerOpen={mobileDrawerOpen}
          onFilterChange={setFilter}
          onSelect={selectProject}
          onOpenMenu={() => setMobileDrawerOpen(true)}
          onCloseMenu={() => setMobileDrawerOpen(false)}
          onProgressChange={updateProgress}
          onStatusChange={updateStatus}
          onDeadlineChange={updateDeadline}
          onAddUpdate={addUpdate}
        />
      </div>
    </main>
  );
}
