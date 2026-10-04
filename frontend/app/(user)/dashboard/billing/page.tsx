"use client";

import {
  ArrowUpRight,
  Building2,
  Check,
  CreditCard,
  Download,
  FileText,
  ShieldCheck,
  Smartphone,
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
    date: "01 Oct, 2026",
    amount: "₹999.00",
    status: "Paid",
  },
  {
    date: "01 Sep, 2026",
    amount: "₹999.00",
    status: "Paid",
  },
  {
    date: "01 Aug, 2026",
    amount: "₹999.00",
    status: "Paid",
  },
];

const paymentMethods = [
  {
    icon: Smartphone,
    title: "UPI",
    description: "Pay directly using a supported UPI app.",
  },
  {
    icon: CreditCard,
    title: "Debit card",
    description: "Pay directly with your debit card.",
  },
  {
    icon: Building2,
    title: "Bank transfer",
    description: "Make a direct transfer from your bank account.",
  },
];

export default function BillingPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
            <CreditCard size={12} />
            Billing
          </div>

          <h1 className="mt-2 text-4xl font-black tracking-[-0.05em] text-[var(--text-primary)]">
            Plans & billing
          </h1>

          <p className="mt-2 max-w-xl text-[11px] font-medium leading-5 text-[var(--text-muted)]">
            Manage your Nexus plan, payments, invoices, and billing details.
          </p>
        </div>

        {/* Current plan */}
        <section className="relative overflow-hidden rounded-[26px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-[var(--shadow-lg)]">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--accent-soft)] opacity-60 blur-3xl" />
          <div className="absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-[var(--accent-soft-strong)] opacity-40 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-[var(--text-inverse)] shadow-[var(--shadow-md)]"
                style={{ background: "var(--gradient-cyan-violet)" }}
              >
                <Sparkles size={20} />
              </div>

              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--accent)]">
                  Current plan
                </div>

                <div className="mt-1 text-xl font-black tracking-tight text-[var(--text-primary)]">
                  Nexus Pro
                </div>

                <div className="mt-1 text-[9px] font-medium text-[var(--text-muted)]">
                  Your Nexus subscription is active.
                </div>
              </div>
            </div>

            <button
              type="button"
              className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-[9px]! font-black uppercase tracking-[0.12em] text-[var(--text-inverse)] transition hover:bg-[var(--accent-hover)]"
            >
              Manage plan
            </button>
          </div>
        </section>

        {/* Plans */}
        <section>
          <div className="mb-4">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-disabled)]">
              Plans
            </div>

            <h2 className="mt-1 text-xl font-black tracking-tight text-[var(--text-primary)]">
              Choose your Nexus plan
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Pro */}
            <div
              style={{ background: "var(--surface)" }}
              className="relative overflow-hidden rounded-[24px] border border-cyan-200 bg-gradient-to-br from-white via-white to-cyan-50/50 p-6 shadow-[0_12px_40px_rgba(34,211,238,0.08)]"
            >
              <div className="absolute right-0 top-0 rounded-bl-xl bg-cyan-400 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.12em] text-white">
                Active
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-black text-[var(--text-secondary)]">
                    Nexus Pro
                    <Zap size={12} className="text-cyan-400" />
                  </div>

                  <div className="mt-3 text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
                    ₹999
                    <span className="text-[10px] font-bold text-[var(--text-disabled)]">
                      {" "}
                      / month
                    </span>
                  </div>

                  <div className="mt-1 text-[8px] font-medium text-[var(--text-muted)]">
                    Billed in Indian Rupees (INR).
                  </div>
                </div>
              </div>

              <div className="my-6 h-px bg-cyan-100" />

              <div className="space-y-3">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2.5 text-[9px] font-medium text-[var(--text-tertiary)]"
                  >
                    <Check size={13} className="text-cyan-400" />
                    {feature}
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="mt-7 w-full rounded-xl bg-[var(--accent)] py-2.5 text-[9px]! font-black uppercase tracking-[0.12em] text-white transition hover:bg-cyan-500"
              >
                Manage subscription
              </button>
            </div>

            {/* Enterprise */}
            <div className="relative overflow-hidden rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-[0_10px_35px_rgba(0,0,0,0.025)]">
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-200/20 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-2 text-[11px] font-black text-[var(--text-secondary)]">
                  Nexus Enterprise
                  <Building2 size={13} className="text-violet-400" />
                </div>

                <div className="mt-3 text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
                  Custom
                </div>

                <div className="mt-1 max-w-xs text-[8px] font-medium leading-4 text-[var(--text-muted)]">
                  Tailored solutions, dedicated support, custom integrations,
                  and project-specific infrastructure.
                </div>
              </div>

              <div className="my-6 h-px bg-[var(--surface-hover)]" />

              <div className="space-y-3">
                {[
                  "Everything in Nexus Pro",
                  "Dedicated project support",
                  "Custom integrations",
                  "Priority infrastructure",
                  "Business-focused solutions",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2.5 text-[9px]! font-medium text-[var(--text-tertiary)]"
                  >
                    <Check size={13} className="text-violet-400" />
                    {feature}
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="mt-7 w-full rounded-xl border border-[var(--border-subtle)] bg-slate-50 py-2.5 text-[9px] font-black uppercase tracking-[0.12em] text-[var(--text-tertiary)] transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-500"
              >
                Contact Nexus
              </button>
            </div>
          </div>
        </section>

        {/* Payment methods */}
        <section className="overflow-hidden rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface)] shadow-[0_10px_35px_rgba(0,0,0,0.025)]">
          <div className="border-b border-[var(--border-subtle)] p-5">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-disabled)]">
              Payment
            </div>

            <h2 className="mt-1 text-xl font-black tracking-tight text-[var(--text-primary)]">
              Direct payment methods
            </h2>

            <p className="mt-1 max-w-xl text-[9px]! font-medium leading-4 text-[var(--text-muted)]">
              Pay directly for your Nexus subscription without loans, financing,
              EMI, or buy-now-pay-later services.
            </p>
          </div>

          <div className="divide-y divide-[var(--border-subtle)]">
            {paymentMethods.map((method) => {
              const Icon = method.icon;

              return (
                <div
                  key={method.title}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-hover)] text-[var(--text-muted)]">
                    <Icon size={17} />
                  </div>

                  <div className="flex-1">
                    <div className="text-[10px] font-black text-[var(--text-secondary)]">
                      {method.title}
                    </div>

                    <div className="mt-1 text-[9px] font-medium text-[var(--text-muted)]">
                      {method.description}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-4 py-2.5 text-[9px]! font-black uppercase tracking-[0.12em] text-[var(--text-tertiary)] transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-500"
                  >
                    Select
                    <ArrowUpRight size={11} />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="border-t border-[var(--border-subtle)] bg-[var(--background)] px-5 py-4">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={15}
                className="mt-0.5 shrink-0 text-emerald-400"
              />

              <div>
                <div className="text-[9px] font-black text-[var(--text-secondary)]">
                  Direct payment
                </div>

                <div className="mt-1 text-[8px] font-medium leading-4 text-[var(--text-muted)]">
                  Nexus does not offer or require loans, EMI financing,
                  interest-based financing, or buy-now-pay-later services for
                  these payments.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Invoices */}
        <section className="overflow-hidden rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface)] shadow-[0_10px_35px_rgba(0,0,0,0.025)]">
          <div className="border-b border-[var(--border-subtle)] p-5">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-disabled)]">
              Billing history
            </div>

            <h2 className="mt-1 text-xl font-black tracking-tight text-[var(--text-primary)]">
              Invoices
            </h2>

            <p className="mt-1 text-[9px] font-medium text-[var(--text-muted)]">
              Your Nexus subscription invoices and payment records.
            </p>
          </div>

          <div className="divide-y divide-[var(--border-subtle)]">
            {invoices.map((invoice) => (
              <div key={invoice.date} className="flex items-center gap-4 p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--surface-hover)] text-[var(--text-muted)]">
                  <FileText size={15} />
                </div>

                <div className="flex-1">
                  <div className="text-[10px] font-black text-[var(--text-secondary)]">
                    Nexus Pro subscription
                  </div>

                  <div className="mt-1 text-[8px] font-medium text-[var(--text-muted)]">
                    {invoice.date}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-black text-[var(--text-secondary)]">
                    {invoice.amount}
                  </div>

                  <div className="mt-1 text-[8px] font-black uppercase tracking-[0.1em] text-emerald-400">
                    {invoice.status}
                  </div>
                </div>

                <button
                  type="button"
                  aria-label={`Download invoice for ${invoice.date}`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-disabled)] transition hover:bg-cyan-50 hover:text-cyan-500"
                >
                  <Download size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Billing note */}
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] px-5 py-4 text-[8px] font-medium leading-4 text-[var(--text-muted)]">
          Nexus billing is displayed in Indian Rupees (INR). Applicable taxes,
          including GST where required, may be added to eligible purchases.
          Final pricing is shown before payment.
        </div>
      </div>
    </main>
  );
}
