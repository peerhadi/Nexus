"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { label: "Work", href: "work" },
  { label: "Services", href: "services" },
  { label: "About", href: "about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-5 pt-5 transition-all duration-500 ${
        scrolled ? "pt-3" : "pt-5"
      }`}
    >
      <nav
        className={`relative mx-auto flex h-[68px] max-w-6xl items-center justify-between rounded-[20px] border px-4 transition-all duration-500 ${
          scrolled
            ? "border-black/[0.08] bg-white/85 shadow-[0_12px_40px_rgba(0,0,0,0.07)] backdrop-blur-2xl"
            : "border-black/[0.06] bg-white/70 backdrop-blur-xl"
        }`}
      >
        {/* Tiny accent detail */}
        <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-[#FFFFFF] opacity-80 transition-transform duration-500 hover:scale-150" />

        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 justify-center"
        >
          <span className="flex h-12 w-30 items-center justify-center rounded-[11px] text-sm font-black text-white transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105 group-hover:shadow-[3px_3px_0_transparent]">
            <img src="logo.png" />
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative rounded-xl px-4 py-2 text-[14px] font-medium text-black/55 transition-all duration-300 hover:-translate-y-0.5 hover:text-black"
            >
              <span>{link.label}</span>

              <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#FFFFFF] opacity-0 transition-all duration-300 group-hover:w-4 group-hover:opacity-100" />
            </Link>
          ))}
        </div>

        {/* Contact */}
        <Link
          href="contact"
          className="group hidden items-center gap-2 rounded-xl bg-[#111] px-5 py-3 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#FFFFFF] md:flex"
        >
          <span>Let's talk</span>

          <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </Link>

        {/* Mobile button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#111] md:hidden"
        >
          <span
            className={`absolute h-px w-4 bg-white transition-transform duration-300 ${
              menuOpen ? "rotate-45" : "-translate-y-1"
            }`}
          />
          <span
            className={`absolute h-px w-4 bg-white transition-transform duration-300 ${
              menuOpen ? "-rotate-45" : "translate-y-1"
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`mx-auto mt-2 max-w-6xl overflow-hidden rounded-[20px] border border-black/[0.08] bg-white/95 shadow-[0_15px_50px_rgba(0,0,0,0.09)] backdrop-blur-2xl transition-all duration-500 md:hidden ${
          menuOpen
            ? "max-h-[400px] translate-y-0 opacity-100"
            : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex flex-col p-3">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between rounded-xl px-4 py-4 text-[17px] font-semibold text-black/75 transition-all duration-300 hover:bg-black/[0.035] hover:pl-5 hover:text-black"
              style={{ transitionDelay: `${index * 35}ms` }}
            >
              {link.label}

              <span className="text-black/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FFFFFF]">
                ↗
              </span>
            </Link>
          ))}

          <Link
            href="contact"
            onClick={() => setMenuOpen(false)}
            className="mt-1 flex items-center justify-center rounded-xl bg-[#111] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[3px_3px_0_#FFFFFF]"
          >
            Let's talk
          </Link>
        </div>
      </div>
    </header>
  );
}
