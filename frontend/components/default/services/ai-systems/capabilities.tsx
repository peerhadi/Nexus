"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import CapabilityDetail from "@/components/default/services/ai-systems/capability-detail";
import { capabilities } from "@/components/default/services/ai-systems/data";

export default function Capabilities() {
  const [activeCapability, setActiveCapability] = useState("reason");

  const selectedCapability =
    capabilities.find((item) => item.id === activeCapability) ??
    capabilities[0];

  return (
    <section id="ai-capabilities" className="ai-capabilities section-shell">
      <div className="ai-section-heading">
        <div>
          <div className="ai-section-kicker">
            <span>02</span>
            <span className="ai-kicker-line" />
            SYSTEM CAPABILITIES
          </div>
          <h2>
            Give intelligence
            <br />
            <span>a job to do.</span>
          </h2>
        </div>
        <p>
          Different problems need different systems. Select a capability to
          explore how it could work inside your product.
        </p>
      </div>

      <div className="ai-capability-layout">
        <div className="ai-capability-list">
          {capabilities.map((item) => {
            const Icon = item.icon;
            const isActive = activeCapability === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`ai-capability-item ai-tone-${item.color} ${
                  isActive ? "is-active" : ""
                }`}
                onClick={() => setActiveCapability(item.id)}
                aria-pressed={isActive}
              >
                <span className="ai-capability-number">{item.number}</span>
                <span className="ai-capability-icon">
                  <Icon size={19} />
                </span>
                <span className="ai-capability-title">
                  <strong>{item.title}</strong>
                  <small>{item.subtitle}</small>
                </span>
                <ChevronRight className="ai-capability-arrow" size={17} />
              </button>
            );
          })}
        </div>

        <div className="ai-capability-detail">
          <CapabilityDetail
            capability={selectedCapability}
            index={
              capabilities.findIndex((c) => c.id === activeCapability) + 1
            }
          />
        </div>
      </div>
    </section>
  );
}
