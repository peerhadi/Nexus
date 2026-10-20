"use client";

import { useCallback, useState, type CSSProperties } from "react";

import Capabilities from "@/components/default/services/ai-systems/capabilities";
import Cta from "@/components/default/services/ai-systems/cta";
import Faq from "@/components/default/services/ai-systems/faq";
import Hero from "@/components/default/services/ai-systems/hero";
import Lab from "@/components/default/services/ai-systems/lab";
import Manifesto from "@/components/default/services/ai-systems/manifesto";
import NextService from "@/components/default/services/ai-systems/next-service";
import Principles from "@/components/default/services/ai-systems/principles";
import Process from "@/components/default/services/ai-systems/process";
import Styles from "@/components/default/services/ai-systems/styles";

export default function AISystemsPage() {
  const [pointer, setPointer] = useState({ x: 50, y: 45 });

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      setPointer({
        x: ((event.clientX - bounds.left) / bounds.width) * 100,
        y: ((event.clientY - bounds.top) / bounds.height) * 100,
      });
    },
    [],
  );

  const pageStyle = {
    "--mx": `${pointer.x}%`,
    "--my": `${pointer.y}%`,
  } as CSSProperties;

  return (
    <main
      className="ai-page overflow-hidden"
      style={pageStyle}
      onPointerMove={handlePointerMove}
    >
      <Styles />
      <Hero />
      <Manifesto />
      <Capabilities />
      <Lab />
      <Principles />
      <Process />
      <Faq />
      <Cta />
      <NextService />
    </main>
  );
}
