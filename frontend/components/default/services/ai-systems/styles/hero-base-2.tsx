"use client";

export default function HeroBaseTwoStyles() {
  return (
    <style jsx global>{`
        .ai-hero h1 {
          margin: 0;
          font-size: clamp(48px, 6.1vw, 82px);
          font-weight: 690;
          letter-spacing: -0.075em;
          line-height: 0.99;
        }

        .ai-title-outline {
          color: transparent;
          -webkit-text-stroke: 1.2px
            color-mix(in srgb, var(--ai-ink) 76%, transparent);
        }

        .ai-title-accent {
          color: var(--ai-cyan);
          text-shadow: 0 0 42px rgba(102, 232, 255, 0.16);
        }

        .ai-hero-description {
          max-width: 490px;
          margin: 27px 0 0;
          color: var(--ai-muted);
          font-size: 15px;
          line-height: 1.9;
        }

        .ai-hero-actions,
        .ai-cta-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-top: 30px;
        }

        .ai-button {
          display: inline-flex;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 0 18px;
          border: 1px solid var(--ai-border);
          border-radius: 3px;
          font-size: 13px;
          font-weight: 650;
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .ai-button:hover {
          transform: translateY(-3px);
        }

        .ai-button-primary {
          border-color: var(--accent);
          background: var(--accent);
          color: white !important;
          box-shadow: 0 0 26px
            color-mix(in srgb, var(--accent) 20%, transparent);
        }

        .ai-button-primary:hover {
          box-shadow: 0 0 36px
            color-mix(in srgb, var(--accent) 35%, transparent);
        }

        .ai-button-secondary {
          background: color-mix(in srgb, var(--card) 62%, transparent);
          color: var(--ai-ink);
        }

        .ai-button-secondary:hover {
          border-color: color-mix(
            in srgb,
            var(--ai-cyan) 65%,
            var(--ai-border)
          );
        }

        .ai-button-play {
          display: grid;
          width: 23px;
          height: 23px;
          place-items: center;
          border: 1px solid var(--ai-border);
          border-radius: 50%;
        }

        .ai-hero-footnote {
          display: flex;
          align-items: center;
          gap: 11px;
          margin-top: 38px;
          color: var(--ai-muted);
          font-size: 11px;
        }

        .ai-footnote-line {
          width: 28px;
          height: 1px;
          background: var(--ai-cyan);
        }

    `}</style>
  );
}
