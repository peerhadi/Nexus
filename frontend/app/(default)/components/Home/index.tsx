"use client";

import React from "react";
import dynamic from "next/dynamic";
import DefaultHome from "./Default";
import { API_URL } from "@/lib/api";

const HomePage = dynamic(() => import("./LoggedIn"), {
  ssr: false,
  loading: () => <HomeLoading />,
});

type User = {
  id: string;
  role: "CLIENT" | "ADMIN";
};

function HomeLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] text-[var(--text-primary)]">
      <div className="flex flex-col items-center">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-[20px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-md)]">
          <div className="flex flex-col gap-1">
            <span className="h-[3px] w-7 animate-pulse rounded-full bg-[var(--accent)]" />
            <span className="h-[3px] w-7 animate-pulse rounded-full bg-[var(--accent-hover)]" />
            <span className="h-[3px] w-7 animate-pulse rounded-full bg-[var(--accent-active)]" />
          </div>
        </div>

        <p className="mt-5 text-[11px] font-semibold tracking-[0.3em]">NEXUS</p>

        <p className="mt-3 text-xs text-[var(--text-muted)]">
          Getting things ready
        </p>
      </div>
    </main>
  );
}

export default function Home() {
  const [authenticated, setAuthenticated] = React.useState<boolean | null>(
    null,
  );

  React.useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      const token =
        localStorage.getItem("nexus_token") ||
        sessionStorage.getItem("nexus_token");

      if (!token) {
        if (!cancelled) setAuthenticated(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (!response.ok) {
          localStorage.removeItem("nexus_token");
          localStorage.removeItem("nexus_user");
          sessionStorage.removeItem("nexus_token");
          sessionStorage.removeItem("nexus_user");

          if (!cancelled) setAuthenticated(false);
          return;
        }

        const data: { user?: User } = await response.json();

        if (!data.user || !["CLIENT", "ADMIN"].includes(data.user.role)) {
          localStorage.removeItem("nexus_token");
          localStorage.removeItem("nexus_user");
          sessionStorage.removeItem("nexus_token");
          sessionStorage.removeItem("nexus_user");

          if (!cancelled) setAuthenticated(false);
          return;
        }

        const storage = localStorage.getItem("nexus_token")
          ? localStorage
          : sessionStorage;

        storage.setItem("nexus_user", JSON.stringify(data.user));

        if (!cancelled) setAuthenticated(true);
      } catch {
        // If the backend is unavailable, show the public homepage.
        if (!cancelled) setAuthenticated(false);
      }
    }

    checkSession();

    return () => {
      cancelled = true;
    };
  }, []);

  if (authenticated === null) {
    return <HomeLoading />;
  }

  if (authenticated) {
    return <HomePage />;
  }

  return <DefaultHome />;
}
