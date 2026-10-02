"use client";
import Atmosphere from "@/components/default/home/atmosphere";
import Hero from "@/components/default/home/hero";
import Manifesto from "@/components/default/home/manifesto";
import Process from "@/components/default/home/process";
import Services from "@/components/default/home/services";
import { redirect } from "next/navigation";
import React from "react";

export default function HomePage() {
  React.useEffect(() => {
    if (typeof window != "undefined") {
      if (window.localStorage.getItem("nexus_token")) {
        redirect("/home");
      }
    }
  }, []);
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8f8f6] text-[#111]">
      <Atmosphere />
      <Hero />
      <Services />
      <Process />
      <Manifesto />
    </main>
  );
}
