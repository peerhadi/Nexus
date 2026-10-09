"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";

type AuthStatus = "checking" | "authorized" | "unauthorized";

type AuthResponse = {
  user?: {
    id: string;
    role: "CLIENT" | "ADMIN";
  };
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = React.useState<AuthStatus>("checking");

  React.useEffect(() => {
    let cancelled = false;

    async function verifyClient() {
      setStatus("checking");

      const token =
        localStorage.getItem("nexus_token") ||
        sessionStorage.getItem("nexus_token");

      if (!token) {
        if (cancelled) return;

        setStatus("unauthorized");
        router.replace(`/login?next=${encodeURIComponent(pathname)}`);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
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

          if (cancelled) return;

          setStatus("unauthorized");
          router.replace("/login");
          return;
        }

        const data: AuthResponse = await response.json();

        if (!data.user || !["CLIENT", "ADMIN"].includes(data.user.role)) {
          localStorage.removeItem("nexus_token");
          localStorage.removeItem("nexus_user");
          sessionStorage.removeItem("nexus_token");
          sessionStorage.removeItem("nexus_user");

          if (cancelled) return;

          setStatus("unauthorized");
          router.replace("/login");
          return;
        }

        if (cancelled) return;

        localStorage.setItem("nexus_user", JSON.stringify(data.user));

        if (data.user.role === "ADMIN") {
          setStatus("unauthorized");
          router.replace("/admin/settings");
          return;
        }

        setStatus("authorized");
      } catch {
        if (cancelled) return;

        setStatus("unauthorized");
      }
    }

    verifyClient();

    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  if (status !== "authorized") {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--background)]">
        <div className="absolute left-[15%] top-[20%] h-72 w-72 rounded-full bg-[var(--accent-soft-strong)] blur-3xl" />
        <div className="absolute bottom-[10%] right-[15%] h-80 w-80 rounded-full bg-[var(--accent-soft)] blur-3xl" />

        <div className="relative flex flex-col items-center">
          <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-[20px] border border-[var(--card-border)] bg-[var(--surface)] shadow-[var(--shadow-lg)]">
            <div className="absolute inset-2 rounded-[14px] bg-[var(--accent)] opacity-15" />
            <div className="relative flex flex-col gap-[4px]">
              <span className="h-[3px] w-7 rounded-full bg-[var(--accent)]" />
              <span className="ml-2 h-[3px] w-5 rounded-full bg-[var(--accent)]" />
              <span className="h-[3px] w-7 rounded-full bg-[var(--accent)]" />
            </div>
          </div>

          <p className="text-[12px] font-black tracking-[0.25em] text-[var(--text-secondary)]">
            NEXUS
          </p>

          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Verifying account access
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
