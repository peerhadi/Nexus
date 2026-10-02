import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const navigation = [
  { label: "Home", href: "/home" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

const services = [
  { label: "Websites", href: "/services" },
  { label: "Web applications", href: "/services" },
  { label: "Automation", href: "/services" },
  { label: "AI systems", href: "/services" },
  { label: "Integrations", href: "/services" },
];

const resources = [
  { label: "Build", href: "/build" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

const socials = [
  {
    label: "GitHub",
    href: "#",
    icon: FaGithub,
  },
  {
    label: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: FaLinkedin,
  },
  {
    label: "X",
    href: "#",
    icon: FaXTwitter,
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/[0.08] bg-[#f7f7f5]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid gap-12 py-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="group flex w-fit items-center">
              <span className="h-20 flex items-center justify-center rounded-[11px] transition-all duration-300 group-hover:-rotate-3 group-hover:scale-105">
                <img
                  src="/logo.png"
                  alt="Nexus"
                  className="object-contain"
                  width={150}
                />
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-black/45">
              We build websites, applications, automations, and custom systems
              that turn complicated ideas into useful software.
            </p>

            <Link
              href="/build"
              className="group mt-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-xs font-semibold text-black/60 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:text-black hover:shadow-md"
            >
              Start a project
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <div className="mb-5 text-[10px] font-black uppercase tracking-[0.18em] text-black/30">
              Explore
            </div>

            <nav className="flex flex-col items-start gap-3">
              {navigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-sm font-medium text-black/55 transition-colors duration-200 hover:text-black"
                >
                  {link.label}

                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <div className="mb-5 text-[10px] font-black uppercase tracking-[0.18em] text-black/30">
              What we build
            </div>

            <nav className="flex flex-col items-start gap-3">
              {services.map((service) => (
                <Link
                  key={service.label}
                  href={service.href}
                  className="group flex items-center gap-1 text-sm font-medium text-black/55 transition-colors duration-200 hover:text-black"
                >
                  {service.label}

                  <ArrowUpRight
                    size={11}
                    className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-50"
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div>
            <div className="mb-5 text-[10px] font-black uppercase tracking-[0.18em] text-black/30">
              Resources
            </div>

            <nav className="flex flex-col items-start gap-3">
              {resources.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-black/55 transition-colors duration-200 hover:text-black"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Connection strip */}
        <div className="border-t border-black/[0.07] py-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-black/55">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Open for interesting ideas
              </div>

              <a
                href="mailto:hello@nexus.dev"
                className="group mt-2 flex w-fit items-center gap-2 text-sm font-semibold text-black/60 transition-colors hover:text-black"
              >
                <Mail size={14} />
                hello@nexus.dev
              </a>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap items-center gap-2">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="group flex h-10 items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 text-black/40 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:text-black hover:shadow-md"
                  >
                    <Icon
                      size={15}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />

                    <span className="text-[10px] font-semibold">
                      {social.label}
                    </span>
                  </Link>
                );
              })}

              <Link
                href="/build"
                className="group flex h-10 items-center gap-2 rounded-full bg-black px-4 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black/85 hover:shadow-lg"
              >
                <MessageCircle size={14} />

                <span className="text-[10px] font-bold">Talk to us</span>

                <ArrowUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-black/[0.07] py-5 text-xs text-black/35 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© {new Date().getFullYear()} Nexus</span>

            <span className="hidden h-1 w-1 rounded-full bg-black/15 sm:block" />

            <span>Built with curiosity.</span>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="transition-colors hover:text-black/60"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-black/60"
            >
              Terms
            </Link>

            <Link
              href="/cookies"
              className="transition-colors hover:text-black/60"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
