"use client";

export default function HeroCoreTwoStyles() {
  return (
    <style jsx global>{`
        .ai-core-data {
          position: absolute;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 10px;
          border: 1px solid
            color-mix(in srgb, var(--ai-cyan) 20%, var(--ai-border));
          background: color-mix(in srgb, var(--background) 82%, transparent);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          color: var(--ai-muted);
          font-size: 8px;
          backdrop-filter: blur(10px);
        }

        .ai-core-data strong {
          color: var(--ai-cyan);
          font-size: 8px;
          font-weight: 600;
        }

        .ai-data-top {
          top: 11%;
          left: 31%;
        }

        .ai-data-left {
          top: 46%;
          left: -2%;
          color: var(--ai-cyan);
        }

        .ai-data-left i {
          width: 25px;
          height: 10px;
          background: repeating-linear-gradient(
            90deg,
            var(--ai-cyan) 0 2px,
            transparent 2px 5px
          );
          opacity: 0.6;
        }

        .ai-data-right {
          top: 54%;
          right: -2%;
          color: var(--ai-violet);
        }

        .ai-data-bottom {
          bottom: 11%;
          left: 31%;
        }

        .ai-data-bottom-bar {
          width: 17px;
          height: 3px;
          background: var(--ai-cyan);
          box-shadow: 0 0 8px rgba(102, 232, 255, 0.8);
        }

        .ai-data-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--ai-cyan);
          box-shadow: 0 0 8px var(--ai-cyan);
        }

        .ai-mini-node {
          position: absolute;
          z-index: 3;
          display: grid;
          width: 43px;
          height: 43px;
          place-items: center;
          border: 1px solid var(--ai-border);
          background: var(--ai-glass);
          color: var(--ai-cyan);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(10px);
        }

        .ai-mini-node-one {
          top: 20%;
          right: 13%;
          border-color: rgba(181, 160, 255, 0.4);
          color: var(--ai-violet);
          transform: rotate(12deg);
        }

        .ai-mini-node-two {
          bottom: 24%;
          left: 11%;
          border-color: rgba(255, 157, 225, 0.4);
          color: var(--ai-pink);
          border-radius: 50%;
        }

        .ai-mini-node-three {
          right: 18%;
          bottom: 17%;
          width: 25px;
          height: 25px;
          border-color: rgba(199, 255, 138, 0.6);
          background: rgba(199, 255, 138, 0.12);
          transform-style: preserve-3d;
        }

        .ai-mini-node-three div {
          width: 8px;
          height: 8px;
          background: var(--ai-lime);
          box-shadow: 0 0 12px var(--ai-lime);
        }

        .ai-core-caption {
          position: absolute;
          right: 8%;
          bottom: 3%;
          left: 8%;
          display: flex;
          justify-content: space-between;
          color: var(--ai-muted);
          font-size: 8px;
        }

    `}</style>
  );
}
