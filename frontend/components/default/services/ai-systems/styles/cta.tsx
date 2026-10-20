"use client";

export default function CtaStyles() {
  return (
    <style jsx global>{`
        .ai-cta-section {
          position: relative;
          overflow: hidden;
          border-block: 1px solid var(--ai-border);
          background:
            radial-gradient(
              ellipse at 78% 42%,
              rgba(73, 199, 255, 0.11),
              transparent 38%
            ),
            radial-gradient(
              ellipse at 86% 70%,
              rgba(136, 98, 255, 0.1),
              transparent 36%
            ),
            var(--ai-panel);
        }

        .ai-cta-inner {
          position: relative;
          z-index: 2;
          padding-block: 83px 87px;
        }

        .ai-cta-content {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: 25px;
          margin-top: 37px;
        }

        .ai-cta-overline {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 21px;
          color: var(--ai-muted);
          font-size: 9px;
        }

        .ai-cta-overline > span {
          width: 6px;
          height: 6px;
        }

        .ai-cta-content h2 {
          font-size: clamp(42px, 5.5vw, 70px);
        }

        .ai-cta-highlight {
          color: var(--ai-cyan);
        }

        .ai-cta-content > div:first-child > p {
          max-width: 460px;
          margin: 20px 0 0;
          color: var(--ai-muted);
          font-size: 13px;
          line-height: 1.9;
        }

        .ai-cta-visual {
          position: relative;
          display: grid;
          min-height: 350px;
          place-items: center;
          overflow: hidden;
          perspective: 900px;
        }

        .ai-cta-visual-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(
              to right,
              rgba(102, 232, 255, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(102, 232, 255, 0.1) 1px,
              transparent 1px
            );
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse, black, transparent 72%);
        }

        .ai-cta-visual-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border: 1px solid rgba(102, 232, 255, 0.4);
          border-radius: 50%;
        }

        .ai-cta-visual-ring-one {
          width: 270px;
          height: 120px;
          transform: translate(-50%, -50%) rotate(-35deg);
        }

        .ai-cta-visual-ring-two {
          width: 210px;
          height: 230px;
          border-color: rgba(181, 160, 255, 0.4);
          transform: translate(-50%, -50%) rotateX(60deg);
        }

        .ai-cta-visual-core {
          position: relative;
          z-index: 2;
          display: grid;
          width: 110px;
          height: 110px;
          place-items: center;
          border: 1px solid rgba(102, 232, 255, 0.7);
          background:
            radial-gradient(circle, rgba(102, 232, 255, 0.2), transparent 72%),
            color-mix(in srgb, var(--background) 70%, transparent);
          color: var(--ai-cyan);
          box-shadow:
            0 0 35px rgba(102, 232, 255, 0.15),
            inset 0 0 25px rgba(102, 232, 255, 0.08);
          transform-style: preserve-3d;
        }

        .ai-cta-visual-label {
          position: absolute;
          z-index: 3;
          padding: 7px 9px;
          border: 1px solid var(--ai-border);
          background: var(--background);
          color: var(--ai-muted);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 8px;
          letter-spacing: 0.1em;
        }

        .ai-cta-visual-label-one {
          top: 17%;
          left: 13%;
        }

        .ai-cta-visual-label-two {
          top: 23%;
          right: 8%;
        }

        .ai-cta-visual-label-three {
          right: 15%;
          bottom: 16%;
        }

        .ai-cta-orb {
          position: absolute;
          z-index: 1;
          width: 70px;
          height: 70px;
          border: 1px solid rgba(102, 232, 255, 0.5);
          background: rgba(102, 232, 255, 0.04);
          box-shadow: inset 0 0 25px rgba(102, 232, 255, 0.09);
          transform-style: preserve-3d;
          pointer-events: none;
        }

        .ai-cta-orb-one {
          top: 13%;
          right: 9%;
          transform: rotate(30deg);
        }

        .ai-cta-orb-two {
          bottom: 12%;
          left: 5%;
          width: 44px;
          height: 44px;
          border-color: rgba(181, 160, 255, 0.55);
          border-radius: 50%;
          box-shadow: inset 0 0 20px rgba(181, 160, 255, 0.12);
        }
    `}</style>
  );
}
