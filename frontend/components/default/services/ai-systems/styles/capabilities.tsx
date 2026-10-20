"use client";

export default function CapabilitiesStyles() {
  return (
    <style jsx global>{`
        .ai-capabilities {
          padding-block: 30px 120px;
          scroll-margin-top: 40px;
        }

        .ai-section-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 48px;
        }

        .ai-section-heading h2 {
          margin-top: 30px;
        }

        .ai-section-heading > p {
          max-width: 345px;
          margin: 0 0 5px;
          color: var(--ai-muted);
          font-size: 14px;
          line-height: 1.85;
        }

        .ai-capability-layout {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 20px;
        }

        .ai-capability-list {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .ai-capability-item {
          position: relative;
          display: grid;
          grid-template-columns: 29px 43px 1fr 18px;
          align-items: center;
          gap: 14px;
          width: 100%;
          min-height: 92px;
          padding: 17px 15px;
          overflow: hidden;
          border: 1px solid var(--ai-border);
          border-radius: 4px;
          background: var(--ai-glass);
          color: var(--ai-ink);
          text-align: left;
          cursor: pointer;
          transition:
            border-color 200ms ease,
            background 200ms ease,
            transform 200ms ease;
        }

        .ai-capability-item::before {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 2px;
          background: var(--ai-tone);
          content: "";
          opacity: 0;
          transform: scaleY(0.3);
          transition:
            opacity 200ms ease,
            transform 200ms ease;
        }

        .ai-capability-item:hover {
          transform: translateX(3px);
          border-color: color-mix(
            in srgb,
            var(--ai-tone) 40%,
            var(--ai-border)
          );
        }

        .ai-capability-item.is-active {
          border-color: color-mix(
            in srgb,
            var(--ai-tone) 45%,
            var(--ai-border)
          );
          background: color-mix(in srgb, var(--ai-tone) 6%, var(--card));
        }

        .ai-capability-item.is-active::before {
          opacity: 1;
          transform: scaleY(1);
        }

        .ai-capability-number {
          align-self: start;
          padding-top: 4px;
          color: var(--ai-muted);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
        }

        .ai-capability-icon {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border: 1px solid
            color-mix(in srgb, var(--ai-tone) 34%, var(--ai-border));
          background: color-mix(in srgb, var(--ai-tone) 9%, transparent);
          color: var(--ai-tone);
        }

        .ai-capability-title {
          display: flex;
          flex-direction: column;
          gap: 7px;
          min-width: 0;
        }

        .ai-capability-title strong {
          font-size: 14px;
          font-weight: 650;
        }

        .ai-capability-title small {
          color: var(--ai-muted);
          font-size: 11px;
        }

        .ai-capability-arrow {
          color: var(--ai-muted);
          transition:
            color 200ms ease,
            transform 200ms ease;
        }

        .ai-capability-item.is-active .ai-capability-arrow {
          color: var(--ai-tone);
          transform: translateX(2px);
        }

        .ai-tone-cyan {
          --ai-tone: var(--ai-cyan);
        }

        .ai-tone-violet {
          --ai-tone: var(--ai-violet);
        }

        .ai-tone-pink {
          --ai-tone: var(--ai-pink);
        }

        .ai-tone-lime {
          --ai-tone: var(--ai-lime);
        }
    `}</style>
  );
}
