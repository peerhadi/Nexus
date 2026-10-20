"use client";

import { motion } from "framer-motion";
import {
  AudioWaveform,
  Braces,
  BrainCircuit,
  CircleDot,
  Network,
  Zap,
} from "lucide-react";

export default function HeroCore() {
  return (
    <div
      className="ai-core-stage"
      aria-label="Animated AI system illustration"
    >
      <motion.div
        className="ai-core-aura"
        animate={{
          scale: [0.92, 1.08, 0.96],
          opacity: [0.45, 0.8, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="ai-core-ring ai-core-ring-outer"
        animate={{ rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      >
        <span className="ai-core-marker marker-one" />
        <span className="ai-core-marker marker-two" />
        <span className="ai-core-marker marker-three" />
      </motion.div>

      <motion.div
        className="ai-core-ring ai-core-ring-middle"
        animate={{ rotate: -360 }}
        transition={{ duration: 23, repeat: Infinity, ease: "linear" }}
      >
        <span className="ai-core-satellite satellite-one">
          <BrainCircuit size={16} />
        </span>
        <span className="ai-core-satellite satellite-two">
          <Network size={15} />
        </span>
      </motion.div>

      <motion.div
        className="ai-core-ring ai-core-ring-inner"
        animate={{
          rotateX: [58, 72, 58],
          rotateZ: [0, 180, 360],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="ai-core-sphere"
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 15, 0, -15, 0],
        }}
        transition={{
          rotateY: { duration: 24, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="ai-sphere-surface" />
        <div className="ai-sphere-latitude latitude-one" />
        <div className="ai-sphere-latitude latitude-two" />
        <div className="ai-sphere-latitude latitude-three" />
        <div className="ai-sphere-longitude longitude-one" />
        <div className="ai-sphere-longitude longitude-two" />
        <div className="ai-sphere-longitude longitude-three" />
        <div className="ai-sphere-glint" />
      </motion.div>

      <motion.div
        className="ai-core-data ai-data-top"
        animate={{ y: [0, -6, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <span className="ai-data-dot" />
        CONTEXT
        <strong>CONNECTED</strong>
      </motion.div>

      <motion.div
        className="ai-core-data ai-data-left"
        animate={{ x: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <AudioWaveform size={14} />
        <span>INPUT</span>
        <i />
      </motion.div>

      <motion.div
        className="ai-core-data ai-data-right"
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity }}
      >
        <CircleDot size={13} />
        <span>REASONING</span>
      </motion.div>

      <motion.div
        className="ai-core-data ai-data-bottom"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 5.5, repeat: Infinity }}
      >
        <span className="ai-data-bottom-bar" />
        <span>INTENT → ACTION</span>
      </motion.div>

      <motion.div
        className="ai-mini-node ai-mini-node-one"
        animate={{ y: [0, -12, 0], rotate: [0, 90, 180] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <Braces size={19} />
      </motion.div>

      <motion.div
        className="ai-mini-node ai-mini-node-two"
        animate={{ y: [0, 13, 0], rotate: [0, -90, -180] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <Zap size={18} />
      </motion.div>

      <motion.div
        className="ai-mini-node ai-mini-node-three"
        animate={{
          y: [0, -8, 4, 0],
          rotateX: [0, 180, 360],
          rotateY: [0, 180, 360],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      >
        <div />
      </motion.div>

      <div className="ai-core-caption">
        <span>FIG. 01</span>
        <span>AN ADAPTIVE SYSTEM</span>
        <span>∞</span>
      </div>
    </div>
  );
}
