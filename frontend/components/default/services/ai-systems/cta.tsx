"use client";

import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit } from "lucide-react";

export default function Cta() {
  return (
    <section className="ai-cta-section">
      <div className="ai-cta-grid" aria-hidden="true" />
      <motion.div
        className="ai-cta-orb ai-cta-orb-one"
        aria-hidden="true"
        animate={{
          y: [0, -18, 0],
          rotate: [0, 120, 360],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="ai-cta-orb ai-cta-orb-two"
        aria-hidden="true"
        animate={{
          y: [0, 14, 0],
          rotate: [0, -180, -360],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="ai-cta-inner section-shell">
        <div className="ai-section-kicker">
          <span>07</span>
          <span className="ai-kicker-line" />
          YOUR NEXT SYSTEM STARTS HERE
        </div>

        <div className="ai-cta-content">
          <div>
            <span className="ai-cta-overline">
              <span /> HAVE A PROBLEM WORTH SOLVING?
            </span>
            <h2>
              Make your
              <br />
              next move
              <span className="ai-cta-highlight"> intelligent.</span>
            </h2>
            <p>
              Bring the idea, the workflow, or the frustrating problem.
              Let&apos;s work out what a purpose-built AI system could look
              like.
            </p>
            <div className="ai-cta-actions">
              <a href="/build" className="ai-button ai-button-primary">
                Start a project <ArrowRight size={17} />
              </a>
              <a href="/services" className="ai-button ai-button-secondary">
                All services <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="ai-cta-visual" aria-hidden="true">
            <div className="ai-cta-visual-grid" />
            <motion.div
              className="ai-cta-visual-ring ai-cta-visual-ring-one"
              animate={{ rotate: 360 }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="ai-cta-visual-ring ai-cta-visual-ring-two"
              animate={{ rotate: -360 }}
              transition={{
                duration: 21,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="ai-cta-visual-core"
              animate={{
                rotateY: [0, 180, 360],
                rotateX: [0, 20, 0, -20, 0],
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <BrainCircuit size={44} strokeWidth={1.15} />
            </motion.div>
            <span className="ai-cta-visual-label ai-cta-visual-label-one">
              INTENT
            </span>
            <span className="ai-cta-visual-label ai-cta-visual-label-two">
              POSSIBILITY
            </span>
            <span className="ai-cta-visual-label ai-cta-visual-label-three">
              EXECUTION
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
