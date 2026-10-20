"use client";

export default function HeroOrbitStyles() {
  return (
    <style jsx global>{`
        .ai-orbit {
          position: absolute;
          z-index: 1;
          top: 48%;
          left: 76%;
          width: 220px;
          height: 220px;
          border: 1px solid rgba(112, 163, 255, 0.16);
          border-radius: 50%;
          pointer-events: none;
        }

        .ai-orbit-two {
          top: 12%;
          left: 57%;
          width: 160px;
          height: 160px;
          border-color: rgba(181, 160, 255, 0.16);
        }

        .ai-orbit-dot {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .ai-orbit-dot-cyan {
          top: 14%;
          left: 11%;
          background: var(--ai-cyan);
          box-shadow: 0 0 14px var(--ai-cyan);
        }

        .ai-orbit-dot-purple {
          top: 63%;
          right: 0;
          background: var(--ai-violet);
          box-shadow: 0 0 14px var(--ai-violet);
        }

        .ai-orbit-dot-white {
          bottom: 2%;
          left: 45%;
          background: var(--ai-ink);
        }

        .ai-orbit-dot-pink {
          top: 15%;
          right: 9%;
          background: var(--ai-pink);
          box-shadow: 0 0 14px var(--ai-pink);
        }

        .ai-orbit-dot-lime {
          bottom: 8%;
          left: 8%;
          background: var(--ai-lime);
          box-shadow: 0 0 14px var(--ai-lime);
        }

        .ai-floating-object {
          position: absolute;
          z-index: 1;
          pointer-events: none;
          transform-style: preserve-3d;
        }

        .ai-object-cube {
          top: 19%;
          right: 6%;
          width: 42px;
          height: 42px;
          transform-style: preserve-3d;
        }

        .ai-cube-face {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(102, 232, 255, 0.72);
          background: rgba(102, 232, 255, 0.06);
          box-shadow: inset 0 0 18px rgba(102, 232, 255, 0.07);
          backface-visibility: visible;
        }

        .ai-cube-front {
          transform: translateZ(21px);
        }

        .ai-cube-back {
          transform: rotateY(180deg) translateZ(21px);
        }

        .ai-cube-right {
          transform: rotateY(90deg) translateZ(21px);
        }

        .ai-cube-left {
          transform: rotateY(-90deg) translateZ(21px);
        }

        .ai-cube-top {
          transform: rotateX(90deg) translateZ(21px);
        }

        .ai-cube-bottom {
          transform: rotateX(-90deg) translateZ(21px);
        }

        .ai-object-ring {
          top: 68%;
          right: 7%;
          width: 62px;
          height: 62px;
          transform-style: preserve-3d;
        }

        .ai-object-ring > div {
          position: absolute;
          inset: 0;
          border: 2px solid rgba(181, 160, 255, 0.85);
          border-radius: 50%;
          box-shadow: 0 0 18px rgba(181, 160, 255, 0.15);
        }

        .ai-object-ring > span {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--ai-violet);
          box-shadow: 0 0 14px var(--ai-violet);
          transform: translate(-50%, -50%) translateZ(31px);
        }

        .ai-object-diamond {
          top: 70%;
          left: 53%;
          width: 26px;
          height: 26px;
          transform-style: preserve-3d;
        }

        .ai-object-diamond div {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(255, 157, 225, 0.8);
          background: rgba(255, 157, 225, 0.1);
          transform: rotate(45deg) skew(7deg, 7deg);
          box-shadow: 0 0 24px rgba(255, 157, 225, 0.12);
        }

        .ai-hero-bottom {
          position: relative;
          z-index: 2;
          border-top: 1px solid var(--ai-border);
          color: var(--ai-muted);
          font-size: 9px;
        }

        .ai-hero-bottom-inner {
          display: flex;
          min-height: 48px;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          width: min(1240px, calc(100% - 64px));
          margin-inline: auto;
        }

        .ai-hero-bottom-track {
          position: relative;
          width: min(240px, 25vw);
          height: 1px;
          overflow: hidden;
          background: var(--ai-border);
        }

        .ai-hero-bottom-track span {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 1px;
          background: var(--ai-cyan);
          box-shadow: 0 0 9px var(--ai-cyan);
        }
    `}</style>
  );
}
