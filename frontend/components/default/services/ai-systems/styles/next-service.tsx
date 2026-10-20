"use client";

export default function NextServiceStyles() {
  return (
    <style jsx global>{`
        .ai-next-service {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding-block: 34px;
        }

        .ai-next-service > div > span {
          color: var(--ai-muted);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 8px;
          letter-spacing: 0.14em;
        }

        .ai-next-service h2 {
          max-width: 480px;
          margin: 9px 0 0;
          font-size: 15px;
          font-weight: 550;
          line-height: 1.7;
        }

        .ai-next-link {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 13px 15px;
          border: 1px solid var(--ai-border);
          color: var(--ai-ink);
          transition:
            border-color 180ms ease,
            transform 180ms ease;
        }

        .ai-next-link:hover {
          transform: translateX(3px);
          border-color: var(--ai-cyan);
        }

        .ai-next-link > span {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ai-next-link small {
          color: var(--ai-muted);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 8px;
          letter-spacing: 0.1em;
        }

        .ai-next-link strong {
          font-size: 13px;
          font-weight: 650;
        }

        .ai-next-link > svg {
          color: var(--ai-cyan);
          transition: transform 180ms ease;
        }

        .ai-next-link:hover > svg {
          transform: translateX(3px);
        }
    `}</style>
  );
}
