"use client";

export default function CapabilityDetailStyles() {
  return (
    <style jsx global>{`
        .ai-capability-detail {
          min-width: 0;
          min-height: 400px;
          overflow: hidden;
          border: 1px solid var(--ai-border);
          background: var(--ai-glass);
        }

        .ai-capability-detail-inner {
          height: 100%;
        }

        .ai-detail-topline {
          display: flex;
          min-height: 44px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 0 18px;
          border-bottom: 1px solid var(--ai-border);
          color: var(--ai-muted);
          font-size: 9px;
        }

        .ai-detail-live {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--ai-tone);
        }

        .ai-detail-live > span {
          width: 5px;
          height: 5px;
          background: var(--ai-tone);
          box-shadow: 0 0 9px var(--ai-tone);
        }

        .ai-detail-art {
          position: relative;
          display: grid;
          min-height: 205px;
          place-items: center;
          overflow: hidden;
          border-bottom: 1px solid var(--ai-border);
          background:
            radial-gradient(
              circle at 50% 50%,
              color-mix(in srgb, var(--ai-tone) 12%, transparent),
              transparent 45%
            ),
            var(--background);
          perspective: 800px;
        }

        .ai-detail-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(
              to right,
              color-mix(in srgb, var(--ai-tone) 12%, transparent) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              color-mix(in srgb, var(--ai-tone) 12%, transparent) 1px,
              transparent 1px
            );
          background-size: 27px 27px;
          mask-image: radial-gradient(ellipse, black, transparent 76%);
        }

        .ai-detail-orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          border: 1px solid color-mix(in srgb, var(--ai-tone) 52%, transparent);
          border-radius: 50%;
        }

        .ai-detail-orbit-a {
          width: 160px;
          height: 72px;
          transform: translate(-50%, -50%) rotate(-30deg);
        }

        .ai-detail-orbit-b {
          width: 132px;
          height: 110px;
          border-color: color-mix(in srgb, var(--ai-tone) 24%, transparent);
          transform: translate(-50%, -50%) rotateX(62deg);
        }

        .ai-detail-orbit span {
          position: absolute;
          top: 0;
          left: 20%;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--ai-tone);
          box-shadow: 0 0 12px var(--ai-tone);
        }

        .ai-detail-object {
          position: relative;
          z-index: 2;
          display: grid;
          width: 72px;
          height: 72px;
          place-items: center;
          border: 1px solid color-mix(in srgb, var(--ai-tone) 55%, transparent);
          background: color-mix(in srgb, var(--ai-tone) 10%, var(--background));
          color: var(--ai-tone);
          box-shadow:
            0 0 40px color-mix(in srgb, var(--ai-tone) 16%, transparent),
            inset 0 0 25px color-mix(in srgb, var(--ai-tone) 8%, transparent);
          transform-style: preserve-3d;
        }

        .ai-art-label {
          position: absolute;
          z-index: 2;
          color: var(--ai-muted);
          font-size: 8px;
        }

        .ai-art-label-a {
          top: 15px;
          left: 16px;
        }

        .ai-art-label-b {
          right: 16px;
          bottom: 15px;
        }

        .ai-art-crosshair {
          position: absolute;
          width: 13px;
          height: 13px;
          border-color: var(--ai-tone);
          opacity: 0.65;
        }

        .ai-art-crosshair-a {
          top: 15px;
          right: 16px;
          border-top: 1px solid;
          border-right: 1px solid;
        }

        .ai-art-crosshair-b {
          bottom: 15px;
          left: 16px;
          border-bottom: 1px solid;
          border-left: 1px solid;
        }

        .ai-detail-copy {
          padding: 23px 24px 25px;
        }

        .ai-detail-copy h3 {
          margin: 0;
          font-size: 22px;
          font-weight: 650;
          letter-spacing: -0.04em;
        }

        .ai-detail-copy > p {
          max-width: 560px;
          margin: 11px 0 0;
          color: var(--ai-muted);
          font-size: 13px;
          line-height: 1.8;
        }

        .ai-detail-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 18px;
        }

        .ai-detail-tags span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 9px;
          border: 1px solid var(--ai-border);
          color: var(--ai-muted);
          font-size: 10px;
        }

        .ai-detail-tags svg {
          color: var(--ai-tone);
        }
    `}</style>
  );
}
