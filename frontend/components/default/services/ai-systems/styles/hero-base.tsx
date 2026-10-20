"use client";

export default function HeroBaseStyles() {
  return (
    <style jsx global>{`
        .ai-hero {
          min-height: 760px;
          overflow: hidden;
          background:
            radial-gradient(
              ellipse at 76% 44%,
              rgba(72, 112, 255, 0.12),
              transparent 35%
            ),
            radial-gradient(
              ellipse at 84% 65%,
              rgba(116, 76, 255, 0.09),
              transparent 36%
            ),
            var(--background);
          border-bottom: 1px solid var(--ai-border);
        }

        .ai-hero-grid,
        .ai-lab-grid,
        .ai-cta-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(
              to right,
              color-mix(in srgb, var(--ai-ink) 5%, transparent) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              color-mix(in srgb, var(--ai-ink) 5%, transparent) 1px,
              transparent 1px
            );
          background-size: 56px 56px;
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 18%,
            black 72%,
            transparent
          );
        }

        .ai-cursor-glow {
          position: absolute;
          z-index: -1;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          pointer-events: none;
          background: radial-gradient(
            440px circle at var(--mx, 65%) var(--my, 40%),
            rgba(93, 192, 255, 0.09),
            transparent 70%
          );
          transition: background 120ms linear;
        }

        .ai-hero-noise {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.13;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.17'/%3E%3C/svg%3E");
        }

        .ai-hero-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 0.95fr;
          align-items: center;
          gap: 24px;
          width: min(1240px, calc(100% - 64px));
          min-height: 710px;
          margin-inline: auto;
          padding-block: 88px 74px;
        }

        .ai-hero-copy {
          position: relative;
          z-index: 3;
          max-width: 620px;
        }

        .ai-eyebrow,
        .ai-section-kicker,
        .ai-detail-topline,
        .ai-architecture-code,
        .ai-console-title,
        .ai-console-status,
        .ai-pipeline-topline,
        .ai-pipeline-footer,
        .ai-process-step-top,
        .ai-process-step-bottom,
        .ai-cta-overline,
        .ai-hero-bottom,
        .ai-core-data,
        .ai-core-caption,
        .ai-data-label,
        .ai-art-label {
          font-family: var(
            --font-mono,
            ui-monospace,
            SFMono-Regular,
            Menlo,
            monospace
          );
          letter-spacing: 0.12em;
        }

        .ai-eyebrow {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 29px;
          color: var(--ai-muted);
          font-size: 10px;
          font-weight: 650;
        }

        .ai-eyebrow-signal,
        .ai-detail-live > span,
        .ai-console-status > span,
        .ai-cta-overline > span {
          display: inline-flex;
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--ai-cyan);
          box-shadow: 0 0 14px rgba(102, 232, 255, 0.75);
        }

        .ai-eyebrow-divider {
          width: 24px;
          height: 1px;
          background: var(--ai-border);
        }

        .ai-eyebrow-index {
          color: var(--ai-cyan);
        }
    `}</style>
  );
}
