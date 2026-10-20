export const priorities = [
  "Business presence",
  "Portfolio or brand",
  "Product or service",
  "Existing website",
];

export const priorityDetails: Record<
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
