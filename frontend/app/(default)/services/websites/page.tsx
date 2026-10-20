"use client";

import { useCallback, useState, type MouseEvent } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Gauge,
  Layers3,
  LayoutGrid,
  LockKeyhole,
  Monitor,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";

const services = [
  {
    number: "01",
    icon: LayoutGrid,
    title: "Business websites",
    description:
      "Establish a professional online presence with clear messaging, intuitive navigation, and a design that supports your business goals.",
    items: [
      "Company and service pages",
      "Contact and enquiry forms",
      "Clear calls to action",
      "Responsive layouts",
    ],
  },
  {
    number: "02",
    icon: Layers3,
    title: "Landing pages",
    description:
      "Focused pages that communicate one offer clearly and guide visitors toward a specific next step.",
    items: [
      "Product or service launches",
      "Campaign-specific pages",
      "Lead generation journeys",
      "Conversion-focused structure",
    ],
  },
  {
    number: "03",
    icon: Palette,
    title: "Portfolio websites",
    description:
      "Showcase projects, skills, and work with a distinct visual identity and a structure that makes your work easy to explore.",
    items: [
      "Project galleries",
      "Case study layouts",
      "Personal or studio branding",
      "Custom visual interactions",
    ],
  },
  {
    number: "04",
    icon: Rocket,
    title: "E-commerce experiences",
    description:
      "Present products clearly and build a customer journey around browsing, product information, and purchasing requirements.",
    items: [
      "Product and category pages",
      "Shopping cart experiences",
      "Checkout integration planning",
      "Responsive product layouts",
    ],
  },
  {
    number: "05",
    icon: Code2,
    title: "Custom website features",
    description:
      "Go beyond a static page with tailored interactions, useful tools, and functionality designed around your requirements.",
    items: [
      "Interactive components",
      "Forms and validation",
      "API-connected features",
      "Custom navigation and search",
    ],
  },
  {
    number: "06",
    icon: Gauge,
    title: "Website improvements",
    description:
      "Improve an existing website's structure, usability, responsiveness, and maintainability without rebuilding everything by default.",
    items: [
      "Layout and usability updates",
      "Mobile experience improvements",
      "Component refinements",
      "Technical cleanup",
    ],
  },
];

const useCases = [
  {
    category: "FOR BUSINESSES",
    title: "Make your first impression count.",
    description:
      "Give potential customers a clear understanding of what you do, who you help, and how they can take the next step.",
    points: [
      "Present services and key information",
      "Build trust through clear content",
      "Make enquiries straightforward",
      "Keep the experience consistent across devices",
    ],
    visual: "business",
  },
  {
    category: "FOR CREATORS AND STUDIOS",
    title: "Let the work speak for itself.",
    description:
      "Build a distinctive portfolio that makes projects easy to discover and gives each piece of work the context it deserves.",
    points: [
      "Organise projects into clear categories",
      "Showcase individual case studies",
      "Use motion with a clear purpose",
      "Make contact information easy to find",
    ],
    visual: "portfolio",
  },
  {
    category: "FOR PRODUCTS AND SERVICES",
    title: "Turn interest into action.",
    description:
      "Structure pages around the questions visitors need answered before they can make a decision or take action.",
    points: [
      "Explain features and benefits",
      "Present pricing or service details",
      "Answer common questions",
      "Connect calls to action to the right next step",
    ],
    visual: "product",
  },
];

const process = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand the purpose of the website, the people it serves, the content it needs, and the outcome it should support.",
    detail: "Goals and requirements",
  },
  {
    number: "02",
    title: "Structure",
    description:
      "Plan the pages, navigation, content hierarchy, and visitor journey before building the complete experience.",
    detail: "Information architecture",
  },
  {
    number: "03",
    title: "Design and build",
    description:
      "Develop the visual system, responsive layouts, interactions, and agreed functionality into a cohesive website.",
    detail: "Design and implementation",
  },
  {
    number: "04",
    title: "Refine and test",
    description:
      "Review different screen sizes, navigation, forms, interactions, content, and relevant technical requirements.",
    detail: "Quality checks",
  },
  {
    number: "05",
    title: "Launch and hand off",
    description:
      "Prepare the agreed deployment, provide the relevant handoff information, and clarify any ongoing dependencies.",
    detail: "Delivery and deployment",
  },
];

