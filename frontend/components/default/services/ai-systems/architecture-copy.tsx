"use client";

import { motion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";

import type { Architecture } from "@/components/default/services/ai-systems/types";

interface ArchitectureCopyProps {
  selectedArchitecture: Architecture;
  demoRunning: boolean;
  onToggleDemo: () => void;
}

export default function ArchitectureCopy({
  selectedArchitecture,
  demoRunning,
  onToggleDemo,
}: ArchitectureCopyProps) {
  return (
    <div className="ai-architecture-copy">
      <motion.div
        key={selectedArchitecture.code}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <span className="ai-architecture-code">
          {selectedArchitecture.code}
        </span>
        <h3>{selectedArchitecture.label}</h3>
        <p>{selectedArchitecture.description}</p>

        <div className="ai-architecture-output">
          <span>DESIGNED OUTPUT</span>
          <strong>{selectedArchitecture.output}</strong>
        </div>

        <div className="ai-architecture-meta">
          <span>EXECUTION</span>
          <span>{selectedArchitecture.time}</span>
        </div>
      </motion.div>

      <div className="ai-console-actions">
        <button
          type="button"
          className="ai-run-button"
          onClick={onToggleDemo}
        >
          {demoRunning ? (
            <>
              <RotateCcw size={15} />
              Reset sequence
            </>
          ) : (
            <>
              <Play size={14} fill="currentColor" />
              Run sequence
            </>
          )}
        </button>
        <span>SIMULATED FLOW</span>
      </div>
    </div>
  );
}
