import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Globe2,
  Code2,
  Workflow,
  Bot,
  Puzzle,
} from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Guide", href: "/guide" },
];

const services = [
  { label: "Websites", href: "/services/websites", icon: Globe2 },
  {
    label: "Web applications",
    href: "/services/web-applications",
    icon: Code2,
  },
  { label: "Automation", href: "/services/automation", icon: Workflow },
  { label: "AI systems", href: "/services/ai-systems", icon: Bot },
  { label: "Integrations", href: "/services/integrations", icon: Puzzle },
];

const resources = [
  { label: "Playground", href: "/playground" },
  { label: "Design Lab", href: "/design-lab" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/peerhadi/Nexus",
    icon: FaGithub,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nexus_.js",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nexus-made-3a7864442",
    icon: FaLinkedin,
  },
  {
    label: "X",
    href: "https://x.com/nexusmadeofc",
    icon: FaXTwitter,
  },
];

const linkClass =
  "w-fit rounded-sm text-sm leading-6 text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-secondary)]";

const headingClass =
  "mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]";

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-[var(--border)] bg-[var(--surface-secondary)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-48 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.09),transparent_70%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_1fr_0.9fr] lg:gap-12 lg:py-16">
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="Nexus home"
              className="inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <img
                src="/logo.webp"
                alt="Nexus"
                width={150}
                height={150}
                className="h-auto w-[125px] object-contain"
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-[var(--text-secondary)]">
              Digital experiences and custom software built around the problems
              you want to solve.
            </p>

            <Link
              href="/work"
              className={`group mt-5 inline-flex items-center gap-2 font-semibold ${linkClass}`}
            >
              Explore our work
              <ArrowRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <div className="mt-7 flex flex-wrap gap-2">
              {["Design", "Development", "Automation"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-[10px] font-semibold text-[var(--text-muted)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className={headingClass}>Explore</h2>
            <nav aria-label="Explore">
              <ul className="flex flex-col items-start gap-3">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h2 className={headingClass}>Services</h2>
            <nav aria-label="Services">
              <ul className="flex flex-col items-start gap-3">
                {services.map(({ label, href, icon: Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`group inline-flex items-center gap-2.5 ${linkClass}`}
                    >
                      <Icon
                        size={15}
                        aria-hidden="true"
                        className="shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]"
                      />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h2 className={headingClass}>Resources</h2>
            <nav aria-label="Resources">
              <ul className="flex flex-col items-start gap-3">
                {resources.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="border-t border-[var(--border)] py-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Have a project in mind?
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.05em] sm:text-3xl">
                Let&apos;s build something useful.
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-[var(--text-secondary)]">
                Start with your idea. You don&apos;t need a complete brief to
                get the conversation going.
              </p>

              <a
                href="mailto:nexusdevs.js@gmail.com?subject=Project%20enquiry"
                className={`mt-4 inline-flex items-center gap-2 break-all ${linkClass}`}
              >
                <Mail size={15} aria-hidden="true" className="shrink-0" />
                nexusdevs.js@gmail.com
              </a>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end">
              <Link
                href="/build"
                className="group inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-bold !text-white shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Start a project
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>

              <nav
                aria-label="Social media"
                className="flex flex-wrap items-center gap-2"
              >
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Nexus on ${label}`}
                    title={label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[var(--border)] py-5 text-xs leading-5 text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Nexus. Built with purpose.</p>

          <nav aria-label="Legal information">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li>
                <Link href="/privacy" className={linkClass}>
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={linkClass}>
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/cookies" className={linkClass}>
                  Cookies
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
