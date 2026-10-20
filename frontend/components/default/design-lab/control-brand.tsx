"use client";

export default function ControlBrand({
  siteName,
  setSiteName,
  keywords,
  setKeywords,
}: {
  siteName: string;
  setSiteName: (value: string) => void;
  keywords: string;
  setKeywords: (value: string) => void;
}) {
  return (
    <section>
      <label className="mb-3 block text-xs font-semibold text-[var(--text-primary)]">
        02 / Brand identity
      </label>

      <div className="space-y-3">
        <div>
          <label
            htmlFor="site-name"
            className="mb-1.5 block text-[11px] text-[var(--text-secondary)]"
          >
            Website name
          </label>
          <input
            id="site-name"
            value={siteName}
            onChange={(event) => setSiteName(event.target.value)}
            maxLength={28}
            placeholder="e.g. Forma Studio"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--input)] px-3 py-2.5 text-xs text-[var(--text-primary)] outline-none placeholder:text-[var(--input-placeholder)] transition focus:border-[var(--border-focus)] focus:bg-[var(--input-focus)] focus:ring-2 focus:ring-[var(--focus-ring)]"
          />
        </div>

        <div>
          <label
            htmlFor="site-keywords"
            className="mb-1.5 block text-[11px] text-[var(--text-secondary)]"
          >
            Keywords and mood
          </label>
          <textarea
            id="site-keywords"
            value={keywords}
            onChange={(event) => setKeywords(event.target.value)}
            rows={3}
            maxLength={180}
            placeholder="modern, playful, premium..."
            className="w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--input)] px-3 py-2.5 text-xs leading-relaxed text-[var(--text-primary)] outline-none placeholder:text-[var(--input-placeholder)] transition focus:border-[var(--border-focus)] focus:bg-[var(--input-focus)] focus:ring-2 focus:ring-[var(--focus-ring)]"
          />
          <p className="mt-1.5 text-[10px] text-[var(--text-muted)]">
            Separate keywords with commas.
          </p>
        </div>
      </div>
    </section>
  );
}
