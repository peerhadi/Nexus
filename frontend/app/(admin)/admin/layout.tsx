"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./components/sidebar";
import { API_URL } from "@/lib/api";

type AuthStatus = "checking" | "authorized" | "unauthorized";

type AuthResponse = {
  user?: {
    id: string;
    role: "CLIENT" | "ADMIN";
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = React.useState<AuthStatus>("checking");

  React.useEffect(() => {
    let cancelled = false;

    async function verifyAdmin() {
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

        if (data.user.role !== "ADMIN") {
          setStatus("unauthorized");
          router.replace("/dashboard");
          return;
        }

        setStatus("authorized");
      } catch {
        if (cancelled) return;
        setStatus("unauthorized");
      }
    }

    verifyAdmin();

    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="min-w-0 w-full lg:ml-[250px]">{children}</main>
    </div>
  );
}
