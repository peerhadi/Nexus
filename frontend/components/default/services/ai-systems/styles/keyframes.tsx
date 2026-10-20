"use client";

export default function KeyframeStyles() {
  return (
    <style jsx global>{`
        @keyframes ai-scan {
          0% {
            left: -20%;
          }
          100% {
            left: 120%;
          }
        }

        @keyframes ai-blob-drift {
          0% {
            transform: translate3d(0, 0, 0) scale(0.9);
          }
          100% {
            transform: translate3d(80px, -40px, 0) scale(1.15);
          }
        }

        @keyframes ai-status-pulse {
          0%,
          100% {
            opacity: 0.45;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes ai-faq-reveal {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
    `}</style>
  );
}
