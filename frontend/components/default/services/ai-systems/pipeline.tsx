"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AudioWaveform,
  CircleDot,
  Cpu,
  MessageSquareText,
  Network,
  Sparkles,
} from "lucide-react";

import type { ArchitectureKey } from "@/components/default/services/ai-systems/types";

interface PipelineProps {
  architecture: ArchitectureKey;
  nodes: string[];
  demoRunning: boolean;
}

export default function Pipeline({
  architecture,
  nodes,
  demoRunning,
}: PipelineProps) {
  return (
    <div
      className="ai-pipeline"
      aria-label="Illustration of the selected architecture pipeline"
    >
      <div className="ai-pipeline-topline">
        <span>PROCESS FLOW</span>
        <span>
          {demoRunning ? "EXECUTING" : "STANDBY"}
          <i className={demoRunning ? "is-running" : ""} />
        </span>
      </div>

      <div className="ai-pipeline-nodes">
        {nodes.map((node, index) => (
          <div
            className="ai-pipeline-step-wrap"
            key={`${architecture}-${node}`}
          >
            <motion.div
              className={`ai-pipeline-node ${
                demoRunning ? "is-executing" : ""
              }`}
              animate={
                demoRunning
                  ? {
                      borderColor: [
                        "var(--card-border)",
                        "var(--accent)",
                        "var(--card-border)",
                      ],
                      boxShadow: [
                        "0 0 0 rgba(0,0,0,0)",
                        "0 0 24px rgba(70,220,255,0.22)",
                        "0 0 0 rgba(0,0,0,0)",
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 1.4,
                delay: index * 0.65,
                repeat: demoRunning ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              <span className="ai-node-index">0{index + 1}</span>
              <div className="ai-node-icon">
                {index === 0 ? (
                  <MessageSquareText size={17} />
                ) : index === 1 ? (
                  <Network size={17} />
                ) : index === 2 ? (
                  <Cpu size={17} />
                ) : (
                  <Sparkles size={17} />
                )}
              </div>
              <strong>{node}</strong>
              <span className="ai-node-state">
                {demoRunning ? "ACTIVE" : "READY"}
              </span>
            </motion.div>

            {index < nodes.length - 1 && (
              <div className="ai-pipeline-connector">
                <div />
                <motion.span
                  animate={
                    demoRunning
                      ? { x: [0, 38], opacity: [0, 1, 0] }
                      : { x: 0, opacity: 0.3 }
                  }
                  transition={{
                    duration: 1.2,
                    delay: index * 0.65,
                    repeat: demoRunning ? Infinity : 0,
                    ease: "linear",
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {demoRunning ? (
          <motion.div
            key="executing"
            className="ai-pipeline-result is-active"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            <span className="ai-result-icon">
              <AudioWaveform size={16} />
            </span>
            <span>
              <strong>Sequence in motion</strong>
              <small>
                Illustrative animation — no live model is being called.
              </small>
            </span>
            <span className="ai-result-pulse" />
          </motion.div>
        ) : (
          <motion.div
            key="standby"
            className="ai-pipeline-result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="ai-result-icon">
              <CircleDot size={16} />
            </span>
            <span>
              <strong>Pipeline ready</strong>
              <small>Run the sequence to explore the visual flow.</small>
            </span>
            <span className="ai-result-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="ai-pipeline-footer">
        <span>INPUT → PROCESSING → OUTPUT</span>
        <span>MODEL-AGNOSTIC DESIGN</span>
      </div>
    </div>
  );
}
