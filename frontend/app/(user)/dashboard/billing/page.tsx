"use client";

import {
  Check,
  CreditCard,
  Download,
  FileText,
  Sparkles,
  Zap,
} from "lucide-react";

const features = [
  "Unlimited Nexus projects",
  "Advanced analytics",
  "Nexus AI access",
  "Priority processing",
  "API access",
];

const invoices = [
  {
    date: "Oct 01, 2026",
    amount: "$0.00",
    status: "Paid",
  },
  {
    date: "Sep 01, 2026",
    amount: "$0.00",
    status: "Paid",
  },
  {
    date: "Aug 01, 2026",
    amount: "$0.00",
    status: "Paid",
  },
];

export default function BillingPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
            <CreditCard size={12} />
            Billing
          </div>

          <h1 className="mt-2 text-4xl font-black tracking-[-0.05em] text-slate-800">
            Plans & billing
          </h1>

          <p className="mt-2 max-w-xl text-[11px] font-medium leading-5 text-slate-400">
            Manage your Nexus plan, payment methods, and billing history.
          </p>
        </div>

        {/* Current plan */}
        <section className="relative overflow-hidden rounded-[26px] border border-black/[0.05] bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.035)]">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-200/20 blur-3xl" />
          <div className="absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-violet-200/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-white shadow-[0_8px_25px_rgba(34,211,238,0.2)]">
                <Sparkles size={20} />
              </div>

              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-400">
                  Current plan
                </div>

                <div className="mt-1 text-xl font-black tracking-tight text-slate-800">
                  Nexus Free
                </div>

                <div className="mt-1 text-[9px] font-medium text-slate-400">
                  Your account is currently on the free plan.
                </div>
              </div>
            </div>

            <button
              type="button"
              className="rounded-xl bg-slate-800 px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.12em] text-white hover:bg-cyan-500"
            >
              Upgrade plan
            </button>
          </div>
        </section>

        {/* Plans */}
        <section>
          <div className="mb-4">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
              Plans
            </div>

            <h2 className="mt-1 text-xl font-black tracking-tight text-slate-800">
              Choose your plan
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Free */}
            <div className="rounded-[24px] border border-black/[0.05] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.025)]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] font-black text-slate-700">
                    Free
                  </div>

                  <div className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-800">
                    $0
                    <span className="text-[10px] font-bold text-slate-300">
                      {" "}
                      / month
                    </span>
                  </div>
                </div>

                <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.12em] text-emerald-500">
                  Current
                </div>
              </div>

              <div className="my-6 h-px bg-black/[0.05]" />

              <div className="space-y-3">
                {features.slice(0, 3).map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2.5 text-[9px] font-medium text-slate-500"
                  >
                    <Check size={13} className="text-emerald-400" />
                    {feature}
                  </div>
                ))}
              </div>

              <button
                type="button"
                disabled
                className="mt-7 w-full rounded-xl border border-black/[0.06] bg-slate-50 py-2.5 text-[9px] font-black uppercase tracking-[0.12em] text-slate-300"
              >
                Current plan
              </button>
            </div>

            {/* Pro */}
            <div className="relative overflow-hidden rounded-[24px] border border-cyan-200 bg-gradient-to-br from-white via-white to-cyan-50/50 p-6 shadow-[0_12px_40px_rgba(34,211,238,0.08)]">
              <div className="absolute right-0 top-0 rounded-bl-xl bg-cyan-400 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.12em] text-white">
                Recommended
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-black text-slate-700">
                    Pro
                    <Zap size={12} className="text-cyan-400" />
                  </div>

                  <div className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-800">
                    $12
                    <span className="text-[10px] font-bold text-slate-300">
                      {" "}
                      / month
                    </span>
                  </div>
                </div>
              </div>

              <div className="my-6 h-px bg-cyan-100" />

              <div className="space-y-3">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2.5 text-[9px] font-medium text-slate-500"
                  >
                    <Check size={13} className="text-cyan-400" />
                    {feature}
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="mt-7 w-full rounded-xl bg-slate-800 py-2.5 text-[9px] font-black uppercase tracking-[0.12em] text-white hover:bg-cyan-500"
              >
                Upgrade to Pro
              </button>
            </div>
          </div>
        </section>

        {/* Payment */}
        <section className="overflow-hidden rounded-[24px] border border-black/[0.05] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.025)]">
          <div className="border-b border-black/[0.05] p-5">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
              Payment
            </div>

            <h2 className="mt-1 text-xl font-black tracking-tight text-slate-800">
              Payment method
            </h2>
          </div>

          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/[0.035] text-slate-400">
              <CreditCard size={17} />
            </div>

            <div className="flex-1">
              <div className="text-[10px] font-black text-slate-700">
                No payment method
              </div>

              <div className="mt-1 text-[9px] font-medium text-slate-400">
                Add a payment method when you upgrade your plan.
              </div>
            </div>

            <button
              type="button"
              className="rounded-xl border border-black/[0.06] bg-white px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.12em] text-slate-500 hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-500"
            >
              Add method
            </button>
          </div>
        </section>

        {/* Invoices */}
        <section className="overflow-hidden rounded-[24px] border border-black/[0.05] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.025)]">
          <div className="border-b border-black/[0.05] p-5">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
              History
            </div>

            <h2 className="mt-1 text-xl font-black tracking-tight text-slate-800">
              Invoices
            </h2>
          </div>

          <div className="divide-y divide-black/[0.05]">
            {invoices.map((invoice) => (
              <div key={invoice.date} className="flex items-center gap-4 p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.035] text-slate-400">
                  <FileText size={15} />
                </div>

                <div className="flex-1">
                  <div className="text-[10px] font-black text-slate-700">
                    Nexus subscription
                  </div>

                  <div className="mt-1 text-[8px] font-medium text-slate-400">
                    {invoice.date}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-black text-slate-700">
                    {invoice.amount}
                  </div>

                  <div className="mt-1 text-[8px] font-black uppercase tracking-[0.1em] text-emerald-400">
                    {invoice.status}
                  </div>
                </div>

                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 hover:bg-cyan-50 hover:text-cyan-500"
                >
                  <Download size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
