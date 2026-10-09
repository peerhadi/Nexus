"use client";

import React from "react";
import dynamic from "next/dynamic";
import DefaultHome from "./Default";
import { API_URL } from "@/lib/api";

/*
 * ---------------------------------------------------------------------
 * The logged-in dashboard is a large, client-only tree that guests never
 * need, so it is code-split out of the initial homepage payload.
 * ---------------------------------------------------------------------
 */

const HomePage = dynamic(() => import("./LoggedIn"), { ssr: false });

type User = {
  id: string;
  role: "CLIENT" | "ADMIN";
};

export default function Home() {
  /*
   * The marketing home is rendered immediately (and server-side) so the
   * hero heading is present in the initial HTML. If a valid session is
   * found we swap in the dashboard afterwards.
   */
  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      const token =
        localStorage.getItem("nexus_token") ||
        sessionStorage.getItem("nexus_token");

      if (!token) {
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

          return;
        }

        const data: { user?: User } = await response.json();

        if (!data.user || !["CLIENT", "ADMIN"].includes(data.user.role)) {
          localStorage.removeItem("nexus_token");
          localStorage.removeItem("nexus_user");
          sessionStorage.removeItem("nexus_token");
          sessionStorage.removeItem("nexus_user");

          return;
        }

        localStorage.setItem("nexus_user", JSON.stringify(data.user));

        if (!cancelled) setAuthenticated(true);
      } catch {
        /* Stay on the marketing home when the session cannot be verified. */
      }
    }

    checkSession();

    return () => {
      cancelled = true;
    };
  }, []);

  if (authenticated) {
    return <HomePage />;
  }

  return <DefaultHome />;
}