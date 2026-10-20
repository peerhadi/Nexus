"use client";

export default function PrinciplesStyles() {
  return (
    <style jsx global>{`
        .ai-principles {
          padding-block: 115px 120px;
        }

        .ai-principle-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 15px;
        }

        .ai-principle-card {
          position: relative;
          display: flex;
          min-height: 280px;
          flex-direction: column;
          overflow: hidden;
          padding: 22px;
          border: 1px solid var(--ai-border);
          background: var(--ai-glass);
          transition: border-color 200ms ease;
        }

        .ai-principle-card:hover {
          border-color: color-mix(
            in srgb,
            var(--ai-cyan) 40%,
            var(--ai-border)
          );
        }

        .ai-principle-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: var(--ai-muted);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 8px;
          letter-spacing: 0.1em;
        }

        .ai-principle-card-top svg {
          color: var(--ai-cyan);
        }

        .ai-principle-icon {
          display: grid;
          width: 51px;
          height: 51px;
          place-items: center;
          margin-top: 37px;
          border: 1px solid
            color-mix(in srgb, var(--ai-cyan) 30%, var(--ai-border));
          background: color-mix(in srgb, var(--ai-cyan) 7%, transparent);
          color: var(--ai-cyan);
        }

        .ai-principle-card h3 {
          margin: 21px 0 0;
          font-size: 17px;
          font-weight: 650;
          letter-spacing: -0.035em;
        }

        .ai-principle-card p {
          margin: 10px 0 25px;
          color: var(--ai-muted);
          font-size: 12px;
          line-height: 1.85;
        }

        .ai-principle-card-line {
          position: absolute;
          right: 22px;
          bottom: 0;
          left: 22px;
          height: 1px;
          background: var(--ai-border);
        }

        .ai-principle-card-line span {
          display: block;
          width: 22%;
          height: 1px;
          background: var(--ai-cyan);
          transition: width 250ms ease;
        }

        .ai-principle-card:hover .ai-principle-card-line span {
          width: 100%;
        }
    `}</style>
  );
}
