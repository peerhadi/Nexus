"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

import type { Capability } from "@/components/default/services/ai-systems/types";

interface CapabilityDetailProps {
  capability: Capability;
  index: number;
}

export default function CapabilityDetail({
  capability,
  index,
}: CapabilityDetailProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={capability.id}
        className={`ai-capability-detail-inner ai-tone-${capability.color}`}
        initial={{ opacity: 0, x: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, x: -12, filter: "blur(5px)" }}
        transition={{ duration: 0.3 }}
      >
        <div className="ai-detail-topline">
          <span>CAPABILITY / {capability.number}</span>
          <span className="ai-detail-live">
            <span /> SYSTEM READY
          </span>
        </div>

        <div className="ai-detail-art" aria-hidden="true">
          <div className="ai-detail-grid" />
          <motion.div
            className="ai-detail-orbit ai-detail-orbit-a"
            animate={{ rotate: 360 }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span />
          </motion.div>
          <motion.div
            className="ai-detail-orbit ai-detail-orbit-b"
            animate={{ rotate: -360 }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span />
          </motion.div>
          <motion.div
            className="ai-detail-object"
            animate={{
              rotateY: [0, 180, 360],
              rotateX: [0, 25, 0, -25, 0],
              y: [0, -7, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <capability.icon size={34} strokeWidth={1.4} />
          </motion.div>
          <span className="ai-art-label ai-art-label-a">NEXUS / CORE</span>
          <span className="ai-art-label ai-art-label-b">0{index}:00</span>
          <div className="ai-art-crosshair ai-art-crosshair-a" />
          <div className="ai-art-crosshair ai-art-crosshair-b" />
        </div>

        <div className="ai-detail-copy">
          <h3>{capability.title}</h3>
          <p>{capability.description}</p>
          <div className="ai-detail-tags">
            {capability.tags.map((tag) => (
              <span key={tag}>
                <Check size={12} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
