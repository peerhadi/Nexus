"use client";

export default function ProcessStyles() {
  return (
    <style jsx global>{`
        .ai-process {
          padding-block: 0 125px;
        }

        .ai-process-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 40px;
          margin-block: 33px 48px;
        }

        .ai-process-heading > p {
          max-width: 340px;
          margin: 0 0 4px;
          color: var(--ai-muted);
          font-size: 13px;
          line-height: 1.9;
        }

        .ai-process-track {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border: 1px solid var(--ai-border);
        }

        .ai-process-step {
          display: flex;
          min-width: 0;
          min-height: 292px;
          flex-direction: column;
          padding: 19px 17px 0;
          border-right: 1px solid var(--ai-border);
          transition: background 200ms ease;
        }

        .ai-process-step:last-child {
          border-right: 0;
        }

        .ai-process-step:hover {
          background: color-mix(in srgb, var(--ai-cyan) 4%, transparent);
        }

        .ai-process-step-top {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          color: var(--ai-muted);
          font-size: 8px;
        }

        .ai-process-step-top > span:first-child {
          color: var(--ai-cyan);
        }

        .ai-process-icon {
          display: grid;
          width: 45px;
          height: 45px;
          place-items: center;
          margin-top: 31px;
          border: 1px solid var(--ai-border);
          color: var(--ai-cyan);
          transition:
            transform 250ms ease,
            background 250ms ease;
        }

        .ai-process-step:hover .ai-process-icon {
          transform: rotate(-7deg) translateY(-3px);
          background: color-mix(in srgb, var(--ai-cyan) 9%, transparent);
        }

        .ai-process-step h3 {
          margin: 20px 0 0;
          font-size: 15px;
          font-weight: 650;
          letter-spacing: -0.025em;
        }

        .ai-process-step p {
          margin: 10px 0 24px;
          color: var(--ai-muted);
          font-size: 11px;
          line-height: 1.85;
        }

        .ai-process-step-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          min-height: 42px;
          margin-top: auto;
          border-top: 1px solid var(--ai-border);
          color: var(--ai-muted);
          font-size: 8px;
        }

        .ai-process-step-bottom svg {
          color: var(--ai-cyan);
        }
    `}</style>
  );
}
