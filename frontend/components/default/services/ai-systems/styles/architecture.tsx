"use client";

export default function ArchitectureStyles() {
  return (
    <style jsx global>{`
        .ai-architecture-copy {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 27px 25px;
          border-right: 1px solid var(--ai-border);
        }

        .ai-architecture-code {
          display: inline-block;
          color: var(--ai-cyan);
          font-size: 9px;
        }

        .ai-architecture-copy h3 {
          margin: 17px 0 0;
          font-size: 22px;
          font-weight: 650;
          letter-spacing: -0.04em;
        }

        .ai-architecture-copy p {
          margin: 12px 0 0;
          color: var(--ai-muted);
          font-size: 12px;
          line-height: 1.85;
        }

        .ai-architecture-output {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 24px;
          padding: 13px;
          border-left: 2px solid var(--ai-cyan);
          background: color-mix(in srgb, var(--ai-cyan) 5%, transparent);
        }

        .ai-architecture-output > span,
        .ai-architecture-meta {
          color: var(--ai-muted);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 8px;
          letter-spacing: 0.1em;
        }

        .ai-architecture-output strong {
          font-size: 11px;
          font-weight: 600;
        }

        .ai-architecture-meta {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-top: 14px;
        }

        .ai-console-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-top: 24px;
        }

        .ai-run-button {
          display: inline-flex;
          min-height: 37px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 12px;
          border: 1px solid
            color-mix(in srgb, var(--ai-cyan) 35%, var(--ai-border));
          background: color-mix(in srgb, var(--ai-cyan) 8%, transparent);
          color: var(--ai-ink);
          font-size: 10px;
          cursor: pointer;
          transition:
            background 180ms ease,
            border-color 180ms ease;
        }

        .ai-run-button:hover {
          border-color: var(--ai-cyan);
          background: color-mix(in srgb, var(--ai-cyan) 14%, transparent);
        }

        .ai-console-actions > span {
          color: var(--ai-muted);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 8px;
          letter-spacing: 0.1em;
        }
    `}</style>
  );
}
