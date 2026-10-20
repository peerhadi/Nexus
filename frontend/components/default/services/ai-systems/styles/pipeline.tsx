"use client";

export default function PipelineStyles() {
  return (
    <style jsx global>{`
        .ai-pipeline {
          display: flex;
          min-width: 0;
          flex-direction: column;
          justify-content: center;
          padding: 25px 20px 18px;
        }

        .ai-pipeline-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 34px;
          color: var(--ai-muted);
          font-size: 8px;
        }

        .ai-pipeline-topline > span:last-child {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .ai-pipeline-topline i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--ai-muted);
        }

        .ai-pipeline-topline i.is-running {
          background: var(--ai-lime);
          box-shadow: 0 0 10px var(--ai-lime);
          animation: ai-status-pulse 1s ease-in-out infinite;
        }

        .ai-pipeline-nodes {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
        }

        .ai-pipeline-step-wrap {
          display: flex;
          min-width: 0;
          flex: 1;
          align-items: center;
        }

        .ai-pipeline-node {
          display: flex;
          min-width: 0;
          width: 100%;
          min-height: 112px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 10px 4px;
          border: 1px solid var(--ai-border);
          background: var(--background);
          text-align: center;
        }

        .ai-node-index {
          color: var(--ai-muted);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 8px;
        }

        .ai-node-icon {
          display: grid;
          width: 30px;
          height: 30px;
          place-items: center;
          color: var(--ai-cyan);
        }

        .ai-pipeline-node strong {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 8px;
          letter-spacing: 0.06em;
        }

        .ai-node-state {
          color: var(--ai-muted);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 7px;
          letter-spacing: 0.08em;
        }

        .ai-pipeline-node.is-executing .ai-node-state {
          color: var(--ai-lime);
        }

        .ai-pipeline-connector {
          position: relative;
          width: 21px;
          min-width: 10px;
          height: 1px;
          flex-shrink: 0;
          background: var(--ai-border);
        }

        .ai-pipeline-connector > span {
          position: absolute;
          top: -2px;
          left: 0;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--ai-cyan);
          box-shadow: 0 0 8px var(--ai-cyan);
        }

        .ai-pipeline-result {
          display: flex;
          min-height: 57px;
          align-items: center;
          gap: 12px;
          margin-top: 25px;
          padding: 10px 12px;
          border: 1px solid var(--ai-border);
          background: color-mix(in srgb, var(--background) 70%, transparent);
        }

        .ai-pipeline-result.is-active {
          border-color: color-mix(
            in srgb,
            var(--ai-lime) 40%,
            var(--ai-border)
          );
        }

        .ai-result-icon {
          display: grid;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid var(--ai-border);
          color: var(--ai-cyan);
        }

        .ai-pipeline-result > span:nth-child(2) {
          display: flex;
          min-width: 0;
          flex-direction: column;
          gap: 5px;
        }

        .ai-pipeline-result strong {
          font-size: 10px;
          font-weight: 600;
        }

        .ai-pipeline-result small {
          color: var(--ai-muted);
          font-size: 9px;
          line-height: 1.5;
        }

        .ai-result-pulse {
          width: 6px;
          height: 6px;
          flex-shrink: 0;
          margin-left: auto;
          border-radius: 50%;
          background: var(--ai-lime);
          box-shadow: 0 0 10px var(--ai-lime);
        }

        .ai-pipeline-footer {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-top: 19px;
          color: var(--ai-muted);
          font-size: 7px;
        }

        .ai-lab-footnote {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 12px;
          margin-top: 18px;
          color: var(--ai-muted);
          font-size: 10px;
          line-height: 1.7;
        }

        .ai-lab-footnote > span:first-child {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--ai-cyan);
        }
    `}</style>
  );
}
