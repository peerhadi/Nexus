type ArchiveEmptyStateProps = {
  loading: boolean;
};

export function ArchiveEmptyState({ loading }: ArchiveEmptyStateProps) {
  return (
    <main className="flex h-dvh w-full items-center justify-center bg-[var(--surface)] px-6 text-[var(--text-primary)]">
      <div className="flex flex-col items-center text-center">
        <div className="mb-2 text-sm font-semibold text-[var(--text-tertiary)]">
          No archived conversations.
        </div>

        {!loading && (
          <div className="text-xs text-[var(--text-muted)]">
            Closed conversations will appear here.
          </div>
        )}
      </div>
    </main>
  );
}
