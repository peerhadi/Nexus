"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

import ProgressBar, { Step } from "./progress-bar";
import EmailStep from "./email-step";
import IdentityStep from "./identity-step";
import LocationStep from "./location-step";
import ThemeStep from "./theme-step";
import FinishStep from "./finish-step";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export default function SignupForm() {
  const router = useRouter();

  const [step, setStep] = useState<Step>(0);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState("neon");

  const [finishing, setFinishing] = useState(false);
  const [error, setError] = useState("");

  const canContinue = useMemo(() => {
    if (step === 0) return email.includes("@");

    if (step === 1) {
      return name.trim().length >= 2 && password.length >= 6;
    }

    if (step === 2) {
      return address.trim().length >= 3;
    }

    if (step === 3) {
      return Boolean(theme);
    }

    return true;
  }, [step, email, name, password, address, theme]);

  const signup = async () => {
    setError("");
    setFinishing(true);

    try {
      const signupResponse = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const signupData = await signupResponse.json();

      if (!signupResponse.ok) {
        throw new Error(signupData.error ?? "Failed to create account");
      }

      const loginResponse = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData.error ?? "Account created, but login failed");
      }

      localStorage.setItem("nexus_token", loginData.token);
      localStorage.setItem("nexus_user", JSON.stringify(loginData.user));

      router.push("/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
      setFinishing(false);
    }
  };

  const next = () => {
    if (!canContinue || finishing) return;

    if (step < 4) {
      setStep((current) => (current + 1) as Step);
      return;
    }

    void signup();
  };

  const back = () => {
    if (finishing) return;

    if (step > 0) {
      setStep((current) => (current - 1) as Step);
    }
  };

  return (
    <>
      <div className="mb-16 px-8">
        <ProgressBar step={step} />
      </div>

      <div className="relative overflow-hidden rounded-[30px] border border-black/[0.07] bg-white/80 shadow-[0_30px_100px_rgba(0,0,0,0.08)] backdrop-blur-2xl">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,#ff00cc,#00e5ff,#a8ff00,#ffe600,#ff4d00,#ff00cc)] bg-[length:200%_100%] animate-[gradient_5s_linear_infinite]" />

        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-300/10 blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />

        <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-fuchsia-300/10 blur-3xl animate-[pulse_5s_ease-in-out_infinite]" />

        <div className="relative p-7 sm:p-10">
          {step === 0 && (
            <EmailStep email={email} setEmail={setEmail} next={next} />
          )}

          {step === 1 && (
            <IdentityStep
              name={name}
              setName={setName}
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          )}

          {step === 2 && (
            <LocationStep address={address} setAddress={setAddress} />
          )}

          {step === 3 && <ThemeStep theme={theme} setTheme={setTheme} />}

          {step === 4 && <FinishStep email={email} name={name} theme={theme} />}

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-600">
              {error}
            </div>
          )}

          <div className="mt-10 flex items-center justify-between border-t border-black/[0.06] pt-6">
            <button
              type="button"
              onClick={back}
              disabled={step === 0 || finishing}
              className={[
                "flex items-center gap-2 rounded-xl px-3 py-2.5 text-[10px] font-semibold transition-all",
                step === 0
                  ? "pointer-events-none opacity-0"
                  : "text-black/45 hover:bg-black/[0.04] hover:text-black",
              ].join(" ")}
            >
              <ArrowLeft size={13} />
              Back
            </button>

            <button
              type="button"
              onClick={next}
              disabled={!canContinue || finishing}
              className={[
                "group relative flex h-11 items-center gap-3 overflow-hidden rounded-xl px-5 text-[11px] font-semibold text-white transition-all duration-300",
                !canContinue || finishing
                  ? "cursor-not-allowed bg-black/20"
                  : "bg-black hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.16)]",
              ].join(" ")}
            >
              <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,#00e5ff,#ff00cc,transparent)] opacity-40 transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative">
                {finishing
                  ? "Creating..."
                  : step === 4
                    ? "Enter Nexus"
                    : "Continue"}
              </span>

              {step === 4 ? (
                <Sparkles size={14} className="relative" />
              ) : (
                <ArrowRight
                  size={14}
                  className="relative transition-transform duration-300 group-hover:translate-x-1"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
