import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Guide", href: "/guide" },
];

const services = [
  "Websites",
  "Web applications",
  "Automation",
  "AI systems",
  "Integrations",
];

const resources = [
  { label: "Playground", href: "/playground" },
  { label: "Design Lab", href: "/design-lab" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Privacy Polcy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookie Polcy", href: "/cookies" },
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
  "w-fit text-sm leading-6 text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-secondary)] rounded-sm";

const headingClass =
  "mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--surface-secondary)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr] lg:gap-12 lg:py-14">
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
                className="h-auto w-[130px] object-contain"
              />
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-[var(--text-secondary)]">
              Websites, applications, automation, and custom software built
              around the problems you want to solve.
            </p>

            <Link
              href="/work"
              className={`group mt-5 inline-flex items-center gap-2 font-medium ${linkClass}`}
            >
              Explore our work
              <ArrowRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div>
            <h2 className={headingClass}>Explore</h2>
            <nav aria-label="Explore">
              <ul className="flex flex-col items-start gap-2.5">
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
              <ul className="flex flex-col items-start gap-2.5">
                {services.map((service) => (
                  <li key={service}>
                    <Link href="/services" className={linkClass}>
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h2 className={headingClass}>Resources</h2>
            <nav aria-label="Resources">
              <ul className="flex flex-col items-start gap-2.5">
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

        <div className="border-t border-[var(--border)] py-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                Have a project in mind?
              </h2>
              <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                Start with your idea. You don't need a complete brief.
              </p>

              <a
                href="mailto:nexusdevs.js@gmail.com?subject=Project%20enquiry"
                className={`mt-3 inline-flex items-center gap-2 break-all ${linkClass}`}
              >
                <Mail size={15} aria-hidden="true" className="shrink-0" />
                nexusdevs.js@gmail.com
              </a>
            </div>

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
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <Icon size={17} aria-hidden="true" />
                </a>
              ))}
            </nav>
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
