"use client";

export default function ResponsiveXsStyles() {
  return (
    <style jsx global>{`
        @media (max-width: 420px) {
          .ai-page .section-shell {
            width: calc(100% - 28px);
          }

          .ai-hero-inner {
            width: calc(100% - 28px);
            padding-top: 58px;
          }

          .ai-hero h1 {
            font-size: clamp(43px, 11vw, 53px);
          }

          .ai-hero-description {
            font-size: 13px;
          }

          .ai-hero-actions {
            align-items: stretch;
          }

          .ai-button {
            min-height: 45px;
            padding-inline: 12px;
            font-size: 11px;
          }

          .ai-core-stage {
            width: calc(100% + 12px);
            margin-left: -6px;
          }

          .ai-core-data {
            gap: 4px;
            padding: 7px 6px;
            font-size: 6px;
            letter-spacing: 0.06em;
          }

          .ai-core-data strong {
            font-size: 6px;
          }

          .ai-data-left {
            left: 0;
          }

          .ai-data-right {
            right: 0;
          }

          .ai-data-top {
            left: 28%;
          }

          .ai-data-bottom {
            left: 26%;
          }

          .ai-mini-node {
            width: 34px;
            height: 34px;
          }

          .ai-mini-node svg {
            width: 15px;
            height: 15px;
          }

          .ai-core-caption {
            font-size: 6px;
          }

          .ai-hero-bottom-inner {
            width: calc(100% - 28px);
            gap: 9px;
            font-size: 6px;
          }

          .ai-hero-bottom-inner > span:last-child {
            text-align: right;
          }

          .ai-eyebrow {
            gap: 7px;
            font-size: 8px;
          }

          .ai-capability-list {
            gap: 6px;
          }

          .ai-capability-item {
            grid-template-columns: 23px 1fr 10px;
            min-height: 103px;
            gap: 6px;
            padding: 10px 7px;
          }

          .ai-capability-icon {
            width: 26px;
            height: 26px;
          }

          .ai-capability-title strong {
            font-size: 11px;
          }

          .ai-capability-title small {
            font-size: 9px;
          }

          .ai-detail-topline {
            padding-inline: 11px;
            font-size: 7px;
          }

          .ai-detail-copy {
            padding-inline: 13px;
          }

          .ai-detail-tags span {
            padding: 6px;
            font-size: 8px;
          }

          .ai-lab-stamp {
            min-width: 63px;
          }

          .ai-lab-stamp svg {
            width: 18px;
            height: 18px;
          }

          .ai-console-title {
            max-width: 115px;
            text-align: center;
          }

          .ai-console-tabs button {
            padding-inline: 9px;
            font-size: 9px;
          }

          .ai-pipeline {
            padding-inline: 7px;
          }

          .ai-pipeline-node {
            min-height: 91px;
            padding-inline: 1px;
          }

          .ai-pipeline-node strong {
            font-size: 6px;
            letter-spacing: 0;
          }

          .ai-node-state {
            font-size: 6px;
          }

          .ai-pipeline-connector {
            width: 7px;
            min-width: 4px;
          }

          .ai-pipeline-footer {
            letter-spacing: 0.04em;
          }

          .ai-process-step {
            min-height: 285px;
            padding-inline: 10px;
          }

          .ai-process-step-top {
            font-size: 6px;
          }

          .ai-process-step h3 {
            font-size: 13px;
          }

          .ai-process-step-bottom {
            font-size: 7px;
          }

          .ai-cta-actions {
            align-items: stretch;
          }

          .ai-cta-actions .ai-button {
            flex: 1;
          }
        }
    `}</style>
  );
}
