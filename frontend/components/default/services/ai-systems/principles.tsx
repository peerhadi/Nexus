"use client";

import { motion } from "framer-motion";

import { principles } from "@/components/default/services/ai-systems/data";

export default function Principles() {
  return (
    <section className="ai-principles section-shell">
      <div className="ai-section-heading">
        <div>
          <div className="ai-section-kicker">
            <span>04</span>
            <span className="ai-kicker-line" />
            ENGINEERING PRINCIPLES
          </div>
          <h2>
            Clever is good.
            <br />
            <span>Dependable is better.</span>
          </h2>
        </div>
        <p>
          A useful AI feature needs more than a good demo. It needs a clear
          purpose, reliable boundaries, and a place in the wider product.
        </p>
      </div>

      <div className="ai-principle-grid">
        {principles.map((principle, index) => {
          const Icon = principle.icon;

          return (
            <motion.article
              key={principle.title}
              className="ai-principle-card"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              whileHover={{ y: -7 }}
            >
              <div className="ai-principle-card-top">
                <span>0{index + 1} / PRINCIPLE</span>
                <Icon size={20} />
              </div>
              <div className="ai-principle-icon">
                <Icon size={23} strokeWidth={1.5} />
              </div>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
              <div className="ai-principle-card-line">
                <span />
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
