"use client";

export default function BaseStyles() {
  return (
    <style jsx global>{`
        .ai-page {
          --ai-ink: var(--text-primary);
          --ai-muted: var(--text-secondary);
          --ai-border: var(--card-border);
          --ai-panel: var(--surface-secondary);
          --ai-glass: color-mix(in srgb, var(--card) 78%, transparent);
          --ai-cyan: #66e8ff;
          --ai-violet: #b5a0ff;
          --ai-pink: #ff9de1;
          --ai-lime: #c7ff8a;
          position: relative;
          isolation: isolate;
          color: var(--ai-ink);
          background: var(--background);
        }

        .ai-page *,
        .ai-page *::before,
        .ai-page *::after {
          box-sizing: border-box;
        }

        .ai-page a {
          text-decoration: none;
        }

        .ai-page button {
          font: inherit;
        }

        .ai-page button:focus-visible,
        .ai-page a:focus-visible,
        .ai-page summary:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 5px;
        }

        .ai-page ::selection {
          background: var(--accent);
          color: white;
        }

        .ai-page .section-shell {
          width: min(1180px, calc(100% - 48px));
          margin-inline: auto;
        }
    `}</style>
  );
}
