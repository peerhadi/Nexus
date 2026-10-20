"use client";

export default function HeroCoreStyles() {
  return (
    <style jsx global>{`
        .ai-core-stage {
          position: relative;
          width: min(100%, 540px);
          aspect-ratio: 1;
          justify-self: end;
          perspective: 1100px;
          transform-style: preserve-3d;
        }

        .ai-core-aura {
          position: absolute;
          inset: 19%;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(70, 204, 255, 0.19),
            rgba(111, 79, 255, 0.1) 38%,
            transparent 72%
          );
          filter: blur(24px);
        }

        .ai-core-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border: 1px solid rgba(102, 232, 255, 0.27);
          border-radius: 50%;
          transform-style: preserve-3d;
        }

        .ai-core-ring-outer {
          width: 92%;
          height: 46%;
          transform: translate(-50%, -50%) rotate(-29deg);
        }

        .ai-core-ring-middle {
          width: 75%;
          height: 75%;
          border-color: rgba(180, 151, 255, 0.3);
          transform: translate(-50%, -50%) rotateX(66deg);
        }

        .ai-core-ring-inner {
          width: 63%;
          height: 36%;
          border-color: rgba(255, 157, 225, 0.45);
          transform: translate(-50%, -50%) rotate(57deg);
        }

        .ai-core-marker {
          position: absolute;
          width: 8px;
          height: 8px;
          border: 1px solid var(--ai-cyan);
          border-radius: 50%;
          background: var(--background);
          box-shadow: 0 0 12px rgba(102, 232, 255, 0.75);
        }

        .marker-one {
          top: 7%;
          left: 14%;
        }

        .marker-two {
          right: 9%;
          bottom: 19%;
        }

        .marker-three {
          top: 49%;
          right: -4px;
        }

        .ai-core-satellite {
          position: absolute;
          display: grid;
          width: 35px;
          height: 35px;
          place-items: center;
          border: 1px solid rgba(102, 232, 255, 0.4);
          border-radius: 50%;
          background: color-mix(in srgb, var(--background) 70%, transparent);
          color: var(--ai-cyan);
          box-shadow: 0 0 25px rgba(102, 232, 255, 0.1);
        }

        .satellite-one {
          top: 9%;
          left: 18%;
        }

        .satellite-two {
          right: 8%;
          bottom: 15%;
          color: var(--ai-violet);
          border-color: rgba(181, 160, 255, 0.5);
        }

        .ai-core-sphere {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 38%;
          aspect-ratio: 1;
          overflow: hidden;
          border: 1px solid rgba(133, 232, 255, 0.7);
          border-radius: 50%;
          background:
            radial-gradient(
              circle at 34% 27%,
              rgba(228, 255, 255, 0.9),
              transparent 5%
            ),
            radial-gradient(
              circle at 34% 30%,
              rgba(99, 224, 255, 0.85),
              transparent 20%
            ),
            radial-gradient(
              circle at 65% 70%,
              rgba(150, 91, 255, 0.72),
              transparent 45%
            ),
            radial-gradient(circle at 40% 45%, #17456e, #081323 74%);
          box-shadow:
            inset -18px -14px 36px rgba(0, 0, 0, 0.42),
            inset 9px 8px 28px rgba(151, 243, 255, 0.18),
            0 0 38px rgba(73, 209, 255, 0.25),
            0 0 95px rgba(99, 92, 255, 0.16);
          transform: translate(-50%, -50%);
          transform-style: preserve-3d;
        }

        .ai-sphere-surface {
          position: absolute;
          inset: -25%;
          border-radius: 50%;
          background: repeating-linear-gradient(
            0deg,
            transparent 0 12px,
            rgba(127, 228, 255, 0.21) 13px 14px
          );
          transform: rotate(-25deg);
        }

        .ai-sphere-latitude,
        .ai-sphere-longitude {
          position: absolute;
          inset: 8% -10%;
          border: 1px solid rgba(151, 241, 255, 0.5);
          border-radius: 50%;
        }

        .latitude-one {
          transform: rotate(24deg) scaleY(0.36);
        }

        .latitude-two {
          transform: rotate(-26deg) scaleY(0.55);
        }

        .latitude-three {
          transform: rotate(60deg) scaleY(0.75);
        }

        .longitude-one {
          inset: -8% 15%;
          transform: rotate(25deg) scaleX(0.55);
        }

        .longitude-two {
          inset: -8% 15%;
          transform: rotate(-32deg) scaleX(0.55);
        }

        .longitude-three {
          inset: -5% 27%;
          transform: rotate(0deg) scaleX(0.5);
        }

        .ai-sphere-glint {
          position: absolute;
          top: 17%;
          left: 21%;
          width: 18%;
          height: 8%;
          border-radius: 50%;
          background: rgba(223, 255, 255, 0.82);
          filter: blur(8px);
          transform: rotate(-35deg);
        }
    `}</style>
  );
}
