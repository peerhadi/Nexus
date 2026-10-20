"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Orbit, Sparkles } from "lucide-react";

import LabConsole from "@/components/default/services/ai-systems/lab-console";
import { architectures } from "@/components/default/services/ai-systems/data";
import type { ArchitectureKey } from "@/components/default/services/ai-systems/types";

export default function Lab() {
  const [architecture, setArchitecture] =
    useState<ArchitectureKey>("assistant");
  const [demoRunning, setDemoRunning] = useState(false);

  const selectedArchitecture = architectures[architecture];

  const handleSelectArchitecture = (key: ArchitectureKey) => {
    setArchitecture(key);
    setDemoRunning(false);
  };

  return (
    <section id="ai-lab" className="ai-lab-section">
      <div className="ai-lab-background" aria-hidden="true">
        <div className="ai-lab-blob ai-lab-blob-one" />
        <div className="ai-lab-blob ai-lab-blob-two" />
        <div className="ai-lab-grid" />
      </div>

      <div className="ai-lab-inner section-shell">
        <div className="ai-section-kicker">
          <span>03</span>
          <span className="ai-kicker-line" />
          THE INTERACTIVE LAB
        </div>

        <div className="ai-lab-heading">
          <div>
            <h2>
              Under the hood,
              <br />
              <span>not under the rug.</span>
            </h2>
            <p>
              Explore three example architectures. Switch the system and watch
              how the pipeline changes from input to outcome.
            </p>
          </div>
          <div className="ai-lab-stamp">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Orbit size={23} />
            </motion.div>
            <span>INTERACTIVE</span>
            <strong>LAB / 01</strong>
          </div>
        </div>

        <LabConsole
          architecture={architecture}
          selectedArchitecture={selectedArchitecture}
          demoRunning={demoRunning}
          onSelectArchitecture={handleSelectArchitecture}
          onToggleDemo={() => setDemoRunning((current) => !current)}
        />

        <div className="ai-lab-footnote">
          <span>
            <Sparkles size={14} /> A conceptual architecture explorer
          </span>
          <span>
            Real implementations are designed around your requirements, data,
            and infrastructure.
          </span>
        </div>
      </div>
    </section>
  );
}
