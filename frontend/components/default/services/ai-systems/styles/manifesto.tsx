"use client";

export default function ManifestoStyles() {
  return (
    <style jsx global>{`
        .ai-manifesto {
          padding-block: 115px 96px;
        }

        .ai-section-kicker {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--ai-muted);
          font-size: 10px;
          font-weight: 650;
        }

        .ai-section-kicker > span:first-child {
          color: var(--ai-cyan);
        }

        .ai-kicker-line {
          width: 35px;
          height: 1px;
          background: var(--ai-border);
        }

        .ai-manifesto-grid {
          display: grid;
          grid-template-columns: 1fr 0.7fr;
          align-items: end;
          gap: 60px;
          margin-top: 38px;
        }

        .ai-manifesto h2,
        .ai-section-heading h2,
        .ai-lab-heading h2,
        .ai-process-heading h2,
        .ai-faq-intro h2,
        .ai-cta-content h2 {
          margin: 0;
          font-size: clamp(38px, 5vw, 63px);
          font-weight: 680;
          letter-spacing: -0.065em;
          line-height: 1.06;
        }

        .ai-manifesto h2 span,
        .ai-section-heading h2 span,
        .ai-lab-heading h2 span,
        .ai-process-heading h2 span,
        .ai-faq-intro h2 span {
          color: var(--ai-muted);
        }

        .ai-manifesto-copy p {
          margin: 0 0 16px;
          color: var(--ai-muted);
          font-size: 14px;
          line-height: 1.9;
        }

        .ai-text-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 9px;
          color: var(--ai-ink);
          font-size: 13px;
          font-weight: 650;
        }

        .ai-text-link svg {
          color: var(--ai-cyan);
          transition: transform 180ms ease;
        }

        .ai-text-link:hover svg {
          transform: translateX(4px);
        }

        .ai-manifesto-visual {
          position: relative;
          display: flex;
          min-height: 165px;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-top: 66px;
          overflow: hidden;
          padding: 24px 30px;
          border-block: 1px solid var(--ai-border);
        }

        .ai-manifesto-word {
          font-size: clamp(35px, 7vw, 90px);
          font-weight: 750;
          letter-spacing: -0.08em;
          color: color-mix(in srgb, var(--ai-ink) 72%, transparent);
        }

        .ai-manifesto-word-right {
          color: var(--ai-cyan);
        }

        .ai-manifesto-symbol {
          position: absolute;
          top: 50%;
          left: 50%;
          display: grid;
          width: 92px;
          height: 92px;
          place-items: center;
          border: 1px solid var(--ai-border);
          border-radius: 50%;
          background: var(--background);
          color: var(--ai-cyan);
          box-shadow: 0 0 35px rgba(102, 232, 255, 0.08);
          transform: translate(-50%, -50%);
        }

        .ai-manifesto-symbol svg {
          width: 48px;
          height: 48px;
          stroke-width: 1;
        }

        .ai-manifesto-scanline {
          position: absolute;
          top: 0;
          bottom: 0;
          left: -20%;
          width: 1px;
          background: var(--ai-cyan);
          opacity: 0.35;
          box-shadow: 0 0 20px var(--ai-cyan);
          animation: ai-scan 8s linear infinite;
        }
    `}</style>
  );
}
