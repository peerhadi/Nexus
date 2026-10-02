"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";
import { useAlert } from "@/lib/alert";
import { API_URL } from "@/lib/api";

export default function LoginForm() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const canLogin = email.includes("@") && password.length > 0;

  const handleLogin = async () => {
    if (!canLogin || loading) return;

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Invalid email or password");
      }

      const storage = remember ? localStorage : sessionStorage;

      storage.setItem("nexus_token", data.token);
      storage.setItem("nexus_user", JSON.stringify(data.user));

      showAlert(
        "success",
        "Welcome back",
        "You've been successfully signed in.",
      );

      router.push("/dashboard");
    } catch (error) {
      showAlert(
        "error",
        "Login failed",
        error instanceof Error ? error.message : "Unable to log in.",
      );

      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-black/[0.07] bg-white/80 shadow-[0_30px_100px_rgba(0,0,0,0.08)] backdrop-blur-2xl">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,#ff00cc,#00e5ff,#a8ff00,#ffe600,#ff4d00,#ff00cc)] bg-[length:200%_100%] animate-[gradient_5s_linear_infinite]" />

      <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-cyan-300/10 blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-fuchsia-300/10 blur-3xl animate-[pulse_5s_ease-in-out_infinite]" />

      <div className="relative p-7 sm:p-9">
        <div className="mb-8 flex w-full flex-col items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white shadow-[0_0_30px_rgba(0,229,255,0.12)]">
            <LockKeyhole size={20} />
          </div>

          <div className="text-[30px]">Log In</div>
        </div>

        <div className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-[10px] font-semibold text-black/55">
              Email address
            </span>

            <div className="group relative">
              <Mail
                size={15}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/25 transition-colors group-focus-within:text-black/50"
              />

              <input
                autoFocus
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    void handleLogin();
                  }
                }}
                placeholder="you@example.com"
                className="h-13 w-full rounded-2xl border border-black/[0.09] bg-[#fafaf9] pl-11 pr-4 text-[12px] outline-none transition-all duration-300 placeholder:text-black/20 focus:border-black/20 focus:bg-white focus:shadow-[0_0_0_5px_rgba(0,229,255,0.06),0_10px_30px_rgba(0,0,0,0.04)]"
              />

              <div className="pointer-events-none absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-[linear-gradient(90deg,#ff00cc,#00e5ff,#a8ff00)] transition-all duration-500 group-focus-within:w-[92%]" />
            </div>
          </label>

          <label className="block">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-black/55">
                Password
              </span>

              <button
                type="button"
                className="text-[9px] font-medium text-black/35 transition hover:text-black"
              >
                Forgot password?
              </button>
            </div>

            <div className="group relative">
              <LockKeyhole
                size={15}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/25 transition-colors group-focus-within:text-black/50"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    void handleLogin();
                  }
                }}
                placeholder="Your password"
                className="h-13 w-full rounded-2xl border border-black/[0.09] bg-[#fafaf9] pl-11 pr-12 text-[12px] outline-none transition-all duration-300 placeholder:text-black/20 focus:border-black/20 focus:bg-white focus:shadow-[0_0_0_5px_rgba(255,0,204,0.05),0_10px_30px_rgba(0,0,0,0.04)]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/25 transition hover:text-black"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>

              <div className="pointer-events-none absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-[linear-gradient(90deg,#00e5ff,#7c3aed,#ff00cc)] transition-all duration-500 group-focus-within:w-[92%]" />
            </div>
          </label>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setRemember(!remember)}
            className="flex items-center gap-2 text-[9px] text-black/40 transition hover:text-black"
          >
            <span
              className={[
                "flex h-4 w-4 items-center justify-center rounded-md border transition-all duration-200",
                remember
                  ? "border-black bg-black text-white"
                  : "border-black/10 bg-white",
              ].join(" ")}
            >
              {remember && <Sparkles size={9} />}
            </span>
            Remember me
          </button>
        </div>

        <button
          type="button"
          onClick={() => void handleLogin()}
          disabled={!canLogin || loading}
          className={[
            "group relative mt-7 flex h-12 w-full items-center justify-center gap-3 overflow-hidden rounded-2xl text-[11px] font-semibold text-white transition-all duration-300",
            !canLogin || loading
              ? "cursor-not-allowed bg-black/20"
              : "bg-black hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.18)]",
          ].join(" ")}
        >
          <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,#00e5ff,#ff00cc,#a8ff00,transparent)] opacity-50 transition-transform duration-1000 group-hover:translate-x-full" />

          {loading ? (
            <>
              <span className="relative h-4 w-4 animate-spin rounded-full border-2 border-white/25 border-t-white" />
              <span className="relative">Entering Nexus...</span>
            </>
          ) : (
            <>
              <span className="relative">Enter Nexus</span>

              <ArrowRight
                size={14}
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              />
            </>
          )}
        </button>

        <div className="my-7 flex items-center gap-3">
          <div className="h-px flex-1 bg-black/[0.06]" />

          <span className="text-[8px] font-medium uppercase tracking-[0.15em] text-black/25">
            or
          </span>

          <div className="h-px flex-1 bg-black/[0.06]" />
        </div>

        <a
          href="/signup"
          className="group flex h-11 w-full items-center justify-center rounded-2xl border border-black/[0.08] bg-white text-[10px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-black/15 hover:bg-[#fafaf9] hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
        >
          New to Nexus? Create an account
        </a>
      </div>
    </div>
  );
}