const principles = [
  {
    icon: Smartphone,
    title: "Responsive by design",
    description:
      "Pages should adapt to phones, tablets, laptops, and larger displays without making visitors fight the layout.",
  },
  {
    icon: Search,
    title: "Clear information structure",
    description:
      "Useful headings, meaningful page titles, descriptive links, and organised content help people find what they need.",
  },
  {
    icon: ShieldCheck,
    title: "Considered security",
    description:
      "Forms, integrations, authentication, and data collection need appropriate protections for their intended use.",
  },
  {
    icon: Gauge,
    title: "Performance-conscious",
    description:
      "Thoughtful assets, sensible rendering, and efficient implementation help keep the experience responsive.",
  },
];

const faqs = [
  {
    question: "What types of websites can you build?",
    answer:
      "Projects can include business websites, landing pages, portfolios, product sites, e-commerce experiences, and custom interactive websites. The exact scope depends on the requirements, content, integrations, and functionality agreed for the project.",
  },
  {
    question: "Can you build a website with custom functionality?",
    answer:
      "Yes, where the requirements are technically feasible and included in the agreed scope. Features might include forms, interactive tools, API integrations, search, custom navigation, and other tailored components.",
  },
  {
    question: "Will my website work on mobile?",
    answer:
      "Responsive design is part of the approach. Layouts, navigation, typography, controls, and content should be considered across screen sizes rather than designed only for a desktop display.",
  },
  {
    question: "Can you connect a domain or deploy the website?",
    answer:
      "Deployment and domain configuration can be included when agreed. Domain registration, hosting, third-party services, and other ongoing costs depend on the setup and may be billed separately.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Pricing depends on the number of pages, design complexity, custom functionality, integrations, content requirements, and delivery scope. The project should be discussed and scoped before a price is agreed.",
  },
  {
    question: "Can you improve a website I already have?",
    answer:
      "Yes. Depending on the current codebase and your goals, work may focus on specific pages, responsive layouts, usability, new features, or broader improvements. A full rebuild is not always necessary.",
  },
];

