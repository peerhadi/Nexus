"use client";
import React from "react";
import HomePage from "./components/Home/LoggedIn";
import DefaultHome from "./components/Home/Default";

export default function Home() {
  const [loggedIn, setLoggedIn] = React.useState<null | boolean>(null);
  React.useEffect(() => {
    if (typeof window != "undefined") {
      if (window.localStorage.getItem("nexus_token")) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    }
  }, []);
  if (loggedIn === null) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--background)]">
        <div className="absolute left-[15%] top-[20%] h-72 w-72 rounded-full bg-[var(--accent-soft-strong)] blur-3xl" />
        <div className="absolute bottom-[10%] right-[15%] h-80 w-80 rounded-full bg-[var(--accent-soft)] blur-3xl" />
        <div className="absolute left-1/2 top-[35%] h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--hero-glow-tertiary)] blur-3xl" />

        <div className="relative flex flex-col items-center">
          <div className="relative mb-7 flex h-16 w-16 items-center justify-center rounded-[20px] border border-[var(--card-border)] bg-[var(--surface)] shadow-[var(--shadow-lg)] backdrop-blur-xl">
            <div className="absolute inset-2 rounded-[14px] bg-[var(--accent)] opacity-15" />

            <div className="relative flex flex-col gap-[4px]">
              <span className="h-[3px] w-7 rounded-full bg-[var(--accent)]" />
              <span className="ml-2 h-[3px] w-5 rounded-full bg-[var(--accent)]" />
              <span className="h-[3px] w-7 rounded-full bg-[var(--accent)]" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[12px] font-black tracking-[0.25em] text-[var(--text-secondary)]">
              NEXUS
            </span>

            <span className="flex gap-1">
              <span className="h-1 w-1 animate-pulse rounded-full bg-[var(--accent)]" />
              <span className="h-1 w-1 animate-pulse rounded-full bg-[var(--accent-hover)] [animation-delay:150ms]" />
              <span className="h-1 w-1 animate-pulse rounded-full bg-[var(--accent-active)] [animation-delay:300ms]" />
            </span>
          </div>

          <p className="mt-2 text-[11px] font-medium text-[var(--text-muted)]">
            Getting things ready
          </p>
        </div>
      </div>
    );
  }
  if (loggedIn) {
    return <HomePage />;
  } else {
    return <DefaultHome />;
  }
}
