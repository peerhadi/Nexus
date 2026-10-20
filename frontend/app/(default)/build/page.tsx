"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, UserRoundPlus } from "lucide-react";
import BuildBackground from "@/components/default/build/build-background";
import BuildForm from "@/components/default/build/build-form";
import BuildHero from "@/components/default/build/build-hero";
import Submitted from "@/components/default/build/submitted";

export default function BuildPage() {
  const [submitted, setSubmitted] = useState(false);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const token =
      localStorage.getItem("nexus_token") ||
      sessionStorage.getItem("nexus_token");

    setSignedIn(Boolean(token));

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

      <div className="relative mx-auto grid min-h-dvh w-full max-w-[1180px] px-5 py-6 sm:px-8 lg:px-10">
        <div className="flex flex-1 items-center justify-center py-10">
          <div
            className={`grid w-full items-center gap-10 ${"lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 mt-30"}`}
          >
            <BuildHero />

            {signedIn === null ? (
              <div
                className="min-h-64 animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
                aria-label="Loading project options"
              />
            ) : signedIn ? (
              <BuildForm />
            ) : (
              <section className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]">
                  <Mail
                    size={22}
                    className="text-[var(--text-primary)]"
                    aria-hidden="true"
                  />
                </div>

                <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                  Ready to start a project?
                </h2>

                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                  Sign in or create an account to submit a project request
                  through Nexus. Prefer email? You can contact us directly
                  without creating an account.
                </p>

                <div className="mt-7 flex flex-col gap-3">
                  <Link
                    href="/signup"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
                  >
                    <UserRoundPlus size={17} aria-hidden="true" />
                    Create an account
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>

                  <Link
                    href="/login?redirect=/build"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
                  >
                    Already have an account? Sign in
                  </Link>

                  <a
                    href="mailto:nexusdevs.js@gmail.com?subject=Project%20enquiry"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    <Mail size={16} aria-hidden="true" />
                    Contact us by email
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>

                <p className="mt-5 border-t border-[var(--border)] pt-4 text-xs leading-5 text-[var(--text-muted)]">
                  No account yet? You can explore our work and services before
                  deciding how to get in touch.
                </p>
              </section>
            )}
          </div>
        </div>

        <footer className="pb-2 text-center text-xs text-[var(--text-muted)]">
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
