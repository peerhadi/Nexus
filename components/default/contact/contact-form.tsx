"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  FileText,
  Globe2,
  Mail,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import ContactField from "./contact-field";
import { budgets, projectTypes } from "./contact-types";

export default function ContactForm() {
  const [step, setStep] = useState(0);

  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState("");
  const [website, setWebsite] = useState("");

  const canContinue = useMemo(() => {
    if (step === 0) return !!type;
    if (step === 1) return name.trim().length >= 2 && email.includes("@");
    if (step === 2) return message.trim().length >= 10;
    if (step === 3) return !!budget;

    return true;
  }, [step, type, name, email, message, budget]);

  const next = () => {
    if (!canContinue) return;

    if (step < 3) {
      setStep((current) => current + 1);
    } else {
      window.dispatchEvent(new Event("contact-submitted"));
    }
  };

  const back = () => {
    if (step > 0) {
      setStep((current) => current - 1);
    }
  };

  return (
    <section className="w-full">
      <div className="overflow-hidden rounded-[30px] border border-black/[0.07] bg-white/90 shadow-[0_30px_100px_rgba(0,0,0,0.09)] backdrop-blur-2xl">
        <div className="h-1 w-full overflow-hidden">
          <div className="h-full w-full animate-[rainbow_4s_linear_infinite] bg-[linear-gradient(90deg,#ff0080,#ff8a00,#ffe600,#00e676,#00c8ff,#7c3aed,#ff0080)] bg-[length:300%_100%]" />
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-7 lg:hidden">
            <div className="mb-3 text-[9px] font-black uppercase tracking-[0.22em] text-neutral-400">
              Start a project
            </div>

            <h1 className="text-4xl font-black leading-[0.95] tracking-[-0.055em]">
              Tell us what
              <br />
              you're{" "}
              <span className="bg-[linear-gradient(90deg,#ff0080,#7c3aed,#00b8ff)] bg-clip-text text-transparent">
                thinking.
              </span>
            </h1>
          </div>

          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-neutral-400">
                Step {step + 1} of 4
              </span>

              <span className="text-[9px] font-bold text-neutral-400">
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

                <p className="text-xs leading-5 text-neutral-400">
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
                      onClick={() => setType(item.id)}
                      className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                        selected
                          ? "border-[#06b6d44d] bg-[#06b6d414] shadow-[0_12px_30px_rgba(0,0,0,0.15)]"
                          : "border-black/[0.07] bg-white hover:-translate-y-0.5 hover:border-black/20 hover:shadow-lg"
                      }`}
                    >
                      <div
                        className={`mb-4 flex h-9 w-9 items-center justify-center rounded-xl ${
                          selected ? "bg-white/15" : "bg-neutral-100"
                        }`}
                      >
                        <Icon size={17} />
                      </div>

                      <div className="text-xs font-black">{item.title}</div>

                      <div
                        className={`mt-1 text-[10px] leading-4 ${
                          selected ? "text-black/55" : "text-neutral-400"
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

                <p className="text-xs leading-5 text-neutral-400">
                  Just the basics. No corporate interrogation.
                </p>
              </div>

              <div className="space-y-4">
                <ContactField
                  label="Your name"
                  icon={<MessageSquare size={14} />}
                  value={name}
                  onChange={setName}
                  placeholder="John Smith"
                />

                <ContactField
                  label="Email"
                  icon={<Mail size={14} />}
                  value={email}
                  onChange={setEmail}
                  placeholder="you@example.com"
                  type="email"
                />

                <ContactField
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

                <p className="text-xs leading-5 text-neutral-400">
                  Don't worry about making it sound professional. Explain it
                  like you're talking to us.
                </p>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-neutral-500">
                  <FileText size={13} />
                  Your idea
                </label>

                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="I currently do this manually every day..."
                  rows={8}
                  className="w-full resize-none rounded-2xl border border-black/[0.08] bg-neutral-50/70 px-4 py-4 text-sm font-medium outline-none transition-all placeholder:text-neutral-300 focus:border-black/30 focus:bg-white focus:shadow-[0_0_0_4px_rgba(124,58,237,0.06)]"
                />

                <div className="mt-2 flex justify-between text-[9px] font-bold text-neutral-300">
                  <span>More detail = better context</span>
                  <span>{message.length} characters</span>
                </div>
              </div>

              <div className="mt-5">
                <ContactField
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
                  What's the rough budget?
                </div>

                <p className="text-xs leading-5 text-neutral-400">
                  This isn't a commitment. It just helps us understand the shape
                  of the project.
                </p>
              </div>

              <div className="space-y-2.5">
                {budgets.map((item) => {
                  const selected = budget === item;

                  return (
                    <button
                      key={item}
                      onClick={() => setBudget(item)}
                      className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                        selected
                          ? "border-[#06b6d44d] bg-[#06b6d414] shadow-lg"
                          : "border-black/[0.07] bg-white hover:-translate-y-0.5 hover:border-black/20 hover:shadow-md"
                      }`}
                    >
                      <span className="text-xs font-black">{item}</span>

                      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-black/10">
                        {selected && <Check size={12} />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-2xl bg-neutral-50 p-4">
                <Sparkles
                  size={15}
                  className="mt-0.5 shrink-0 text-violet-500"
                />

                <p className="text-[10px] leading-5 text-neutral-400">
                  Don't know yet? That's completely fine. Choose
                  <span className="font-black text-neutral-700">
                    {" "}
                    Not sure yet
                  </span>{" "}
                  and we'll figure it out together.
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-black/[0.06] pt-5">
            <button
              onClick={back}
              disabled={step === 0}
              className={`flex h-11 items-center gap-2 rounded-xl px-4 text-[10px] font-black transition-all ${
                step === 0
                  ? "pointer-events-none opacity-0"
                  : "text-neutral-400 hover:bg-neutral-50 hover:text-black"
              }`}
            >
              <ArrowLeft size={14} />
              Back
            </button>

            <button
              onClick={next}
              disabled={!canContinue}
              className={`group relative flex h-11 min-w-[130px] items-center justify-center gap-2 overflow-hidden rounded-xl px-5 text-[10px] font-black transition-all ${
                canContinue
                  ? "bg-black text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl"
                  : "cursor-not-allowed bg-neutral-100 text-neutral-300"
              }`}
            >
              {canContinue && (
                <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
              )}

              <span className="relative">
                {step === 3 ? "Send request" : "Continue"}
              </span>

              {step === 3 ? (
                <Check size={14} className="relative" />
              ) : (
                <ArrowRight
                  size={14}
                  className="relative transition-transform group-hover:translate-x-1"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 text-[9px] font-bold text-neutral-400">
        <span className="flex h-4 w-4 items-center justify-center rounded-full border border-neutral-300 text-[8px]">
          ✓
        </span>
        Your information stays private.
      </div>
    </section>
  );
}
