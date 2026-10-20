"use client";

export default function LabStyles() {
  return (
    <style jsx global>{`
        .ai-lab-section {
          position: relative;
          overflow: hidden;
          padding-block: 105px 95px;
          border-block: 1px solid var(--ai-border);
          background:
            radial-gradient(
              ellipse at 5% 45%,
              rgba(69, 205, 255, 0.08),
              transparent 33%
            ),
            radial-gradient(
              ellipse at 93% 70%,
              rgba(138, 98, 255, 0.09),
              transparent 36%
            ),
            var(--ai-panel);
          scroll-margin-top: 30px;
        }

        .ai-lab-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .ai-lab-blob {
          position: absolute;
          width: 340px;
          height: 340px;
          border-radius: 50%;
          filter: blur(85px);
          opacity: 0.13;
          animation: ai-blob-drift 15s ease-in-out infinite alternate;
        }

        .ai-lab-blob-one {
          top: 18%;
          left: -170px;
          background: var(--ai-cyan);
        }

        .ai-lab-blob-two {
          right: -190px;
          bottom: 0;
          background: var(--ai-violet);
          animation-delay: -6s;
        }

        .ai-lab-inner {
          position: relative;
          z-index: 1;
        }

        .ai-lab-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 40px;
          margin-top: 33px;
          margin-bottom: 43px;
        }

        .ai-lab-heading h2 {
          font-size: clamp(38px, 4.8vw, 60px);
        }

        .ai-lab-heading > div:first-child > p {
          max-width: 550px;
          margin: 19px 0 0;
          color: var(--ai-muted);
          font-size: 14px;
          line-height: 1.85;
        }

        .ai-lab-stamp {
          display: flex;
          min-width: 112px;
          flex-direction: column;
          align-items: center;
          gap: 9px;
          padding: 16px 14px;
          border: 1px solid var(--ai-border);
          color: var(--ai-cyan);
        }

        .ai-lab-stamp span,
        .ai-lab-stamp strong {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 8px;
          letter-spacing: 0.12em;
        }

        .ai-lab-stamp strong {
          color: var(--ai-muted);
          font-weight: 500;
        }

        .ai-lab-console {
          overflow: hidden;
          border: 1px solid
            color-mix(in srgb, var(--ai-cyan) 24%, var(--ai-border));
          background: color-mix(in srgb, var(--card) 91%, transparent);
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.06);
          backdrop-filter: blur(16px);
        }

        .ai-console-top {
          display: flex;
          min-height: 46px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-inline: 17px;
          border-bottom: 1px solid var(--ai-border);
        }

        .ai-console-window-controls {
          display: flex;
          gap: 5px;
        }

        .ai-console-window-controls span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--ai-border);
        }

        .ai-console-window-controls span:first-child {
          background: #ff8d9c;
        }

        .ai-console-window-controls span:nth-child(2) {
          background: #ffce83;
        }

        .ai-console-window-controls span:nth-child(3) {
          background: #a7e7ad;
        }

        .ai-console-title,
        .ai-console-status {
          color: var(--ai-muted);
          font-size: 8px;
        }

        .ai-console-status {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        .ai-console-status > span {
          width: 5px;
          height: 5px;
          background: var(--ai-lime);
          box-shadow: 0 0 9px var(--ai-lime);
        }

        .ai-console-tabs {
          display: flex;
          gap: 0;
          overflow-x: auto;
          border-bottom: 1px solid var(--ai-border);
        }

        .ai-console-tabs button {
          display: flex;
          min-height: 51px;
          flex: 1 0 auto;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 0 16px;
          border: 0;
          border-right: 1px solid var(--ai-border);
          background: transparent;
          color: var(--ai-muted);
          font-size: 11px;
          cursor: pointer;
          transition:
            color 180ms ease,
            background 180ms ease;
        }

        .ai-console-tabs button:last-child {
          border-right: 0;
        }

        .ai-console-tabs button > span {
          color: color-mix(in srgb, var(--ai-muted) 60%, transparent);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
        }

        .ai-console-tabs button.is-selected {
          background: color-mix(in srgb, var(--ai-cyan) 7%, transparent);
          color: var(--ai-ink);
          box-shadow: inset 0 -2px var(--ai-cyan);
        }

        .ai-console-tabs button.is-selected > span {
          color: var(--ai-cyan);
        }

        .ai-console-body {
          display: grid;
          grid-template-columns: 0.75fr 1.25fr;
          min-height: 360px;
        }
    `}</style>
  );
}
