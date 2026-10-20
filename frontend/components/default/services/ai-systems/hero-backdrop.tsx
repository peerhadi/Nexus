"use client";

import { motion } from "framer-motion";

export default function HeroBackdrop() {
  return (
    <>
      <div className="ai-hero-grid" aria-hidden="true" />
      <div className="ai-cursor-glow" aria-hidden="true" />

      <div className="ai-hero-noise" aria-hidden="true" />

      <motion.div
        className="ai-orbit ai-orbit-one"
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      >
        <span className="ai-orbit-dot ai-orbit-dot-cyan" />
        <span className="ai-orbit-dot ai-orbit-dot-purple" />
        <span className="ai-orbit-dot ai-orbit-dot-white" />
      </motion.div>

      <motion.div
        className="ai-orbit ai-orbit-two"
        aria-hidden="true"
        animate={{ rotate: -360 }}
        transition={{ duration: 29, repeat: Infinity, ease: "linear" }}
      >
        <span className="ai-orbit-dot ai-orbit-dot-pink" />
        <span className="ai-orbit-dot ai-orbit-dot-lime" />
      </motion.div>

      <motion.div
        className="ai-floating-object ai-object-cube"
        aria-hidden="true"
        animate={{
          y: [0, -22, 8, 0],
          rotateX: [0, 180, 270, 360],
          rotateY: [0, 90, 220, 360],
          rotateZ: [0, 35, -15, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="ai-cube-face ai-cube-front" />
        <div className="ai-cube-face ai-cube-back" />
        <div className="ai-cube-face ai-cube-right" />
        <div className="ai-cube-face ai-cube-left" />
        <div className="ai-cube-face ai-cube-top" />
        <div className="ai-cube-face ai-cube-bottom" />
      </motion.div>

      <motion.div
        className="ai-floating-object ai-object-ring"
        aria-hidden="true"
        animate={{
          y: [0, 16, -10, 0],
          rotateX: [65, 85, 55, 65],
          rotateY: [0, 120, 240, 360],
          rotateZ: [0, -60, 30, 0],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div />
        <span />
      </motion.div>

      <motion.div
        className="ai-floating-object ai-object-diamond"
        aria-hidden="true"
        animate={{
          y: [0, -17, 12, 0],
          rotateZ: [0, 90, 180, 270, 360],
          rotateX: [0, 60, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div />
      </motion.div>
    </>
  );
}
