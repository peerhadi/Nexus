"use client";

import { useEffect, useState } from "react";
import BuildBackground from "@/components/default/build/build-background";
import BuildForm from "@/components/default/build/build-form";
import BuildHero from "@/components/default/build/build-hero";
import Submitted from "@/components/default/build/submitted";

export default function BuildPage() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleSubmitted = () => {
      setSubmitted(true);
    };

    window.addEventListener("build-submitted", handleSubmitted);

    return () => {
      window.removeEventListener("build-submitted", handleSubmitted);
    };
  }, []);

  if (submitted) {
    return <Submitted />;
  }

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      <BuildBackground />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-[1180px] flex-col px-5 py-6 sm:px-8 lg:px-10">
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <BuildHero />
            <BuildForm />
          </div>
        </div>

        <footer className="pb-2 text-center text-[9px] font-bold text-[var(--text-disabled)]">
          Nexus · Build less manually. Create more.
        </footer>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(20px, -24px, 0);
          }
        }

        @keyframes particle {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.25;
          }

          50% {
            transform: translateY(-18px) scale(1.5);
            opacity: 0.7;
          }
        }

        @keyframes chip {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-3px);
          }
        }

        @keyframes rainbow {
          0% {
            background-position: 0% 50%;
          }

          100% {
            background-position: 300% 50%;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(14px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </main>
  );
}
