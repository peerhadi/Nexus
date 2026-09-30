"use client";

import { useEffect, useState } from "react";
import ContactBackground from "@/components/default/contact/contact-background";
import ContactForm from "@/components/default/contact/contact-form";
import ContactHero from "@/components/default/contact/contact-hero";
import Submitted from "@/components/default/contact/submitted";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleSubmitted = () => {
      setSubmitted(true);
    };

    window.addEventListener("contact-submitted", handleSubmitted);

    return () => {
      window.removeEventListener("contact-submitted", handleSubmitted);
    };
  }, []);

  if (submitted) {
    return <Submitted />;
  }

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#fafaf8] text-neutral-950">
      <ContactBackground />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-[1180px] flex-col px-5 py-6 sm:px-8 lg:px-10">
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <ContactHero />
            <ContactForm />
          </div>
        </div>

        <footer className="pb-2 text-center text-[9px] font-bold text-neutral-300">
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
