"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  Globe2,
  Mail,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import BuildField from "./build-field";
import { budgets, projectTypes } from "./build-types";
import { useAlert } from "@/lib/alert";
import { API_URL } from "@/lib/api";

export default function BuildForm() {
  const [step, setStep] = useState(0);

  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [Gmail, setGmail] = useState("");
  const [GmailError, setGmailError] = useState("");
  const [GmailTouched, setGmailTouched] = useState(false);

  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState("");
  const [website, setWebsite] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { showAlert } = useAlert();

  const validateGmail = (value: string): string => {
    const normalized = value.trim();

    if (!normalized) {
      return "Company Gmail is required.";
    }

    const GmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;

    if (!GmailRegex.test(normalized)) {
      return "Please enter a valid Gmail address ending in @gmail.com.";
    }

    return "";
  };

  const handleGmailChange = (value: string) => {
    setGmail(value);

    if (GmailTouched) {
      setGmailError(validateGmail(value));
    }
  };

  const canContinue = useMemo(() => {
    if (step === 0) return !!type;

    if (step === 1) {
      return (
        name.trim().length >= 2 &&
        Gmail.trim().length > 0 &&
        validateGmail(Gmail) === ""
      );
    }

    if (step === 2) return message.trim().length >= 10;
    if (step === 3) return !!budget;

    return true;
  }, [step, type, name, Gmail, message, budget]);

  const submitRequest = async () => {
    if (submitting) return;

    // Final validation before submitting.
    const validationError = validateGmail(Gmail);
    setGmailTouched(true);
    setGmailError(validationError);

    if (validationError) {
      setStep(1);
      return;
    }

    if (name.trim().length < 2) {
      setStep(1);
      setError("Please enter your company name.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const token =
        localStorage.getItem("nexus_token") ??
        sessionStorage.getItem("nexus_token");

      if (!token) {
        throw new Error("Please sign in before sending a project request.");
      }

      const selectedProject = projectTypes.find((item) => item.id === type);

      const subject = selectedProject
        ? `${selectedProject.title} — ${budget}`
        : `New project request — ${budget}`;

      const fullMessage = [
        message.trim(),
        website.trim() ? `\n\nWebsite / link:\n${website.trim()}` : "",
        `\n\nProject type:\n${selectedProject?.title ?? type}`,
        `\nBudget:\n${budget}`,
      ].join("");

      const response = await fetch(`${API_URL}/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          email: Gmail.trim(),
          company: company.trim() || undefined,
          subject,
          message: fullMessage,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message ??
            data?.error ??
            "Something went wrong while sending your request.",
        );
      }

      setSubmitted(true);

      showAlert(
        "success",
        "Request sent",
        "Your project request has been successfully submitted.",
      );

      window.dispatchEvent(new Event("build-submitted"));
    } catch (err) {
      console.error("Failed to submit request:", err);

      showAlert(
        "error",
        "Request failed",
        err instanceof Error
          ? err.message
          : "Something went wrong while sending your request.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    if (submitting) return;

    setError("");

    if (step === 1) {
      setGmailTouched(true);

      const validationError = validateGmail(Gmail);
      setGmailError(validationError);

      if (name.trim().length < 2) {
        setError("Please enter a company name with at least 2 characters.");
        return;
      }

      if (validationError) return;
    } else if (!canContinue) {
      return;
    }

    if (step < 3) {
      setStep((current) => current + 1);
      return;
    }

    void submitRequest();
  };

  const back = () => {
    if (submitting) return;

    setError("");

    if (step > 0) {
      setStep((current) => current - 1);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(0);
    setType("");
    setName("");
    setGmail("");
    setGmailError("");
    setGmailTouched(false);
    setCompany("");
    setMessage("");
    setBudget("");
    setWebsite("");
    setError("");
  };

  if (submitted) {
    return (
      <section className="w-full">
        <div className="overflow-hidden rounded-[30px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_30px_100px_rgba(0,0,0,0.09)] backdrop-blur-2xl">
          <div className="h-1 w-full bg-[linear-gradient(90deg,#ff0080,#7c3aed,#00b8ff,#00c853)]" />

          <div className="flex min-h-[500px] flex-col items-center justify-center p-8 text-center sm:p-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--gradient-hero)] text-white shadow-xl">
              <Check size={28} />
            </div>

            <div className="mt-7 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Request received
            </div>

            <h1 className="mt-3 text-4xl font-black tracking-[-0.05em]">
              We&apos;re on it.
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-[var(--text-muted)]">
              Your project request has been sent to the Nexus team. We&apos;ll
              review everything and get back to you soon.
            </p>

            <button
              type="button"
              onClick={resetForm}
              className="mt-8 rounded-xl bg-[var(--accent)] px-5 py-3 text-[10px] font-black text-white transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Send another request
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-[9px] font-bold text-[var(--text-muted)]">
          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-neutral-300 text-[8px]">
            ✓
          </span>
          Your information stays private.
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="overflow-hidden rounded-[30px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_30px_100px_rgba(0,0,0,0.09)] backdrop-blur-2xl">
        <div className="h-1 w-full overflow-hidden">
          <div className="h-full w-full animate-[rainbow_4s_linear_infinite] bg-[linear-gradient(90deg,#ff0080,#ff8a00,#ffe600,#00e676,#00c8ff,#7c3aed,#ff0080)] bg-[length:300%_100%]" />
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-7 lg:hidden">
            <div className="mb-3 text-[9px] font-black uppercase tracking-[0.22em] text-[var(--text-muted)]">
              Start a project
            </div>

            <h1 className="text-4xl font-black leading-[0.95] tracking-[-0.055em]">
              Tell us what
              <br />
              you&apos;re{" "}
              <span className="bg-[linear-gradient(90deg,#ff0080,#7c3aed,#00b8ff)] bg-clip-text">
                thinking.
              </span>
            </h1>
          </div>

          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Step {step + 1} of 4
              </span>

              <span className="text-[9px] font-bold text-[var(--text-muted)]">
                {Math.round(((step + 1) / 4) * 100)}%
              </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#ff0080,#7c3aed,#00b8ff,#00c853)] transition-all duration-700 ease-out"
                style={{
                  width: `${((step + 1) / 4) * 100}%`,
                }}
              />
            </div>
          </div>

          {step === 0 && (
            <div className="animate-[slideIn_.45s_ease-out]">
              <div className="mb-5">
                <div className="mb-1 text-xl font-black tracking-tight">
                  What are we building?
                </div>

                <p className="text-xs leading-5 text-[var(--text-muted)]">
                  Pick the closest match. You can explain the rest later.
                </p>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2">
                {projectTypes.map((item) => {
                  const Icon = item.icon;
                  const selected = type === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setType(item.id)}
                      className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                        selected
                          ? "border-[#06b6d44d] bg-[#06b6d414] shadow-[0_12px_30px_rgba(0,0,0,0.15)]"
                          : "border-[var(--border)] bg-[var(--surface)] hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-lg"
                      }`}
                    >
                      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--surface)]/15">
                        <Icon size={17} />
                      </div>

                      <div className="text-xs font-black">{item.title}</div>

                      <div
                        className={`mt-1 text-[10px] leading-4 ${
                          selected
                            ? "text-[var(--text-secondary)]"
                            : "text-[var(--text-muted)]"
                        }`}
                      >
                        {item.description}
                      </div>

                      {selected && (
                        <div className="absolute right-3 top-3">
                          <Check size={14} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="animate-[slideIn_.45s_ease-out]">
              <div className="mb-6">
                <div className="mb-1 text-xl font-black tracking-tight">
                  Who are we talking to?
                </div>

                <p className="text-xs leading-5 text-[var(--text-muted)]">
                  Just the basics. No corporate interrogation.
                </p>
              </div>

              <div className="space-y-4">
                <BuildField
                  label="Company name"
                  icon={<MessageSquare size={14} />}
                  value={name}
                  onChange={(value) => {
                    setName(value);
                    setError("");
                  }}
                  placeholder="Prism Inc."
                />

                <div>
                  <BuildField
                    label="Company Gmail"
                    icon={<Mail size={14} />}
                    value={Gmail}
                    onChange={handleGmailChange}
                    placeholder="company@example.com"
                    type="Gmail"
                  />

                  {GmailError && GmailTouched && (
                    <p
                      className="mt-2 flex items-center gap-2 text-xs font-medium text-[var(--danger)]"
                      role="alert"
                    >
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[var(--danger)] text-[10px]">
                        !
                      </span>
                      {GmailError}
                    </p>
                  )}
                </div>

                <BuildField
                  label="Company / project"
                  icon={<Globe2 size={14} />}
                  value={company}
                  onChange={setCompany}
                  placeholder="Optional"
                  optional
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-[slideIn_.45s_ease-out]">
              <div className="mb-6">
                <div className="mb-1 text-xl font-black tracking-tight">
                  Tell us about it.
                </div>

                <p className="text-xs leading-5 text-[var(--text-muted)]">
                  Don&apos;t worry about making it sound professional. Explain
                  it like you&apos;re talking to us.
                </p>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
                  <FileText size={13} />
                  Your idea
                </label>

                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="I currently do this manually every day..."
                  rows={8}
                  className="w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--input)] px-4 py-4 text-sm font-medium outline-none transition-all placeholder:text-[var(--text-disabled)] focus:border-[var(--border-focus)] focus:bg-[var(--surface)] focus:shadow-[0_0_0_4px_rgba(124,58,237,0.06)]"
                />

                <div className="mt-2 flex justify-between text-[9px] font-bold text-[var(--text-disabled)]">
                  <span>More detail = better context</span>
                  <span>{message.length} characters</span>
                </div>
              </div>

              <div className="mt-5">
                <BuildField
                  label="Website / link"
                  icon={<Globe2 size={14} />}
                  value={website}
                  onChange={setWebsite}
                  placeholder="Optional"
                  optional
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-[slideIn_.45s_ease-out]">
              <div className="mb-6">
                <div className="mb-1 text-xl font-black tracking-tight">
                  What&apos;s the rough budget?
                </div>

                <p className="text-xs leading-5 text-[var(--text-muted)]">
                  This isn&apos;t a commitment. It just helps us understand the
                  shape of the project.
                </p>
              </div>

              <div className="space-y-2.5">
                {budgets.map((item) => {
                  const selected = budget === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setBudget(item)}
                      className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                        selected
                          ? "border-[#06b6d44d] bg-[#06b6d414] shadow-lg"
                          : "border-[var(--border)] bg-[var(--surface)] hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-md"
                      }`}
                    >
                      <span className="text-xs font-black">{item}</span>

                      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[var(--border)]">
                        {selected && <Check size={12} />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-2xl bg-[var(--input)] p-4">
                <Sparkles
                  size={15}
                  className="mt-0.5 shrink-0 text-violet-500"
                />

                <p className="text-[10px] leading-5 text-[var(--text-muted)]">
                  Don&apos;t know yet? That&apos;s completely fine. Choose{" "}
                  <span className="font-black text-[var(--text-secondary)]">
                    Not sure yet
                  </span>{" "}
                  and we&apos;ll figure it out together.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div
              className="mt-5 rounded-xl border border-[var(--danger)]/20 bg-[var(--danger-soft)] px-4 py-3 text-[10px] font-bold text-[var(--danger)]"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-5">
            <button
              type="button"
              onClick={back}
              disabled={step === 0 || submitting}
              className={`flex h-11 items-center gap-2 rounded-xl px-4 text-[10px] font-black transition-all ${
                step === 0
                  ? "pointer-events-none opacity-0"
                  : "text-[var(--text-muted)] hover:bg-[var(--input)] hover:text-[var(--text-primary)]"
              }`}
            >
              <ArrowLeft size={14} />
              Back
            </button>

            <button
              type="button"
              onClick={next}
              disabled={
                submitting ||
                (step !== 1 && !canContinue) ||
                (step === 1 && name.trim().length < 2)
              }
              className={`group relative flex h-11 min-w-[130px] items-center justify-center gap-2 overflow-hidden rounded-xl px-5 text-[10px] font-black transition-all ${
                !submitting &&
                ((step === 1 && name.trim().length >= 2) ||
                  (step !== 1 && canContinue))
                  ? "bg-[var(--accent)] text-[var(--accent-contrast)] shadow-lg hover:-translate-y-0.5 hover:shadow-xl"
                  : "cursor-not-allowed bg-neutral-100 text-[var(--text-disabled)]"
              }`}
            >
              {!submitting &&
                ((step === 1 && name.trim().length >= 2) ||
                  (step !== 1 && canContinue)) && (
                  <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
                )}

              <span className="relative">
                {submitting
                  ? "Sending..."
                  : step === 3
                    ? "Send request"
                    : "Continue"}
              </span>

              {!submitting &&
                (step === 3 ? (
                  <Check size={14} className="relative" />
                ) : (
                  <ArrowRight
                    size={14}
                    className="relative transition-transform group-hover:translate-x-1"
                  />
                ))}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 text-[9px] font-bold text-[var(--text-muted)]">
        <span className="flex h-4 w-4 items-center justify-center rounded-full border border-neutral-300 text-[8px]">
          ✓
        </span>
        Your information stays private.
      </div>
    </section>
  );
}
