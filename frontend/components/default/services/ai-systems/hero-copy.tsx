"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, Play } from "lucide-react";

import { fadeUp } from "@/components/default/services/ai-systems/data";

export default function HeroCopy() {
  return (
    <motion.div
      className="ai-hero-copy"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.12 },
        },
      }}
    >
      <motion.div className="ai-eyebrow" variants={fadeUp}>
        <span className="ai-eyebrow-signal">
          <span />
        </span>
        NEXUS / INTELLIGENCE LAB
        <span className="ai-eyebrow-divider" />
        <span className="ai-eyebrow-index">FIELD 04</span>
      </motion.div>

      <motion.h1 variants={fadeUp}>
        Intelligence,
        <br />
        <span className="ai-title-outline">engineered</span>
        <br />
        into <span className="ai-title-accent">everything.</span>
      </motion.h1>

      <motion.p className="ai-hero-description" variants={fadeUp}>
        Not another chatbot bolted onto a website. We build purposeful AI
        systems that understand your context, connect to your tools, and do
        meaningful work inside your product.
      </motion.p>

      <motion.div className="ai-hero-actions" variants={fadeUp}>
        <a href="/build" className="ai-button ai-button-primary">
          Start a project
          <ArrowDownRight size={17} />
        </a>
        <a href="#ai-lab" className="ai-button ai-button-secondary">
          Explore the lab
          <span className="ai-button-play">
            <Play size={12} fill="currentColor" />
          </span>
        </a>
      </motion.div>

      <motion.div className="ai-hero-footnote" variants={fadeUp}>
        <span className="ai-footnote-line" />
        <span>Designed around real problems, not AI hype.</span>
      </motion.div>
    </motion.div>
  );
}
