import {
  Accessibility,
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Cookie,
  CreditCard,
  Database,
  Eye,
  FileText,
  Globe,
  Globe2,
  Handshake,
  Info,
  Keyboard,
  Lock,
  MessageCircle,
  Monitor,
  MousePointer2,
  RefreshCw,
  Settings,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  UserCheck,
  UserRound,
  Volume2,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import type { PolicySectionData } from "./policy-page";

export const accessibilitySections: PolicySectionData[] = [
  {
    icon: Accessibility,
    title: "Our accessibility approach",
    text: "Nexus is designed to be usable by as many people as possible. We aim to make our website clear, readable, navigable, and usable across different devices, input methods, and accessibility needs.",
    color: "violet",
  },
  {
    icon: Eye,
    title: "Visual accessibility",
    text: "We work to maintain readable text, clear visual hierarchy, meaningful spacing, and sufficient contrast between important interface elements. Information should not depend solely on color to be understood.",
    color: "cyan",
  },
  {
    icon: Keyboard,
    title: "Keyboard navigation",
    text: "We aim to make interactive parts of Nexus usable with a keyboard. Buttons, links, forms, and other controls should have a logical navigation order and visible focus states where appropriate.",
    color: "emerald",
  },
  {
    icon: Monitor,
    title: "Clear structure",
    text: "Pages are organized using headings, sections, labels, and consistent interface patterns to make content easier to understand and navigate.",
    color: "pink",
  },
  {
    icon: MousePointer2,
    title: "Interactive elements",
    text: "Interactive controls are designed to be identifiable and understandable. We aim to provide clear labels and predictable behavior so users can understand what an action will do before using it.",
    color: "orange",
  },
  {
    icon: Volume2,
    title: "Audio and motion",
    text: "Where audio, motion, or visual effects are used, we aim to ensure that they are not the only way important information is communicated. Decorative effects should not prevent users from accessing the underlying content.",
    color: "blue",
  },
  {
    icon: Smartphone,
    title: "Different devices",
    text: "Nexus is designed to work across desktop and mobile screen sizes. We aim to keep navigation, content, and important controls usable as the available screen space changes.",
    color: "fuchsia",
  },
  {
    icon: ShieldCheck,
    title: "Ongoing improvements",
    text: "Accessibility is an ongoing process. As Nexus changes, we may improve our interface, fix accessibility issues, and make our components easier to use with different technologies and interaction methods.",
    color: "yellow",
  },
  {
    icon: MessageCircle,
    title: "Accessibility feedback",
    text: "If you encounter an accessibility issue while using Nexus, we encourage you to let us know. Feedback can help us identify parts of the experience that may need improvement.",
    color: "violet",
  },
];

export const cookieSections: PolicySectionData[] = [
  {
    icon: Cookie,
    title: "What are cookies?",
    text: "Cookies are small text files that websites store on your device. They allow a website to remember information about your visit and help certain features work as expected.",
    color: "violet",
  },
  {
    icon: ShieldCheck,
    title: "How we use cookies",
    text: "Nexus may use cookies and similar technologies to keep our website secure, remember preferences, support functionality, and understand how our website is being used.",
    color: "cyan",
  },
  {
    icon: Settings,
    title: "Essential cookies",
    text: "Some cookies are required for basic website functionality. They may be used for authentication, security, sessions, and other features that are necessary for the service to operate.",
    color: "emerald",
  },
  {
    icon: BarChart3,
    title: "Analytics cookies",
    text: "Analytics cookies may help us understand how visitors use Nexus. This can include information about pages viewed, general interactions, and how different parts of the website perform.",
    color: "pink",
  },
  {
    icon: SlidersHorizontal,
    title: "Preference cookies",
    text: "Preference cookies can remember choices you make while using Nexus. This helps provide a more consistent experience when you return to the website.",
    color: "orange",
  },
  {
    icon: Database,
    title: "What information may be collected",
    text: "Depending on the technologies being used, cookie-related information may include browser details, device information, identifiers, pages visited, and general interaction data.",
    color: "blue",
  },
  {
    icon: Globe,
    title: "Third-party cookies",
    text: "Some third-party services used by Nexus may place their own cookies or similar technologies on your device. Those technologies are controlled by the relevant third party and may be subject to their own policies.",
    color: "fuchsia",
  },
  {
    icon: Lock,
    title: "Managing cookies",
    text: "You can manage or delete cookies through your browser settings. You can also configure your browser to block certain cookies. Blocking essential cookies may affect how parts of Nexus function.",
    color: "yellow",
  },
  {
    icon: RefreshCw,
    title: "Changes to this policy",
    text: "We may update this Cookie Policy when our services, technologies, or legal requirements change. When we make changes, the updated version will be published on this page.",
    color: "violet",
  },
];

export const privacySections: PolicySectionData[] = [
  {
    id: "information",
    icon: UserRound,
    color: "violet",
    title: "Information we collect",
    content: (
      <>
        <p>
          When you use Nexus, contact us, or start a project with us, we may
          collect information that you choose to provide.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            "Your name and contact details",
            "Project and business information",
            "Messages and information you send us",
            "Account and profile information",
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-violet-100 bg-violet-50/60 p-4"
            >
              <CheckCircle2
                size={16}
                className="mt-0.5 shrink-0 text-violet-500"
              />

              <span className="text-sm font-medium text-slate-600">{item}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "usage",
    icon: Database,
    color: "cyan",
    title: "How we use information",
    content: (
      <>
        <p>
          We use information to provide, maintain, and improve the services you
          request from us.
        </p>

        <ul className="mt-6 space-y-3">
          {[
            "Respond to messages and project enquiries.",
            "Build and deliver websites, applications, automations, and other requested work.",
            "Provide support and communicate about active projects.",
            "Improve the reliability and experience of our website and services.",
            "Protect our services against abuse, fraud, or security issues.",
          ].map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm leading-6 text-slate-600"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    icon: Globe2,
    color: "pink",
    title: "When information is shared",
    content: (
      <>
        <p>
          We do not sell your personal information. Information may be shared
          with service providers when necessary to operate our website,
          communicate with you, process payments, host applications, or deliver
          a project.
        </p>

        <div className="mt-6 rounded-3xl border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-orange-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-500">
              <Shield size={18} />
            </div>

            <div>
              <h3 className="text-sm font-black text-slate-800">
                The simple version
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Your information is used to help Nexus provide the service you
                asked for — not to sell your personal information.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "cookies",
    icon: Cookie,
    color: "orange",
    title: "Cookies & similar technology",
    content: (
      <>
        <p>
          Nexus may use cookies or similar technologies to keep the website
          working properly, remember preferences, understand how the site is
          being used, and improve the overall experience.
        </p>

        <p className="mt-4">
          You can usually control cookies through your browser settings.
          Disabling certain cookies may affect parts of the website.
        </p>
      </>
    ),
  },
  {
    id: "security",
    icon: Lock,
    color: "emerald",
    title: "Keeping information secure",
    content: (
      <>
        <p>
          We take reasonable measures to protect information from unauthorized
          access, alteration, disclosure, or destruction.
        </p>

        <p className="mt-4">
          No online service can guarantee absolute security, so we cannot
          promise that information will always be completely secure.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    icon: FileText,
    color: "blue",
    title: "How long we keep information",
    content: (
      <p>
        We keep information for as long as it is reasonably necessary for the
        purpose for which it was collected, including providing services,
        maintaining business records, resolving disputes, and meeting applicable
        legal obligations.
      </p>
    ),
  },
  {
    id: "rights",
    icon: Eye,
    color: "fuchsia",
    title: "Your choices",
    content: (
      <>
        <p>
          Depending on where you live and the laws that apply to you, you may
          have rights relating to your personal information.
        </p>

        <ul className="mt-6 space-y-3">
          {[
            "Request access to information we hold about you.",
            "Ask us to correct inaccurate information.",
            "Request deletion where applicable.",
            "Ask questions about how your information is used.",
          ].map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm leading-6 text-slate-600"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-400" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "children",
    icon: Sparkles,
    color: "yellow",
    title: "Children's privacy",
    content: (
      <>
        <p>
          Our services are not intentionally designed to collect personal
          information from children without appropriate permission.
        </p>

        <p className="mt-4">
          If you believe a child has provided us with personal information
          inappropriately, please contact us so we can review the situation.
        </p>
      </>
    ),
  },
];

export const termsSections: PolicySectionData[] = [
  {
    id: "agreement",
    icon: Handshake,
    color: "violet",
    title: "Agreement to these terms",
    content: (
      <>
        <p>
          By using the Nexus website, creating an account, contacting us, or
          purchasing our services, you agree to these Terms of Service.
        </p>

        <p className="mt-4">
          If you are using Nexus on behalf of another person, business, or
          organization, you confirm that you have permission to agree to these
          terms on their behalf.
        </p>
      </>
    ),
  },
  {
    id: "services",
    icon: Sparkles,
    color: "cyan",
    title: "Our services",
    content: (
      <>
        <p>
          Nexus provides digital services including websites, web applications,
          automation, integrations, AI systems, and custom software.
        </p>

        <p className="mt-4">
          The exact work included in a project depends on the scope,
          requirements, deliverables, and agreement made for that project.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            "Websites and landing pages",
            "Web applications",
            "Automation and workflows",
            "Custom software",
            "AI-powered systems",
            "Third-party integrations",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl border border-cyan-100 bg-cyan-50/60 p-4"
            >
              <CheckCircle2 size={16} className="shrink-0 text-cyan-500" />
              <span className="text-sm font-medium text-slate-600">{item}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "projects",
    icon: FileText,
    color: "pink",
    title: "Projects & scope",
    content: (
      <>
        <p>
          Before work begins, we may agree on the project's scope, deliverables,
          timeline, pricing, and other relevant requirements.
        </p>

        <p className="mt-4">
          Requests that significantly change the original scope may require
          additional time or cost. We will communicate material changes before
          proceeding with them.
        </p>
      </>
    ),
  },
  {
    id: "payment",
    icon: CreditCard,
    color: "orange",
    title: "Payment",
    content: (
      <>
        <p>
          Project pricing and payment schedules are agreed upon before or during
          the start of a project.
        </p>

        <div className="mt-6 rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-pink-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
              <CreditCard size={18} />
            </div>

            <div>
              <h3 className="text-sm font-black text-slate-800">
                Typical project structure
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Unless a different arrangement is agreed upon, projects may use
                an initial payment to begin work followed by the remaining
                balance before final handoff or deployment.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "client",
    icon: UserCheck,
    color: "emerald",
    title: "Your responsibilities",
    content: (
      <>
        <p>
          You are responsible for providing accurate information, content,
          credentials, assets, approvals, and other materials that are
          reasonably necessary for your project.
        </p>

        <p className="mt-4">
          You also agree not to use Nexus services for unlawful, fraudulent,
          abusive, or harmful activities.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    icon: ShieldCheck,
    color: "blue",
    title: "Intellectual property",
    content: (
      <>
        <p>
          Unless otherwise agreed, Nexus retains ownership of its pre-existing
          tools, frameworks, reusable components, internal systems, and
          development methods.
        </p>

        <p className="mt-4">
          Project-specific deliverables and their ownership or usage rights are
          determined by the agreement for that project and applicable payment
          terms.
        </p>

        <p className="mt-4">
          Third-party software, libraries, APIs, fonts, assets, and services
          remain subject to their respective licenses and terms.
        </p>
      </>
    ),
  },
  {
    id: "accounts",
    icon: Lock,
    color: "fuchsia",
    title: "Accounts & security",
    content: (
      <>
        <p>
          If you create an account with Nexus, you are responsible for keeping
          your login credentials secure and for activity that occurs through
          your account.
        </p>

        <p className="mt-4">
          Please notify us if you believe your account has been accessed without
          your permission.
        </p>
      </>
    ),
  },
  {
    id: "availability",
    icon: Info,
    color: "yellow",
    title: "Availability & changes",
    content: (
      <>
        <p>
          We may update, modify, suspend, or discontinue parts of the website or
          our services from time to time.
        </p>

        <p className="mt-4">
          We may also update these Terms of Service when necessary. The latest
          version published on this page will apply to future use of the website
          and services.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    icon: ShieldCheck,
    color: "violet",
    title: "Disclaimers & liability",
    content: (
      <>
        <p>
          We aim to provide reliable services, but we cannot guarantee that
          every service, website, integration, or application will always be
          available, error-free, or compatible with every third-party system.
        </p>

        <p className="mt-4">
          To the extent permitted by applicable law, Nexus will not be
          responsible for indirect, incidental, or consequential losses arising
          from the use of our website or services.
        </p>
      </>
    ),
  },
  {
    id: "termination",
    icon: UserCheck,
    color: "cyan",
    title: "Ending a relationship",
    content: (
      <>
        <p>
          Either party may end a project or service relationship according to
          the terms agreed for that project.
        </p>

        <p className="mt-4">
          Ending a project does not automatically remove obligations that were
          already incurred, including applicable payment obligations,
          confidentiality requirements, or intellectual property terms.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    icon: Sparkles,
    color: "pink",
    title: "Contact",
    content: (
      <>
        <p>
          If you need clarification about these terms or a project agreement,
          you can contact Nexus through the contact page.
        </p>

        <Link
          href="/build"
          className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 px-5 py-3 text-xs font-black text-white shadow-lg shadow-violet-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
        >
          Build Nexus
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </>
    ),
  },
];

export const colorStyles = {
  violet: {
    icon: "bg-violet-100 text-violet-500",
    border: "border-violet-100",
  },
  cyan: {
    icon: "bg-cyan-100 text-cyan-500",
    border: "border-cyan-100",
  },
  emerald: {
    icon: "bg-emerald-100 text-emerald-500",
    border: "border-emerald-100",
  },
  pink: {
    icon: "bg-pink-100 text-pink-500",
    border: "border-pink-100",
  },
  orange: {
    icon: "bg-orange-100 text-orange-500",
    border: "border-orange-100",
  },
  blue: {
    icon: "bg-blue-100 text-blue-500",
    border: "border-blue-100",
  },
  fuchsia: {
    icon: "bg-fuchsia-100 text-fuchsia-500",
    border: "border-fuchsia-100",
  },
  yellow: {
    icon: "bg-yellow-100 text-yellow-500",
    border: "border-yellow-100",
  },
};
