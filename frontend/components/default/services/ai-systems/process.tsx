"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

import { processSteps } from "@/components/default/services/ai-systems/process-steps";

export default function Process() {
  return (
    <section className="ai-process section-shell">
      <div className="ai-section-kicker">
        <span>05</span>
        <span className="ai-kicker-line" />
        FROM IDEA TO SYSTEM
      </div>

      <div className="ai-process-heading">
        <h2>
          Built with intent.
          <br />
          <span>Shipped with purpose.</span>
        </h2>
        <p>
          We start with the problem, then choose the technology. Not the other
          way around.
        </p>
      </div>

      <div className="ai-process-track">
        {processSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <motion.article
              className="ai-process-step"
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="ai-process-step-top">
                <span>{step.number}</span>
                <span>{step.detail}</span>
              </div>
              <div className="ai-process-icon">
                <Icon size={21} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <div className="ai-process-step-bottom">
                <span>STAGE {step.number}</span>
                <ArrowDownRight size={16} />
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
