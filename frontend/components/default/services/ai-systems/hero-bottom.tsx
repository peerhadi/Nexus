"use client";

import { motion } from "framer-motion";

export default function HeroBottom() {
  return (
    <div className="ai-hero-bottom">
      <div className="ai-hero-bottom-inner">
        <span>FROM MODEL TO PRODUCT</span>
        <div className="ai-hero-bottom-track">
          <motion.span
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
        <span>INTELLIGENCE, WITH INTENTION</span>
      </div>
    </div>
  );
}
