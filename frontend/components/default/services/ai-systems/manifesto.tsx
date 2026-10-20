"use client";

import { motion } from "framer-motion";
import { ArrowRight, Orbit } from "lucide-react";

export default function Manifesto() {
  return (
    <section className="ai-manifesto section-shell">
      <div className="ai-section-kicker">
        <span>01</span>
        <span className="ai-kicker-line" />
        THE POINT OF IT ALL
      </div>

      <div className="ai-manifesto-grid">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          Intelligence is
          <br />
          not the product.
          <br />
          <span>The outcome is.</span>
        </motion.h2>

        <div className="ai-manifesto-copy">
          <p>
            A model on its own is just a component. The real engineering is
            everything around it: the context it receives, the systems it can
            access, the decisions it is allowed to make, and the way people
            experience the result.
          </p>
          <p>
            We bring those pieces together into AI-powered features and
            applications designed for a specific purpose, with a clear role
            inside your business or product.
          </p>
          <a href="#ai-capabilities" className="ai-text-link">
            Explore the capabilities <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <div className="ai-manifesto-visual" aria-hidden="true">
        <div className="ai-manifesto-word">THINK</div>
        <div className="ai-manifesto-symbol">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            <Orbit />
          </motion.div>
        </div>
        <div className="ai-manifesto-word ai-manifesto-word-right">DO.</div>
        <div className="ai-manifesto-scanline" />
      </div>
    </section>
  );
}
