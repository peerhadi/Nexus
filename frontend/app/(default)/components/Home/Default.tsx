"use client";
import Atmosphere from "@/components/default/home/atmosphere";
import Hero from "@/components/default/home/hero";
import Manifesto from "@/components/default/home/manifesto";
import Process from "@/components/default/home/process";
import Services from "@/components/default/home/services";

export default function DefaultHome() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      <Atmosphere />
      <Hero />
      <Services />
      <Process />
      <Manifesto />
    </main>
  );
}
