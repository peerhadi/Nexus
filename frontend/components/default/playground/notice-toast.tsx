"use client";

import { Check } from "lucide-react";

export default function NoticeToast({
  notice,
  setNotice,
}: {
  notice: string;
  setNotice: (value: string) => void;
}) {
  if (!notice) return null;

  return (
    <div
      role="status"
      className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3 border border-[var(--pg-line)] bg-[var(--background)] px-4 py-3 text-xs font-medium shadow-xl"
    >
      <Check size={15} className="text-[var(--accent)]" />
      {notice}
      <button
        type="button"
        onClick={() => setNotice("")}
        className="ml-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}
