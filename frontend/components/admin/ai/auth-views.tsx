"use client";

import { ArrowLeft, LoaderCircle, RefreshCw, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function CheckingView() {
  return (
    <main className="grid min-h-[calc(100dvh-1px)] place-items-center bg-[var(--background)] px-5 text-[var(--text-primary)]">
      <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 text-sm text-[var(--text-secondary)]">
        <LoaderCircle className="h-4 w-4 animate-spin text-[var(--accent)]" />{" "}
        Verifying administrator access…
      </div>
    </main>
  );
}

export function DeniedView() {
  return (
    <main className="grid min-h-[calc(100dvh-1px)] place-items-center bg-[var(--background)] px-5 text-[var(--text-primary)]">
      <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow-md)]">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-[var(--danger-border,var(--border))] bg-[var(--danger-bg,var(--surface-secondary))] text-[var(--danger,var(--text-primary))]">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h1 className="mt-5 text-xl font-bold">Administrator access required</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          Nexus Admin AI is only available to accounts with the ADMIN role.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-contrast,var(--background))]"
        >
          Return to Nexus <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}

export function AuthErrorView({ message }: { message: string }) {
  return (
    <main className="grid min-h-[calc(100dvh-1px)] place-items-center bg-[var(--background)] px-5 text-[var(--text-primary)]">
      <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[var(--surface-secondary)]">
          <ShieldCheck className="h-5 w-5 text-[var(--text-secondary)]" />
        </div>
        <h1 className="mt-4 text-lg font-bold">Could not verify access</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          {message || "Check your session and try again."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-2.5 text-sm font-semibold"
        >
          <RefreshCw className="h-4 w-4" /> Try again
        </button>
      </div>
    </main>
  );
}
