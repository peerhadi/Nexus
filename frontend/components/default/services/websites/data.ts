import {
  Code2,
  Gauge,
  Layers3,
  LayoutGrid,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export const services = [
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

export const useCases = [
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

export const process = [
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

export const principles = [
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

export const faqs = [
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
