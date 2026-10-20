"use client";

export default function FaqStyles() {
  return (
    <style jsx global>{`
        .ai-faq {
          display: grid;
          grid-template-columns: 0.7fr 1.3fr;
          gap: 80px;
          padding-block: 0 125px;
        }

        .ai-faq-intro h2 {
          margin-top: 30px;
        }

        .ai-faq-intro > p {
          max-width: 270px;
          margin: 18px 0 0;
          color: var(--ai-muted);
          font-size: 13px;
          line-height: 1.85;
        }

        .ai-faq-list {
          border-top: 1px solid var(--ai-border);
        }

        .ai-faq-item {
          border-bottom: 1px solid var(--ai-border);
        }

        .ai-faq-item summary {
          display: grid;
          grid-template-columns: 30px 1fr 27px;
          align-items: center;
          gap: 13px;
          min-height: 74px;
          cursor: pointer;
          list-style: none;
        }

        .ai-faq-item summary::-webkit-details-marker {
          display: none;
        }

        .ai-faq-number {
          color: var(--ai-cyan);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
        }

        .ai-faq-question {
          font-size: 13px;
          font-weight: 600;
          line-height: 1.6;
        }

        .ai-faq-toggle {
          position: relative;
          display: grid;
          width: 25px;
          height: 25px;
          place-items: center;
          border: 1px solid var(--ai-border);
        }

        .ai-faq-toggle span {
          position: absolute;
          width: 9px;
          height: 1px;
          background: var(--ai-ink);
          transition: transform 180ms ease;
        }

        .ai-faq-toggle span:last-child {
          transform: rotate(90deg);
        }

        .ai-faq-item[open] .ai-faq-toggle span:last-child {
          transform: rotate(0deg);
        }

        .ai-faq-answer {
          padding: 0 38px 23px 43px;
          animation: ai-faq-reveal 180ms ease both;
        }

        .ai-faq-answer p {
          max-width: 570px;
          margin: 0;
          color: var(--ai-muted);
          font-size: 12px;
          line-height: 1.9;
        }
    `}</style>
  );
}