function FloatingScene({
  variant = "hero",
  className = "",
}: {
  variant?: "hero" | "wide" | "compact";
  className?: string;
}) {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

  const move = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();

    setPosition({
      x: (event.clientX - bounds.left) / bounds.width,
      y: (event.clientY - bounds.top) / bounds.height,
    });
  }, []);

  const leave = useCallback(() => {
    setPosition({ x: 0.5, y: 0.5 });
  }, []);

  const dx = position.x - 0.5;
  const dy = position.y - 0.5;

  const objects = [
    {
      className: "left-[9%] top-[17%] h-16 w-16 sm:h-20 sm:w-20",
      depth: 34,
      shape: "cube",
    },
    {
      className: "right-[12%] top-[15%] h-14 w-14 sm:h-[72px] sm:w-[72px]",
      depth: -26,
      shape: "sphere",
    },
    {
      className: "bottom-[19%] left-[15%] h-14 w-14 sm:h-[76px] sm:w-[76px]",
      depth: -42,
      shape: "diamond",
    },
    {
      className: "bottom-[15%] right-[11%] h-16 w-16 sm:h-24 sm:w-24",
      depth: 48,
      shape: "ring",
    },
    {
      className: "left-[47%] top-[7%] h-8 w-8 sm:h-11 sm:w-11",
      depth: 24,
      shape: "orb",
    },
    {
      className: "right-[7%] top-[52%] h-8 w-8 sm:h-12 sm:w-12",
      depth: -18,
      shape: "star",
    },
    {
      className: "left-[5%] top-[55%] h-7 w-7 sm:h-9 sm:w-9",
      depth: 16,
      shape: "orb",
    },
  ];

  return (
    <div
      className={`relative isolate overflow-hidden ${className}`}
      onMouseMove={move}
      onMouseLeave={leave}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 48%, var(--selection), transparent 66%)",
        }}
      />

      <div
        className={`absolute left-1/2 top-1/2 rounded-full border border-[var(--card-border)] ${
          variant === "compact"
            ? "h-48 w-48"
            : variant === "wide"
              ? "h-[310px] w-[310px] sm:h-[390px] sm:w-[390px]"
              : "h-[280px] w-[280px] sm:h-[390px] sm:w-[390px]"
        }`}
        style={{
          transform: `translate(calc(-50% + ${dx * -24}px), calc(-50% + ${dy * -24}px)) rotateX(${dy * 24}deg) rotateY(${dx * 24}deg)`,
          transition: "transform 180ms ease-out",
        }}
      />

      <div
        className={`absolute left-1/2 top-1/2 rounded-[42%] border border-[var(--card-border)] ${
          variant === "compact"
            ? "h-36 w-52"
            : "h-[220px] w-[310px] sm:h-[270px] sm:w-[390px]"
        }`}
        style={{
          transform: `translate(calc(-50% + ${dx * 35}px), calc(-50% + ${dy * 35}px)) rotateX(${55 + dy * 16}deg) rotateY(${dx * 28}deg) rotate(-30deg)`,
          transition: "transform 180ms ease-out",
        }}
      />

      <div
        className={`absolute left-1/2 top-1/2 rounded-full border border-[var(--card-border)] ${
          variant === "compact"
            ? "h-32 w-32"
            : "h-[200px] w-[200px] sm:h-[260px] sm:w-[260px]"
        }`}
        style={{
          transform: `translate(calc(-50% + ${dx * -40}px), calc(-50% + ${dy * -40}px)) rotateX(${dy * 38}deg) rotateY(${70 + dx * 22}deg) rotate(52deg)`,
          transition: "transform 220ms ease-out",
        }}
      />

      {objects.map((object, index) => (
        <div
          key={object.shape + index}
          className={`pointer-events-none absolute ${object.className}`}
          style={{
            transform: `translate3d(${dx * object.depth}px, ${dy * object.depth}px, 0) rotateX(${dy * 35 + index * 8}deg) rotateY(${dx * 42 + index * 13}deg) rotate(${index * 19}deg)`,
            transition: "transform 160ms ease-out",
          }}
        >
          {object.shape === "cube" && (
            <div className="relative h-full w-full [transform-style:preserve-3d]">
              <div className="absolute inset-0 border border-[var(--accent)] bg-[var(--accent)] opacity-20 [transform:translateZ(16px)]" />
              <div className="absolute inset-0 border border-[var(--text-primary)] opacity-50 [transform:rotateY(60deg)]" />
              <div className="absolute inset-0 border border-[var(--accent)] opacity-80 [transform:rotateX(60deg)]" />
            </div>
          )}

          {object.shape === "sphere" && (
            <div className="relative h-full w-full rounded-full border border-[var(--card-border)] bg-[var(--surface-secondary)] shadow-[var(--shadow-md)]">
              <div className="absolute left-[18%] top-[14%] h-[24%] w-[24%] rounded-full bg-[var(--text-primary)] opacity-50 blur-[5px]" />
              <div className="absolute inset-[16%] rounded-full border border-[var(--accent)] opacity-50" />
              <div className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-10 blur-xl" />
            </div>
          )}

          {object.shape === "diamond" && (
            <div className="relative h-full w-full rotate-45 border border-[var(--accent)] bg-[var(--accent)] opacity-30 shadow-[var(--shadow-md)]">
              <div className="absolute inset-[18%] border border-[var(--text-primary)] opacity-80" />
            </div>
          )}

          {object.shape === "ring" && (
            <div className="absolute inset-[12%] rounded-full border-[5px] border-[var(--accent)] opacity-70 [transform:rotateX(65deg)] sm:border-[7px]">
              <div className="absolute inset-[20%] rounded-full border border-[var(--text-primary)] opacity-60" />
            </div>
          )}

          {object.shape === "orb" && (
            <div className="h-full w-full rounded-full border border-[var(--card-border)] bg-[var(--surface-secondary)] shadow-[var(--shadow-md)]">
              <div className="ml-[20%] mt-[18%] h-[22%] w-[22%] rounded-full bg-[var(--text-primary)] opacity-60 blur-[2px]" />
            </div>
          )}

          {object.shape === "star" && (
            <Sparkles
              className="h-full w-full text-[var(--accent)]"
              strokeWidth={0.8}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.045em] text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function UseCaseVisual({ type }: { type: string }) {
  const visuals: Record<string, { label: string; icon: typeof LayoutGrid }[]> =
    {
      business: [
        { label: "What we do", icon: LayoutGrid },
        { label: "Services and details", icon: Layers3 },
        { label: "Get in touch", icon: ArrowUpRight },
      ],
      portfolio: [
        { label: "Featured work", icon: Palette },
        { label: "Project details", icon: Code2 },
        { label: "Contact the creator", icon: ArrowUpRight },
      ],
      product: [
        { label: "Explore the offer", icon: Search },
        { label: "Understand the details", icon: Check },
        { label: "Take the next step", icon: ArrowRight },
      ],
    };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] p-4 sm:p-5">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-xs font-semibold text-[var(--text-primary)]">
          Page structure example
        </span>
        <span className="rounded-full border border-[var(--card-border)] bg-[var(--card)] px-2.5 py-1 text-[10px] text-[var(--text-secondary)]">
          Illustrative
        </span>
      </div>

      <div className="space-y-3">
        {visuals[type].map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={item.label}>
              <div className="flex items-center gap-3 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--selection)] text-[var(--accent)]">
                  <Icon size={17} />
                </div>
                <span className="flex-1 text-xs font-medium text-[var(--text-primary)] sm:text-sm">
                  {item.label}
                </span>
                <Check size={15} className="text-[var(--success)]" />
              </div>
              {index < visuals[type].length - 1 && (
                <div className="flex h-5 items-center pl-7">
                  <div className="h-full border-l border-dashed border-[var(--card-border)]" />
                  <ArrowDown
                    size={12}
                    className="-ml-[6px] text-[var(--text-secondary)]"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[var(--card-border)]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-5 py-5 text-left"
      >
        <span className="text-sm font-semibold text-[var(--text-primary)] sm:text-base">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[var(--text-secondary)] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <p className="max-w-3xl pb-5 pr-8 text-sm leading-7 text-[var(--text-secondary)]">
          {answer}
        </p>
      )}
    </div>
  );
}

export default function WebsitesPage() {
  const [selectedPriority, setSelectedPriority] = useState("Business presence");

  const priorities = [
    "Business presence",
    "Portfolio or brand",
    "Product or service",
    "Existing website",
  ];

  const priorityDetails: Record<
    string,
    { title: string; description: string }
  > = {
    "Business presence": {
      title: "Make your business easier to understand.",
      description:
        "Organise your services, company information, and contact options into a professional experience visitors can navigate confidently.",
    },
    "Portfolio or brand": {
      title: "Give your work a distinct identity.",
      description:
        "Build a visual system and project structure that showcase your work while keeping navigation and contact details clear.",
    },
    "Product or service": {
      title: "Help visitors take the next step.",
      description:
        "Present the offer, explain its value, answer important questions, and make the intended action easy to find.",
    },
    "Existing website": {
      title: "Improve what is already there.",
      description:
        "Identify the parts that need attention, from mobile layouts and content structure to new functionality or broader refinements.",
    },
  };

  return (
    <main className="overflow-hidden">
      <section className="relative isolate border-b border-[var(--card-border)]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 75% 40%, var(--selection), transparent 45%), radial-gradient(ellipse at 10% 80%, var(--surface-secondary), transparent 50%)",
          }}
        />

        <div className="relative mx-auto grid min-h-[800px] max-w-7xl items-center gap-5 px-5 py-16 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-12 lg:py-20">
          <div className="relative z-10 py-10 lg:py-16">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3.5 py-2 text-xs font-medium text-[var(--text-primary)]">
              <Zap size={14} className="text-[var(--accent)]" />
              WEBSITE DEVELOPMENT
            </div>

            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.02] tracking-[-0.06em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
              Make your
              <span className="mt-2 block text-[var(--accent)]">
                online presence count.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              A great website does more than look good. It explains what you do,
              helps people find what they need, and gives them a clear reason to
              take the next step. We build considered digital experiences around
              your goals.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/build"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold !text-white transition-transform hover:-translate-y-0.5"
              >
                Start a project
                <ArrowRight size={17} />
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-6 py-3 text-sm font-semibold !text-white transition-colors hover:bg-[var(--surface-secondary)]"
              >
                All services
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="mt-9 grid max-w-lg grid-cols-2 gap-x-6 gap-y-4 border-t border-[var(--card-border)] pt-6">
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  Designed around people
                </p>
                <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                  Clear, thoughtful experiences
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  Built for real use
                </p>
                <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                  Functionality with a purpose
                </p>
              </div>
            </div>
          </div>

          <FloatingScene
            variant="hero"
            className="min-h-[460px] sm:min-h-[600px]"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="THE BIGGER PICTURE"
              title="Your website is part of how people experience your business."
              description="It may be the first place someone encounters your work, compares your offer, checks your credibility, or decides whether to contact you."
            />
            <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">
              That makes structure, content, visual design, usability, and
              functionality important together. A polished interface is only
              useful when it helps visitors understand what matters and move
              through the experience without unnecessary friction.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] text-[var(--accent)]">
                <LayoutGrid size={20} />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-[var(--text-primary)]">
                Clear positioning
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                Explain what you offer, who it is for, and why visitors should
                care without making them search for the essentials.
              </p>
            </div>
            <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] text-[var(--accent)]">
                <Smartphone size={20} />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-[var(--text-primary)]">
                Consistent access
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                Make important information and actions easy to use across screen
                sizes and input methods.
              </p>
            </div>
            <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] text-[var(--accent)]">
                <ShieldCheck size={20} />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-[var(--text-primary)]">
                Trust and clarity
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                Use coherent content, predictable interactions, and appropriate
                safeguards to support confidence.
              </p>
            </div>
            <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] text-[var(--accent)]">
                <ArrowUpRight size={20} />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-[var(--text-primary)]">
                Meaningful next steps
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                Guide visitors toward the right action, whether that means
                making an enquiry, exploring work, or learning more.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--card-border)] bg-[var(--surface-secondary)]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-12 lg:py-20">
          <div>
            <SectionHeading
              eyebrow="THOUGHTFUL BY DESIGN"
              title="A website should feel considered from every angle."
              description="Visual identity, content hierarchy, and interaction patterns should work together. Each decision should have a reason to exist."
            />
            <div className="mt-7 space-y-4">
              {[
                "Navigation that makes sense",
                "Layouts that adapt to different screens",
                "Motion that supports the experience",
                "Content organised around visitor needs",
                "Functionality that solves a real problem",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--selection)] text-[var(--accent)]">
                    <Check size={12} />
                  </span>
                  <p className="text-sm leading-6 text-[var(--text-secondary)]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[370px] overflow-hidden rounded-[2rem] border border-[var(--card-border)] bg-[var(--card)]">
            <FloatingScene
              variant="wide"
              className="absolute inset-0 min-h-full"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-5 shadow-[var(--shadow-md)] sm:inset-x-8 sm:bottom-8">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    EXPERIENCE DESIGN
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                    Purpose → Structure → Interaction
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--selection)] text-[var(--accent)]">
                  <Sparkles size={19} />
                </div>
              </div>
              <p className="mt-3 text-xs leading-6 text-[var(--text-secondary)]">
                Start with the people and the problem. Build the visual language
                around them. Refine the details until the whole experience feels
                coherent.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <SectionHeading
          eyebrow="WHAT WE CAN BUILD"
          title="Different websites. Different goals."
          description="From a focused landing page to a more involved digital experience, the right solution depends on what you need the website to accomplish."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.number}
                className="group rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] text-[var(--accent)]">
                    <Icon size={21} strokeWidth={1.6} />
                  </div>
                  <span className="text-xs text-[var(--text-secondary)]">
                    {service.number}
                  </span>
                </div>

                <h3 className="mt-7 text-lg font-semibold text-[var(--text-primary)]">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  {service.description}
                </p>

                <div className="mt-6 border-t border-[var(--card-border)] pt-5">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-secondary)]">
                    Possible features
                  </p>
                  <ul className="space-y-2.5">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs leading-5 text-[var(--text-secondary)]"
                      >
                        <Check
                          size={14}
                          className="mt-0.5 shrink-0 text-[var(--accent)]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[var(--card-border)] bg-[var(--surface-secondary)]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <SectionHeading
            eyebrow="WHERE IT MAKES A DIFFERENCE"
            title="Start with the experience your visitors need."
            description="These examples illustrate how a website can be structured around different goals. The final pages and features depend on your project requirements."
          />

          <div className="mt-12 space-y-5">
            {useCases.map((useCase, index) => (
              <article
                key={useCase.category}
                className="grid overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card)] lg:grid-cols-2"
              >
                <div
                  className={`p-6 sm:p-9 lg:p-11 ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-[var(--accent)]">
                    {useCase.category}
                  </p>

                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.035em] text-[var(--text-primary)] sm:text-3xl">
                    {useCase.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                    {useCase.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {useCase.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
                      >
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-[var(--accent)]"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`relative flex min-h-[330px] items-center overflow-hidden border-t border-[var(--card-border)] bg-[var(--surface-secondary)] p-5 sm:p-8 lg:border-t-0 ${
                    index % 2 === 1 ? "lg:order-1 lg:border-r" : "lg:border-l"
                  }`}
                >
                  <FloatingScene
                    variant="compact"
                    className="absolute inset-0"
                  />
                  <div className="relative z-10 w-full">
                    <UseCaseVisual type={useCase.visual} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:px-12 lg:py-32">
        <div>
          <SectionHeading
            eyebrow="A WEBSITE THAT FITS"
            title="Built around your requirements, not a generic template."
            description="The project can be focused or ambitious. We start by understanding what is needed and make implementation decisions that support those requirements."
          />

          <div className="mt-8 space-y-4">
            {[
              {
                title: "A focused online presence",
                description:
                  "A clear set of pages that explains your business and helps visitors get in touch.",
              },
              {
                title: "A distinctive visual experience",
                description:
                  "A more expressive design system with considered motion, interactive elements, and visual detail.",
              },
              {
                title: "A website with custom functionality",
                description:
                  "A tailored experience that connects to APIs, processes information, or supports specific user actions.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="flex gap-4 border-b border-[var(--card-border)] pb-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--card-border)] text-xs text-[var(--text-secondary)]">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[430px] overflow-hidden rounded-[2rem] border border-[var(--card-border)] bg-[var(--surface-secondary)]">
          <FloatingScene variant="wide" className="absolute inset-0" />
          <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-5 sm:inset-x-7 sm:bottom-7 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--selection)] text-[var(--accent)]">
                <LightbulbIcon />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  Start with the purpose
                </p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  Make every design decision count
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
              The best starting point is not a particular animation or
              framework. It is a clear understanding of what your website needs
              to do and who it needs to serve.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--card-border)] bg-[var(--surface-secondary)]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
          <SectionHeading
            eyebrow="THE DETAILS MATTER"
            title="A strong website needs more than a polished first screen."
            description="The experience should remain clear, usable, and maintainable after visitors move beyond the hero section."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <article
                  key={principle.title}
                  className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] text-[var(--accent)]">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-6 text-base font-semibold text-[var(--text-primary)]">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    {principle.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <LockKeyhole size={20} className="text-[var(--accent)]" />
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  Functionality with appropriate safeguards
                </h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                Data collection, forms, accounts, and external integrations need
                protections that match their purpose. The requirements should be
                established before implementation.
              </p>
            </div>

            <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Gauge size={20} className="text-[var(--accent)]" />
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  A considered technical foundation
                </h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                Structure, dependencies, assets, and rendering decisions should
                suit the website's actual needs and leave room for sensible
                future changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="HOW WE WORK"
              title="A clear path from the first idea to launch."
              description="A structured process keeps goals, content, functionality, and delivery expectations aligned throughout the project."
            />

            <div className="relative mt-8 min-h-[230px] overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--surface-secondary)]">
              <FloatingScene variant="compact" className="absolute inset-0" />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-4">
                <p className="text-xs font-semibold text-[var(--text-primary)]">
                  One step at a time
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {[
                    "Discover",
                    "Structure",
                    "Design",
                    "Build",
                    "Test",
                    "Launch",
                  ].map((stage, index) => (
                    <div
                      key={stage}
                      className="flex items-center gap-2 rounded-lg border border-[var(--card-border)] bg-[var(--surface-secondary)] px-2.5 py-2"
                    >
                      <span className="text-[10px] text-[var(--accent)]">
                        0{index + 1}
                      </span>
                      <span className="text-xs font-medium text-[var(--text-primary)]">
                        {stage}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs leading-6 text-[var(--text-secondary)]">
                  Each stage builds on the decisions made before it, from
                  understanding the requirements to preparing the final handoff.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-0">
            {process.map((step) => (
              <article
                key={step.number}
                className="grid grid-cols-[46px_1fr] gap-4 border-b border-[var(--card-border)] py-6 first:pt-0"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] text-xs font-semibold text-[var(--accent)]">
                  {step.number}
                </div>
                <div>
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-secondary)]">
                    {step.detail}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--card-border)] bg-[var(--surface-secondary)]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-28">
          <div>
            <SectionHeading
              eyebrow="WHAT SUCCESS LOOKS LIKE"
              title="Build around outcomes, not just appearances."
              description="The right measures depend on your goals. A useful review considers how the website works for visitors as well as how it looks."
            />
            <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">
              A website's impact depends on its audience, content, offer, and
              implementation. We avoid assuming that a visual change alone
              guarantees better results.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Visitor clarity",
                description:
                  "Can people understand the offer and find important information?",
                icon: LayoutGrid,
              },
              {
                title: "Usability",
                description:
                  "Can visitors navigate, read, and interact comfortably?",
                icon: Smartphone,
              },
              {
                title: "Useful actions",
                description:
                  "Are the intended next steps visible and straightforward?",
                icon: ArrowUpRight,
              },
              {
                title: "Maintainability",
                description:
                  "Can the website be understood, updated, and extended sensibly?",
                icon: Code2,
              },
            ].map((metric) => {
              const Icon = metric.icon;

              return (
                <div
                  key={metric.title}
                  className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6"
                >
                  <Icon size={21} className="text-[var(--accent)]" />
                  <h3 className="mt-5 text-base font-semibold text-[var(--text-primary)]">
                    {metric.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {metric.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="LET'S FIND YOUR STARTING POINT"
              title="What does your website need to achieve?"
              description="Choose the goal closest to your project to explore a practical starting point."
            />

            <p className="mt-5 text-xs leading-6 text-[var(--text-secondary)]">
              This selector is a guide to help frame your project, not an
              automated quote or a technical assessment.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-5 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              SELECT YOUR PRIORITY
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {priorities.map((priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setSelectedPriority(priority)}
                  aria-pressed={selectedPriority === priority}
                  className={`flex min-h-14 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                    selectedPriority === priority
                      ? "border-[var(--accent)] bg-[var(--selection)] text-[var(--text-primary)]"
                      : "border-[var(--card-border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {priority}
                  {selectedPriority === priority ? (
                    <Check size={16} className="text-[var(--accent)]" />
                  ) : (
                    <ArrowUpRight size={15} />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[var(--card-border)] p-5">
              <p className="text-xs text-[var(--text-secondary)]">
                A useful starting point
              </p>
              <h3 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">
                {priorityDetails[selectedPriority].title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                {priorityDetails[selectedPriority].description}
              </p>

              <Link
                href="/build"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold !text-white transition-transform hover:-translate-y-0.5"
              >
                Start a project
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--card-border)] bg-[var(--surface-secondary)]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="COMMON QUESTIONS"
                title="Before we build."
                description="A few practical details to consider when planning your website."
              />
            </div>

            <div>
              {faqs.map((faq) => (
                <FAQItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--card-border)] bg-[var(--card)]">
          <div className="absolute inset-y-0 right-0 hidden w-[44%] md:block">
            <FloatingScene variant="wide" className="h-full w-full" />
          </div>

          <div
            className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, var(--accent), transparent 70%)",
            }}
          />

          <div className="relative z-10 max-w-3xl px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] text-[var(--accent)]">
              <Sparkles size={22} />
            </div>

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              YOUR NEXT STEP
            </p>

            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-[var(--text-primary)] sm:text-5xl">
              Let's build something worth visiting.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              Tell us what you are building, who it is for, and what you want
              the website to accomplish. We can define the requirements and
              agree on a sensible scope before work begins.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/build"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold !text-white transition-transform hover:-translate-y-0.5"
              >
                Start a project
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/services"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--surface-secondary)] px-6 py-3 text-sm font-semibold !text-white transition-colors hover:bg-[var(--surface)]"
              >
                All services
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-[var(--card-border)] pt-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              NEXT SERVICE
            </p>
            <h3 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">
              Web Applications
            </h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Custom interactive products and application experiences.
            </p>
          </div>

          <Link
            href="/services/web-applications"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
          >
            Explore web applications
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          :global(*) {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}

function LightbulbIcon() {
  return <Sparkles size={19} />;
}
