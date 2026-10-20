"use client";

import ArchitectureCopy from "@/components/default/services/ai-systems/architecture-copy";
import Pipeline from "@/components/default/services/ai-systems/pipeline";
import { architectures } from "@/components/default/services/ai-systems/data";
import type {
  Architecture,
  ArchitectureKey,
} from "@/components/default/services/ai-systems/types";

interface LabConsoleProps {
  architecture: ArchitectureKey;
  selectedArchitecture: Architecture;
  demoRunning: boolean;
  onSelectArchitecture: (key: ArchitectureKey) => void;
  onToggleDemo: () => void;
}

export default function LabConsole({
  architecture,
  selectedArchitecture,
  demoRunning,
  onSelectArchitecture,
  onToggleDemo,
}: LabConsoleProps) {
  return (
    <div className="ai-lab-console">
      <div className="ai-console-top">
        <div className="ai-console-window-controls">
          <span />
          <span />
          <span />
        </div>
        <span className="ai-console-title">NEXUS / SYSTEM ARCHITECT</span>
        <span className="ai-console-status">
          <span /> READY
        </span>
      </div>

      <div
        className="ai-console-tabs"
        role="tablist"
        aria-label="AI system architectures"
      >
        {(Object.keys(architectures) as ArchitectureKey[]).map(
          (key, index) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={architecture === key}
              className={architecture === key ? "is-selected" : ""}
              onClick={() => onSelectArchitecture(key)}
            >
              <span>0{index + 1}</span>
              {architectures[key].label}
            </button>
          ),
        )}
      </div>

      <div className="ai-console-body">
        <ArchitectureCopy
          selectedArchitecture={selectedArchitecture}
          demoRunning={demoRunning}
          onToggleDemo={onToggleDemo}
        />
        <Pipeline
          architecture={architecture}
          nodes={selectedArchitecture.nodes}
          demoRunning={demoRunning}
        />
      </div>
    </div>
  );
}
