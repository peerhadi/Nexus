"use client";

export default function ResponsiveSmTwoStyles() {
  return (
    <style jsx global>{`
          .ai-lab-section {
            padding-block: 77px 68px;
          }

          .ai-lab-heading {
            align-items: start;
            gap: 18px;
            margin-top: 28px;
            margin-bottom: 28px;
          }

          .ai-lab-heading > div:first-child > p {
            font-size: 13px;
          }

          .ai-lab-stamp {
            min-width: 78px;
            padding: 11px 8px;
          }

          .ai-lab-stamp span,
          .ai-lab-stamp strong {
            font-size: 7px;
          }

          .ai-console-top {
            padding-inline: 12px;
          }

          .ai-console-title {
            font-size: 7px;
          }

          .ai-console-status {
            font-size: 7px;
          }

          .ai-console-tabs button {
            min-height: 48px;
            justify-content: start;
            gap: 7px;
            padding-inline: 12px;
            font-size: 10px;
          }

          .ai-console-body {
            grid-template-columns: 1fr;
          }

          .ai-architecture-copy {
            padding: 22px 17px;
            border-right: 0;
            border-bottom: 1px solid var(--ai-border);
          }

          .ai-architecture-copy h3 {
            font-size: 20px;
          }

          .ai-architecture-copy p {
            max-width: 520px;
          }

          .ai-architecture-output {
            margin-top: 18px;
          }

          .ai-console-actions {
            margin-top: 19px;
          }

          .ai-pipeline {
            padding: 22px 12px 17px;
          }

          .ai-pipeline-topline {
            margin-bottom: 25px;
          }

          .ai-pipeline-nodes {
            align-items: stretch;
          }

          .ai-pipeline-node {
            min-height: 100px;
            gap: 7px;
          }

          .ai-node-icon {
            width: 25px;
            height: 25px;
          }

          .ai-node-icon svg {
            width: 15px;
            height: 15px;
          }

          .ai-pipeline-connector {
            width: 10px;
            min-width: 6px;
          }

          .ai-pipeline-footer {
            font-size: 6px;
          }

          .ai-lab-footnote {
            font-size: 9px;
          }
    `}</style>
  );
}
