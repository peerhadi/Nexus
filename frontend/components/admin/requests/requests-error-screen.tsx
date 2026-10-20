type RequestsErrorScreenProps = {
  error: string;
};

export default function RequestsErrorScreen({ error }: RequestsErrorScreenProps) {
  return (
    <main className="flex h-dvh w-full items-center justify-center bg-[var(--surface-secondary)] px-5 text-[var(--text-primary)]">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-7 text-center shadow-sm sm:px-8">
        <div className="text-sm font-bold">Failed to load requests</div>

        <div className="mt-2 break-words text-[10px] text-[var(--text-tertiary)]">
          {error}
        </div>
      </div>
    </main>
  );
}
