"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import AmbientBackground from "@/components/user/dashboard/ambient-background";
import Sidebar from "@/components/user/dashboard/sidebar";
import TopBar from "@/components/user/dashboard/top-bar";

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
          router.replace("/admin/dashboard");
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

  return (
    <div className="min-h-screen overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      <AmbientBackground />

      <Sidebar />

      <div className="relative min-h-screen lg:pl-[235px]">
        <TopBar />

        {children}
      </div>
    </div>
  );
}
