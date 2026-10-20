"use client";

export default function ResponsiveWideStyles() {
  return (
    <style jsx global>{`
        @media (min-width: 1500px) {
          .ai-hero-inner {
            min-height: 790px;
          }

          .ai-hero {
            min-height: 840px;
          }

          .ai-core-stage {
            width: 580px;
          }
        }

        @media (max-width: 1050px) {
          .ai-hero-inner {
            grid-template-columns: 1fr 0.85fr;
            width: min(100% - 48px, 1100px);
          }

          .ai-hero h1 {
            font-size: clamp(45px, 6vw, 66px);
          }

          .ai-core-stage {
            width: 100%;
          }

          .ai-core-data {
            font-size: 7px;
          }

          .ai-core-data strong {
            font-size: 7px;
          }

          .ai-manifesto-grid {
            gap: 38px;
          }

          .ai-capability-layout {
            grid-template-columns: 0.95fr 1.05fr;
          }

          .ai-capability-item {
            grid-template-columns: 22px 37px 1fr 14px;
            gap: 10px;
            padding-inline: 11px;
          }

          .ai-capability-icon {
            width: 37px;
            height: 37px;
          }

          .ai-console-body {
            grid-template-columns: 0.8fr 1.2fr;
          }

          .ai-pipeline {
            padding-inline: 13px;
          }

          .ai-pipeline-connector {
            width: 13px;
          }

          .ai-pipeline-node strong {
            font-size: 7px;
          }

          .ai-process-step {
            padding-inline: 13px;
          }

          .ai-process-step-top {
            font-size: 7px;
          }

          .ai-faq {
            gap: 45px;
          }
        }
    `}</style>
  );
}
